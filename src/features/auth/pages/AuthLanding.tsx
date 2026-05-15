import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { ArrowRight, Plus } from 'lucide-react';
export default function AuthLanding() {
  return (
    <AuthLayout title="Welcome!" subtitle="Let's get you back into the flow.">
      <div className="flex flex-col gap-4">
        <Link
          to="/auth/login"
          className="group relative flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        >
          <div className="text-left">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-red-600 mb-1">
              Returning Member
            </span>
            <span className="text-2xl font-serif">Sign In</span>
            <p className="text-xs text-white/20 mt-1">Access your existing workspaces</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 group-hover:text-white transition-all duration-300">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

        <Link
          to="/auth/signup"
          className="group relative flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        >
          <div className="text-left">
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
              New Identity
            </span>
            <span className="text-2xl font-serif">Become a Member</span>
            <p className="text-xs text-white/20 mt-1">Join our platform</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-300">
            <Plus className="w-5 h-5" />
          </div>
        </Link>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5">
        <p className="text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] leading-relaxed"></p>
      </div>
    </AuthLayout>
  );
}
