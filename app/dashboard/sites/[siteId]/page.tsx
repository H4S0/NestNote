'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Book, FileIcon, PlusCircle, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SiteIdRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/sites/${params.siteId}`);
        if (response.status === 401) {
          router.push('/api/auth/login');
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.siteId, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="outline">
          <Link href={'#'}>
            <Book className="size-4 mr-2" />
            View Blog
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={'#'}>
            <Settings className="size-4 mr-2" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="size-4 mr-2" /> Create Article
          </Link>
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/30">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You don't have any posts created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-2 text-muted-foreground max-w-sm mx-auto">
            You currently don’t have any posts. Please create some so that you
            can see them right here!
          </p>

          <Button asChild>
            <Link href={'/dashboard/sites/new'}>
              <PlusCircle className="mr-4 size-4" /> Create Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="post-list">
          {data.map((post) => (
            <div key={post.id} className="post-item">
              <h2>{post.title}</h2>
              <img src={post.image} alt={post.title} />
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
