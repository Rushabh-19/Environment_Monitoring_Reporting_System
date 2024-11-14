import React, { useState } from "react";
import './Signup.css';
import { auth } from "./firebase-config.js"; // Import the initialized `auth` instance
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [language, setLanguage] = useState("en");
  const [showOtpField, setShowOtpField] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha verified");
          },
        },
        auth
      );
    }
  };

  const handleGetOtp = async (e) => {
    e.preventDefault();
    setupRecaptcha();

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
      setShowOtpField(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (confirmationResult) {
      try {
        await confirmationResult.confirm(otp);
        alert("Phone number verified successfully!");
      } catch (error) {
        alert("Invalid OTP! " + error.message);
      }
    } else {
      alert("Please request a new OTP.");
    }
  };

  return (
    <div className="signup-container">
      <header>
        <h1>Environmental Monitoring and Reporting System</h1>
      </header>

      <form onSubmit={showOtpField ? handleVerifyOtp : handleGetOtp}>
        <div id="recaptcha-container"></div>
        <div className="input-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-field">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="language-selection">
          <label>Select Language:</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        {showOtpField && (
          <div className="input-field">
            <label>OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">
          {showOtpField ? "Verify OTP" : "Get OTP"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
