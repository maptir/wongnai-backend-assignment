import fs from 'fs'
import readline from 'readline'

import ReviewsRepository from './ReviewsRepository'
import { Review } from '../types/Review'

class FoodDictIndexRepository {
  static instance: FoodDictIndexRepository
  private reviewsRepository: ReviewsRepository = ReviewsRepository.getInstance()
  private foodDictIndex: { [key: string]: Review[] } = {}

  private constructor() {
    this.readFoodDictionary()
  }

  static getInstance = () => {
    if (FoodDictIndexRepository.instance == null) {
      FoodDictIndexRepository.instance = new FoodDictIndexRepository()
    }
    return FoodDictIndexRepository.instance
  }

  private readFoodDictionary = () => {
    console.log('Read food dict')
    let counter = 0
    const lineReader = readline
      .createInterface({ input: fs.createReadStream('src/data/food_dictionary.txt') })
      .on('line', async (foodMenu) => {
        counter++
        this.foodDictIndex[foodMenu] = this.reviewsRepository.getReviewsByKeyword(foodMenu)

        if (counter >= 20000) {
          lineReader.close()
          lineReader.removeAllListeners()
        }
      })
      .on('close', () => {
        console.log('close')
      })
  }

  searchReviewsByFoodMenu = (query: string) => {
    // console.log(
    //   Object.keys(this.foodDictIndex).filter((food) => this.foodDictIndex[food].length !== 0).length
    // )
    if (!this.foodDictIndex[query]) {
      this.foodDictIndex[query] = this.reviewsRepository.getReviewsByKeyword(query)
    }

    const addKeyword = this.foodDictIndex[query].map((foodDict) => ({
      ...foodDict,
      review: foodDict.review.replace(new RegExp(query, 'g'), `<keyword>${query}</keyword>`),
    }))

    return addKeyword
  }
}

export default FoodDictIndexRepository
