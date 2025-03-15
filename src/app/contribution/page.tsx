"use client";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function PaymentQRGenerator() {
  const [amount, setAmount] = useState("1000");
  const [qrValue, setQrValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Fixed payment details
  const UPI_ID = "studentcouncileventregistrationfees@sbi";
  const PAYEE_NAME = "DIRECTOR S.V.N.I.T.SURAT";
  
  // Generate UPI payment URL
  useEffect(() => {
    if (amount && !isNaN(Number(amount)) && Number(amount) >= 1000) {
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR`;
      setQrValue(upiUrl);
      setIsValid(true);
      setErrorMessage("");
    } else {
      if (amount && Number(amount) < 1000) {
        setErrorMessage("Minimum donation amount is ₹1000");
      } else {
        setErrorMessage("");
      }
      setQrValue("");
      setIsValid(amount === "" || (!isNaN(Number(amount)) && Number(amount) >= 1000));
    }
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
  };

  const canProceed = isValid && Number(amount) >= 1000;

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
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-500">₹</span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            min="1000"
            placeholder="1000"
            className={`w-full p-3 pl-8 border rounded-md focus:outline-none focus:ring-2 ${
              isValid ? "focus:ring-blue-400" : "border-red-500 focus:ring-red-400"
            }`}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">Minimum donation: ₹1000</p>
        {!isValid && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid amount (minimum ₹1000)</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>

      {qrValue && canProceed && (
        <div className="flex flex-col items-center mt-4 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
          <QRCodeSVG value={qrValue} size={200} level="H" />
          <p className="mt-4 text-center text-sm text-gray-600">
            Scan with any UPI app to donate ₹{amount} to {PAYEE_NAME}
          </p>
          <p className="mt-2 text-center text-xs text-blue-600 font-semibold">
            Regular UPI payment
          </p>
        </div>
      )}

      <div className="mt-6 w-full">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">How to pay:</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            <li>Enter the donation amount (minimum ₹1000)</li>
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