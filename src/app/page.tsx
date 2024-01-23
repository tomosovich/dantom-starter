import { buttonVariants } from '@/components/ui/button';
import { User } from '@/components/user';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
  const serverSession = await getServerSession(authOptions);
  return (
    <div>
      <h1 className={'text-4xl'}>Home</h1>
      <Link href={'/admin'} className={buttonVariants()}>
        Open My Admin
      </Link>
      {/*Demonstrates the speed of client session vs server session*/}
      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {/* Server Sessions are basically instant, where client sessions can take some time to load, especially on slower connections */}
      {JSON.stringify(serverSession)}
    </div>
  );
}