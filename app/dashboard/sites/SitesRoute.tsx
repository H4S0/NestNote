// app/dashboard/sites/SitesRoute.tsx
'use server';

import prisma from '@/app/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import SitesClient from './SitesClient';

async function getData(userId: string) {
  const data = await prisma.site.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

const SitesRoute = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await getData(user.id);

  return <SitesClient data={data} />;
};

export default SitesRoute;
