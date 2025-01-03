export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          bank_account_holder: string | null
          bank_address: string | null
          bank_details: Json | null
          bank_name: string | null
          bic: string | null
          company_address: string | null
          company_country: string | null
          company_documents: Json | null
          company_name: string
          company_phone: string | null
          company_place: string | null
          company_postal_code: string | null
          company_street: string | null
          created_at: string
          email: string
          first_name: string | null
          iban: string | null
          id: string
          last_name: string | null
          role: string
          tax_number: string | null
          updated_at: string
          vat_number: string | null
        }
        Insert: {
          bank_account_holder?: string | null
          bank_address?: string | null
          bank_details?: Json | null
          bank_name?: string | null
          bic?: string | null
          company_address?: string | null
          company_country?: string | null
          company_documents?: Json | null
          company_name: string
          company_phone?: string | null
          company_place?: string | null
          company_postal_code?: string | null
          company_street?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          iban?: string | null
          id: string
          last_name?: string | null
          role: string
          tax_number?: string | null
          updated_at?: string
          vat_number?: string | null
        }
        Update: {
          bank_account_holder?: string | null
          bank_address?: string | null
          bank_details?: Json | null
          bank_name?: string | null
          bic?: string | null
          company_address?: string | null
          company_country?: string | null
          company_documents?: Json | null
          company_name?: string
          company_phone?: string | null
          company_place?: string | null
          company_postal_code?: string | null
          company_street?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          iban?: string | null
          id?: string
          last_name?: string | null
          role?: string
          tax_number?: string | null
          updated_at?: string
          vat_number?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          department: string
          email: string
          first_name: string | null
          id: string
          invitation_token: string | null
          invited_by: string
          last_name: string | null
          profile_id: string
          role: Database["public"]["Enums"]["team_member_role"]
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string
          email: string
          first_name?: string | null
          id?: string
          invitation_token?: string | null
          invited_by: string
          last_name?: string | null
          profile_id: string
          role?: Database["public"]["Enums"]["team_member_role"]
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          email?: string
          first_name?: string | null
          id?: string
          invitation_token?: string | null
          invited_by?: string
          last_name?: string | null
          profile_id?: string
          role?: Database["public"]["Enums"]["team_member_role"]
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      team_member_role: "administrator" | "editor" | "readonly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
