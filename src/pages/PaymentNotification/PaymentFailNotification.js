import React from 'react';
import { XCircle, AlertTriangle, RefreshCcw, CreditCard, Phone, ArrowLeft } from 'lucide-react';

export default function PaymentFailedNotification() {
  
  const orderInfo = {
    orderId: "DH2025042802",
    date: "29/04/2025",
    totalAmount: "1.250.000 VNĐ",
    paymentMethod: "Thẻ tín dụng",
    customer: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    errorCode: "ERR_PAYMENT_DECLINED",
    errorMessage: "Thẻ của bạn đã bị từ chối bởi ngân hàng phát hành."
  };

  
  const commonIssues = [
    {
      problem: "Thẻ hết hạn",
      solution: "Kiểm tra ngày hết hạn trên thẻ của bạn và cập nhật thông tin thanh toán."
    },
    {
      problem: "Không đủ số dư",
      solution: "Kiểm tra số dư tài khoản và đảm bảo có đủ tiền cho giao dịch."
    },
    {
      problem: "Thông tin thẻ không chính xác",
      solution: "Xác minh và nhập lại số thẻ, ngày hết hạn và mã CVV."
    },
    {
      problem: "Giao dịch vượt quá hạn mức",
      solution: "Liên hệ ngân hàng để tăng hạn mức hoặc sử dụng phương thức thanh toán khác."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="rounded-full bg-red-100 p-3 mb-4">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Thanh toán không thành công</h1>
          <p className="text-gray-600 mt-2 text-center">
            Rất tiếc, chúng tôi không thể xử lý thanh toán của bạn.
          </p>
        </div>

        {/* Error details */}
        <div className="bg-red-50 rounded-md p-4 mb-6 border border-red-100">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Lỗi: {orderInfo.errorCode}</p>
              <p className="text-red-700 text-sm mt-1">{orderInfo.errorMessage}</p>
            </div>
          </div>
        </div>

        {/* Order details */}
        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Chi tiết đơn hàng</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Mã đơn hàng:</span>
              <span className="font-medium text-black">{orderInfo.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ngày đặt hàng:</span>
              <span className='text-black'>{orderInfo.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-medium text-black">{orderInfo.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phương thức thanh toán:</span>
              <span className='text-black'>{orderInfo.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Common issues and solutions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Các vấn đề phổ biến</h2>
          <div className="space-y-3">
            {commonIssues.map((issue, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium text-gray-800">{issue.problem}</p>
                <p className="text-gray-600 text-sm mt-1">{issue.solution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col space-y-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Thử lại thanh toán
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors">
              <CreditCard className="w-4 h-4 mr-2" />
              Phương thức khác
            </button>
            
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md flex items-center justify-center transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại giỏ hàng
            </button>
          </div>
        </div>
      </div>
      
      {/* Support information */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 font-medium">Cần hỗ trợ?</p>
        <div className="flex items-center justify-center mt-2 text-blue-600">
          <Phone className="h-4 w-4 mr-1" />
          <span className="font-medium">1900 1234</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
      </div>
    </div>
  );
}