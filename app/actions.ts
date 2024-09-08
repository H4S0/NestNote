'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { postSchema, siteSchema } from './utils/zodSchemas';
import prisma from './utils/db';
import { requireUser } from './utils/requireUser';
import { subscribe } from 'diagnostics_channel';

export async function CreateSiteAction(prevState: any, formData: FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const response = await prisma.site.create({
    data: {
      description: submission.value.description,
      name: submission.value.name,
      subdirectory: submission.value.subdirectory,
      userId: (await user).id,
    },
  });

  return redirect('/dashboard/sites');
}

export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const response = await prisma.post.create({
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescripiton,
      slug: submission.value.slug,
      articleContect: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: (await user).id,
      siteId: formData.get('siteId') as string,
    },
  });

  return redirect('/dashboard/sites');
}
