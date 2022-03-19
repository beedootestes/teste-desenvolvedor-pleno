import app from './config/http/app'

const app_port = 5050

app.listen(app_port, () => { console.log(`Server is run in port http://localhost:${app_port}`);})
