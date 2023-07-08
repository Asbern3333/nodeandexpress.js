const express=require("express");
const app=express();
const port=4000;
var bodyParser = require('body-parser')
const Lists = [
    {
      id: 1,
      fn:"",
      ln:"",
      
      },
      {
        id: 2,
        fn:"asber",
        ln:"noma",
        },
        
  ];

app.get("/List",(req,res)=>{
  //Handle Get request logic here
    res.send(Lists);
});

app.get("/List/:id",(req,res)=>
{
    const ListId=parseInt(req.params.id,10);
    const list =Lists.find((list)=>list.id===ListId);
    //Handle GET(id) request logic here
    if (list) {
      res.send(list);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
})

app.use((req, res, next) => {
  res.on('finish', () => { // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});
app.use(express.json()) ; 
app.post("/List", (req, res) => {
  
  const newList = req.body
    console.log("newJob", newList);
    //Handle POST request logic here
    Lists.push(newList);
    res.send(newList);
    res.status(201).send(newList);
  });




  app.use(express.json()) ; 
  //Handle Patch request logic here
  app.patch("/List/:id", (req, res) => {
    const listId = parseInt(req.params.id, 10);
    const listUpdates = req.body;
    const listIndex = Lists.findIndex(job => job.id === listId);
    const updatedlist = { ...Lists[listIndex], ...listUpdates };
    Lists[listIndex] = updatedlist;
    if (listIndex !== -1) {
      Lists[listIndex] = listUpdates;
      res.send(listUpdates);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  });
  //Handle Delete 
  app.delete("/List/:id", (req, res) => {
    const listId = parseInt(req.params.id, 10);
    const listIndex = Lists.findIndex(list => list.id === listId);
    Lists.splice(listIndex, 1);
    res.send({ message: "Job deleted successfully" });
    if (listIndex !== -1) {
      jobs.splice(listIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  });
  
   
app.listen(port,()=>{
    console.log(`server is runner at http://localhost:${port}`);
})