import { Model, Column, Table, PrimaryKey, DataType } from 'sequelize-typescript'
import { Op } from 'sequelize'

@Table
class Reviews extends Model<Reviews> {
  @PrimaryKey
  @Column
  reviewID!: number

  @Column(DataType.TEXT)
  review!: string

  static searchAndHighlightByFoodMenu = async (foodMenu: string) => {
    const reviews = await Reviews.findAll({
      where: { review: { [Op.like]: `%${foodMenu}%` } },
    })

    return reviews.map(({ reviewID, review }) => ({
      reviewID,
      review: review.replace(new RegExp(foodMenu, 'g'), `<keyword>${foodMenu}</keyword>`),
    }))
  }
}

export default Reviews
