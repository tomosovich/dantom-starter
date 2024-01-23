import { signIn } from 'next-auth/react';
import { getImageBlurSvg } from 'next/dist/shared/lib/image-blur-svg';
import { FC, ReactNode, useState } from 'react';

import { Button } from './ui/button';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
export const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  children,
}) => {
  // This is a loading state for the button
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // This is the function that will be called when the button is clicked
  const loginWithGoogle = async () => {
    // This is where we set the loading state to true
    try {
      setIsLoading(true);
      // This is where we call the signIn function from next-auth
      await signIn('google', { callbackUrl: 'http://localhost:3000/admin' });
      // This is where we set the loading state to false
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // This adds the loading spinner to the button
    <Button onClick={loginWithGoogle} className='w-full'>
      {isLoading && (
        <svg
          xmlns={'http://www.w3.org/2000/svg'}
          viewBox={'0 0 24 24'}
          fill={'none'}
          stroke={'currentColor'}
          strokeWidth={'2'}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
          className={'animate-spin h-5 w-5 mr-3'}
        >
          <path d={'M21 12a9 9 0 1 1-6.219-8.56'} />
        </svg>
      )}
      {children}
    </Button>
  );
};