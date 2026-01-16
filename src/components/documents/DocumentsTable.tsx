import { Document } from '@/types/qms';
import { StatusBadge } from './StatusBadge';
import { format } from 'date-fns';
import { FileText, MoreHorizontal, Eye, Edit, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DocumentsTableProps {
  documents: Document[];
  onView?: (doc: Document) => void;
  onEdit?: (doc: Document) => void;
}

export function DocumentsTable({ documents, onView, onEdit }: DocumentsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="qms-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Department</th>
            <th>Status</th>
            <th>Version</th>
            <th>Updated</th>
            <th>ISO Clause</th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="group">
              <td>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">{doc.documentNumber}</p>
                  </div>
                </div>
              </td>
              <td>
                <span className="capitalize text-sm">{doc.type.replace('-', ' ')}</span>
              </td>
              <td>
                <span className="text-sm">{doc.department}</span>
              </td>
              <td>
                <StatusBadge status={doc.status} />
              </td>
              <td>
                <span className="font-mono text-sm">v{doc.version}</span>
              </td>
              <td>
                <span className="text-sm text-muted-foreground">
                  {format(doc.updatedAt, 'MMM dd, yyyy')}
                </span>
              </td>
              <td>
                {doc.isoClause && doc.isoClause.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {doc.isoClause.slice(0, 2).map((clause) => (
                      <span key={clause} className="iso-clause">
                        {clause}
                      </span>
                    ))}
                    {doc.isoClause.length > 2 && (
                      <span className="iso-clause">+{doc.isoClause.length - 2}</span>
                    )}
                  </div>
                )}
              </td>
              <td>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(doc)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(doc)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <History className="mr-2 h-4 w-4" />
                      Version History
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
