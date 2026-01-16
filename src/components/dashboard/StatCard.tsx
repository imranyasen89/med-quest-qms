import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  variant?: 'default' | 'warning' | 'success' | 'danger';
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = 'default',
}: StatCardProps) {
  const variantStyles = {
    default: 'border-border',
    warning: 'border-l-4 border-l-status-review border-t-0 border-r-0 border-b-0',
    success: 'border-l-4 border-l-status-approved border-t-0 border-r-0 border-b-0',
    danger: 'border-l-4 border-l-status-rejected border-t-0 border-r-0 border-b-0',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    trend === 'up' ? 'text-status-approved' : trend === 'down' ? 'text-status-rejected' : 'text-muted-foreground';

  return (
    <div className={cn('module-card', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
          {trend && trendValue && (
            <div className={cn('mt-2 flex items-center gap-1 text-sm', trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
    </div>
  );
}
