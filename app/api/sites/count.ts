import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';

export async function GET(request: Request) {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.redirect('/api/auth/login');
    }

    // Get the count of sites for the user
    const count = await prisma.site.count({
      where: {
        userId: user.id,
      },
    });
    console.log(user);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching site count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
