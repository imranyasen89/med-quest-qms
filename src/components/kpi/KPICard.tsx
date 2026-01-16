import { KPI } from '@/types/qms';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

interface KPICardProps {
  kpi: KPI;
}

export function KPICard({ kpi }: KPICardProps) {
  const isOnTarget = kpi.target <= kpi.current;
  const percentage = Math.min((kpi.current / kpi.target) * 100, 100);

  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus;
  const trendColor =
    kpi.trend === 'up' ? 'text-status-approved' : kpi.trend === 'down' ? 'text-status-rejected' : 'text-muted-foreground';

  return (
    <div className="module-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              {kpi.current}
              <span className="text-sm font-normal text-muted-foreground">{kpi.unit}</span>
            </span>
          </div>
        </div>
        <div className={cn('flex items-center gap-1', trendColor)}>
          <TrendIcon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            Target: {kpi.target}{kpi.unit}
          </span>
          <span className={isOnTarget ? 'text-status-approved' : 'text-status-review'}>
            {isOnTarget ? 'On Target' : 'Below Target'}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              isOnTarget ? 'bg-status-approved' : 'bg-status-review'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {kpi.isoClause && (
        <div className="mt-3 flex justify-end">
          <span className="iso-clause">{kpi.isoClause}</span>
        </div>
      )}
    </div>
  );
}
