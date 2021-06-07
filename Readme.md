# Book Managment NodeJs

This code is part of an exercise for the JavaScript course at Harokopio
University of Athens, Dept. of Informatics and Telematics.

## Team

N.Liapis <b>it21950</b>    

# Before first run

Run this command to download dependancies 
``` npm install ```

# Usages

First of all run this command to start nodeJs programm 
``` node .\app.js ```
And then open <b>frontend.html</b> file to your browser and use the app 

# About DB

With app start program creates automatically the sqlite database with this table type 
``` 
CREATE TABLE books 
(
    id integer primary key autoincrement , 
    author text not null , 
    title text not null , 
    genre text not null , 
    price float not null 
)
```
