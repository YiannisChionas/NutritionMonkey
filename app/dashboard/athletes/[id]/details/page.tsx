import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchAthleteById, fetchAthletePlanItems } from '@/app/lib/data';
import { notFound } from 'next/navigation'
import CardWrapper, { AthleteCard } from '@/app/ui/athletes/cards';
import Link from 'next/link';
import { PlanItemsList } from '@/app/ui/athletes/plan-item-card';
import { plan_items } from '@/app/lib/placeholder-data-nm';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [athlete] = await Promise.all([
    fetchAthleteById(id),
  ]);
  const [plan_items] = await Promise.all([
    fetchAthletePlanItems(id)
  ])

  if (!athlete) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Athletes', href: '/dashboard/athletes' },
          {
            label: 'Athlete Details',
            href: `/dashboard/athletes/${id}/details`,
            active: true,
          },
        ]}
      />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <CardWrapper athlete={athlete} />
        <PlanItemsList plan_items={plan_items}/>

        <div className='bg-gray-100'/>
      </div>
      <div className='mt-2 items-end' >
        <Link
          href="/dashboard/athletes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
      </div>
    </main>
    </div>
    </div>
  );
}