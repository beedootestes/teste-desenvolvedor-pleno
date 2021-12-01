import request from 'supertest';
import { app } from '@shared/infra/http/app';
    
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe("UpdateQuestionsTitleController",  () => {

    beforeAll(async() => {
        connection = await createConnection();
        await connection.runMigrations();
      
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to update a question title ", async () => {
       
        await request(app).post("/questions").send({title: 'KEVEN'});

        const question = await request(app).get("/questions");
        
        const id = question.body[0].id;
        
        const response = await request(app).patch(`/questions/${id}`).send({title: 'KEVEN2'});

        expect(response.body.title).toEqual('KEVEN2');
        expect(response.status).toEqual(200);

    });

    it("should not be able to update a question with a duplicated title", async () => {
       
        await request(app).post("/questions").send({title: 'KEVEN'});

        const question = await request(app).get("/questions");
        
        const id = question.body[0].id;
        
        await request(app).patch(`/questions/${id}`).send({title: 'KEVEN2'});

        const response = await request(app).patch(`/questions/${id}`).send({title: 'KEVEN2'});

        expect(response.status).toEqual(400);

    });

    
    it("should not be able to update a non existent question ", async () => {
        
        const response = await request(app).patch(`/questions/f60d539b-e09a-4c0a-8134-a290ac3a255f`).send({title: 'KEVEN2'});

        expect(response.status).toEqual(400);

    });
});