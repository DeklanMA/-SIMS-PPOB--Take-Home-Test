'use client';

import {useState} from 'react';
import {
  useGetProfileQuery,
  useGetBalanceQuery,
  useGetTransactionHistoryQuery,
} from '@app/features/api/apiSlice';
import {DashboardHeader} from '~/components/header/DashboardHeader';
import TransactionList from '~/components/transaction/TransactionList';

export default function TransactionPage() {
  const {data: profile} = useGetProfileQuery();
  const {data: balance} = useGetBalanceQuery();

  const [limit, setLimit] = useState(5);

  const {data, isLoading} = useGetTransactionHistoryQuery({
    limit,
    offset: 0,
  });


  const records = data?.data.records ?? [];

  return (
    <div className="bg-white min-h-screen p-6 text-black">
      <DashboardHeader
        name={`${profile?.data.first_name} ${profile?.data.last_name}`}
        avatarUrl={profile?.data.profile_image}
        balance={balance?.data.balance ?? 0}
      />

      <div className="px-32 mt-10 space-y-6">
        <h1 className="font-semibold text-lg">Semua Transaksi</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <TransactionList records={records} />

            {records.length >= limit && (
              <button
                onClick={() => setLimit((prev) => prev + 2)}
                className="w-full cursor-pointer text-red-600 text-sm hover:underline mt-4"
              >
                Show more
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
