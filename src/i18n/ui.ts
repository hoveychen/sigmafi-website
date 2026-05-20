export const languages = {
  en: "EN",
  zh: "中文",
} as const;

export const defaultLang = "en" as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    "nav.research": "Research",
    "nav.technology": "Technology",
    "nav.markets": "Markets",
    "nav.about": "About",
    "nav.careers": "Careers",
    "nav.contact": "Contact",
    "nav.cta": "Get in touch",

    "footer.tagline":
      "A technology-driven multi-asset quantitative trading firm.",
    "footer.col.company": "Company",
    "footer.col.platform": "Platform",
    "footer.col.legal": "Legal",
    "footer.about": "About",
    "footer.careers": "Careers",
    "footer.contact": "Contact",
    "footer.research": "Research",
    "footer.technology": "Technology",
    "footer.markets": "Markets",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.disclosures": "Disclosures",
    "footer.copyright": "© 2026 SigmaFi Research. All rights reserved.",
    "footer.regulatory":
      "SFC Type 9 licence application in progress — Hong Kong SAR.",

    "lang.switch": "中文",
    "lang.label": "Language",

    "common.read_more": "Read more",
    "common.learn_more": "Learn more",
    "common.explore": "Explore",
    "common.live": "LIVE",
    "common.next": "Next",
    "common.back": "Back",
  },
  zh: {
    "nav.research": "研究",
    "nav.technology": "技术",
    "nav.markets": "市场",
    "nav.about": "关于",
    "nav.careers": "招聘",
    "nav.contact": "联系",
    "nav.cta": "与我们联系",

    "footer.tagline": "技术驱动的多资产量化交易公司。",
    "footer.col.company": "公司",
    "footer.col.platform": "平台",
    "footer.col.legal": "法律",
    "footer.about": "关于",
    "footer.careers": "招聘",
    "footer.contact": "联系",
    "footer.research": "研究",
    "footer.technology": "技术",
    "footer.markets": "市场",
    "footer.terms": "服务条款",
    "footer.privacy": "隐私政策",
    "footer.disclosures": "信息披露",
    "footer.copyright": "© 2026 SigmaFi Research. 保留所有权利。",
    "footer.regulatory": "香港 SFC 9 号牌照申请中。",

    "lang.switch": "EN",
    "lang.label": "语言",

    "common.read_more": "阅读更多",
    "common.learn_more": "了解更多",
    "common.explore": "查看",
    "common.live": "实时",
    "common.next": "下一项",
    "common.back": "返回",
  },
} as const;

export type UIKey = keyof (typeof ui)["en"];

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split("/");
  if (maybeLang in languages) return maybeLang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Resolve a localized path. English (default) lives at the root.
 * Chinese lives under /zh.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLang) return clean === "/" ? "/" : clean;
  return clean === "/" ? "/zh/" : `/zh${clean}`;
}

/**
 * Given the current URL, build the URL for the "other" language.
 */
export function alternateLangPath(url: URL, target: Lang): string {
  const path = url.pathname;
  const stripped = path.replace(/^\/zh(\/|$)/, "/");
  return localizePath(stripped === "" ? "/" : stripped, target);
}
