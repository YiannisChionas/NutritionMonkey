import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users, coaches, athletes, teams, meals, trainings, plan_items } from '../lib/placeholder-data-nm';
import type { PlanItem, PlanMeal, PlanWorkout } from '@/app/lib/definitions-nm';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  return Promise.all(
    users.map(async (u) => {
      const hashed = await bcrypt.hash(u.password, 10);
      return sql`
        INSERT INTO users (id, username, firstname, lastname, email, password)
        VALUES (${u.id}, ${u.username}, ${u.firstname}, ${u.lastname}, ${u.email}, ${hashed})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}

async function seedCoaches() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS coaches (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      date_of_birth DATE NOT NULL,
      gender VARCHAR(255) NOT NULL
    );
  `;
  return Promise.all(
    coaches.map(c => sql`
      INSERT INTO coaches (id, name, email, date_of_birth, gender)
      VALUES (${c.id}, ${c.name}, ${c.email}, ${c.date_of_birth}, ${c.gender})
      ON CONFLICT (id) DO NOTHING;
    `)
  );
}

async function seedAthletes() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS athletes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      image_url VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      gender VARCHAR(255) NOT NULL,
      height INT NOT NULL,
      weight INT NOT NULL,
      fat_free_mass INT NOT NULL,
      vo_2_max INT NOT NULL
    );
  `;
  return Promise.all(
    athletes.map(a => sql`
      INSERT INTO athletes (id, name, email, image_url, date_of_birth, gender, height, weight, fat_free_mass, vo_2_max)
      VALUES (${a.id}, ${a.name}, ${a.email}, ${a.image_url}, ${a.date_of_birth}, ${a.gender}, ${a.height}, ${a.weight}, ${a.fat_free_mass}, ${a.vo_2_max})
      ON CONFLICT (id) DO NOTHING;
    `)
  );
}

async function seedTeams() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS teams (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      user_id UUID NOT NULL,
      team_coaches UUID NOT NULL,
      team_athletes UUID[] NOT NULL
    );
  `;
  return Promise.all(
    teams.map(t => sql`
      INSERT INTO teams (id, title, user_id, team_coaches, team_athletes)
      VALUES (${t.id}, ${t.title}, ${t.user_id}, ${t.team_coaches}, ${t.team_athletes}::uuid[])
      ON CONFLICT (id) DO NOTHING;
    `)
  );
}

async function seedMeals() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS meals (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      calories INT NOT NULL,
      protein INT NOT NULL,
      carbohydrates INT NOT NULL,
      fats INT NOT NULL,
      tags VARCHAR(255)[] NOT NULL
    );
  `;
  return Promise.all(
    meals.map(m => sql`
      INSERT INTO meals (id, title, calories, protein, carbohydrates, fats, tags)
      VALUES (${m.id}, ${m.title}, ${m.calories}, ${m.protein}, ${m.carbohydrates}, ${m.fats}, ${m.tags}::varchar(255)[])
      ON CONFLICT (id) DO NOTHING;
    `)
  );
}

async function seedTrainings() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS trainings (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      calories INT NOT NULL,
      tags VARCHAR(255)[] NOT NULL
    );
  `;
  return Promise.all(
    trainings.map(t => sql`
      INSERT INTO trainings (id, title, calories, tags)
      VALUES (${t.id}, ${t.title}, ${t.calories}, ${t.tags}::varchar(255)[])
      ON CONFLICT (id) DO NOTHING;
    `)
  );
}

async function seedPlanItems() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS plan_items (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      athlete_id UUID NOT NULL REFERENCES athletes(id),
      type TEXT NOT NULL CHECK (type IN ('MEAL','WORKOUT')),
      start_at TIMESTAMPTZ NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('PLANNED','DUE','DONE','SKIPPED')),
      meal_id UUID NULL REFERENCES meals(id),
      training_id UUID NULL REFERENCES trainings(id),
      notes TEXT,
      CONSTRAINT plan_items_meal_training_xor
        CHECK (
          (meal_id IS NOT NULL AND training_id IS NULL)
          OR (meal_id IS NULL AND training_id IS NOT NULL)
        )
    );
  `;
  return Promise.all(
    (plan_items as PlanItem[]).map(p => {
      const mealId: string | null = p.type === 'MEAL' ? (p as PlanMeal).meal_id : null;
      const trainingId: string | null = p.type === 'WORKOUT' ? (p as PlanWorkout).training_id : null;
      const notes: string | null = p.notes ?? null;
      return sql`
        INSERT INTO plan_items (id, athlete_id, type, start_at, status, meal_id, training_id, notes)
        VALUES (${p.id}, ${p.athlete_id}, ${p.type}, ${p.start_at}, ${p.status}, ${mealId}, ${trainingId}, ${notes})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}

export async function GET() {
  try {
    // Σειριακά, για να υπάρχουν πρώτα τα FK targets
    await seedUsers();
    await seedCoaches();
    await seedAthletes();
    await seedTeams();
    await seedMeals();
    await seedTrainings();
    await seedPlanItems();

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error(error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
