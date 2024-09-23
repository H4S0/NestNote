import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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

    return NextResponse.json({ count });
    console.log(count);
  } catch (error) {
    console.error('Error fetching sites or count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
