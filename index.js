/** project dependencies */
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const uri ="mongodb+srv://admin:admin@cluster0.c9ert.mongodb.net/MovieDB?retryWrites=true&w=majority";

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(
    console.log('we are connected to the database ')
)

.catch(error=>{
    console.log('it did not work')
    }
)

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








// const movies = [
//     {title: 'Jaws', year: 1975, rating: 8 },
//     {title: 'Avatar', year: 2009, rating: 7.8 },
//     {title: 'Brazil', year: 1985, rating: 8 },
//     {title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
// ]

/** Project routes */

// app.get('/', (req, res) => {
//     res.send('ok') 
// })

app.get("/", async (req, res) => {
    try {
      const moviesDetails = await Movies.find({});
      res.send(moviesDetails);
    } catch (err) {
      console.log("~ err", err);
    }
  })


//   Movies.create({
//     title: "Jaws",
//     year: 1975,
//     rating: 8
// })
// .catch(error =>{
//     console.log('error')
// })

// Movies.create({
//     title: "Brazil",
//     year: 1985,
//     rating: 8
// })
// .catch(error =>{
//     console.log('error')
// })


// Movies.create({
//     title: "Avatar",
//     year: 2009,
//     rating: 7.8
// })
// .catch(error =>{
//     console.log('error')
// })


// Movies.create({
//     title: 'الإرهاب والكباب',
//     year: 1992,
//     rating: 6.2
// })
// .catch(error =>{
//     console.log('error')
// })


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

        app.get('/movies/read', (req, res) => {
            
            res.send({
                status:200,
                movies:movies                
            })

        });

        app.get('/movies/read/by-date', (req, res) => {
            
        // filteredDate = movies.sort
           
        let dateRate = movies.sort((a, b) => {
            return a.year - b.year;
        }) ;
                res.send({
                     status:200,
                    data:dateRate
                }
                  
                )
         });

         app.get('/movies/read/by-rating', (req, res) => {
            
            // filteredDate = movies.sort
               
            let ratingSort = movies.sort((a, b) => {
                return a.rating - b.rating;
            }) ;
                    res.send({
                         status:200,
                        data:ratingSort
                    }
                      
                    )
             });
             app.get('/movies/read/by-title', (req, res) => {
            
                // filteredDate = movies.sort
                   
                let titleSort = movies.sort((a, b) => {
                    let fa = a.title.toLowerCase(),
                        fb = b.title.toLowerCase();
                
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                        res.send({
                             status:200,
                            data:titleSort
                        }
                          
                        )
                 });
                 
                 
                 app.get('/movies/read/id/:id', (req, res) => {
                    
                    if(req.params.id < 1 || req.params.id >4){
                        res.send({
                            status:404,
                            error:true,
                            message:`the movie ${req.params.id} does not exist`
                        })
                    } else{
                        let filteredObj = movies.filter(function(movie) {
                            return movie.id == req.params.id;
                        });
                        res.send({
                            status:200,
                            data:filteredObj
                        })
                        
                    }
          
                });
                
        app.post('/movies/add', (req, res) => {
              let reqQ=req.query;
              let yearVariable =parseInt(reqQ.year) 
            
              var newObj = req.query;
            if(reqQ.title != "" && reqQ.year != "" && reqQ.year !="" && reqQ.year.toString().length == '4' && !isNaN(yearVariable) ){
                if(reqQ.rating == ""){
                        newObj = [reqQ.title, reqQ.year,4]
                }
             
            
                movies.push(newObj)
                res.send({
                    movies
                })
            }


          
        });
        
        app.delete('/movies/delete/:id', (req, res) => {
               
            
            if(req.params.id <1 || req.params.id>4){
                res.send({
                    status:404,
                    error:true,
                    message:`the movie ${req.params.id} does not exist`})
            }
                objIndex =parseInt(req.params.id-1)
                console.log(objIndex)
                movies.splice(objIndex,1)
                res.send({
                    movies
                })  
        });

        app.put('/movies/update/:id', (req, res) => {
            
            let objectIndex = parseInt(req.params.id-1)

            let newTitle= req.query.title
            let newRating= req.query.rating
            let newYear = req.query.year
           
            if(newTitle!=undefined){
                movies[objectIndex].title = newTitle
            }
            if(newRating!=undefined){
                movies[objectIndex].rating = newRating
            }
            if(newYear!=undefined){
                movies[objectIndex].year = newYear
            }
            

      
            res.send({
                data:movies
            })

          
        });
        
                                    



app.listen(port, () => console.log(`the server started at http://localhost:${port} `))