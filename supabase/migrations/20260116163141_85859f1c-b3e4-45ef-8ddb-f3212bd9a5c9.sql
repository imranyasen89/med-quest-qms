-- Create ENUM types for the QMS system
CREATE TYPE public.document_level AS ENUM (
  'policy', 'manual', 'process', 'sop', 'work-instruction', 'form', 'record'
);

CREATE TYPE public.document_type AS ENUM (
  'quality-policy', 'quality-manual', 'organogram', 'job-description', 
  'sop', 'work-instruction', 'flowchart', 'form', 'checklist', 'template'
);

CREATE TYPE public.document_status AS ENUM (
  'draft', 'under-review', 'approved', 'released', 'obsolete', 'rejected'
);

CREATE TYPE public.department AS ENUM (
  'reception', 'microbiology', 'chemical-pathology', 'hematology', 'blood-bank'
);

CREATE TYPE public.instrument_criticality AS ENUM ('critical', 'major', 'minor');
CREATE TYPE public.amc_status AS ENUM ('active', 'expired', 'pending-renewal');
CREATE TYPE public.instrument_status AS ENUM ('operational', 'under-maintenance', 'out-of-service', 'decommissioned');
CREATE TYPE public.maintenance_type AS ENUM ('preventive', 'breakdown', 'calibration');
CREATE TYPE public.qc_result AS ENUM ('pass', 'fail', 'conditional');
CREATE TYPE public.kpi_category AS ENUM ('pre-analytical', 'analytical', 'post-analytical', 'equipment');
CREATE TYPE public.kpi_trend AS ENUM ('up', 'down', 'stable');
CREATE TYPE public.risk_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.risk_status AS ENUM ('identified', 'mitigated', 'accepted', 'closed');
CREATE TYPE public.capa_status AS ENUM ('open', 'in-progress', 'verification', 'closed');
CREATE TYPE public.capa_type AS ENUM ('corrective', 'preventive');
CREATE TYPE public.capa_effectiveness AS ENUM ('effective', 'partially-effective', 'not-effective');
CREATE TYPE public.audit_type AS ENUM ('internal', 'external', 'surveillance');
CREATE TYPE public.audit_status AS ENUM ('planned', 'in-progress', 'completed', 'closed');
CREATE TYPE public.audit_finding AS ENUM ('conforming', 'minor-nc', 'major-nc', 'observation', 'not-applicable');
CREATE TYPE public.app_role AS ENUM ('admin', 'author', 'reviewer', 'approver', 'viewer');

-- User roles table for RBAC
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  department department,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  designation TEXT,
  department department,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  level document_level NOT NULL,
  type document_type NOT NULL,
  department department NOT NULL,
  status document_status NOT NULL DEFAULT 'draft',
  version TEXT NOT NULL DEFAULT '1.0',
  author_id UUID REFERENCES auth.users(id),
  reviewer_id UUID REFERENCES auth.users(id),
  approver_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  effective_date DATE,
  review_date DATE,
  iso_clauses TEXT[],
  description TEXT,
  content TEXT
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Document versions table
CREATE TABLE public.document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE NOT NULL,
  version TEXT NOT NULL,
  change_description TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id) NOT NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  previous_version TEXT
);

ALTER TABLE public.document_versions ENABLE ROW LEVEL SECURITY;

-- Instruments table
CREATE TABLE public.instruments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  manufacturer TEXT NOT NULL,
  model TEXT NOT NULL,
  serial_number TEXT NOT NULL,
  location TEXT NOT NULL,
  department department NOT NULL,
  installation_date DATE NOT NULL,
  warranty_expiry DATE,
  amc_status amc_status NOT NULL DEFAULT 'active',
  amc_expiry DATE,
  criticality instrument_criticality NOT NULL DEFAULT 'minor',
  status instrument_status NOT NULL DEFAULT 'operational',
  calibration_due_date DATE,
  last_maintenance_date DATE,
  last_qc_date DATE,
  linked_documents UUID[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.instruments ENABLE ROW LEVEL SECURITY;

-- Maintenance logs table
CREATE TABLE public.maintenance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrument_id UUID REFERENCES public.instruments(id) ON DELETE CASCADE NOT NULL,
  type maintenance_type NOT NULL,
  description TEXT NOT NULL,
  performed_by UUID REFERENCES auth.users(id) NOT NULL,
  performed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  next_due_date DATE,
  findings TEXT,
  action_taken TEXT,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;

-- QC logs table
CREATE TABLE public.qc_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrument_id UUID REFERENCES public.instruments(id) ON DELETE CASCADE NOT NULL,
  test_name TEXT NOT NULL,
  result qc_result NOT NULL,
  performed_by UUID REFERENCES auth.users(id) NOT NULL,
  performed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  lot_number TEXT,
  expiry_date DATE,
  control_level TEXT,
  observed_value DECIMAL,
  expected_range TEXT,
  deviation TEXT,
  corrective_action TEXT,
  is_locked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.qc_logs ENABLE ROW LEVEL SECURITY;

-- KPIs table
CREATE TABLE public.kpis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category kpi_category NOT NULL,
  department department,
  target DECIMAL NOT NULL,
  current_value DECIMAL NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  trend kpi_trend NOT NULL DEFAULT 'stable',
  iso_clause TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.kpis ENABLE ROW LEVEL SECURITY;

-- Risks table
CREATE TABLE public.risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  department department,
  likelihood INTEGER NOT NULL CHECK (likelihood >= 1 AND likelihood <= 5),
  impact INTEGER NOT NULL CHECK (impact >= 1 AND impact <= 5),
  risk_score INTEGER GENERATED ALWAYS AS (likelihood * impact) STORED,
  level risk_level NOT NULL,
  linked_process TEXT,
  linked_instrument_id UUID REFERENCES public.instruments(id),
  mitigation_plan TEXT,
  owner_id UUID REFERENCES auth.users(id),
  status risk_status NOT NULL DEFAULT 'identified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;

-- CAPAs table
CREATE TABLE public.capas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capa_number TEXT NOT NULL UNIQUE,
  type capa_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  root_cause TEXT,
  non_conformity_id TEXT,
  status capa_status NOT NULL DEFAULT 'open',
  assigned_to UUID REFERENCES auth.users(id),
  due_date DATE NOT NULL,
  completed_date DATE,
  effectiveness capa_effectiveness,
  linked_documents UUID[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.capas ENABLE ROW LEVEL SECURITY;

-- Audits table
CREATE TABLE public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type audit_type NOT NULL,
  audit_date DATE NOT NULL,
  auditor_id UUID REFERENCES auth.users(id),
  department department NOT NULL,
  status audit_status NOT NULL DEFAULT 'planned',
  findings_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

-- Audit checklists table
CREATE TABLE public.audit_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES public.audits(id) ON DELETE CASCADE NOT NULL,
  clause TEXT NOT NULL,
  requirement TEXT NOT NULL,
  finding audit_finding NOT NULL DEFAULT 'not-applicable',
  evidence TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_checklists ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user department
CREATE OR REPLACE FUNCTION public.get_user_department(_user_id UUID)
RETURNS department
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT department FROM public.profiles WHERE user_id = _user_id
$$;

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_instruments_updated_at BEFORE UPDATE ON public.instruments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_kpis_updated_at BEFORE UPDATE ON public.kpis FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_risks_updated_at BEFORE UPDATE ON public.risks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_capas_updated_at BEFORE UPDATE ON public.capas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_audits_updated_at BEFORE UPDATE ON public.audits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Profile creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data ->> 'full_name', new.email));
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies
-- Profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- User Roles (only admins can manage)
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Documents (viewable by all, editable based on role)
CREATE POLICY "Anyone can view documents" ON public.documents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authors can create documents" ON public.documents FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'author') OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Authors and admins can update documents" ON public.documents FOR UPDATE TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR 
  (public.has_role(auth.uid(), 'author') AND author_id = auth.uid()) OR
  (public.has_role(auth.uid(), 'reviewer') AND reviewer_id = auth.uid()) OR
  (public.has_role(auth.uid(), 'approver') AND approver_id = auth.uid())
);

-- Document Versions
CREATE POLICY "Anyone can view document versions" ON public.document_versions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authors can create versions" ON public.document_versions FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(), 'author') OR public.has_role(auth.uid(), 'admin')
);

-- Instruments
CREATE POLICY "Anyone can view instruments" ON public.instruments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins and authors can manage instruments" ON public.instruments FOR ALL TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'author')
);

-- Maintenance Logs
CREATE POLICY "Anyone can view maintenance logs" ON public.maintenance_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create logs" ON public.maintenance_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Can update unlocked logs" ON public.maintenance_logs FOR UPDATE TO authenticated USING (is_locked = false AND performed_by = auth.uid());

-- QC Logs
CREATE POLICY "Anyone can view QC logs" ON public.qc_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create QC logs" ON public.qc_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Can update unlocked QC logs" ON public.qc_logs FOR UPDATE TO authenticated USING (is_locked = false AND performed_by = auth.uid());

-- KPIs
CREATE POLICY "Anyone can view KPIs" ON public.kpis FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage KPIs" ON public.kpis FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Risks
CREATE POLICY "Anyone can view risks" ON public.risks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authors and admins can manage risks" ON public.risks FOR ALL TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'author')
);

-- CAPAs
CREATE POLICY "Anyone can view CAPAs" ON public.capas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authors and admins can manage CAPAs" ON public.capas FOR ALL TO authenticated USING (
  public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'author')
);

-- Audits
CREATE POLICY "Anyone can view audits" ON public.audits FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage audits" ON public.audits FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Audit Checklists
CREATE POLICY "Anyone can view checklists" ON public.audit_checklists FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage checklists" ON public.audit_checklists FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));