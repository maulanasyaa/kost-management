import {
  LayoutDashboard,
  DoorOpen,
  UserRoundKey,
  Scroll,
  BanknoteArrowDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `p-3 rounded-md flex relative gap-1 w-full transition-colors ${
      isActive
        ? "bg-white hover:bg-gray-200 text-black" // Styling saat halaman aktif
        : "text-white hover:bg-blue-600" // Styling saat halaman tidak aktif
    }`;

  return (
    <div className="bg-blue-500 w-52 shrink-0 min-h-screen">
      <nav className="p-7">
        <ul className="flex flex-col gap-3">
          <li>
            <NavLink to="/dashboard" className={navLinkClass}>
              <LayoutDashboard className="" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms" className={navLinkClass}>
              <DoorOpen className="" />
              <p>Rooms</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/renters" className={navLinkClass}>
              <UserRoundKey className="" />
              <p>Renters</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contracts" className={navLinkClass}>
              <Scroll className="" />
              <p>Contracts</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/transaction" className={navLinkClass}>
              <BanknoteArrowDown className="" />
              <p>Transaction</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Sidebar;
