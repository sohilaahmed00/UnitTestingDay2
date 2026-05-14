import { http, HttpResponse } from "msw";
import { setupServer } from 'msw/node'

const handlers=[
    http.get("https://api.chucknorris.io/jokes/random",()=>{
        return HttpResponse.json({value:"hahahaha"},{status:200})
    })/* ,
    http.post("xxx",()=>{
        ....
    }) */,
      http.get("http://localhost:3000/heroes", () => {
        return HttpResponse.json(
          [
            { id: 1, name: "Batman", strength: 10 },
            { id: 2, name: "Superman", strength: 22 },
            { id: 3, name: "Flash", strength: 5 }
          ],
          { status: 200 }
        );
      })
]

export const server=setupServer(...handlers)