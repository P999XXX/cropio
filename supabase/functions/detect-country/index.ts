import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get client IP from request headers
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    console.log('Client IP:', clientIP)

    // Use ipapi.co which is more reliable for geolocation
    const response = await fetch(`https://ipapi.co/${clientIP}/json/`)
    if (!response.ok) {
      throw new Error(`Failed to fetch location data: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('Location data:', data)

    return new Response(
      JSON.stringify({ 
        country: data.country_code || 'DE',
        debug: { ip: clientIP, data } 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error detecting country:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        country: 'DE',
        debug: { error: error.message } 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200 // Return 200 even on error to handle it gracefully
      }
    )
  }
})