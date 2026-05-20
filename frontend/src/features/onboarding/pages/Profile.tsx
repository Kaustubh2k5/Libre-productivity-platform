import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../schemas/onboarding.schema';
import type { ProfileSchemaType } from '../schemas/onboarding.schema';
import { useOnboardingStore } from '../store/onboardingStore';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const setProfile = useOnboardingStore((state) => state.setProfile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
  });

  function onSubmit(data: ProfileSchemaType) {
    setProfile(data);
    navigate('/onboarding/focus-assessment');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold mb-3">Tell us about yourself</h1>

          <p className="text-zinc-400 leading-relaxed">
            This helps Libre adapt your system architecture.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...register('fullName')}
              placeholder="Full name"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />
            <p className="text-red-400 text-sm mt-2">{errors.fullName?.message}</p>
          </div>

          <div>
            <input
              {...register('age')}
              placeholder="Age"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />
            <p className="text-red-400 text-sm mt-2">{errors.age?.message}</p>
          </div>

          <div>
            <input
              {...register('occupation')}
              placeholder="Occupation"
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />
            <p className="text-red-400 text-sm mt-2">{errors.occupation?.message}</p>
          </div>

          <button className="w-full py-4 rounded-2xl bg-white text-black font-medium mt-4">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
