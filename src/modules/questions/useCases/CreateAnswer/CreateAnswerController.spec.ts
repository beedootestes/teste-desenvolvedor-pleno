import request from 'supertest';
import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe("CreateAnswerController", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to cerate a answer ", async () => {

        await request(app).post("/questions").send({ title: 'KEVEN' });
        const question = await request(app).get("/questions");


        const question_id = question.body[0].id;

        const response = await request(app).post(`/answers/${question_id}`).send({ title: 'KEVEN' });



        expect(response.status).toEqual(201);

    });

    it("should not be able to create answer with for one inexistent question ", async () => {

        const response = await request(app).post(`/answers/f60d539b-e09a-4c0a-8134-a290ac3a255f`).send({ title: 'KEVEN' });

        expect(response.status).toEqual(400);

    });

    it("shouldn't be able to create a duplicated answer", async () => {
       
        await request(app).post("/questions").send({ title: 'KEVEN' });
        const question = await request(app).get("/questions");


        const question_id = question.body[0].id;

        await request(app).post(`/answers/${question_id}`).send({ title: 'KEVEN' });

        const response = await request(app).post(`/answers/${question_id}`).send({ title: 'KEVEN' });




        expect(response.status).toBe(400);
    });

});
