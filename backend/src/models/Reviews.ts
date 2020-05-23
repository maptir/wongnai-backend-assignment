import { Model, Column, Table, PrimaryKey, DataType } from 'sequelize-typescript'

@Table
class Reviews extends Model<Reviews> {
  @PrimaryKey
  @Column
  reviewID!: number

  @Column(DataType.TEXT)
  review!: string
}

export default Reviews
