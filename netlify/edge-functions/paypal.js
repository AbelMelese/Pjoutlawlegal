export default async (request, context) => {
  const PAYPAL_CLIENT_ID = Deno.env.get("PAYPAL_CLIENT_ID");
  const PAYPAL_SECRET = Deno.env.get("PAYPAL_SECRET");
  const PAYPAL_API_BASE = Deno.env.get("PAYPAL_API_BASE") || "https://api-m.sandbox.paypal.com";

  const url = new URL(request.url);
  const path = url.pathname;

  // Set up standard CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle CORS preflight request
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Health check route
    if (path === "/api/health" && request.method === "GET") {
      return new Response(
        JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Create PayPal order
    if (path === "/api/orders" && request.method === "POST") {
      let body;
      try {
        body = await request.json();
      } catch (e) {
        return new Response(
          JSON.stringify({ error: "Invalid JSON body." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { amount, description, clientName } = body;

      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        return new Response(
          JSON.stringify({ error: "A valid payment amount is required." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const formattedAmount = Number(amount).toFixed(2);
      const order = await createOrder({
        amount: formattedAmount,
        description,
        clientName,
        PAYPAL_CLIENT_ID,
        PAYPAL_SECRET,
        PAYPAL_API_BASE,
      });

      return new Response(JSON.stringify({ id: order.id }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Capture PayPal order
    const captureMatch = path.match(/^\/api\/orders\/([^\/]+)\/capture$/);
    if (captureMatch && request.method === "POST") {
      const orderID = captureMatch[1];
      const captureData = await captureOrder(orderID, {
        PAYPAL_CLIENT_ID,
        PAYPAL_SECRET,
        PAYPAL_API_BASE,
      });

      return new Response(JSON.stringify(captureData), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default 404 response
    return new Response(
      JSON.stringify({ error: `Route not found: ${request.method} ${path}` }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Edge function error:", err.message || err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to process payment. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

/** Obtain an OAuth 2.0 access token from PayPal. */
async function getAccessToken(clientId, secret, apiBase) {
  if (!clientId || !secret) {
    throw new Error("Missing PAYPAL_CLIENT_ID or PAYPAL_SECRET in environment.");
  }
  const credentials = btoa(`${clientId}:${secret}`);

  const res = await fetch(`${apiBase}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

/** Create a PayPal order. */
async function createOrder({ amount, description, clientName, PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE }) {
  const accessToken = await getAccessToken(PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE);

  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount,
        },
        description: description || "Legal services payment",
        custom_id: clientName || "",
      },
    ],
    application_context: {
      brand_name: "Phyllis J. Outlaw & Associates",
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
    },
  };

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal create order failed (${res.status}): ${text}`);
  }

  return res.json();
}

/** Capture an approved PayPal order. */
async function captureOrder(orderID, { PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE }) {
  const accessToken = await getAccessToken(PAYPAL_CLIENT_ID, PAYPAL_SECRET, PAYPAL_API_BASE);

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal capture failed (${res.status}): ${text}`);
  }

  return res.json();
}
