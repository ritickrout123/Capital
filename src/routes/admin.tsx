import { createFileRoute, Outlet, useRouter, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Read token synchronously so there's no flash on first render
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
      if (!currentToken && pathname !== "/admin/login") {
        router.navigate({ to: "/admin/login" });
      }
    };

    checkToken();

    window.addEventListener("storage", checkToken);
    window.addEventListener("admin_auth_change", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("admin_auth_change", checkToken);
    };
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    router.navigate({ to: "/admin/login" });
    window.dispatchEvent(new Event("admin_auth_change"));
  };

  // Use router state pathname — never stale, unlike window.location
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <main>
        <Outlet />
      </main>
    );
  }

  // Not logged in yet — redirect is in-flight, render nothing to avoid flash
  if (!token) {
    return null;
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
            <button
              onClick={handleLogout}
              className="rounded-full bg-destructive/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-destructive transition-all hover:bg-destructive hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container-wide py-8">
        <Outlet />
      </main>
    </div>
  );
}
