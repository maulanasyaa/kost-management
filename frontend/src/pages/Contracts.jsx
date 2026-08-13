import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Plus, Trash2, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";

function Contracts() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const getContracts = async () => {
      try {
        const response = await fetch("/api/contracts", {
          method: "GET",
          credentials: "include",
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
    </div>
  );
}

export default Contracts;
