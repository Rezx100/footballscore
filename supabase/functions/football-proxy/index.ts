import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const ESPN = 'https://site.api.espn.com/apis/site/v2/sports/soccer';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  const url = new URL(req.url);
  const day = url.searchParams.get('date') ?? new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const league = url.searchParams.get('league') ?? 'eng.1';
  const event = url.searchParams.get('event');
  const apiKey = Deno.env.get('FOOTBALL_API_KEY');
  const host = Deno.env.get('FOOTBALL_API_HOST') ?? 'v3.football.api-sports.io';

  try {
    if (apiKey) {
      const path = event
        ? `https://${host}/fixtures?id=${event}`
        : `https://${host}/fixtures?date=${day.slice(0, 4)}-${day.slice(4, 6)}-${day.slice(6, 8)}`;
      const response = await fetch(path, {
        headers: { 'x-apisports-key': apiKey },
      });
      const json = await response.json();
      return new Response(JSON.stringify({ source: 'api-football', data: json }), {
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const espnPath = event
      ? `${ESPN}/${league}/summary?event=${event}`
      : `${ESPN}/${league}/scoreboard?dates=${day}`;
    const response = await fetch(espnPath, {
      headers: { Accept: 'application/json' },
    });
    const json = await response.json();
    return new Response(JSON.stringify({ source: 'espn', data: json }), {
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ source: 'error', message: String(error) }), {
      status: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
