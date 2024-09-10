import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { requireUser } from '@/app/utils/requireUser';

export async function GET() {
  const user = requireUser();

  if (!user) {
    return NextResponse.redirect('/api/auth/login');
  }

  const data = await prisma.site.findMany({
    where: {
      userId: (await user).id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(data);
}
