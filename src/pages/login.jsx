import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (res.ok) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", JSON.stringify(data.user));

				navigate("/");
			} else {
				alert(data.message || "Login failed");
			}
		} catch (error) {
			alert("Login - something went wrong");
			console.error("Login error:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200">
			<div className="card w-full max-w-sm shadow-xl bg-base-100">
				<form onSubmit={handleLogin} className="card-body">
					<h2 className="card-title justify-center">Login</h2>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={form.email}
						onChange={handleChange}
						className="input input-bordered"
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={form.password}
						onChange={handleChange}
						className="input input-bordered"
						required
					/>
					<div className="form-control mt-4">
						<button
							type="submit"
							className="btn btn-primary w-full"
							disabled={loading}
						>
							{loading ? "Logging in..." : "Log In"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
