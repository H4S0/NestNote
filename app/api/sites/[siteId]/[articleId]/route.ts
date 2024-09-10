import prisma from '@/app/utils/db';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { articleId: string; siteId: string } }
) {
  const data = await prisma.post.findUnique({
    where: {
      id: params.articleId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContect: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return NextResponse.json(data);
}
