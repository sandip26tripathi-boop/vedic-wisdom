import React from 'react';
import { Language } from '../../types/index.ts';

interface GoogleOneTapVisitPromptProps {
  currentLang?: Language;
}

/**
 * Disabled per user requirement: Zero automatic modals on page load.
 * Authentication is strictly user-initiated via top navigation "Sign In / Sign Up".
 */
export const GoogleOneTapVisitPrompt: React.FC<GoogleOneTapVisitPromptProps> = () => {
  return null;
};
