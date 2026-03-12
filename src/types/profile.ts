export interface Profile {
  id: string;
  full_name: string;
  insurance_type: 'Public' | 'Private' | 'None';
  updated_at?: string;
}