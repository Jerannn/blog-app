import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rmyzfhngqjjkxwcoebfk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJteXpmaG5ncWpqa3h3Y29lYmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxMDI1MjIsImV4cCI6MjA4MzY3ODUyMn0.yUOHJDz0QYTefuSBgijFkVlPiPdZjUmocBVtaK1_S1U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
