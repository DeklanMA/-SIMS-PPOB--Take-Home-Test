import {X} from 'lucide-react';

interface ConfirmModalProps {
  open: boolean;
  tarif: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  open,
  tarif,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Ya, lanjukatkan Bayar',
  cancelText = 'Batalkan',
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 " onClick={onCancel} />

      <div className="relative z-10 w-full max-w-[20rem] rounded-lg bg-white p-6 shadow-lg text-black animate-fade-in">
        <div className="flex flex-col gap-4 justify-center items-center mb-3">
          <img src="/Logo.png" alt="Logo" className="w-11" />
          <div className="flex flex-col gap-1 text-center">
            <h2>{description}</h2>
            <h1 className="font-bold text-xl">Rp{tarif} ?</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <button
            onClick={onConfirm}
            className="px-4 py-2 w-fit font-medium text-red-500 hover:text-red-800 cursor-pointer"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2  text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
