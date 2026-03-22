import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Devmetry — Track Your GitHub Metrics",
		template: "%s | Devmetry",
	},
	description:
		"Track your GitHub metrics with a beautiful developer dashboard. Commits, PRs, streaks, and more — free and open.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${jetbrainsMono.variable} h-full`}>
			<body className="flex min-h-full flex-col font-mono antialiased">
				{children}
			</body>
		</html>
	);
}
