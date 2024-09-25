'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Book,
  FileIcon,
  MoreHorizontal,
  PlusCircle,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Loading from '@/app/components/loading';
import EmptyNote from '@/app/components/dashboard/EmptyNote';
import { DeleteNotes } from '@/app/actions';

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
    return <Loading />;
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
          <Link href={`/dashboard/sites/${params.siteId}/settings`}>
            <Settings className="size-4 mr-2" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="size-4 mr-2" /> Create Notes
          </Link>
        </Button>
      </div>

      {data.length === 0 ? (
        <EmptyNote />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>
                Manage your Notes in a simple and intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Learning Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image}
                          width={64}
                          height={64}
                          alt="Article Cover Image"
                          className="size-16 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={(() => {
                            switch (item.status) {
                              case 'NOT_STARTED':
                                return 'bg-red-500/10 text-red-500';
                              case 'LEARNING':
                                return 'bg-blue-500/10 text-blue-500';
                              case 'FINISHED':
                                return 'bg-green-500/10 text-green-500';
                              default:
                                return '';
                            }
                          })()}
                        >
                          {(() => {
                            switch (item.status) {
                              case 'NOT_STARTED':
                                return 'Not started';
                              case 'LEARNING':
                                return 'Learning';
                              case 'FINISHED':
                                return 'Finished';
                              default:
                                return '';
                            }
                          })()}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.createdAt.slice(0, 10)}</TableCell>
                      <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link
                                href={`/dashboard/sites/${params.siteId}/${item.id}`}
                              >
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <form action={DeleteNotes} method="delete">
                                <input
                                  type="hidden"
                                  name="articleId"
                                  value={item.id}
                                />
                                <input
                                  type="hidden"
                                  name="siteId"
                                  value={params.siteId}
                                />
                                <button type="submit">Delete</button>
                              </form>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
