export interface RegisterRequest {
  email: string;
  password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export type UpdateMeRequest = {
  username: string;
};
