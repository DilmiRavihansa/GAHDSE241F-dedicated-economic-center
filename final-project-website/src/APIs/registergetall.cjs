var express = require("express")
var mysql = require("mysql2")
var app = express()
app.use(express.json())

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'economic_center'
})

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("Connected !!!")
    }
})

app.get("/registerfetch",(req,res)=>{
    con.query("select * from register",function(err,result,fields){
        if(err)
        {
            console.log(err)
        }
        else
        {
           res.send(result)
        }
    })
})

app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("on port 3000")
    }
})