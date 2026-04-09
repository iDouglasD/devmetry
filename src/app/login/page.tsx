"use client";

import { authClient } from "@/infra/auth/auth-client";

export default function LoginPage() {
	const handleSignIn = async () => {
		await authClient.signIn.social({
			provider: "github",
			callbackURL: "/dashboard",
		});
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-6">
			<h1 className="font-bold text-2xl">Sign in to Devmetry</h1>
			<button
				type="button"
				onClick={handleSignIn}
				className="cursor-pointer rounded-lg bg-zinc-800 px-4 py-2 text-sm text-white transition-colors hover:bg-zinc-700"
			>
				Sign in with GitHub
			</button>
		</main>
	);
}
