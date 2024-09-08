import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(
  request: Request,
  { params }: { params: { siteId: string } }
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.redirect('/api/auth/login');
  }

  const data = await prisma.post.findMany({
    where: {
      userId: user.id,
      siteId: params.siteId,
    },
    select: {
      image: true,
      title: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(data);
}
