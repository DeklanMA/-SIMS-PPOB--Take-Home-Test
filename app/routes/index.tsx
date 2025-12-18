import {
  useGetProfileQuery,
  useGetBalanceQuery,
  useGetServicesQuery,
  useGetBannersQuery,
} from '@app/features/api/apiSlice';
import BannerCarousel from '~/components/banner/BannerCarousel';
import {DashboardHeader} from '~/components/header/DashboardHeader';
import ServiceGrid from '~/components/service/ServiceGrid';

export default function IndexPage() {
  const {data: profile} = useGetProfileQuery();
  const {data: balance} = useGetBalanceQuery();
  const {data: services} = useGetServicesQuery();
  const {data: banners} = useGetBannersQuery();

  return (
    <div className="pt-8 flex flex-col gap-10 bg-white min-h-screen text-black px">
      <DashboardHeader
        name={`${profile?.data.first_name} ${profile?.data.last_name}`}
        avatarUrl={profile?.data.profile_image}
        balance={balance?.data.balance ?? 0}
      />

      <ServiceGrid services={services?.data ?? []} />

      <BannerCarousel banners={banners?.data ?? []} />
    </div>
  );
}
