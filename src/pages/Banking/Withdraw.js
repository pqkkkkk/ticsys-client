import React from "react";
import { useState, useEffect } from "react";
import { WithdrawApi } from "../../services/api/BankingApi";
import { set } from "date-fns";
function Withdraw({accountListFromParent}) {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [accountList, setAccountList] = useState([]);
    const [readyForWithdraw, setReadyForWithdraw] = useState(false);

    useEffect(() => {
          console.log("useEffect kkk");
    
          const handleWithdraw = async (withdrawRequest) => {
            const response = await WithdrawApi(withdrawRequest);
  
            if(response){
              if(response.transactionResult === "SUCCESS"){
                alert("Withdraw successful!");
              }
              else{
                alert(`Withdraw failed: ${response.transactionResult}`);
              }
      
              setWithdrawAmount(0);
              setSelectedAccount(null);
              setReadyForWithdraw(false);
            }
          }
          if(readyForWithdraw && withdrawAmount > 0 && selectedAccount){
            const withdrawRequest = {
              accountId: selectedAccount.id,
              amount: withdrawAmount,
            };
            handleWithdraw(withdrawRequest);
          }
        }, [withdrawAmount, selectedAccount, readyForWithdraw]);
     useEffect(() => {
        setAccountList(accountListFromParent);
      }, [accountListFromParent]);

    const WithdrawClick = () => {
      setReadyForWithdraw(true);
    }
    return (
        <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">Withdraw</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <select
          onChange={(e) => {
            const selectedId = e.target.value;
            const account = accountList.find(account => account.id === selectedId);
            setSelectedAccount(account);
          }}
          className="w-full p-2 text-black border rounded mb-4"
          value={selectedAccount?.id}>
          <option value="">Select Account</option>
          {accountList.map(account => (
                <option key={account.id} value={account.id}>
                  {account.id} - {account.balance.toLocaleString('vi-VN')} đ
                </option>
            ))}
        </select>
        <input 
          type="number" 
          placeholder="Withdrawal Amount" 
          className="w-full p-2 text-black border rounded mb-4"
          min="0"
          step="0.01"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          id="withdrawAmount"
        />
        <button 
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={WithdrawClick}
        >
          Withdraw
        </button>
      </div>
    </div>
    );
}

export default Withdraw;