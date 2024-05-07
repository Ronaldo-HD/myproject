    const express = require('express');
    const app = express();
    const mysql = require('mysql')
    const cors = require('cors');
    const multer = require('multer');
    const path = require('path');
    const upload = multer({ dest: 'uploads/' })
    const fs = require('fs'); 



    app.use(express.json())
    app.use(cors());

    const con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        database: "ronaldodb"
    })

    con.connect(function(err){
        if(err) throw err;
        console.log('Connected to Database')
    });



    // const users = con.query('select * from users')


    app.get('/testusers', (req, res) => {
      con.query('SELECT * FROM users', (err, result) => {
        if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(result);
        }
      });
    });



    app.get('/messages', (req, res) => {

      con.query('SELECT * FROM Messages', (err, result) => {
        if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(result);
        }
      });
    });



    app.get('/getsingletask', (req, res) => {
      const taskid = req.query.taskid;

      con.query('SELECT * FROM tasks WHERE TaskID = ? ',[taskid], (err, result) => {
        if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(result);
        }
      });
    });




    // API End Points
    app.get('/login', (req, res) => {
        const username = req.query.username;
        const password = req.query.password;
      
        con.query("SELECT * FROM users WHERE Username=? AND Password=?", [username,password], function (err, result) {
          if (err) {
            res.status(500).json({ error: 'Database query error' });
          } else {
            if (result.length === 0) {
              res.status(404).json({ message: 'No User Found' });
            } else {
              res.status(200).json({ message: 'Success', user: result[0]  });
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
      

    app.get('/getSelectedProjects' , (req,res)=>{  
      const projectid = req.query.projectid;
        con.query("select * from projects where ProjectID=?",[projectid], function (err, result) { 
            res.send(result)
        })    
    })



    app.get('/tasksTablesData', (req, res) => {
      const user = req.query.user;
      con.query(
          `SELECT 
              t.TaskID,
              t.TaskName,
              t.DueDate,
              t.Status,
              t.ProjectID,
              t.AssignedUserID,
              t.Assignee,
              u.Username,
              u.ProfilePicture
          FROM 
              tasks t
          JOIN 
              users u ON t.Assignee = u.UserID
          WHERE 
              t.AssignedUserID = ?`,
          [user],
          function (err, result) {
              if (err) {
                  console.error(err);
                  res.status(500).send('Internal Server Error');
              } else {
                  res.send(result);
              }
          }
      );
    });


    app.get('/getProjects'  , (req,res) =>{
      const userid = req.query.userid;
      con.query('SELECT * FROM projects ' , function(err,result){
          res.send(result)
      })

    })



    app.get('/getProjectsList', (req, res) => {
      con.query(`
        SELECT
          p.ProjectID,
          p.ProjectName,
          p.Description AS ProjectDescription,
          p.StartDate,
          p.EndDate,
          p.Status AS ProjectStatus,
          u.UserID AS CreatorID,
          u.Username AS CreatorUsername,
          u.ProfilePicture AS CreatorProfilePicture,
          CONCAT(
            '[',
            GROUP_CONCAT(
              CONCAT(
                '{"TaskID": ', t.TaskID,
                ', "TaskName": "', t.TaskName,
                '", "DueDate": "', t.DueDate,
                '", "Status": "', t.Status,
                '", "Assignee": "', u2.Username,
                '", "AssigneeProfilePicture": "', u2.ProfilePicture,
                '"}'
              )
              SEPARATOR ','
            ),
            ']'
          ) AS Tasks
        FROM
          projects p
        LEFT JOIN
          tasks t ON p.ProjectID = t.ProjectID
        LEFT JOIN
          users u ON p.CreatorID = u.UserID
        LEFT JOIN
          users u2 ON t.AssignedUserID = u2.UserID
        GROUP BY
          p.ProjectID;
      `, function(err, result) {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          const projectsWithTasks = result.map(project => ({
            ...project,
            Tasks: JSON.parse(project.Tasks)
          }));
          res.send(projectsWithTasks);
        }
      });
    });


    app.get('/api/discussion', (req, res) => {
      const sql = `
        SELECT d.Message, u.Username, u.ProfilePicture , u.UserID
        FROM discussion d 
        JOIN users u ON d.sender_id = u.UserID
      `;
      
      con.query(sql, (err, result) => {
        if (err) {
          console.error('Error fetching messages:', err);
          res.status(500).json({ error: 'Error fetching messages' });
        } else {
          res.status(200).json({ messages: result });
        }
      });
    });


    //APP POST   -->
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


    app.post('/api/senddiscussion', (req, res) => {
      const { sender_id, message } = req.body;
    
      const sql = 'INSERT INTO discussion (sender_id, message) VALUES (?, ?)';
      con.query(sql, [sender_id, message], (err, result) => {
        if (err) {
          console.error('Error inserting message:', err);
          res.status(500).json({ error: 'Error inserting message' });
        } else {
          console.log('Message inserted successfully');
          res.status(200).json({ message: 'Message Added' });
        }
      });
    });

    app.delete('/deletetodolist', (req, res) => {
        const todoid = req.query.todoid; 

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

    app.delete('/deletetask', (req, res) => {
      const taskid = req.query.taskid; 

      con.query('DELETE FROM tasks WHERE TaskID = ?', [taskid], function (err, result) {
          if (err) {
              console.error('Error deleting Task:', err);
              res.status(500).json({ error: 'Error deleting Task' });
          } else {
              console.log('Todo deleted successfully');
              res.status(200).json({ message: 'Task removed successfully' });
          }
      });
  });


  //   app.delete('/deleteproject', (req, res) => {
  //     const projectid = req.query.projectid; // Assuming the ID is sent as req.query.todoid

  //     con.query('DELETE FROM projects WHERE ProjectID = ?', [projectid], function (err, result) {
  //         if (err) {
  //             console.error('Error deleting project:', err);
  //             res.status(500).json({ error: 'Error deleting project' });
  //         } else {
  //             console.log('project deleted successfully');
  //             res.status(200).json({ message: 'project removed successfully' });
  //         }
  //     });
  // });

  app.delete('/deleteproject', (req, res) => {
    const projectid = req.query.projectid; 
  
    con.query('DELETE FROM tasks WHERE ProjectID = ?', [projectid], function (err, taskResult) {
      if (err) {
        console.error('Error deleting tasks:', err);
        res.status(500).json({ error: 'Error deleting tasks' });
      } else {
        con.query('DELETE FROM projects WHERE ProjectID = ?', [projectid], function (err, projectResult) {
          if (err) {
            console.error('Error deleting project:', err);
            res.status(500).json({ error: 'Error deleting project' });
          } else {
            console.log('Project and associated tasks deleted successfully');
            res.status(200).json({ message: 'Project and associated tasks removed successfully' });
          }
        });
      }
    });
  });
  

    app.post('/api/projects/add', (req, res) => {
      const { ProjectName, Description, StartDate, EndDate, Status, CreatorID } = req.body;
      
      const sql = 'INSERT INTO projects (ProjectName, Description, StartDate, EndDate, Status, CreatorID) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [ProjectName, Description, StartDate, EndDate, Status, CreatorID];
    
      con.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error adding project:', err);
          res.status(500).json({ error: 'Error adding project' });
        } else {
          console.log('Project added successfully');
          res.status(200).json({ message: 'Project added successfully' });
        }
      });
    });


    app.post('/addnewTask', (req, res) => {
      const { taskname, assigned, assignee, projectName, date,ProjectID } = req.body;

      const parsedDate = new Date(date); 

      con.query(
        'INSERT INTO `tasks`(`TaskName`, `DueDate`, `Status`, `ProjectID`, `AssignedUserID`, `Assignee`) VALUES (?, ?, ?, ?, ?, ?)',
        [taskname, parsedDate, 'pending', ProjectID, assigned, assignee],
        function (err, result) {
          if (err) {
            console.error('Error from backend:', err);
            res.status(500).json({ error: 'Error adding task' });
          } else {
            console.log('Task added successfully');
            res.status(200).json({ message: 'Task added successfully' });
          }
        }
      );
    });

    app.post('/sendmessage', (req, res) => {
      const { senderId , receiverId , timestamp , messageText} = req.body;

      const parsedDate = new Date(timestamp); 

      con.query(
        'INSERT INTO `messages`(`senderId`, `receiverId`, `messageText`, `timestamp`) VALUES (?, ?, ?, ?)',
        [senderId , receiverId , messageText ,timestamp],
        function (err, result) {
          if (err) {
            console.error('Errrrrrror from backend:', err);
            res.status(500).json({ error: 'Error sendding messaage' });
          } else {
            console.log('Task added successfully');
            res.status(200).json({ message: 'Message Sent' });
          }
        }
      );
    });

    app.post('/changestatus', (req, res) => {
      const { projectID, NewStatus } = req.body;
    
      con.query(
        'UPDATE tasks SET Status = ? WHERE TaskID = ?',
        [NewStatus, projectID],
        function (err, result) {
          if (err) {
            console.error('Error from backend:', err);
            res.status(500).json({ error: 'Error updating status' });
          } else {
            console.log('Status updated successfully');
            res.status(200).json({ message: 'Status Updated' });
          }
        }
      );
    });


    app.post('/api/profile', upload.single('file'), function (req, res, next) {
      const uploadedFile = req.file;
      
    
      const newFileName = `${uploadedFile.originalname}`;
      fs.renameSync(uploadedFile.path, `uploads/${newFileName}`);
    
        res.send('FileSSSSS uploaded successfully');
    });


    app.use('/uploads', express.static('uploads'));

      
      app.get('/api/files', (req, res) => {
        fs.readdir('./uploads', (err, files) => {
            if (err) {
                console.error('Error fetching files:', err);
                res.status(500).json({ error: 'Failed to fetch files' });
            } else {
                const filesWithSizes = files.map((fileName) => {
                    const filePath = `./uploads/${fileName}`;
                    const fileStats = fs.statSync(filePath);
                    return { name: fileName, size: fileStats.size };
                });
    
                res.json({ files: filesWithSizes });
            }
        });
    });


    app.listen(3003 , () => console.log('Server is Running on port 3003'))