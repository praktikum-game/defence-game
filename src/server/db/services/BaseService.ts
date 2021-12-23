import { CreateOptions, FindOptions, ModelDefined } from 'sequelize/types';

export abstract class BaseService<T, D> {
  private _model: ModelDefined<T, D>;

  constructor(model: ModelDefined<T, D>) {
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

  readById(id: number) {
    return this._model.findByPk(id);
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
    return this._model.destroy({ where: queryObject });
  }
}
