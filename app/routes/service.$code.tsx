import {useParams} from 'react-router';
import {
  useGetBalanceQuery,
  useGetProfileQuery,
  useGetServicesQuery,
  useTransactionMutation,
} from '@app/features/api/apiSlice';
import {DashboardHeader} from '~/components/header/DashboardHeader';
import {Banknote} from 'lucide-react';
import ConfirmModal from '~/components/modal/ConfirmModal';
import ResultPaymentModal from '~/components/modal/ResultPaymentModal';
import {useState} from 'react';

export default function ServiceDetailPage() {
  const {code} = useParams();

  const {data: profile} = useGetProfileQuery();
  const {data: balance} = useGetBalanceQuery();
  const {data} = useGetServicesQuery();

  const [transaction] = useTransactionMutation();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const service = data?.data.find((item) => item.service_code === code);

  if (!service) return <p>Layanan tidak ditemukan</p>;

  const handleConfirmPayment = async () => {
    setOpenConfirm(false);

    try {
      await transaction({
        service_code: service.service_code,
      }).unwrap();

      setIsSuccess(true);
      setOpenResult(true);
    } catch (error) {
      setIsSuccess(false);
      setOpenResult(true);
    }
  };

  return (
    <div className="bg-white h-screen p-6 rounded-lg shadow space-y-4 text-black">
      <DashboardHeader
        name={`${profile?.data.first_name} ${profile?.data.last_name}`}
        avatarUrl={profile?.data.profile_image}
        balance={balance?.data.balance ?? 0}
      />

      <div className="space-y-6 px-32 mt-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-gray-600 font-medium text-lg">Pembayaran</h1>

          <div className="flex flex-row items-center gap-3">
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-12 h-12"
            />
            <h1 className="text-md font-semibold">{service.service_name}</h1>
          </div>
        </div>

        <p className="text-gray-600 flex items-center gap-2 border p-2 rounded border-gray-300">
          <Banknote size={20} />
          <span className="font-medium">
            Rp {service.service_tariff.toLocaleString('id-ID')}
          </span>
        </p>

        <button
          onClick={() => setOpenConfirm(true)}
          className="w-full cursor-pointer bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Bayar
        </button>
      </div>


      <ConfirmModal
        open={openConfirm}
        tarif={service.service_tariff.toLocaleString('id-ID')}
        description={`Beli ${service.service_name} senilai`}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={handleConfirmPayment}
      />

      <ResultPaymentModal
        open={openResult}
        success={isSuccess}
        serviceName={service.service_name}
        amount={service.service_tariff}
        onClose={() => setOpenResult(false)}
      />
    </div>
  );
}
