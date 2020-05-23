import axios from 'axios'

const API = 'http://localhost:8888/reviews'

export const getReviewById = async (id) => {
  const { data: review } = await axios.get(`${API}/${id}`)

  return review
}

export const searchReviewsByFoodMenu = async (foodMenu) => {
  const { data: reviews } = await axios.get(`${API}?query=${foodMenu}`)

  return reviews
}

export const editingReview = async (id, review) => {
  return axios.put(`${API}/${id}`, { review })
}
