"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/infra/auth/auth-client";

export default function DashboardPage() {
	const router = useRouter();

	const handleSignOut = async () => {
		await authClient.signOut();
		router.push("/login");
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-6">
			<h1 className="font-bold text-2xl">Dashboard — em construcao</h1>
			<button
				type="button"
				onClick={handleSignOut}
				className="cursor-pointer rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-700"
			>
				Sign out
			</button>
		</main>
	);
}
