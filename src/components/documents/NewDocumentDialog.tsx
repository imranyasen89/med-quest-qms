import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { DEPARTMENTS, DOCUMENT_TYPES, DocumentType, Department, DocumentLevel } from '@/types/qms';
import { CreateDocumentData } from '@/hooks/useDocuments';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  type: z.string().min(1, 'Please select a document type'),
  department: z.string().min(1, 'Please select a department'),
  description: z.string().optional(),
  iso_clauses: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface NewDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateDocumentData) => Promise<void>;
}

export function NewDocumentDialog({ open, onOpenChange, onSubmit }: NewDocumentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: '',
      department: '',
      description: '',
      iso_clauses: '',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const docType = DOCUMENT_TYPES.find(t => t.value === values.type);
      const level: DocumentLevel = docType?.level || 'sop';
      
      const isoClauses = values.iso_clauses
        ? values.iso_clauses.split(',').map(c => c.trim()).filter(Boolean)
        : undefined;

      await onSubmit({
        title: values.title,
        type: values.type as DocumentType,
        department: values.department as Department,
        level,
        description: values.description,
        iso_clauses: isoClauses,
      });

      form.reset();
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <DialogDescription>
            Add a new controlled document to the QMS. Document number will be auto-generated.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sample Collection Procedure" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DOCUMENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.prefix} - {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the document purpose..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="iso_clauses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISO Clauses (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 7.5.1, 7.5.2, 8.5.2" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of ISO 9001:2015 clause references
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Document'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
