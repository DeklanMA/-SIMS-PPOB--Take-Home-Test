import ServiceItem from './ServiceItem';

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
}

interface Props {
  services: Service[];
}

export default function ServiceGrid({services}: Props) {
  return (
    <div className="flex px-32 flex-row gap-4  mb-8">
      {services.map((service) => (
        <ServiceItem
          key={service.service_code}
          code={service.service_code}
          name={service.service_name}
          icon={service.service_icon}
        />
      ))}
    </div>
  );
}
