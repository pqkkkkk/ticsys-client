import React, { use } from "react";
import { useState, useEffect } from "react";
import { DepositApi } from "../../services/api/BankingApi";
import { set } from "date-fns";

function Deposit({accountListFromParent}) {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [accountList, setAccountList] = useState([]);
    const [depositAmount, setDepositAmount] = useState(0);
    const [readyForDeposit, setReadyForDeposit] = useState(false);

    useEffect(() => {
      console.log("useEffect kkk");

        const handleDeposit = async (depositRequest) => {
          const response = await DepositApi(depositRequest);

          if(response){
            if(response.transactionResult === "SUCCESS"){
              alert("Deposit successful!");
            }
            else{
              alert(`Deposit failed: ${response.transactionResult}`);
            }
    
            setDepositAmount(0);
            setSelectedAccount(null);
            setReadyForDeposit(false);
          }
        }
        if(readyForDeposit && depositAmount > 0 && selectedAccount){
          const depositRequest = {
            accountId: selectedAccount.id,
            amount: depositAmount,
          };
          handleDeposit(depositRequest);
        }
      }, [depositAmount, selectedAccount, readyForDeposit]);
    
    const DepositClick = () => {
      setReadyForDeposit(true);
    }
    useEffect(() => {
      setAccountList(accountListFromParent);
    }, [accountListFromParent]);

    return (
        <div className="p-4">
          <h2 className="text-2xl text-black font-bold mb-4">Deposit</h2>
          <div className="bg-white shadow-md rounded-lg p-4">
              <select 
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const account = accountList.find(account => account.id === selectedId);
                  setSelectedAccount(account);
                }}
                className="w-full p-2 border text-black rounded mb-4"
                value={selectedAccount?.id}>
                <option value="">Select Account</option>
                {accountList.map(account => (
                  <option
                    key={account.id} value={account.id}>
                    {account.id} - {account.balance.toLocaleString('vi-VN')} đ
                  </option>
                ))}
              </select>
              <input 
                type="number" 
                placeholder="Deposit Amount" 
                className="w-full p-2 border rounded mb-4 text-black"
                min="0"
                step="0.01"
                value={depositAmount?.toLocaleString('vi-VN')}
                onChange={(e) => setDepositAmount(e.target.value)}
                id="depositAmount"/>
              <button 
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                onClick={DepositClick}>
                Deposit
              </button>
          </div>
        </div>
    );
}

export default Deposit;