import { findByRole, render, screen, waitFor } from "@testing-library/react";
import JokeFetcher from "../components/Joke/Joke";
import { server } from "../mocks/server";

describe("Joke component", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  it("should be rendered", async() => {
    render(<JokeFetcher />);
    let h1 = screen.queryByRole("heading");
    expect(h1).toHaveTextContent(/loading/i);
//       expect(h1).toHaveTextContent(/hahaha/);//error

//     //1
//    await waitFor(() => {
//       expect(h1).toHaveTextContent(/hahaha/);
//     });

    //2
    expect(await screen.findByRole("heading") ).toHaveTextContent(/hahaha/)
  });
});
