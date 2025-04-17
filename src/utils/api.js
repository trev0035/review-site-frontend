export const ALL_REVIEWS_API_URL = 'https://review-site-backend-h459.onrender.com/api/reviews?populate=*';

export const SINGLE_REVIEW_API_URL = (documentId) => {
    return `https://review-site-backend-h459.onrender.com/api/reviews/${documentId}?populate=*`;
}