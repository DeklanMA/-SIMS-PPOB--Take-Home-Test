'use client';

import {useState} from 'react';
import {
  useGetProfileQuery,
  useGetBalanceQuery,
  useTopUpMutation,
} from '@app/features/api/apiSlice';
import {DashboardHeader} from '~/components/header/DashboardHeader';

import TopUpForm from '~/components/topup/TopUpForm';
import TopUpPreset from '~/components/topup/TopUpPreset';
import TopUpConfirmModal from '~/components/topup/TopUpConfirmModal';
import TopUpResultModal from '~/components/topup/TopUpResultModal';

import {isNumberOnly, isValidTopUpAmount} from '@app/utils/validators';

export default function TopUpPage() {
  const {data: profile} = useGetProfileQuery();
  const {data: balance} = useGetBalanceQuery();
  const [topUp, {isLoading}] = useTopUpMutation();

  const [amount, setAmount] = useState('');
  const [resultAmount, setResultAmount] = useState(0); 
  const [error, setError] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const parsedAmount = Number(amount);

  const handleSubmit = () => {
    setError('');

    if (!isNumberOnly(amount)) {
      setError('Nominal hanya boleh angka');
      return;
    }

    if (!isValidTopUpAmount(parsedAmount)) {
      setError('Nominal harus antara Rp10.000 - Rp1.000.000');
      return;
    }

    setOpenConfirm(true);
  };

  const handleConfirm = async () => {
    try {
      await topUp({top_up_amount: parsedAmount}).unwrap();

      setResultAmount(parsedAmount); 
      setOpenConfirm(false);
      setShowSuccess(true);
      setAmount('');
    } catch (err: any) {
      setResultAmount(parsedAmount);
      setOpenConfirm(false);
      setShowFailed(true);
    }
  };

  return (
    <div className="bg-white h-screen p-6 text-black">
      <DashboardHeader
        name={`${profile?.data.first_name} ${profile?.data.last_name}`}
        avatarUrl={profile?.data.profile_image}
        balance={balance?.data.balance ?? 0}
      />

      <div className="px-32 mt-10 space-y-6">
        <div>
          <p className="text-gray-600">Silahkan masukan</p>
          <h1 className="text-lg font-semibold">Nominal Top Up</h1>
        </div>

        <div className="flex flex-row gap-10 w-full">
          <TopUpForm
            amount={amount}
            setAmount={setAmount}
            error={error}
            isLoading={isLoading}
            onSubmit={handleSubmit}
          />

          <TopUpPreset onSelect={(val) => setAmount(String(val))} />
        </div>
      </div>

  
      <TopUpConfirmModal
        open={openConfirm}
        amount={parsedAmount}
        onConfirm={handleConfirm}
        onCancel={() => setOpenConfirm(false)}
      />

      <TopUpResultModal
        open={showSuccess}
        amount={resultAmount}
        success
        onClose={() => setShowSuccess(false)}
      />


      <TopUpResultModal
        open={showFailed}
        amount={resultAmount}
        success={false}
        onClose={() => setShowFailed(false)}
      />
    </div>
  );
}
