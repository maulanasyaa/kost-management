import {
  LayoutDashboard,
  DoorOpen,
  UserRoundKey,
  Scroll,
  BanknoteArrowDown,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `p-3 rounded-md flex items-center gap-2 w-full transition-colors ${
      isActive
        ? 'bg-white text-primary font-medium' // styling saat halaman aktif
        : 'text-surface/70 hover:bg-white/10 hover:text-surface' // styling saat halaman tidak aktif
    }`;

  return (
    <div className="bg-primary w-52 shrink-0 min-h-screen+1 m-3 rounded-2xl shadow-[4px_0_12px_rgba(15,23,42,0.22)]">
      <nav className="p-6">
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink to="/dashboard" className={navLinkClass}>
              <LayoutDashboard className="w-5 h-5" />
              <p className="text-sm">Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms" className={navLinkClass}>
              <DoorOpen className="w-5 h-5" />
              <p className="text-sm">Rooms</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/renters" className={navLinkClass}>
              <UserRoundKey className="w-5 h-5" />
              <p className="text-sm">Renters</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contracts" className={navLinkClass}>
              <Scroll className="w-5 h-5" />
              <p className="text-sm">Contracts</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/transaction" className={navLinkClass}>
              <BanknoteArrowDown className="w-5 h-5" />
              <p className="text-sm">Transaction</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
