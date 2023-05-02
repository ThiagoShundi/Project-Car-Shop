import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycleData: IMotorcycle | null): Motorcycle | null {
    if (motorcycleData) {
      return new Motorcycle(motorcycleData);
    }
    return null;
  }

  public async register(motorcycleData: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycleData);

    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async listMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.getAll();

    return newMotorcycle.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async listMotorcycleId(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.getById(id);

    if (!newMotorcycle) {
      throw new Error('Motorcycle not found');
    }

    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async updateMotorcycle(id: string, motorcycleData: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.update(id, motorcycleData);

    if (!newMotorcycle) {
      throw new Error('Motorcycle not found');
    }

    return this.createMotorcycleDomain(newMotorcycle);
  }
}

export default MotorcycleService;
