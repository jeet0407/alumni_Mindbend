"use client";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function PaymentQRGenerator() {
  const [amount, setAmount] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("regular-upi");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Fixed payment details
  const UPI_ID = "nidhighetiya05@okhdfcbank";
  const PAYEE_NAME = "Alumni Association";
  
  // Generate UPI payment URL
  useEffect(() => {
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
      let upiUrl = "";
      
      // Create different URLs based on payment method
      if (paymentMethod === "regular-upi") {
        upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR`;
      } else if (paymentMethod === "upi-lite") {
        // Add mode=UPI_LITE parameter for UPI Lite transactions
        upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&mode=UPI_LITE&orgid=159761`;
      }
      
      setQrValue(upiUrl);
      setIsValid(true);
      
      // Validate amount against payment method
      if (paymentMethod === "upi-lite" && Number(amount) > 500) {
        setErrorMessage("UPI Lite has a ₹500 limit. Please select regular UPI for higher amounts.");
      } else {
        setErrorMessage("");
      }
    } else {
      setQrValue("");
      setIsValid(amount === "" || (!isNaN(Number(amount)) && Number(amount) > 0));
    }
  }, [amount, paymentMethod]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    if (method === "upi-lite" && Number(amount) > 500) {
      setErrorMessage("UPI Lite has a ₹500 limit. Please select regular UPI for higher amounts.");
    } else {
      setErrorMessage("");
    }
  };

  const canProceed = isValid && !(paymentMethod === "upi-lite" && Number(amount) > 500);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border-4 border-black max-w-md mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
          Alumni
        </span>{" "}
        <span className="text-black">Donation</span>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-900 to-blue-500 mt-2 rounded-full"></div>
      </h2>

      <div className="w-full mb-6">
        <label htmlFor="amount" className="block text-sm font-semibold text-black mb-2">
          Donation Amount (INR)
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          min="1"
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
            isValid ? "focus:ring-blue-400" : "border-red-500 focus:ring-red-400"
          }`}
        />
        {!isValid && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid amount</p>
        )}
      </div>

      <div className="w-full mb-6">
        <label className="block text-sm font-semibold text-black mb-2">
          Choose payment method
        </label>
        <div className="flex flex-col space-y-3">
          <div 
            className={`flex items-center p-3 border rounded-md cursor-pointer ${
              paymentMethod === "regular-upi" ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onClick={() => handlePaymentMethodChange("regular-upi")}
          >
            <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-3">
              {paymentMethod === "regular-upi" && <div className="w-4 h-4 bg-blue-500 rounded-full"></div>}
            </div>
            <div>
              <p className="font-medium">Regular UPI</p>
              <p className="text-xs text-gray-500">No payment limit</p>
            </div>
          </div>
          
          <div 
            className={`flex items-center p-3 border rounded-md cursor-pointer ${
              paymentMethod === "upi-lite" ? "border-blue-500 bg-blue-50" : "border-gray-200"
            } ${Number(amount) > 500 ? "opacity-75" : ""}`}
            onClick={() => handlePaymentMethodChange("upi-lite")}
          >
            <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-3">
              {paymentMethod === "upi-lite" && <div className="w-4 h-4 bg-blue-500 rounded-full"></div>}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">UPI Lite</p>
                <p className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Limit: ₹500</p>
              </div>
              <p className="text-xs text-gray-500">PIN-free payments for small amounts</p>
            </div>
          </div>
        </div>
        
        {errorMessage && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {errorMessage}
            </p>
          </div>
        )}
      </div>

      {qrValue && canProceed && (
        <div className="flex flex-col items-center mt-4 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
          <QRCodeSVG value={qrValue} size={200} level="H" />
          <p className="mt-4 text-center text-sm text-gray-600">
            Scan with any UPI app to donate ₹{amount} to {PAYEE_NAME}
          </p>
          <p className="mt-2 text-center text-xs text-blue-600 font-semibold">
            {paymentMethod === "upi-lite" ? "PIN-free payment via UPI Lite" : "Regular UPI payment"}
          </p>
        </div>
      )}

      <div className="mt-6 w-full">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">How to pay:</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            <li>Enter the donation amount</li>
            <li>Choose your payment method</li>
            <li>Scan the QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
            <li>Confirm the payment in your UPI app</li>
            <li>Keep the transaction ID for your records</li>
          </ol>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>For payment issues, please contact us at alumni.support@example.com</p>
      </div>
    </div>
  );
}