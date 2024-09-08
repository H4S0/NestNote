'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import DefaultImage from '@/public/default.png';

interface Site {
  id: string;
  name: string;
  description: string;
  subdirectory: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string | null;
  userId: string | null;
}

interface SitesClientProps {
  data: Site[];
}

const SitesClient: React.FC<SitesClientProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleViewClick = (siteId: string) => {
    setLoading(true);
    router.push(`/dashboard/sites/${siteId}`);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/75">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={'/dashboard/sites/new'}>Create Site</Link>
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <h2 className="mt-6 text-xl font-semibold">
            You don’t have any Sites created
          </h2>
          <Button asChild>
            <Link href={'/dashboard/sites/new'}>Create Site</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((item) => (
            <Card key={item.id}>
              <Image
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
                <Button
                  className="w-full"
                  onClick={() => handleViewClick(item.id)}
                >
                  View Articles
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
