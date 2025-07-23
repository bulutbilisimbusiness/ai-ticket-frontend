import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckAuth from "./components/check-auth";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Tickets from "./pages/tickets";
import TicketDetailPage from "./pages/ticket";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Admin from "./pages/admin";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<CheckAuth protected={true}>
							<Layout>
								<Dashboard />
							</Layout>
						</CheckAuth>
					}
				/>
				<Route
					path="/tickets"
					element={
						<CheckAuth protected={true}>
							<Layout>
								<Tickets />
							</Layout>
						</CheckAuth>
					}
				/>
				<Route
					path="/tickets/:id"
					element={
						<CheckAuth protected={true}>
							<Layout>
								<TicketDetailPage />
							</Layout>
						</CheckAuth>
					}
				/>
				<Route
					path="/login"
					element={
						<CheckAuth protected={false}>
							<Login />
						</CheckAuth>
					}
				/>
				<Route
					path="/signup"
					element={
						<CheckAuth protected={false}>
							<Signup />
						</CheckAuth>
					}
				/>
				<Route
					path="/admin"
					element={
						<CheckAuth protected={true}>
							<Layout>
								<Admin />
							</Layout>
						</CheckAuth>
					}
				/>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
