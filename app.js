const sqlite3 = require('sqlite3').verbose();
//create table books ( id integer primary key autoincrement , author text not null , title text not null , genre text not null , price integer not null );
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
    db.run(`INSERT INTO BOOKS (author,title,genre,price) VALUES (?,?,?,?)`,[book.author, book.title, book.genre, book.price])
    {
        console.log("a book with title: "+book.title +" added");
    }
    res.send("a book with title: "+book.title +" added");
    db.close();
});

app.get('/getBooks', (req, res) => 
{
    //const book = req.body;
    //console.log(book.title);
    let key='game';
    let keyword ='%'+key+'%';
    let db = new sqlite3.Database('./db/books.db');
    let sql = (`select * from books where title like ? or author like ? `);
    db.all(sql, [keyword,keyword], (err, rows) =>
    {
        res.send(JSON.stringify(rows));
        if (err) 
        {
            throw err;
        }
        console.log("Matching book titles for keyword '"+key+"' are:");
        rows.forEach((row) => 
        {
            console.log(row.title);
        });
    });
    
    db.close();
});

app.listen(3000)

console.log("App runnig");