import React from "react";
import { useState, useEffect } from "react";
import { GetTransactionsOfAccountApi } from "../../services/api/BankingApi";
function Transactions({selectedAccountFromParent}){
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setSelectedAccount(selectedAccountFromParent);
    }, [selectedAccountFromParent]);
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await GetTransactionsOfAccountApi(selectedAccount.id);
                setTransactions(response);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        if(selectedAccount) {
          fetchAccounts();
        }
    }, [selectedAccount]);
    return (
        <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">
        {selectedAccount?.id} - Transactions
      </h2>
      <div className="bg-white shadow-md rounded-lg">
        {transactions?.length === 0 ? (
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
              {[...(transactions || [])].reverse().map(transaction => (
                <tr 
                  key={transaction?.id} 
                  className={`
                    ${transaction?.amount > 0 
                      ? 'bg-green-50' 
                      : 'bg-red-50'}
                    border-b last:border-b-0
                  `}
                >
                  <td className="p-2">{transaction?.createdDate}</td>
                  <td className="p-2">{transaction?.note}</td>
                  <td className={`
                    p-2 text-right font-bold
                    ${transaction?.type === 'DEPOSIT' 
                      ? 'text-green-600' 
                      : 'text-red-600'}
                  `}>
                    {transaction?.amount.toLocaleString('vi-VN')} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    );
}

export default Transactions;