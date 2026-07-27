import { useEffect, useState, useSyncExternalStore } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Plus, SquarePen, Trash2, User } from "lucide-react";
import AddModal from "../components/AddModal";

function Renters() {
  const [renters, setRenters] = useState([]);
  const [modalAddRenter, setModalAddRenter] = useState(false);
  const [renterName, setRenterName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ktpNumber, setKtpNumber] = useState("");
  console.log(renterName);

  useEffect(() => {
    async function getRenters() {
      try {
        const response = await fetch("/api/renters", {
          credentials: "include",
        });
        const data = await response.json();
        setRenters(data);
      } catch (err) {
        console.error(err);
      }
    }
    getRenters();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-surface overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-8 pb-12 overflow-y-auto">
          <div className="flex justify-between w-full items-end mb-8">
            <div>
              <h1 className="font-bold text-3xl text-primary">Renters</h1>
              <h3 className="text-gray-500 pt-1 text-sm">
                Manage all renters in your kost.
              </h3>
            </div>
            <div className="flex flex-row bg-accent hover:bg-accent-hover text-white items-center p-2.5 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer">
              <div>
                <Plus className="w-5 h-5" />
              </div>
              <div className="pl-1.5">
                <button
                  className="font-medium"
                  onClick={() => {
                    setModalAddRenter(true);
                  }}
                >
                  Add Renter
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
                      Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone Number
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      KTP Number
                    </th>

                    <th className="w-40 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {renters.map((renter) => (
                    <tr
                      className="transition-colors hover:bg-slate-50"
                      key={renter.id}
                    >
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {renter.id}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-900">
                        {renter.name}
                      </td>

                      <td className="px-6 py-4 text-slate-700">
                        {renter.phone_number}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700">
                        {renter.ktp_number}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-between gap-3">
                          <div className="flex-1 border border-accent/30 bg-accent/10 text-accent py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer">
                            <SquarePen className="w-4 h-4" />
                            <button className="text-sm font-semibold">
                              Edit
                            </button>
                          </div>
                          <div className="flex-1 border border-red-200 bg-red-50 text-red-600 py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                            <button className="text-sm font-semibold">
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

      {/* modal add renter */}
      {modalAddRenter && (
        <AddModal page_name="Renter">
          <form className="space-y-4">
            {/* Renter Name Input */}
            <div>
              <label
                htmlFor="renterName"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Renter Name
              </label>
              <input
                type="text"
                id="renterName"
                value={renterName}
                onChange={(e) => setRenterName(e.target.value)}
                placeholder="e.g. John"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. 08123456789"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            {/* KTP Number Input */}
            <div>
              <label
                htmlFor="ktpNumber"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                KTP Number
              </label>
              <input
                type="text"
                id="ktpNumber"
                value={ktpNumber}
                onChange={(e) => setKtpNumber(e.target.value)}
                placeholder="e.g. 32123456789"
                className="w-full rounded-lg border border-border-soft px-3.5 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModalAddRenter(false)}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Add Renter
              </button>
            </div>
          </form>
        </AddModal>
      )}
    </div>
  );
}

export default Renters;
