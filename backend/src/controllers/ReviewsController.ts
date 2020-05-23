import { Request, Response } from 'express'
import { Op } from 'sequelize'

import ReviewsRepository from '../repository/ReviewsRepository'
import FoodDictIndexRepository from '../repository/FoodDictIndexRepository'
import Reviews from '../models/Reviews'

const reviewsRepository: ReviewsRepository = ReviewsRepository.getInstance()
const foodDictIndexRepository: FoodDictIndexRepository = FoodDictIndexRepository.getInstance()

export const getReviewById = async (req: Request, res: Response) => {
  // const reviewFromId = reviewsRepository.getReviewById(req.params.id)
  try {
    const reviewFromId = await Reviews.findOne({ where: { reviewID: req.params.id } })

    return res.send(reviewFromId).status(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(404)
  }
}

export const searchReviewsByFoodMenu = async (req: Request, res: Response) => {
  // const reviewsFromQuery = foodDictIndexRepository.searchReviewsByFoodMenu(
  //   req.query.query.toString()
  // )
  try {
    const reviewsFromQuery = await Reviews.findAll({
      where: { review: { [Op.like]: `%${req.query.query.toString()}%` } },
    })

    return res.send(reviewsFromQuery).status(200)
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
