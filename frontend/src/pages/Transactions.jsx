import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, SquarePen, Contact } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';

function Transactions() {
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
        </div>
      </div>
    </div>
  );
}

export default Transactions;
