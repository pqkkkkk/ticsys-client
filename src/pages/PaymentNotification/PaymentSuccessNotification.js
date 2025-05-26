import React from 'react';
import { CheckCircle, Printer, Home, ArrowLeft } from 'lucide-react';

export default function PaymentSuccessNotification() {
  // Thông tin đơn hàng mẫu
  const orderInfo = {
    orderId: "DH2025042801",
    date: "28/04/2025",
    totalAmount: "1.250.000 VNĐ",
    paymentMethod: "Thẻ tín dụng",
    customer: "Nguyễn Văn A",
    email: "nguyenvana@example.com"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Thanh toán thành công!</h1>
          <p className="text-gray-600 mt-2 text-center">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
          </p>
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
              <span className="text-black">{orderInfo.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-bold text-green-600">{orderInfo.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phương thức thanh toán:</span>
              <span className="text-black">{orderInfo.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Khách hàng:</span>
              <span className='text-black'>{orderInfo.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className='text-black'>{orderInfo.email}</span>
            </div>
          </div>
        </div>

        {/* Email notification */}
        <div className="bg-blue-50 rounded-md p-4 mb-6 border border-blue-100">
          <p className="text-sm text-blue-800">
            Chúng tôi đã gửi email xác nhận đến <strong>{orderInfo.email}</strong>. 
            Vui lòng kiểm tra hộp thư của bạn.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col space-y-3">
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors">
            <Printer className="w-4 h-4 mr-2" />
            In hóa đơn
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md flex items-center justify-center transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tiếp tục mua sắm
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors">
              <Home className="w-4 h-4 mr-2" />
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi</p>
        <p className="font-medium">hotro@example.com | 1900 1234</p>
      </div>
    </div>
  );
}