'use client';

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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { DeleteNotebook } from '@/app/actions';

const Page = ({ params }: { params: { siteId: string } }) => {
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
          <CardTitle>Delete Notebook</CardTitle>
          <CardDescription>
            This will delete your notebook and all notes associated with it.
            Click the button below to delete everything.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete everything</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  your notes and remove the selected notebook from our database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <form action={DeleteNotebook}>
                  <input type="hidden" name="siteId" value={params.siteId} />
                  <Button
                    variant="destructive"
                    type="submit"
                    formAction={DeleteNotebook}
                  >
                    Delete Everything
                  </Button>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default Page;
