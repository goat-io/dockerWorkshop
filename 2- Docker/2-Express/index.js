const express = require('express')
const app = express()
const port = 3000
const Users = require('./models/Users')

app.get('/data', (req, res) => {
    res.json({data: "someData"})
})

app.get('/users', async (req, res, next) => {
    try {
        const users = await Users.get();
        res.json(users)
    } catch (error) {
        next(error)
    }

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))