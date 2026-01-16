import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { mockDashboardStats, mockDocuments, mockCAPAs } from '@/data/mockData';
import {
  FileText,
  FlaskConical,
  BarChart3,
  AlertTriangle,
  ClipboardCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { StatusBadge } from '@/components/documents/StatusBadge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const recentDocuments = mockDocuments.slice(0, 5);
  const openCAPAs = mockCAPAs.filter((c) => c.status !== 'closed').slice(0, 3);

  return (
    <MainLayout title="Dashboard" subtitle="Pathology Laboratory QMS Overview">
      <div className="animate-fade-in space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Documents"
            value={mockDashboardStats.totalDocuments}
            subtitle={`${mockDashboardStats.documentsUnderReview} under review`}
            icon={<FileText className="h-6 w-6" />}
          />
          <StatCard
            title="Active Instruments"
            value={mockDashboardStats.totalInstruments}
            subtitle={`${mockDashboardStats.calibrationDue} calibration due`}
            icon={<FlaskConical className="h-6 w-6" />}
            variant={mockDashboardStats.calibrationDue > 0 ? 'warning' : 'default'}
          />
          <StatCard
            title="Open CAPAs"
            value={mockDashboardStats.openCAPAs}
            icon={<AlertTriangle className="h-6 w-6" />}
            variant={mockDashboardStats.openCAPAs > 3 ? 'danger' : 'default'}
          />
          <StatCard
            title="Overdue Reviews"
            value={mockDashboardStats.overdueReviews}
            icon={<Clock className="h-6 w-6" />}
            variant={mockDashboardStats.overdueReviews > 0 ? 'danger' : 'success'}
          />
        </div>

        {/* Module Cards */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">QMS Modules</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ModuleCard
              title="Document Control"
              description="Manage SOPs, policies, work instructions and forms with full version control"
              href="/documents"
              icon={<FileText className="h-6 w-6" />}
              stats={[
                { label: 'Total Documents', value: mockDashboardStats.totalDocuments },
                { label: 'Pending Review', value: mockDashboardStats.documentsUnderReview },
              ]}
              isoClause="7.5"
            />
            <ModuleCard
              title="Instrument Management"
              description="Track laboratory instruments, maintenance schedules and calibration records"
              href="/instruments"
              icon={<FlaskConical className="h-6 w-6" />}
              stats={[
                { label: 'Instruments', value: mockDashboardStats.totalInstruments },
                { label: 'Under Maintenance', value: mockDashboardStats.instrumentsUnderMaintenance },
              ]}
              isoClause="7.1.5"
            />
            <ModuleCard
              title="KPIs & Analytics"
              description="Monitor key performance indicators across pre-analytical, analytical and post-analytical phases"
              href="/kpis"
              icon={<BarChart3 className="h-6 w-6" />}
              isoClause="9.1"
            />
            <ModuleCard
              title="Risk & CAPA"
              description="Risk register, non-conformity management and corrective/preventive actions"
              href="/risks"
              icon={<AlertTriangle className="h-6 w-6" />}
              stats={[
                { label: 'Open CAPAs', value: mockDashboardStats.openCAPAs },
                { label: 'Audits Due', value: mockDashboardStats.upcomingAudits },
              ]}
              isoClause="6.1"
            />
            <ModuleCard
              title="Audits & Compliance"
              description="Internal audit scheduling, checklists and findings management"
              href="/audits"
              icon={<ClipboardCheck className="h-6 w-6" />}
              isoClause="9.2"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Documents */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Recent Documents</h3>
              <Link to="/documents" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.title}</p>
                      <p className="font-mono text-xs text-muted-foreground">{doc.documentNumber}</p>
                    </div>
                  </div>
                  <StatusBadge status={doc.status} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Open CAPAs */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Open CAPAs</h3>
              <Link to="/risks/capa" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {openCAPAs.map((capa) => (
                <div
                  key={capa.id}
                  className="rounded-lg border border-border p-3 transition-colors hover:bg-accent/30"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {capa.type === 'corrective' ? (
                        <AlertCircle className="h-4 w-4 text-status-rejected" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-status-approved" />
                      )}
                      <span className="text-sm font-medium text-foreground">{capa.title}</span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{capa.id}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Assigned: {capa.assignedTo}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due: {format(capa.dueDate, 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
