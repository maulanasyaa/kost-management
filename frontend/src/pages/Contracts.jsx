import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Plus, Trash2, SquarePen, Contact } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [modalAddContract, setModalAddContract] = useState(false);

  const [rooms, setRooms] = useState([]);

  const [renters, setRenters] = useState([]);

  const [contractToEdit, setContractToEdit] = useState(null);

  const [contractToDelete, setContractToDelete] = useState(null);

  // value for modal
  const [roomID, setRoomID] = useState('');
  const [renterID, setRenterID] = useState('');
  const [term, setTerm] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    const getContracts = async () => {
      try {
        const response = await fetch('/api/contracts', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setContracts(data);
      } catch (err) {
        console.error(err);
      }
    };

    const getRooms = async () => {
      try {
        const response = await fetch('/api/rooms', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setRooms(data);
      } catch (err) {
        console.error(err);
      }
    };

    const getRenters = async () => {
      try {
        const response = await fetch('/api/renters', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setRenters(data);
      } catch (err) {
        console.error(err);
      }
    };

    getContracts('');
    getRooms('');
    getRenters('');
  }, []);

  // add contract function
  const handleAddContract = async (e) => {
    e.preventDefault();

    const payload = {
      room_id: roomID,
      renter_id: renterID,
      term: term,
      price: roomPrice,
      start_date: startDate,
    };

    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setContracts((prevContracts) => [...prevContracts, data]);
      setRoomID('');
      setRenterID('');
      setTerm();
      setRoomPrice();
      setStartDate();

      setModalAddContract(false);
    } catch (err) {
      console.error(err);
    }
  };

  // edit contract function
  const askEditConfirmation = (contract) => {
    setContractToEdit(contract.id);
    setRoomID(contract.room.id);
    setRenterID(contract.renter.id);
    setTerm(contract.term);
    setRoomPrice(contract.price);
    setStartDate(contract.start_date);
  };

  const handleEditContract = async (e) => {
    e.preventDefault();

    const payload = {
      room_id: roomID,
      renter_id: renterID,
      term: term,
      price: roomPrice,
      start_date: startDate,
    };

    try {
      const response = await fetch(`/api/contracts/${contractToEdit}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setContracts((prevContracts) =>
        prevContracts.map((contract) =>
          contract.id == contractToEdit ? data : contract
        )
      );
      setContractToEdit('');
      setRoomID('');
      setRenterID('');
      setTerm('');
      setRoomPrice('');
      setStartDate('');
    } catch (err) {
      console.error(err);
    }
  };

  // delete contract function
  const askDeleteConfirmation = (contract) => {
    setContractToDelete(contract);
  };

  const handleDelete = async (contract_id) => {
    try {
      const response = await fetch(`/api/contracts/${contract_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      setContracts((prev) =>
        prev.filter((contract) => contract.id !== contract_id)
      );
      setContractToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-surface overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 p-8 pb-12 overflow-hidden page-card">
          <div className="flex justify-between w-full items-center mb-6 bg-surface shadow-sm p-4 rounded-xl shrink-0">
            <div>
              <h1 className="font-bold text-3xl text-primary">Contracts</h1>
              <h3 className="text-gray-500 pt-1 text-sm">
                Manage all contracts in your kost.
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setModalAddContract(true)}
              className="flex flex-row bg-accent hover:bg-accent-hover text-white items-center p-2.5 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span className="pl-1.5 font-medium">Add Contract</span>
            </button>
          </div>

          {/* content card */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="w-16 px-2 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      ID
                    </th>

                    <th className="px-14 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Room
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Renter
                    </th>

                    <th className="px-2 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Term (Month)
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Price
                    </th>

                    <th className="px-16 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Start Date
                    </th>

                    <th className="px-16 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      End Date
                    </th>

                    <th className="w-40 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {contracts.map((contract) => (
                    <tr
                      className="transition-colors hover:bg-slate-50 text-center"
                      key={contract.id}
                    >
                      <td className="px-6 py-4 text-sm text-slate-700 text-center">
                        {contract.id}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-900 text-center">
                        {contract.room.room_number} - {contract.room.room_type}
                      </td>

                      <td className="px-6 py-4 text-slate-700 text-center">
                        {contract.renter.name}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        {contract.term}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        {contract.price}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        {contract.start_date}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        {contract.end_date}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => askEditConfirmation(contract)}
                            className="flex-1 border border-accent/30 bg-accent/10 text-accent py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer"
                          >
                            <SquarePen className="w-4 h-4" />
                            <span className="text-sm font-semibold">Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => askDeleteConfirmation(contract)}
                            className="flex-1 border border-red-200 bg-red-50 text-red-600 py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              Delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* modal add contract */}
      {modalAddContract && (
        <AddModal page_name="Contract">
          <form className="space-y-4" onSubmit={handleAddContract}>
            {/* room dropdown */}
            <div>
              <label
                htmlFor="roomList"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room
              </label>
              <div className="relative">
                <select
                  id="roomList"
                  value={roomID}
                  onChange={(e) => setRoomID(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Room--
                  </option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      Room {room.room_number}
                    </option>
                  ))}
                </select>
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

            {/* renter dropdown */}
            <div>
              <label
                htmlFor="renterList"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Renter
              </label>
              <div className="relative">
                <select
                  id="renterList"
                  value={renterID}
                  onChange={(e) => setRenterID(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Renter--
                  </option>
                  {renters.map((renter) => (
                    <option key={renter.id} value={renter.id}>
                      {renter.name}
                    </option>
                  ))}
                </select>
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

            {/* Term Input */}
            <div>
              <label
                htmlFor="term"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Term
              </label>
              <input
                type="number"
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. 6"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Price Input */}
            <div>
              <label
                htmlFor="roomPrice"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="text"
                id="roomPrice"
                value={roomPrice}
                onChange={(e) => setRoomPrice(e.target.value)}
                placeholder="e.g. 1000000"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Start Date Input */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                placeholder="Choose start date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModalAddContract(false)}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Add Contract
              </button>
            </div>
          </form>
        </AddModal>
      )}

      {/* modal edit */}
      {contractToEdit && (
        <EditModal page_name="Room">
          <form className="space-y-4" onSubmit={handleEditContract}>
            {/* room dropdown */}
            <div>
              <label
                htmlFor="roomList"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Room
              </label>
              <div className="relative">
                <select
                  id="roomList"
                  value={roomID}
                  onChange={(e) => setRoomID(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Room--
                  </option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      Room {room.room_number}
                    </option>
                  ))}
                </select>
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

            {/* renter dropdown */}
            <div>
              <label
                htmlFor="renterList"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Renter
              </label>
              <div className="relative">
                <select
                  id="renterList"
                  value={renterID}
                  onChange={(e) => setRenterID(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Renter--
                  </option>
                  {renters.map((renter) => (
                    <option key={renter.id} value={renter.id}>
                      {renter.name}
                    </option>
                  ))}
                </select>
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

            {/* Term Input */}
            <div>
              <label
                htmlFor="term"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Term
              </label>
              <input
                type="number"
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. 6"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Price Input */}
            <div>
              <label
                htmlFor="roomPrice"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="text"
                id="roomPrice"
                value={roomPrice}
                onChange={(e) => setRoomPrice(e.target.value)}
                placeholder="e.g. 1000000"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Start Date Input */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                placeholder="Choose start date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setContractToEdit('')}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Edit Contract
              </button>
            </div>
          </form>
        </EditModal>
      )}

      {/* modal confirmation delete*/}
      {contractToDelete && (
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
                Delete Contract {contractToDelete?.room_number}?
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">
                Are you sure you want to delete this contract? This action
                cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setContractToDelete(null)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(contractToDelete.id);
                  setContractToDelete(null);
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

export default Contracts;
