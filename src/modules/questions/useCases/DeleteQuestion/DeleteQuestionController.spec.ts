import request from 'supertest';
import { app } from '@shared/infra/http/app';
    
import createConnection from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe("DeleteQuestionController",  () => {

    beforeAll(async() => {
        connection = await createConnection();
        await connection.runMigrations();
      
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to delete a new Question", async () => {
       
        await request(app).post("/questions").send({title: 'KEVEN'});

        const question = await request(app).get("/questions");

        const id = question.body[0].id;

        const response = await request(app).delete(`/questions/${id}`);
        
        expect(response.status).toEqual(200);

    });

    it("shouldn't be able to delete a inexistent question", async () => {
       

        const response = await request(app).delete("/questions/ddsadas");


        expect(response.status).toBe(500);

    });
});
