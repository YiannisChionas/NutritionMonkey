import { unstable_noStore as noStore } from 'next/cache';
import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { AthleteField, AthleteForm, MealPlanItem, TrainingPlanItem, PlanItem, PlanItemStatus, PlanItemType, RawRow } from './definitions-nm';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchAthleteCardData() {
  try {
    const athleteCountPromise = sql`SELECT COUNT(*) FROM athletes`;
    const planItemsCountPromise = sql`SELECT COUNT(*) FROM plan_items`;
    const athleteGenderPromise = sql`SELECT
         SUM(CASE WHEN gender = 'male' THEN 1 ELSE 0 END) AS "male",
         SUM(CASE WHEN gender = 'female' THEN 1 ELSE 0 END) AS "female",
         SUM(CASE WHEN gender = 'other' THEN 1 ELSE 0 END) AS "other"
         FROM athletes`;

    const data = await Promise.all([
      athleteCountPromise,
      planItemsCountPromise,
      athleteGenderPromise
    ]);

    const numberOfAthletes = Number(data[0][0].count ?? '0');
    const numberOfPlanItems = Number(data[1][0].count ?? '0');
    const totalMaleAthletes = Number(data[2][0].male ?? '0');
    const totalFemaleAthletes = Number(data[2][0].female ?? '0');
    const totalOtherAthletes = Number(data[2][0].other ?? '0');

    return {
      numberOfAthletes,
      numberOfPlanItems,
      totalMaleAthletes,
      totalFemaleAthletes,
      totalOtherAthletes
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch athlete card data.');
  }
}




const ITEMS_PER_PAGE = 6;
const PLAN_ITEMS_PER_PAGE = 1;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}
export async function fetchFilteredAthletes(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const q = `%${query}%`;

  type AthleteRow = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    date_of_birth: string;
    gender: string;
    height: number;
    weight: number;
    fat_free_mass: number;
    vo_2_max: number;
  };

  try {
    const athletes = await sql<AthleteRow[]>`
      SELECT
        a.id,
        a.name,
        a.email,
        a.image_url,
        a.date_of_birth,
        a.gender,
        a.height,
        a.weight,
        a.fat_free_mass,
        a.vo_2_max
      FROM athletes a
      WHERE
        a.name ILIKE ${q} OR
        a.email ILIKE ${q} OR
        a.gender ILIKE ${q} OR
        to_char(a.date_of_birth, 'YYYY-MM-DD') ILIKE ${q} OR
        a.height::text ILIKE ${q} OR
        a.weight::text ILIKE ${q} OR
        a.fat_free_mass::text ILIKE ${q} OR
        a.vo_2_max::text ILIKE ${q}
      ORDER BY a.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return athletes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch athletes.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql
    `SELECT COUNT(*)
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchPlanItems(athleteId: string, currentPage: number, pageSize = 1) {
  const offset = (currentPage - 1) * pageSize;
  try {
  const rows = await sql<PlanItem[]>
  `SELECT id, athlete_id, type, status, start_at, notes, meal_id, training_id
    FROM plan_items
      WHERE athlete_id = ${athleteId}
      ORDER BY start_at DESC
      LIMIT ${pageSize} OFFSET ${offset}
  `;
  return rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch PlanItems.');
}
}

export async function fetchPlanItemsPages(athleteId: string) {
  try {
    const rows = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count
      FROM plan_items
      WHERE athlete_id = ${athleteId}
    `;
    const count = rows[0]?.count ?? 0;
    return Math.ceil(count / PLAN_ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of plan_items.');
  }
}

export async function fetchTrainingPages(athleteId: string) {
  try {
    const rows = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count
      FROM trainings
      WHERE athlete_id = ${athleteId}
    `;
    const count = rows[0]?.count ?? 0;
    return Math.ceil(count / PLAN_ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of plan_items.');
  }
}

export async function fetchMealPlanPages(athleteId: string) {
  const rows = await sql<{ count: number }[]>`
    SELECT COUNT(*)::int AS count
    FROM plan_items p
    WHERE p.athlete_id = ${athleteId}
      AND p.type = 'MEAL'   -- ή: AND p.meal_id IS NOT NULL
  `;
  const count = rows[0]?.count ?? 0;
  return Math.ceil(count / 2);
}

export async function fetchAthletesPages(query: string) {
  noStore();
  try {
    const q = `%${query}%`;

    const data = await sql`
      SELECT COUNT(*)
      FROM athletes a
      WHERE
        a.name ILIKE ${q} OR
        a.email ILIKE ${q} OR
        a.gender ILIKE ${q} OR
        to_char(a.date_of_birth, 'YYYY-MM-DD') ILIKE ${q} OR
        a.height::text ILIKE ${q} OR
        a.weight::text ILIKE ${q} OR
        a.fat_free_mass::text ILIKE ${q} OR
        a.vo_2_max::text ILIKE ${q}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of athletes.');
  }
}
export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchAthleteById(id: string) {
  try {
    const data = await sql<AthleteForm[]>`
      SELECT
        athletes.id,
        athletes.name,
        athletes.email,
        athletes.image_url,
        to_char(athletes.date_of_birth, 'YYYY-MM-DD') AS date_of_birth,
        athletes.gender,
        athletes.height,
        athletes.weight,
        athletes.fat_free_mass,
        athletes.vo_2_max
      FROM athletes
      WHERE athletes.id = ${id};
    `;

    const athlete = data.map((athlete) => ({
      ...athlete,
    }));

    return athlete[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch athlete.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
export async function fetchAthletes() {
  noStore();
  try {
    const athletes = await sql<AthleteField[]>`
      SELECT
        id,
        name
      FROM athletes
      ORDER BY name ASC
    `;

    return athletes;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all athletes.');
  }
}

export async function fetchAthleteMealPlanItems(id:string) {
  try {
    const data = await sql<MealPlanItem[]>`
      SELECT
        p.id,
        p.meal_id,
        p.athlete_id,
        p.status,
        p.start_at::text AS start_at,
        COALESCE(p.notes, '')      AS notes,
        COALESCE(m.title, '')          AS title,
        COALESCE(m.calories, 0)      AS calories,
        COALESCE(m.protein, 0)       AS protein,
        COALESCE(m.carbohydrates, 0) AS carbohydrates,
        COALESCE(m.fats, 0)          AS fats,
        COALESCE(m.tags, ARRAY[]::varchar[])          AS tags
      FROM plan_items p
      LEFT JOIN meals m ON m.id = p.meal_id
      WHERE p.athlete_id = ${id}
        AND p.type = 'MEAL'
      ORDER BY p.start_at DESC
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meal plan items.');
  }
}

export async function fetchAthleteTrainingPlanItems(id:string) {
  try {
    const data = await sql<TrainingPlanItem[]>`
      SELECT
        p.id,
        p.training_id,
        p.athlete_id,
        p.status,
        p.start_at::text AS start_at,
        COALESCE(p.notes, '')      AS notes,
        COALESCE(t.title, '')          AS title,
        COALESCE(t.calories, 0)      AS calories,
        COALESCE(t.tags, ARRAY[]::varchar[])          AS tags
      FROM plan_items p
      LEFT JOIN trainings t ON t.id = p.training_id
      WHERE p.athlete_id = ${id}
        AND p.type = 'WORKOUT'
      ORDER BY p.start_at DESC
    `;
    console.log(id);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch training plan items.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

type PlanItemRow = {
  id: string;
  athlete_id: string;
  type: PlanItemType;           // 'MEAL' | 'WORKOUT'
  start_at: Date | string;
  status: PlanItemStatus;       // 'PLANNED' | 'DUE' | 'DONE' | 'SKIPPED'
  meal_id: string | null;
  training_id: string | null;
  notes: string | null;
};

export async function fetchAthletePlanItems(athleteId: string): Promise<PlanItem[]> {
  const rows = (await sql`
  SELECT id, athlete_id,
    type,
    start_at,
    status,
    meal_id,
    training_id,
    notes
  FROM plan_items
  WHERE athlete_id = ${athleteId}
  ORDER BY start_at ASC;
`) as PlanItemRow[];

  return rows.map((r): PlanItem => {
    const start_at = r.start_at instanceof Date ? r.start_at.toISOString() : r.start_at;

    if (r.type === 'MEAL') {
      return {
        id: r.id,
        athlete_id: r.athlete_id,
        type: 'MEAL',
        start_at,
        status: r.status,
        notes: r.notes ?? undefined,
        meal_id: r.meal_id!,        // πρέπει να υπάρχει σε MEAL
      };
    }
    return {
      id: r.id,
      athlete_id: r.athlete_id,
      type: 'WORKOUT',
      start_at,
      status: r.status,
      notes: r.notes ?? undefined,
      training_id: r.training_id!,  // πρέπει να υπάρχει σε WORKOUT
    };
  });
}