import {
  useGetProfileQuery,
  useGetBalanceQuery,
  useGetServicesQuery,
  useGetBannersQuery,
} from '@app/features/api/apiSlice';
import BannerCarousel from '~/components/banner/BannerCarousel';
import PageLoader from '~/components/common/PageLoader';
import {DashboardHeader} from '~/components/header/DashboardHeader';
import ServiceGrid from '~/components/service/ServiceGrid';

export default function IndexPage() {
  const {data: profile, isLoading: profileLoading} = useGetProfileQuery();

  const {data: balance, isLoading: balanceLoading} = useGetBalanceQuery();

  const {data: services, isLoading: servicesLoading} = useGetServicesQuery();

  const {data: banners, isLoading: bannersLoading} = useGetBannersQuery();

  const isLoading =
    profileLoading || balanceLoading || servicesLoading || bannersLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="pt-8 flex flex-col gap-10 bg-white min-h-screen text-black">
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

