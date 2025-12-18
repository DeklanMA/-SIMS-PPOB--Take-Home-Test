import {formatRupiah, isNumberOnly, isValidTopUpAmount, unformatRupiah} from '@app/utils/validators';


interface TopUpFormProps {
  amount: string; // angka bersih: "10000"
  setAmount: (val: string) => void;
  error: string;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function TopUpForm({
  amount,
  setAmount,
  error,
  isLoading,
  onSubmit,
}: TopUpFormProps) {
  const parsedAmount = Number(amount);

  const isValid =
    amount !== '' && isNumberOnly(amount) && isValidTopUpAmount(parsedAmount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = unformatRupiah(e.target.value);

    if (!isNumberOnly(raw) && raw !== '') return;

    setAmount(raw);
  };

  return (
    <div className="space-y-4 flex-1">
      <input
        type="text"
        placeholder="10.000"
        value={formatRupiah(amount)}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={!isValid || isLoading}
        onClick={onSubmit}
        className={`r w-full  text-white py-2 rounded 
          ${!isValid ? 'opacity-50 cursor-not-allowed bg-gray-500' : 'hover:bg-red-700 bg-red-600 cursor-pointer'}`}
      >
        {isLoading ? 'Loading...' : 'Top Up'}
      </button>
    </div>
  );
}
