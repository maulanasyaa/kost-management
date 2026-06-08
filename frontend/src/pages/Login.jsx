import { Mail, LockKeyhole, LogIn, ShieldCheck } from "lucide-react"

function Login(){
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="grid grid-cols-2 w-3/4 h-3/4 shadow-[0_32px_80px_rgba(15,23,42,0.12)] rounded-lg overflow-hidden">
                <div className="bg-blue-200">kiri</div>
                <div className="bg-gray-50 flex flex-col gap-1 items-center justify-center">
                    <div className="w-96 flex flex-col gap-5">
                    <h1 className="text-3xl font-bold"> Welcome Back</h1>
                    <p className="text-black/50">Login to access your kost management dashboard</p>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-bold">Email</label>
                    <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2"></Mail>
                        <input type="email" placeholder="Enter your email" className="border rounded-sm p-2 pl-11 w-full" />
                    </div>
                    </div>
                    <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-bold">Password</label>
                    <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2"></LockKeyhole>
                        <input type="password" placeholder="Enter your password" className="border rounded-sm p-2 pl-11 w-full" />
                    </div>
                    </div>
                    <div className="relative">
                        <LogIn className="absolute left-35 top-1/2 -translate-y-1/2 text-white/80"></LogIn>
                        <button className="bg-blue-500 rounded-sm p-2 w-full text-white/80">Login</button>
                    </div>
                    <div className="relative">
                        <ShieldCheck className="absolute left-10 top-1/2 -translate-y-1/2 text-blue-500"></ShieldCheck>
                        <p className="text-black/50 text-center">Your data is secure and protected</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login