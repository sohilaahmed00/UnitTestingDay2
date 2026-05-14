import { render, screen } from "@testing-library/react";
import Counter from "../components/Counter/Counter";
import { beforeEach} from "vitest";
import userEvent from "@testing-library/user-event";

describe("Counter component", () => {
    beforeEach(()=>{
        render(<Counter />);
    })
  it("should be rendered", () => {
    

    let btns = screen.getAllByRole("button");
    expect(btns).toHaveLength(3);
    let h1 = screen.getByRole("heading");
    expect(h1).toHaveTextContent(0);
  });
  it("should handle buttons",async()=>{
   let increaseBtn= screen.getByRole("button",{name:"Increment"})
   let decreaseBtn= screen.getByRole("button",{name:"Decrement"})
    let h1 = screen.getByRole("heading");
   await userEvent.click(increaseBtn)
   await userEvent.click(increaseBtn)
   await userEvent.click(increaseBtn)


   await userEvent.click(decreaseBtn)
   await userEvent.click(decreaseBtn)


   expect(h1).toHaveTextContent(1)
  })
});
