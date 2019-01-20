const Joi = require('joi');
const express=require('express');
const app = express();

app.use(express.json());

const courses =[
    {id:1,name:'courses'},
    {id:2,name:'courses'} ,   
    {id:3,name:'courses'}
];
app.get('/',(req,res)=>{
     res.send('hello world !!');
});
app.get('/api/courses',(req,res)=>{
    res.send([courses]);
});
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c =>
   c.id === parseInt(req.params.id) 
                                )
   if(!course) res.status(404).send('the course not found');//404
    res.send(course);
});

app.post('/api/courses',(req,res)=> {
    // const schema ={
    //     name: Joi.string().min(3).required()
    // };
    // const  result =Joi.validate(req.body,schema);
    // console.log(result);
    // if(!req.body.name || req.body.length < 3) {
    //     //400 bad request
    //     res.status(400).send('eroor request');
    //     return;
    // }
       const course ={
        id:courses.length +1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});



//PORT
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`listenning on port ${port} ...`); 
})
