import type { UserRepository } from "@/core/application/repositories/user-repository";
import type { User } from "@/core/domain/entities/user";
import { prisma } from "@/infra/database/prisma";

export class PrismaUserRepository implements UserRepository {
	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({ where: { id } });
		if (!user) return null;
		return this.toDomain(user);
	}

	async findByGithubUsername(username: string): Promise<User | null> {
		const account = await prisma.account.findFirst({
			where: { providerId: "github", accountId: username },
			include: { user: true },
		});
		if (!account) return null;
		return this.toDomain(account.user);
	}

	private toDomain(raw: {
		id: string;
		name: string;
		email: string;
		image: string | null;
	}): User {
		return {
			id: raw.id,
			name: raw.name,
			email: raw.email,
			image: raw.image,
			githubUsername: null,
		};
	}
}
