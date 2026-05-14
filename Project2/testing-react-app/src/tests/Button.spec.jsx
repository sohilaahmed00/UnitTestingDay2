import { render,screen } from "@testing-library/react";
import Button from "../components/Button/Button";
import {  vi } from "vitest";
import userEvent from "@testing-library/user-event";


describe('Button component', () => {
    it('should be rendered', () => {
        
        // <Button> click me </Button>
        render(<Button>click me</Button>)
        //  assert
        //  access DOM btn 
       let btn= screen.getByRole("button")
       expect(btn).toBeInTheDocument()
       expect(btn).toHaveTextContent("click me")
    });
    it("should call click handler",async()=>{
        let clickHandler=vi.fn()//mocking
        render(<Button onClick={clickHandler}>click me</Button>)
        // const user = userEvent.setup()
        //access btn
        let btn=screen.getByRole("button")
        //fire click btn
       await userEvent.click(btn)
        //assert
        expect(clickHandler).toHaveBeenCalledOnce()
    })
});