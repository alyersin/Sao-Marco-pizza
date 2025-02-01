import { connectToDatabase } from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address is required." });
    }

    try {
      const db = await connectToDatabase();
      const userId = req.user.id;

      await db
        .collection("users")
        .updateOne({ _id: userId }, { $set: { address: address } });

      return res.status(200).json({ message: "Address updated successfully." });
    } catch (error) {
      console.error("Error updating address:", error);
      return res.status(500).json({ message: "Error updating address." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
