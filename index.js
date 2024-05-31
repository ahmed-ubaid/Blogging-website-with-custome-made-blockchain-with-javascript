const bodyParser=require("body-parser");
const express= require('express')
const Blockchain=require('./blockchain-main/blockchain-main/blockchain');
const UserD=require('./blockchain-main/blockchain-main/user')

const blockchain=new Blockchain();
const dataDEF= new UserD();
const app=express();

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('bootstrap'))
app.use(express.static('images'))
let u
app.get('/home',(req,res)=>{
    res.render('home');
})
app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/signin',(req,res)=>{
    res.render('signin')
})
app.get('/user',(req,res)=>{
    let {username,password}=req.params
    let user=dataDEF.users.find(U=>U.username==username && U.password==password)
    u=user
    res.render('user',{user})
})
app.post('/user',(req,res)=>{
    let {username,password}=req.body
    dataDEF.addToUser(username,password);
    let user=dataDEF.users[dataDEF.users.length-1]
    u=user
    res.render('user',{user})
})
app.get('/add',(req,res)=>{
    res.render('add_post',{u})
})
app.get('/blog/:time',(req,res)=>{
    let {time}=req.params;
    let block= blockchain.chain.find(B=>B.timestamp==time);

    res.render('blogdetail',{block})
})



app.get('/',(req,res)=>{
    res.render('index',{blockchain});
})
app.get('/add_new',(req,res)=>{
    res.render('new block')
})
app.post('/',(req,res)=>{
    let {writer,title,blog}=req.body
    blockchain.addBlock(writer,title,blog);
    dataDEF.addUserPost(writer,title,blog);
    console.log(blockchain.chain)
    let user=dataDEF.users.find(U=>U.username===writer)
    res.render('user',{user})
})
app.get('/block/:hash',(req,res)=>{
    let {hash}=req.params;
    let block= blockchain.chain.find(B=>B.hash===hash);
    res.render('Block Detail',{block})
})


app.listen(200);