import fs from 'fs'
import readline from 'readline'

class FoodDict {
  private static instance: FoodDict
  private foodDicts: [string?] = []

  constructor() {
    this.readFoodDictionary()
  }

  public static getInstance = () => {
    if (FoodDict.instance == null) {
      FoodDict.instance = new FoodDict()
    }
    return FoodDict.instance
  }

  private readFoodDictionary = () => {
    console.log('Read food dict')
    let counter = 0
    const lineReader = readline
      .createInterface({ input: fs.createReadStream('src/data/food_dictionary.txt') })
      .on('line', (foodMenu) => {
        counter++
        this.foodDicts.push(foodMenu)
        if (counter >= 20000) {
          lineReader.close()
          lineReader.removeAllListeners()
        }
      })
      .on('close', () => {
        console.log('Food dict ready')
      })
  }

  validateFoodMenu = (query: string) => {
    return this.foodDicts.indexOf(query) >= 0
  }
}

export default FoodDict
