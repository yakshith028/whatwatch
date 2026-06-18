export default function SkeletonCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Poster */}
      <div className="aspect-[2/3] skeleton-line" />
      {/* Body */}
      <div className="p-4 flex flex-col gap-2.5">
        <div className="skeleton-line h-4 w-4/5" />
        <div className="skeleton-line h-3 w-2/5" />
        <div className="skeleton-line h-3 w-full" />
        <div className="skeleton-line h-3 w-3/4" />
      </div>
    </div>
  );
}
