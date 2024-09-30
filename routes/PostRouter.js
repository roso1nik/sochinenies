const Router = require('express');
const router = new Router();
const PostController = require('../controllers/PostController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), PostController.create);
router.get('/', PostController.getAll);
router.get('/:id', PostController.getOne);

module.exports = router;