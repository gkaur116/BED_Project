/**
 * Represents a review in the coffee shop
 */
export interface Review {
  id: string;
  userId: string;
  menuItemId: string;
  rating: number;
  comment: string;
}

// In-memory storage for demo purposes
const reviews: Review[] = [];

/**
 * Retrieves all reviews for a menu item
 * @param menuItemId - The ID of the menu item
 * @returns Array of reviews for the menu item
 */
export const getReviewsByMenuItemId = async (
  menuItemId: string
): Promise<Review[]> => {
  const menuItemReviews: Review[] = reviews.filter(
    (review: Review) => review.menuItemId === menuItemId
  );
  return structuredClone(menuItemReviews);
};

/**
 * Creates a new review
 * @param reviewData - The data for the new review
 * @returns The created review
 */
export const createReview = async (reviewData: {
  userId: string;
  menuItemId: string;
  rating: number;
  comment: string;
}): Promise<Review> => {
  const newReview: Review = {
    id: Date.now().toString(),
    userId: reviewData.userId,
    menuItemId: reviewData.menuItemId,
    rating: reviewData.rating,
    comment: reviewData.comment,
  };
  reviews.push(newReview);
  return newReview;
};

/**
 * Deletes a review
 * @param id - The ID of the review to delete
 * @throws Error if review is not found
 */
export const deleteReview = async (id: string): Promise<void> => {
  const index: number = reviews.findIndex((review: Review) => review.id === id);
  if (index === -1) {
    throw new Error(`Review with ID ${id} not found`);
  }
  reviews.splice(index, 1);
};