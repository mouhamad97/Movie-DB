/** project dependencies */
const express = require('express');
const { use } = require('express/lib/application');
const app = express()
const port = 3000
const mongoose = require('mongoose')
const uri ="mongodb+srv://admin:admin@cluster0.c9ert.mongodb.net/MovieDB?retryWrites=true&w=majority";

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(
    app.listen(port, () => console.log(`the server started at http://localhost:${port} `))
)
.catch(error=>{
    console.log('it did not work')
    }
)

const users =[
  {
    name:"admin",
    password:"admin1"
  },
  {
    name:"admin",
    password:"admin2"
  },
  {
    name:"admin",
    password:"admin3"
  }
];

const db = mongoose.connection
  const moviesSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,

    },
    rating: {
      type: Number,
      required: true,
    }
  },{  versionKey:false  });


  const Movies = mongoose.model('Movie', moviesSchema);



app.get("/", async (req, res) => {
    try {
      const moviesDetails = await Movies.find({});
      res.send(moviesDetails);
    } catch (err) {
      console.log("~err", err);
    }
  })

  app.get("/movies/add", async (req, res) => {
    try {
        let reqQ=req.query;
        let yearVariable =parseInt(reqQ.year) 
        let movieTitle=reqQ.title
        let movieRating=reqQ.rating
        Movies.create({
            title: movieTitle,
            year: yearVariable,
            rating: movieRating
        })
     res.send("the movie is added thank you and don't visit us again")
    } catch (err) {
      console.log("~ err in adding ", err);
    }
  })




app.get("/search/:id", (req, res) => { 


    Movies.findOne({
      _id:req.params.id
    })
    .exec(function(err, movie){
      if(err){
        res.send(`error while searching`)
      }
      else{
        res.send(movie)
      }
    })
   });
    
app.get('/movies/update/:id',async(req,res)=>{
          Movies.findByIdAndUpdate({
            _id:req.params.id 
          },{$set:
            {title:req.query.title}
            ,function(err,newmovie){
              if(err){
               
                  console.log(`error while updating`);
             
                }else {
                  res.send({status:200})
                }
              }
            }
          )
     })

        app.delete('/movies/delete/:id',async(req,res)=>{
          Movies.findOneAndRemove({
            _id:req.params.id 
          },function(err,newmovies){
            if(err){
              console.log("error while deleting")
            } else{
                res.send(newmovies)
            }
          })
        })
        
       app.get('/movies/update/:id',async(req,res)=>{

        Movies.findOneAndUpdate({_id:req.params.id},{title: "Great Dane"},{year:2022},{rating:40}, function(err, result){

          if(err){
              res.send(`updating didn't work ${err}`)
          }
          else{
              res.send(`updating works ${result}`)
              
          }
  
       })

       })

       app.get('/users', (req, res) => {
     res.send({users})
    
  });
  
  const checkuser=()=>{
    for(var i = 0;i<=users.length-1;i++){
      if(users[i].name ===req.query.name && users[i].password === req.query.password){
        return true
      } else return false
    }
  } 


       app.get('/users/:loginname/:loginpassword/add', (req, res) => {
        let reqQ=req.query;      
        let newObj = req.query;
        
        for(var i = 0;i<=users.length-1;i++){

          if(users[i].name ===req.params.loginname && users[i].password === req.params.loginpassword){
          if(reqQ.name != "" && reqQ.password != "" ){

            users.push(newObj)
              res.send({
                  users
              })
          }
          }else {
            res.send("user are not authenticated")
          }
        }
    
  });
  
  app.get('/users/:loginname/:loginpassword/delete/:id', (req, res) => {
         
    for(var i = 0;i<=users.length-1;i++){
      if(users[i].name ===req.params.loginname && users[i].password === req.params.loginpassword){
      if(req.params.id <1 || req.params.id>users.length){
          res.send({
              status:404,
              error:true,
              message:`the user ${req.params.id} does not exist`})
      }
          objIndex =parseInt(req.params.id-1)
          console.log(objIndex)
          users.splice(objIndex,1)
          res.send({
              users
          })  
        }else {
          res.send("you are not authenticated")
        }
      }
  });
  app.get('/users/:loginname/:loginpassword/update/:id', (req, res) => {

    for(var i = 0;i<=users.length-1;i++){
      if(users[i].name ===req.params.loginname && users[i].password === req.params.loginpassword){
    let objectIndex = parseInt(req.params.id-1)

    let newName= req.query.name
    let newPassword= req.query.password


    if(newName!=undefined){
        users[objectIndex].name = newName
    }
    if(newPassword!=undefined){
        users[objectIndex].password = newPassword
    }

    res.send({
        data:users
    })
  } else {
    res.send('you are not authenticated')
  }
    }
});
