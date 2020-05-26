import React, { useCallback, useState } from 'react'
import { searchReviewsByFoodMenu } from '../api'
import Input from './common/Input'
import Review from './common/Review'

const SearchReview = () => {
  const [reviews, setReviews] = useState([])
  const [input, setInput] = useState(null)

  const fetchSearchReviewsByFoodMenu = useCallback(async (foodMenu) => {
    const reviews = await searchReviewsByFoodMenu(foodMenu)

    setInput(foodMenu)
    setReviews(reviews)
  }, [])

  return (
    <div>
      <Input name="food menu" onClick={fetchSearchReviewsByFoodMenu} />
      {reviews ? (
        input && (
          <div>
            <div>
              There are {reviews.length} reviews from: '{input}'
            </div>
            {reviews.map((review) => (
              <Review key={review.reviewID} review={review} />
            ))}
          </div>
        )
      ) : (
        <div>Can't find food menu: '{input}'</div>
      )}
    </div>
  )
}

export default SearchReview
