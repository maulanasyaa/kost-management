import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Plus } from "lucide-react";
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRooms() {
      try {
        const response = await fetch("/api/rooms/summary", {
          credentials: "include",
        });
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data rooms");
      } finally {
        setLoading(false);
      }
    }
    getRooms();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-surface overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-8 pb-12 overflow-y-auto">
          <div className="flex justify-between w-full items-end mb-8">
            <div>
              <h1 className="font-bold text-3xl text-primary">Rooms</h1>
              <h3 className="text-gray-500 pt-1 text-sm">
                Manage and organize all rooms in your kost.
              </h3>
            </div>
            <div className="flex flex-row bg-accent hover:bg-accent-hover text-white items-center p-2.5 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer">
              <div>
                <Plus className="w-5 h-5" />
              </div>
              <div className="pl-1.5">
                <button className="font-medium">Add Room</button>
              </div>
            </div>
          </div>

          {loading && (
            <p className="text-gray-500 text-sm">Memuat data rooms...</p>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room_number={room.room_number}
                  room_type={room.room_type}
                  price={room.price}
                  renter={room.renter}
                  contract={room.contract}
                  status={room.status}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
