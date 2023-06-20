const {Router} = require('express');
const router = Router();
const taskControllers= require('../controllers/taskControllers');

// create a new task
router.post('/api/task',taskControllers.create_task);

// get all tasks
router.get('/api/tasks',taskControllers.get_all_task);

// update a task
router.put('/api/task/:id',taskControllers.update_task);

// delete a task
router.delete('/api/task/:id',taskControllers.delete_task);

module.exports = router;



