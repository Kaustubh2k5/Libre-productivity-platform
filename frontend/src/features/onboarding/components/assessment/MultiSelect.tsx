interface MultiSelectProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export default function MultiSelect({ options, selected, onToggle }: MultiSelectProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = selected.includes(option);

        return (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              active
                ? 'border-white bg-white text-black'
                : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
