'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Gender,ISODate } from '@/app/lib/definitions-nm';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce.number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'],{
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const AthleteFormSchema = z.object({
  id: z.string(),
  name: z.string({ invalid_type_error: 'Please give a valid name.' })
    .trim()
    .min(1, { message: 'Name is required.' })
    .max(120, { message: 'Name is too long.' }),
  email: z.string({ invalid_type_error: 'Please give a valid email address.' })
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email address.' }),
  image_url: z.preprocess(
    (v) => {
      if (v == null) return undefined;            // <- πιάνει null/undefined
      const s = String(v).trim();
      return s === '' ? undefined : s;            // <- κενό string -> undefined
    },
    z.string().trim().optional()
  ),
  date_of_birth: z.coerce.date({ invalid_type_error: 'Please provide a valid date.' })
  .transform(d => d.toISOString()),
  gender: z.enum(['male', 'female', 'other'], {
    invalid_type_error: 'Please select a gender.',
  }),
  height: z.coerce.number()
    .gt(0, { message: 'Please enter a value greater than 0.' })
    .min(100, { message: 'Height seems too small.' })
    .max(250, { message: 'Height seems too large.' }),
  weight: z.coerce.number()
    .gt(0, { message: 'Please enter a value greater than 0.' })
    .max(400000, { message: 'Weight seems too large.' }),
  fat_free_mass: z.coerce.number()
    .gt(0, { message: 'Please enter a value greater than 0.' })
    .max(400000, { message: 'Fat-free mass seems too large.' }),
  vo_2_max: z.coerce.number()
    .gt(0, { message: 'Please enter a value greater than 0.' })
    .min(10, { message: 'VO₂max seems too low.' })
    .max(95, { message: 'VO₂max seems too high.' }),
})

const CreateAthlete = AthleteFormSchema.omit({ id: true });
const UpdateAthlete = AthleteFormSchema.omit({ id: true });

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type AthleteState = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
    date_of_birth?: string[];
    gender?: string[];
    height?: string[];
    weight?: string[];
    fat_free_mass?: string[];
    vo_2_max?: string[];
  };
  message?: string | null;
};

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
 
export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function createAthlete(prevState: AthleteState, formData: FormData) {
  const validatedFields = CreateAthlete.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
    date_of_birth: formData.get('date_of_birth'), // μπορεί να είναι "YYYY-MM-DD"
    gender: formData.get('gender'),
    height: formData.get('height'),
    weight: formData.get('weight'),
    fat_free_mass: formData.get('fat_free_mass'),
    vo_2_max: formData.get('vo_2_max'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Athlete.',
    };
  }

  const {
    name, email, image_url, date_of_birth, gender,
    height, weight, fat_free_mass, vo_2_max
  } = validatedFields.data;

    const dobISO = date_of_birth;        // ήδη ISO string από το schema
    const dobDateOnly = dobISO.split('T')[0];  // 'YYYY-MM-DD'
    
    const defaultImage = "/athletes/default.png"; // (το είχες ήδη)
    const image = image_url ?? defaultImage;

  try {
    await sql`
      INSERT INTO athletes (name, email, image_url, date_of_birth, gender, height, weight, fat_free_mass, vo_2_max)
      VALUES (${name}, ${email}, ${image}, ${dobDateOnly}, ${gender}, ${height}, ${weight}, ${fat_free_mass}, ${vo_2_max})
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Create Athlete.' };
  }

  revalidatePath('/dashboard/athletes');
  redirect('/dashboard/athletes');
}

export async function updateInvoice(id: string,  prevState: State ,formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
 
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // We'll also log the error to the console for now
    
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateAthlete(id: string, prevState: AthleteState, formData: FormData) {
  const validated = UpdateAthlete.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
    date_of_birth: formData.get('date_of_birth'),
    gender: formData.get('gender'),
    height: formData.get('height'),
    weight: formData.get('weight'),
    fat_free_mass: formData.get('fat_free_mass'),
    vo_2_max: formData.get('vo_2_max'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Athlete.',
    };
  }

  const v = validated.data;
  
  const dobISO = v.date_of_birth;        // ήδη ISO string από το schema
  const dobDateOnly = dobISO.split('T')[0];  // 'YYYY-MM-DD'

  const defaultImage = "/athletes/default.png"; // (το είχες ήδη)
  const image = v.image_url ?? defaultImage;

  try {
    await sql`
      UPDATE athletes SET
        name = ${v.name},
        image_url = ${image},
        date_of_birth = ${dobDateOnly},
        gender = ${v.gender},
        height = ${v.height},
        weight = ${v.weight},
        fat_free_mass = ${v.fat_free_mass},
        vo_2_max = ${v.vo_2_max}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Athlete.' };
  }

  revalidatePath('/dashboard/athletes');
  redirect('/dashboard/athletes');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

export async function deleteAthlete(id: string) {
  await sql`DELETE FROM athletes WHERE id = ${id}`;
  revalidatePath('/dashboard/athletes');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

