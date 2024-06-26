import { Request, Response } from 'express';

import { CreateOrdeService } from '../../services/order/CreateOrdeService';

class CreateOrderController{
  async handle(req: Request, res: Response){
    const { table, name } = req.body;

    const createOrderService = new CreateOrdeService();

    const order = await createOrderService.execute({
      table,
      name
    });

    return res.json(order);

  };
};

export { CreateOrderController };