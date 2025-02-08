import { Button } from '@/components/ui/button';
import { FileIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const EmptyNote = ({ id }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/30">
        <FileIcon className="size-10 text-primary" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        You don’t have any Notes created
      </h2>
      <p className="mb-8 mt-2 text-center text-sm leading-2 text-muted-foreground max-w-sm mx-auto">
        You currently don’t have any Sites. Please create some so that you can
        see them right here!
      </p>
      <Button asChild>
        <Link href={`/dashboard/sites/${id}/create`}>
          <PlusCircle className="mr-4 size-4" /> Create Notes
        </Link>
      </Button>
    </div>
  );
};

export default EmptyNote;
