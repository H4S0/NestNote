'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { EditForm } from '@/app/components/EditForm';
import Loading from '@/app/components/loading';
import React from 'react';

export default function EditArticle({
  params,
}: {
  params: { articleId: string; siteId: string };
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/sites/${params.siteId}/${params.articleId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log('Fetched article data:', result); // Check the entire data structure
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.articleId, params.siteId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center">
        <Button variant="outline" size="icon" className="mr-4">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1>Edit your Notes</h1>
      </div>
      {data && <EditForm data={data} siteId={params.siteId} />}
    </>
  );
}
