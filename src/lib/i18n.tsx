import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ml";

type Dict = Record<string, string | string[]>;

const en: Dict = {
  brand: "DRIVE WITH RENJITH",
  tagline: "TRAIN IN YOUR OWN CAR",
  nav_home: "Home",
  nav_programs: "Programs",
  nav_vehicle: "Vehicle & Engine",
  nav_safety: "Road Safety",
  nav_book: "Book Training",
  nav_about: "About",
  nav_contact: "Contact",
  nav_faq: "FAQ",

  hero_kicker: "WELCOME TO TRAINING CLASS",
  hero_title: "Train In Your Own Car",
  hero_sub:
    "If you already have a driving licence and a car, but still lack confidence in driving, we will help you become a confident, safe, responsible and skilled driver.",
  hero_bullet_1: "Professional One-to-One Driving Coaching",
  hero_bullet_2: "100% Cash Back If Not Satisfied",
  hero_bullet_3: "Expert Service To Every Customer",
  hero_cta_book: "Book Training",
  hero_cta_start: "Start Learning",
  hero_call: "Call Now",

  guru_title: "GURU",
  guru_quote:
    "“The one who wishes others to walk the same path as he says won't be a Guru.”",

  mission_title: "Our Mission",
  mission_body:
    "To create a safer generation of drivers through practical driving education, road safety awareness, confidence building and real-world driving experience.",

  about_title: "About The Trainer",
  about_body:
    "Professional driving trainer with 15+ years of experience. Students receive practical, confidence-based training that helps them drive safely in any road condition, traffic situation, weather, highway, city road, narrow road, hill road or crowded street.",

  programs_title: "Training Programs",
  programs_sub:
    "Complete practical explanations with illustrations, images, videos and step-by-step guidance for every topic.",

  vehicle_title: "Vehicle Knowledge",
  vehicle_sub: "Detailed educational content with diagrams and illustrations.",
  engine_title: "Four Stroke Engine",
  engine_sub: "Learn how a petrol engine completes its cycle.",

  safety_title: "Road Safety",
  signs_title: "Kerala RTO Traffic Signs",
  signs_sub: "Warning, mandatory and informatory signs with explanations in English and Malayalam.",

  book_title: "Book Your Training",
  book_sub: "Fill in your details and we will confirm your slot on WhatsApp.",
  book_name: "Full Name",
  book_mobile: "Mobile Number",
  book_email: "Email Address",
  book_type: "Training Type",
  book_date: "Preferred Date",
  book_time: "Preferred Time",
  book_submit: "Send Booking Request",
  book_success: "Opening WhatsApp with your booking details…",

  special_title: "A Note From Your Trainer",
  special_body:
    "If you have any doubts about your car, driving techniques, vehicle maintenance, road rules, parking, highway driving, traffic handling or safety procedures — our professional trainer will guide you patiently and help you gain confidence through real practical training. Age is never a barrier to learning. Have a nice day.",

  footer_rights: "All rights reserved.",
  footer_built: "Built for safer drivers across Kerala.",

  legal_about: "About Us",
  legal_contact: "Contact Us",
  legal_privacy: "Privacy Policy",
  legal_terms: "Terms & Conditions",
  legal_disclaimer: "Disclaimer",
  legal_refund: "Refund Policy",
  legal_help: "Help & Support",
  legal_cookies: "Cookie Policy",

  lang_label: "Language",

  nav_learning: "Learning Details",
  nav_signs: "Traffic Signs",
  nav_dashboard: "Dashboard",
  nav_admin: "Admin",
  nav_signin: "Sign In",
  nav_signout: "Sign Out",

  hero_cta_learning: "Learning Details",

  learning_title: "Learning Details",
  learning_sub: "In-depth driving knowledge — practical, road-tested, and explained step by step.",

  signs_warning: "Warning Signs",
  signs_mandatory: "Mandatory Signs",
  signs_informatory: "Informatory Signs",

  auth_title: "Sign In",
  auth_sub: "Access your bookings, payments and account.",
  auth_tab_signin: "Sign In",
  auth_tab_signup: "Sign Up",
  auth_tab_phone: "Phone OTP",
  auth_tab_forgot: "Forgot Password",
  auth_email: "Email",
  auth_password: "Password",
  auth_full_name: "Full Name",
  auth_phone: "Mobile (with country code)",
  auth_otp: "Enter OTP",
  auth_send_otp: "Send OTP",
  auth_verify_otp: "Verify OTP",
  auth_signin_btn: "Sign In",
  auth_signup_btn: "Create Account",
  auth_google: "Continue with Google",
  auth_forgot_btn: "Send reset link",
  auth_or: "or",
  auth_required: "You need to sign in to continue.",

  reset_title: "Set a new password",
  reset_btn: "Update password",
  reset_success: "Password updated. You can now sign in.",

  book_signin_required: "Please sign in to book a training slot.",
  book_pay: "Pay Booking Fee",
  book_saved: "Booking saved. We'll confirm shortly on WhatsApp.",
  book_status: "Status",
  book_amount_label: "Booking Fee (INR)",

  dashboard_title: "My Dashboard",
  dashboard_profile: "Profile",
  dashboard_bookings: "Bookings",
  dashboard_payments: "Payments",
  dashboard_empty: "Nothing here yet.",
  dashboard_cancel: "Cancel",
  dashboard_pay_now: "Pay Now",

  admin_title: "Admin Panel",
  admin_all_bookings: "All Bookings",
  admin_all_payments: "All Payments",
  admin_export: "Export CSV",
  admin_no_access: "Admin access required.",
};

const ml: Dict = {
  brand: "ഡ്രൈവ് വിത്ത് രഞ്ജിത്ത്",
  tagline: "സ്വന്തം കാറിൽ പരിശീലനം",
  nav_home: "ഹോം",
  nav_programs: "പ്രോഗ്രാമുകൾ",
  nav_vehicle: "വാഹനം & എഞ്ചിൻ",
  nav_safety: "റോഡ് സുരക്ഷ",
  nav_book: "ബുക്ക് ചെയ്യൂ",
  nav_about: "ഞങ്ങളെക്കുറിച്ച്",
  nav_contact: "ബന്ധപ്പെടുക",
  nav_faq: "സംശയങ്ങൾ",

  hero_kicker: "ട്രെയിനിങ് ക്ലാസിലേക്ക് സ്വാഗതം",
  hero_title: "സ്വന്തം കാറിൽ പരിശീലനം",
  hero_sub:
    "ലൈസൻസും കാറും ഉണ്ടെങ്കിലും ഡ്രൈവിങ്ങിൽ ആത്മവിശ്വാസമില്ലെങ്കിൽ, ആത്മവിശ്വാസവും സുരക്ഷിതത്വവും ഉത്തരവാദിത്തവുമുള്ള മികച്ച ഡ്രൈവർ ആകാൻ ഞങ്ങൾ സഹായിക്കും.",
  hero_bullet_1: "പ്രൊഫഷണൽ വൺ-ടു-വൺ കോച്ചിങ്",
  hero_bullet_2: "സംതൃപ്തരല്ലെങ്കിൽ 100% പണം തിരികെ",
  hero_bullet_3: "ഓരോ വിദ്യാർത്ഥിക്കും വിദഗ്ധ സേവനം",
  hero_cta_book: "ബുക്ക് ചെയ്യൂ",
  hero_cta_start: "പഠനം ആരംഭിക്കൂ",
  hero_call: "ഇപ്പോൾ വിളിക്കൂ",

  guru_title: "ഗുരു",
  guru_quote:
    "“താൻ പറയുന്ന വഴിയിലൂടെ മറ്റുള്ളവർ നടക്കണമെന്ന് ആഗ്രഹിക്കുന്നവൻ ഗുരുവാകില്ല.”",

  mission_title: "ഞങ്ങളുടെ ലക്ഷ്യം",
  mission_body:
    "പ്രായോഗിക ഡ്രൈവിങ് വിദ്യാഭ്യാസം, റോഡ് സുരക്ഷാ ബോധവൽക്കരണം, ആത്മവിശ്വാസം, യഥാർത്ഥ ഡ്രൈവിങ് അനുഭവം എന്നിവയിലൂടെ കൂടുതൽ സുരക്ഷിതരായ ഒരു ഡ്രൈവർ തലമുറയെ വളർത്തിയെടുക്കുക.",

  about_title: "പരിശീലകനെക്കുറിച്ച്",
  about_body:
    "15+ വർഷത്തെ പരിചയമുള്ള പ്രൊഫഷണൽ ഡ്രൈവിങ് ട്രെയിനർ. ഏതു റോഡിലും, ട്രാഫിക്കിലും, കാലാവസ്ഥയിലും — ഹൈവേ, സിറ്റി, ഇടുങ്ങിയ റോഡ്, മല റോഡ്, തിരക്കേറിയ വീഥികൾ — സുരക്ഷിതമായി വണ്ടി ഓടിക്കാൻ വിദ്യാർത്ഥികളെ പ്രാപ്തരാക്കുന്നു.",

  programs_title: "ട്രെയിനിങ് പ്രോഗ്രാമുകൾ",
  programs_sub:
    "ഓരോ വിഷയത്തിനും ചിത്രങ്ങൾ, വീഡിയോകൾ, പടിപടിയായുള്ള മാർഗനിർദേശം എന്നിവയോടെ പൂർണമായ പ്രായോഗിക വിശദീകരണം.",

  vehicle_title: "വാഹന പരിജ്ഞാനം",
  vehicle_sub: "ഡയഗ്രമുകളും ചിത്രീകരണങ്ങളും ഉൾപ്പെടെ വിശദമായ വിദ്യാഭ്യാസ ഉള്ളടക്കം.",
  engine_title: "ഫോർ സ്ട്രോക്ക് എഞ്ചിൻ",
  engine_sub: "പെട്രോൾ എഞ്ചിൻ ഓരോ സൈക്കിളും എങ്ങനെ പൂർത്തിയാക്കുന്നു.",

  safety_title: "റോഡ് സുരക്ഷ",
  signs_title: "കേരള RTO ട്രാഫിക് സൈൻബോർഡുകൾ",
  signs_sub: "മുന്നറിയിപ്പ്, നിർബന്ധിത, വിവര സൈനുകൾ — ഇംഗ്ലീഷിലും മലയാളത്തിലും വിശദീകരണം.",

  book_title: "നിങ്ങളുടെ ട്രെയിനിങ് ബുക്ക് ചെയ്യൂ",
  book_sub: "വിവരങ്ങൾ പൂരിപ്പിക്കുക, WhatsApp വഴി സ്ലോട്ട് സ്ഥിരീകരിക്കും.",
  book_name: "പേര്",
  book_mobile: "മൊബൈൽ നമ്പർ",
  book_email: "ഇമെയിൽ",
  book_type: "ട്രെയിനിങ് തരം",
  book_date: "ഇഷ്ടപ്പെട്ട തീയതി",
  book_time: "ഇഷ്ടപ്പെട്ട സമയം",
  book_submit: "ബുക്കിങ് അയക്കൂ",
  book_success: "ബുക്കിങ് വിവരങ്ങളുമായി WhatsApp തുറക്കുന്നു…",

  special_title: "ട്രെയിനറുടെ ഒരു കുറിപ്പ്",
  special_body:
    "നിങ്ങളുടെ കാർ, ഡ്രൈവിങ് ടെക്നിക്, വാഹന പരിപാലനം, റോഡ് നിയമങ്ങൾ, പാർക്കിങ്, ഹൈവേ ഡ്രൈവിങ്, ട്രാഫിക് കൈകാര്യം, സുരക്ഷാ നടപടികൾ — എന്തുമായ സംശയങ്ങൾക്കും ഞങ്ങളുടെ പ്രൊഫഷണൽ ട്രെയിനർ ക്ഷമയോടെ മാർഗനിർദേശം നൽകും. പ്രായം പഠിക്കാൻ ഒരു തടസ്സമല്ല. ശുഭദിനം.",

  footer_rights: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",
  footer_built: "കേരളത്തിലെ സുരക്ഷിത ഡ്രൈവർമാർക്കായി നിർമ്മിച്ചത്.",

  legal_about: "ഞങ്ങളെക്കുറിച്ച്",
  legal_contact: "ബന്ധപ്പെടുക",
  legal_privacy: "സ്വകാര്യതാ നയം",
  legal_terms: "നിബന്ധനകൾ",
  legal_disclaimer: "ഡിസ്ക്ലെയിമർ",
  legal_refund: "റീഫണ്ട് നയം",
  legal_help: "സഹായം",

  lang_label: "ഭാഷ",
};

const dicts: Record<Lang, Dict> = { en, ml };

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof en) => string;
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (stored === "en" || stored === "ml") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (key: keyof typeof en) => {
    const v = dicts[lang][key as string] ?? en[key as string];
    return Array.isArray(v) ? v.join(", ") : (v as string) ?? String(key);
  };

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

// Content arrays exported per-language for richer sections.
export const programsContent = {
  en: [
    { icon: "☀️", title: "Day Driving Training", items: ["Road observation", "Speed control", "Traffic judgement", "Safe overtaking", "Lane discipline", "Defensive driving"] },
    { icon: "🌙", title: "Night Driving Training", items: ["Proper headlight use", "High & low beam usage", "Dashboard light adjustment", "Mirror adjustment", "Safe night techniques", "Visibility improvement"] },
    { icon: "🌧️", title: "Rain Driving Training", items: ["Wiper usage", "Tyre grip awareness", "Safe braking", "Hydroplaning prevention", "Visibility management", "Safe following distance"] },
    { icon: "⛰️", title: "Hill Driving Training", items: ["Uphill start", "Downhill control", "Clutch control", "Brake management", "Hill parking"] },
    { icon: "🏙️", title: "City Traffic Training", items: ["Traffic signals", "Junction crossing", "Pedestrian awareness", "Crowded street driving", "Heavy traffic driving"] },
    { icon: "🛣️", title: "Highway Driving Training", items: ["Safe speed", "Lane discipline", "Safe following distance", "Highway overtaking", "Emergency handling"] },
    { icon: "🅿️", title: "Parking Masterclass", items: ["Reverse parking", "Parallel parking", "Angle parking", "Garage parking", "Narrow space parking"] },
    { icon: "💪", title: "Driving Confidence Program", items: ["Fear removal", "Confidence building", "Real traffic practice", "Highway confidence", "City confidence", "Independent driving"] },
    { icon: "🎯", title: "Special Practical Training", items: ["Traffic signals", "Highway driving", "U-turn practice", "Roundabout driving", "Crowded streets", "Heavy traffic", "Narrow roads", "School zones", "Market areas"] },
  ],
  ml: [
    { icon: "☀️", title: "പകൽ ഡ്രൈവിങ് പരിശീലനം", items: ["റോഡ് നിരീക്ഷണം", "സ്പീഡ് നിയന്ത്രണം", "ട്രാഫിക് വിലയിരുത്തൽ", "സുരക്ഷിത ഓവർടേക്കിങ്", "ലെയ്ൻ അച്ചടക്കം", "ഡിഫെൻസീവ് ഡ്രൈവിങ്"] },
    { icon: "🌙", title: "രാത്രി ഡ്രൈവിങ് പരിശീലനം", items: ["ഹെഡ്‌ലൈറ്റ് ഉപയോഗം", "ഹൈ-ലോ ബീം", "ഡാഷ്ബോർഡ് ലൈറ്റ്", "മിറർ ക്രമീകരണം", "സുരക്ഷിത രാത്രി ഡ്രൈവിങ്", "ദൃശ്യത മെച്ചപ്പെടുത്തൽ"] },
    { icon: "🌧️", title: "മഴക്കാല ഡ്രൈവിങ്", items: ["വൈപ്പർ ഉപയോഗം", "ടയർ ഗ്രിപ്പ്", "സുരക്ഷിത ബ്രേക്കിങ്", "ഹൈഡ്രോപ്ലെയ്നിങ് ഒഴിവാക്കൽ", "ദൃശ്യത നിയന്ത്രണം", "ഫോളോവിങ് ദൂരം"] },
    { icon: "⛰️", title: "മല റോഡ് ഡ്രൈവിങ്", items: ["കയറ്റം സ്റ്റാർട്ട്", "ഇറക്കം നിയന്ത്രണം", "ക്ലച്ച് കൺട്രോൾ", "ബ്രേക്ക് മാനേജ്മെന്റ്", "ഹിൽ പാർക്കിങ്"] },
    { icon: "🏙️", title: "സിറ്റി ട്രാഫിക് പരിശീലനം", items: ["ട്രാഫിക് സിഗ്നൽ", "ജംഗ്ഷൻ ക്രോസിങ്", "കാൽനടയാത്രക്കാർ", "തിരക്കേറിയ വീഥികൾ", "ഹെവി ട്രാഫിക്"] },
    { icon: "🛣️", title: "ഹൈവേ ഡ്രൈവിങ്", items: ["സുരക്ഷിത സ്പീഡ്", "ലെയ്ൻ അച്ചടക്കം", "ഫോളോവിങ് ദൂരം", "ഹൈവേ ഓവർടേക്ക്", "എമർജൻസി ഹാൻഡ്‌ലിങ്"] },
    { icon: "🅿️", title: "പാർക്കിങ് മാസ്റ്റർക്ലാസ്", items: ["റിവേഴ്സ് പാർക്കിങ്", "പാരലൽ പാർക്കിങ്", "ആംഗിൾ പാർക്കിങ്", "ഗാരേജ് പാർക്കിങ്", "ഇടുങ്ങിയ പാർക്കിങ്"] },
    { icon: "💪", title: "കോൺഫിഡൻസ് പ്രോഗ്രാം", items: ["ഭയം നീക്കം", "ആത്മവിശ്വാസം", "യഥാർത്ഥ ട്രാഫിക് പരിശീലനം", "ഹൈവേ കോൺഫിഡൻസ്", "സിറ്റി കോൺഫിഡൻസ്", "സ്വതന്ത്ര ഡ്രൈവിങ്"] },
    { icon: "🎯", title: "സ്പെഷ്യൽ പ്രാക്ടിക്കൽ ട്രെയിനിങ്", items: ["ട്രാഫിക് സിഗ്നൽ", "ഹൈവേ", "യു-ടേൺ", "റൗണ്ടബൗട്ട്", "തിരക്കേറിയ വീഥികൾ", "ഹെവി ട്രാഫിക്", "ഇടുങ്ങിയ റോഡ്", "സ്കൂൾ സോൺ", "മാർക്കറ്റ് ഏരിയ"] },
  ],
};

export const vehicleContent = {
  en: [
    "Vehicle Inspection", "Engine Oil Check", "Coolant Check", "Brake Oil Check",
    "Wiper Water Check", "Battery Check", "Tyre Pressure Check", "Wheel Changing",
    "Dashboard Warning Lights", "Headlight Adjustment", "Mirror Adjustment", "Vehicle Maintenance",
  ],
  ml: [
    "വാഹന പരിശോധന", "എഞ്ചിൻ ഓയിൽ", "കൂളന്റ്", "ബ്രേക്ക് ഓയിൽ",
    "വൈപ്പർ വാട്ടർ", "ബാറ്ററി", "ടയർ പ്രഷർ", "വീൽ മാറ്റം",
    "ഡാഷ്ബോർഡ് വാണിങ് ലൈറ്റ്", "ഹെഡ്‌ലൈറ്റ് ക്രമീകരണം", "മിറർ ക്രമീകരണം", "വാഹന പരിപാലനം",
  ],
};

export const engineStrokes = {
  en: [
    { n: 1, name: "Intake Stroke", desc: "Piston moves down, intake valve opens, air-fuel mixture enters the cylinder." },
    { n: 2, name: "Compression Stroke", desc: "Both valves close, piston moves up and compresses the mixture." },
    { n: 3, name: "Combustion Stroke", desc: "Spark plug ignites the mixture, expanding gases push the piston down — power." },
    { n: 4, name: "Exhaust Stroke", desc: "Exhaust valve opens, piston rises and pushes burnt gases out." },
  ],
  ml: [
    { n: 1, name: "ഇൻടേക് സ്ട്രോക്ക്", desc: "പിസ്റ്റൺ താഴേക്ക്, ഇൻടേക് വാൽവ് തുറക്കുന്നു, എയർ-ഫ്യൂവൽ മിശ്രിതം സിലിണ്ടറിലേക്ക്." },
    { n: 2, name: "കംപ്രഷൻ സ്ട്രോക്ക്", desc: "രണ്ടു വാൽവുകളും അടയ്ക്കുന്നു, പിസ്റ്റൺ മുകളിലേക്ക് ഉയർന്ന് മിശ്രിതം ചുരുക്കുന്നു." },
    { n: 3, name: "കംബസ്ഷൻ സ്ട്രോക്ക്", desc: "സ്പാർക്ക് പ്ലഗ് കത്തിക്കുന്നു, വികസിക്കുന്ന വാതകങ്ങൾ പിസ്റ്റണെ താഴേക്ക് തള്ളുന്നു — പവർ." },
    { n: 4, name: "എക്സോസ്റ്റ് സ്ട്രോക്ക്", desc: "എക്സോസ്റ്റ് വാൽവ് തുറക്കുന്നു, പിസ്റ്റൺ ഉയർന്ന് കത്തിയ വാതകങ്ങൾ പുറത്തേക്ക് തള്ളുന്നു." },
  ],
};

export const safetyContent = {
  en: ["Safe Distance", "Correct Speed Selection", "Defensive Driving", "Accident Prevention", "Emergency Handling", "Blind Spot Awareness"],
  ml: ["സുരക്ഷിത ദൂരം", "ശരിയായ സ്പീഡ്", "ഡിഫെൻസീവ് ഡ്രൈവിങ്", "അപകട പ്രതിരോധം", "എമർജൻസി ഹാൻഡ്‌ലിങ്", "ബ്ലൈൻഡ് സ്പോട്ട് അവെയർനസ്"],
};
