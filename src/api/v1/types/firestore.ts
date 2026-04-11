/**
 * Represents the data types supported by Firestore
 */
export type FirestoreDataTypes =
  | string
  | number
  | boolean
  | null
  | Date
  | FirestoreDataTypes[]
  | { [key: string]: FirestoreDataTypes };