import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Plus } from "lucide-react";
import RoomCard from "../components/RoomCard";

function Rooms() {
  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <Navbar></Navbar>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar></Sidebar>
        <div className="flex-1 p-8 pb-12 overflow-y-auto">
          <div className="flex justify-between w-full items-end mb-8">
            <div>
              <h1 className="font-bold text-3xl text-gray-900">Rooms</h1>
              <h3 className="text-gray-500 pt-1 text-sm">
                Manage and organize all rooms in your kost.
              </h3>
            </div>
            <div className="flex flex-row bg-amber-500 hover:bg-amber-600 text-white items-center p-2.5 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer">
              <div>
                <Plus className="w-5 h-5"></Plus>
              </div>
              <div className="pl-1.5">
                <button className="font-medium">Add Room</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <RoomCard
              room_number={"A - 101"}
              status={"Occupied"}
              renter={"Maul"}
              contract={"13 June 2026 - 14 June 2026"}
              price={"Rp 1.000.000"}
            ></RoomCard>
            <RoomCard
              room_number={"A - 102"}
              status={"Occupied"}
              renter={"Angga"}
              contract={"13 June 2026 - 14 June 2026"}
              price={"Rp 1.000.000"}
            ></RoomCard>
            <RoomCard
              room_number={"A - 103"}
              status={"Occupied"}
              renter={"Reza"}
              contract={"13 June 2026 - 14 June 2026"}
              price={"Rp 1.000.000"}
            ></RoomCard>
            <RoomCard
              room_number={"A - 104"}
              status={"Occupied"}
              renter={"Anggi"}
              contract={"13 June 2026 - 14 June 2026"}
              price={"Rp 1.000.000"}
            ></RoomCard>
            <RoomCard
              room_number={"A - 105"}
              status={"Occupied"}
              renter={"Nisa"}
              contract={"13 June 2026 - 14 June 2026"}
              price={"Rp 1.000.000"}
            ></RoomCard>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Rooms;
