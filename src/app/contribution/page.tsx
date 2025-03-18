"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { QRCodeSVG } from "qrcode.react"
import { v4 as uuidv4 } from "uuid"

interface PaymentQRGeneratorProps {
  userId?: string | null
}

export default function PaymentQRGenerator({ userId = null }: PaymentQRGeneratorProps) {
  const [amount, setAmount] = useState("  ")
  const [qrValue, setQrValue] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donorPhone, setDonorPhone] = useState("")
  const [donationMessage, setDonationMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donationCreated, setDonationCreated] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [qrScanned, setQrScanned] = useState(false)
  const [upiReferenceId, setUpiReferenceId] = useState("")
  const [showReferenceInput, setShowReferenceInput] = useState(false)
  const qrContainerRef = useRef<HTMLDivElement>(null)
  console.log(setDonationMessage);
  console.log(setQrScanned);

  // Fixed payment details
  const UPI_ID = "denishpatel60-1@okaxis"
  const PAYEE_NAME = "DIRECTOR S.V.N.I.T.SURAT"

  // Generate transaction ID when component mounts
  useEffect(() => {
    setTransactionId(uuidv4().substring(0, 8).toUpperCase())
  }, [])

  // Generate UPI payment URL with transaction reference
  useEffect(() => {
    if (amount && !isNaN(Number(amount)) && Number(amount) >= 1) {
      // Include transaction ID in the UPI payment URL as a reference
      const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tr=${transactionId}&tn=Alumni_Donation`
      setQrValue(upiUrl)
      setIsValid(true)
      setErrorMessage("")
    } else {
      if (amount && Number(amount) < 1000) {
        setErrorMessage("Minimum donation amount is ₹1000")
      } else {
        setErrorMessage("")
      }
      setQrValue("")
      setIsValid(amount === "" || (!isNaN(Number(amount)) && Number(amount) >= 1))
    }
  }, [amount, transactionId])

  // Set up QR code scanning detection
  useEffect(() => {
    if (!donationCreated || qrScanned) return

    // Track if the user has interacted with the QR code
    const handleQRInteraction = () => {
      // Mark that the user has interacted with the QR code
      localStorage.setItem(`qr_interaction_${transactionId}`, "true")
      
      // After a short delay, show the reference input field
      setTimeout(() => {
        setShowReferenceInput(true)
      }, 2000)
    }

    // Add event listeners to detect QR code interaction
    const qrContainer = qrContainerRef.current
    if (qrContainer) {
      qrContainer.addEventListener("click", handleQRInteraction)
      qrContainer.addEventListener("touchstart", handleQRInteraction)
    }

    // Check if there was a previous interaction
    const previousInteraction = localStorage.getItem(`qr_interaction_${transactionId}`)
    if (previousInteraction === "true") {
      setShowReferenceInput(true)
    }

    return () => {
      if (qrContainer) {
        qrContainer.removeEventListener("click", handleQRInteraction)
        qrContainer.removeEventListener("touchstart", handleQRInteraction)
      }
    }
  }, [donationCreated, qrScanned, transactionId])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setAmount(value)
  }

  // Create pending donation record in the database
  const createPendingDonation = async () => {
    if (!isValid || Number(amount) < 1) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(amount),
          transactionId,
          userId,
          donorName,
          donorEmail,
          donorPhone,
          message: donationMessage,
          status: "pending",
          paymentMethod: "upi",
          alumnusId: userId || null,
          // Include detailed transaction information
          transactionDetails: {
            initiatedAt: new Date().toISOString(),
            upiId: UPI_ID,
            payeeName: PAYEE_NAME,
            currency: "INR",
          },
        }),
      })

      if (response.ok) {
        setDonationCreated(true)
        // Store the donation creation time
        localStorage.setItem(`donation_created_${transactionId}`, new Date().getTime().toString())
      } else {
        const data = await response.json()
        setErrorMessage(data.message || "Failed to create donation record")
      }
    } catch (error) {
      console.error("Error creating donation:", error)
      setErrorMessage("An error occurred while processing your request")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Verify transaction status and update the database record
  const verifyTransaction = async () => {
    // Clear any previous error messages
    setErrorMessage("")
    
    // Check if UPI reference ID is provided when required
    if (showReferenceInput && !upiReferenceId) {
      setErrorMessage("Please enter the UPI Reference ID from your payment app")
      return
    }
    
    setIsVerifying(true)

    try {
      // First check - has enough time passed for a payment to be made?
      const currentTime = new Date().getTime()
      const donationCreatedTime = localStorage.getItem(`donation_created_${transactionId}`)
      
      if (!donationCreatedTime) {
        setErrorMessage("Please complete the payment using the QR code before verifying")
        setIsVerifying(false)
        return
      }
      
      const elapsedTime = currentTime - parseInt(donationCreatedTime)
      const minimumTimeRequired = 15000 // 15 seconds minimum to simulate payment time
      
      if (elapsedTime < minimumTimeRequired) {
        setErrorMessage(`Please complete the payment first. Try verification in ${Math.ceil((minimumTimeRequired - elapsedTime) / 1000)} seconds.`)
        setIsVerifying(false)
        return
      }

      // Now proceed with verification, including the UPI reference ID if provided
      const response = await fetch(`/api/verify-transaction/${transactionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upiReferenceId: upiReferenceId || undefined,
          elapsedTime
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.status === "completed") {
          // Transaction was successful
          window.location.href = `/donation-success?id=${transactionId}`
        } else if (data.status === "pending") {
          setErrorMessage("Transaction not yet confirmed. Please ensure you've completed the payment and try again.")
        } else {
          setErrorMessage("Payment verification failed. Please ensure you've entered the correct UPI Reference ID.")
        }
      } else {
        setErrorMessage("Failed to verify transaction. Please try again.")
      }
    } catch (error) {
      console.error("Error verifying transaction:", error)
      setErrorMessage("An error occurred while verifying your donation")
    } finally {
      setIsVerifying(false)
    }
  }

  const canProceed = isValid && Number(amount) >= 1

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border-4 border-black max-w-md mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">Alumni</span>{" "}
        <span className="text-black">Donation</span>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-900 to-blue-500 mt-2 rounded-full"></div>
      </h2>

      <div className="w-full mb-6">
        <label htmlFor="amount" className="block text-sm font-semibold text-black mb-2">
          Donation Amount (INR)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-black">₹</span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            min="1000"
            placeholder="1000"
            className={`w-full p-3 pl-8 border rounded-md focus:outline-none focus:ring-2 text-black ${
              isValid ? "focus:ring-blue-400" : "border-red-500 focus:ring-red-400"
            }`}
            disabled={donationCreated}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">Minimum donation: ₹1000</p>
        {!isValid && <p className="text-red-500 text-sm mt-1">Please enter a valid amount (minimum ₹1000)</p>}
      </div>

      {/* Donor information fields - show only before donation is created */}
      {!donationCreated && (
        <div className="w-full space-y-4 mb-6">
          <div>
            <label htmlFor="donorName" className="block text-sm font-semibold text-black mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="donorName"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="donorEmail" className="block text-sm font-semibold text-black mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="donorEmail"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-40 text-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="donorPhone" className="block text-sm font-semibold text-black mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="donorPhone"
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button
            onClick={createPendingDonation}
            disabled={isSubmitting || !canProceed || !donorName || !donorEmail || !donorPhone}
            className={`w-full py-3 px-4 rounded-md font-medium text-white ${
              canProceed && !isSubmitting && donorName && donorEmail && donorPhone
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400"
            } transition-colors duration-200`}
          >
            {isSubmitting ? "Creating Donation..." : "Proceed to Payment"}
          </button>
        </div>
      )}

      {/* QR Code - show only after donation is created */}
      {qrValue && canProceed && donationCreated && (
        <div className="flex flex-col items-center mt-4 p-4 border-2 border-blue-200 rounded-lg bg-blue-50 w-full">
          <div 
            ref={qrContainerRef}
            className="bg-white p-4 rounded-lg mb-3 cursor-pointer relative"
            title="Tap to scan with your UPI app"
          >
            <QRCodeSVG value={qrValue} size={200} level="H" />
            {!showReferenceInput && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded-lg">
                <p className="text-sm font-medium text-black bg-white px-2 py-1 rounded">Tap to scan</p>
              </div>
            )}
          </div>

          <div className="border border-blue-300 bg-blue-100 rounded-md px-3 py-2 text-center mb-3 w-full">
            <p className="text-sm font-semibold text-blue-800">Transaction ID: {transactionId}</p>
            <p className="text-xs text-blue-600">Keep this ID for reference</p>
          </div>

          <p className="mt-2 text-center text-sm text-gray-600">
            Scan with any UPI app to donate ₹{amount} to {PAYEE_NAME}
          </p>

          {/* UPI Reference ID input - shown after QR interaction */}
          {showReferenceInput && (
            <div className="w-full mt-4 mb-2">
              <label htmlFor="upiReferenceId" className="block text-sm font-semibold text-black mb-2">
                UPI Reference ID (from your payment app)
              </label>
              <input
                type="text"
                id="upiReferenceId"
                value={upiReferenceId}
                onChange={(e) => setUpiReferenceId(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder="Enter UPI Reference ID"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the reference ID shown in your UPI payment app after completing the payment
              </p>
            </div>
          )}

          <button
            onClick={verifyTransaction}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium w-full flex justify-center items-center"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </>
            ) : (
              "I have completed the payment"
            )}
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md w-full">
          <p className="text-red-600 text-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {errorMessage}
          </p>
        </div>
      )}

      <div className="mt-6 w-full">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">How to pay:</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
            <li>Enter your details and proceed</li>
            <li>Tap on the QR code to scan with your UPI app</li>
            <li>Complete the payment in your UPI app</li>
            <li>Enter the UPI Reference ID from your payment app</li>
            <li>Click "I have completed the payment" button</li>
            <li>Save the transaction ID for reference</li>
          </ol>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>For payment issues, please contact us at alumni.support@example.com</p>
      </div>
    </div>
  )
}
