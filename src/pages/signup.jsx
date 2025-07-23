import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
	const [form, setForm] = useState({ email: "", password: "", skills: "" });
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSignup = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await fetch(
				`${import.meta.env.VITE_SERVER_URL}/auth/signup`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...form,
						skills: form.skills
							? form.skills.split(",").map((s) => s.trim())
							: [],
					}),
				}
			);
			const data = await res.json();
			if (res.ok) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("user", JSON.stringify(data.user));

				navigate("/");
			} else {
				alert(data.message || "Signup failed");
			}
		} catch (error) {
			alert("Signup -something went wrong");
			console.error("Signup error:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-base-200">
			<div className="card w-full max-w-sm shadow-xl bg-base-100">
				<form onSubmit={handleSignup} className="card-body">
					<h2 className="card-title justify-center">Sign Up</h2>
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
					<input
						type="text"
						name="skills"
						placeholder="Skills (comma separated, optional)"
						value={form.skills}
						onChange={handleChange}
						className="input input-bordered"
					/>
					<div className="form-control mt-4">
						<button
							type="submit"
							className="btn btn-primary w-full"
							disabled={loading}
						>
							{loading ? "Signing up..." : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
