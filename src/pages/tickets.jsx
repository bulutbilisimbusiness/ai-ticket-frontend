import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tickets() {
	const [form, setForm] = useState({ title: "", description: "" });
	const [tickets, setTickets] = useState([]);
	const [loading, setLoading] = useState(false);

	const token = localStorage.getItem("token");

	const fetchTickets = async () => {
		try {
			const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
				headers: { Authorization: `Bearer ${token}` },
				method: "GET",
			});
			const data = await res.json();
			setTickets(data || []);
		} catch (err) {
			console.error("Failed to fetch ticketsr:", err);
		}
	};
	useEffect(() => {
		fetchTickets();
	}, []);
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (res.ok) {
				setForm({ title: "", description: "" });
				fetchTickets();
			} else {
				alert(data.message || "Ticket oluşturulamadı");
			}
		} catch (err) {
			alert("Ticket oluşturulurken bir hata oluştu");
			console.error("Ticket oluşturma hatası:", err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">Ticket Oluştur</h2>
			<form onSubmit={handleSubmit} className="space-y-3 mb-8">
				<input
					name="title"
					value={form.title}
					onChange={handleChange}
					placeholder="Ticket Başlığı"
					className="input input-bordered w-full"
					required
				/>
				<textarea
					name="description"
					value={form.description}
					onChange={handleChange}
					placeholder="Ticket Açıklaması"
					className="textarea textarea-bordered w-full"
					required
				></textarea>
				<button type="submit" className="btn btn-primary" disabled={loading}>
					{loading ? "Gönderiliyor..." : "Ticket Gönder"}
				</button>
			</form>
			<h2 className="text-xl font-semibold mb-2">Tüm Ticket'lar</h2>
			<div className="space-y-3">
				{tickets.map((ticket) => (
					<Link
						key={ticket._id}
						className="card shadow-md bg-gray-800"
						to={`/tickets/${ticket._id}`}
					>
						<h3 className="font-bold text-lg">{ticket.title}</h3>
						<p className="text-sm">{ticket.description}</p>
						<p className="text-sm text-gray-500">
							Created At: {new Date(ticket.createdAt).toLocaleString()}
						</p>
					</Link>
				))}
				{tickets.length === 0 && (
					<p className="text-gray-500">Henüz ticket oluşturulmamış.</p>
				)}
			</div>
		</div>
	);
}
