import { HousePlus, LogOut } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-primary w-full h-16 flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2">
        <HousePlus className="text-accent w-6 h-6" />
        <h1 className="font-bold text-xl text-surface">Kost Management</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-px h-8 bg-white/10" />
        <button className="flex items-center gap-2 border border-white/15 text-surface/80 px-4 py-1.5 rounded-md hover:bg-accent hover:border-accent hover:text-white transition-all duration-200 cursor-pointer">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
