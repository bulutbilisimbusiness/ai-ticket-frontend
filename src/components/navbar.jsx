import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/login");
	};

	const isActive = (path) => {
		if (path === "/" && location.pathname === "/") return true;
		if (path !== "/" && location.pathname.startsWith(path)) return true;
		return false;
	};

	return (
		<div className="navbar bg-base-100 shadow-lg border-b">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							></path>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link to="/" className={isActive("/") ? "active" : ""}>
								🏠 Anasayfa
							</Link>
						</li>
						<li>
							<Link
								to="/tickets"
								className={isActive("/tickets") ? "active" : ""}
							>
								🎫 Ticket'lar
							</Link>
						</li>
						{user?.role === "admin" && (
							<li>
								<Link
									to="/admin"
									className={isActive("/admin") ? "active" : ""}
								>
									⚙️ Yönetici
								</Link>
							</li>
						)}
					</ul>
				</div>
				<Link to="/" className="btn btn-ghost text-xl font-bold">
					🤖 AI Ticket Assistant
				</Link>
			</div>

			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link
							to="/"
							className={`btn btn-ghost ${isActive("/") ? "btn-active" : ""}`}
						>
							🏠 Anasayfa
						</Link>
					</li>
					<li>
						<Link
							to="/tickets"
							className={`btn btn-ghost ${
								isActive("/tickets") ? "btn-active" : ""
							}`}
						>
							🎫 Ticket'lar
						</Link>
					</li>
					{user?.role === "admin" && (
						<li>
							<Link
								to="/admin"
								className={`btn btn-ghost ${
									isActive("/admin") ? "btn-active" : ""
								}`}
							>
								⚙️ Yönetici
							</Link>
						</li>
					)}
				</ul>
			</div>

			<div className="navbar-end">
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
							{user?.email?.charAt(0).toUpperCase() || "U"}
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li className="menu-title">
							<span>Merhaba, {user?.email?.split("@")[0] || "Kullanıcı"}!</span>
						</li>
						<li>
							<span className="text-sm">
								Rol:{" "}
								<span
									className={`badge badge-sm ${
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
							</span>
						</li>
						<li>
							<hr />
						</li>
						<li>
							<button onClick={handleLogout} className="text-error">
								🚪 Çıkış Yap
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
