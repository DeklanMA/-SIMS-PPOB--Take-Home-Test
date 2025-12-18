interface Props {
  open: boolean;
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function TopUpConfirmModal({
  open,
  amount,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="flex flex-col items-center bg-white rounded-lg p-6 z-10 py-10 w-[320px] text-center">
        <img src="/Logo.png" alt="logo" className="w-10 mx-auto mb-4" />

        <p className="text-sm">Anda yakin untuk Top Up sebesar</p>
        <h2 className="text-xl font-bold my-2">
          Rp{amount.toLocaleString('id-ID')}
        </h2>

        <div className="flex flex-col gap-2 mt-4">
          <button onClick={onConfirm} className="text-red-600 cursor-pointer font-medium">
            Ya, lanjutkan Top Up
          </button>
            <button onClick={onCancel} className="text-gray-400 cursor-pointer font-medium">
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
}
