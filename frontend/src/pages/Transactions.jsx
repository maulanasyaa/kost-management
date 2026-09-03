import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, SquarePen, Contact } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

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

    getTransactions();
  }, []);

  console.log(transactions);

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
              //   onClick={() => setModalAddContract(true)}
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
                            // onClick={() => askEditConfirmation(contract)}
                            className="flex-1 border border-accent/30 bg-accent/10 text-accent py-2 px-4 rounded-lg flex justify-center items-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer"
                          >
                            <SquarePen className="w-4 h-4" />
                            <span className="text-sm font-semibold">Edit</span>
                          </button>

                          <button
                            type="button"
                            // onClick={() => askDeleteConfirmation(contract)}
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
    </div>
  );
}

export default Transactions;
