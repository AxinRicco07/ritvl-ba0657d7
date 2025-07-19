"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const UserAuthPage = () => {
  const [phone, setPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(120)
  const [resendEnabled, setResendEnabled] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    let countdown
    if (otpSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setResendEnabled(true)
    }
    return () => clearInterval(countdown)
  }, [otpSent, timer])

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault()

    if (/^[6-9]\d{9}$/.test(phone)) {
      setOtpSent(true)
      setTimer(120)
      setResendEnabled(false)
      alert(`OTP sent to +91${phone}`)
    } else {
      alert("Please enter a valid 10-digit Indian phone number.")
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp === "123456") {
      localStorage.setItem("userPhone", "+91" + phone)
      navigate("/home")
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  const handleResendOtp = () => {
    setTimer(120)
    setResendEnabled(false)
    alert(`OTP resent to +91${phone}`)
  }

  const handleEditPhone = () => {
    setOtpSent(false)
    setOtp("")
    setTimer(120)
    setResendEnabled(false)
  }

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min}:${sec < 10 ? "0" + sec : sec}`
  }

  return (
    <div className="flex h-screen">
      {/* Left panel with logo */}
      <div className="w-1/2 bg-black flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="w-40 h-40 rounded-full" />
      </div>

      {/* Right panel with form */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          {!otpSent ? (
            <>
              <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Login with Phone
              </h2>
              <form onSubmit={handleGetOtp} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">+91</span>
                    <Input
                      className="pl-12"
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/, ""))
                      }
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Get OTP
                </Button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
                Enter OTP Verification Code
              </h2>
              <h4 className="text-center text-gray-600 mb-4">
                Sent to +91{phone}
              </h4>
              <div className="flex justify-center mb-4">
                <button
                  type="button"
                  onClick={handleEditPhone}
                  className="text-sm text-blue-600 underline"
                >
                  Edit
                </button>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4 flex flex-col justify-center items-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                <div className="text-sm text-center text-gray-500">
                  {resendEnabled ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-blue-600 underline"
                    >
                      Resend OTP
                    </button>
                  ) : (
                    <>Resend OTP in {formatTime(timer)}</>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserAuthPage
