const Router = require('express');
const router = new Router();
const AuthorRouter = require('./AuthorRouter');
const PostRouter = require('./PostRouter');
const TypeRouter = require('./TypeRouter');
const UserRouter = require('./UserRouter');


//сделать checkrole для всех категорий

router.use('/user', UserRouter);
router.use('/type', TypeRouter);
router.use('/author', AuthorRouter);
router.use('/post', PostRouter);

module.exports = router;