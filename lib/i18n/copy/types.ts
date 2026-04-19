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
  header: {
    brand: string;
    tagline: string;
    nav: {
      capabilities: string;
      solutions: string;
      factory: string;
      quality: string;
      products: string;
      contact: string;
    };
    /** 切换语言时显示的对方语言名，如中文站显示 English */
    altLocaleLabel: string;
  };
  hero: {
    contact: string;
    heroImageAlt: string;
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
    metal: { title: string; desc: string };
    rubber: { title: string; desc: string };
    parts: { title: string; desc: string };
  };
  /** 位于「产品与工艺」之后，按金属/橡胶/部件展示图库 */
  productShowcase: {
    title: string;
    /** 制造组合三卡底部，跳转至下方对应产品展示区块 */
    jumpFromSolutions: string;
    showMore: string;
    showLess: string;
  };
  about: {
    title: string;
    p1: string;
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
    intro: string;
    /** 仅用于图片无障碍 alt，不在页面上展示 */
    categories: string[];
  };
  contact: {
    title: string;
    contactPerson: string;
    nameLine: string;
    contactMethodsTitle: string;
    emailLabel: string;
    email: string;
    mobileLabel: string;
    mobile: string;
    /** 用于 <a href="tel:…">，如 +64223994155 */
    mobileTelHref: string;
    whatsAppLabel: string;
    whatsApp: string;
    /** 用于 WhatsApp 链接，如 https://wa.me/64223994155 */
    whatsAppHref: string;
    address: string;
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
