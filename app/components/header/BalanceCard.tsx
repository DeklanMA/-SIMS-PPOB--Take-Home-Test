import {Eye, EyeOff} from 'lucide-react';
import {useState} from 'react';

type BalanceCardProps = {
  balance: number;
};

export function BalanceCard({balance}: BalanceCardProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="bg-red-600 text-white rounded-xl p-5 w-full max-w-md">
      <p className="text-sm">Saldo anda</p>

      <h2 className="text-2xl font-bold mt-1">
        Rp {hidden ? '••••••' : balance.toLocaleString('id-ID')}
      </h2>

      <button
        onClick={() => setHidden(!hidden)}
        className="flex cursor-pointer items-center gap-1 mt-2 text-sm opacity-90"
      >
        {hidden ? 'Lihat Saldo' : 'Tutup Saldo'}
        {hidden ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}
