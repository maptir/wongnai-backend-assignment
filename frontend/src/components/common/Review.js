import React from 'react'

const Review = ({ review }) => (
  <div className="review">
    {review.reviewID}. {review.review}
  </div>
)

export default Review
