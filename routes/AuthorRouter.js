const Router = require('express');
const router = new Router();
const AuthorController = require('../controllers/AuthorController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), AuthorController.create);
router.get('/', AuthorController.getAll);

module.exports = router;