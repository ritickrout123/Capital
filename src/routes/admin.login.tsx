import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { adminLogin } from "@/api/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await adminLogin({ data: { password } });
      if (res.token) {
        localStorage.setItem("admin_token", res.token);
        // Notify the layout immediately
        window.dispatchEvent(new Event("admin_auth_change"));
        router.navigate({ to: "/admin/dashboard" });
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border border-border bg-surface p-8 shadow-elevated">
      <h1 className="mb-6 text-center font-display text-2xl font-bold">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none focus:border-primary"
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="hero" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
