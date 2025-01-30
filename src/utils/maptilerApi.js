// import axios from "axios";

// const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

// export const fetchCities = async () => {
//   try {
//     const response = await axios.get(
//       `https://api.maptiler.com/geocoding/constanta.json`,
//       {
//         params: {
//           key: MAPTILER_API_KEY,
//           country: "ro",
//           layers: "locality",
//         },
//       }
//     );
//     return response.data.features.map((feature) => feature.text);
//   } catch (error) {
//     console.error("Error fetching cities:", error);
//     return [];
//   }
// };

// export const fetchStreets = async () => {
//   try {
//     const response = await axios.get(
//       `https://api.maptiler.com/geocoding/street.json`,
//       {
//         params: {
//           key: MAPTILER_API_KEY,
//           country: "ro",
//           layers: "street",
//           region: "Constanta",
//         },
//       }
//     );
//     return response.data.features.map((feature) => feature.text);
//   } catch (error) {
//     console.error("Error fetching streets:", error);
//     return [];
//   }
// };
