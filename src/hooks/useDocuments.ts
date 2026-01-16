import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Document, DocumentType, Department, DocumentLevel, generateDocumentNumber } from '@/types/qms';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface CreateDocumentData {
  title: string;
  type: DocumentType;
  department: Department;
  level: DocumentLevel;
  description?: string;
  iso_clauses?: string[];
  content?: string;
}

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data as Document[]);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const getNextSequence = async (type: DocumentType, department: Department): Promise<number> => {
    const { data, error } = await supabase
      .from('documents')
      .select('document_number')
      .ilike('document_number', `%-${department.toUpperCase().replace('-', '')}-%`)
      .order('document_number', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      return 1;
    }

    // Extract sequence number from document_number like "SOP-HEMA-001"
    const lastNumber = data[0].document_number;
    const parts = lastNumber.split('-');
    const lastSeq = parseInt(parts[parts.length - 1], 10);
    return isNaN(lastSeq) ? 1 : lastSeq + 1;
  };

  const createDocument = async (docData: CreateDocumentData): Promise<Document | null> => {
    if (!user) {
      toast.error('You must be logged in to create documents');
      return null;
    }

    try {
      // Generate document number
      const sequence = await getNextSequence(docData.type, docData.department);
      const documentNumber = generateDocumentNumber(docData.type, docData.department, sequence);

      const newDoc = {
        document_number: documentNumber,
        title: docData.title,
        type: docData.type,
        level: docData.level,
        department: docData.department,
        status: 'draft' as const,
        version: '1.0',
        author_id: user.id,
        description: docData.description || null,
        iso_clauses: docData.iso_clauses || null,
        content: docData.content || null,
      };

      const { data, error } = await supabase
        .from('documents')
        .insert(newDoc)
        .select()
        .single();

      if (error) throw error;

      toast.success(`Document ${documentNumber} created successfully`);
      await fetchDocuments();
      return data as Document;
    } catch (err) {
      console.error('Error creating document:', err);
      toast.error('Failed to create document');
      return null;
    }
  };

  const updateDocument = async (id: string, updates: Partial<Document>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('documents')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast.success('Document updated successfully');
      await fetchDocuments();
      return true;
    } catch (err) {
      console.error('Error updating document:', err);
      toast.error('Failed to update document');
      return false;
    }
  };

  const getDocumentById = async (id: string): Promise<Document | null> => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Document | null;
    } catch (err) {
      console.error('Error fetching document:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    createDocument,
    updateDocument,
    getDocumentById,
    refetch: fetchDocuments,
  };
}
