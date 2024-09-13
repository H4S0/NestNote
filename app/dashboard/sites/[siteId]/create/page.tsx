'use client';

import { CreatePostAction } from '@/app/actions';
import TailwindEditor from '@/app/components/dashboard/EditorWrapper';
import { UploadDropzone } from '@/app/utils/UploadthingComponents';
import { postSchema } from '@/app/utils/zodSchemas';
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
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ArrowLeft, Atom, AtomIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSONContent } from 'novel';
import { useActionState, useState } from 'react';

export default function ArticleCreationRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  const [lastResult, action] = useActionState(CreatePostAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Notes</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notes Details</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <input type="hidden" name="siteId" value={params.siteId} />
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="Nextjs blogging application"
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                placeholder="Article Slug"
              />
              <Button className="w-fit" variant="secondary" type="button">
                <Atom className="size-4 mr-2" /> Generate Slug
              </Button>
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label>Your Notes</Label>
              <Textarea
                key={fields.smallDescripiton.key}
                name={fields.smallDescripiton.name}
                defaultValue={fields.smallDescripiton.initialValue}
                placeholder="Small Description for your blog article..."
                className="h-32"
              />
              <p className="text-red-500 text-sm">
                {fields.smallDescripiton.errors}
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              <input
                type="hidden"
                name={fields.coverImage.name}
                key={fields.coverImage.key}
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
                    setImageUrl(res[0].url);
                  }}
                  endpoint="imageUploader"
                />
              )}

              <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
            </div>

            <Button type="submit">Create Notes</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
