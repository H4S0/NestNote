import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const fetchCountOnly = url.searchParams.get('countOnly') === 'true';

  try {
    const user = requireUser();

    if (!user) {
      return NextResponse.redirect('/api/auth/login');
    }

    if (fetchCountOnly) {
      const count = await prisma.site.count({
        where: {
          userId: (await user).id,
        },
      });

      return NextResponse.json({ count });
    }

    // Otherwise, fetch sites
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

    const count = await prisma.site.count({
      where: {
        userId: (await user).id,
      },
    });

    return NextResponse.json({ sites, count });
    console.log(sites);
  } catch (error) {
    console.error('Error fetching sites or count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
