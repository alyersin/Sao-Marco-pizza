import axios from "axios";

const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

export async function GET(req) {
  try {
    const response = await axios.get(
      `https://api.maptiler.com/geocoding/constanta.json`,
      {
        params: {
          key: MAPTILER_API_KEY,
          country: "ro",
          layers: "locality",
        },
      }
    );
    const cities = response.data.features.map((feature) => feature.text);
    return new Response(JSON.stringify(cities), { status: 200 });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch cities" }), {
      status: 500,
    });
  }
}
