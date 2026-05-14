import { connectToDatabase, clearDatabase, closeDatabase } from "../../db.connection.js";

jasmine.getEnv().beforeAll(async () => {
    await connectToDatabase();
});

jasmine.getEnv().afterAll(async () => {
    await closeDatabase();
});

jasmine.getEnv().beforeEach(async () => {
    await clearDatabase();
});
