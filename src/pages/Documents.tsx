import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DocumentsTable } from '@/components/documents/DocumentsTable';
import { NewDocumentDialog } from '@/components/documents/NewDocumentDialog';
import { useDocuments, CreateDocumentData } from '@/hooks/useDocuments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Filter, Download, Loader2 } from 'lucide-react';
import { DocumentStatus, DocumentLevel } from '@/types/qms';

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [isNewDocOpen, setIsNewDocOpen] = useState(false);
  
  const { documents, loading, createDocument } = useDocuments();

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.document_number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesLevel = levelFilter === 'all' || doc.level === levelFilter;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const statusCounts = documents.reduce(
    (acc, doc) => {
      acc[doc.status] = (acc[doc.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleCreateDocument = async (data: CreateDocumentData) => {
    await createDocument(data);
  };

  return (
    <MainLayout
      title="Document Control"
      subtitle="Manage SOPs, policies, work instructions and controlled documents"
    >
      <div className="animate-fade-in space-y-6">
        {/* Status Summary */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {(['draft', 'under-review', 'approved', 'released', 'obsolete', 'rejected'] as DocumentStatus[]).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
                className={`rounded-lg border p-3 text-left transition-all ${
                  statusFilter === status
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <p className="text-2xl font-bold text-foreground">{statusCounts[status] || 0}</p>
                <p className="text-xs capitalize text-muted-foreground">{status.replace('-', ' ')}</p>
              </button>
            )
          )}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Document Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="process">Process</SelectItem>
                <SelectItem value="sop">SOP</SelectItem>
                <SelectItem value="work-instruction">Work Instruction</SelectItem>
                <SelectItem value="form">Form</SelectItem>
                <SelectItem value="record">Record</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => setIsNewDocOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>
        </div>

        {/* Documents Table */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <DocumentsTable
            documents={filteredDocuments}
            onView={(doc) => console.log('View', doc)}
            onEdit={(doc) => console.log('Edit', doc)}
          />
        )}

        {/* ISO Reference */}
        {/* ISO Reference */}
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-medium text-foreground">ISO 9001:2015 Reference</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="iso-clause mr-2">7.5</span>
            Documented Information - Requirements for creating, updating, and controlling documented information.
          </p>
        </div>
      </div>

      <NewDocumentDialog
        open={isNewDocOpen}
        onOpenChange={setIsNewDocOpen}
        onSubmit={handleCreateDocument}
      />
    </MainLayout>
  );
}
