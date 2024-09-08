'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import DefaultImage from '@/public/default.png';
import Loading from '@/app/components/loading';

interface Site {
  id: string;
  name: string;
  description: string;
  subdirectory: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string | null; // Allow both null and undefined
  userId: string | null;
}

const SitesClient = () => {
  const [data, setData] = useState<Site[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/sites'); // Fetch data from the API route
      const sites = await res.json();
      setData(sites);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={'/dashboard/sites/new'}>
            <PlusCircle className="mr-4 size-4" /> Create Site
          </Link>
        </Button>
      </div>

      {data === null || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/30">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You don’t have any Sites created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-2 text-muted-foreground max-w-sm mx-auto">
            You currently don’t have any Sites. Please create some so that you
            can see them right here!
          </p>

          <Button asChild>
            <Link href={'/dashboard/sites/new'}>
              <PlusCircle className="mr-4 size-4" /> Create Site
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((item) => (
            <Card key={item.id}>
              <Image
                priority
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                width={400}
                height={200}
                className="rounded-t-lg object-cover w-full h-[200px]"
              />
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default SitesClient;
