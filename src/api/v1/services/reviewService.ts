import * as firestoreRepository from "../repositories/firestoreRepository";
import { Review } from "../models/reviewModel";

const COLLECTION = "reviews";

/**
 * Retrieves all reviews for a menu item
 * @param menuItemId - The ID of the menu item
 * @returns Array of reviews for the menu item
 */
export const getReviewsByMenuItemId = async (
  menuItemId: string
): Promise<Review[]> => {
  const snapshot = await firestoreRepository.getDocuments(COLLECTION);
  const allReviews = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Review[];
  return allReviews.filter((review) => review.menuItemId === menuItemId);
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
  const id = await firestoreRepository.createDocument<Review>(
    COLLECTION,
    reviewData
  );
  return { id, ...reviewData };
};

/**
 * Deletes a review
 * @param id - The ID of the review to delete
 */
export const deleteReview = async (id: string): Promise<void> => {
  await firestoreRepository.deleteDocument(COLLECTION, id);
};