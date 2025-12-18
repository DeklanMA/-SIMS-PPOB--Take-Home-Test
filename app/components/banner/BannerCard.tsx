interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export default function BannerCard({banner}: {banner: Banner}) {
  return (
    <div className="min-w-[280px] max-w-[305px] flex-shrink-0 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm select-none mr-8">
      <img
        src={banner.banner_image}
        alt={banner.banner_name}
        className="w-full h-36 object-cover"
        draggable={false}
      />
    </div>
  );
}

