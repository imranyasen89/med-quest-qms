// ISO 9001:2015 QMS Types for Pathology Laboratory

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

export type DocumentStatus = 
  | 'draft' 
  | 'under-review' 
  | 'approved' 
  | 'released' 
  | 'obsolete' 
  | 'rejected';

export type UserRole = 'author' | 'reviewer' | 'approver' | 'viewer' | 'admin';

export interface Document {
  id: string;
  documentNumber: string;
  title: string;
  level: DocumentLevel;
  type: DocumentType;
  department: string;
  status: DocumentStatus;
  version: string;
  author: string;
  reviewer?: string;
  approver?: string;
  createdAt: Date;
  updatedAt: Date;
  effectiveDate?: Date;
  reviewDate?: Date;
  isoClause?: string[];
  description?: string;
  content?: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: string;
  changeDescription: string;
  changedBy: string;
  changedAt: Date;
  previousVersion?: string;
}

// Instrument & Equipment Types
export type InstrumentCriticality = 'critical' | 'major' | 'minor';
export type AMCStatus = 'active' | 'expired' | 'pending-renewal';
export type InstrumentStatus = 'operational' | 'under-maintenance' | 'out-of-service' | 'decommissioned';

export interface Instrument {
  id: string;
  assetCode: string;
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  location: string;
  department: string;
  installationDate: Date;
  warrantyExpiry?: Date;
  amcStatus: AMCStatus;
  amcExpiry?: Date;
  criticality: InstrumentCriticality;
  status: InstrumentStatus;
  linkedDocuments?: string[];
  calibrationDueDate?: Date;
  lastMaintenanceDate?: Date;
  lastQCDate?: Date;
}

// Log Types
export type MaintenanceType = 'preventive' | 'breakdown' | 'calibration';
export type QCResult = 'pass' | 'fail' | 'conditional';

export interface MaintenanceLog {
  id: string;
  instrumentId: string;
  type: MaintenanceType;
  description: string;
  performedBy: string;
  performedAt: Date;
  nextDueDate?: Date;
  findings?: string;
  actionTaken?: string;
  isLocked: boolean;
}

export interface QCLog {
  id: string;
  instrumentId: string;
  testName: string;
  result: QCResult;
  performedBy: string;
  performedAt: Date;
  lotNumber?: string;
  expiryDate?: Date;
  controlLevel?: string;
  observedValue?: number;
  expectedRange?: string;
  deviation?: string;
  correctiveAction?: string;
  isLocked: boolean;
}

// KPI Types
export type KPICategory = 'pre-analytical' | 'analytical' | 'post-analytical' | 'equipment';

export interface KPI {
  id: string;
  name: string;
  category: KPICategory;
  target: number;
  current: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  isoClause?: string;
}

// Risk & CAPA Types
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type CAPAStatus = 'open' | 'in-progress' | 'verification' | 'closed';
export type CAPAType = 'corrective' | 'preventive';

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: string;
  likelihood: number;
  impact: number;
  riskScore: number;
  level: RiskLevel;
  linkedProcess?: string;
  linkedInstrument?: string;
  mitigationPlan?: string;
  owner: string;
  status: 'identified' | 'mitigated' | 'accepted' | 'closed';
}

export interface CAPA {
  id: string;
  type: CAPAType;
  title: string;
  description: string;
  rootCause?: string;
  nonConformityId?: string;
  status: CAPAStatus;
  assignedTo: string;
  dueDate: Date;
  completedDate?: Date;
  effectiveness?: 'effective' | 'partially-effective' | 'not-effective';
  linkedDocuments?: string[];
}

// Audit Types
export interface AuditChecklist {
  id: string;
  clause: string;
  requirement: string;
  finding: 'conforming' | 'minor-nc' | 'major-nc' | 'observation' | 'not-applicable';
  evidence?: string;
  notes?: string;
}

export interface Audit {
  id: string;
  title: string;
  type: 'internal' | 'external' | 'surveillance';
  auditDate: Date;
  auditor: string;
  department: string;
  status: 'planned' | 'in-progress' | 'completed' | 'closed';
  findings: number;
  checklist: AuditChecklist[];
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
