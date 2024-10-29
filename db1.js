const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Blogs=require('./blog.js')
const db=process.env.MONGO_URI;
mongoose.connect(db)
.then((result)=>{
  console.log('connected')
})
.catch((err)=>{
  console.log('error occured')
});

app.get('/',(req,res)=>{
  const blogs=new Blogs({
    title:'my cat',
    author:'nik',
    body:'my cat is beautiful'
  });
  blogs.save()
  .then((result)=>{
   res.send('<script>alert("blog posted!");</script>');
  })
  .catch((err)=>{
    console.log(err);
  })
});
app.use(express.json());
app.post('/texte', (req, res) => {
  const blog = new Blog(req.body); 
  blog.save()
    .then((result) => {
      res.send("Posted successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error saving blog");
    });
});
app.get('/find',(req,res)=>{
  Blogs.find()
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
});

app.listen(3000);