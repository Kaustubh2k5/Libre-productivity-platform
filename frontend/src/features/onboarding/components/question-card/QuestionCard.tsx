import { ReactNode } from 'react';

interface QuestionCardProps {
  question: string;
  helperText?: string;
  children: ReactNode;
}

export default function QuestionCard({ question, helperText, children }: QuestionCardProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-white">{question}</h3>

        {helperText && <p className="text-sm text-zinc-400">{helperText}</p>}
      </div>

      {children}
    </div>
  );
}
