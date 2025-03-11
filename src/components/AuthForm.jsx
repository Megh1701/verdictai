import { useState, useEffect } from "react";
import { motion } from "motion/react";

import { Eye, EyeClosed, X } from "lucide-react";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("authPage") === "signup" ? false : true;
  });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    localStorage.setItem("authPage", isLogin ? "login" : "signup");
  }, [isLogin]);

  const handleSendOtp = () => {
    if (email) {
      setOtpSent(true);
      alert("OTP has been sent to your email!"); 
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      alert("OTP verified! Now reset your password."); 
      setForgotPassword(false);
      setOtpSent(false);
      setOtp("");
    }
  };

  return (
    <div className="relative h-screen w-screen flex justify-center items-center overflow-hidden bg-black">

      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 h-auto w-96 p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg flex flex-col gap-6 border border-blue-500/50">
        <h2 className="text-white text-3xl font-bold text-center tracking-wide mb-6">
          {forgotPassword ? (otpSent ? "Enter OTP" : "Reset Password") : isLogin ? "Welcome Back!" : "Create an Account"}
        </h2>

        <form className="space-y-4 flex flex-col gap-3">
          {(!otpSent || !forgotPassword) && (
            <div className="flex items-center border-b border-white/30 py-2 transition-all focus-within:border-blue-400">
              <input 
                type="email" 
                className="w-full p-2 text-white bg-transparent focus:outline-none" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <img src={<Eye />} alt="Email Icon" className="w-6 h-6 text-white" />
            </div>
          )}

          {forgotPassword && otpSent && (
            <div className="flex items-center border-b border-white/30 py-2 transition-all focus-within:border-blue-400">
              <input 
                type="text" 
                className="w-full p-2 text-white bg-transparent focus:outline-none" 
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
            </div>
          )}

          {!forgotPassword && (
            <div className="flex items-center border-b border-white/30 py-2 transition-all focus-within:border-blue-400">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 text-white bg-transparent focus:outline-none"
                placeholder="Password"
              />
              <img
                src={showPassword ? <Eye/> : <EyeClosed />}
                alt="Toggle Password"
                className="w-6 h-6 text-white cursor-pointer transition-all hover:scale-110"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          )}

          <button
            type="button"
            className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold shadow-md transition-all hover:bg-blue-700"
            onClick={forgotPassword ? (otpSent ? handleVerifyOtp : handleSendOtp) : undefined}
          >
            {forgotPassword ? (otpSent ? "Verify OTP" : "Send OTP") : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLogin && !forgotPassword && (
          <button
            onClick={() => setForgotPassword(true)}
            className="text-blue-400 text-sm text-center hover:underline transition-all duration-300"
          >
            Forgot Password?
          </button>
        )}

        <p className="text-gray-400 text-sm text-center">
          {forgotPassword ? (
            <button
              onClick={() => { setForgotPassword(false); setOtpSent(false); }}
              className="text-blue-400 hover:underline transition-all duration-300"
            >
              Back to Login
            </button>
          ) : (
            <>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:underline transition-all duration-300"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;