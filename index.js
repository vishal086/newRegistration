const express = require('express')
const mongoose = require('mongoose') 
const app = express()  
const bodyParser = require('body-parser')

const Register = require('./RegisterSchema')
app.use(bodyParser.urlencoded({
    extended : false    
})) 
app.use(express.json())    
app.set("view engine","hbs")
/** Connect DB */
const URL = "mongodb+srv://vishalkumar03072001:eWTI4SJ8WjQlpAfw@cluster0.nqhmamm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test"
mongoose.connect(URL)  
.then(()=>{ 
    console.log("Connection Successfull")
})
.catch((err)=>{  
    console.log(err)
    console.log("Connection Failed")  
})

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/register",(req,res)=>{
    res.render("Register")
})
app.get("/login",(req,res)=>{
    res.render("Login")
})

/** Registration */
app.post("/register",async(req,res)=>{

   try
   {
    
    const email = req.body.email 
    const password = req.body.password;
    const cPassword = req.body.cPassword;

    const abc = await Register.findOne({email})
    if(abc)
    {
        res.status(400).send("User Already Exist Please login")
    }
    else
    {
        if(password === cPassword)
        {
            const data = await Register.create(req.body)
            res.status(201).render("index")
        }
        else
        {
            res.send("Passwords are not Same");
        }
    }
    
   } catch(err)
   {
     res.status(400).send(err)
   }
}) 

/** Login */
app.post("/login",async(req,res)=>{
    try{
     const email = req.body.email;
     const password = req.body.password;
     
     const userEmail = await Register.findOne({email});
     if(!userEmail)
     {
        res.status(400).send("User Does't Exist")
     }
     else
     { 
        if(userEmail.password === password)
        {
            res.status(200).render("Home")   
        }
        else
        {
            res.status(400).send("Password Missmatch")
        }
     }
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})
app.listen(8000,()=>{ 
    console.log("Server is Running")  
})


  