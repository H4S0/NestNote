import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { UploadImageForm } from '@/app/components/UploadImageForm';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteNotebook } from '@/app/actions';
const page = ({ params }: { params: { siteId: string } }) => {
  return (
    <>
      <div>
        <Button variant="outline">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft />
          </Link>
        </Button>
      </div>

      <UploadImageForm siteId={params.siteId} />

      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
            This will delete your notebook and all notes associated with it.
            Click the button below to delete everything
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteNotebook}>
            <input type="hidden" name="siteId" value={params.siteId} />
            <Button type="submit">Delete Everything</Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
};

export default page;
