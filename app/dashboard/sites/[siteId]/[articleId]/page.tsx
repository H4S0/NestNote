'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import EditForm from '@/app/components/EditForm';

export default function EditArticle({
  params,
}: {
  params: { articleId: string; siteId: string };
}) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/sites/${params.siteId}/${params.articleId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    };

    fetchData();
    console.log(data);
  }, [params.articleId, params.siteId]);
  return (
    <>
      <div className="flex items-center">
        <Button variant="outline" size="icon" className="mr-4">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft />
          </Link>
        </Button>
        <h1>Edit your Article</h1>
      </div>
      <EditForm params={params.siteId} />
    </>
  );
}
