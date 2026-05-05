import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { getServices, upsertService, deleteService, ServiceEntry, UpsertServiceInput } from "@/api/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Briefcase, 
  Scale, 
  Shield, 
  FileText,
  Clock,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  LayoutGrid,
  List,
  Package,
  Save,
  Loader2,
  AlertCircle
} from "lucide-react";

export const Route = createFileRoute("/admin/services")({
  component: AdminServicesDashboard,
});

const CATEGORIES = [
  { value: "Loans", label: "Loans", icon: Briefcase, color: "bg-blue-500/10 text-blue-600" },
  { value: "Legal", label: "Legal", icon: Scale, color: "bg-purple-500/10 text-purple-600" },
  { value: "Insurance", label: "Insurance", icon: Shield, color: "bg-green-500/10 text-green-600" },
  { value: "Documentation", label: "Documentation", icon: FileText, color: "bg-orange-500/10 text-orange-600" },
];

const DEFAULT_FORM: UpsertServiceInput = {
  slug: "", name: "", category: "Loans", tagline: "", benefit: "",
  processing_time: "", compliance_rate: "100%", success_rate: "98%",
  eligibility: "", documents: [], icon_name: "Briefcase"
};

function AdminServicesDashboard() {
  const [services, setServices] = useState<ServiceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<UpsertServiceInput>(DEFAULT_FORM);
  const [docInput, setDocInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const loadData = async () => {
    try {
      const res = await getServices();
      setServices(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? s.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    return CATEGORIES.map(cat => ({
      ...cat,
      count: services.filter(s => s.category === cat.value).length
    }));
  }, [services]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    if (!token) return;
    
    setSaving(true);
    try {
      await upsertService({ data: { ...form, token } });
      setForm(DEFAULT_FORM);
      setShowForm(false);
      setIsEditing(false);
      loadData();
    } catch (err) {
      alert("Error saving service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    const token = localStorage.getItem("admin_token");
    if (!token || !confirm("Are you sure you want to delete this service?")) return;

    try {
      await deleteService({ data: { slug, token } });
      loadData();
    } catch (err) {
      alert("Error deleting service");
    }
  };

  const editItem = (item: ServiceEntry) => {
    setForm({
      slug: item.slug, name: item.name, category: item.category,
      tagline: item.tagline, benefit: item.benefit,
      processing_time: item.processing_time, compliance_rate: item.compliance_rate,
      success_rate: item.success_rate, eligibility: item.eligibility,
      documents: Array.isArray(item.documents) ? item.documents : [], 
      icon_name: item.icon_name
    });
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setForm(DEFAULT_FORM);
    setIsEditing(false);
    setShowForm(false);
    setDocInput("");
  };

  const addDocument = () => {
    if (docInput.trim()) {
      setForm({...form, documents: [...form.documents, docInput.trim()]});
      setDocInput("");
    }
  };

  const removeDocument = (index: number) => {
    const docs = Array.isArray(form.documents) ? form.documents : [];
    setForm({...form, documents: docs.filter((_, idx) => idx !== index)});
  };

  const getCategoryStyle = (category: string) => {
    return CATEGORIES.find(c => c.value === category)?.color || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryCounts.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(selectedCategory === cat.value ? null : cat.value)}
            className={`relative rounded-2xl border p-4 text-left transition-all hover:shadow-soft ${
              selectedCategory === cat.value 
                ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                : "border-border bg-surface"
            }`}
          >
            <div className={`inline-flex rounded-lg p-2 ${cat.color}`}>
              <cat.icon className="h-5 w-5" />
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{cat.count}</p>
              <p className="text-sm text-muted-foreground">{cat.label}</p>
            </div>
            {selectedCategory === cat.value && (
              <Badge variant="secondary" className="absolute right-3 top-3">Active</Badge>
            )}
          </button>
        ))}
      </div>

      {/* Add New Service Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-surface py-6 transition-all hover:border-primary hover:bg-primary/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium">Create New Service</p>
            <p className="text-sm text-muted-foreground">Add a new service to your offerings</p>
          </div>
        </button>
      )}

      {/* Service Form */}
      {showForm && (
        <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">
                {isEditing ? "Edit Service" : "Create New Service"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isEditing ? "Update service details below" : "Fill in the details to create a new service"}
              </p>
            </div>
            <button
              onClick={cancelEdit}
              className="rounded-full p-2 transition-colors hover:bg-muted"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Basic Info Section */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider">Service Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={e => setForm({
                    ...form, 
                    name: e.target.value, 
                    slug: form.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                  })}
                  placeholder="e.g. Home Loan"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider">URL Slug</Label>
                <Input
                  required
                  value={form.slug}
                  onChange={e => setForm({...form, slug: e.target.value})}
                  placeholder="e.g. home-loan"
                  className="h-11 font-mono text-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider">Category</Label>
                <div className="flex rounded-xl bg-muted p-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setForm({...form, category: cat.value})}
                      className={`flex-1 rounded-lg py-2 text-xs font-medium transition-all ${
                        form.category === cat.value
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tagline & Description */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider">Tagline</Label>
              <Input
                required
                value={form.tagline}
                onChange={e => setForm({...form, tagline: e.target.value})}
                placeholder="Short, catchy description of the service"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider">Benefit / Description</Label>
              <textarea
                required
                value={form.benefit}
                onChange={e => setForm({...form, benefit: e.target.value})}
                placeholder="Describe the key benefits and value proposition..."
                className="min-h-[100px] w-full rounded-lg border border-border bg-background p-3 text-sm leading-relaxed outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
              />
            </div>

            {/* Processing & Icon */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-xs font-semibold uppercase tracking-wider">Processing Time</Label>
                </div>
                <Input
                  required
                  value={form.processing_time}
                  onChange={e => setForm({...form, processing_time: e.target.value})}
                  placeholder="e.g. 2-3 days"
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-xs font-semibold uppercase tracking-wider">Icon Name</Label>
                </div>
                <Input
                  required
                  value={form.icon_name}
                  onChange={e => setForm({...form, icon_name: e.target.value})}
                  placeholder="e.g. Briefcase, Home, Shield"
                  className="h-11"
                />
                <p className="text-[10px] text-muted-foreground">Lucide icon names only</p>
              </div>
            </div>

            {/* Documents Required */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold uppercase tracking-wider">Required Documents</Label>
                <span className="text-xs text-muted-foreground">{form.documents.length} added</span>
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={docInput}
                  onChange={e => setDocInput(e.target.value)}
                  placeholder="Add a document requirement..."
                  className="h-11 flex-1"
                  onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addDocument())}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addDocument}
                  disabled={!docInput.trim()}
                  className="h-11 gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              {Array.isArray(form.documents) && form.documents.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.documents.map((doc, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="group flex items-center gap-2 px-3 py-2 text-sm"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      {doc}
                      <button
                        type="button"
                        onClick={() => removeDocument(i)}
                        className="rounded-full p-0.5 transition-colors hover:bg-destructive/20 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-border pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={cancelEdit}
                disabled={saving}
              >
                Cancel
              </Button>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={saving}
                  className="h-11 gap-2 px-6"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {isEditing ? "Update Service" : "Create Service"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="h-11 pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
          </span>
          <div className="flex rounded-lg border border-border bg-background p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-2 transition-colors ${viewMode === "grid" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-md p-2 transition-colors ${viewMode === "list" ? "bg-muted" : "hover:bg-muted/50"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid/List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface py-16">
          <Package className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium">No services found</p>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "Try adjusting your search" : "Create your first service to get started"}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map(item => (
            <div
              key={item.id}
              className="group relative rounded-2xl border border-border bg-background p-5 transition-all hover:border-primary/20 hover:shadow-soft"
            >
              <div className="flex items-start justify-between">
                <Badge className={`${getCategoryStyle(item.category)} border-0 font-medium`}>
                  {item.category}
                </Badge>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => editItem(item)}
                    className="rounded-lg p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.slug)}
                    className="rounded-lg p-2 transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="mt-3 font-display text-lg font-bold">{item.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.tagline}</p>
              
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {item.processing_time}
                </span>
                <span className="flex items-center gap-1">
                  <Package className="h-3.5 w-3.5" />
                  {(Array.isArray(item.documents) ? item.documents : []).length} docs
                </span>
              </div>
              
              <p className="mt-2 font-mono text-[10px] text-muted-foreground/60">/{item.slug}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
          <div className="divide-y divide-border">
            {filteredServices.map(item => (
              <div
                key={item.id}
                className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
              >
                <Badge className={`${getCategoryStyle(item.category)} border-0 shrink-0 font-medium`}>
                  {item.category}
                </Badge>
                
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{item.tagline}</p>
                </div>
                
                <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {item.processing_time}
                  </span>
                  <span className="font-mono text-muted-foreground/60">/{item.slug}</span>
                </div>
                
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => editItem(item)}
                    className="rounded-lg p-2 transition-colors hover:bg-primary/10 hover:text-primary"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.slug)}
                    className="rounded-lg p-2 transition-colors hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
