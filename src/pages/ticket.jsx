import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

export default function TicketDetailsPage() {
	const { id } = useParams();
	const [ticket, setTicket] = useState(null);
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);
	const [user, setUser] = useState(null);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	useEffect(() => {
		const fetchTicket = async () => {
			try {
				const res = await fetch(
					`${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				const data = await res.json();
				if (res.ok) {
					setTicket(data.ticket);
				} else {
					alert(data.message || "Failed to fetch ticket details");
				}
			} catch (err) {
				console.error("Failed to fetch ticket details:", err);
				alert("Something went wrong while fetching ticket details");
			} finally {
				setLoading(false);
			}
		};
		fetchTicket();
	}, [id]);

	const updateTicketStatus = async (newStatus) => {
		setUpdating(true);
		try {
			const res = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/tickets/${id}/status`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ status: newStatus }),
				}
			);

			const data = await res.json();
			if (res.ok) {
				setTicket(data.ticket);
				alert("Ticket durumu başarıyla güncellendi!");
			} else {
				alert(data.message || "Ticket durumu güncellenemedi");
			}
		} catch (err) {
			console.error("Ticket durumu güncellenirken hata:", err);
			alert("Ticket durumu güncellenirken bir hata oluştu");
		} finally {
			setUpdating(false);
		}
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "TODO":
				return "badge-warning";
			case "IN_PROGRESS":
				return "badge-info";
			case "COMPLETED":
				return "badge-success";
			default:
				return "badge-ghost";
		}
	};

	const canUpdateStatus = () => {
		return user?.role === "admin" || user?.role === "moderator";
	};
	if (loading)
		return (
			<div className="text-center mt-10">Ticket detayları yükleniyor...</div>
		);
	if (!ticket)
		return <div className="text-center mt-10">Ticket bulunamadı</div>;
	return (
		<div className="max-w-3xl mx-auto p-6">
			<h2 className="text-2xl font-bold mb-4">Ticket Detayları</h2>

			<div className="card bg-base-100 shadow p-6 space-y-4">
				<h3 className="text-xl font-semibold">{ticket.title}</h3>
				<p>{ticket.description}</p>
				{ticket.status && (
					<>
						<div className="divider">Bilgiler</div>
						<div className="flex items-center gap-2">
							<strong>Durum:</strong>
							<span className={`badge ${getStatusColor(ticket.status)}`}>
								{ticket.status === "TODO"
									? "YAPILACAK"
									: ticket.status === "IN_PROGRESS"
									? "İŞLEMDE"
									: ticket.status === "COMPLETED"
									? "TAMAMLANDI"
									: ticket.status}
							</span>
						</div>

						{/* Status Update Buttons - Only for moderators/admins */}
						{canUpdateStatus() && (
							<div className="card bg-base-200 p-4">
								<h4 className="font-semibold mb-3">🔄 Durum Güncelle</h4>
								<div className="flex gap-2 flex-wrap">
									<button
										onClick={() => updateTicketStatus("TODO")}
										disabled={updating || ticket.status === "TODO"}
										className="btn btn-warning btn-sm"
									>
										📋 YAPILACAK
									</button>
									<button
										onClick={() => updateTicketStatus("IN_PROGRESS")}
										disabled={updating || ticket.status === "IN_PROGRESS"}
										className="btn btn-info btn-sm"
									>
										⚡ İŞLEMDE
									</button>
									<button
										onClick={() => updateTicketStatus("COMPLETED")}
										disabled={updating || ticket.status === "COMPLETED"}
										className="btn btn-success btn-sm"
									>
										✅ TAMAMLANDI
									</button>
								</div>
								{updating && (
									<div className="mt-2">
										<span className="loading loading-spinner loading-sm"></span>
										<span className="ml-2">Güncelleniyor...</span>
									</div>
								)}
							</div>
						)}
						{/* AI Analysis Results */}
						{ticket.priority && (
							<div className="flex items-center gap-2">
								<strong>Öncelik:</strong>
								<span
									className={`badge ${
										ticket.priority === "high"
											? "badge-error"
											: ticket.priority === "medium"
											? "badge-warning"
											: "badge-success"
									}`}
								>
									{ticket.priority === "high"
										? "YÜKSEK"
										: ticket.priority === "medium"
										? "ORTA"
										: "DÜŞÜK"}
								</span>
							</div>
						)}

						{ticket.relatedSkills?.length > 0 && (
							<div>
								<strong>İlgili Yetenekler:</strong>
								<div className="flex flex-wrap gap-1 mt-2">
									{ticket.relatedSkills.map((skill, index) => (
										<span key={index} className="badge badge-outline badge-sm">
											{skill}
										</span>
									))}
								</div>
							</div>
						)}

						{ticket.helpfulNotes && (
							<div className="card bg-base-200 p-4 mt-4">
								<h4 className="font-semibold mb-2">
									🤖 AI Analizi ve Öneriler
								</h4>
								<div className="prose max-w-none text-sm">
									<ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
								</div>
							</div>
						)}
						{ticket.assignedTo && (
							<p>
								<strong>Atanan Kişi:</strong> {ticket.assignedTo?.email}
							</p>
						)}
						{ticket.createdAt && (
							<p className="text-sm text-gray-500 mt-2">
								Oluşturulma Tarihi:{" "}
								{new Date(ticket.createdAt).toLocaleString("tr-TR")}
							</p>
						)}
					</>
				)}
			</div>
		</div>
	);
}
