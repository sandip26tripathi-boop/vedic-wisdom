import { useAuth } from '../context/AuthContext.tsx';
import { UserProfile } from '../types/index.ts';

export interface RequireAuthOptions {
  message?: string;
  prefilledData?: Partial<UserProfile>;
  source?: string;
}

export function useRequireAuth() {
  const { user, isPhoneVerified, isAuthenticated, openAuthModal } = useAuth();

  const requireAuth = (
    action: (verifiedUser?: UserProfile) => void,
    options?: RequireAuthOptions
  ) => {
    // If user is already authenticated with phone verified, execute action directly
    if (user && user.isPhoneVerified) {
      action(user);
      return;
    }

    // Otherwise, immediately halt and open AuthModal with mandatory phone verification
    openAuthModal({
      message: options?.message,
      prefilledData: options?.prefilledData,
      source: options?.source,
      onSuccess: (verifiedUser) => {
        // Automatically complete the action without asking user to click again!
        action(verifiedUser);
      }
    });
  };

  return {
    user,
    isPhoneVerified,
    isAuthenticated,
    requireAuth,
    openAuthModal
  };
}
