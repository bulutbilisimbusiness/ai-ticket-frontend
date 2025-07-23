import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function CheckAuth({ children, protected: protectedRoute }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (protectedRoute) {
			if (!token) {
				navigate("/login");
			} else {
				setLoading(false);
			}
		} else {
			if (token) {
				navigate("/");
			} else {
				setLoading(false);
			}
		}
	}, [navigate, protectedRoute]);
	if (loading) {
		return <div>Loading...</div>;
	}
	return <>{children}</>;
}

export default CheckAuth;
