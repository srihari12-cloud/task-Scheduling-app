const { Router } = require("express");
const router = Router();
const authController = require("../Controllers/taskController");


router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;    