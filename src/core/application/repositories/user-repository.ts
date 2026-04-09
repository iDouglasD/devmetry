import type { User } from "@/core/domain/entities/user";

export interface UserRepository {
	findById(id: string): Promise<User | null>;
	findByGithubUsername(username: string): Promise<User | null>;
}
