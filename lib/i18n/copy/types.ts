/** 全站首页可替换文案（CMS 以外）+ CMS 缺省回退 */
export type SiteDictionary = {
  meta: { title: string; description: string };
  cmsFallback: {
    heroTitle: { zh: string; en: string };
    heroLead: { zh: string; en: string };
    heroSub: { zh: string; en: string };
    spotlightTitle: { zh: string; en: string };
    spotlightBody: { zh: string; en: string };
  };
  skipToContent: string;
  header: {
    brand: string;
    tagline: string;
    badge: string;
    nav: {
      capabilities: string;
      solutions: string;
      factory: string;
      quality: string;
      products: string;
      customers: string;
      contact: string;
    };
    altLocaleLabel: string;
  };
  hero: {
    contact: string;
    official: string;
    /** 头图三张可点击入口的说明 */
    tileAlts: [string, string, string];
    tileHint: string;
  };
  spotlight: { ctaQuality: string };
  pillars: {
    title: string;
    intro: string;
    cards: { title: string; desc: string; link: string; anchor: string }[];
  };
  solutions: {
    title: string;
    intro: string;
    items: {
      title: string;
      desc: string;
      image: string;
      cta: string;
    }[];
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  culture: {
    title: string;
    items: { title: string; desc: string; more: string; href: string }[];
  };
  factory: { title: string; intro: string; captions: string[] };
  equipment: { title: string; captions: string[] };
  quality: { title: string; certAlt: string };
  midCta: { title: string; desc: string; button: string };
  products: {
    title: string;
    showcaseTitle: string;
    categories: [string, string, string];
    industriesOneLine: string;
  };
  customers: { title: string; intro: string; altPat: string };
  contact: {
    title: string;
    intro: string;
    emailLabel: string;
    emailValue: string;
    mobileLabel: string;
    mobileValue: string;
    whatsappLabel: string;
    whatsappDisplay: string;
    whatsappHref: string;
    address: string;
    website: string;
    addressLines: string[];
  };
  inquiry: {
    title: string;
    subtitle: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    errorConfig: string;
    privacy: string;
  };
  footer: {
    copyright: string;
  };
};
