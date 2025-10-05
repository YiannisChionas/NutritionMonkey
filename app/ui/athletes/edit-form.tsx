'use client';

import { useActionState } from 'react';
import { AthleteForm } from '@/app/lib/definitions-nm'
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createAthlete, AthleteState, updateAthlete } from '@/app/lib/actions';

function toYMD(iso?: string) {
  if (!iso) return '';
  const s = String(iso);
  console.log(s.includes('T') ? s.split('T')[0] : s);
  return s.includes('T') ? s.split('T')[0] : s;
}

export default function EditAthleteForm({athlete,}: {  athlete: AthleteForm;}) {
  const initialState: AthleteState = { message: null, errors: {} };
  const updateAthleteWithId = updateAthlete.bind(null, athlete.id);
  const [state, formAction] = useActionState(updateAthleteWithId, initialState);
 
  return ( <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Athlete Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter athlete name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={athlete.name}
                required
                autoComplete="name"
                className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                state.errors?.name?.length ? 'border-red-500' : 'border-gray-200'}`}
                aria-describedby="name-error"
              />
            </div>
          </div>
           <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Athlete email */}

        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Enter athlete email address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                defaultValue={athlete.email}
                required
                autoComplete="email"
                className={`peer block w-full rounded-md border py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
                state.errors?.email?.length ? 'border-red-500' : 'border-gray-200'}`}
                aria-describedby="email-error"
              />
            </div>
          </div>
           <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
            
        {/* Athlete Date of Birth */}
        
        <div className="mb-4">
            <label htmlFor="date_of_birth" className="block text-sm font-medium">
                Date of birth
            </label>
                <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                defaultValue={athlete.date_of_birth}
                min="1940-04-01"
                required
                className="mt-2 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
                />
        </div>
        <div id="date_of_birth-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date_of_birth?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                </p>
            ))}
        </div>

        {/* Athlete Gender */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the athlete gender
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  defaultChecked={athlete.gender === 'male'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="male"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-sky-300 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="female"
                  defaultChecked={athlete.gender === 'female'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby='gender-error'
                />
                <label
                  htmlFor="female"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-pink-300 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="other"
                  name="gender"
                  type="radio"
                  value="other"
                  defaultChecked={athlete.gender === 'other'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="other"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-300 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Other
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <div id="gender-error" aria-live="polite" aria-atomic="true">
          {state.errors?.gender?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
        
        {/* Athlete Height */}

        <label htmlFor="height" className="mb-2 block text-sm font-medium">
            Height (cm)
        </label>
        <input
            id="height"
            name="height"
            type="number"
            inputMode="decimal"
            pattern="^\d+([.,]\d{1,2})?$"   // έως 2 δεκαδικά
            defaultValue={athlete.height}
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="height-error"
        />
        <div id="height-error" aria-live="polite" aria-atomic="true">
            {state.errors?.height?.map((e) => (
                <p className="mt-2 text-sm text-red-500" key={e}>{e}</p>
            ))}
        </div>
        
        {/* Athlete Weight */}
        
        <label htmlFor="weight" className="mb-2 block text-sm font-medium">
            Weight (gr)
        </label>
        <input
            id="weight"
            name="weight"
            type="number"
            inputMode="decimal"
            defaultValue={athlete.weight}
            placeholder="e.g. 72500"
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="weight-error"
        />
        <div id="weight-error" aria-live="polite" aria-atomic="true">
            {state.errors?.weight?.map((e) => (
                <p className="mt-2 text-sm text-red-500" key={e}>{e}</p>
            ))}
        </div>
        <label htmlFor="weight" className="mb-2 block text-sm font-medium">
            fat_free_mass (gr)
        </label>
        <input
            id="fat_free_mass"
            name="fat_free_mass"
            type="number"
            inputMode="decimal"
            pattern="^\d+([.,]\d{1,2})?$"   // έως 2 δεκαδικά
            defaultValue={athlete.fat_free_mass}
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="fat_free_mass-error"
        />
        <div id="fat_free_mass-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fat_free_mass?.map((e) => (
                <p className="mt-2 text-sm text-red-500" key={e}>{e}</p>
            ))}
        </div>
        <label htmlFor="weight" className="mb-2 block text-sm font-medium">
            vo_2_max
        </label>
        <input
            id="vo_2_max"
            name="vo_2_max"
            type="number"
            inputMode="decimal"
            pattern="^\d+([.,]\d{1,2})?$"   // έως 2 δεκαδικά
            defaultValue={athlete.vo_2_max}
            required
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm"
            aria-describedby="vo_2_max-error"
        />
        <div id="vo_2_max-error" aria-live="polite" aria-atomic="true">
            {state.errors?.vo_2_max?.map((e) => (
                <p className="mt-2 text-sm text-red-500" key={e}>{e}</p>
            ))}
        </div>
      </div>
      {/* Generic Error Message */}
      {state.message && (
        <div
          aria-live="polite"
          className="mt-4 rounded-md bg-red-50 p-2 text-sm text-red-600"
        >
          {state.message}
        </div>
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/athletes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Athlete</Button>
      </div>
    </form>
  );
}
