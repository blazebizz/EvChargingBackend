const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tecwsodqrfjplkxqrgti.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlY3dzb2RxcmZqcGxreHFyZ3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4NzYyMTUsImV4cCI6MjAwODQ1MjIxNX0.167HerPqpIhLfDsosSOn3KgFprdsQrNFgAKkLbn50tk';
const supabase = createClient(supabaseUrl, supabaseKey);

// console.log("supabase log==>", supabase);
module.exports = supabase;