require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
//-------------------------------------------------------------------------//
let id=0
let arr=[]

app.post("/api/shorturl",(req,res)=>{
let { url } =req.body
  
if(url.includes('http:/') || url.includes('ftp:/')){
    return res.json({ error: 'invalid url' })
  }
 try{
   let urlObject = new URL(url)
 
dns.lookup(urlObject.hotname,(err) =>{

      if(err){
        res.json({error: 'invalid url'})
      }else{
        id++
       const newUrl={
         original_url: url , 
        short_url : id
       }
      
        arr.push(newUrl)
      res.json(newUrl)
}
})
 }catch(err){
    res.json({ error: 'invalid url' })
  }
})



app.get("/api/shorturl/:id",(req,res)=>{
  let {id}=req.params
   
  let originUrl= arr.find( e=>e.short_url=== parseInt(id) );

  if(originUrl){
  
   res.redirect(originUrl.original_url) 
  }else{
    res.json({notFound:"not short url"})
  }
  
})