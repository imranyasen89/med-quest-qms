import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/kpi/KPICard';
import { mockKPIs } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICategory } from '@/types/qms';

export default function KPIs() {
  const categories: { id: KPICategory; label: string }[] = [
    { id: 'pre-analytical', label: 'Pre-Analytical' },
    { id: 'analytical', label: 'Analytical' },
    { id: 'post-analytical', label: 'Post-Analytical' },
    { id: 'equipment', label: 'Equipment' },
  ];

  const getKPIsByCategory = (category: KPICategory) =>
    mockKPIs.filter((kpi) => kpi.category === category);

  const onTargetCount = mockKPIs.filter((kpi) => kpi.current_value >= kpi.target).length;

  return (
    <MainLayout
      title="KPIs & Analytics"
      subtitle="Key Performance Indicators for laboratory quality monitoring"
    >
      <div className="animate-fade-in space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total KPIs</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{mockKPIs.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">On Target</p>
            <p className="mt-1 text-3xl font-bold text-status-approved">{onTargetCount}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Below Target</p>
            <p className="mt-1 text-3xl font-bold text-status-review">
              {mockKPIs.length - onTargetCount}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Compliance Rate</p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              {Math.round((onTargetCount / mockKPIs.length) * 100)}%
            </p>
          </div>
        </div>

        {/* KPI Categories */}
        <Tabs defaultValue="pre-analytical" className="w-full">
          <TabsList className="w-full justify-start">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="flex-1 sm:flex-none">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {getKPIsByCategory(cat.id).map((kpi) => (
                  <KPICard key={kpi.id} kpi={kpi} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* ISO Reference */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-medium text-foreground">ISO 9001:2015 Reference</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="iso-clause mr-2">9.1</span>
            Monitoring, Measurement, Analysis and Evaluation - Determining what needs to be monitored
            and measured, and the methods for analysis and evaluation.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
