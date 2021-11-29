import express from 'express';

const app = express();
const port = 3333

app.get('/', (request, response) => {
    console.log("hello word")
})

app.listen(port, () => console.log(`Server is running on port ${port}`))