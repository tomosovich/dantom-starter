// This layout will show for all auth routes (sign in, sign up, forgot password, reset password)

import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className={'bg-slate-200 p-10 rounded-md'}>{children}</div>;
};

export default AuthLayout;