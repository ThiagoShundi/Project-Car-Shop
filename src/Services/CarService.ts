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
}

export default CarService;
