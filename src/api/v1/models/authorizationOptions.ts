export interface AuthorizationOptions {
  hasRole: Array<"admin" | "customer">;
  allowSameUser?: boolean;
}