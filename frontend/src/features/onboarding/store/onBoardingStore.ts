import { create } from 'zustand';

interface ProfileData {
  fullName: string;
  age: string;
  occupation: string;
}

interface AssessmentAnswers {
  focusDuration: number;
  distractionLevel: number;
  energyConsistency: number;
  burnoutFrequency: number;
}

interface OnboardingState {
  profile: ProfileData;
  assessment: AssessmentAnswers;

  setProfile: (data: Partial<ProfileData>) => void;
  setAssessment: (data: Partial<AssessmentAnswers>) => void;

  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  profile: {
    fullName: '',
    age: '',
    occupation: '',
  },

  assessment: {
    focusDuration: 0,
    distractionLevel: 0,
    energyConsistency: 0,
    burnoutFrequency: 0,
  },

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
      profile: {
        fullName: '',
        age: '',
        occupation: '',
      },
      assessment: {
        focusDuration: 0,
        distractionLevel: 0,
        energyConsistency: 0,
        burnoutFrequency: 0,
      },
    }),
}));
