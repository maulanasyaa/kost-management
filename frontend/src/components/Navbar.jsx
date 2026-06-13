import { HousePlus } from "lucide-react";
function Navbar() {
  return (
    <div className="bg-gray-100 w-full h-1/12 flex items-center relative">
      <HousePlus className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-800"></HousePlus>
      <h1 className="absolute left-10 font-bold text-xl">Kost Management</h1>
      <div className="absolute w-px bg-gray-300 h-10 right-38"></div>
      <button className="absolute right-7 border-2 p-1 px-5 rounded-md hover:bg-amber-200">
        Logout
      </button>
    </div>
  );
}
export default Navbar;
