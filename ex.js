import express from 'express';
import mysql from 'mysql';

var app = express();
var PORT = 3000;


app.use(express.json())  


var DB = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'express'
})
DB.connect((err)=>{
    if(err){
        console.log(err);
    }
    console.log("Db connected successfully")
})



app.get("/",(req,res)=>{
   let sqlqry = "SELECT * FROM temdata";
   DB.query(sqlqry,(err,result)=>{
    if(err){
        throw err;
    }
    res.send(result);
   })
})

app.get("/new/:id",(req,res)=>{  
    let id = "SELECT * FROM temdata where id = "+req.params.id;
    DB.query(id,(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.post("/add",(req,res)=>{
    let data = req.body;
    DB.query("INSERT INTO temdata set ?",data,(err,result)=>{
        if(err){
            return res.json({status:"ERROR",err})
        }
        return res.json(result)
    })
})

app.delete("/delete/:id",(req,res)=>{
    let del = "DELETE FROM temdata WHERE id = "+req.params.id;
    DB.query(del,(err,result)=>{
        if(err){
            throw err;
        }
        return res.json(result);
        })
})



app.put("/update/:id",(req,res)=>{
    let updt = req.body;
    let upd="UPDATE temdata set name=?,city=?,email=? where id = "+req.params.id;
    DB.query(upd,[updt.name,updt.city,updt.email],(err,result)=>{
        if(err){
            throw err;
        }
        return res.json(result)
    })
})



app.listen(PORT,(req,res)=>{
    console.log("Server is running on port",PORT);
})
