import { Model, ModelStatic, FindOptions, CreateOptions } from 'sequelize';

export abstract class BaseService<T, D, M extends Model<T, D>> {
  private _model: ModelStatic<M>;

  constructor(model: ModelStatic<M>) {
    this._model = model;
  }

  get model() {
    return this._model;
  }

  readAll(options?: FindOptions<T>) {
    return this._model.findAll(options);
  }

  readOne(options?: FindOptions<T>) {
    return this._model.findOne(options);
  }

  readById(id: number, options?: FindOptions<T>) {
    return this._model.findByPk(id, options);
  }

  create(data: D, options?: CreateOptions<T>) {
    return this._model.create(data, options);
  }

  bulkCreate(data: D[], options?: CreateOptions<T>) {
    return this._model.bulkCreate(data, options);
  }

  update(queryObject: { [key in keyof T]?: T[key] }, changeObject: { [key in keyof T]?: T[key] }) {
    return this._model.update(changeObject, { where: queryObject });
  }

  delete(queryObject: { [key in keyof T]?: T[key] }) {
    if (Object.keys(queryObject).length !== 0) {
      return this._model.destroy({ where: queryObject });
    }
  }
}
