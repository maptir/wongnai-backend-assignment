import React, { useCallback, useState } from 'react'
import { getReviewById } from '../api'
import Input from './common/Input'
import Review from './common/Review'

const ReviewById = () => {
  const [review, setReview] = useState(null)

  const fetchReviewById = useCallback(async (id) => {
    const review = await getReviewById(id)

    setReview(review)
  }, [])

  return (
    <div>
      <Input name="id" onClick={fetchReviewById} />
      {review && <Review review={review} />}
    </div>
  )
}

export default ReviewById
