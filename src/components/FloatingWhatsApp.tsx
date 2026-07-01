export function FloatingWhatsApp() {
  const phone = "919447480651";
  const msg = encodeURIComponent("Hello, I would like to enquire about driving training.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2"
    >
      <span className="hidden rounded-full bg-card/90 px-3 py-2 text-xs font-semibold text-foreground shadow-card backdrop-blur sm:inline-block">
        Enquire on WhatsApp
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.55_0.18_145)] text-white shadow-[0_15px_40px_-10px_oklch(0.55_0.18_145/0.6)] transition-transform group-hover:scale-110">
        <span className="absolute inset-0 rounded-full pulse-ring" />
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
          <path d="M20.5 3.5A11 11 0 0 0 3.6 17.3L2 22l4.8-1.6a11 11 0 0 0 13.7-16.9Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.9 1 1-2.8-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.4-.1-.6.1l-.9 1c-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-3.6-3.2c-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5L9 7c-.2-.4-.3-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3s1 2.7 1.2 2.9c.1.2 2 3.1 4.8 4.3 1.8.7 2.5.8 3.4.7.6-.1 1.6-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3Z" />
        </svg>
      </span>
    </a>
  );
}
