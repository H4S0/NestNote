'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import DefaultImage from '@/public/default.png';
import Loading from '@/app/components/loading';
import { Input } from '@/components/ui/input';

interface Site {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string | null;
  userId: string | null;
}

const SitesClient = () => {
  const [data, setData] = useState<Site[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/sites?search=${encodeURIComponent(searchTerm)}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch sites');
        }
        const sites = await res.json();
        setData(sites || []); // Ensure data is an array, fallback to empty array
      } catch (error) {
        console.error(error);
        setData([]); // Ensure fallback to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  // Loading state only for card display, not for the entire page
  if (loading && data.length === 0) {
    return <Loading />;
  }

  // Filtered sites based on search input
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="w-64">
          <Input
            placeholder="Search for your notebook"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href={'/dashboard/sites/new'}>
            <PlusCircle className="mr-4 size-4" /> Create Notebook
          </Link>
        </Button>
      </div>

      {/* Handle case when no data is found */}
      {filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/30">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            No matching notebooks found
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-2 text-muted-foreground max-w-sm mx-auto">
            Try searching for another term or create a new notebook.
          </p>
          <Button asChild>
            <Link href={'/dashboard/sites/new'}>
              <PlusCircle className="mr-4 size-4" /> Create Note
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {filteredData.map((item) => (
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
              <CardContent>
                <div className="flex items-center gap-3">
                  <p>Notes from</p>
                  <p>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                    })}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>View Notes</Link>
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
