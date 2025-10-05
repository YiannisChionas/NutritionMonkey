import clsx from 'clsx';
import { IoIosMale } from "react-icons/io";
import { IoMaleOutline,IoFemaleOutline,IoMaleFemaleOutline } from "react-icons/io5";

export default function AthleteGender({ gender }: { gender: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': gender === 'other',
          'bg-sky-400 text-white': gender === 'male',
          'bg-pink-400 text-white': gender === 'female',
        },
      )}
    >
      {gender === 'other' ? (
        <>
          Other 
          <IoMaleFemaleOutline className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {gender === 'male' ? (
        <>
          Male
          <IoMaleOutline className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {gender === 'female' ? (
        <>
          Female
          <IoFemaleOutline className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
