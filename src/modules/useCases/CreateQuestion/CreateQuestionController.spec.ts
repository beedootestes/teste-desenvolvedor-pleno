import request from 'supertest';
import { app } from '@shared/infra/http/app';
    
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe("CreateQuestionController",  () => {

    beforeAll(async() => {
        connection = await createConnection();
        await connection.runMigrations();
      
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new Question", async () => {
       
        const response = await request(app).post("/questions").send({title: 'KEVEN'});


        expect(response.status).toEqual(201);

    });

    it("shouldn't be able to create a duplicated question", async () => {
       
        await request(app).post("/questions").send({title: 'KEVEN'});

        const response = await request(app).post("/questions").send({title: 'KEVEN'});


        expect(response.status).toBe(400);

    });
});
