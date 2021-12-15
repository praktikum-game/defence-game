import { TestCrud } from 'server/orm';

class CrudService {
  readAll() {
    return TestCrud.findAll();
  }

  create(data: TestCrud) {
    TestCrud.create(data);
  }

  update(id: number, field: keyof Pick<TestCrud, 'text' | 'description'>, value: string) {
    TestCrud.update({ [field]: value }, { where: { id } });
  }

  delete(id: number) {
    TestCrud.destroy({ where: { id } });
  }
}

export const crudService = new CrudService();
