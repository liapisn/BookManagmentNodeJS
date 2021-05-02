const sqlite3 = require('sqlite3').verbose();
//create table books ( id integer primary key autoincrement , author text not null , title text not null , genre text not null , price float not null );
let db = new sqlite3.Database('./db/books.db');
db.run(`CREATE TABLE IF NOT EXISTS books ( id integer primary key autoincrement , author text not null , title text not null , genre text not null , price float not null )`)
db.close();
const express = require('express')
const app = express()
const cors = require('cors');
const parser = require('body-parser');
const { json } = require('express');
app.use(cors());
app.use(parser.json());

app.post('/books', (req, res) => 
{
    const book = req.body;
    let db = new sqlite3.Database('./db/books.db');
    db.run(`INSERT INTO BOOKS (author,title,genre,price) VALUES (?,?,?,?)`, [book.author, book.title, book.genre, book.price])
    {
        console.log("a book with title: " + book.title + " added");
    }
    res.send("a book with title: " + book.title + " added");
    db.close();
});

app.get('/books/*', (req, res) => 
{
    console.log(req.originalUrl);
    let urlString = req.originalUrl;
    //const book = req.body;
    //console.log(book.title);
    let key = urlString.slice(7)
    console.log(key);
    let keyword = '%' + key + '%';
    let db = new sqlite3.Database('./db/books.db');
    let sql = (`select * from books where title like ? `);
    db.all(sql, [keyword], (err, rows) => {
        res.send(JSON.stringify(rows));
        if (err) {
            throw err;
        }
        console.log("Here are all the matching book titles found for keyword '"+key+"'");
        rows.forEach((row) => 
        {
            console.log(row.title);
        });
    });

    db.close();
});

app.listen(3000)

console.log("App runnig");