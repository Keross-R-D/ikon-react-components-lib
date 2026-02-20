export interface User {
  userId: string;
  userName: string;
  userLogin: string;
  userPhone: string;
  userEmail: string;
  userThumbnail: string | null;
  userType: string;
  active: boolean;
  dateOfBirth: string | null;
  userProfileImage: string | null;
  userDescription: string | null;
  userDesignation: string | null;
  invitedUser: boolean;
  userDeleted: boolean;
}