const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const SUPABASE_PROJECT_ID = Deno.env.get("SUPABASE_URL")!.match(
      /https:\/\/(.+?)\.supabase\.co/
    )?.[1];

    // Use Supabase's built-in email via the admin API to notify
    // Since we can't send arbitrary emails via auth, we'll log and store
    // The contact submission is already in the DB for review
    console.log(`New contact form submission from ${name} (${email}): ${message}`);

    return new Response(
      JSON.stringify({ success: true, message: "Notification logged" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Send email error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
