import {CheckCircle, XCircle} from 'lucide-react';
import {useNavigate} from 'react-router';

interface ResultPaymentModalProps {
  open: boolean;
  success: boolean;
  serviceName: string;
  amount: number;
  onClose: () => void;
}

export default function ResultPaymentModal({
  open,
  success,
  serviceName,
  amount,
  onClose,
}: ResultPaymentModalProps) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative bg-white w-full max-w-xs rounded-lg p-6 shadow-lg text-center">
        <div className="flex justify-center mb-4">
          {success ? (
            <CheckCircle size={48} className="text-green-500" />
          ) : (
            <XCircle size={48} className="text-red-500" />
          )}
        </div>

        <p className="text-sm text-gray-600">
          Pembayaran {serviceName} sebesar
        </p>
        <p className="font-bold text-lg">
          Rp {amount.toLocaleString('id-ID')}
        </p>

        <p
          className="text-sm mb-3 text-gray-600 "
        >
          {success ? 'berhasil!' : 'gagal'}
        </p>

        <button
          onClick={() => {
            onClose();
            navigate('/');
          }}
          className="text-red-600 cursor-pointer hover:text-red-700 text-sm font-medium"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
