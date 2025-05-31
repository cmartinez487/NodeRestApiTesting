import express from 'express'
import {port} from './config/config.js'
const app = express()

app.listen(port, () => {
    console.log('Server is running on port: ', port)
})