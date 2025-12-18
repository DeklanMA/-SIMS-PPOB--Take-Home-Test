
interface TopUpPresetProps {
  onSelect: (amount: number) => void;
}

const PRESETS = [10000, 20000, 50000, 100000, 250000, 500000];

export default function TopUpPreset({onSelect}: TopUpPresetProps) {
  return (
    <div className="w-md">
      <div className="grid grid-cols-3 gap-4">
        {PRESETS.map((value) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className="border cursor-pointer border-gray-300 rounded py-2 hover:border-red-600"
          >
            Rp{value.toLocaleString('id-ID')}
          </button>
        ))}
      </div>
    </div>
  );
}
