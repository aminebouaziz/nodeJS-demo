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
// ADD
app.post('/api/courses',(req,res)=> {
    const { error } = validateCourse(req.body); // result.error  
    if(error) {
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
       const course ={
        id:courses.length +1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

// update
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c =>c.id === parseInt(req.params.id)                                 )
        if(!course) res.status(404).send('the course not found');//404
         res.send(course);
      
    
    //  validate
    //  if invalid, return 400 - bad request
    const { error } = validateCourse(req.body); // result.error  
    if(error) {
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //  update course
    course.name = req.body.name;
    //  return the update course 
    res.send(course);
    });
    function validateCourse(course){
        const schema ={
            name: Joi.string().min(3).required()
        };
         return Joi.validate(course,schema);

    }



app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c =>
   c.id === parseInt(req.params.id) 
                                )
   if(!course) res.status(404).send('the course not found');//404
    res.send(course);
});
//Delete
app.delete('/api/courses/:id',(req,res)=>{
    // look up the course
    const course = courses.find(c =>c.id === parseInt(req.params.id)  )
    // not existing , return 404
        if(!course) res.status(404).send('the course not found');//404
    //delete
  const index =  courses.indexOf(course);
  courses.splice(index);
    // return the same course
    res.send(course);
});


//PORT
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`listenning on port ${port} ...`); 
})
