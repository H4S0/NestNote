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

export default function ArticleCreating({
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
      return parseWithZod(formData, {
        schema: postSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="Blog" />
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="article slug" />
              <Button className="w-fit" variant="secondary" type="button">
                <AtomIcon className="mr-2" /> Generate Slug
              </Button>
            </div>

            <div className="grid gap-2">
              <Label>Small Description</Label>
              <Textarea
                placeholder="Small Descripiton four your article.."
                className="h-32"
              />
            </div>
            <div className="grid gap-2">
              <Label>Cover Image</Label>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="uploaded image"
                  className="object-cover w-[200px] rounded-lg h-[200px]"
                  width={200}
                  height={200}
                />
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                  }}
                  endpoint="imageUploader"
                  onUploadError={() => {
                    throw new Error('something went wrong');
                  }}
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label>Article Content</Label>
              <TailwindEditor onChange={setValue} initalValue={value} />
            </div>

            <Button className="w-fit">Submit</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
