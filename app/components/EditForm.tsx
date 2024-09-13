'use client';

import { UploadDropzone } from '@/app/utils/UploadthingComponents';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Atom } from 'lucide-react';
import Image from 'next/image';
import TailwindEditor from './dashboard/EditorWrapper';
import { useActionState, useState } from 'react';
import { JSONContent } from 'novel';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { postSchema } from '@/app/utils/zodSchemas';
import { CreatePostAction, EditPostAction } from '@/app/actions';
import { unknown } from 'zod';

interface iAppProps {
  data: {
    slug: string;
    title: string;
    smallDescription: string;
    id: string;
    image: string;
  };
  siteId: string;
}

export function EditForm({ data, siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(data.image);

  const [slug, setSlugValue] = useState<string | undefined>(data.slug);
  const [title, setTitle] = useState<string | undefined>(data.title);

  // Initialize form handling
  const [lastResult, action] = useActionState(EditPostAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Notes Details</CardTitle>
        <CardDescription>Provide details for the notes.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
        >
          {/* Hidden fields for article and site IDs */}
          <input type="hidden" name="articleId" value={data.id} />
          <input type="hidden" name="siteId" value={siteId} />

          {/* Title Input */}
          <div className="grid gap-2">
            <Label htmlFor={fields.title.name}>Title</Label>
            <Input
              id={fields.title.name}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              placeholder="Nextjs blogging application"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-red-500 text-sm">{fields.title.errors}</p>
          </div>

          {/* Slug Input */}
          <div className="grid gap-2">
            <Label htmlFor={fields.slug.name}>Slug</Label>
            <Input
              id={fields.slug.name}
              name={fields.slug.name}
              defaultValue={fields.slug.initialValue}
              placeholder="Article Slug"
              onChange={(e) => setSlugValue(e.target.value)}
              value={slug}
            />
            <Button className="w-fit" variant="secondary" type="button">
              <Atom className="size-4 mr-2" /> Generate Slug
            </Button>
            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
          </div>

          {/* Small Description Textarea */}
          <div className="grid gap-2">
            <Label htmlFor={fields.smallDescripiton.name}>Your Notes</Label>
            <Textarea
              id={fields.smallDescripiton.name}
              name={fields.smallDescripiton.name}
              defaultValue={data.smallDescription}
              placeholder="Small Description for your blog article..."
              className="h-32"
            />
            <p className="text-red-500 text-sm">
              {fields.smallDescripiton.errors}
            </p>
          </div>

          {/* Cover Image Upload */}
          <div className="grid gap-2">
            <Label htmlFor={fields.coverImage.name}>Cover Image</Label>
            <input
              type="hidden"
              name={fields.coverImage.name}
              id={fields.coverImage.name}
              defaultValue={fields.coverImage.initialValue}
              value={imageUrl}
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                className="object-cover w-[200px] h-[200px] rounded-lg"
                width={200}
                height={200}
              />
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  if (res.length > 0) {
                    setImageUrl(res[0].url);
                  }
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
