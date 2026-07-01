import {
  UserRoundKey,
  CalendarRange,
  Tags,
  SquarePen,
  Trash2,
} from "lucide-react";

function RoomCard({ room_number, room_type, status, renter, contract, price }) {
  return (
    <div className="flex flex-col bg-white border border-border-soft w-full p-6 gap-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center border-b border-border-soft pb-4">
        <div>
          <h1 className="font-bold text-xl text-primary">Room {room_number}</h1>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-0.5">
            {room_type}
          </p>
        </div>
        <p
          className={
            status === "occupied"
              ? "bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
              : "bg-gray-100 text-gray-500 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
          }
        >
          {status}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Renter
          </p>
          <div className="flex items-center gap-3">
            <UserRoundKey className="w-5 h-5 text-accent" />
            <p className="text-gray-800 font-medium text-sm">
              {renter ? renter.name : "-"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Contract
          </p>
          <div className="flex items-center gap-3">
            <CalendarRange className="w-5 h-5 text-accent" />
            <p className="text-gray-800 font-medium text-sm">
              {contract ? `${contract.start_date} - ${contract.end_date}` : "-"}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Price
          </p>
          <div className="flex items-center gap-3">
            <Tags className="w-5 h-5 text-accent" />
            <div className="text-primary font-bold flex items-baseline gap-1 text-lg">
              {price}{" "}
              <p className="text-xs font-medium text-gray-500">/ month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3 mt-2 pt-4 border-t border-border-soft">
        <div className="flex-1 border border-accent/30 bg-accent/10 text-accent py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer">
          <SquarePen className="w-4 h-4" />
          <button className="text-sm font-semibold">Edit</button>
        </div>
        <div className="flex-1 border border-red-200 bg-red-50 text-red-600 py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">
          <Trash2 className="w-4 h-4" />
          <button className="text-sm font-semibold">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
