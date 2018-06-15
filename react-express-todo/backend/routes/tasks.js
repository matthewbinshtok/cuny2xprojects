var express = require('express');
var router = express.Router();
var fs = require('fs');

var tasks;

// route to send all saved tasks on start
router.get('/', function(req, res, next) {
     var exists = fs.existsSync('tasks.json');
     if (exists) {
          // Read the file
          console.log('Loading tasks from file.');
          var txt = fs.readFileSync('tasks.json', 'utf8');
          if (txt == ''){
               tasks = [];
          } else {
               // Parse it back to object
               tasks = JSON.parse(txt);
          }
     } else {
          // Otherwise start with blank list
          console.log('No tasks to be loaded from file.');
          console.log('Initialized tasks object to empty.');
          tasks = [];
     }
     res.json(tasks);
});

// route for adding a new task
router.post('/addtask', function(req, res){
     // read task from body
     let task = req.body;
     // add the task to list
     tasks.push(task);
     // send confirmation to log
     console.log("Received task.");
     // log the new list of tasksto verify
     console.log(tasks);
     // reply to indicate success
     var reply = {
          status: 'success'
     }
     // preprare for write
     var json = JSON.stringify(tasks, null, 2);
     // write to file
     fs.writeFile('tasks.json', json, function(err) {
          if (err){
               console.log("Error writing file.");
          } else {
               console.log('Finished writing new task to "tasks.json".');
          }
          // send reply
          res.send(reply);
     });
});

// route for removing a task at given index
router.post('/removetask', function(req, res){
     // read task index from body
     let removalRequest = req.body;
     // remove from the tasks list at index
     tasks.splice(removalRequest.index,1);
     // send confirmation to log
     console.log("Removed task.");
     // reply to indicate success
     var reply = {
          status: 'success'
     }
     // preprare for write
     var json = JSON.stringify(tasks, null, 2);
     // write to file
     fs.writeFile('tasks.json', json, function(err) {
          if (err){
               console.log("Error writing file.");
          } else {
               console.log('Finished writing updated tasks list to "tasks.json".');
          }
          // send reply
          res.send(reply);
     });
});

// route for marking a task at given index as completed
router.post('/completetask', function(req, res){
     // read task index from body
     let completionRequest = req.body;
     // mark task at index in tasks list as completed
     tasks[completionRequest.index].isCompleted = true;
     // send confirmation to log
     console.log("Marked task as completed.");
     // reply to indicate success
     var reply = {
          status: 'success'
     }
     // preprare for write
     var json = JSON.stringify(tasks, null, 2);
     // write to file
     fs.writeFile('tasks.json', json, function(err) {
          if (err){
               console.log("Error writing file.");
          } else {
               console.log('Finished writing updated tasks list to "tasks.json".');
          }
          // send reply
          res.send(reply);
     });
});

// route for marking a task at given index as completed
router.post('/startask', function(req, res){
     // read task index from body
     let completionRequest = req.body;
     // mark task at index in tasks list as completed
     tasks[completionRequest.index].isStarred = !tasks[completionRequest.index].isStarred;
     // send confirmation to log
     console.log("Toggled task importance.");
     // reply to indicate success
     var reply = {
          status: 'success'
     }
     // preprare for write
     var json = JSON.stringify(tasks, null, 2);
     // write to file
     fs.writeFile('tasks.json', json, function(err) {
          if (err){
               console.log("Error writing file.");
          } else {
               console.log('Finished writing updated tasks list to "tasks.json".');
          }
          // send reply
          res.send(reply);
     });
});

module.exports = router;
