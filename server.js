const { encode, decode } = require('./ook.js')
const fs = require('fs');
const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express()

app.use(express.urlencoded({ extended: true}));


const db = new sqlite3.Database('test.db');
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS passes (pass TEXT PRIMARY KEY, expiry INTEGER, used INTEGER)");
   
    // var stmt = db.prepare("INSERT INTO passes VALUES (?, ?, ?)");
    // const time = Date.now() / 1000 + (60);
    // stmt.run("test", time, 2);
    // stmt.finalize();
   
    // db.each("SELECT rowid AS id, info FROM passes", function(err, row) {
    //     console.log(row.id + ": " + row.info);
    // });
});

db.close()

app.get('/', function (req, res) {
    data = fs.readFileSync('./main.html', 'utf8')
    res.send(data.replace("TEST_STRING", ""))
})

const masterPassword = [ "kkkko", "ookkko" ]


app.post('/', async function (req, res) {
    data = fs.readFileSync('./main.html', 'utf8')

    const answerString = req.body.mode === "decode" ? decode(req.body.text) : encode(req.body.text);

    const pass = req.body.password;

    let sent = false;
    let used = 5;
    const db = new sqlite3.Database('test.db');

    await new Promise(resolve => {
        if (masterPassword.includes(req.body.password)) {
            res.send(data.replace("TEST_STRING", answerString))
            sent = true;
            resolve();
        } else {
            const query = db.prepare("SELECT * FROM passes where pass = ?");
            query.each(pass, function(err, row) {
               const time = Date.now() / 1000;
               used = row.used;
                if (row.expiry > time && (row.used > 0 || row.used < 0)) {
                    res.send(data.replace("TEST_STRING", answerString))
                    sent = true;
                }                
            }, function() { query.finalize(); resolve() });
        }
    });
    if (!sent) {
        res.send(data.replace("TEST_STRING", "Wrong Password"))
    } else {
        const query2 = db.prepare("UPDATE passes SET used = ? WHERE pass = ?");
        await new Promise(resolve2 => query2.run(used - 1, pass, function() {
            resolve2();
            query2.finalize();
        }));
    }
    db.close()
})

//password
//pass
//time
//number
app.post('/create', async function (req, res) {
    const pass = req.body.password;

    let sent = false;
    const db = new sqlite3.Database('test.db');

    if (masterPassword.includes(req.body.password)) {
        await new Promise(resolve => {
            const query = db.prepare("insert or replace into passes values (?, ?, ?)");
            const time = Date.now() / 1000 + (60 * req.body.time);
            query.run(req.body.pass, time, req.body.number);
            query.finalize();
            sent = true;
            res.send("Done")
        });
    }
    if (!sent) {
        res.send("not done")
    }
    db.close()
})


app.listen(3000)
