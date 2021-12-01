import request from 'supertest';
import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe("DeleteAnswerController", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to delete a answer ", async () => {

        await request(app).post("/questions").send({ title: 'KEVEN' });
        const question = await request(app).get("/questions");


        const question_id = question.body[0].id;

        await request(app).post(`/answers/${question_id}`).send({ title: 'KEVEN' });


        const answer = await request(app).get(`/answers/${question_id}`);

        const id = answer.body[0].id;

        const response = await request(app).delete(`/answers/${id}`);

        expect(response.status).toEqual(200);

    });

    it("should not be able to delete a inexistent answer ", async () => {

        const response = await request(app).delete(`/answers/f60d539b-e09a-4c0a-8134-a290ac3a255f`);


        expect(response.status).toEqual(400);

    });
});
