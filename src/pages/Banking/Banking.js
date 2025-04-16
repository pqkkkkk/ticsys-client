import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  List, 
  RefreshCcw 
} from 'lucide-react';

// Mock data and initial state
const initialAccounts = [
  { 
    id: 'checking', 
    name: 'Checking Account', 
    balance: 5234.56, 
    transactions: [
      { id: 1, date: '2024-03-25', description: 'Salary Deposit', amount: 3500.00, type: 'deposit' },
      { id: 2, date: '2024-03-22', description: 'Grocery Store', amount: -85.43, type: 'withdrawal' },
      { id: 3, date: '2024-03-20', description: 'Online Transfer', amount: -250.00, type: 'transfer' }
    ]
  },
  { 
    id: 'savings', 
    name: 'Savings Account', 
    balance: 15678.90, 
    transactions: []
  }
];

const BankingApp = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [activeView, setActiveView] = useState('dashboard');
  const [transferData, setTransferData] = useState({
    fromAccount: selectedAccount.id,
    toAccount: '',
    amount: ''
  });

  // Handler functions
  const handleDeposit = (accountId, amount) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId 
          ? {
              ...account, 
              balance: account.balance + parseFloat(amount),
              transactions: [
                ...account.transactions,
                {
                  id: account.transactions.length + 1,
                  date: new Date().toISOString().split('T')[0],
                  description: 'Cash Deposit',
                  amount: parseFloat(amount),
                  type: 'deposit'
                }
              ]
            }
          : account
      )
    );
  };

  const handleWithdraw = (accountId, amount) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId 
          ? {
              ...account, 
              balance: account.balance - parseFloat(amount),
              transactions: [
                ...account.transactions,
                {
                  id: account.transactions.length + 1,
                  date: new Date().toISOString().split('T')[0],
                  description: 'Cash Withdrawal',
                  amount: -parseFloat(amount),
                  type: 'withdrawal'
                }
              ]
            }
          : account
      )
    );
  };

  const handleTransfer = () => {
    const { fromAccount, toAccount, amount } = transferData;
    const transferAmount = parseFloat(amount);

    setAccounts(prevAccounts => 
      prevAccounts.map(account => {
        if (account.id === fromAccount) {
          return {
            ...account,
            balance: account.balance - transferAmount,
            transactions: [
              ...account.transactions,
              {
                id: account.transactions.length + 1,
                date: new Date().toISOString().split('T')[0],
                description: `Transfer to ${toAccount}`,
                amount: -transferAmount,
                type: 'transfer'
              }
            ]
          };
        }
        if (account.id === toAccount) {
          return {
            ...account,
            balance: account.balance + transferAmount,
            transactions: [
              ...account.transactions,
              {
                id: account.transactions.length + 1,
                date: new Date().toISOString().split('T')[0],
                description: `Transfer from ${fromAccount}`,
                amount: transferAmount,
                type: 'deposit'
              }
            ]
          };
        }
        return account;
      })
    );
  };

  // Render components
  const renderDashboard = () => (
    <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">My Accounts</h2>
      {accounts.map(account => (
        <div 
          key={account.id} 
          className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-50"
          onClick={() => {
            setSelectedAccount(account);
            setActiveView('transactions');
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg text-black font-semibold">{account.name}</h3>
              <p className="text-gray-600">Available Balance</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-black font-bold">${account.balance.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDeposit = () => (
    <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">Deposit</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <select 
          className="w-full p-2 border text-black rounded mb-4"
          value={selectedAccount.id}
          onChange={(e) => setSelectedAccount(
            accounts.find(acc => acc.id === e.target.value)
          )}
        >
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Deposit Amount" 
          className="w-full p-2 border rounded mb-4"
          min="0"
          step="0.01"
          id="depositAmount"
        />
        <button 
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={() => {
            const amount = document.getElementById('depositAmount').value;
            handleDeposit(selectedAccount.id, amount);
          }}
        >
          Deposit
        </button>
      </div>
    </div>
  );

  const renderWithdraw = () => (
    <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">Withdraw</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <select 
          className="w-full p-2 text-black border rounded mb-4"
          value={selectedAccount.id}
          onChange={(e) => setSelectedAccount(
            accounts.find(acc => acc.id === e.target.value)
          )}
        >
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Withdrawal Amount" 
          className="w-full p-2 text-black border rounded mb-4"
          min="0"
          step="0.01"
          id="withdrawAmount"
        />
        <button 
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={() => {
            const amount = document.getElementById('withdrawAmount').value;
            handleWithdraw(selectedAccount.id, amount);
          }}
        >
          Withdraw
        </button>
      </div>
    </div>
  );

  const renderTransfer = () => (
    <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">Transfer</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <select 
          className="w-full p-2 text-black border rounded mb-4"
          value={transferData.fromAccount}
          onChange={(e) => setTransferData(prev => ({
            ...prev, 
            fromAccount: e.target.value
          }))}
        >
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        <select 
          className="w-full p-2 border text-black rounded mb-4"
          value={transferData.toAccount}
          onChange={(e) => setTransferData(prev => ({
            ...prev, 
            toAccount: e.target.value
          }))}
        >
          <option value="">Select Destination Account</option>
          {accounts.filter(acc => acc.id !== transferData.fromAccount).map(account => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Transfer Amount" 
          className="w-full p-2 border rounded mb-4"
          min="0"
          step="0.01"
          value={transferData.amount}
          onChange={(e) => setTransferData(prev => ({
            ...prev, 
            amount: e.target.value
          }))}
        />
        <button 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleTransfer}
        >
          Transfer
        </button>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">
        {selectedAccount.name} - Transactions
      </h2>
      <div className="bg-white shadow-md rounded-lg">
        {selectedAccount.transactions.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            No transactions yet
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[...selectedAccount.transactions].reverse().map(transaction => (
                <tr 
                  key={transaction.id} 
                  className={`
                    ${transaction.amount > 0 
                      ? 'bg-green-50' 
                      : 'bg-red-50'}
                    border-b last:border-b-0
                  `}
                >
                  <td className="p-2">{transaction.date}</td>
                  <td className="p-2">{transaction.description}</td>
                  <td className={`
                    p-2 text-right font-bold
                    ${transaction.amount > 0 
                      ? 'text-green-600' 
                      : 'text-red-600'}
                  `}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-20 bg-white shadow-md flex flex-col items-center py-4">
        <button 
          className={`p-3 mb-2 rounded ${activeView === 'dashboard' ? 'bg-blue-100' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <Home className='text-black' />
        </button>
        <button 
          className={`p-3 mb-2 rounded ${activeView === 'deposit' ? 'bg-blue-100' : ''}`}
          onClick={() => setActiveView('deposit')}
        >
          <ArrowDownCircle className='text-black' />
        </button>
        <button 
          className={`p-3 mb-2 rounded ${activeView === 'withdraw' ? 'bg-blue-100' : ''}`}
          onClick={() => setActiveView('withdraw')}
        >
          <ArrowUpCircle className='text-black' />
        </button>
        <button 
          className={`p-3 mb-2 rounded ${activeView === 'transfer' ? 'bg-blue-100' : ''}`}
          onClick={() => setActiveView('transfer')}
        >
          <RefreshCcw className='text-black' />
        </button>
        <button 
          className={`p-3 rounded ${activeView === 'transactions' ? 'bg-blue-100' : ''}`}
          onClick={() => {
            setSelectedAccount(accounts[0]);
            setActiveView('transactions');
          }}
        >
          <List className='text-black' />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'deposit' && renderDeposit()}
        {activeView === 'withdraw' && renderWithdraw()}
        {activeView === 'transfer' && renderTransfer()}
        {activeView === 'transactions' && renderTransactions()}
      </div>
    </div>
  );
};

export default BankingApp;