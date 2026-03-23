import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/landing/hero";

jest.mock("gsap", () => ({
	timeline: () => ({
		from: jest.fn().mockReturnThis(),
	}),
	to: jest.fn(),
	registerPlugin: jest.fn(),
}));

jest.mock("@gsap/react", () => ({
	useGSAP: jest.fn(),
}));

describe("Hero", () => {
	it("renders the heading and CTA", () => {
		render(<Hero />);

		expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

		expect(
			screen.getByRole("button", { name: /explore your metrics/i }),
		).toBeInTheDocument();
	});
});
