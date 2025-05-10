import React, { useEffect, useState } from 'react';
import { 
  Home, 
  CreditCard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  List, 
  RefreshCcw 
} from 'lucide-react';
import Dashboard from './Dashboard';
import Deposit from './Deposit';
import Transactions from './Transactions';
import Withdraw from './Withdraw';
import Transfer from './Transfer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink } from 'react-router-dom';

const BankingApp = () => {

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [accountList, setAccountList] = useState([]);

  const setSelectedAccountFromChildren = (account) => {
    setSelectedAccount(account);
  }
  const setAccountListFromChildren = (accountList) => {
    setAccountList(accountList);
  }

  useEffect(() => {
    if(selectedAccount){
      setActiveView('transactions');
    }
  }, [selectedAccount]);
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <ul className="w-20 bg-white shadow-md flex flex-col items-center py-4">
        <button 
          className={`p-3 mb-2 rounded ${activeView === 'dashboard' ? 'bg-blue-100' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <Home className='text-black' />
        </button>
        <li 
          className={`p-3 mb-2 rounded ${activeView === 'deposit' ? 'bg-blue-100' : ''}`}
          onClick={() => setActiveView('deposit')}
        >
            <ArrowDownCircle className='text-black' />
        </li>
        <li 
          className={`p-3 mb-2 rounded ${activeView === 'withdraw' ? 'bg-blue-100' : ''}`}
          onClick={() => setActiveView('withdraw')}>
            <ArrowUpCircle className='text-black' />
        </li>
        <li 
          className={`p-3 mb-2 rounded ${activeView === 'transfer' ? 'bg-blue-100' : ''}`}
          onClick={() => setActiveView('transfer')}>
            <RefreshCcw className='text-black' />
        </li>
        <li 
          className={`p-3 rounded ${activeView === 'transactions' ? 'bg-blue-100' : ''}`}
          onClick={() => {
            setActiveView('transactions');
          }}>
          <List className='text-black' />
        </li>
      </ul>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'dashboard' && <Dashboard
                                  setAccountListToParent={setAccountListFromChildren}
                                  setSelectedAccountToParent={setSelectedAccountFromChildren} />}
        {activeView === 'deposit' && <Deposit accountListFromParent={accountList}  />}
        {activeView === 'withdraw' && <Withdraw accountListFromParent={accountList} />}
        {activeView === 'transfer' && <Transfer accountListFromParent={accountList}/>}
        {activeView === 'transactions' && <Transactions selectedAccountFromParent={selectedAccount} />}
      
      </div>
    </div>
  );
};

export default BankingApp;