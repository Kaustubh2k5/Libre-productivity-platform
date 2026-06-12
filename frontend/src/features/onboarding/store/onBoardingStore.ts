import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { assessmentQuestions } from '../constants/assessmentQuestions';

export interface ProfileData {
  fullName: string;
  age: string;
  occupation: string;
}

export type AssessmentAnswers = Record<string, number>;

interface ReadableAssessmentAnswer {
  id: string;
  question: string;
  selectedIndex: number | null;
  selectedAnswer: string;
}

export interface OnboardingSubmissionPayload {
  profile: ProfileData;
  assessment: ReadableAssessmentAnswer[];
  submittedAt: string;
}

interface OnboardingState {
  profile: ProfileData;
  assessment: AssessmentAnswers;

  setProfile: (data: Partial<ProfileData>) => void;
  setAssessment: (data: AssessmentAnswers) => void;

  reset: () => void;
}

const initialProfile: ProfileData = {
  fullName: '',
  age: '',
  occupation: '',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      assessment: {},

      setProfile: (data) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...data,
          },
        })),

      setAssessment: (data) =>
        set((state) => ({
          assessment: {
            ...state.assessment,
            ...data,
          },
        })),

      reset: () =>
        set({
          profile: initialProfile,
          assessment: {},
        }),
    }),
    {
      name: 'libre-onboarding-draft',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export function buildOnboardingSubmissionPayload(
  profile: ProfileData,
  assessment: AssessmentAnswers,
): OnboardingSubmissionPayload {
  return {
    profile,
    assessment: assessmentQuestions.map((question) => {
      const selectedIndex = assessment[question.id];
      const selectedAnswer =
        selectedIndex === undefined ? '' : (question.options[selectedIndex] ?? '');

      return {
        id: question.id,
        question: question.title,
        selectedIndex: selectedIndex ?? null,
        selectedAnswer,
      };
    }),
    submittedAt: new Date().toISOString(),
  };
}
