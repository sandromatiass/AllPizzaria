// Express
import { Router } from 'express';

//Multer
import multer from 'multer';

//Users
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

//Middleware
import { isAuthenticated } from './middlewares/isAuthenticated';

//Category
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

//Products
import { CreateProductController } from './controllers/product/CreateProdutController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

//Upload image Multer
import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//--Rotas User --
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);

// -- Rotas Category --
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/category', isAuthenticated, new ListCategoryController().handle);

// -- Rotas Products --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);


export { router };