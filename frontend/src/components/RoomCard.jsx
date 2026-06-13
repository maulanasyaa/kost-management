import {
  UserRoundKey,
  CalendarRange,
  Tags,
  SquarePen,
  Trash2,
} from "lucide-react";

function RoomCard({ room_number, status, renter, contract, price }) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 w-full p-6 gap-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h1 className="font-bold text-xl text-gray-800">{room_number}</h1>
        <p className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
          {status}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Renter
          </p>
          <div className="flex items-center gap-3">
            <UserRoundKey className="w-5 h-5 text-gray-400"></UserRoundKey>
            <p className="text-gray-800 font-medium text-sm">{renter}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Contract
          </p>
          <div className="flex items-center gap-3">
            <CalendarRange className="w-5 h-5 text-gray-400"></CalendarRange>
            <p className="text-gray-800 font-medium text-sm">{contract}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Price
          </p>
          <div className="flex items-center gap-3">
            <Tags className="w-5 h-5 text-gray-400"></Tags>
            <p className="text-gray-900 font-bold flex items-baseline gap-1 text-lg">
              {price}{" "}
              <p className="text-xs font-medium text-gray-500">/ month</p>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3 mt-2 pt-4 border-t border-gray-100">
        <div className="flex-1 border border-blue-200 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer">
          <SquarePen className="w-4 h-4"></SquarePen>
          <button className="text-sm font-semibold">Edit</button>
        </div>
        <div className="flex-1 border border-red-200 bg-red-50 text-red-600 py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">
          <Trash2 className="w-4 h-4"></Trash2>
          <button className="text-sm font-semibold">Delete</button>
        </div>
      </div>
    </div>
  );
}
export default RoomCard;
