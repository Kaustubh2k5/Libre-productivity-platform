interface OnboardingHeaderProps {
  title: string;
  subtitle: string;
}

export default function OnboardingHeader({ title, subtitle }: OnboardingHeaderProps) {
  return (
    <div className="space-y-3 border-b border-white/10 px-8 py-7">
      <p className="text-sm font-medium tracking-wide text-zinc-400">LIBRE SYSTEM SETUP</p>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>

        <p className="max-w-xl text-sm leading-relaxed text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
}
