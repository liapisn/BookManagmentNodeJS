const oracledb = require('oracledb');
const express = require('express')
const app = express()

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const user= "IT21950";
const password = "liapis1234";
const url = "jdbc:oracle:thin:@oracle12c.hua.gr:1521:orcl";
app.post('/addBook',(req,res)=>
{
    let connection;
    const book = req.body;

    try {
        connection = oracledb.getConnection( {
            user          : user,
            password      : password,
            connectString : url
        });

        const result = connection.execute(
        //    `SELECT * FROM BOOKS WHERE title =:title`,[book.title]);
            `INSERT INTO BOOKS VALUES (:author,:title,:genre,:price)`[book.author,book.title,book.genre,book.price]);
         console.log(book.body+" added");

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.get('/getBook',(req,res)=>
{
    let connection;
    try {
        connection = oracledb.getConnection( {
            user          : user,
            password      : password,
            connectString : url
        });


        const result = connection.execute(
                `SELECT * FROM BOOKS WHERE title =:title`,[req]);
        let book = result.rows;
        res.send(JSON.stringify(book));
        // console.log(result.rows);

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});