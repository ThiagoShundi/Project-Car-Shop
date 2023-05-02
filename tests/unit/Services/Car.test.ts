import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Validação da ODM Car', function () {
  const carInput: ICar = {
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };
  
  const carOutput: Car = new Car({
    id: '64514aff464d2e18c7d8ed68',
    ...carInput,
  });

  const carList = [
    {
      id: '64514aff464d2e18c7d8ed68',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    },
  ];

  it('Criando um tipo carro com SUCESSO', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.register(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Consegue fazer uma consulta por todos os carros', async function () {
    sinon.stub(Model, 'find').resolves(carList);

    const service = new CarService();
    const result = await service.listCars();

    expect(result).to.be.deep.equal(carList);
  });

  it('Testa a busca pro carro por id', async function () {
    sinon.stub(Model, 'findById').resolves(carOutput);

    const service = new CarService();
    const result = await service.listCarId('64514aff464d2e18c7d8ed68');
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Consegue fazer um update de um carro', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const service = new CarService();
    const result = await service.updateCar('64514aff464d2e18c7d8ed68', carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  afterEach(function () {
    sinon.restore();
  });
});