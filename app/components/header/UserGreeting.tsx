type UserGreetingProps = {
  name: string;
  avatarUrl?: string;
};

export function UserGreeting({name, avatarUrl}: UserGreetingProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <img
        src={avatarUrl || '/avatar.png'}
        alt="avatar"
        className="w-14 h-14 rounded-full border border-gray-300"
        onError={(e) => {
          e.currentTarget.src = '/avatar.png';
        }}
      />

      <div>
        <p className="text-sm text-gray-500">Selamat datang,</p>
        <p className="font-semibold text-3xl">{name}</p>
      </div>
    </div>
  );
}
