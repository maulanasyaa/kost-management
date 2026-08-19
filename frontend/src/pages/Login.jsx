import { Mail, LockKeyhole, LogIn, ShieldCheck, HousePlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Email atau password salah');
        return;
      }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Tidak bisa terhubung ke server, coba lagi');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-kost overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Panel Kiri - Branding */}
        <div className="hidden md:flex flex-col items-center justify-center gap-6 p-12 bg-primary">
          <HousePlus className="w-16 h-16 text-accent" />
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-surface">
              <span className="text-accent">Kost</span> Management
            </h1>
            <p className="w-full max-w-sm text-surface/70 leading-relaxed">
              Kelola kamar, penyewa, kontrak, dan transaksi dengan mudah dan
              terorganisir.
            </p>
          </div>
        </div>

        {/* Panel Kanan - Form Login */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm mx-auto flex flex-col gap-6"
          >
            {/* Header Form */}
            <div className="flex flex-col gap-1.5">
              <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
              <p className="text-gray-500 text-sm">
                Login to access your kost management dashboard
              </p>
            </div>

            {/* Input Fields Container */}
            <div className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-primary"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="w-full py-2.5 pl-11 pr-4 bg-white border border-border-soft rounded-lg text-primary placeholder:text-gray-400 focus:border-accent transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-primary"
                >
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="w-full py-2.5 pl-11 pr-4 bg-white border border-border-soft rounded-lg text-primary placeholder:text-gray-400 focus:border-accent transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500 font-medium" role="alert">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              <LogIn className="w-5 h-5" />
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Footer info */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <p className="text-xs text-gray-400">
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
