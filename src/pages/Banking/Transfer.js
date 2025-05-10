import React from "react";
import { useState, useEffect } from "react";
import { TransferApi } from "../../services/api/BankingApi";
import { set } from "date-fns";

function Transfer({accountListFromParent}) {
    const [transferRequest, setTransferRequest] = useState({
        fromAccountId: '',
        toAccountId: '',
        amount: 0
      });
    const [accountList, setAccountList] = useState([]);
    const [readyForTransfer, setReadyForTransfer] = useState(false);

    useEffect(() => {
      setAccountList(accountListFromParent);
    }, [accountListFromParent]);
    useEffect(() => {
      const Deposit = async (transferRequest) => {
        const response = await TransferApi(transferRequest);
        if(response){
          if(response.transactionResult === "SUCCESS"){
            alert("Transfer successful!");
          }
          else{
            alert(`Transfer failed: ${response.transactionResult}`);
          }
          setTransferRequest({
            fromAccountId: '',
            toAccountId: '',
            amount: 0
          });
          setReadyForTransfer(false);
        }
      }
      if(readyForTransfer && transferRequest.amount > 0 &&
         transferRequest.fromAccountId !== '' && transferRequest.toAccountId !== ''){
        Deposit(transferRequest);
      }
    }, [transferRequest, readyForTransfer]);
    
    const handleTransfer = () => {
      setReadyForTransfer(true);
    };
    
    return (
        <div className="p-4">
      <h2 className="text-2xl text-black font-bold mb-4">Transfer</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <select 
          className="w-full p-2 text-black border rounded mb-4"
          value={transferRequest.fromAccountId}
          onChange={(e) => setTransferRequest(prev => ({
            ...prev, 
            fromAccountId: e.target.value
          }))}
        >
            <option value="">Select Source Account</option>
            {accountList.map(account => (
                <option key={account.id} value={account.id}>
                  {account.id} - {account.balance.toLocaleString('vi-VN')} đ
                </option>
              ))}
        </select>
        <input 
          type="text" 
          placeholder="Enter Destination Account ID" 
          className="w-full p-2 border rounded mb-4 text-black"
          min="0"
          step="0.01"
          value={transferRequest.toAccountId}
          onChange={(e) => setTransferRequest(prev => ({
            ...prev, 
            toAccountId: e.target.value
          }))}/>
        <input 
          type="number" 
          placeholder="Transfer Amount" 
          className="w-full p-2 border rounded mb-4 text-black"
          min="0"
          step="0.01"
          value={transferRequest.amount}
          onChange={(e) => setTransferRequest(prev => ({
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
}

export default Transfer;