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
  legal_cookies: "കുക്കി നയം",

  lang_label: "ഭാഷ",

  nav_learning: "ലേണിങ് വിശദാംശങ്ങൾ",
  nav_signs: "ട്രാഫിക് സൈൻ",
  nav_dashboard: "ഡാഷ്ബോർഡ്",
  nav_admin: "അഡ്മിൻ",
  nav_signin: "സൈൻ ഇൻ",
  nav_signout: "സൈൻ ഔട്ട്",

  hero_cta_learning: "ലേണിങ് വിശദാംശങ്ങൾ",

  learning_title: "ലേണിങ് വിശദാംശങ്ങൾ",
  learning_sub: "ആഴത്തിലുള്ള ഡ്രൈവിങ് അറിവ് — പ്രായോഗികം, പടിപടിയായി വിശദീകരിച്ചത്.",

  signs_warning: "മുന്നറിയിപ്പ് സൈനുകൾ",
  signs_mandatory: "നിർബന്ധിത സൈനുകൾ",
  signs_informatory: "വിവര സൈനുകൾ",

  auth_title: "സൈൻ ഇൻ",
  auth_sub: "നിങ്ങളുടെ ബുക്കിങ്, പേയ്മെന്റ്, അക്കൗണ്ട് ലഭ്യമാക്കുക.",
  auth_tab_signin: "സൈൻ ഇൻ",
  auth_tab_signup: "സൈൻ അപ്",
  auth_tab_phone: "ഫോൺ OTP",
  auth_tab_forgot: "പാസ്‌വേഡ് മറന്നോ",
  auth_email: "ഇമെയിൽ",
  auth_password: "പാസ്‌വേഡ്",
  auth_full_name: "പേര്",
  auth_phone: "മൊബൈൽ (കൺട്രി കോഡ്)",
  auth_otp: "OTP നൽകുക",
  auth_send_otp: "OTP അയക്കൂ",
  auth_verify_otp: "OTP പരിശോധിക്കൂ",
  auth_signin_btn: "സൈൻ ഇൻ",
  auth_signup_btn: "അക്കൗണ്ട് ഉണ്ടാക്കൂ",
  auth_google: "Google വഴി തുടരുക",
  auth_forgot_btn: "റീസെറ്റ് ലിങ്ക് അയക്കൂ",
  auth_or: "അല്ലെങ്കിൽ",
  auth_required: "തുടരാൻ സൈൻ ഇൻ ചെയ്യുക.",

  reset_title: "പുതിയ പാസ്‌വേഡ് സജ്ജമാക്കുക",
  reset_btn: "പാസ്‌വേഡ് അപ്ഡേറ്റ് ചെയ്യൂ",
  reset_success: "പാസ്‌വേഡ് അപ്ഡേറ്റ് ചെയ്തു. ഇപ്പോൾ സൈൻ ഇൻ ചെയ്യാം.",

  book_signin_required: "ബുക്ക് ചെയ്യാൻ സൈൻ ഇൻ ചെയ്യുക.",
  book_pay: "ബുക്കിങ് ഫീ അടയ്ക്കൂ",
  book_saved: "ബുക്കിങ് സേവ് ചെയ്തു. ഉടൻ WhatsApp വഴി സ്ഥിരീകരിക്കും.",
  book_status: "സ്റ്റാറ്റസ്",
  book_amount_label: "ബുക്കിങ് ഫീ (INR)",

  dashboard_title: "എന്റെ ഡാഷ്ബോർഡ്",
  dashboard_profile: "പ്രൊഫൈൽ",
  dashboard_bookings: "ബുക്കിങ്ങുകൾ",
  dashboard_payments: "പേയ്മെന്റുകൾ",
  dashboard_empty: "ഇതുവരെ ഒന്നുമില്ല.",
  dashboard_cancel: "റദ്ദാക്കുക",
  dashboard_pay_now: "ഇപ്പോൾ അടയ്ക്കൂ",

  admin_title: "അഡ്മിൻ പാനൽ",
  admin_all_bookings: "എല്ലാ ബുക്കിങ്ങുകൾ",
  admin_all_payments: "എല്ലാ പേയ്മെന്റുകൾ",
  admin_export: "CSV എക്സ്പോർട്ട്",
  admin_no_access: "അഡ്മിൻ ആക്സസ് ആവശ്യമാണ്.",
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

// Learning Details — 18 driving topics with detailed explanations
export const learningContent = {
  en: [
    { icon: "☀️", title: "Day Driving Tips", body: "Daylight reveals everything — but it also hides nothing about your mistakes. Keep both hands at 9 and 3, scan 12–15 seconds ahead, and use your mirrors every 5–8 seconds. Anticipate brake lights three vehicles ahead, and never rely only on the car in front. In bright glare, drop the sun-visor early and keep the windshield clean from inside as well as outside." },
    { icon: "🌙", title: "Night Driving Tips", body: "Visibility drops to a fraction of daytime. Use low beam in traffic and high beam on empty stretches, but dip immediately when you see an oncoming vehicle. Adjust the inside mirror to the night-position to avoid glare. Slow down — your stopping distance must fit inside your headlight cone. Watch for unlit two-wheelers, pedestrians and animals near the road edge." },
    { icon: "🌧️", title: "Rain Driving Tips", body: "Wet roads are most dangerous in the first 10 minutes — oil and dust mix into a slick film. Switch on headlights (not just DRLs), keep wipers on the right speed, and double your following distance. Brake earlier and gentler. If the car hydroplanes, ease off the accelerator, do not slam the brakes, and steer straight until grip returns." },
    { icon: "⛰️", title: "Hill Driving Tips", body: "On climbs, downshift before the engine struggles — pick a gear that holds steady RPM. On descents, use engine braking in a lower gear instead of riding the brake pedal, which overheats and fails. On hairpin bends, stay in your lane, sound a short horn at blind curves, and give way to vehicles climbing uphill." },
    { icon: "🛣️", title: "Highway Driving Tips", body: "Maintain a steady speed in the correct lane — the right-most lane is for overtaking only. Use indicators 3–5 seconds before any lane change. Keep at least a 3-second gap to the vehicle ahead, increased to 5 seconds at night or in rain. Avoid sudden braking; tap the brake once to warn the car behind before slowing." },
    { icon: "🏙️", title: "City Traffic Driving", body: "City driving is about reading people, not just vehicles. Watch pedestrians' feet and head direction, expect two-wheelers to filter on either side, and never block a junction. Use the handbrake at every long signal stop to rest your right foot and reduce wear on the brake-light bulb. Keep one car-length gap so you can manoeuvre if needed." },
    { icon: "🚦", title: "Heavy Traffic Driving", body: "In bumper-to-bumper traffic, smooth is fast. Stay in one lane, leave a half-car gap, and avoid lane-hopping — it rarely helps and stresses the clutch. In a manual car, use the half-clutch sparingly; in long jams, shift to neutral and use the handbrake instead. Keep cool, ignore horns behind you, and never tailgate." },
    { icon: "↔️", title: "Narrow Road Driving", body: "On narrow roads, position the car slightly left of centre and slow down enough to stop within visible distance. Fold the right mirror if walls or parked vehicles are close. Use horn at blind bends, give way to larger vehicles, and reverse to the nearest passing-place when meeting oncoming traffic instead of forcing a squeeze." },
    { icon: "🅿️", title: "Reverse Parking", body: "Stop parallel to the front car, about half a metre away, with your rear bumper aligned with that car's rear bumper. Turn the wheel fully towards the kerb, reverse until your inside mirror reaches the front car's tail, then straighten the wheel and continue back. Counter-steer once the rear wheel enters the slot and finish straight. Always use mirrors and rear camera — never rely on one alone." },
    { icon: "🅿️", title: "Parallel Parking", body: "Find a gap 1.5 times your car's length. Stop alongside the front car, mirror-to-mirror, half a metre out. Reverse straight until your rear bumper aligns with the front car's bumper, then full left lock. When the car is at 45°, straighten, continue reversing, then full right lock to swing the front in. Adjust forward to centre between the two cars." },
    { icon: "🎯", title: "Steering Control", body: "Hold the wheel at 9 and 3, thumbs on the rim, not hooked through the spokes. Use the pull-push method for turns under 90°, and hand-over-hand only when needed. Return the wheel by feeding it back through your hands — never spin it. Smooth inputs mean smooth weight transfer, which keeps the car balanced and safe." },
    { icon: "📈", title: "Speed Control", body: "Speed is set by the worst thing you might meet, not by what you can see. Read the road's geometry: sharper curves need lower entry speed. Use engine braking and downshifts to slow on long descents. Cruise control is for open highways, never in city traffic or rain. Match speed to lane, weather and visibility — not to the car behind you." },
    { icon: "🛑", title: "Safe Braking Techniques", body: "Progressive braking — squeeze, don't stamp. In an emergency stop with ABS, press the pedal firmly and stay pressed; the system will pulse for you, and you can still steer. Brake in a straight line before a corner, not inside it. Check mirrors before any heavy braking and warn the car behind with a brake-tap if possible." },
    { icon: "🔄", title: "U-Turn Techniques", body: "Take U-turns only where allowed and where visibility is at least 100 metres in both directions. Signal right, move to the right-most lane, slow down and check mirrors plus a shoulder-glance. Turn the wheel fully when the front of your car crosses the centre line. If the road is narrow, plan a 3-point turn instead of forcing a single sweep." },
    { icon: "↩️", title: "Safe Overtaking", body: "Overtake only with clear sight of the road ahead for at least 10 seconds. Signal right, build speed in your lane, move out smoothly, complete the pass without hesitation, signal left, and return to your lane only when you see the overtaken vehicle in your inside mirror. Never overtake on bends, crests, junctions, pedestrian crossings, or near schools." },
    { icon: "⬅️", title: "Left Side Judgement", body: "The left side is the hardest to judge because the driver sits on the right. Use the left mirror, glance through the rear window, and use the front-left corner of the bonnet as a reference. Practise in an empty lot with cones — once you know the exact distance from kerb to mirror, you can apply it on real roads." },
    { icon: "➡️", title: "Right Side Judgement", body: "Right-side judgement is easier but still critical near oncoming traffic. Use the door-line as your reference and keep at least 60 cm between your mirror and the next vehicle or wall. When passing parked cars, watch for opening doors and pedestrians stepping out from between vehicles." },
    { icon: "🚛", title: "Long Vehicle Distance Judgement", body: "Trucks and buses need much more time and space than they look like they need. Never overtake them on a blind bend, never sit in their blind spot beside the rear wheels, and stay well back at junctions where they may swing wide. When following, leave double the normal gap so the driver can see you in their mirror — if you can't see their mirror, they can't see you." },
  ],
  ml: [
    { icon: "☀️", title: "പകൽ ഡ്രൈവിങ് ടിപ്സ്", body: "പകൽ വെളിച്ചത്തിൽ എല്ലാം കാണാം — അതുകൊണ്ട് തെറ്റുകളും മറയ്ക്കാനാവില്ല. കൈകൾ 9, 3 സ്ഥാനത്ത്, 12–15 സെക്കൻഡ് മുൻപിലേക്ക് നോക്കൂ, ഓരോ 5–8 സെക്കൻഡിലും മിറർ പരിശോധിക്കൂ. മൂന്നു വാഹനങ്ങൾ മുൻപുള്ള ബ്രേക്ക് ലൈറ്റും കാണാൻ ശ്രമിക്കൂ." },
    { icon: "🌙", title: "രാത്രി ഡ്രൈവിങ് ടിപ്സ്", body: "ദൃശ്യത വളരെ കുറയും. ട്രാഫിക്കിൽ ലോ ബീമും, ഒഴിഞ്ഞ റോഡിൽ ഹൈ ബീമും ഉപയോഗിക്കൂ — എതിരെ വാഹനം വന്നാൽ ഉടനെ ഡിം ചെയ്യൂ. അകത്തെ മിറർ നൈറ്റ് പൊസിഷനിലേക്ക്. ഹെഡ്‌ലൈറ്റിന്റെ ദൂരത്തിനുള്ളിൽ നിർത്താൻ കഴിയുന്ന വേഗതയിൽ മാത്രം ഓടിക്കൂ." },
    { icon: "🌧️", title: "മഴ ഡ്രൈവിങ് ടിപ്സ്", body: "മഴയുടെ ആദ്യ 10 മിനിറ്റ് ഏറ്റവും അപകടകരം. ഹെഡ്‌ലൈറ്റ് ഓൺ, വൈപ്പർ ശരിയായ വേഗതയിൽ, ഇരട്ടി ഫോളോവിങ് ദൂരം. ഹൈഡ്രോപ്ലെയ്നിങ് സംഭവിച്ചാൽ ആക്സിലറേറ്റർ വിടുക, ബ്രേക്ക് അടിക്കരുത്." },
    { icon: "⛰️", title: "മല റോഡ് ടിപ്സ്", body: "കയറ്റത്തിൽ എഞ്ചിൻ ബുദ്ധിമുട്ടുന്നതിന് മുൻപ് ഡൗൺഷിഫ്റ്റ്. ഇറക്കത്തിൽ എഞ്ചിൻ ബ്രേക്കിങ്ങ് — ബ്രേക്ക് പെഡൽ തുടർച്ചയായി അമർത്തരുത്. ഹെയർപിൻ ബെൻഡിൽ ലെയ്ൻ വിടാതെ, ചെറിയ ഹോൺ, കയറുന്ന വാഹനത്തിന് വഴി." },
    { icon: "🛣️", title: "ഹൈവേ ഡ്രൈവിങ്", body: "സ്ഥിര വേഗത, ശരിയായ ലെയ്ൻ. വലത് ലെയ്ൻ ഓവർടേക്കിന് മാത്രം. ലെയ്ൻ മാറുന്നതിന് 3–5 സെക്കൻഡ് മുൻപ് ഇൻഡിക്കേറ്റർ. കുറഞ്ഞത് 3 സെക്കൻഡ് ദൂരം, രാത്രി/മഴയിൽ 5 സെക്കൻഡ്." },
    { icon: "🏙️", title: "സിറ്റി ട്രാഫിക്", body: "സിറ്റിയിൽ വാഹനങ്ങളെക്കാൾ ആളുകളെ വായിക്കൂ. കാൽനടയാത്രക്കാരുടെ കാലും തലയും നോക്കൂ, ഇരുചക്രവാഹനങ്ങൾ ഇരുവശത്തുനിന്നും വരാം, ജംഗ്ഷൻ ബ്ലോക്ക് ചെയ്യരുത്." },
    { icon: "🚦", title: "ഹെവി ട്രാഫിക്", body: "സ്ടോപ്പ്-ആൻഡ്-ഗോ ട്രാഫിക്കിൽ സ്മൂത് ആണ് ഫാസ്റ്റ്. ഒരു ലെയ്നിൽ നിൽക്കൂ, പകുതി കാർ ദൂരം, ലെയ്ൻ മാറൽ കുറയ്ക്കൂ." },
    { icon: "↔️", title: "ഇടുങ്ങിയ റോഡ്", body: "സെന്ററിൽ നിന്നും അൽപം ഇടത്തേക്ക്, കാണാവുന്ന ദൂരത്തിനുള്ളിൽ നിർത്താവുന്ന വേഗത. ബ്ലൈൻഡ് ബെൻഡിൽ ഹോൺ, വലിയ വാഹനത്തിന് വഴി, ആവശ്യമെങ്കിൽ പിന്നോട്ട് മാറുക." },
    { icon: "🅿️", title: "റിവേഴ്സ് പാർക്കിങ്", body: "മുൻകാറിന്റെ പിൻബമ്പറുമായി പിൻബമ്പർ ഒത്തുവരുമ്പോൾ വീൽ ഫുൾ ഇടത്, അകത്തെ മിറർ മുൻകാറിന്റെ ടെയിൽ കടന്നാൽ വീൽ നേരെ, പിൻചക്രം സ്ലോട്ടിൽ കയറിയാൽ കൗണ്ടർ-സ്റ്റിയർ. മിറർ + കാമറ രണ്ടും ഉപയോഗിക്കൂ." },
    { icon: "🅿️", title: "പാരലൽ പാർക്കിങ്", body: "കാറിന്റെ 1.5 മടങ്ങ് ഗ്യാപ്. മുൻകാറിന് സമാന്തരം, പിൻബമ്പറുകൾ ഒത്തുവരുമ്പോൾ പിന്നോട്ട്, ഫുൾ ഇടത്. 45° ആകുമ്പോൾ നേരെ, പിന്നെ ഫുൾ വലത് കൊണ്ട് മുൻഭാഗം അകത്തേക്ക്." },
    { icon: "🎯", title: "സ്റ്റിയറിങ് കൺട്രോൾ", body: "വീൽ 9, 3 സ്ഥാനത്ത്, പെരുവിരൽ റിമ്മിൽ. 90°-ൽ താഴെ പുൾ-പുഷ് രീതി. വീൽ കൈകളിലൂടെ തിരികെ വരുത്തുക — സ്പിൻ ചെയ്യരുത്. സ്മൂത് ഇൻപുട്ട് = സ്മൂത് വാഹനം." },
    { icon: "📈", title: "സ്പീഡ് കൺട്രോൾ", body: "സാധ്യമായ ഏറ്റവും മോശം സാഹചര്യത്തിന് അനുസരിച്ച് വേഗത സജ്ജമാക്കുക. കർവ് കടുപ്പമെങ്കിൽ വേഗത കുറയ്ക്കണം. ഇറക്കത്തിൽ എഞ്ചിൻ ബ്രേക്കിങ്, ഡൗൺഷിഫ്റ്റ്." },
    { icon: "🛑", title: "സുരക്ഷിത ബ്രേക്കിങ്", body: "പ്രോഗ്രസീവ് ബ്രേക്കിങ് — അമർത്തുക, ചവിട്ടരുത്. ABS ഉള്ള എമർജൻസിയിൽ ഫുൾ പ്രസ്സർ, പിടിച്ചുനിൽക്കൂ. കർവിൽ ബ്രേക്ക് ഇടരുത് — കർവിന് മുൻപേ വേഗത കുറയ്ക്കൂ." },
    { icon: "🔄", title: "യു-ടേൺ ടെക്നിക്", body: "അനുവദിച്ച സ്ഥലത്ത്, രണ്ടു ദിശയിലും 100 മീറ്റർ ദൃശ്യത. വലത് സിഗ്നൽ, വലത് ലെയ്ൻ, വേഗത കുറയ്ക്കൂ, മിറർ + ഷോൾഡർ ഗ്ലാൻസ്. കാറിന്റെ മുൻഭാഗം സെന്റർ ലൈൻ കടന്നാൽ ഫുൾ ലോക്ക്. ഇടുങ്ങിയ റോഡിൽ 3-പോയിന്റ് ടേൺ." },
    { icon: "↩️", title: "സുരക്ഷിത ഓവർടേക്ക്", body: "കുറഞ്ഞത് 10 സെക്കൻഡ് ദൃശ്യതയോടെ മാത്രം. വലത് സിഗ്നൽ, വേഗത വർദ്ധിപ്പിക്കൂ, സ്മൂത് ആയി ഇറങ്ങൂ, വൈകാതെ പൂർത്തിയാക്കൂ, ഇടത് സിഗ്നൽ, അകത്തെ മിററിൽ വാഹനം കാണുമ്പോൾ മാത്രം ലെയ്ൻ മാറൂ. ബെൻഡ്, ജംഗ്ഷൻ, ക്രോസിങ്, സ്കൂൾ — ഒരിക്കലും ഓവർടേക്ക് ചെയ്യരുത്." },
    { icon: "⬅️", title: "ഇടത് വശം വിലയിരുത്തൽ", body: "ഡ്രൈവർ വലത് വശത്ത് ഇരിക്കുന്നതിനാൽ ഇടത് വശം വിലയിരുത്താൻ ബുദ്ധിമുട്ടാണ്. ഇടത് മിറർ, ബോണറ്റിന്റെ മുൻ-ഇടത് കോൺ റഫറൻസ്. ഒഴിഞ്ഞ സ്ഥലത്ത് കോൺസ് ഉപയോഗിച്ച് പ്രാക്ടീസ് ചെയ്യൂ." },
    { icon: "➡️", title: "വലത് വശം വിലയിരുത്തൽ", body: "ഡോർ-ലൈൻ റഫറൻസ്, മിററിൽ നിന്നും അടുത്ത വാഹനത്തിലേക്കോ മതിലിലേക്കോ കുറഞ്ഞത് 60 സെ.മീ. പാർക്ക് ചെയ്ത വാഹനങ്ങൾക്ക് അരികിലൂടെ പോകുമ്പോൾ വാതിൽ തുറക്കാം, കാൽനടയാത്രക്കാർ ഇറങ്ങാം — ജാഗ്രത." },
    { icon: "🚛", title: "ദൈർഘ്യ വാഹന ദൂര വിലയിരുത്തൽ", body: "ലോറി, ബസ്സ് — കാണുന്നതിലും കൂടുതൽ സ്ഥലവും സമയവും വേണം. ബ്ലൈൻഡ് ബെൻഡിൽ ഓവർടേക്ക് ചെയ്യരുത്, പിൻചക്രങ്ങൾക്ക് അരികിലെ ബ്ലൈൻഡ് സ്പോട്ടിൽ നിൽക്കരുത്. ഫോളോ ചെയ്യുമ്പോൾ ഇരട്ടി ദൂരം — ഡ്രൈവർ മിറർ കാണാനാവുന്നില്ലെങ്കിൽ അവർ നിങ്ങളെ കാണുന്നില്ല." },
  ],
};

// Kerala RTO Traffic Signs (representative set)
type SignDef = { name: string; desc: string; shape: "warning" | "mandatory" | "info"; glyph: string };
export const signsContent: Record<Lang, { warning: SignDef[]; mandatory: SignDef[]; informatory: SignDef[] }> = {
  en: {
    warning: [
      { name: "Right Hand Curve", desc: "Sharp right curve ahead — slow down and stay in lane.", shape: "warning", glyph: "↱" },
      { name: "Left Hand Curve", desc: "Sharp left curve ahead — reduce speed before entry.", shape: "warning", glyph: "↰" },
      { name: "Steep Ascent", desc: "Steep uphill ahead — downshift early to maintain torque.", shape: "warning", glyph: "⬈" },
      { name: "Steep Descent", desc: "Steep downhill ahead — use engine braking, avoid riding the brake.", shape: "warning", glyph: "⬊" },
      { name: "Narrow Road Ahead", desc: "Road narrows — give way to oncoming traffic if needed.", shape: "warning", glyph: "↔" },
      { name: "Pedestrian Crossing", desc: "Pedestrians may cross — slow down and yield.", shape: "warning", glyph: "🚶" },
      { name: "School Ahead", desc: "School zone — children may cross. Drive at low speed.", shape: "warning", glyph: "🏫" },
      { name: "Slippery Road", desc: "Surface may be slippery — reduce speed, avoid harsh braking.", shape: "warning", glyph: "⚠" },
      { name: "Cattle Crossing", desc: "Animals may cross the road — be ready to stop.", shape: "warning", glyph: "🐄" },
      { name: "Road Hump", desc: "Speed breaker ahead — slow down before crossing.", shape: "warning", glyph: "⌒" },
    ],
    mandatory: [
      { name: "Stop", desc: "Stop completely at the line, check all sides, then proceed when safe.", shape: "mandatory", glyph: "STOP" },
      { name: "Give Way", desc: "Yield to traffic on the main road.", shape: "mandatory", glyph: "▽" },
      { name: "No Entry", desc: "Entry prohibited for all vehicles in this direction.", shape: "mandatory", glyph: "⛔" },
      { name: "No Parking", desc: "Parking prohibited on this stretch.", shape: "mandatory", glyph: "P̸" },
      { name: "No Horn", desc: "Use of horn prohibited — silent zone (hospitals/schools).", shape: "mandatory", glyph: "🔇" },
      { name: "Speed Limit", desc: "Maximum permitted speed in km/h as shown on the sign.", shape: "mandatory", glyph: "50" },
      { name: "Compulsory Turn Left", desc: "All vehicles must turn left.", shape: "mandatory", glyph: "←" },
      { name: "Compulsory Turn Right", desc: "All vehicles must turn right.", shape: "mandatory", glyph: "→" },
      { name: "Compulsory Ahead", desc: "Proceed straight only.", shape: "mandatory", glyph: "↑" },
      { name: "U-Turn Prohibited", desc: "U-turn not allowed at this point.", shape: "mandatory", glyph: "⟲̸" },
    ],
    informatory: [
      { name: "Hospital", desc: "Hospital nearby — drive slowly, avoid horn.", shape: "info", glyph: "H" },
      { name: "Fuel Station", desc: "Petrol/diesel station ahead.", shape: "info", glyph: "⛽" },
      { name: "Parking", desc: "Designated parking area.", shape: "info", glyph: "P" },
      { name: "Public Toilet", desc: "Public restroom available.", shape: "info", glyph: "WC" },
      { name: "Eating Place", desc: "Restaurant or food stop ahead.", shape: "info", glyph: "🍴" },
      { name: "First Aid Post", desc: "First aid available — useful in emergencies.", shape: "info", glyph: "✚" },
      { name: "Telephone", desc: "Public telephone facility.", shape: "info", glyph: "☎" },
      { name: "Bus Stop", desc: "Bus stop ahead — watch for stopping vehicles.", shape: "info", glyph: "🚌" },
    ],
  },
  ml: {
    warning: [
      { name: "വലത് വളവ്", desc: "മൂർച്ചയുള്ള വലത് വളവ് — വേഗത കുറയ്ക്കൂ, ലെയ്നിൽ നിൽക്കൂ.", shape: "warning", glyph: "↱" },
      { name: "ഇടത് വളവ്", desc: "മൂർച്ചയുള്ള ഇടത് വളവ് — പ്രവേശിക്കും മുൻപ് വേഗത കുറയ്ക്കൂ.", shape: "warning", glyph: "↰" },
      { name: "കുത്തനെയുള്ള കയറ്റം", desc: "കുത്തനെയുള്ള കയറ്റം — നേരത്തേ ഡൗൺഷിഫ്റ്റ്.", shape: "warning", glyph: "⬈" },
      { name: "കുത്തനെയുള്ള ഇറക്കം", desc: "കുത്തനെയുള്ള ഇറക്കം — എഞ്ചിൻ ബ്രേക്കിങ് ഉപയോഗിക്കൂ.", shape: "warning", glyph: "⬊" },
      { name: "ഇടുങ്ങിയ റോഡ്", desc: "റോഡ് ഇടുങ്ങുന്നു — ആവശ്യമെങ്കിൽ വഴി കൊടുക്കൂ.", shape: "warning", glyph: "↔" },
      { name: "കാൽനട ക്രോസിങ്", desc: "കാൽനടയാത്രക്കാർ കടന്നുപോകാം — വേഗത കുറയ്ക്കൂ.", shape: "warning", glyph: "🚶" },
      { name: "സ്കൂൾ", desc: "സ്കൂൾ സോൺ — കുട്ടികൾ കടന്നുപോകാം. കുറഞ്ഞ വേഗത്തിൽ ഓടിക്കൂ.", shape: "warning", glyph: "🏫" },
      { name: "സ്ലിപ്പറി റോഡ്", desc: "റോഡ് വഴുക്കാം — വേഗത കുറയ്ക്കൂ, പെട്ടെന്ന് ബ്രേക്ക് ഇടരുത്.", shape: "warning", glyph: "⚠" },
      { name: "കന്നുകാലി ക്രോസിങ്", desc: "മൃഗങ്ങൾ റോഡ് കടന്നുപോകാം — നിർത്താൻ തയ്യാറാവുക.", shape: "warning", glyph: "🐄" },
      { name: "റോഡ് ഹംപ്", desc: "സ്പീഡ് ബ്രേക്കർ — കടക്കും മുൻപ് വേഗത കുറയ്ക്കൂ.", shape: "warning", glyph: "⌒" },
    ],
    mandatory: [
      { name: "സ്റ്റോപ്പ്", desc: "ലൈനിൽ പൂർണ്ണമായും നിർത്തുക, എല്ലാ വശവും പരിശോധിക്കുക, പിന്നെ മാത്രം നീങ്ങുക.", shape: "mandatory", glyph: "STOP" },
      { name: "ഗിവ് വേ", desc: "മെയിൻ റോഡിലെ ട്രാഫിക്കിന് വഴി കൊടുക്കുക.", shape: "mandatory", glyph: "▽" },
      { name: "നോ എൻട്രി", desc: "ഈ ദിശയിലേക്ക് വാഹനങ്ങൾ പ്രവേശിക്കരുത്.", shape: "mandatory", glyph: "⛔" },
      { name: "നോ പാർക്കിങ്", desc: "ഇവിടെ പാർക്കിങ് വിലക്കിയിരിക്കുന്നു.", shape: "mandatory", glyph: "P̸" },
      { name: "നോ ഹോൺ", desc: "ഹോൺ വിലക്കിയ ഏരിയ — സൈലന്റ് സോൺ (ആശുപത്രി/സ്കൂൾ).", shape: "mandatory", glyph: "🔇" },
      { name: "സ്പീഡ് ലിമിറ്റ്", desc: "സൈനിൽ കാണിച്ച പരമാവധി വേഗത km/h.", shape: "mandatory", glyph: "50" },
      { name: "നിർബന്ധിത ഇടത് ടേൺ", desc: "എല്ലാ വാഹനങ്ങളും ഇടത്തേക്ക് തിരിയണം.", shape: "mandatory", glyph: "←" },
      { name: "നിർബന്ധിത വലത് ടേൺ", desc: "എല്ലാ വാഹനങ്ങളും വലത്തേക്ക് തിരിയണം.", shape: "mandatory", glyph: "→" },
      { name: "നേരെ പോകൂ", desc: "നേരെ മാത്രം പോകുക.", shape: "mandatory", glyph: "↑" },
      { name: "യു-ടേൺ വിലക്ക്", desc: "ഇവിടെ യു-ടേൺ അനുവദനീയമല്ല.", shape: "mandatory", glyph: "⟲̸" },
    ],
    informatory: [
      { name: "ആശുപത്രി", desc: "ആശുപത്രി സമീപം — സാവധാനം, ഹോൺ ഒഴിവാക്കൂ.", shape: "info", glyph: "H" },
      { name: "ഫ്യൂവൽ സ്റ്റേഷൻ", desc: "പെട്രോൾ/ഡീസൽ സ്റ്റേഷൻ മുന്നിൽ.", shape: "info", glyph: "⛽" },
      { name: "പാർക്കിങ്", desc: "നിയുക്ത പാർക്കിങ് ഏരിയ.", shape: "info", glyph: "P" },
      { name: "പബ്ലിക് ടോയ്‌ലെറ്റ്", desc: "പൊതു റെസ്റ്റ്റൂം ലഭ്യം.", shape: "info", glyph: "WC" },
      { name: "ഭക്ഷണ ശാല", desc: "റെസ്റ്റോറന്റ് അല്ലെങ്കിൽ ഫുഡ് സ്റ്റോപ്പ്.", shape: "info", glyph: "🍴" },
      { name: "ഫസ്റ്റ് എയ്ഡ്", desc: "പ്രഥമശുശ്രൂഷ ലഭ്യം — അടിയന്തരാവസ്ഥയിൽ ഉപകാരപ്രദം.", shape: "info", glyph: "✚" },
      { name: "ടെലിഫോൺ", desc: "പബ്ലിക് ടെലിഫോൺ സൗകര്യം.", shape: "info", glyph: "☎" },
      { name: "ബസ് സ്റ്റോപ്പ്", desc: "ബസ് സ്റ്റോപ്പ് മുന്നിൽ — നിർത്തുന്ന വാഹനങ്ങൾ ശ്രദ്ധിക്കൂ.", shape: "info", glyph: "🚌" },
    ],
  },
};
