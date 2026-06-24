import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Create a Razorpay order for a booking. Requires RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET secrets.
export const createRazorpayOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ booking_id: z.string().uuid() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error(
        "Payments are not configured yet. Please add Razorpay API keys.",
      );
    }

    const { data: booking, error: bErr } = await context.supabase
      .from("bookings")
      .select("id, amount, currency, user_id")
      .eq("id", data.booking_id)
      .single();
    if (bErr || !booking) throw new Error("Booking not found");
    if (booking.user_id !== context.userId) throw new Error("Forbidden");

    const amountPaise = Math.round(Number(booking.amount) * 100);

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountPaise,
        currency: booking.currency || "INR",
        receipt: `booking_${booking.id.slice(0, 18)}`,
        notes: { booking_id: booking.id, user_id: booking.user_id },
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Razorpay error: ${txt.slice(0, 200)}`);
    }
    const order = (await res.json()) as { id: string; amount: number; currency: string };

    // Persist a pending payment row
    const { error: pErr } = await context.supabase.from("payments").insert({
      booking_id: booking.id,
      user_id: booking.user_id,
      provider: "razorpay",
      provider_order_id: order.id,
      amount: Number(booking.amount),
      currency: booking.currency || "INR",
      status: "created",
    });
    if (pErr) throw new Error(pErr.message);

    return {
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    };
  });
