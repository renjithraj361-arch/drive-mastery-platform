
# Drive With Renjith — Phase 2 + 3 Build Plan

Keep the current design, theme, layout, header, footer, and existing pages exactly as they are. Only add new pages, wire navigation to real routes (no scroll-to-section), and add backend-powered features.

## 1. Backend (Lovable Cloud)

Enable Lovable Cloud. Add these tables (with GRANTs + RLS):

- `profiles` (id → auth.users, full_name, phone, email, locale, created_at) — auto-created via trigger on signup.
- `user_roles` (user_id, role enum: 'admin' | 'user') + `has_role()` security-definer fn. Used for admin gate.
- `bookings` (id, user_id, full_name, mobile, email, training_type, preferred_date, preferred_time, status enum: 'pending'|'confirmed'|'cancelled'|'completed', amount, currency, created_at). RLS: user reads/writes own; admin reads all.
- `payments` (id, booking_id, user_id, provider, provider_order_id, provider_payment_id, amount, currency, status enum: 'created'|'paid'|'failed'|'refunded', receipt_url, created_at). Same RLS shape.

## 2. Authentication

- Email/password + Google sign-in (managed via Lovable Cloud) + Forgot Password + `/reset-password` page.
- Mobile OTP login (Supabase phone auth — email/password fallback if SMS provider not configured; surface a clear message).
- `/auth` page with tabs: Sign in, Sign up, Forgot password, Phone OTP.
- Integration-managed `_authenticated` layout gates Dashboard + Admin.
- Header gets Sign in / Account dropdown (logout).

## 3. Navigation cleanup

- Header links already use TanStack `<Link>` to dedicated routes — no scroll/hash behavior exists today. Audit landing page and replace any "Start Learning" CTA with a `<Link to="/learning">` button. Confirm no `#hash` anchors remain in nav.
- Add new top-level routes: `/learning`, `/signs`, `/auth`, `/reset-password`, `/refund`, `/disclaimer`, `/cookies`.
- Add `_authenticated/dashboard`, `_authenticated/dashboard.bookings`, `_authenticated/dashboard.payments`, `_authenticated/dashboard.profile`, `_authenticated/admin` (admin-gated inside).

## 4. New content pages (matching existing look)

### `/learning` — Learning Details
18 topics (Day, Night, Rain, Hill, Highway, City, Heavy Traffic, Narrow Road, Reverse Parking, Parallel Parking, Steering Control, Speed Control, Safe Braking, U-Turn, Safe Overtaking, Left Judgement, Right Judgement, Long Vehicle Distance). Each: heading + 3-5 paragraph explanation, EN/ML in i18n dictionary. Card-based layout reusing existing `Section`.

### `/signs` — Kerala RTO Traffic Signs
Three groups: Warning (triangle), Mandatory (circle), Informatory (rectangle). Each sign rendered as inline SVG (no external assets) with name + description. EN/ML.

### Legal additions
`/refund`, `/disclaimer`, `/cookies` — match existing `/privacy`, `/terms` styling.

## 5. Booking system (`/book`)

Rewrite as a real form:
- Logged-out users: prompt to sign in (inline CTA, no redirect).
- Logged-in: form with zod validation → inserts `bookings` row via authenticated server fn → shows confirmation with booking ID + status.
- Two actions: "Submit Booking" (saves as pending), "Pay Booking Fee" (saves + initiates payment).
- WhatsApp fallback link preserved.

## 6. Payments — Razorpay

User asked for Razorpay/Cashfree. Lovable's built-in payments tools are Paddle/Stripe/Shopify; Razorpay isn't built-in, so wire it as a BYO integration:
- Ask user for `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` via `add_secret`.
- Server fn `createRazorpayOrder({ bookingId })` (authenticated) → creates order via Razorpay REST API, returns order id + key id.
- Client uses Razorpay Checkout JS (loaded via `<script>` tag on demand) → on success posts to `/api/public/razorpay/webhook` (HMAC-verified) which updates payment + booking status.
- Pages: `/payment/success`, `/payment/failed`, `/payment/receipt/$id`.

If the user doesn't want to provide Razorpay keys yet, payments remain in "demo" mode (button disabled with message) and everything else still works.

## 7. Dashboards

### `_authenticated/dashboard`
Sidebar: Profile, Bookings, Payments. Lists user's own rows, allows cancel (status → cancelled).

### `_authenticated/admin`
Admin-only (checked in `beforeLoad` via `has_role`). Tabs: Bookings, Payments, Users. CSV export buttons (client-side). Status update controls.

Seed: first user can be promoted to admin via SQL (we'll add a small note).

## 8. i18n

Extend `src/lib/i18n.tsx` dictionary with EN + ML keys for every new page, form, button, status, and dashboard label. Toggle already exists in header — no behavior change.

## 9. Security

- All forms use zod (`name` 1-100, `mobile` digits 7-15, `email` valid, etc.).
- RLS on every table; admin via `has_role()` only (no client check).
- Razorpay webhook HMAC verified with `RAZORPAY_WEBHOOK_SECRET`.
- Service-role client only inside handler bodies after auth check.

## 10. Order of operations

1. Enable Lovable Cloud, create schema migration with grants + RLS + trigger + `has_role`.
2. Add auth pages + `_authenticated` layout (integration-managed) + Google provider config.
3. Add `/learning`, `/signs`, legal pages + i18n keys + replace landing CTA.
4. Rewrite `/book` against DB; add dashboard routes.
5. Ask user for Razorpay keys → wire payments + webhook + result pages.
6. Build admin panel.

## Technical notes

- Stack: TanStack Start, file-based routing, server fns via `createServerFn`, RLS via Supabase.
- No design changes: reuse `Header`, `Footer`, `Section`, existing tokens (`bg-orange-gradient`, `shadow-glow`, Bebas Neue display).
- Public route loaders must not call protected server fns (would 401 during SSR).
- Razorpay Checkout JS is loaded client-side only.

## Open question

Do you have Razorpay live/test API keys ready now, or should I build everything else first and stub the "Pay Booking Fee" button until you add keys?
