import React from "react";
import { useState, useEffect } from "react";
import { GetAccountsOfCustomerApi } from "../../services/api/BankingApi";
function Dashboard({setSelectedAccountToParent, setAccountListToParent}){
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const customerId = 10;
                const response = await GetAccountsOfCustomerApi(customerId);
                setAccounts(response.accounts);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, []);
    useEffect(() => {
        setSelectedAccountToParent(selectedAccount);
    }
    , [selectedAccount, setSelectedAccountToParent]);
    useEffect(() => {
        setAccountListToParent(accounts);
    }, [accounts, setAccountListToParent]);
    return (
        <div className="p-4">
        <h2 className="text-2xl text-black font-bold mb-4">My Accounts</h2>
      {accounts.map(account => (
        <div 
          key={account.id} 
          className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-50"
          onClick={() => {
            setSelectedAccount(account);
          }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg text-black font-semibold">{account.id}</h3>
              <p className="text-gray-600">Available Balance</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-black font-bold">{account.balance.toLocaleString('vi-VN')} đ</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    );
}

export default Dashboard;