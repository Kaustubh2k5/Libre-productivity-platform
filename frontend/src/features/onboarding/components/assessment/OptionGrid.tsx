interface OptionGridProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function OptionGrid({ options, selected, onSelect }: OptionGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {options.map((option) => {
        const active = selected === option;

        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`rounded-2xl border p-5 text-left transition ${
              active
                ? 'border-white bg-white text-black'
                : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.05]'
            }`}
          >
            <p className="text-sm font-medium">{option}</p>
          </button>
        );
      })}
    </div>
  );
}
