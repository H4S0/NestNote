import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Atom, AtomIcon } from 'lucide-react';
import Link from 'next/link';

export default function ArticleCreating({
  params,
}: {
  params: { siteId: string };
}) {
  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-3" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-6" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="Blog" />
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="article slug" />
              <Button className="w-fit" variant="secondary" type="button">
                <AtomIcon className="mr-2" /> Generate Slug
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
