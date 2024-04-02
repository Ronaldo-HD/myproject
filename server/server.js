const express = require('express');
const app = express();
const mysql = require('mysql')
const cors = require('cors');

app.use(express.json())
app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "Ronaldo",
    database: "ronaldodb"
})

con.connect(function(err){
    if(err) throw err;
    console.log('Connected to Database')
})

const users = con.query('select * from users')



// API End Points
app.get('/login', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
  
    con.query("SELECT * FROM users WHERE Username=? AND Password=?", [username,password], function (err, result) {
      if (err) {
        // Handle the database query error
        res.status(500).json({ error: 'Database query error' });
      } else {
        if (result.length === 0) {
          res.status(404).json({ message: 'No User Found' });
        } else {
          res.status(200).json({ message: 'Success', user: result[0] });
        }
      }
    });
  });


  app.get('/getotodolist'  , (req,res) =>{
    const userid = req.query.userid;
    con.query('SELECT * FROM todolist WHERE UserID = ?' , [userid] , function(err,result){
        res.send(result)
    })
  
  })
  

app.get('/projects' , (req,res)=>{  
    con.query("select * from projects ", function (err, result) { 
        res.send(result)
    })    
})


app.get('/tasks' , (req,res)=>{  
    const user = req.query.user
    con.query("SELECT * FROM tasks WHERE AssignedUserID=? ",[user], function (err, result) { 
        res.send(result)
    })
})


app.get('/userImageForTask' , (req,res)=>{  
    const assigned = req.query.assigned
    con.query("SELECT * FROM users WHERE UserID =? ",[assigned], function (err, result) { 
       
        res.send(result)
    })
})


//app . post -->
app.post('/addtodolist' ,(req,res)=>{
   const { userid, description } = req.body;

   con.query('INSERT INTO todolist (UserID, Description) VALUES (?, ?)', [userid, description], function (err, result) {
    if (err) {
        console.error('Error adding project:', err);
        res.status(500).json({ error: 'Error adding project' });
      } else {
        console.log('Project added successfully');
        res.status(200).json({ message: 'Project added successfully' });
      }
   })

} )



app.delete('/deletetodolist', (req, res) => {
    const todoid = req.query.todoid; // Assuming the ID is sent as req.query.todoid

    con.query('DELETE FROM todolist WHERE ToDoID = ?', [todoid], function (err, result) {
        if (err) {
            console.error('Error deleting todo:', err);
            res.status(500).json({ error: 'Error deleting todo' });
        } else {
            console.log('Todo deleted successfully');
            res.status(200).json({ message: 'Todo removed successfully' });
        }
    });
});



app.listen(3003 , () => console.log('Server is Running on port 3003'))