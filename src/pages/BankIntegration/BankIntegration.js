import { useState } from 'react';
import { CreditCard, Check, AlertCircle, ChevronRight, Lock } from 'lucide-react';

export default function BankAccountLinking() {
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState(null);
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: '',
    accountName: '',
    phoneNumber: '',
    otp: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLinked, setIsLinked] = useState(false);

  const banks = [
    { id: 1, name: 'VietcomBank', logo: '🏦' },
    { id: 2, name: 'BIDV', logo: '🏦' },
    { id: 3, name: 'Agribank', logo: '🏦' },
    { id: 4, name: 'VPBank', logo: '🏦' },
    { id: 5, name: 'MB Bank', logo: '🏦' }
  ];

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountInfoSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Giả lập quá trình xác thực OTP
    setTimeout(() => {
      setIsLoading(false);
      setIsLinked(true);
      setStep(4);
    }, 1500);
  };

  const handleStartOver = () => {
    setStep(1);
    setSelectedBank(null);
    setAccountInfo({
      accountNumber: '',
      accountName: '',
      phoneNumber: '',
      otp: ''
    });
    setIsLinked(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10 pb-20">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 py-4 px-6">
          <h1 className="text-xl font-bold text-white">Link to bank account</h1>
          <p className="text-blue-100 text-sm mt-1">
            Connect bank account to your app for seamless transactions
          </p>
        </div>
        
        {/* Thanh tiến trình */}
        <div className="px-6 pt-4">
          <div className="flex justify-between mb-4">
            <div className={`flex flex-col items-center w-1/4 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
              <span className="text-xs mt-1">Select the bank</span>
            </div>
            <div className={`flex flex-col items-center w-1/4 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
              <span className="text-xs mt-1">Information</span>
            </div>
            <div className={`flex flex-col items-center w-1/4 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>3</div>
              <span className="text-xs mt-1">Verification</span>
            </div>
            <div className={`flex flex-col items-center w-1/4 ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>4</div>
              <span className="text-xs mt-1">Completed</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Bước 1: Chọn ngân hàng */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-medium mb-4 text-black">Select your bank</h2>
              <div className="grid grid-cols-1 gap-3">
                {banks.map(bank => (
                  <button
                    key={bank.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => handleSelectBank(bank)}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{bank.logo}</span>
                      <span className="font-medium text-black">{bank.name}</span>
                    </div>
                    <ChevronRight className="text-gray-400" size={20} />
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Lock size={14} className="mr-1" />
                <span>Your information is secured</span>
              </div>
            </div>
          )}
          
          {/* Bước 2: Nhập thông tin tài khoản */}
          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setStep(1)}
                  className="mr-2 text-gray-500 hover:text-gray-700">
                  ← Back
                </button>
                <h2 className="text-lg font-medium text-black">Account information {selectedBank?.name}</h2>
              </div>
              
              <form onSubmit={handleAccountInfoSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={accountInfo.accountNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Enter your bank account number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      name="accountName"
                      value={accountInfo.accountName}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Enter the account holder's name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={accountInfo.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </form>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start">
                <AlertCircle className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" size={16} />
                <p className="text-xs text-blue-700">
                  Your information is secured. We do not store your bank account information.
                </p>
              </div>
            </div>
          )}
          
          {/* Bước 3: Xác thực OTP */}
          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setStep(2)}
                  className="mr-2 text-gray-500 hover:text-gray-700"
                >
                  ← Back
                </button>
                <h2 className="text-lg font-medium text-black">Account Verification</h2>
              </div>
              
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  We sent OTP to your phone number {accountInfo.phoneNumber.slice(0, 3)}****{accountInfo.phoneNumber.slice(-3)}
                </p>
              </div>
              
              <form onSubmit={handleOtpSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    value={accountInfo.otp}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Enter the OTP sent to your phone"
                    maxLength="6"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : 'Confirm'}
                </button>
                
                <div className="mt-4 text-center">
                  <button type="button" className="text-blue-600 text-sm font-medium">
                    Resend OTP (60s)
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Bước 4: Hoàn thành */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="text-green-600" size={32} />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">Link successfully</h2>
              <p className="text-gray-600 mb-6">
                Your bank account has been linked successfully. You can now make transactions easily.
              </p>
              
              <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                  <span className="text-gray-500 text-sm">Bank</span>
                  <span className="font-medium text-black">{selectedBank?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Holder name</span>
                  <span className="font-medium text-black">{accountInfo.accountName}</span>
                </div>
              </div>
              
              <button
                onClick={handleStartOver}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Complete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Phần thông tin thêm */}
      {/* <div className="w-full max-w-md mt-6 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-medium mb-3 text-black">Câu hỏi thường gặp</h2>
        <div className="space-y-3">
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer text-black">Liên kết tài khoản ngân hàng có an toàn không?</summary>
            <p className="text-sm text-gray-600 mt-1 pl-5 text-black">
              Chúng tôi sử dụng công nghệ mã hóa tiên tiến để bảo vệ thông tin tài khoản ngân hàng của bạn. Chúng tôi không lưu trữ thông tin đăng nhập ngân hàng của bạn.
            </p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer text-black">Tôi có thể hủy liên kết tài khoản không?</summary>
            <p className="text-sm text-gray-600 mt-1 pl-5 text-black">
              Có, bạn có thể hủy liên kết tài khoản ngân hàng bất kỳ lúc nào trong phần Cài đặt của ứng dụng.
            </p>
          </details>
          <details className="border-b pb-2">
            <summary className="font-medium cursor-pointer text-black">Có phí giao dịch khi liên kết tài khoản không?</summary>
            <p className="text-sm text-gray-600 mt-1 pl-5 text-black">
              Không, việc liên kết tài khoản ngân hàng với ứng dụng của chúng tôi hoàn toàn miễn phí.
            </p>
          </details>
        </div>
      </div> */}
    </div>
  );
}