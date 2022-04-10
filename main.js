const express=require('express')
const res = require('express/lib/response')
const app = express()
const path=require('path')
const defaultpw="Immanidiot"
var login=false
var fromPG = true
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")))
app.get('/main',(req,res)=>{
    res.send("Youre here!")
})
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"view"))
function getW(req,res,next){
  req.login=login
  if(fromPG){
      next()
  }else{
      res.send("<h1>This IP Address was temporary stopped by NODEJS.org(Express.js).</h1><br><a href='https://nodejs.org'>More Details</a>")
  }
}
app.get('/',getW,(req,res)=>{
    res.render("home",{Logged:login})
})
app.get('/adminstrator/setup/server/request',(req,res)=>{
    res.render("adminst")
})
app.post('/',(req,res)=>{
    if(req.body.set==="close"){
        res.send("SUCCESS")
        fromPG=false
    }else if(req.body.set==="open"){
        res.send("SUCCESS")
        fromPG=true
    }else{
        res.send("Fail to read")
    }
})
app.post("/result",(req,res)=>{
    if(req.body.color.trim().toUpperCase()==="PASSWORD"){
    res.send("ACCESS!")
    login=true
    }else{
        res.send("NOPE")
    }
    
})
app.get("/api/dt",(req,res)=>{
  res.json({Logged:req.login})  
})
app.get("/result",(req,res)=>{
    res.send("<h1>ERROR</h1>")
})
app.listen(8888)