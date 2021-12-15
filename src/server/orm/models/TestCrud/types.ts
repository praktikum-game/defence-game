import { Optional } from 'sequelize';

export interface TestCrudTableAttributes {
  id: number;
  text: string;
  descr: string | null;
}

export interface TestCrudTableCreationAttributes extends Optional<TestCrudTableAttributes, 'id'> {}
