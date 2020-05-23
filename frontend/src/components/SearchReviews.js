import React, { useCallback, useState } from 'react'
import { searchReviewsByFoodMenu } from '../api'
import Input from './common/Input'
import Review from './common/Review'

const SearchReview = () => {
  const [reviews, setReviews] = useState([])

  const fetchSearchReviewsByFoodMenu = useCallback(async (foodMenu) => {
    const reviews = await searchReviewsByFoodMenu(foodMenu)

    setReviews(reviews)
  }, [])

  return (
    <div>
      <Input name="food menu" onClick={fetchSearchReviewsByFoodMenu} />
      {reviews.length !== 0 &&
        reviews.map((review) => <Review key={review.reviewID} review={review} />)}
    </div>
  )
}

export default SearchReview
