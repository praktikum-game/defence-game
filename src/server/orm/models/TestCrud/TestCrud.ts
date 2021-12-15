// import { Model, Table, Column, DataType } from 'sequelize';
import { Model } from 'sequelize';
import { TestCrudTableAttributes, TestCrudTableCreationAttributes } from './types';

export class TestCrudModel
  extends Model<TestCrudTableAttributes, TestCrudTableCreationAttributes>
  implements TestCrudTableAttributes
{
  id!: number;

  text!: string;

  descr!: string | null;
}
