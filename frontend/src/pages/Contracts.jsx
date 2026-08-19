import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Plus, Trash2, SquarePen } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddModal from '../components/AddModal';

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [modalAddContract, setModalAddContract] = useState(true);

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

    getContracts();
  }, []);

  const handleAddRenter = () => {
    return null;
  };

  return (
    <div className="flex flex-col h-screen bg-surface overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-8 pb-12 overflow-y-auto">
          <div className="flex justify-between w-full items-end mb-8">
            <div>
              <h1 className="font-bold text-3xl text-primary">Contracts</h1>
              <h3 className="text-gray-500 pt-1 text-sm">
                Manage all contracts in your kost.
              </h3>
            </div>
            <div className="flex flex-row bg-accent hover:bg-accent-hover text-white items-center p-2.5 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer">
              <div>
                <Plus className="w-5 h-5" />
              </div>
              <div className="pl-1.5">
                <button
                  className="font-medium"
                  //   onClick={() => ()}
                >
                  Add Contract
                </button>
              </div>
            </div>
          </div>
          {/* content */}
          <div>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="w-16 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      ID
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Room
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Renter
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Term (Month)
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Start Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
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
                      className="transition-colors hover:bg-slate-50"
                      key={contract.id}
                    >
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {contract.id}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-900">
                        {contract.room.room_number} - {contract.room.room_type}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {contract.renter.name}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700">
                        {contract.term}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700">
                        {contract.price}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700">
                        {contract.start_date}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700">
                        {contract.end_date}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-between gap-3">
                          <div className="flex-1 border border-accent/30 bg-accent/10 text-accent py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer">
                            <SquarePen className="w-4 h-4" />
                            <button
                              className="text-sm font-semibold"
                              // onClick={() => askEditConfirmation(renter)}
                            >
                              Edit
                            </button>
                          </div>
                          <div className="flex-1 border border-red-200 bg-red-50 text-red-600 py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                            <button
                              className="text-sm font-semibold"
                              // onClick={() => askDeleteConfirmation(renter)}
                            >
                              Delete
                            </button>
                          </div>
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

      {/* modal add contract, besok lanjutin ini */}
      {modalAddContract && (
        <AddModal page_name="Contract">
          <form className="space-y-4" onSubmit={handleAddRenter}>
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
                  // value={}
                  // onChange={}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Room--
                  </option>
                  <option>room 1</option>
                  <option>room 2</option>
                  <option>room 3</option>
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
                Room
              </label>
              <div className="relative">
                <select
                  id="renterList"
                  // value={}
                  // onChange={}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Renter--
                  </option>
                  <option>renter 1</option>
                  <option>renter 2</option>
                  <option>renter 3</option>
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
                // value={phoneNumber}
                // onChange={(e) => setPhoneNumber(e.target.value)}
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
                // value={roomPrice}
                // onChange={(e) => setRoomPrice(e.target.value)}
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
                id="startDate"
                // value={startDate}
                // onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                // onClick={() => setModalAddRenter(false)}
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
    </div>
  );
}

export default Contracts;
