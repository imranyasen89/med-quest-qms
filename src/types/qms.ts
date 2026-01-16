// ISO 9001:2015 QMS Types for Pathology Laboratory
// Department-specific for: Reception, Microbiology, Chemical Pathology, Hematology, Blood Bank

// Department Types - 5 Sections
export type Department = 
  | 'reception' 
  | 'microbiology' 
  | 'chemical-pathology' 
  | 'hematology' 
  | 'blood-bank';

export const DEPARTMENTS: { value: Department; label: string; code: string }[] = [
  { value: 'reception', label: 'Reception', code: 'REC' },
  { value: 'microbiology', label: 'Microbiology', code: 'MICRO' },
  { value: 'chemical-pathology', label: 'Chemical Pathology', code: 'CHEM' },
  { value: 'hematology', label: 'Hematology', code: 'HEMA' },
  { value: 'blood-bank', label: 'Blood Bank', code: 'BB' },
];

// Document Control Types
export type DocumentLevel = 
  | 'policy' 
  | 'manual' 
  | 'process' 
  | 'sop' 
  | 'work-instruction' 
  | 'form' 
  | 'record';

export type DocumentType = 
  | 'quality-policy'
  | 'quality-manual'
  | 'organogram'
  | 'job-description'
  | 'sop'
  | 'work-instruction'
  | 'flowchart'
  | 'form'
  | 'checklist'
  | 'template';

export const DOCUMENT_TYPES: { value: DocumentType; label: string; prefix: string; level: DocumentLevel }[] = [
  { value: 'quality-policy', label: 'Quality Policy', prefix: 'QP', level: 'policy' },
  { value: 'quality-manual', label: 'Quality Manual', prefix: 'QM', level: 'manual' },
  { value: 'organogram', label: 'Organogram', prefix: 'ORG', level: 'manual' },
  { value: 'job-description', label: 'Job Description', prefix: 'JD', level: 'sop' },
  { value: 'sop', label: 'Standard Operating Procedure', prefix: 'SOP', level: 'sop' },
  { value: 'work-instruction', label: 'Work Instruction', prefix: 'WI', level: 'work-instruction' },
  { value: 'flowchart', label: 'Flowchart', prefix: 'FC', level: 'process' },
  { value: 'form', label: 'Form', prefix: 'FM', level: 'form' },
  { value: 'checklist', label: 'Checklist', prefix: 'CL', level: 'form' },
  { value: 'template', label: 'Template', prefix: 'TMP', level: 'form' },
];

export type DocumentStatus = 
  | 'draft' 
  | 'under-review' 
  | 'approved' 
  | 'released' 
  | 'obsolete' 
  | 'rejected';

export const DOCUMENT_STATUSES: { value: DocumentStatus; label: string; color: string }[] = [
  { value: 'draft', label: 'Draft', color: 'gray' },
  { value: 'under-review', label: 'Under Review', color: 'yellow' },
  { value: 'approved', label: 'Approved', color: 'blue' },
  { value: 'released', label: 'Released', color: 'green' },
  { value: 'obsolete', label: 'Obsolete', color: 'red' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
];

// User Roles
export type UserRole = 'admin' | 'author' | 'reviewer' | 'approver' | 'viewer';

export const USER_ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: 'admin', label: 'Administrator', description: 'Full system access' },
  { value: 'author', label: 'Author', description: 'Can create and edit documents' },
  { value: 'reviewer', label: 'Reviewer', description: 'Can review documents' },
  { value: 'approver', label: 'Approver', description: 'Can approve documents' },
  { value: 'viewer', label: 'Viewer', description: 'Read-only access' },
];

// Document Interface
export interface Document {
  id: string;
  document_number: string;
  title: string;
  level: DocumentLevel;
  type: DocumentType;
  department: Department;
  status: DocumentStatus;
  version: string;
  author_id?: string;
  reviewer_id?: string;
  approver_id?: string;
  created_at: string;
  updated_at: string;
  effective_date?: string;
  review_date?: string;
  iso_clauses?: string[];
  description?: string;
  content?: string;
}

export interface DocumentVersion {
  id: string;
  document_id: string;
  version: string;
  change_description: string;
  changed_by: string;
  changed_at: string;
  previous_version?: string;
}

// Instrument & Equipment Types
export type InstrumentCriticality = 'critical' | 'major' | 'minor';
export type AMCStatus = 'active' | 'expired' | 'pending-renewal';
export type InstrumentStatus = 'operational' | 'under-maintenance' | 'out-of-service' | 'decommissioned';

export interface Instrument {
  id: string;
  asset_code: string;
  name: string;
  manufacturer: string;
  model: string;
  serial_number: string;
  location: string;
  department: Department;
  installation_date: string;
  warranty_expiry?: string;
  amc_status: AMCStatus;
  amc_expiry?: string;
  criticality: InstrumentCriticality;
  status: InstrumentStatus;
  linked_documents?: string[];
  calibration_due_date?: string;
  last_maintenance_date?: string;
  last_qc_date?: string;
  created_at: string;
  updated_at: string;
}

// Log Types
export type MaintenanceType = 'preventive' | 'breakdown' | 'calibration';
export type QCResult = 'pass' | 'fail' | 'conditional';

export interface MaintenanceLog {
  id: string;
  instrument_id: string;
  type: MaintenanceType;
  description: string;
  performed_by: string;
  performed_at: string;
  next_due_date?: string;
  findings?: string;
  action_taken?: string;
  is_locked: boolean;
  created_at: string;
}

export interface QCLog {
  id: string;
  instrument_id: string;
  test_name: string;
  result: QCResult;
  performed_by: string;
  performed_at: string;
  lot_number?: string;
  expiry_date?: string;
  control_level?: string;
  observed_value?: number;
  expected_range?: string;
  deviation?: string;
  corrective_action?: string;
  is_locked: boolean;
  created_at: string;
}

// KPI Types
export type KPICategory = 'pre-analytical' | 'analytical' | 'post-analytical' | 'equipment';
export type KPITrend = 'up' | 'down' | 'stable';

export interface KPI {
  id: string;
  name: string;
  category: KPICategory;
  department?: Department;
  target: number;
  current_value: number;
  unit: string;
  trend: KPITrend;
  iso_clause?: string;
  created_at: string;
  updated_at: string;
}

// Risk & CAPA Types
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type RiskStatus = 'identified' | 'mitigated' | 'accepted' | 'closed';
export type CAPAStatus = 'open' | 'in-progress' | 'verification' | 'closed';
export type CAPAType = 'corrective' | 'preventive';
export type CAPAEffectiveness = 'effective' | 'partially-effective' | 'not-effective';

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: string;
  department?: Department;
  likelihood: number;
  impact: number;
  risk_score: number;
  level: RiskLevel;
  linked_process?: string;
  linked_instrument_id?: string;
  mitigation_plan?: string;
  owner_id?: string;
  status: RiskStatus;
  created_at: string;
  updated_at: string;
}

export interface CAPA {
  id: string;
  capa_number: string;
  type: CAPAType;
  title: string;
  description: string;
  root_cause?: string;
  non_conformity_id?: string;
  status: CAPAStatus;
  assigned_to?: string;
  due_date: string;
  completed_date?: string;
  effectiveness?: CAPAEffectiveness;
  linked_documents?: string[];
  created_at: string;
  updated_at: string;
}

// Audit Types
export type AuditType = 'internal' | 'external' | 'surveillance';
export type AuditStatus = 'planned' | 'in-progress' | 'completed' | 'closed';
export type AuditFinding = 'conforming' | 'minor-nc' | 'major-nc' | 'observation' | 'not-applicable';

export interface AuditChecklist {
  id: string;
  audit_id: string;
  clause: string;
  requirement: string;
  finding: AuditFinding;
  evidence?: string;
  notes?: string;
  created_at: string;
}

export interface Audit {
  id: string;
  title: string;
  type: AuditType;
  audit_date: string;
  auditor_id?: string;
  department: Department;
  status: AuditStatus;
  findings_count: number;
  created_at: string;
  updated_at: string;
}

// Profile Types
export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  designation?: string;
  department?: Department;
  created_at: string;
  updated_at: string;
}

export interface UserRoleAssignment {
  id: string;
  user_id: string;
  role: UserRole;
  department?: Department;
  created_at: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalDocuments: number;
  documentsUnderReview: number;
  overdueReviews: number;
  totalInstruments: number;
  instrumentsUnderMaintenance: number;
  calibrationDue: number;
  openCAPAs: number;
  upcomingAudits: number;
}

// Helper function to generate document number
export function generateDocumentNumber(
  type: DocumentType, 
  department: Department, 
  sequence: number
): string {
  const docType = DOCUMENT_TYPES.find(t => t.value === type);
  const dept = DEPARTMENTS.find(d => d.value === department);
  const prefix = docType?.prefix || 'DOC';
  const deptCode = dept?.code || 'GEN';
  const seqNum = String(sequence).padStart(3, '0');
  return `${prefix}-${deptCode}-${seqNum}`;
}
