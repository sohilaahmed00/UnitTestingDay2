import { render,screen } from "@testing-library/react";
import Heroes from "../components/Heroes/Heroes";

describe('Heroes component', () => {
 it('should be rendered without props', () => {
    render(<Heroes />)

   let p= screen.getByText(/no heroes/i)
   expect(p).toBeInTheDocument()
   expect( screen.queryByRole("list") ).not.toBeInTheDocument()
  });
 it('should be rendered with props', () => {
    let heroes=[
        {id:10,name:"super man", strength:10},
        {id:11,name:"bat man", strength:20},
    ]
    render(<Heroes heroes={heroes} />)

   let p= screen.queryByText(/no heroes/i)
   expect(p).not.toBeInTheDocument()
   expect( screen.queryByRole("list") ).toBeInTheDocument()
   let liTags= screen.queryAllByRole("listitem")
   expect(liTags.length).toBe(heroes.length)
   expect(liTags[0]).toHaveTextContent(/super man/)
  });

});