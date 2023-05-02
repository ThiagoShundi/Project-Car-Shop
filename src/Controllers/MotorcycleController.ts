import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const registerMotorcycle = await this.service.register(motorcycle);
      return this.res.status(201).json(registerMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const motorcycleList = await this.service.listMotorcycles();

      return this.res.status(200).json(motorcycleList);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const motorcycleList = await this.service.listMotorcycleId(id);
      return this.res.status(200).json(motorcycleList);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const motorcycle: IMotorcycle = {
      ...this.req.body,
    };
    const { id } = this.req.params;

    try {
      const motorcycleUpdate = await this.service.updateMotorcycle(id, motorcycle);

      return this.res.status(200).json(motorcycleUpdate);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;