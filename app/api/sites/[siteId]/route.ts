import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { requireUser } from '@/app/utils/requireUser';

export async function GET(
  request: Request,
  { params }: { params: { siteId: string } }
) {
  const user = requireUser();

  const data = await prisma.post.findMany({
    where: {
      userId: (await user).id,
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
