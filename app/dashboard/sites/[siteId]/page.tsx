import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function SiteIdRoute() {
  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button variant="outline">
          <Link href={'#'}>View Blog</Link>
        </Button>
        <Button variant="outline">
          <Link href={'#'}>Settings</Link>
        </Button>
        <Button asChild>
          <Link href={'#'}>
            <PlusCircle className="size-4 mr-2" /> Create Article
          </Link>
        </Button>
      </div>
    </>
  );
}
