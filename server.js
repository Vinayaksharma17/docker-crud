const express = require('express')
const pool = require('./db.js')

const port = 3000

const app = express()
app.use(express.json())

app.get('/studentList', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM students')
        res.status(200).send(data.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

app.post('/addStudent', async (req, res) => {
    const { first_name, last_name } = req.body
    console.log('This is name: ', first_name, last_name)
    try {
        await pool.query('INSERT INTO students (first_name, last_name) VALUES ($1, $2)', [first_name, last_name])
        res.status(200).send({message: "student added!!"})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE students (id SERIAL PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50))')
        res.status(200).send({message: "student table created"})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})


app.listen(port, () => console.log(`server listing on port: ${port}`))