import {UserGreeting} from './UserGreeting';
import {BalanceCard} from './BalanceCard';

type DashboardHeaderProps = {
  name: string;
  avatarUrl?: string;
  balance: number;
};

export function DashboardHeader({
  name,
  avatarUrl,
  balance,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 px-32">
      <UserGreeting name={name} avatarUrl={avatarUrl} />
      <BalanceCard balance={balance} />
    </div>
  );
}
