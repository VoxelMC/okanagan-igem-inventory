import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient("https://jzwsuikgrtqtzmxglwjb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6d3N1aWtncnRxdHpteGdsd2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0NTUwMDEsImV4cCI6MjAwNzAzMTAwMX0.IVkFlXsGk4o_FEq1pEs5Ui2aC7EWTcxChGQNFH-wSK8");

export default supabase;
