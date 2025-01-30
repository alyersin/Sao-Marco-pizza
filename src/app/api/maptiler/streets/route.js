import axios from "axios";

const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;

export async function GET(req) {
  try {
    const response = await axios.get(
      `https://api.maptiler.com/geocoding/street.json`,
      {
        params: {
          key: MAPTILER_API_KEY,
          country: "ro",
          layers: "street",
          region: "Constanta",
        },
      }
    );
    const streets = response.data.features.map((feature) => feature.text);
    return new Response(JSON.stringify(streets), { status: 200 });
  } catch (error) {
    console.error("Error fetching streets:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch streets" }), {
      status: 500,
    });
  }
}
