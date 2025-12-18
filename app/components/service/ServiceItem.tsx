import {useNavigate} from 'react-router';

interface Props {
  code: string;
  name: string;
  icon: string;
}

export default function ServiceItem({code, name, icon}: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/service/${code}`)}
      className="flex cursor-pointer flex-col items-center gap-2  rounded-lg hover:bg-gray-100 transition"
    >
      <img src={icon} alt={name} className="w-16 h-16 object-cover border border-gray-200 rounded-lg" />
      <span className="text-sm text-center">{name}</span>
    </button>
  );
}
