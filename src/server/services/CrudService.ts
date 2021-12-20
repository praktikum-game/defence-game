import { TestCrudModel, TestCrudTableCreationAttributes } from 'server/orm/models/TestCrud';

class CrudService {
  readAll() {
    return TestCrudModel.findAll();
  }

  readById(id: number) {
    return TestCrudModel.findByPk(id);
  }

  create(data: TestCrudTableCreationAttributes) {
    return TestCrudModel.create(data);
  }

  update(id: number, field: string, value: string) {
    return TestCrudModel.update({ [field]: value }, { where: { id } });
  }

  delete(id: number) {
    return TestCrudModel.destroy({ where: { id } });
  }
}

export const crudService = new CrudService();
