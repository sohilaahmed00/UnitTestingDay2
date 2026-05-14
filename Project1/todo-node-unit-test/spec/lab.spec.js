const request = require("supertest");
const app = require("..");
const { clearDatabase } = require("../db.connection");

describe("lab testing:", () => {
    const testAgent = request(app);
    afterEach(async () => {
        await clearDatabase();
    });

    describe("users routes:", () => {
        it("(GET /api/user/search) should respond with the correct user with the name requested", async () => {
            let newUser = { name: "Test User", email: "test@example.com", password: "123456" };
            await testAgent.post("/api/user/signup").send(newUser);

            let res = await testAgent.get("/api/user/search").query({ name: "Test User" });
            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.name).toBe("Test User");
            expect(res.body.data.email).toBe("test@example.com");
        });

        it("GET /api/user/search with invalid name should respond with status 404 and the message", async () => {
            let res = await testAgent.get("/api/user/search").query({ name: "NoUser" });
            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/There is no user with name/i);
        });

        it("(GET /api/user/id) with id not exists: should respond with status 404 and the message", async () => {
            let res = await testAgent.get("/api/user/000000000000000000000000");
            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/there is no user with this id/i);
        });
    });

    describe("todos routes:", () => {
        it("(PATCH /api/todo/:id) with id and title: should respond with status 200 and the new todo", async () => {
            let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
            await testAgent.post("/api/user/signup").send(newUser);
            let resLogin = await testAgent.post("/api/user/login").send(newUser);
            let token = resLogin.body.data;

            let todoRes = await testAgent
                .post("/api/todo")
                .set("authorization", token)
                .send({ title: "Old Title" });
            let todoId = todoRes.body.data._id;

            let res = await testAgent
                .patch(`/api/todo/${todoId}`)
                .set("authorization", token)
                .send({ title: "New Title" });

            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.title).toBe("New Title");
            expect(res.body.data._id).toBe(todoId);
        });

        it("(GET /api/todo/user): should respond with the user's all todos", async () => {
            let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
            await testAgent.post("/api/user/signup").send(newUser);
            let resLogin = await testAgent.post("/api/user/login").send(newUser);
            let token = resLogin.body.data;

            await testAgent
                .post("/api/todo")
                .set("authorization", token)
                .send({ title: "User todo" });

            let res = await testAgent.get("/api/todo/user").set("authorization", token);

            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.data.length).toBe(1);
            expect(res.body.data[0].title).toBe("User todo");
        });

        it("(GET /api/todo/user): for a user hasn't any todo, should respond with status 200 and a message", async () => {
            let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
            await testAgent.post("/api/user/signup").send(newUser);
            let resLogin = await testAgent.post("/api/user/login").send(newUser);
            let token = resLogin.body.data;

            let res = await testAgent.get("/api/todo/user").set("authorization", token);

            expect(res.status).toBe(200);
            expect(res.body.message).toMatch(/Couldn't find any todos for this user/i);
        });
    });
});
