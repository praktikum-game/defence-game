import { ModelDefined } from 'sequelize/types';

export abstract class BaseCrud<T, D> {
  private _model: ModelDefined<T, D>;

  constructor(model: ModelDefined<T, D>) {
    this._model = model;
  }

  get model() {
    return this._model;
  }

  readAll() {
    return this._model.findAll();
  }

  readById(id: number) {
    return this._model.findByPk(id);
  }

  create(data: D) {
    return this._model.create(data);
  }

  bulkCreate(data: D[]) {
    return this._model.bulkCreate(data);
  }

  update(id: number, field: string, value: string) {
    // Не могу справиться с типами. Нужная помощь
    // @ts-expect-error
    return this._model.update({ [field]: value }, { where: { id } });
  }

  delete(id: number) {
    // Не могу справиться с типами. Нужная помощь
    // @ts-expect-error
    return this._model.destroy({ where: { id } });
  }
}
