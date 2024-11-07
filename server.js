const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'krish1234',
        database: 'loginInfo'
    }
})

const app = express();

let intialPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(express.static(intialPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "index.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if (!name.length || !email.length || !password.length) {
        return res.json('fill all the fields');
    } else {
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .then(() => {
            res.json({ success: true, message: 'Registration successful', name, email });
        })
        .catch(err => {
            // Handle MySQL duplicate entry error
            if (err.code === 'ER_DUP_ENTRY') {
                res.json({ success: false, message: 'Email already exists' });
            } else {
                res.json({ success: false, message: 'Error during registration' });
            }
        })
    }
});


app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0]);
        } else{
            res.json('email or password is incorrect');
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})