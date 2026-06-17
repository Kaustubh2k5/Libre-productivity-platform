import { assessmentQuestions } from '../constants/assessmentQuestions';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../store/onBoardingStore';
import { useState } from 'react';

export default function FocusAssessment() {
  const navigate = useNavigate();

  const savedAssessment = useOnboardingStore((state) => state.assessment);
  const setAssessment = useOnboardingStore((state) => state.setAssessment);
  const [answers, setAnswers] = useState<Record<string, number>>(savedAssessment);

  const isComplete = assessmentQuestions.every((question) => answers[question.id] !== undefined);

  function handleSelect(questionId: string, index: number) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: index,
    }));
  }

  function handleContinue() {
    if (!isComplete) {
      return;
    }

    setAssessment(answers);
    navigate('/onboarding/constraints');
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <h1 className="text-5xl font-semibold mb-4">Understanding your focus behavior</h1>

          <p className="text-zinc-400 text-lg">
            Libre uses this to build adaptive execution systems.
          </p>
        </div>

        <div className="space-y-8">
          {assessmentQuestions.map((question) => (
            <div
              key={question.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
            >
              <h2 className="text-2xl font-medium mb-6">{question.title}</h2>

              <div className="grid gap-4">
                {question.options.map((option, index) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(question.id, index)}
                    className={`text-left px-5 py-4 rounded-2xl border transition-all ${
                      answers[question.id] === index
                        ? 'border-white bg-white text-black'
                        : 'border-white/10 bg-black/20 hover:bg-white/5'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!isComplete}
          className="mt-10 w-full py-5 rounded-2xl bg-white text-black font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
