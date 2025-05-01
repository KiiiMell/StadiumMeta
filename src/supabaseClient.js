import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rljbjrzhxuvcbitjyrgb.supabase.co'; // URL exacte de ton projet Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsamJqcnpoeHV2Y2JpdGp5cmdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzI3NDAsImV4cCI6MjA2MTYwODc0MH0.XNz-WPuBdFnFmpx1IsEsOYIdG9CEUkt8QKW1Y2IDaXk'; // Clé "anon public" de ton projet

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
