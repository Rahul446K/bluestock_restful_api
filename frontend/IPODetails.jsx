import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIPODetail } from "../services/ipoService";

export default function IPODetail() {
  const { id } = useParams();
  const [ipo, setIpo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getIPO() {
      try {
        const data = await fetchIPODetail(id);
        setIpo(data);
      } catch (err) {
        console.error("Error fetching IPO detail:", err);
      } finally {
        setLoading(false);
      }
    }
    getIPO();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!ipo) return <div className="p-4 text-red-500">IPO not found</div>;

  return (
    <div className="p-6 max-w-xl mx-auto border rounded shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4">{ipo.name}</h1>
      <p><strong>Date:</strong> {ipo.date}</p>
      <p><strong>Price:</strong> {ipo.price}</p>
      <p><strong>Description:</strong> {ipo.description || "No description provided."}</p>
    </div>
  );
}