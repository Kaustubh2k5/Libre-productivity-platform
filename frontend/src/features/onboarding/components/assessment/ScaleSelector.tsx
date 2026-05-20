interface ScaleSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ScaleSelector({ value, onChange }: ScaleSelectorProps) {
  const scale = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-3">
      {scale.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`flex h-12 w-12 items-center justify-center rounded-xl border text-sm font-semibold transition ${
            value === item
              ? 'border-white bg-white text-black'
              : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
