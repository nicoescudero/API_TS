import {Router} from 'express';
import usrCtrl from '../controllers/user.controller';
import proCtrl from '../controllers/products.controller';
import passport from 'passport';
import multer from '../middleware/multer';
import {validationSignUp,validationSignIn} from '../helpers/user.validations';
import {validationProduct,validationProductId,validationProductUpdate} from '../helpers/product.validations';

const router=Router();

router.post('/signin',validationSignIn,usrCtrl.signIn);
router.post('/signup',validationSignUp,usrCtrl.signUp);
router.get('/getAllUser',usrCtrl.getAllUsers);

router.use(passport.authenticate('jwt',{session:false}));

router.post('/product/create',multer,validationProduct,proCtrl.createProduct);
router.get('/product/getOne/:id',validationProductId,proCtrl.getProductById);
router.get('/product/getAll',validationProduct,proCtrl.getAllProducts);
router.put('/product/update/:id',multer,validationProductId,proCtrl.updateProduct);
router.delete('/product/delete/:id',validationProductUpdate,proCtrl.deleteProduct);

export default router;