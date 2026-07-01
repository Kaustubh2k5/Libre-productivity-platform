import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { User, Mail, Lock, CheckCircle2, Circle, Eye } from 'lucide-react';
import { handleSignup } from '../../../lib/utils';
import axios from 'axios';
import { ErrorToast } from '../components/Toast/ToastSystem';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // function to handle signup request
  const handleSignupForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = handleSignup({
      username,
      email,
      password,
      confirmPassword: password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      const firstError = Object.values(validationErrors)[0];

      setToastMessage(firstError ?? 'Validation failed');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return;
    }

    console.log('Form Submitted');

    // send api POST request using axios
    try {
      const response = await api.post('/auth/signup/start', {
        email,
        password,
        clientId: import.meta.env.VITE_LIBRE_AUTH_CLIENT_ID,
      });

      console.log(response.data);

      navigate('/auth/verify', { state: { email, password } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);

        setToastMessage(error.response?.data?.message ?? error.message ?? 'Unknown error');

        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    }
  };

  return (
    <AuthLayout title="Create Identity" subtitle="Join the network">
      <ErrorToast message={toastMessage} visible={showToast} />
      <div className="space-y-8">
        {/* Social Logins */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 flex items-center justify-center gap-3 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>
        </div>

        <div className="relative flex items-center gap-4">
          <div className="flex-1 h-px bg-white/5"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap">
            or sign up with email
          </span>
          <div className="flex-1 h-px bg-white/5"></div>
        </div>

        <form className="space-y-4" onSubmit={handleSignupForm}>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all placeholder:text-white/20"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all placeholder:text-white/20"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Set Credential"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/20 transition-all placeholder:text-white/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${showPassword ? 'text-red-600' : 'text-white/20'} hover:text-white`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Password indicators */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-1">
            <div className="flex items-center gap-1.5 text-[10px] text-white/20 font-medium">
              <Circle className="w-2.5 h-2.5 fill-white/10" />
              8+ characters
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/20 font-medium">
              <Circle className="w-2.5 h-2.5 fill-white/10" />1 uppercase letter
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/20 font-medium">
              <Circle className="w-2.5 h-2.5 fill-white/10" />1 special character
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-red-600 font-bold tracking-tight">
              <CheckCircle2 className="w-2.5 h-2.5" />
              Passes Entropy Check
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full py-4 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 active:scale-[0.98]">
              Signup
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-white/40">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-red-600 hover:text-red-500 transition-colors font-bold"
            >
              Return to login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
