import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dict, type Lang, type Dict } from "./dict";
import type { PageContent } from "@/api/content";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LangCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "gc.lang";

export function LanguageProvider({ children, dynamicContent = [] }: { children: ReactNode; dynamicContent?: PageContent[] }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Read persisted language on the client (SSR-safe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "hi") {
        setLangState(saved);
        document.documentElement.lang = saved === "hi" ? "hi" : "en";
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l === "hi" ? "hi" : "en";
    } catch {
      /* ignore */
    }
  };

  const t = useMemo(() => {
    const base = { ...dict[lang] };
    
    // Merge dynamic content
    dynamicContent.filter(c => c.language === lang).forEach(c => {
      const page = (base as any)[c.page_slug];
      if (page) {
        page[c.section_key] = c.content_value;
      }
    });
    
    return base as Dict;
  }, [lang, dynamicContent]);

  const value = useMemo<Ctx>(() => ({ lang, setLang, t }), [lang, t]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useT() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
