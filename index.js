/** project dependencies */
const express = require('express')
const app = express()
var router = express.Router()
const port = 3000


const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

/** Project routes */
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
                 

        app.get('/movies/create', (req, res) => {

          
        });
        app.get('/movies/update', (req, res) => {

          
        });
        app.get('/movies/delete', (req, res) => {

        });
                                    



app.listen(port, () => console.log(`the server started at http://localhost:${port} `))
