import { Mail, LockKeyhole, LogIn, ShieldCheck, HousePlus } from "lucide-react";
import house from "../assets/house.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Email atau password salah");
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Tidak bisa terhubung ke server, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl min-h-150 shadow-[0_32px_80px_rgba(17,45,78,0.15)] rounded-3xl overflow-hidden">
        <div className="hidden md:flex bg-primary flex-col items-center justify-center gap-6 px-10 py-12 relative">
          <HousePlus className="text-accent" size={64} />
          <h1 className="text-4xl font-bold text-center text-surface">
            <span className="text-accent">Kost </span>
            Management
          </h1>
          <h2 className="w-full max-w-sm text-center text-surface/50">
            Kelola kamar, penyewa, kontrak, dan transaksi dengan mudah dan
            terorganisir.
          </h2>
          <img src={house} alt="" className="w-64 opacity-60 mt-4" />
        </div>

        {/* Panel kanan - form login */}
        <div className="bg-white flex flex-col items-center justify-center px-6 py-12">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
              <p className="text-black/50">
                Login to access your kost management dashboard
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-bold text-primary">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="border border-border-soft rounded-md p-2 pl-11 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-bold text-primary">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="border border-border-soft rounded-md p-2 pl-11 w-full focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 transition duration-300 ease-in-out bg-accent hover:bg-accent-hover disabled:bg-accent/40 disabled:cursor-not-allowed rounded-md p-2 w-full text-white font-medium"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="text-accent w-5 h-5 shrink-0" />
              <p className="text-black/50 text-center text-sm">
                Your data is secure and protected
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
