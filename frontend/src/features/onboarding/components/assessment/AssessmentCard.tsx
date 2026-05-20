import { ReactNode } from 'react';

interface AssessmentCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function AssessmentCard({ title, description, children }: AssessmentCardProps) {
  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">{title}</h2>

        {description && <p className="text-sm leading-relaxed text-zinc-400">{description}</p>}
      </div>

      {children}
    </div>
  );
}
