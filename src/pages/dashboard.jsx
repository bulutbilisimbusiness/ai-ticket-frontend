import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
	const [stats, setStats] = useState({
		total: 0,
		pending: 0,
		inProgress: 0,
		completed: 0,
	});
	const [recentTickets, setRecentTickets] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem("token");

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			setUser(JSON.parse(userData));
		}
		fetchStats();
		fetchRecentTickets();
	}, []);

	const fetchStats = async () => {
		try {
			const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const tickets = await res.json();

			if (Array.isArray(tickets)) {
				const total = tickets.length;
				const pending = tickets.filter((t) => t.status === "TODO").length;
				const inProgress = tickets.filter(
					(t) => t.status === "IN_PROGRESS"
				).length;
				const completed = tickets.filter(
					(t) => t.status === "COMPLETED"
				).length;

				setStats({ total, pending, inProgress, completed });
			}
		} catch (error) {
			console.error("Failed to fetch stats:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchRecentTickets = async () => {
		try {
			const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const tickets = await res.json();

			if (Array.isArray(tickets)) {
				setRecentTickets(tickets.slice(0, 5)); // Son 5 ticket
			}
		} catch (error) {
			console.error("Failed to fetch recent tickets:", error);
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

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}

	return (
		<div className="p-6">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-base-content">🏠 Anasayfa</h1>
					<p className="text-base-content/70 mt-2">
						Hoş geldin, {user?.email || "Kullanıcı"}! Ticket sistemine genel
						bakış.
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="stat bg-base-100 rounded-box shadow">
						<div className="stat-figure text-primary">
							<svg
								className="w-8 h-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								></path>
							</svg>
						</div>
						<div className="stat-title">Toplam Tickets</div>
						<div className="stat-value text-primary">{stats.total}</div>
						<div className="stat-desc">Tüm zamanlar</div>
					</div>

					<div className="stat bg-base-100 rounded-box shadow">
						<div className="stat-figure text-warning">
							<svg
								className="w-8 h-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
						<div className="stat-title">Beklemede</div>
						<div className="stat-value text-warning">{stats.pending}</div>
						<div className="stat-desc">TODO durumunda</div>
					</div>

					<div className="stat bg-base-100 rounded-box shadow">
						<div className="stat-figure text-info">
							<svg
								className="w-8 h-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								></path>
							</svg>
						</div>
						<div className="stat-title">İşlemde</div>
						<div className="stat-value text-info">{stats.inProgress}</div>
						<div className="stat-desc">Aktif çalışılan</div>
					</div>

					<div className="stat bg-base-100 rounded-box shadow">
						<div className="stat-figure text-success">
							<svg
								className="w-8 h-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
						<div className="stat-title">Tamamlandı</div>
						<div className="stat-value text-success">{stats.completed}</div>
						<div className="stat-desc">Çözülmüş</div>
					</div>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Recent Tickets */}
					<div className="lg:col-span-2">
						<div className="card bg-base-100 shadow">
							<div className="card-body">
								<h2 className="card-title">📋 Son Tickets</h2>
								<div className="space-y-3">
									{recentTickets.length > 0 ? (
										recentTickets.map((ticket) => (
											<Link
												key={ticket._id}
												to={`/tickets/${ticket._id}`}
												className="block p-4 border rounded-lg hover:bg-base-200 transition-colors"
											>
												<div className="flex justify-between items-start">
													<div className="flex-1">
														<h3 className="font-semibold text-base-content">
															{ticket.title}
														</h3>
														<p className="text-sm text-base-content/70 mt-1">
															{ticket.description?.length > 100
																? ticket.description.substring(0, 100) + "..."
																: ticket.description}
														</p>
														<p className="text-xs text-base-content/50 mt-2">
															{new Date(ticket.createdAt).toLocaleDateString(
																"tr-TR"
															)}
														</p>
													</div>
													<span
														className={`badge ${getStatusColor(
															ticket.status
														)} ml-3`}
													>
														{ticket.status}
													</span>
												</div>
											</Link>
										))
									) : (
										<div className="text-center py-8 text-base-content/50">
											<svg
												className="w-12 h-12 mx-auto mb-4 opacity-50"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												></path>
											</svg>
											Henüz ticket oluşturulmamış
										</div>
									)}
								</div>
								<div className="card-actions justify-end mt-4">
									<Link to="/tickets" className="btn btn-outline btn-sm">
										Tümünü Görüntüle
									</Link>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Actions */}
					<div>
						<div className="card bg-base-100 shadow">
							<div className="card-body">
								<h2 className="card-title">⚡ Hızlı İşlemler</h2>
								<div className="space-y-3">
									<Link to="/tickets" className="btn btn-primary w-full">
										🎫 Yeni Ticket Oluştur
									</Link>
									<Link to="/tickets" className="btn btn-outline w-full">
										📝 Tüm Ticket'lar
									</Link>
									{user?.role === "admin" && (
										<Link to="/admin" className="btn btn-secondary w-full">
											⚙️ Yönetici Paneli
										</Link>
									)}
								</div>
							</div>
						</div>

						{/* User Info */}
						<div className="card bg-base-100 shadow mt-6">
							<div className="card-body">
								<h2 className="card-title">👤 Profil Bilgileri</h2>
								<div className="space-y-2">
									<p>
										<strong>Email:</strong> {user?.email}
									</p>
									<p>
										<strong>Rol:</strong>
										<span
											className={`badge ml-2 ${
												user?.role === "admin"
													? "badge-error"
													: user?.role === "moderator"
													? "badge-warning"
													: "badge-info"
											}`}
										>
											{user?.role === "admin"
												? "Yönetici"
												: user?.role === "moderator"
												? "Moderatör"
												: "Kullanıcı"}
										</span>
									</p>
									{user?.skills && user.skills.length > 0 && (
										<div>
											<strong>Yetenekler:</strong>
											<div className="flex flex-wrap gap-1 mt-1">
												{user.skills.map((skill, index) => (
													<span
														key={index}
														className="badge badge-outline badge-sm"
													>
														{skill}
													</span>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
