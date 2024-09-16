import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { requireUser } from '@/app/utils/requireUser';

export async function GET(request: Request) {
  const { search } = new URL(request.url).searchParams; // Extract search parameter

  try {
    const user = requireUser();

    if (!user) {
      return NextResponse.redirect('/api/auth/login');
    }

    const sites = await prisma.site.findMany({
      where: {
        userId: (await user).id,
        name: {
          contains: search || '', // Filter based on search term
          mode: 'insensitive', // Case insensitive search
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(sites);
  } catch (error) {
    console.error('Error fetching sites:', error); // Log error to server console
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
