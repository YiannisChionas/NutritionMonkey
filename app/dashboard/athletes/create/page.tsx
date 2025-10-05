import Form from '@/app/ui/athletes/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchAthletes } from '@/app/lib/data';
 
export default async function Page() {
  const athletes = await fetchAthletes();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Athletes', href: '/dashboard/athletes' },
          {
            label: 'Create Athlete',
            href: '/dashboard/athletes/create',
            active: true,
          },
        ]}
      />
      <Form athletes={athletes} />
    </main>
  );
}