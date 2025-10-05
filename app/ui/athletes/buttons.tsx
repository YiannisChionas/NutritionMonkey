import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteAthlete } from '@/app/lib/actions';
import { FaRegClipboard } from "react-icons/fa";


export function CreateAthlete() {
  return (
    <Link
      href="/dashboard/athletes/create"
      className="flex h-10 items-center rounded-lg bg-gradient-to-r from-green-500 to-lime-500 px-4 text-sm font-medium text-white transition-colors hover:bg-gradient-to-l hover:from-green-500 hover:to-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      <span className="hidden md:block">Create Athlete</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function AthleteDetails({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/athletes/${id}/details`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <FaRegClipboard />
    </Link> 
  );
}

export function UpdateAthlete({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/athletes/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteAthlete({ id }: { id: string }) {
  
  const deleteInvoiceWithId = deleteAthlete.bind(null, id);
  
  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}