import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const registerCar = await this.service.register(car);
      return this.res.status(201).json(registerCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAll() {
    try {
      const carsList = await this.service.listCars();
      return this.res.status(200).json(carsList);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const carsList = await this.service.listCarId(id);
      return this.res.status(200).json(carsList);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const car: ICar = {
      ...this.req.body,
    };
    const { id } = this.req.params;

    try {
      const carUpdate = await this.service.updateCar(id, car);
      
      return this.res.status(200).json(carUpdate);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;
