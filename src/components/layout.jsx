import Navbar from "./navbar";

export default function Layout({ children }) {
	return (
		<div className="min-h-screen bg-base-200">
			<Navbar />
			<main>{children}</main>
		</div>
	);
}
