import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, SquarePen, Contact } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [modalAddTransaction, setModalAddTransaction] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState('');
  const [transactionToDelete, setTransactionToDelete] = useState('');

  const [contracts, setContracts] = useState([]);
  const [contractID, setContractID] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetch('/api/transactions', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };

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

    getTransactions();
    getContracts();
  }, []);

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    const payload = {
      contract_id: Number(contractID),
      method: paymentMethod,
    };

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.log(errorBody);
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setTransactions((prev) => [...prev, data]);
      setContractID('');
      setPaymentMethod('');

      setModalAddTransaction(false);
    } catch (err) {
      console.error(err);
    }
  };

  const askEditConfirmation = (transaction) => {
    setTransactionToEdit(transaction.id);
    setContractID(transaction.contract_id);
    setPaymentMethod(transaction.method);
  };

  const handleEditTransaction = async (e) => {
    e.preventDefault();

    const payload = {
      contract_id: Number(contractID),
      method: paymentMethod,
    };

    try {
      const response = await fetch(`/api/transactions/${transactionToEdit}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.log(errorBody);
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id == transactionToEdit ? data : transaction
        )
      );

      setContractID('');
      setPaymentMethod('');
      setTransactionToEdit('');
    } catch (err) {
      console.error(err);
    }
  };

  const askDeleteConfirmation = (transaction) => {
    setTransactionToDelete(transaction);
  };

  const handleDelete = async (transaction_id) => {
    try {
      const response = await fetch(`/api/transactions/${transaction_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.log(errorBody);
        throw new Error(`HTTP error: ${response.status}`);
      }

      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== transaction_id)
      );

      setTransactionToDelete('');
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
              <h1 className="font-bold text-3xl text-primary">Transactions</h1>
              <h3 className="text-gray-500 pt-1 text-sm">
                Manage all transactions in your kost.
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setModalAddTransaction(true)}
              className="flex flex-row bg-accent hover:bg-accent-hover text-white items-center p-2.5 px-4 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span className="pl-1.5 font-medium">Add Transaction</span>
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

                    <th className="px-2 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Contract
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Method
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-16 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Created At
                    </th>

                    <th className="w-40 px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {transactions.map((transaction) => (
                    <tr
                      className="transition-colors hover:bg-slate-50 text-center"
                      key={transaction.id}
                    >
                      <td className="px-6 py-4 text-sm text-slate-700 text-center">
                        {transaction.id}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        {transaction.contract_id}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        {transaction.amount}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        {transaction.method}
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        <span
                          className={`px-3 py-1.5 border rounded-lg text-sm font-mono w-24 block mx-auto text-center ${transaction.is_paid ? 'text-success bg-success/10 border-success/30' : 'text-warning bg-warning/10 border-warning/30'}`}
                        >
                          {transaction.is_paid ? 'PAID' : 'PENDING'}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-mono text-slate-700 text-center">
                        {transaction.created_at}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => askEditConfirmation(transaction)}
                            className="flex-1 border border-accent/30 bg-accent/10 text-accent py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer"
                          >
                            <SquarePen className="w-4 h-4" />
                            <span className="text-sm font-semibold">Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => askDeleteConfirmation(transaction)}
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

      {/* modal add transaction */}
      {modalAddTransaction && (
        <AddModal page_name={'Transactions'}>
          <form className="space-y-4" onSubmit={handleAddTransaction}>
            {/* contract dropdown */}
            <div>
              <label
                htmlFor="contractList"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Contract
              </label>
              <div className="relative">
                <select
                  id="contractList"
                  value={contractID}
                  onChange={(e) => setContractID(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Contract--
                  </option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      Contract {contract.id}
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

            {/* payment method dropdown */}
            <div>
              <label
                htmlFor="paymentMethodList"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Payment Method
              </label>
              <div className="relative">
                <select
                  id="paymentMethodList"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Payment Method--
                  </option>
                  <option value="tunai">Cash</option>
                  <option value="transfer">Transfer</option>
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

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModalAddTransaction(false)}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </AddModal>
      )}

      {/* modal edit transaction */}
      {transactionToEdit && (
        <EditModal page_name={'Transaction'}>
          <form className="space-y-4" onSubmit={handleEditTransaction}>
            {/* contract dropdown */}
            <div>
              <label
                htmlFor="contractList"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Contract
              </label>
              <div className="relative">
                <select
                  id="contractList"
                  value={contractID}
                  onChange={(e) => setContractID(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Contract--
                  </option>
                  {contracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      Contract {contract.id}
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

            {/* payment method dropdown */}
            <div>
              <label
                htmlFor="paymentMethodList"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Payment Method
              </label>
              <div className="relative">
                <select
                  id="paymentMethodList"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border-soft bg-white py-2.5 pl-3.5 pr-10 text-sm text-gray-900 shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors cursor-pointer"
                >
                  <option value="" disabled hidden>
                    -- Select Payment Method--
                  </option>
                  <option value="tunai">Cash</option>
                  <option value="transfer">Transfer</option>
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

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setTransactionToEdit('')}
                className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 transition-colors cursor-pointer"
              >
                Edit Transaction
              </button>
            </div>
          </form>
        </EditModal>
      )}

      {transactionToDelete && (
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
                Delete Transaction {transactionToDelete.id}?
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">
                Are you sure you want to delete this transaction? This action
                cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setTransactionToDelete(null)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(transactionToDelete.id);
                  setTransactionToDelete('');
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

export default Transactions;
