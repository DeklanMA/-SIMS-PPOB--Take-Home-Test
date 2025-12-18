import {XCircle, CheckCircle} from 'lucide-react';
import {useNavigate} from 'react-router';

interface TopUpResultModalProps {
  open: boolean;
  amount: number;
  success: boolean;
  onClose: () => void;
}

export default function TopUpResultModal({
  open,
  amount,
  success,
  onClose,
}: TopUpResultModalProps) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[20rem] rounded-lg bg-white p-6 shadow-lg text-black">
        <div className="flex flex-col items-center gap-2 text-center">
          {success ? (
            <CheckCircle size={48} className="text-green-500" />
          ) : (
            <XCircle size={48} className="text-red-500" />
          )}

          <p className="text-sm text-gray-600">Top Up sebesar</p>

          <p className="text-xl font-semibold">
            Rp {amount.toLocaleString('id-ID')}
          </p>

          <p className="text-sm text-gray-500  rounded-full">
            {success ? 'berhasil' : 'gagal'}
          </p>

          <button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="mt-3 cursor-pointer text-sm font-medium text-red-600 hover:underline"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
