import React from "react";
import vnPayLogo from "../../../../assets/image/vnpay.jpg";
import zaloPayLogo from "../../../../assets/image/zalopaylogo.png";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetEventByIdApi } from "../../../../services/api/EventApi";
import { GetOrderByIdWithDetailOrderAndTicketAndPromotionApi,
    PayOrderApi } from "../../../../services/api/OrderApi";
import { GetUnusedVoucherOfUsers } from "../../../../services/api/PromotionApi";
import { GetUser } from "../../../../services/UserStorageService";
import { GetPaymentMethodsOfUserApi } from "../../../../services/api/AccountApi";
import ThemeToggle from "../../../../components/ThemeToggle/ThemeToggle";

function PaymentInfo() {
    const navigate = useNavigate();
    const {eventId, orderId} = useParams();
    
    const [currentUser] = useState(GetUser());
    const [event, setEvent] = useState({});
    const [order, setOrder] = useState({});
    const [ticketOfOrders, setTicketOfOrders] = useState([]);
    const [ticketInfos, setTicketInfos] = useState([]);
    const [promotionInfo, setPromotionInfo] = useState({});
    const [vouchers, setVouchers] = useState([]);
    const [seletedVoucherId, setSelectedVoucherId] = useState(null);
    const [bankAcountList, setBankAccountList] = useState([]);
    const [selectedBankAccountId, setSelectedBankAccountId] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    useEffect(() => {
        if(!currentUser || !currentUser.roles?.find(role => role === "USER")) {
            sessionStorage.setItem('redirectAfterLogin', `/booking/${eventId}/payment-info/${orderId}`);
            navigate("/signin", { replace: true });
            return;
        }

        const fetchEvent = async () => {
            const [eventData, orderData, vouchersData] = await Promise.all([GetEventByIdApi(eventId),
                                                            GetOrderByIdWithDetailOrderAndTicketAndPromotionApi(orderId),
                                                            GetUnusedVoucherOfUsers(currentUser.userName)]);
            if(orderData.order.status === "PAID")
            {
                navigate("/error");
            }
            setOrder(orderData.order);
            setTicketOfOrders(orderData.ticketOfOrders);
            setTicketInfos(orderData.ticketInfos);
            setPromotionInfo(orderData.promotionInfo);
            setVouchers(vouchersData);
            setEvent(eventData);
        }
        fetchEvent();
    }, [eventId,currentUser, orderId, navigate]);
    
    useEffect(() => {
        const fetchBankAccount = async () => {
            const response = await GetPaymentMethodsOfUserApi(currentUser?.userName, selectedPaymentMethod);
            if(response && response.length > 0) {
                setBankAccountList(response);
            }
            else {
                alert("You have no bank account. Please link to your bank account first.");
                setBankAccountList([]);
            }
        }
        if(selectedPaymentMethod && currentUser?.userName)
            fetchBankAccount();
    },[selectedPaymentMethod, currentUser?.userName]);

    const HandlePayment = async () => {
        const response = await PayOrderApi(orderId, selectedBankAccountId, seletedVoucherId);

        if(response)
        {
            if(response === "processing"){
                alert("Payment success");
                navigate("/");
            }
        }
        else{
            alert("Payment failed");
        }
    }

    return(
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <ThemeToggle />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center">
                        {/* Step 1 - Completed */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-2">Select Ticket</span>
                        </div>
                        
                        {/* Divider */}
                        <div className="w-16 h-0.5 bg-primary-600 mx-4"></div>
                        
                        {/* Step 2 - Completed */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-2">Question Form</span>
                        </div>
                        
                        {/* Divider */}
                        <div className="w-16 h-0.5 bg-primary-600 mx-4"></div>
                        
                        {/* Step 3 - Active */}
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-yellow-400 mt-2">Payment Info</span>
                        </div>
                    </div>
                </div>

                {/* Event Info and Timer */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 flex flex-col lg:flex-row justify-between items-start">
                    <div className="flex-1">
                        <h1 className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                            {event?.event?.name}
                        </h1>
                        <div className="space-y-2">
                            <div className="flex items-center text-secondary-600 dark:text-gray-300">
                                <svg className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event?.event?.location}
                            </div>
                            <div className="flex items-center text-secondary-600 dark:text-gray-300">
                                <svg className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {event?.event?.time} - {event?.event?.date}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-secondary-100 dark:bg-gray-700 rounded-xl p-4 mt-4 lg:mt-0 lg:ml-6">
                        <div className="text-center">
                            <div className="text-sm text-secondary-600 dark:text-gray-300 mb-2">
                                Complete your booking within
                            </div>
                            <div className="text-2xl font-bold text-secondary-700 dark:text-white">
                                14 : 35
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Payment Info Section */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                            PAYMENT INFO
                        </h2>
                        
                        {/* Alert */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start">
                            <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-yellow-800 dark:text-yellow-200">
                                Please check ticket receiving info. If there are any changes, 
                                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                                    please update here
                                </a>
                            </div>
                        </div>

                        {/* Ticket Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="font-semibold text-secondary-700 dark:text-white mb-2">
                                        Ticket receiving info
                                    </div>
                                    <div className="space-y-1 text-secondary-600 dark:text-gray-300">
                                        <div>{currentUser ? currentUser.fullName : "No name"}</div>
                                        <div>{currentUser ? currentUser.phoneNumber : "No phone number"}</div>
                                        <div>{currentUser ? currentUser.email : "No email"}</div>
                                    </div>
                                </div>
                                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                                    Edit
                                </a>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="font-semibold text-secondary-700 dark:text-white mb-4">
                                Payment method
                            </div>
                            
                            <div className="space-y-4">
                                {/* VNPAY - Disabled */}
                                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg opacity-50 cursor-not-allowed">
                                    <input
                                        disabled
                                        type="radio" 
                                        name="payment"
                                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <img src={vnPayLogo} alt="VNPAY logo" className="w-8 h-8 mr-3"/>
                                        <span className="font-medium text-secondary-700 dark:text-white">VNPAY</span>
                                    </div>
                                </label>

                                {/* TicSys Banking */}
                                <label className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                                    <input
                                        checked={selectedPaymentMethod === "tsbank"}
                                        onChange={(e) => setSelectedPaymentMethod(e.target.id)}       
                                        type="radio" 
                                        id="tsbank" 
                                        name="payment"
                                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <div className="ml-3 flex items-center">
                                        <img src={zaloPayLogo} alt="Zalopay logo" className="w-8 h-8 mr-3"/>
                                        <span className="font-medium text-secondary-700 dark:text-white mr-2">
                                            TicSys Banking
                                        </span>
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                            New
                                        </span>
                                    </div>
                                </label>

                                {/* Bank Account Selection */}
                                {selectedPaymentMethod === "tsbank" && (
                                    <select
                                        value={selectedBankAccountId || ""}
                                        onChange={(e) => setSelectedBankAccountId(e.target.value)}
                                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="" disabled>SELECT YOUR BANK ACCOUNT</option>
                                        {bankAcountList.map((account) => (
                                            <option key={account.bankAccountNumber} value={account.bankAccountNumber}>
                                                {account.bankAccountNumber} - {account.bankName}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="space-y-6">
                        {/* Ticket Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <div className="font-semibold text-secondary-700 dark:text-white">
                                    Ticket information
                                </div>
                                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                                    Reselect Ticket
                                </a>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm font-medium text-secondary-600 dark:text-gray-300 pb-2 border-b border-gray-200 dark:border-gray-600">
                                    <span>Ticket type</span>
                                    <span className="text-right">Quantity</span>
                                </div>
                                
                                {ticketOfOrders.map((ticketOfOrder, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <span className="text-secondary-700 dark:text-white font-medium">
                                                {ticketInfos.at(index)?.name}
                                            </span>
                                            <span className="text-right text-secondary-700 dark:text-white">
                                                {ticketOfOrder.quantity}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <span className="text-secondary-600 dark:text-gray-300">
                                                {ticketInfos.at(index)?.price?.toLocaleString('vi-VN')} đ
                                            </span>
                                            <span className="text-right font-semibold text-primary-600 dark:text-primary-400">
                                                {(ticketInfos.at(index)?.price * ticketOfOrder.quantity).toLocaleString('vi-VN')} đ
                                            </span>
                                        </div>
                                        {index < ticketOfOrders.length - 1 && (
                                            <hr className="border-gray-200 dark:border-gray-600" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Discount & Order Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <div className="font-semibold text-secondary-700 dark:text-white mb-4">
                                Discount
                            </div>
                            
                            {/* Discount Code Input */}
                            <div className="flex mb-4">
                                <input 
                                    type="text" 
                                    placeholder="ENTER DISCOUNT CODE"
                                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                                <button className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-r-lg transition-colors duration-200">
                                    Apply
                                </button>
                            </div>

                            {/* Voucher Selection */}
                            <div className="flex mb-6">
                                <select
                                    value={seletedVoucherId || ""}
                                    onChange={(e) => setSelectedVoucherId(e.target.value)}
                                    className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-secondary-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    <option value="" disabled>SELECT AVAILABLE VOUCHER OF YOURS</option>
                                    {vouchers.map((voucher) => (
                                        <option key={voucher.id} value={voucher.id}>
                                            {voucher.voucherValue?.toLocaleString('vi-VN')} đ
                                        </option>
                                    ))}
                                </select>
                                <button className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-r-lg transition-colors duration-200">
                                    Apply
                                </button>
                            </div>

                            {/* Order Summary */}
                            <div className="space-y-3 border-t border-gray-200 dark:border-gray-600 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-secondary-600 dark:text-gray-300">Actual price</span>
                                    <span className="font-semibold text-secondary-700 dark:text-white">
                                        {promotionInfo ? (order.price + promotionInfo.reduction).toLocaleString('vi-VN') : order.price?.toLocaleString('vi-VN')} đ
                                    </span>
                                </div>
                                
                                {promotionInfo?.type === "Flash Sale" && (
                                    <div className="flex justify-between">
                                        <span className="text-secondary-600 dark:text-gray-300">Promotion</span>
                                        <span className="font-semibold text-green-600 dark:text-green-400">
                                            -{promotionInfo.reduction.toLocaleString('vi-VN')} đ
                                        </span>
                                    </div>
                                )}
                                
                                {promotionInfo?.type === "Voucher Gift" && (
                                    <div className="flex justify-between">
                                        <span className="text-secondary-600 dark:text-gray-300">Promotion</span>
                                        <span className="font-semibold text-green-600 dark:text-green-400">
                                            Voucher {promotionInfo.voucherValue?.toLocaleString('vi-VN')} đ
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-600 pt-3">
                                    <span className="text-secondary-700 dark:text-white">Total</span>
                                    <span className="text-primary-600 dark:text-primary-400">
                                        {order?.price?.toLocaleString('vi-VN')} đ
                                    </span>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="text-xs text-secondary-600 dark:text-gray-400 mt-4">
                                By proceeding the order, you agree to the 
                                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                                    General Trading Conditions
                                </a>
                            </div>

                            {/* Payment Button */}
                            <button 
                                onClick={HandlePayment} 
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl mt-6 transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Complete Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentInfo;
