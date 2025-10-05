import Form from '@/app/ui/athletes/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchAthleteById } from '@/app/lib/data';
import { notFound } from 'next/navigation'
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [athlete] = await Promise.all([
    fetchAthleteById(id),
  ]);
  
  if (!athlete) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Athletes', href: '/dashboard/athletes' },
          {
            label: 'Edit Athlete',
            href: `/dashboard/athletes/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form athlete={athlete}/>
    </main>
  );
}