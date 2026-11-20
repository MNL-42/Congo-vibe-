import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "GET") return Response.json({ error: "Méthode non autorisée" }, { status: 405, headers: cors });

  const key = Deno.env.get("PIXABAY_API_KEY");
  if (!key) return Response.json({ error: "PIXABAY_API_KEY manquante dans les secrets Supabase" }, { status: 503, headers: cors });

  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "Congo Kinshasa").trim().slice(0, 80);
  if (!q) return Response.json({ videos: [] }, { headers: { ...cors, "Cache-Control": "public, max-age=86400" } });

  try {
    const endpoint = new URL("https://pixabay.com/api/videos/");
    endpoint.searchParams.set("key", key);
    endpoint.searchParams.set("q", q);
    endpoint.searchParams.set("lang", "fr");
    endpoint.searchParams.set("per_page", "12");
    endpoint.searchParams.set("safesearch", "true");
    endpoint.searchParams.set("video_type", "film");

    const upstream = await fetch(endpoint.toString(), { headers: { "Accept": "application/json" } });
    if (!upstream.ok) {
      return Response.json({ error: "Pixabay ne répond pas correctement (" + upstream.status + ")" }, { status: 502, headers: cors });
    }
    const payload = await upstream.json();
    const videos = (payload.hits || []).map((hit: any) => {
      const rendition = hit.videos?.medium || hit.videos?.small;
      return rendition?.url ? {
        id: hit.id,
        title: String(hit.tags || "Découverte Congo").slice(0, 120),
        url: rendition.url,
        thumbnail: rendition.thumbnail || "",
        creator: hit.user || "Pixabay",
        source: hit.pageURL || "https://pixabay.com/",
      } : null;
    }).filter(Boolean);

    return Response.json({ videos }, {
      headers: { ...cors, "Cache-Control": "public, max-age=86400" },
    });
  } catch (_error) {
    return Response.json({ error: "Impossible de contacter la source vidéo pour le moment." }, { status: 502, headers: cors });
  }
});
