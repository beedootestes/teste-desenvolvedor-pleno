import request from 'supertest';
import { app } from '@shared/infra/http/app';
    
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe("ListQuestionsController",  () => {

    beforeAll(async() => {
        connection = await createConnection();
        await connection.runMigrations();
      
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to list all questions with their answers", async () => {
       
        await request(app).post("/questions").send({title: 'KEVEN'});

        const question = await request(app).get("/questions");
        
        const id = question.body[0].id;
        
        await request(app).post(`/answers/${id}`).send({title: 'KEVEN'});

        
        const response = await request(app).get(`/questions`);
        
        expect(response.status).toEqual(200);

    });
});
