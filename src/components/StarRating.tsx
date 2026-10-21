import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  countLabel?: string;
  className?: string;
}

export function StarRating({
  rating,
  size = 15,
  showValue = true,
  count,
  countLabel,
  className = '',
}: StarRatingProps) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-1 whitespace-nowrap ${className}`}>
      <Star size={size} className="shrink-0 fill-amber-400 text-amber-400" aria-hidden="true" />
      {showValue && <span className="text-sm font-semibold text-slate-700">{rating.toFixed(1)}</span>}
      {typeof count === 'number' && (
        <span className="text-xs text-slate-500">({count}{countLabel ? ` ${countLabel}` : ''})</span>
      )}
    </span>
  );
}
