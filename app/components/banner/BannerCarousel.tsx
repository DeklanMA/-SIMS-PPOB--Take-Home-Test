import {useRef, useState} from 'react';
import BannerCard from './BannerCard';

interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export default function BannerCarousel({banners}: {banners: Banner[]}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; 
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="bg-white  rounded  pl-32">
      <h2 className="text-lg font-normal mb-8">Temukan promo menarik</h2>

      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-scroll select-none cursor-grab active:cursor-grabbing scrollbar-hide"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {banners.map((banner, idx) => (
          <BannerCard key={idx} banner={banner} />
        ))}
      </div>
    </section>
  );
}
