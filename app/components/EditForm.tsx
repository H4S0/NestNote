import { useState } from 'react';
import { JSONContent } from 'novel'; // Assuming this is the content type
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { postSchema } from '../utils/zodSchemas';
import TailwindEditor from './dashboard/EditorWrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadDropzone } from '@/app/utils/UploadthingComponents';
import Image from 'next/image';
import { Atom } from 'lucide-react';
import { useActionState } from 'react';
import { EditPostAction } from '../actions';

interface iAppProps {
  data: {
    slug: string;
    title: string;
    smallDescription: string;
    articleContent: JSONContent; // Explicitly define the JSONContent type
    id: string;
    image: string;
  };
  siteId: string;
}

export function EditForm({ data, siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  ); // JSONContent value for editor
  const [slug, setSlugValue] = useState<string>(data.slug);
  const [title, setTitle] = useState<string>(data.title);

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
        <CardTitle>Article Details</CardTitle>
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
          <input type="hidden" name="articleId" value={data.id} />
          <input type="hidden" name="siteId" value={siteId} />

          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              placeholder="Next.js blogging application"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
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
              onChange={(e) => setSlugValue(e.target.value)}
              value={slug}
            />
            <Button className="w-fit" variant="secondary" type="button">
              <Atom className="size-4 mr-2" /> Generate Slug
            </Button>
            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Small Description</Label>
            <Textarea
              key={fields.smallDescripiton.key}
              name={fields.smallDescripiton.name}
              defaultValue={data.smallDescription}
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

          <div className="grid gap-2">
            <Label>Article Content</Label>
            <input
              type="hidden"
              name={fields.articleContent.name}
              key={fields.articleContent.key}
              defaultValue={JSON.stringify(value)} // Stringify the value to store in the hidden input
            />
            {/* Pass the initial value and setValue for the editor */}
            <TailwindEditor
              onChange={setValue} // Update the value state when the editor content changes
              initialValue={value} // Pass the initial content to the editor
            />
            <p className="text-red-500 text-sm">
              {fields.articleContent.errors}
            </p>
          </div>

          <Button>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}
