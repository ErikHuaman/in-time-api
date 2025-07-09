import { Model, WhereOptions } from 'sequelize';

export async function getNextOrderValue<T extends Model>(
  model: { new (): T } & typeof Model,
  field: string = 'orden',
  where?: WhereOptions
): Promise<number> {
  const lastItem = await model.findOne({
    where,
    order: [[field, 'DESC']],
    paranoid: false, // <-- Esto es lo que necesitas
  });

  return lastItem ? (lastItem.get(field) as number) + 1 : 1;
}