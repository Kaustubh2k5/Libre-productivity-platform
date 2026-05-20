interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="space-y-3 px-8 pt-6">
      <div className="flex items-center justify-between text-sm text-zinc-400">
        <span>
          Step {currentStep} of {totalSteps}
        </span>

        <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-white transition-all duration-300"
          style={{
            width: `${(currentStep / totalSteps) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
