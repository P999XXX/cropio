import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get client IP from request headers
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    console.log('Client IP:', clientIP)

    // Use ip-api.com which is more reliable and has better CORS support
    const response = await fetch(`http://ip-api.com/json/${clientIP}`)
    const data = await response.json()
    console.log('Location data:', data)

    return new Response(
      JSON.stringify({ 
        country: data.countryCode || 'DE',
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
      JSON.stringify({ error: error.message, country: 'DE' }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  }
})