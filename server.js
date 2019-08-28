const { encode, decode } = require('./ook.js')
const fs = require('fs');
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true}));


// const db = new sqlite3.Database('test.db');
// db.serialize(function() {
//     db.run("CREATE TABLE IF NOT EXISTS passes (pass TEXT PRIMARY KEY, expiry INTEGER, used INTEGER)");
   
//     // var stmt = db.prepare("INSERT INTO passes VALUES (?, ?, ?)");
//     // const time = Date.now() / 1000 + (60);
//     // stmt.run("test", time, 2);
//     // stmt.finalize();
   
//     // db.each("SELECT rowid AS id, info FROM passes", function(err, row) {
//     //     console.log(row.id + ": " + row.info);
//     // });
// });

// db.close()

app.get('/', function (req, res) {
    data = fs.readFileSync('./main.html', 'utf8')
    res.send(data.replace("TEST_STRING", ""))
})

const masterPassword = [ "kkkko", "ooook" ]

let accounts = []


app.post('/', async function (req, res) {
    data = fs.readFileSync('./main.html', 'utf8')

    const answerString = req.body.mode === "decode" ? decode(req.body.text) : encode(req.body.text);

    const pass = req.body.password;

    let sent = false;

    if (masterPassword.includes(req.body.password)) {
        res.send(data.replace("TEST_STRING", answerString))
        sent = true;
        resolve();
    } else {
        const account = accounts.find(a => a.pass == pass);
        if (account) {

            const time = Date.now() / 1000;
            if (account.expiry > time && (account.used > 0 || account.used < 0)) {

                account.used = account.used - 1;

                res.send(data.replace("TEST_STRING", answerString))
                sent = true;
            }
        }
    }

    if (!sent) {
        res.send(data.replace("TEST_STRING", "Wrong Password"))
    }
})

//password
//pass
//time
//number
app.post('/create', async function (req, res) {
    const pass = req.body.password;

    if (masterPassword.includes(req.body.password)) {
        const account = accounts.find(a => a.pass == pass);
        const time = Date.now() / 1000 + (60 * req.body.time);

        if (!account) {
            accounts.push({ 'pass': req.body.pass, 'expiry': time, 'used': req.body.number})
        } else {
            account.pass = req.body.pass;
            account.expiry = req.body.expiry;
            account.used = req.body.number;
        }
    }
    res.send("done")
})


app.listen(3000)
