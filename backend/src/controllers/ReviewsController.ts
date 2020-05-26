import { Request, Response } from 'express'
import { Op } from 'sequelize'

import Reviews from '../models/Reviews'
import FoodDict from '../FoodDict'

const foodDict: FoodDict = FoodDict.getInstance()

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const reviewFromId = await Reviews.findOne({ where: { reviewID: req.params.id } })

    return res.send(reviewFromId).status(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(404)
  }
}

export const searchReviewsByFoodMenu = async (req: Request, res: Response) => {
  try {
    const query = req.query.query.toString()

    let reviews = null
    if (foodDict.validateFoodMenu(query)) {
      reviews = (
        await Reviews.findAll({
          where: { review: { [Op.like]: `%${query.toString()}%` } },
        })
      ).map(({ reviewID, review }) => ({
        reviewID,
        review: review.replace(new RegExp(query, 'g'), `<keyword>${query}</keyword>`),
      }))
    }

    return res.send(reviews).status(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(404)
  }
}

export const editingReview = async (req: Request, res: Response) => {
  try {
    await Reviews.update({ review: req.body.review }, { where: { reviewID: req.params.id } })

    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(404)
  }
}
