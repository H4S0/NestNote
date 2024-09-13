import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = requireUser();

  if (!user || !(await user).id) {
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 }
    );
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: (await user).id,
    },
    select: {
      firstName: true,
    },
  });

  // If the user doesn't exist in the database, create a new one
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: (await user).id,
        firstName: (await user).given_name ?? '',
        lastName: (await user).family_name ?? '',
        email: (await user).email ?? '',
        profileImage:
          (await user).picture ??
          `https://avatar.vercel.sh/${(await user).given_name}`,
      },
    });
  }

  // Return the user's first name as a JSON response
  return NextResponse.json({ firstName: dbUser.firstName });
}
