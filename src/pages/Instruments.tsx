import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { InstrumentCard } from '@/components/instruments/InstrumentCard';
import { mockInstruments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, LayoutGrid, List, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Instruments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const departments = [...new Set(mockInstruments.map((i) => i.department))];

  const filteredInstruments = mockInstruments.filter((instrument) => {
    const matchesSearch =
      instrument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instrument.asset_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instrument.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || instrument.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || instrument.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const criticalCount = mockInstruments.filter((i) => i.criticality === 'critical').length;
  const operationalCount = mockInstruments.filter((i) => i.status === 'operational').length;
  const maintenanceCount = mockInstruments.filter((i) => i.status === 'under-maintenance').length;

  return (
    <MainLayout
      title="Instrument Management"
      subtitle="Laboratory equipment master list and maintenance tracking"
    >
      <div className="animate-fade-in space-y-6">
        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Total Instruments</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{mockInstruments.length}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Critical Equipment</p>
            <p className="mt-1 text-3xl font-bold text-status-rejected">{criticalCount}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Operational</p>
            <p className="mt-1 text-3xl font-bold text-status-approved">{operationalCount}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Under Maintenance</p>
            <p className="mt-1 text-3xl font-bold text-status-review">{maintenanceCount}</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search instruments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-44">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="under-maintenance">Under Maintenance</SelectItem>
                <SelectItem value="out-of-service">Out of Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')}>
              <TabsList className="h-9">
                <TabsTrigger value="grid" className="px-3">
                  <LayoutGrid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Instrument
            </Button>
          </div>
        </div>

        {/* Instruments Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredInstruments.map((instrument) => (
            <InstrumentCard
              key={instrument.id}
              instrument={instrument}
              onClick={() => console.log('View instrument', instrument)}
            />
          ))}
        </div>

        {filteredInstruments.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
            <p className="text-muted-foreground">No instruments found matching your criteria</p>
          </div>
        )}

        {/* ISO Reference */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-medium text-foreground">ISO 9001:2015 Reference</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="iso-clause mr-2">7.1.5</span>
            Monitoring and Measuring Resources - Calibration, verification, and maintenance of equipment.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
