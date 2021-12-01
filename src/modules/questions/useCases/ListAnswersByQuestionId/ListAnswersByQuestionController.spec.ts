import request from 'supertest';
import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe("ListAnswersByQuestionController", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to list all answers from question ", async () => {

        await request(app).post("/questions").send({ title: 'KEVEN' });
        const question = await request(app).get("/questions");

        if(!question.body[0].id) {
            return;
        }

        const question_id = question.body[0].id;

        await request(app).post(`/answers/${question_id}`).send({ title: 'KEVEN' });

        const response = await request(app).get(`/answers/${question_id}`);

        expect(response.body.length).toEqual(1);
        expect(response.body[0].title).toEqual('KEVEN');
        expect(response.status).toEqual(200);

    });

    it("should not be able to list answers from a non existant questions ", async () => {
        
        const response = await request(app).get(`/answers/f60d539b-e09a-4c0a-8134-a290ac3a255f`);

        expect(response.status).toEqual(400);

    });
});
