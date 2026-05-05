import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  // Read token immediately on mount to avoid loading flash after login
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_token");
    }
    return null;
  });

  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem("admin_token");
      setToken(currentToken);
      if (!currentToken && window.location.pathname !== "/admin/login") {
        router.navigate({ to: "/admin/login" });
      }
    };

    checkToken();
    
    // Listen for login/logout in other tabs or via custom events
    window.addEventListener("storage", checkToken);
    window.addEventListener("admin_auth_change", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("admin_auth_change", checkToken);
    };
  }, [router]);

  const isLoginPage = typeof window !== "undefined" && window.location.pathname === "/admin/login";

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    router.navigate({ to: "/admin/login" });
    // Notify other components
    window.dispatchEvent(new Event("admin_auth_change"));
  };

  if (isLoginPage) {
    return <main><Outlet /></main>;
  }

  return (
    <div className="min-h-screen bg-surface-strong">
      <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="container-wide flex h-16 items-center">
          {/* Left Section: Logo */}
          <div className="flex w-1/4 items-center justify-start">
            <span className="font-display text-lg font-bold tracking-tight md:text-xl">Admin Panel</span>
          </div>

          {/* Center Section: Navigation */}
          <nav className="hidden flex-1 items-center justify-center gap-4 md:flex lg:gap-8">
            <Link 
              to="/admin/dashboard" 
              className="group relative py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary"
            >
              Content
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 origin-left bg-primary transition-all group-[.active]:w-full" />
            </Link>
            <Link 
              to="/admin/services" 
              className="group relative py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary [&.active]:text-primary"
            >
              Services
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 origin-left bg-primary transition-all group-[.active]:w-full" />
            </Link>
          </nav>

          {/* Right Section: Actions */}
          <div className="flex w-1/4 items-center justify-end">
            {token && (
              <button
                onClick={handleLogout}
                className="rounded-full bg-destructive/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-destructive transition-all hover:bg-destructive hover:text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="container-wide py-8">
        <Outlet />
      </main>
    </div>
  );
}
