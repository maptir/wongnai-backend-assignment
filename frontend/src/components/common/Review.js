import React from 'react'

const Review = ({ review }) => (
  <div className="review">
    <div className="header-review">รีวิวที่ {review.reviewID}</div>
    <div dangerouslySetInnerHTML={{ __html: review.review }}></div>
  </div>
)

export default Review
