import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/razorpay/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!secret) return new Response("Not configured", { status: 503 });

        const sig = request.headers.get("x-razorpay-signature") || "";
        const body = await request.text();
        const expected = createHmac("sha256", secret).update(body).digest("hex");
        const a = Buffer.from(sig);
        const b = Buffer.from(expected);
        if (a.length !== b.length || !timingSafeEqual(a, b)) {
          return new Response("Invalid signature", { status: 401 });
        }

        const payload = JSON.parse(body) as {
          event: string;
          payload: {
            payment?: { entity: { id: string; order_id: string; status: string } };
            order?: { entity: { id: string } };
          };
        };

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        if (payload.event === "payment.captured" || payload.event === "order.paid") {
          const p = payload.payload.payment?.entity;
          if (p) {
            const { data: pay } = await supabaseAdmin
              .from("payments")
              .update({
                status: "paid",
                provider_payment_id: p.id,
              })
              .eq("provider_order_id", p.order_id)
              .select("booking_id")
              .single();
            if (pay?.booking_id) {
              await supabaseAdmin
                .from("bookings")
                .update({ status: "confirmed" })
                .eq("id", pay.booking_id);
            }
          }
        } else if (payload.event === "payment.failed") {
          const p = payload.payload.payment?.entity;
          if (p) {
            await supabaseAdmin
              .from("payments")
              .update({ status: "failed", provider_payment_id: p.id })
              .eq("provider_order_id", p.order_id);
          }
        }

        return new Response("ok");
      },
    },
  },
});
