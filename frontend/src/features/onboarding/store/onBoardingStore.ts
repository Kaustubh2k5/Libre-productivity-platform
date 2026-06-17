import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { assessmentQuestions } from '../constants/assessmentQuestions';

export interface ProfileData {
  fullName: string;
  dateOfBirth: string;
  occupation: string;
}

export type AssessmentAnswers = Record<string, number>;

export interface ConstraintData {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  days: string[];
}

export interface OnboardingSubmissionPayload {
  fullName: string;
  dateOfBirth: string;
  occupation: string;
  focusDuration: string;
  distractionLevel: string;
  energyConsistency: string;
  taskInitiation: string;
  recoveryPattern: string;
  submittedAt: string;
}

export interface ConstraintsSubmissionPayload {
  hasConstraints: boolean;
  constraints: Omit<ConstraintData, 'id'>[];
  submittedAt: string;
}

interface OnboardingState {
  profile: ProfileData;
  assessment: AssessmentAnswers;
  constraints: ConstraintData[];

  setProfile: (data: Partial<ProfileData>) => void;
  setAssessment: (data: AssessmentAnswers) => void;
  setConstraints: (data: ConstraintData[]) => void;

  reset: () => void;
}

const initialProfile: ProfileData = {
  fullName: '',
  dateOfBirth: '',
  occupation: '',
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      assessment: {},
      constraints: [],

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

      setConstraints: (data) =>
        set({
          constraints: data,
        }),

      reset: () =>
        set({
          profile: initialProfile,
          assessment: {},
          constraints: [],
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
  const getSelectedAnswer = (questionId: string) => {
    const question = assessmentQuestions.find((item) => item.id === questionId);
    const selectedIndex = assessment[questionId];

    if (!question || selectedIndex === undefined) {
      return '';
    }

    return question.options[selectedIndex] ?? '';
  };

  return {
    fullName: profile.fullName,
    dateOfBirth: profile.dateOfBirth,
    occupation: profile.occupation,
    focusDuration: getSelectedAnswer('focusDuration'),
    distractionLevel: getSelectedAnswer('distractionLevel'),
    energyConsistency: getSelectedAnswer('energyConsistency'),
    taskInitiation: getSelectedAnswer('taskInitiation'),
    recoveryPattern: getSelectedAnswer('recoveryPattern'),
    submittedAt: new Date().toISOString(),
  };
}

export function buildConstraintsSubmissionPayload(
  constraints: ConstraintData[],
): ConstraintsSubmissionPayload {
  return {
    hasConstraints: constraints.length > 0,
    constraints: constraints.map(({ name, startTime, endTime, days }) => ({
      name,
      startTime,
      endTime,
      days: days ?? [],
    })),
    submittedAt: new Date().toISOString(),
  };
}
