interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
}

export default function ProgressHeader({
  currentStep,
  totalSteps,
  label = 'System Initialization',
}: ProgressHeaderProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4 px-8 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <h2 className="text-lg font-semibold text-white">Preparing your adaptive system</h2>
        </div>

        <p className="text-sm text-zinc-400">
          {currentStep}/{totalSteps}
        </p>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          style={{ width: `${progress}%` }}
          className="h-full rounded-full bg-white transition-all duration-500"
        />
      </div>
    </div>
  );
}
