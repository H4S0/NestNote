import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { UploadDropzone } from '../utils/UploadthingComponents';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { JSONContent } from 'novel';
import TailwindEditor from './dashboard/EditorWrapper';

interface EditableForm {
  data: {
    slug: string;
    title: string;
    smallDescripiton: string;
    articleContent: any;
    id: string;
    image: string;
  };
}

const EditForm = ({ data }: EditableForm) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );

  useEffect(() => {
    // Initialize form values if data is available
    setImageUrl(data.image);
    setValue(data.articleContent);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Article Details</CardTitle>
        <CardDescription>
          Edit your existing article details here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              name="title"
              defaultValue={data.title} // Use data.title for default value
              placeholder="Nextjs blogging application"
            />
          </div>

          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              name="slug"
              defaultValue={data.slug} // Use data.slug for default value
              placeholder="Article Slug"
            />
          </div>

          <div className="grid gap-2">
            <Label>Small Description</Label>
            <Textarea
              name="smallDescription"
              defaultValue={data.smallDescripiton} // Use data.smallDescripiton
              placeholder="Small Description for your blog article..."
              className="h-32"
            />
          </div>

          <div className="grid gap-2">
            <Label>Cover Image</Label>
            <input
              type="hidden"
              name="coverImage"
              defaultValue={imageUrl}
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
          </div>

          <div className="grid gap-2">
            <Label>Article Content</Label>
            <input
              type="hidden"
              name="articleContent"
              value={JSON.stringify(value)} // Use value for the article content
            />
            <TailwindEditor onChange={setValue} initalValue={value} />
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditForm;
