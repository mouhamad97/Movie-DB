
const express = require('express')
const app = express()
var router = express.Router()
const port = 3000

app.get('/', (req, res) => {
    res.send('ok')
 
})

app.get('/test', (req, res) => {
    res.send({
        status:200,
        message:'ok'

    })
})

let date = new Date();

app.get("/time", (req, res) => {
  res.send({
    status: 200,
    message: date.getHours() + ":" + date.getSeconds(),
  });
});

app.get("/hello/:id", (req, res) => {
    res.send({
      status: 200,
      message:"hello " + req.params.id
    });
  });

app.get("/search", (req, res) => {
  

const q = req.query;
console.log(q.s)
  if(q.s != "") {
    res.send({
        status: 200,
        message:"ok",
        data:q.s
      });
  }
  else {
    res.send({
        status: 500,
        error:true,
        message:"you have to provide a search"
      });
  }


        });

 



app.listen(port, () => console.log(`the server started at http://localhost:${port} `))
