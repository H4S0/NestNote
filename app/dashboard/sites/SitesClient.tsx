'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import EmptyNote from '@/app/components/dashboard/EmptyNote';

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
  const [data, setData] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const queryParam = searchTerm
        ? `search=${encodeURIComponent(searchTerm)}`
        : '';
      const res = await fetch(`/api/sites?${queryParam}`);
      if (!res.ok) {
        throw new Error('Failed to fetch sites');
      }
      const { sites } = await res.json();
      setData(sites || []);
      console.log(sites);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shouldShowLoadingText = searchTerm === '' && loading;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
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

      {shouldShowLoadingText ? (
        <div className="flex items-center justify-center p-8 text-center">
          <p className="text-lg text-muted-foreground">Loading data...</p>
        </div>
      ) : filteredData.length === 0 && searchTerm === '' ? (
        <EmptyNote />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {filteredData.map((item) => (
            <Card key={item.id}>
              <Image
                width={354}
                height={354}
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
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
                <Link href={`/dashboard/sites/${item.id}`} prefetch={true}>
                  <Button className="w-full">View Notes</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default SitesClient;
