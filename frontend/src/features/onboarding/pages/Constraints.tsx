import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ConstraintData } from '../store/onBoardingStore';
import { useOnboardingStore } from '../store/onBoardingStore';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const shortWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function createConstraint(): ConstraintData {
  return {
    id: crypto.randomUUID(),
    name: '',
    startTime: '',
    endTime: '',
    days: [],
  };
}

export default function Constraints() {
  const navigate = useNavigate();
  const savedConstraints = useOnboardingStore((state) => state.constraints);
  const setConstraints = useOnboardingStore((state) => state.setConstraints);
  const [constraints, updateConstraints] = useState<ConstraintData[]>(
    savedConstraints.length > 0
      ? savedConstraints.map((constraint) => ({
          ...constraint,
          days: constraint.days ?? [],
        }))
      : [createConstraint()],
  );

  const completedConstraints = constraints.filter(
    (constraint) =>
      constraint.name.trim() &&
      constraint.startTime &&
      constraint.endTime &&
      constraint.days.length > 0,
  );
  const hasPartialConstraint = constraints.some((constraint) => {
    const hasAnyValue =
      constraint.name.trim() ||
      constraint.startTime ||
      constraint.endTime ||
      constraint.days.length > 0;
    const isComplete =
      constraint.name.trim() &&
      constraint.startTime &&
      constraint.endTime &&
      constraint.days.length > 0;

    return hasAnyValue && !isComplete;
  });

  function updateConstraint(id: string, data: Partial<ConstraintData>) {
    updateConstraints((currentConstraints) =>
      currentConstraints.map((constraint) =>
        constraint.id === id
          ? {
              ...constraint,
              ...data,
            }
          : constraint,
      ),
    );
  }

  function addConstraint() {
    updateConstraints((currentConstraints) => [...currentConstraints, createConstraint()]);
  }

  function removeConstraint(id: string) {
    updateConstraints((currentConstraints) =>
      currentConstraints.length === 1
        ? currentConstraints
        : currentConstraints.filter((constraint) => constraint.id !== id),
    );
  }

  function toggleDay(constraint: ConstraintData, day: string) {
    const days = constraint.days.includes(day)
      ? constraint.days.filter((selectedDay) => selectedDay !== day)
      : [...constraint.days, day];

    updateConstraint(constraint.id, { days });
  }

  function toggleEveryday(constraint: ConstraintData) {
    updateConstraint(constraint.id, {
      days: constraint.days.length === weekDays.length ? [] : weekDays,
    });
  }

  function handleContinue() {
    if (hasPartialConstraint) {
      return;
    }

    setConstraints(completedConstraints);
    navigate('/onboarding/generate-system');
  }

  return (
    <div className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14">
          <h1 className="mb-4 text-5xl font-semibold">Add your constraints</h1>

          <p className="text-lg text-zinc-400">
            Tell Libre when certain tasks are not possible, so your system can plan around them.
          </p>
        </div>

        <div className="space-y-5">
          <div className="hidden grid-cols-[1fr_150px_150px_auto] gap-4 px-6 text-sm font-medium text-zinc-400 md:grid">
            <span>Constraint name</span>
            <span>Start time</span>
            <span>End time</span>
            <span />
          </div>

          {constraints.map((constraint, index) => (
            <div
              key={constraint.id}
              className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[1fr_150px_150px_auto]"
            >
              <label className="space-y-2">
                <span className="block text-sm font-medium text-zinc-400 md:hidden">
                  Constraint name
                </span>
                <input
                  value={constraint.name}
                  onChange={(event) =>
                    updateConstraint(constraint.id, { name: event.target.value })
                  }
                  placeholder={`Constraint ${index + 1}`}
                  className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none"
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-zinc-400 md:hidden">
                  Start time
                </span>
                <input
                  value={constraint.startTime}
                  onChange={(event) =>
                    updateConstraint(constraint.id, { startTime: event.target.value })
                  }
                  type="time"
                  className="w-full cursor-pointer rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none [color-scheme:dark]"
                />
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-zinc-400 md:hidden">
                  End time
                </span>
                <input
                  value={constraint.endTime}
                  onChange={(event) =>
                    updateConstraint(constraint.id, { endTime: event.target.value })
                  }
                  type="time"
                  className="w-full cursor-pointer rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none [color-scheme:dark]"
                />
              </label>

              <button
                type="button"
                onClick={() => removeConstraint(constraint.id)}
                disabled={constraints.length === 1}
                aria-label="Remove constraint"
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-zinc-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-5 w-5" />
              </button>

              <div className="space-y-4 md:col-span-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-zinc-400">Days</p>

                  <button
                    type="button"
                    onClick={() => toggleEveryday(constraint)}
                    className="flex items-center gap-3 text-sm font-medium text-zinc-300"
                  >
                    Everyday
                    <span
                      className={`flex h-7 w-12 items-center rounded-full border p-1 transition ${
                        constraint.days.length === weekDays.length
                          ? 'border-white bg-white'
                          : 'border-white/10 bg-black/30'
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-full transition ${
                          constraint.days.length === weekDays.length
                            ? 'translate-x-5 bg-black'
                            : 'translate-x-0 bg-zinc-500'
                        }`}
                      />
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {weekDays.map((day, dayIndex) => {
                    const active = constraint.days.includes(day);

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(constraint, day)}
                        className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                          active
                            ? 'border-white bg-white text-black'
                            : 'border-white/10 bg-black/30 text-zinc-300 hover:bg-white/5'
                        }`}
                      >
                        {shortWeekDays[dayIndex]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addConstraint}
          className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06]"
        >
          <Plus className="h-5 w-5" />
          Add constraint
        </button>

        <button
          onClick={handleContinue}
          disabled={hasPartialConstraint}
          className="mt-10 w-full rounded-2xl bg-white py-5 font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {completedConstraints.length > 0 ? 'Finalize My System' : 'Continue Without Constraints'}
        </button>
      </div>
    </div>
  );
}
