const axios = require('axios');
const urlBase = 'http://localhost';

const createQuestion = async (description)=>{
    return await axios.post(`${urlBase}/question`, {
        description
    });
}

const createAnswer = async (questionId, description)=>{
    return await axios.post(`${urlBase}/question/${questionId}/answer`, {
        description
    });
}

test('POST /question', async () => {
    const response = await createQuestion('Qual o seu curso?');
    expect(response.status).toEqual(201);
    expect(Object.keys(response.data).length).toEqual(4);
    expect(typeof response.data).toEqual('object');
});

test('GET /question', async () => {

    const response = await axios.get(`${urlBase}/question`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.data)).toBeTruthy();
});

test('PUT /question/:id', async () => {

    const { id } = (await createQuestion('Qual o seu curso?')).data;

    const response = await axios.put(`${urlBase}/question/${id}`, {
        description: 'Onde você mora?'
    });

    expect(response.status).toEqual(200);
    expect(Object.keys(response.data).length).toEqual(4);
    expect(typeof response.data).toEqual('object');
});

test('DELETE /question/:id', async () => {

    const { id } = (await createQuestion('Qual o seu curso?')).data;

    const response = await axios.delete(`${urlBase}/question/${id}`);

    expect(response.status).toEqual(200);
    expect(typeof response.data).toEqual('string');
});

test('POST /question/:questionId/answer', async () => {

    const { id:questionId } = (await createQuestion('Qual o seu curso?')).data;

    const response = (await createAnswer(questionId, 'Engenharia da Computação'));

    expect(response.status).toEqual(201);
    expect(Object.keys(response.data).length).toEqual(5);
    expect(typeof response.data).toEqual('object');
});

test('GET /question/:questionId/answer', async () => {

    const { id:questionId } = (await createQuestion('Qual o seu curso?')).data;

    const response = await axios.get(`${urlBase}/question/${questionId}/answer`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.data)).toBeTruthy();
});

test('PUT /question/:questionId/answer/:answerId', async () => {

    const { id:questionId } = (await createQuestion('Qual o seu curso?')).data;

    const { id:answerId } = (await createAnswer(questionId, 'Engenharia da Computação')).data;

    const response = await axios.put(`${urlBase}/question/${questionId}/answer/${answerId}`, {
        description: 'EC'
    });

    expect(response.status).toEqual(200);
    expect(Object.keys(response.data).length).toEqual(5);
    expect(typeof response.data).toEqual('object');
});

test('DELETE /question/:questionId/answer/:answerId', async () => {

    const { id:questionId } = (await createQuestion('Qual o seu curso?')).data;

    const { id:answerId } = (await createAnswer(questionId, 'Engenharia da Computação')).data;

    const response = await axios.delete(`${urlBase}/question/${questionId}/answer/${answerId}`);

    expect(response.status).toEqual(200);
    expect(typeof response.data).toEqual('string');
});

test('GET /question/answer', async () => {

    const { id:questionId } = (await createQuestion('Qual o seu curso?')).data;

    await createAnswer(questionId, 'Engenharia da Computação');

    const response = await axios.get(`${urlBase}/question/answer`);

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.data)).toBeTruthy();
    expect(Array.isArray(response.data[0].answers)).toBeTruthy();
});