import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Calendar, ClipboardCheck, FileText, Plus, Users } from 'lucide-react';

export default function Audits() {
  const upcomingAudits = [
    {
      id: '1',
      title: 'Internal Audit - Hematology Section',
      date: new Date('2025-01-20'),
      auditor: 'Dr. James Wilson',
      department: 'Hematology',
      status: 'scheduled',
    },
    {
      id: '2',
      title: 'Internal Audit - Document Control',
      date: new Date('2025-02-15'),
      auditor: 'Quality Team',
      department: 'Quality',
      status: 'scheduled',
    },
    {
      id: '3',
      title: 'Surveillance Audit - ISO 9001',
      date: new Date('2025-03-10'),
      auditor: 'External Auditor',
      department: 'All',
      status: 'planned',
    },
  ];

  return (
    <MainLayout
      title="Audits & Compliance"
      subtitle="Internal audit scheduling and compliance management"
    >
      <div className="animate-fade-in space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Scheduled Audits</p>
            <p className="mt-1 text-3xl font-bold text-foreground">3</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Open Findings</p>
            <p className="mt-1 text-3xl font-bold text-status-review">5</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Completed This Year</p>
            <p className="mt-1 text-3xl font-bold text-status-approved">8</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Next Audit</p>
            <p className="mt-1 text-xl font-bold text-foreground">Jan 20, 2025</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="h-auto flex-col gap-2 p-4">
            <Calendar className="h-6 w-6 text-primary" />
            <span>Schedule Audit</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 p-4">
            <ClipboardCheck className="h-6 w-6 text-primary" />
            <span>Audit Checklists</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 p-4">
            <FileText className="h-6 w-6 text-primary" />
            <span>Audit Reports</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 p-4">
            <Users className="h-6 w-6 text-primary" />
            <span>Management Review</span>
          </Button>
        </div>

        {/* Upcoming Audits */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Audits</h2>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Audit
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingAudits.map((audit) => (
              <div
                key={audit.id}
                className="module-card flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-module-audit/10">
                    <ClipboardCheck className="h-6 w-6 text-module-audit" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{audit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {audit.department} • Auditor: {audit.auditor}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {audit.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">{audit.status}</p>
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
              <span className="iso-clause mr-2">9.2</span>
              Internal Audit
            </span>
            <span>
              <span className="iso-clause mr-2">9.3</span>
              Management Review
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
