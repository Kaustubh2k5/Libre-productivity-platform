interface OnboardingFooterProps {
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  disableNext?: boolean;
}

export default function OnboardingFooter({
  onNext,
  onBack,
  nextLabel = 'Continue',
  backLabel = 'Back',
  disableNext,
}: OnboardingFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-white/10 px-8 py-6">
      <button
        onClick={onBack}
        className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
      >
        {backLabel}
      </button>

      <button
        disabled={disableNext}
        onClick={onNext}
        className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {nextLabel}
      </button>
    </div>
  );
}
