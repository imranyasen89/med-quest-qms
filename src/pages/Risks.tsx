import { MainLayout } from '@/components/layout/MainLayout';
import { mockRisks, mockCAPAs } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { AlertTriangle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Risks() {
  const riskLevelConfig = {
    low: { label: 'Low', className: 'bg-status-approved-bg text-status-approved' },
    medium: { label: 'Medium', className: 'bg-status-review-bg text-status-review' },
    high: { label: 'High', className: 'bg-status-rejected-bg text-status-rejected' },
    critical: { label: 'Critical', className: 'bg-destructive text-destructive-foreground' },
  };

  const capaStatusConfig = {
    open: { label: 'Open', className: 'status-draft' },
    'in-progress': { label: 'In Progress', className: 'status-review' },
    verification: { label: 'Verification', className: 'status-approved' },
    closed: { label: 'Closed', className: 'status-released' },
  };

  return (
    <MainLayout
      title="Risk & CAPA Management"
      subtitle="Risk register and corrective/preventive action tracking"
    >
      <div className="animate-fade-in space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Risks</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{mockRisks.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">High/Critical Risks</p>
            <p className="mt-1 text-3xl font-bold text-status-rejected">
              {mockRisks.filter((r) => r.level === 'high' || r.level === 'critical').length}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Open CAPAs</p>
            <p className="mt-1 text-3xl font-bold text-status-review">
              {mockCAPAs.filter((c) => c.status !== 'closed').length}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Closed CAPAs</p>
            <p className="mt-1 text-3xl font-bold text-status-approved">
              {mockCAPAs.filter((c) => c.status === 'closed').length}
            </p>
          </div>
        </div>

        {/* Risk Register */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Risk Register</h2>
            <Button variant="outline" size="sm">
              Add Risk
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="qms-table">
              <thead>
                <tr>
                  <th>Risk</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Score</th>
                  <th>Owner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockRisks.map((risk) => (
                  <tr key={risk.id} className="group cursor-pointer">
                    <td>
                      <div>
                        <p className="font-medium text-foreground">{risk.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {risk.description}
                        </p>
                      </div>
                    </td>
                    <td>{risk.category}</td>
                    <td>
                      <span
                        className={cn(
                          'status-badge',
                          riskLevelConfig[risk.level].className
                        )}
                      >
                        {riskLevelConfig[risk.level].label}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-lg font-bold">{risk.riskScore}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({risk.likelihood}×{risk.impact})
                      </span>
                    </td>
                    <td>{risk.owner}</td>
                    <td>
                      <span className="capitalize text-sm">{risk.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CAPAs */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Corrective & Preventive Actions (CAPA)
            </h2>
            <Button variant="outline" size="sm">
              New CAPA
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockCAPAs.map((capa) => (
              <div
                key={capa.id}
                className="module-card cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {capa.type === 'corrective' ? (
                      <AlertTriangle className="h-4 w-4 text-status-rejected" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-status-approved" />
                    )}
                    <span className="font-mono text-xs text-muted-foreground">{capa.id}</span>
                  </div>
                  <span className={cn('status-badge', capaStatusConfig[capa.status].className)}>
                    {capaStatusConfig[capa.status].label}
                  </span>
                </div>

                <h3 className="mt-3 font-medium text-foreground">{capa.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {capa.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs text-muted-foreground">
                    Assigned: {capa.assignedTo}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {format(capa.dueDate, 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ISO Reference */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-medium text-foreground">ISO 9001:2015 Reference</h4>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              <span className="iso-clause mr-2">6.1</span>
              Actions to address risks and opportunities
            </span>
            <span>
              <span className="iso-clause mr-2">10.2</span>
              Nonconformity and corrective action
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
