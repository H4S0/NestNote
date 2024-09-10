'use client';
import { useEffect, useState } from 'react';

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
  return <h1>test</h1>;
}
