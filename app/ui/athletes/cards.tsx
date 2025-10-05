import { lusitana } from '@/app/ui/fonts';
import { Athlete } from '@/app/lib/definitions-nm';
import Image from 'next/image';
import AthleteGender from '@/app/ui/athletes/gender';

type AthleteCardWrapperProps = { athlete: Athlete };

export default function AthleteCardWrapper({ athlete }: AthleteCardWrapperProps) {
  return <AthleteCard athlete={athlete} />;
}

export function AthleteCard({ athlete }: { athlete: Athlete }) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3 align-middle">

      <Image
        src={athlete.image_url}
        className="rounded-xl w-full h-auto"
        width={800}
        height={600}
        alt={`${athlete.name}'s profile picture`}
      />

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-500">Name</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center font-medium">
            {athlete.name}
          </dd>
        </div>

        <div className='sm:col-span-2'>
          <dt className="text-sm text-gray-500">Email</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {athlete.email}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">Height</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center">{athlete.height} cm</dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">Weight</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center">{athlete.weight} kg</dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">Fat-Free Mass</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center">{athlete.fat_free_mass} kg</dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">VO2-MAX</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center">{athlete.vo_2_max}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Gender</dt>
          <dd className="mt-1 rounded-lg px-4 py-3 text-start"><AthleteGender gender={athlete.gender} /></dd>
        </div>
      </dl>
    </div>
  );
}

