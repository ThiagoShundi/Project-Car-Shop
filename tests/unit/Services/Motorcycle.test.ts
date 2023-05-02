import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Validação da ODM Motorcycle', function () {
  const motorcycleInput: IMotorcycle = {
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };
  
  const motorcycleOutput: Motorcycle = new Motorcycle({
    id: '6451550c464d2e18c7d8ed6c',
    ...motorcycleInput,
  });

  const motorcycleList = [
    {
      id: '6451550c464d2e18c7d8ed6c',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    },
  ];

  it('Criando um tipo moto com SUCESSO', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.register(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Consegue fazer uma consulta por todos as motos', async function () {
    sinon.stub(Model, 'find').resolves(motorcycleList);

    const service = new MotorcycleService();
    const result = await service.listMotorcycles();

    expect(result).to.be.deep.equal(motorcycleList);
  });

  it('Testa a busca pra moto por id', async function () {
    sinon.stub(Model, 'findById').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.listMotorcycleId('6451550c464d2e18c7d8ed6c');
    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Consegue fazer um update de uma moto', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const result = await service.updateMotorcycle('6451550c464d2e18c7d8ed6c', motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  afterEach(function () {
    sinon.restore();
  });
});