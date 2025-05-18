export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      stores: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          owner_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          owner_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          store_id: string
          name: string
          description: string | null
          price: number
          images: string[]
          features: string[]
          stock: number
          is_digital: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          name: string
          description?: string | null
          price: number
          images?: string[]
          features?: string[]
          stock?: number
          is_digital?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          name?: string
          description?: string | null
          price?: number
          images?: string[]
          features?: string[]
          stock?: number
          is_digital?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          store_id: string
          product_id: string
          customer_id: string
          customer_email: string
          status: string
          payment_status: string
          amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          product_id: string
          customer_id: string
          customer_email: string
          status?: string
          payment_status?: string
          amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          product_id?: string
          customer_id?: string
          customer_email?: string
          status?: string
          payment_status?: string
          amount?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}