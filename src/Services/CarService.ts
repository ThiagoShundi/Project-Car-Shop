import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(carData: ICar | null): Car | null {
    if (carData) {
      return new Car(carData);
    }
    return null;
  }

  public async register(carData: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(carData);

    return this.createCarDomain(newCar);
  }

  public async listCars() {
    const carODM = new CarODM();
    const newCar = await carODM.getAll();

    return newCar.map((car) => this.createCarDomain(car));
  }

  public async listCarId(id: string) {
    const carODM = new CarODM();
    const newCar = await carODM.getById(id);

    if (!newCar) {
      throw new Error('Car not found');
    }

    return this.createCarDomain(newCar);
  }
}

export default CarService;
