import express from 'express'
import {port} from './config/config.js'
import usersRoutes from './api/routes/users.routes.js'

const app = express()

app.use(express.json());
app.use(usersRoutes);

app.listen(port, () => {
    console.log('Server is running on port: ', port)
})
