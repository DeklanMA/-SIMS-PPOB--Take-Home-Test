interface TransactionItemProps {
  type: 'TOPUP' | 'PAYMENT';
  description: string;
  amount: number;
  date: string;
}

export default function TransactionItem({
  type,
  description,
  amount,
  date,
}: TransactionItemProps) {
  const isTopUp = type === 'TOPUP';

  return (
    <div className="border border-gray-300 rounded p-4 flex justify-between items-center">
      <div>
        <p
          className={`font-medium ${
            isTopUp ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isTopUp ? '+' : '-'} Rp{amount.toLocaleString('id-ID')}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
