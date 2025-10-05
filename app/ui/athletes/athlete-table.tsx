import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import AthleteGender from '@/app/ui/athletes/gender';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredAthletes } from '@/app/lib/data';
import { DeleteAthlete, UpdateAthlete } from '@/app/ui/athletes/buttons';
import { AthleteDetails } from './buttons';

export default async function AthletesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const athletes = await fetchFilteredAthletes(query,currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {athletes?.map((athlete) => (
              <div
                key={athlete.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={athlete.image_url}
                        className="mr-2 rounded-full "
                        width={28}
                        height={28}
                        alt={`${athlete.name}'s profile picture`}
                      />
                      <p>{athlete.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{athlete.email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                    </p>
                    <p>{formatDateToLocal(athlete.date_of_birth)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Athletes
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date of Birth
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Height
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Gender
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {athletes?.map((athlete) => (
                <tr
                  key={athlete.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={athlete.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${athlete.name}'s profile picture`}
                      />
                      <p>{athlete.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {athlete.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(athlete.date_of_birth)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {athlete.height} cm
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <AthleteGender gender={athlete.gender} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <AthleteDetails id={athlete.id} />
                      <UpdateAthlete id={athlete.id} />
                      <DeleteAthlete id={athlete.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
