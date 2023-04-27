import { Model, Schema, models,
  model } from 'mongoose';
  
abstract class AbstractODM<T> {
  protected model: Model<T>;
  private schema: Schema;
  protected modelName: string;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }
  
  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }
  
  public async getAll(): Promise<T[]> {
    return this.model.find();
  }

  //   public async update(id: string, obj: Partial<T>):
  //   Promise<T | null> {
  //     if (!isValidObjectId(id)) throw Error('Invalid Mongo id');
      
//     return this.model.findByIdAndUpdate(
//       { _id: id },
//       { ...obj } as UpdateQuery<T>,
//       { new: true },
//     );   
//   }
}
  
export default AbstractODM;