import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Plus } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import { useEffect, useState } from 'react';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAddRoom, setModalAddRoom] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [roomToEdit, setRoomToEdit] = useState(null);

  // state value for create room
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('standard');
  const [roomPrice, setRoomPrice] = useState('');

  useEffect(() => {
    async function getRooms() {
      try {
        const response = await fetch('/api/rooms/summary', {
          credentials: 'include',
        });
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data rooms');
      } finally {
        setLoading(false);
      }
    }
    getRooms();
  }, []);

  // function delete using function declaration
  async function handleDelete(roomId) {
    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        credentials: 'include',
        method: 'DELETE',
      });

      if (response.ok) {
        setRooms((prev) => prev.filter((room) => room.id !== roomId));
      } else {
        setError('Gagal menghapus room');
      }
    } catch (err) {
      console.log(err);
      setError('Gagal menghapus room');
    }
  }

  // for edit
  function askEditConfirmation(room) {
    setRoomToEdit(room);
    setRoomNumber(room.room_number);
    setRoomType(room.room_type);
    setRoomPrice(room.price);
  }

  // for delete
  function askDeleteConfirmation(room) {
    setRoomToDelete(room);
  }

  // function add room using arrow function
  const handleAddRoom = async (e) => {
    e.preventDefault();

    if (!roomPrice || isNaN(roomPrice)) {
      alert('Please enter a valid price');
      return;
    }

    const payload = {
      room_number: roomNumber,
      room_type: roomType,
      price: Number(roomPrice),
    };

    try {
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        setRooms((prevRooms) => [...prevRooms, data]);
        setRoomNumber('');
        setRoomType('standard');
        setRoomPrice('');

        setModalAddRoom(false);
      }
    } catch (err) {
      console.error(err);
      setError('Tidak bisa terhubung ke server, coba lagi');
    }
  };

  // function edit room using arrow function
  const handleEdit = async (e) => {
    e.preventDefault();

    const payload = {
      room_number: roomNumber,
      room_type: roomType,
      price: Number(roomPrice),
    };

    try {
      const response = await fetch(`/api/rooms/${roomToEdit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setRooms((prevRooms) => {
          return prevRooms.map((room) =>
            room.id === roomToEdit.id ? data : room
          );
        });
        setRoomNumber('');
        setRoomType('standard');
        setRoomPrice('');

        setRoomToEdit(null);
      }
    } catch (err) {
      console.error(err);
      setError('Tidak bisa terhubung ke server, coba lagi');
    }
  };

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
                <button
                  className="font-medium"
                  onClick={() => setModalAddRoom(true)}
                >
                  Add Room
                </button>
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
                  id={room.id}
                  onEdit={() => askEditConfirmation(room)}
                  onDelete={() => askDeleteConfirmation(room)}
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

      {/* modal add room */}
      {modalAddRoom && (
        <AddModal page_name="Room">
          <form onSubmit={handleAddRoom} className="space-y-4">
            {/* Room Number Input */}
            <div>
              <label
                htmlFor="roomNumber"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g. 101"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Room Type Select */}
            <div>
              <label
                htmlFor="roomType"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room Type
              </label>
              <div className="relative">
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Room Type --
                  </option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="vip">VIP</option>
                </select>
                {/* Custom Arrow Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label
                htmlFor="price"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={roomPrice}
                onChange={(e) => setRoomPrice(e.target.value)}
                placeholder="e.g. 250000"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModalAddRoom(false)}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Add Room
              </button>
            </div>
          </form>
        </AddModal>
      )}

      {/* modal edit room */}
      {roomToEdit && (
        <EditModal page_name="Room">
          <form onSubmit={handleEdit} className="space-y-4">
            {/* Room Number Input */}
            <div>
              <label
                htmlFor="roomNumber"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room Number
              </label>
              <input
                type="text"
                id="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g. 101"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Room Type Select */}
            <div>
              <label
                htmlFor="roomType"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room Type
              </label>
              <div className="relative">
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Room Type --
                  </option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="vip">VIP</option>
                </select>
                {/* Custom Arrow Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label
                htmlFor="price"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={roomPrice}
                onChange={(e) => setRoomPrice(e.target.value)}
                placeholder="e.g. 250000"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setRoomToEdit(null);
                  setRoomNumber('');
                  setRoomType('standard');
                  setRoomPrice('');
                }}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </EditModal>
      )}

      {/* modal confirmation delete */}
      {roomToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl ring-1 ring-gray-900/5">
            {/* Icon & Message Section */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>

              <h3
                id="modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                Delete Room {roomToDelete?.room_number}?
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">
                Are you sure you want to delete this room? This action cannot be
                undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setRoomToDelete(null)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(roomToDelete.id);
                  setRoomToDelete(null);
                }}
                className="flex-1 border border-red-200 bg-red-50 text-red-600 py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rooms;
