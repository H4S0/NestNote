import { NextResponse } from 'next/server';
import prisma from '@/app/utils/db';
import { postSchema } from '@/app/utils/zodSchemas';
import { parseWithZod } from '@conform-to/zod';
import { requireUser } from '@/app/utils/requireUser';
import { redirect } from 'next/navigation';

export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }
  //TO-DO PREBACITI U API FOLDER POST CREATE METODU
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
