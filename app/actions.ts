'use server';
//TO-DO PREBACITI U API
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import { postSchema, siteSchema } from './utils/zodSchemas';
import prisma from './utils/db';
import { requireUser } from './utils/requireUser';
import { subscribe } from 'diagnostics_channel';
import { NextResponse } from 'next/server';

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
      userId: (await user).id,
    },
  });

  return redirect('/dashboard/sites');
}

export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = requireUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

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
      image: submission.value.coverImage,
      status: submission.value.status,
      userId: (await user).id,
      siteId: formData.get('siteId') as string,
    },
  });

  return redirect('/dashboard/sites');
}

export async function EditPostAction(prevState: any, formData: FormData) {
  const user = requireUser();

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.post.update({
    where: {
      userId: (await user).id,
      id: formData.get('articleId') as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescripiton,
      slug: submission.value.slug,
      image: submission.value.coverImage,
      status: submission.value.status,
    },
  });
  return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

export async function UpdateImage(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get('siteId') as string,
    },
    data: {
      imageUrl: formData.get('imageUrl') as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

export async function DeleteNotebook(formData: FormData) {
  const user = await requireUser();
  const notebookId = formData.get('siteId') as string;

  // Delete the notebook, automatically deleting all related posts due to cascading delete
  await prisma.site.delete({
    where: {
      id: notebookId,
      userId: user.id,
    },
  });

  return redirect('/dashboard/sites');
}

export async function DeleteNotes(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.post.delete({
    where: {
      id: formData.get('articleId') as string,
      userId: user.id,
    },
  });
  const siteId = formData.get('siteId');
  return redirect(`/dashboard/sites/${siteId}`);
}
