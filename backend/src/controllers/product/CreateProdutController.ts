import { Request, Response } from 'express';

import { CreateProdutServices } from '../../services/product/CreateProdutServices';

class CreateProductController{
  async handle(req: Request, res: Response){

    const {name, price, description, category_id} = req.body;

    const createProdutService = new CreateProdutServices();

    if(!req.file){
      throw new Error("Error upload file!")
    }else {
      
      const { originalname, filename: banner } = req.file;

      const product = await createProdutService.execute({
        name,
        price,
        description,
        banner,
        category_id
      });
      return res.json(product);
    }
  };
};

export { CreateProductController };