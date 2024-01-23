// This page is only accessible to logged-in users.
// I would modify this to accept a user role and check that role before allowing access.
// Settings could be accessed by logged-in users
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const adminPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return (
      <h2 className={'text-2xl'}>
        {/*Check types for session.user in types/next-auth.d.ts*/}
        Admin Page - Welcome Back {session?.user.username ||
          session.user.name}{' '}
      </h2>
    );
  }
  return <h2 className={'text-2xl'}>Admin Page - Please Sign In</h2>;
};
export default adminPage;