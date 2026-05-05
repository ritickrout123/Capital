import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getAllContent, upsertWithTranslation, PageContent } from "@/api/content";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { dict } from "@/i18n/dict";
import { 
  ChevronRight, 
  Layout, 
  Type, 
  Globe, 
  Save, 
  Loader2, 
  CheckCircle2, 
  Languages, 
  Sparkles,
  Eye,
  AlertCircle
} from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminContentDashboard,
});

type InputLang = "en" | "hi";

interface SectionEditorProps {
  pageId: string;
  sectionKey: string;
  dbContent: PageContent[];
  inputLang: InputLang;
  autoTranslate: boolean;
  onSave: (key: string, status: "saving" | "saved" | "error") => void;
  saveStatus: Record<string, "saving" | "saved" | "error">;
}

function SectionEditor({ 
  pageId, 
  sectionKey, 
  dbContent, 
  inputLang, 
  autoTranslate, 
  onSave, 
  saveStatus 
}: SectionEditorProps) {
  const targetLang = inputLang === "en" ? "hi" : "en";
  const [inputValue, setInputValue] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Get current values from DB or dictionary
  const getStoredValue = useCallback((lang: InputLang) => {
    const found = dbContent.find(c => c.page_slug === pageId && c.section_key === sectionKey && c.language === lang);
    return found ? found.content_value : (dict[lang] as any)[pageId]?.[sectionKey] || "";
  }, [dbContent, pageId, sectionKey]);

  // Initialize input value
  useEffect(() => {
    setInputValue(getStoredValue(inputLang));
    setIsDirty(false);
  }, [pageId, sectionKey, inputLang, getStoredValue]);

  const handleSave = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    onSave(sectionKey, "saving");
    
    try {
      await upsertWithTranslation({ 
        data: { 
          page_slug: pageId, 
          section_key: sectionKey, 
          sourceLang: inputLang, 
          content_value: inputValue, 
          autoTranslate,
          token 
        } 
      });
      onSave(sectionKey, "saved");
      setIsDirty(false);
      setTimeout(() => onSave(sectionKey, "" as any), 2000);
    } catch (err) {
      onSave(sectionKey, "error");
    }
  };

  const status = saveStatus[sectionKey];

  return (
    <div className="group rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/20 hover:shadow-soft">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-tight">
            {sectionKey}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {status === "saving" && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Saving...
            </span>
          )}
          {status === "saved" && (
            <span className="flex items-center gap-1 text-xs font-medium text-success">
              <CheckCircle2 className="h-3 w-3" /> Saved
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-1 text-xs font-medium text-destructive">
              <AlertCircle className="h-3 w-3" /> Error
            </span>
          )}
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!isDirty || status === "saving"}
            className="h-7 gap-1.5 px-3 text-xs"
          >
            <Save className="h-3 w-3" />
            Save{autoTranslate && " & Translate"}
          </Button>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-primary">
              {inputLang === "en" ? "🇬🇧 English" : "🇮🇳 Hindi"}
            </span>
            <span className="text-muted-foreground">Input</span>
          </label>
          {autoTranslate && (
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              Auto-translates to {targetLang === "en" ? "English" : "Hindi"}
            </span>
          )}
        </div>
        
        <textarea
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsDirty(true);
          }}
          placeholder={`Enter content in ${inputLang === "en" ? "English" : "Hindi"}...`}
          className="min-h-[100px] w-full rounded-lg border border-border bg-surface p-3 text-sm leading-relaxed outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
        />
      </div>

      {/* Preview Toggle */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <Eye className="h-3 w-3" />
        {showPreview ? "Hide" : "Show"} {targetLang === "en" ? "English" : "Hindi"} version
        <ChevronRight className={`h-3 w-3 transition-transform ${showPreview ? "rotate-90" : ""}`} />
      </button>

      {/* Preview Section */}
      {showPreview && (
        <div className="mt-3 rounded-lg border border-border/50 bg-muted/30 p-3">
          <label className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1.5">
              {targetLang === "en" ? "🇬🇧" : "🇮🇳"}
              {targetLang === "en" ? "English" : "Hindi"}
            </span>
            <span className="text-muted-foreground/60">
              ({autoTranslate ? "Auto-translated on save" : "Stored value"})
            </span>
          </label>
          <div className="text-sm text-muted-foreground">
            {getStoredValue(targetLang) || (
              <span className="italic text-muted-foreground/50">
                No {targetLang === "en" ? "English" : "Hindi"} content yet...
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AdminContentDashboard() {
  const [dbContent, setDbContent] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [inputLang, setInputLang] = useState<InputLang>("en");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [saveStatus, setSaveStatus] = useState<Record<string, "saving" | "saved" | "error">>({});

  const loadContent = async () => {
    try {
      const res = await getAllContent();
      setDbContent(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Map of available pages from dictionary
  const pages = useMemo(() => {
    const keys = Object.keys(dict.en).filter(k => typeof (dict.en as any)[k] === "object");
    return keys.map(k => ({
      id: k,
      name: k.charAt(0).toUpperCase() + k.slice(1),
      sections: Object.keys((dict.en as any)[k])
    }));
  }, []);

  const handleSaveStatus = (key: string, status: "saving" | "saved" | "error") => {
    setSaveStatus(prev => ({ ...prev, [key]: status }));
    if (status === "saved") {
      loadContent(); // Refresh content after save
    }
  };

  const activeSections = pages.find(p => p.id === activePage)?.sections || [];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 lg:flex-shrink-0">
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
            <h3 className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Pages
            </h3>
            <nav className="space-y-1">
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    activePage === page.id 
                      ? "bg-primary text-primary-foreground shadow-glow" 
                      : "hover:bg-secondary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layout className="h-4 w-4" /> {page.name}
                  </span>
                  <ChevronRight className={`h-3.5 w-3.5 transition-transform ${activePage === page.id ? "rotate-90" : ""}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Global Settings */}
          <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
            <h3 className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Settings
            </h3>
            
            {/* Language Toggle */}
            <div className="mb-4">
              <label className="mb-2 flex items-center gap-2 px-2 text-xs font-medium text-foreground">
                <Languages className="h-3.5 w-3.5 text-primary" />
                Input Language
              </label>
              <div className="flex rounded-xl bg-muted p-1">
                <button
                  onClick={() => setInputLang("en")}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
                    inputLang === "en"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => setInputLang("hi")}
                  className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
                    inputLang === "hi"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  🇮🇳 Hindi
                </button>
              </div>
            </div>

            {/* Auto-translate Toggle */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-medium">Auto-translate</span>
              </div>
              <Switch
                checked={autoTranslate}
                onCheckedChange={setAutoTranslate}
              />
            </div>
            <p className="mt-2 px-2 text-[10px] leading-relaxed text-muted-foreground">
              {autoTranslate 
                ? `Content will be automatically translated from ${inputLang === "en" ? "English to Hindi" : "Hindi to English"} on save.`
                : "Only the input language will be saved. The other language won't be updated."}
            </p>
          </div>
        </div>
      </aside>

      {/* Content Editor */}
      <div className="flex-1 min-w-0">
        {/* Mobile Page Title */}
        <div className="mb-6 lg:hidden">
          <h1 className="font-display text-xl font-bold">Content Management</h1>
          <p className="text-sm text-muted-foreground">{activeSections.length} sections on {activePage}</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6 shadow-soft">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)} Content
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeSections.length} sections • Input: {inputLang === "en" ? "English" : "Hindi"}
                {autoTranslate && " • Auto-translation enabled"}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Globe className="h-3.5 w-3.5" /> 
              Changes sync instantly
            </div>
          </div>

          {/* Quick Language Switch (mobile-friendly) */}
          <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl bg-muted/50 p-3 sm:gap-3 lg:hidden">
            <span className="text-xs font-medium text-muted-foreground">Input:</span>
            <div className="flex rounded-lg bg-background p-1 shadow-sm">
              <button
                onClick={() => setInputLang("en")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  inputLang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setInputLang("hi")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  inputLang === "hi" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                Hindi
              </button>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Switch
                checked={autoTranslate}
                onCheckedChange={setAutoTranslate}
                className="scale-75"
              />
              <Sparkles className={`h-3.5 w-3.5 ${autoTranslate ? "text-accent" : "text-muted-foreground"}`} />
            </div>
          </div>

          {/* Sections Grid */}
          <div className="grid gap-4">
            {activeSections.map(key => (
              <SectionEditor
                key={key}
                pageId={activePage}
                sectionKey={key}
                dbContent={dbContent}
                inputLang={inputLang}
                autoTranslate={autoTranslate}
                onSave={handleSaveStatus}
                saveStatus={saveStatus}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
