import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";

function Renters() {
  const [renters, setRenters] = useState([]);
  const [renterName, setRenterName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ktpNumber, setKtpNumber] = useState("");

  const [modalAddRenter, setModalAddRenter] = useState(false);
  const [renterToEdit, setRenterToEdit] = useState(null);

  const [renterToDelete, setRenterToDelete] = useState(null);
  const [error, setError] = useState("");

  const PAYLOAD = {
    name: renterName,
    phone_number: phoneNumber,
    ktp_number: ktpNumber,
  };

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

  // function add renter
  const handleAddRenter = async (e) => {
    e.preventDefault();

    const payload = PAYLOAD;

    try {
      const response = await fetch("/api/renters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        setRenters((prevRenters) => [...prevRenters, data]);
        setRenterName("");
        setPhoneNumber("");
        setKtpNumber("");
        setModalAddRenter(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // edit renter function
  const askEditConfirmation = (renter) => {
    setRenterToEdit(renter);
    setRenterName(renter.name);
    setPhoneNumber(renter.phone_number);
    setKtpNumber(renter.ktp_number);
  };

  const handleEditRenter = async (e) => {
    e.preventDefault();

    const payload = PAYLOAD;

    try {
      const response = await fetch(`/api/renters/${renterToEdit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setRenters((prevRenters) => {
          return prevRenters.map((renter) =>
            renter.id === renterToEdit.id ? data : renter,
          );
        });

        setRenterName("");
        setPhoneNumber("");
        setKtpNumber("");

        setRenterToEdit(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // delete renter function
  const askDeleteConfirmation = (renter) => {
    setRenterToDelete(renter);
  };

  const handleDelete = async (renterId) => {
    try {
      const response = await fetch(`/api/renters/${renterId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setRenters((prev) => prev.filter((renter) => renter.id !== renterId));
      } else {
        setError("Gagal menghapus room");
      }
    } catch (err) {
      console.log(err);
      setError("Gagal menghapus room");
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
                            <button
                              className="text-sm font-semibold"
                              onClick={() => askEditConfirmation(renter)}
                            >
                              Edit
                            </button>
                          </div>
                          <div className="flex-1 border border-red-200 bg-red-50 text-red-600 py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                            <button
                              className="text-sm font-semibold"
                              onClick={() => askDeleteConfirmation(renter)}
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

      {/* modal add renter */}
      {modalAddRenter && (
        <AddModal page_name="Renter">
          <form className="space-y-4" onSubmit={handleAddRenter}>
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
                Update Renter
              </button>
            </div>
          </form>
        </AddModal>
      )}

      {/* modal edit renter */}
      {renterToEdit && (
        <EditModal page_name="Renter">
          <form className="space-y-4" onSubmit={handleEditRenter}>
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
                onClick={() => {
                  setRenterToEdit(null);
                  setRenterName("");
                  setPhoneNumber("");
                  setKtpNumber("");
                }}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Update Renter
              </button>
            </div>
          </form>
        </EditModal>
      )}

      {/* modal confirmation delete */}
      {renterToDelete && (
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
                Delete Room {renterToDelete?.room_number}?
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
                onClick={() => setRenterToDelete(null)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(renterToDelete.id);
                  setRenterToDelete(null);
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

export default Renters;
