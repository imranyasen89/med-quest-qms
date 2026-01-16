import { Instrument } from '@/types/qms';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  FlaskConical,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Wrench,
  XCircle,
} from 'lucide-react';

interface InstrumentCardProps {
  instrument: Instrument;
  onClick?: () => void;
}

const statusConfig = {
  operational: { label: 'Operational', icon: CheckCircle2, className: 'text-status-approved' },
  'under-maintenance': { label: 'Under Maintenance', icon: Wrench, className: 'text-status-review' },
  'out-of-service': { label: 'Out of Service', icon: XCircle, className: 'text-status-rejected' },
  decommissioned: { label: 'Decommissioned', icon: AlertCircle, className: 'text-status-obsolete' },
};

const criticalityConfig = {
  critical: { label: 'Critical', className: 'bg-status-rejected-bg text-status-rejected' },
  major: { label: 'Major', className: 'bg-status-review-bg text-status-review' },
  minor: { label: 'Minor', className: 'bg-muted text-muted-foreground' },
};

export function InstrumentCard({ instrument, onClick }: InstrumentCardProps) {
  const status = statusConfig[instrument.status];
  const criticality = criticalityConfig[instrument.criticality];
  const StatusIcon = status.icon;

  const isCalibrationDue =
    instrument.calibrationDueDate && new Date(instrument.calibrationDueDate) <= new Date();

  return (
    <div
      className="module-card cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-module-instruments/10 p-3">
            <FlaskConical className="h-5 w-5 text-module-instruments" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{instrument.name}</h3>
            <p className="font-mono text-xs text-muted-foreground">{instrument.assetCode}</p>
          </div>
        </div>
        <span className={cn('status-badge', criticality.className)}>{criticality.label}</span>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-medium text-foreground">{instrument.manufacturer}</span>
          <span>•</span>
          <span>{instrument.model}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{instrument.location}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div className={cn('flex items-center gap-1.5', status.className)}>
          <StatusIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{status.label}</span>
        </div>

        {instrument.calibrationDueDate && (
          <div
            className={cn(
              'flex items-center gap-1.5 text-sm',
              isCalibrationDue ? 'text-status-rejected' : 'text-muted-foreground'
            )}
          >
            <Calendar className="h-4 w-4" />
            <span>
              Cal: {format(instrument.calibrationDueDate, 'MMM dd')}
            </span>
            {isCalibrationDue && <AlertCircle className="h-4 w-4" />}
          </div>
        )}
      </div>
    </div>
  );
}
