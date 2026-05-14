import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "../../mocks/server";
import Status from "./Status";
import HeroesFromAPI from "./Heroes";

describe("Status component", () => {
  it('should render "Offline" and the toggle button on initial render', () => {
    render(<Status />);

    expect(screen.getByText(/offline/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /toggle status/i })).toBeInTheDocument();
  });

  it('should switch to "Online" when button is clicked once', async () => {
    render(<Status />);
    const button = screen.getByRole("button", { name: /toggle status/i });

    await userEvent.click(button);

    expect(screen.getByText(/online/i)).toBeInTheDocument();
  });

  it('should switch back to "Offline" when button is clicked twice', async () => {
    render(<Status />);
    const button = screen.getByRole("button", { name: /toggle status/i });

    await userEvent.click(button);
    await userEvent.click(button);

    expect(screen.getByText(/offline/i)).toBeInTheDocument();
  });
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("HeroesFromAPI component", () => {
  it('should display "No heroes available" when API returns an empty list', async () => {
    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json([], { status: 200 });
      })
    );

    render(<HeroesFromAPI />);

    expect(await screen.findByText(/no heroes available/i)).toBeInTheDocument();
  });

  it("should render a list of heroes after successful API fetch", async () => {
    render(<HeroesFromAPI />);

    expect(await screen.findByText(/Batman: power=10 \(strong\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Superman: power=22 \(unbelievable\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Flash: power=5 \(weak\)/i)).toBeInTheDocument();
  });

  it("BONUS: should display an error message when API request fails with status 500", async () => {
    server.use(
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json({ message: "Server error" }, { status: 500 });
      })
    );

    render(<HeroesFromAPI />);

    expect(await screen.findByRole("heading")).toHaveTextContent(/failed to fetch heroes/i);
  });
});
