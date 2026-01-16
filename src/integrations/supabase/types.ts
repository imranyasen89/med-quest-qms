export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      audit_checklists: {
        Row: {
          audit_id: string
          clause: string
          created_at: string
          evidence: string | null
          finding: Database["public"]["Enums"]["audit_finding"]
          id: string
          notes: string | null
          requirement: string
        }
        Insert: {
          audit_id: string
          clause: string
          created_at?: string
          evidence?: string | null
          finding?: Database["public"]["Enums"]["audit_finding"]
          id?: string
          notes?: string | null
          requirement: string
        }
        Update: {
          audit_id?: string
          clause?: string
          created_at?: string
          evidence?: string | null
          finding?: Database["public"]["Enums"]["audit_finding"]
          id?: string
          notes?: string | null
          requirement?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_checklists_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "audits"
            referencedColumns: ["id"]
          },
        ]
      }
      audits: {
        Row: {
          audit_date: string
          auditor_id: string | null
          created_at: string
          department: Database["public"]["Enums"]["department"]
          findings_count: number
          id: string
          status: Database["public"]["Enums"]["audit_status"]
          title: string
          type: Database["public"]["Enums"]["audit_type"]
          updated_at: string
        }
        Insert: {
          audit_date: string
          auditor_id?: string | null
          created_at?: string
          department: Database["public"]["Enums"]["department"]
          findings_count?: number
          id?: string
          status?: Database["public"]["Enums"]["audit_status"]
          title: string
          type: Database["public"]["Enums"]["audit_type"]
          updated_at?: string
        }
        Update: {
          audit_date?: string
          auditor_id?: string | null
          created_at?: string
          department?: Database["public"]["Enums"]["department"]
          findings_count?: number
          id?: string
          status?: Database["public"]["Enums"]["audit_status"]
          title?: string
          type?: Database["public"]["Enums"]["audit_type"]
          updated_at?: string
        }
        Relationships: []
      }
      capas: {
        Row: {
          assigned_to: string | null
          capa_number: string
          completed_date: string | null
          created_at: string
          description: string
          due_date: string
          effectiveness:
            | Database["public"]["Enums"]["capa_effectiveness"]
            | null
          id: string
          linked_documents: string[] | null
          non_conformity_id: string | null
          root_cause: string | null
          status: Database["public"]["Enums"]["capa_status"]
          title: string
          type: Database["public"]["Enums"]["capa_type"]
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          capa_number: string
          completed_date?: string | null
          created_at?: string
          description: string
          due_date: string
          effectiveness?:
            | Database["public"]["Enums"]["capa_effectiveness"]
            | null
          id?: string
          linked_documents?: string[] | null
          non_conformity_id?: string | null
          root_cause?: string | null
          status?: Database["public"]["Enums"]["capa_status"]
          title: string
          type: Database["public"]["Enums"]["capa_type"]
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          capa_number?: string
          completed_date?: string | null
          created_at?: string
          description?: string
          due_date?: string
          effectiveness?:
            | Database["public"]["Enums"]["capa_effectiveness"]
            | null
          id?: string
          linked_documents?: string[] | null
          non_conformity_id?: string | null
          root_cause?: string | null
          status?: Database["public"]["Enums"]["capa_status"]
          title?: string
          type?: Database["public"]["Enums"]["capa_type"]
          updated_at?: string
        }
        Relationships: []
      }
      document_versions: {
        Row: {
          change_description: string
          changed_at: string
          changed_by: string
          document_id: string
          id: string
          previous_version: string | null
          version: string
        }
        Insert: {
          change_description: string
          changed_at?: string
          changed_by: string
          document_id: string
          id?: string
          previous_version?: string | null
          version: string
        }
        Update: {
          change_description?: string
          changed_at?: string
          changed_by?: string
          document_id?: string
          id?: string
          previous_version?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_versions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          approver_id: string | null
          author_id: string | null
          content: string | null
          created_at: string
          department: Database["public"]["Enums"]["department"]
          description: string | null
          document_number: string
          effective_date: string | null
          id: string
          iso_clauses: string[] | null
          level: Database["public"]["Enums"]["document_level"]
          review_date: string | null
          reviewer_id: string | null
          status: Database["public"]["Enums"]["document_status"]
          title: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string
          version: string
        }
        Insert: {
          approver_id?: string | null
          author_id?: string | null
          content?: string | null
          created_at?: string
          department: Database["public"]["Enums"]["department"]
          description?: string | null
          document_number: string
          effective_date?: string | null
          id?: string
          iso_clauses?: string[] | null
          level: Database["public"]["Enums"]["document_level"]
          review_date?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          title: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string
          version?: string
        }
        Update: {
          approver_id?: string | null
          author_id?: string | null
          content?: string | null
          created_at?: string
          department?: Database["public"]["Enums"]["department"]
          description?: string | null
          document_number?: string
          effective_date?: string | null
          id?: string
          iso_clauses?: string[] | null
          level?: Database["public"]["Enums"]["document_level"]
          review_date?: string | null
          reviewer_id?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          title?: string
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      instruments: {
        Row: {
          amc_expiry: string | null
          amc_status: Database["public"]["Enums"]["amc_status"]
          asset_code: string
          calibration_due_date: string | null
          created_at: string
          criticality: Database["public"]["Enums"]["instrument_criticality"]
          department: Database["public"]["Enums"]["department"]
          id: string
          installation_date: string
          last_maintenance_date: string | null
          last_qc_date: string | null
          linked_documents: string[] | null
          location: string
          manufacturer: string
          model: string
          name: string
          serial_number: string
          status: Database["public"]["Enums"]["instrument_status"]
          updated_at: string
          warranty_expiry: string | null
        }
        Insert: {
          amc_expiry?: string | null
          amc_status?: Database["public"]["Enums"]["amc_status"]
          asset_code: string
          calibration_due_date?: string | null
          created_at?: string
          criticality?: Database["public"]["Enums"]["instrument_criticality"]
          department: Database["public"]["Enums"]["department"]
          id?: string
          installation_date: string
          last_maintenance_date?: string | null
          last_qc_date?: string | null
          linked_documents?: string[] | null
          location: string
          manufacturer: string
          model: string
          name: string
          serial_number: string
          status?: Database["public"]["Enums"]["instrument_status"]
          updated_at?: string
          warranty_expiry?: string | null
        }
        Update: {
          amc_expiry?: string | null
          amc_status?: Database["public"]["Enums"]["amc_status"]
          asset_code?: string
          calibration_due_date?: string | null
          created_at?: string
          criticality?: Database["public"]["Enums"]["instrument_criticality"]
          department?: Database["public"]["Enums"]["department"]
          id?: string
          installation_date?: string
          last_maintenance_date?: string | null
          last_qc_date?: string | null
          linked_documents?: string[] | null
          location?: string
          manufacturer?: string
          model?: string
          name?: string
          serial_number?: string
          status?: Database["public"]["Enums"]["instrument_status"]
          updated_at?: string
          warranty_expiry?: string | null
        }
        Relationships: []
      }
      kpis: {
        Row: {
          category: Database["public"]["Enums"]["kpi_category"]
          created_at: string
          current_value: number
          department: Database["public"]["Enums"]["department"] | null
          id: string
          iso_clause: string | null
          name: string
          target: number
          trend: Database["public"]["Enums"]["kpi_trend"]
          unit: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["kpi_category"]
          created_at?: string
          current_value?: number
          department?: Database["public"]["Enums"]["department"] | null
          id?: string
          iso_clause?: string | null
          name: string
          target: number
          trend?: Database["public"]["Enums"]["kpi_trend"]
          unit: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["kpi_category"]
          created_at?: string
          current_value?: number
          department?: Database["public"]["Enums"]["department"] | null
          id?: string
          iso_clause?: string | null
          name?: string
          target?: number
          trend?: Database["public"]["Enums"]["kpi_trend"]
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      maintenance_logs: {
        Row: {
          action_taken: string | null
          created_at: string
          description: string
          findings: string | null
          id: string
          instrument_id: string
          is_locked: boolean
          next_due_date: string | null
          performed_at: string
          performed_by: string
          type: Database["public"]["Enums"]["maintenance_type"]
        }
        Insert: {
          action_taken?: string | null
          created_at?: string
          description: string
          findings?: string | null
          id?: string
          instrument_id: string
          is_locked?: boolean
          next_due_date?: string | null
          performed_at?: string
          performed_by: string
          type: Database["public"]["Enums"]["maintenance_type"]
        }
        Update: {
          action_taken?: string | null
          created_at?: string
          description?: string
          findings?: string | null
          id?: string
          instrument_id?: string
          is_locked?: boolean
          next_due_date?: string | null
          performed_at?: string
          performed_by?: string
          type?: Database["public"]["Enums"]["maintenance_type"]
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_logs_instrument_id_fkey"
            columns: ["instrument_id"]
            isOneToOne: false
            referencedRelation: "instruments"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          department: Database["public"]["Enums"]["department"] | null
          designation: string | null
          full_name: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: Database["public"]["Enums"]["department"] | null
          designation?: string | null
          full_name: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: Database["public"]["Enums"]["department"] | null
          designation?: string | null
          full_name?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      qc_logs: {
        Row: {
          control_level: string | null
          corrective_action: string | null
          created_at: string
          deviation: string | null
          expected_range: string | null
          expiry_date: string | null
          id: string
          instrument_id: string
          is_locked: boolean
          lot_number: string | null
          observed_value: number | null
          performed_at: string
          performed_by: string
          result: Database["public"]["Enums"]["qc_result"]
          test_name: string
        }
        Insert: {
          control_level?: string | null
          corrective_action?: string | null
          created_at?: string
          deviation?: string | null
          expected_range?: string | null
          expiry_date?: string | null
          id?: string
          instrument_id: string
          is_locked?: boolean
          lot_number?: string | null
          observed_value?: number | null
          performed_at?: string
          performed_by: string
          result: Database["public"]["Enums"]["qc_result"]
          test_name: string
        }
        Update: {
          control_level?: string | null
          corrective_action?: string | null
          created_at?: string
          deviation?: string | null
          expected_range?: string | null
          expiry_date?: string | null
          id?: string
          instrument_id?: string
          is_locked?: boolean
          lot_number?: string | null
          observed_value?: number | null
          performed_at?: string
          performed_by?: string
          result?: Database["public"]["Enums"]["qc_result"]
          test_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "qc_logs_instrument_id_fkey"
            columns: ["instrument_id"]
            isOneToOne: false
            referencedRelation: "instruments"
            referencedColumns: ["id"]
          },
        ]
      }
      risks: {
        Row: {
          category: string
          created_at: string
          department: Database["public"]["Enums"]["department"] | null
          description: string
          id: string
          impact: number
          level: Database["public"]["Enums"]["risk_level"]
          likelihood: number
          linked_instrument_id: string | null
          linked_process: string | null
          mitigation_plan: string | null
          owner_id: string | null
          risk_score: number | null
          status: Database["public"]["Enums"]["risk_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          department?: Database["public"]["Enums"]["department"] | null
          description: string
          id?: string
          impact: number
          level: Database["public"]["Enums"]["risk_level"]
          likelihood: number
          linked_instrument_id?: string | null
          linked_process?: string | null
          mitigation_plan?: string | null
          owner_id?: string | null
          risk_score?: number | null
          status?: Database["public"]["Enums"]["risk_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          department?: Database["public"]["Enums"]["department"] | null
          description?: string
          id?: string
          impact?: number
          level?: Database["public"]["Enums"]["risk_level"]
          likelihood?: number
          linked_instrument_id?: string | null
          linked_process?: string | null
          mitigation_plan?: string | null
          owner_id?: string | null
          risk_score?: number | null
          status?: Database["public"]["Enums"]["risk_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risks_linked_instrument_id_fkey"
            columns: ["linked_instrument_id"]
            isOneToOne: false
            referencedRelation: "instruments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          department: Database["public"]["Enums"]["department"] | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: Database["public"]["Enums"]["department"] | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          department?: Database["public"]["Enums"]["department"] | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_department: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["department"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      amc_status: "active" | "expired" | "pending-renewal"
      app_role: "admin" | "author" | "reviewer" | "approver" | "viewer"
      audit_finding:
        | "conforming"
        | "minor-nc"
        | "major-nc"
        | "observation"
        | "not-applicable"
      audit_status: "planned" | "in-progress" | "completed" | "closed"
      audit_type: "internal" | "external" | "surveillance"
      capa_effectiveness: "effective" | "partially-effective" | "not-effective"
      capa_status: "open" | "in-progress" | "verification" | "closed"
      capa_type: "corrective" | "preventive"
      department:
        | "reception"
        | "microbiology"
        | "chemical-pathology"
        | "hematology"
        | "blood-bank"
      document_level:
        | "policy"
        | "manual"
        | "process"
        | "sop"
        | "work-instruction"
        | "form"
        | "record"
      document_status:
        | "draft"
        | "under-review"
        | "approved"
        | "released"
        | "obsolete"
        | "rejected"
      document_type:
        | "quality-policy"
        | "quality-manual"
        | "organogram"
        | "job-description"
        | "sop"
        | "work-instruction"
        | "flowchart"
        | "form"
        | "checklist"
        | "template"
      instrument_criticality: "critical" | "major" | "minor"
      instrument_status:
        | "operational"
        | "under-maintenance"
        | "out-of-service"
        | "decommissioned"
      kpi_category:
        | "pre-analytical"
        | "analytical"
        | "post-analytical"
        | "equipment"
      kpi_trend: "up" | "down" | "stable"
      maintenance_type: "preventive" | "breakdown" | "calibration"
      qc_result: "pass" | "fail" | "conditional"
      risk_level: "low" | "medium" | "high" | "critical"
      risk_status: "identified" | "mitigated" | "accepted" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      amc_status: ["active", "expired", "pending-renewal"],
      app_role: ["admin", "author", "reviewer", "approver", "viewer"],
      audit_finding: [
        "conforming",
        "minor-nc",
        "major-nc",
        "observation",
        "not-applicable",
      ],
      audit_status: ["planned", "in-progress", "completed", "closed"],
      audit_type: ["internal", "external", "surveillance"],
      capa_effectiveness: ["effective", "partially-effective", "not-effective"],
      capa_status: ["open", "in-progress", "verification", "closed"],
      capa_type: ["corrective", "preventive"],
      department: [
        "reception",
        "microbiology",
        "chemical-pathology",
        "hematology",
        "blood-bank",
      ],
      document_level: [
        "policy",
        "manual",
        "process",
        "sop",
        "work-instruction",
        "form",
        "record",
      ],
      document_status: [
        "draft",
        "under-review",
        "approved",
        "released",
        "obsolete",
        "rejected",
      ],
      document_type: [
        "quality-policy",
        "quality-manual",
        "organogram",
        "job-description",
        "sop",
        "work-instruction",
        "flowchart",
        "form",
        "checklist",
        "template",
      ],
      instrument_criticality: ["critical", "major", "minor"],
      instrument_status: [
        "operational",
        "under-maintenance",
        "out-of-service",
        "decommissioned",
      ],
      kpi_category: [
        "pre-analytical",
        "analytical",
        "post-analytical",
        "equipment",
      ],
      kpi_trend: ["up", "down", "stable"],
      maintenance_type: ["preventive", "breakdown", "calibration"],
      qc_result: ["pass", "fail", "conditional"],
      risk_level: ["low", "medium", "high", "critical"],
      risk_status: ["identified", "mitigated", "accepted", "closed"],
    },
  },
} as const
