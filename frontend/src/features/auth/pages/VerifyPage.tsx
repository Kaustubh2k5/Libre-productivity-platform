import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { ArrowLeft, RefreshCw, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useAuthTokens } from '../../../lib/auth.util.js';
import axios from 'axios';

// Define the Axios verification instance
const api = axios.create({
  baseURL: 'http://localhost:8081/auth/signup/verify',
});

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeAccessToken, storeRefreshToken } = useAuthTokens();

  // Retrieve passed email and password from signup state
  const email = location.state?.email || '';
  const password = location.state?.password || '';

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(59);
  const [notification, setNotification] = useState<string | null>(null);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Timer countdown
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((v) => v - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle key change (only numbers allowed)
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    setErrorMsg(null);

    const newOtp = [...otp];
    // Keep only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next input automatically if defined
    if (newOtp[index] !== '' && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Backspace deletion behavior
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      setErrorMsg(null);
      if (otp[index] === '' && index > 0 && inputRefs.current[index - 1]) {
        // Move focus backward first
        inputRefs.current[index - 1].focus();
        
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        // Clear current index
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Paste mechanism
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Remove space, find first 6 digits
    const cleanedDigits = pastedData.replace(/\s/g, '').substring(0, 6);
    if (!/^\d+$/.test(cleanedDigits)) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      if (cleanedDigits[i]) {
        newOtp[i] = cleanedDigits[i];
      }
    }
    setOtp(newOtp);

    // Focus last or appropriate index
    const lastFilledIndex = Math.min(cleanedDigits.length - 1, 5);
    if (inputRefs.current[lastFilledIndex]) {
      inputRefs.current[lastFilledIndex].focus();
    }
  };

  // Submit OTP and make verification API request
  const handleVerification = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredCode = otp.join('');

    if (enteredCode.length < 6) {
      setErrorMsg('Please enter the full 6-digit code.');
      return;
    }

    try {
      console.log(`📤 POST to verify endpoint with email: "${email}", otp: "${enteredCode}", clientId: "libre-web"`);
      const response = await api.post('', {
        email,
        otp: enteredCode,
        clientId: 'libre-web',
      });

      console.log('Verification Success Response:', response.data);
      const serverAccessToken = response.data.data?.accessToken;
      const serverRefreshToken = response.data.data?.refreshToken;

      if (!serverAccessToken) {
        throw new Error('Verification completed, but access token is missing.');
      }

      setSuccess(true);
      setErrorMsg(null);
      setNotification('Verification successful! Logging in...');

      setTimeout(() => {
        storeAccessToken(serverAccessToken);
        storeRefreshToken(serverRefreshToken || '');
        navigate('/onboarding');
      }, 1500);

    } catch (error) {
      console.error('Verification request failed:', error);
      
      if (axios.isAxiosError(error)) {
        setErrorMsg(
          error.response?.data?.message ??
          error.message ??
          'Could not connect to the verification server. Please try again.'
        );
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Invalid verification code. Please check and try again.');
      }

      // Reset and refocus first digit
      setOtp(new Array(6).fill(''));
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };

  // Trigger auto-submit when all 6 fields are completed
  useEffect(() => {
    if (otp.join('').length === 6) {
      handleVerification();
    }
  }, [otp]);

  // Resend OTP handler
  const handleResend = async () => {
    if (timer > 0) return;
    setTimer(59);
    setErrorMsg(null);
    try {
      console.log(`📤 Sending resend request to: http://localhost:8081/auth/signup/start with email: "${email}"`);
      await axios.post('http://localhost:8081/auth/signup/start', {
        email,
        password,
        clientId: 'libre-web',
      });
      setNotification('A new verification code has been sent.');
      setTimeout(() => setNotification(null), 4000);
    } catch (error) {
      console.error('Failed to resend code:', error);
      if (axios.isAxiosError(error)) {
        setErrorMsg(
          error.response?.data?.message ??
          error.message ??
          'Failed to resend verification code.'
        );
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Failed to resend verification code.');
      }
    }
  };

  return (
    <AuthLayout 
      title="Verify OTP" 
      subtitle={email ? `We sent a code to ${email}` : 'Please enter your verification code'}
    >
      <div className="space-y-8">
        {/* Alerts & Notifications */}
        <AnimatePresence mode="wait">
          {notification && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2.5 font-mono"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400 animate-pulse" />
              <span>{notification}</span>
            </motion.div>
          )}

          {errorMsg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2.5 font-mono"
            >
              <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={(e) => handleVerification(e)} className="space-y-6">
          <div className="space-y-3">
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase font-semibold">
              Enter 6-digit code
            </label>
            
            <div className="flex justify-between gap-2.5 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  pattern="\d*"
                  maxLength={1}
                  value={digit}
                  ref={(ref) => {
                    if (ref) inputRefs.current[idx] = ref;
                  }}
                  onChange={(e) => handleChange(e.target, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  disabled={success}
                  className={`w-12 h-14 bg-white/5 border text-center text-xl font-mono font-bold rounded-xl focus:outline-none transition-all ${
                    success 
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                      : errorMsg
                        ? 'border-red-600/50 text-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                        : 'border-white/10 text-white focus:border-red-650 focus:ring-1 focus:ring-red-650/20'
                  }`}
                  placeholder="-"
                />
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="submit"
              disabled={success}
              className={`w-full py-4 text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] cursor-pointer ${
                success 
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-950/20'
                  : 'bg-red-600 hover:bg-red-700 shadow-red-900/20'
              }`}
            >
              {success ? 'Verified' : 'Verify Code'}
            </button>
          </div>
        </form>

        {/* Resend and Countdown Actions */}
        <div className="flex items-center justify-between gap-4 pt-1 px-1 text-xs">
          <button
            type="button"
            disabled={timer > 0 || success}
            onClick={handleResend}
            className={`flex items-center gap-2 font-bold font-mono transition-colors tracking-wide ${
              timer > 0 || success
                ? 'text-white/20 cursor-not-allowed'
                : 'text-red-600 hover:text-red-500 cursor-pointer'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${timer > 0 ? '' : 'animate-spin-slow'}`} />
            {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
          </button>
        </div>

        {/* Return link */}
        <div className="text-center pt-2 border-t border-white/[0.03]">
          <Link 
            to="/auth/signup" 
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors uppercase font-mono tracking-wider font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign Up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
