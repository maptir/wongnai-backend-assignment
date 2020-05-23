import csv from 'csv-parser'
import fs from 'fs'
import { Review } from '../types/Review'

class ReviewsRepository {
  static instance: ReviewsRepository
  private reviews: [Review?] = []

  private constructor() {
    this.readReviewsFromCsv()
  }

  static getInstance = () => {
    if (ReviewsRepository.instance == null) {
      ReviewsRepository.instance = new ReviewsRepository()
    }
    return ReviewsRepository.instance
  }

  private readReviewsFromCsv = () => {
    console.log('Read reviews from csv')

    fs.createReadStream('src/data/test_file.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => this.reviews.push(data))
  }

  getReviewById = (id: string) => {
    return this.reviews.find((review) => review.reviewID === id)
  }

  getReviewsByKeyword = (foodMenu: string) => {
    return this.reviews.filter((review) => review.review.includes(foodMenu))
  }

  editReview = (id: string) => {}
}

export default ReviewsRepository
