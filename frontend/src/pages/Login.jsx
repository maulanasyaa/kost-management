import { Mail, LockKeyhole, LogIn, ShieldCheck, HousePlus } from "lucide-react";
import house from "../assets/house.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    const response = await fetch("http://localhost:8000/accounts/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.detail);
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 w-3/4 h-3/4 shadow-[0_32px_80px_rgba(15,23,42,0.12)] rounded-3xl overflow-hidden">
        <div className="bg-blue-50 flex flex-col items-center relative">
          <HousePlus
            className="text-blue-900 absolute top-23 left-28"
            size={64}
          ></HousePlus>
          <h1 className="absolute top-40 text-4xl font-bold">
            <span className="text-blue-900">Kost </span>
            Management
          </h1>
          <h2 className="absolute w-96 left-30 top-53 text-black/40">
            Kelola kamar, penyewa, kontrak, dan transaksi dengan mudah dan
            terorganisir.
          </h2>
          <img
            src={house}
            alt=""
            className="w-100 absolute bottom-20 opacity-70"
          />
        </div>
        <div className="bg-gray-50 flex flex-col gap-1 items-center justify-center">
          <div className="w-96 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold"> Welcome Back</h1>
              <p className="text-black/50">
                Login to access your kost management dashboard
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-bold">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"></Mail>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border rounded-md p-2 pl-11 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="font-bold">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"></LockKeyhole>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border rounded-md p-2 pl-11 w-full"
                />
              </div>
            </div>
            <div className="relative">
              <LogIn className="absolute left-35 top-1/2 -translate-y-1/2 text-white/80"></LogIn>
              {error && <p className="text-red-500">{error}</p>}
              <button
                onClick={handleLogin}
                className="transition duration-300 ease-in-out bg-blue-600 hover:bg-blue-700 rounded-md p-2 w-full text-white/80"
              >
                Login
              </button>
            </div>
            <div className="relative">
              <ShieldCheck className="absolute left-10 top-1/2 -translate-y-1/2 text-blue-500"></ShieldCheck>
              <p className="text-black/50 text-center">
                Your data is secure and protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
