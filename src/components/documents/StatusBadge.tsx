import { DocumentStatus } from '@/types/qms';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: DocumentStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<DocumentStatus, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'status-draft' },
  'under-review': { label: 'Under Review', className: 'status-review' },
  approved: { label: 'Approved', className: 'status-approved' },
  released: { label: 'Released', className: 'status-released' },
  obsolete: { label: 'Obsolete', className: 'status-obsolete' },
  rejected: { label: 'Rejected', className: 'status-rejected' },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'status-badge',
        config.className,
        size === 'sm' && 'px-2 py-0.5 text-[10px]'
      )}
    >
      {config.label}
    </span>
  );
}
