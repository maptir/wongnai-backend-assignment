import { Model, Column, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table
class Reviews extends Model<Reviews> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  reviewID!: number

  @Column
  review!: string
}

export default Reviews
