import {Loader2} from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <Loader2 className="w-10 h-10 animate-spin text-red-600" />
    </div>
  );
}
