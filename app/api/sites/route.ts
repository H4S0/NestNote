import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { requireUser } from '@/app/utils/requireUser';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';

  try {
    const user = requireUser();

    if (!user) {
      return NextResponse.redirect('/api/auth/login');
    }

    const count = await prisma.site.count({
      where: {
        userId: (await user).id,
      },
    });

    const sites = await prisma.site.findMany({
      where: {
        userId: (await user).id,
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ sites, count });
  } catch (error) {
    console.error('Error fetching sites:', error); // Log the error to the server console
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
