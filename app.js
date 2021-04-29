const oracledb = require('oracledb');
const express = require('express')
const app = express()

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const user= "IT21950";
const password = "liapis1234";
const url = "jdbc:oracle:thin:@oracle12c.hua.gr:1521:orcl";

const cors = require('cors');
const parser = require('body-parser');
app.use(cors());
app.use(parser.json());

app.post('/addBook',(req,res)=>
{
    let connection;
    const book = req.body;
    oracledb.getConnection(
    {
        user          : user,
        password      : password,
        connectString : url
    },
    function(err, connection)
    {
        if (err) { console.error(err); return; }
        connection.execute(`INSERT INTO BOOKS VALUES (:author,:title,:genre,:price)`[book.author,book.title,book.genre,book.price],
        function(err, result)
        {
        if (err) { console.error(err); return; }
        console.log(book.body+" added");
        });
    });
    // try {
    //     connection = oracledb.getConnection( {
    //         user          : user,
    //         password      : password,
    //         connectString : url
    //     });

    //     const result = connection.execute(
    //         `INSERT INTO BOOKS VALUES (:author,:title,:genre,:price)`[book.author,book.title,book.genre,book.price]);
    //         console.log(book.body+" added");
    // } catch (err) {
    //     console.error(err);
    // } finally {
    //     if (connection) {
    //         try {
    //             connection.close();
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // }
});

app.post('/getBook',(req,res)=>
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

app.listen(3000)

console.log("App runnig");