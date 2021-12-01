import request from 'supertest';
import { app } from '@shared/infra/http/app';

import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe("UpdateAnswerTitleController", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to update a answer title ", async () => {

        await request(app).post("/questions").send({ title: 'test' });
        const question = await request(app).get("/questions");


        const question_id = question.body[0].id;

        await request(app).post(`/answers/${question_id}`).send({ title: 'test' });

        const answer = await request(app).get(`/answers/${question_id}`);


        const {id} = answer.body[0];

        const response = await request(app).patch(`/answers/${id}`).send({ title: 'test2' });

        expect(response.body.title).toEqual('test2');
        expect(response.status).toEqual(200);

    });

    it("should not be able to update a question with a duplicated title", async () => {

        
        await request(app).post("/questions").send({ title: 'test' });
        const question = await request(app).get("/questions");


        const question_id = question.body[0].id;

        await request(app).post(`/answers/${question_id}`).send({ title: 'test' });

        await request(app).post(`/answers/${question_id}`).send({ title: 'test2' });

        const answer = await request(app).get(`/answers/${question_id}`);

        const {id} = answer.body[0];

        const response = await request(app).patch(`/answers/${id}`).send({ title: 'test' });


        expect(response.status).toEqual(400);

    });

    
    it("should not be able to update a non existent answer ", async () => {
        
        const response = await request(app).patch(`/answers/f60d539b-e09a-4c0a-8134-a290ac3a255f`).send({title: 'test2'});

        expect(response.status).toEqual(400);

    });
});
