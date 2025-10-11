import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchAthleteById } from '@/app/lib/data';
import { fetchAthleteMealPlanItems,fetchAthleteTrainingPlanItems } from '@/app/lib/data';        // <- paged list
import { fetchPlanItemsPages } from '@/app/lib/data';         // <- total pages
import CardWrapper from '@/app/ui/athletes/cards';
import { PlanItemsList } from '@/app/ui/athletes/meal-card';
import { TrainingPlanItemsList } from '@/app/ui/athletes/training-card';
import PlanItemPagination from '@/app/ui/athletes/plan-item-pagination';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const PAGE_SIZE = 6;

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;

  const [athlete] = await Promise.all([
    fetchAthleteById(id),
    fetchPlanItemsPages(id),
  ]);
  if (!athlete) notFound();

  const items = await fetchAthleteMealPlanItems(id);
  const trainingItems = await fetchAthleteTrainingPlanItems(id);

  return (
    <div className="w-full">
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Athletes', href: '/dashboard/athletes' },
            { label: 'Athlete Details', href: `/dashboard/athletes/${id}/details`, active: true },
          ]}
        />

        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 sm:grid-cols-1">
          <CardWrapper athlete={athlete} />
          <PlanItemsList plan_items={items} />
          <TrainingPlanItemsList plan_items={trainingItems} />
        </div>

        <div className="mt-6">
          <Link
            href="/dashboard/athletes"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Back
          </Link>
        </div>
      </main>
    </div>
  );
}
