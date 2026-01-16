-- Fix permissive INSERT policies for maintenance_logs and qc_logs
DROP POLICY IF EXISTS "Authenticated users can create logs" ON public.maintenance_logs;
DROP POLICY IF EXISTS "Authenticated users can create QC logs" ON public.qc_logs;

-- Maintenance logs - users can only insert logs where they are the performer
CREATE POLICY "Users can create their own maintenance logs" ON public.maintenance_logs 
  FOR INSERT TO authenticated 
  WITH CHECK (performed_by = auth.uid());

-- QC logs - users can only insert logs where they are the performer
CREATE POLICY "Users can create their own QC logs" ON public.qc_logs 
  FOR INSERT TO authenticated 
  WITH CHECK (performed_by = auth.uid());