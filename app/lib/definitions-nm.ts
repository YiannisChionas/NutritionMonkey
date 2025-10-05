// This file contains type definitions for the data.

// Reusable string aliases
export type ISODate = string;       // 'YYYY-MM-DD'
export type ISODateTime = string;   // 'YYYY-MM-DDTHH:mm:ss±HH:mm'

export type Gender = 'male' | 'female' | 'other';

// Users
export type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

// Coaches
export type Coach = {
  id: string;
  name: string;
  email: string;
  date_of_birth: ISODate;
  gender: Gender;
};

// Athletes
export type Athlete = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  date_of_birth: ISODate;
  gender: Gender;
  height: number;         // cm
  weight: number;         // grams
  fat_free_mass: number;  // grams
  vo_2_max: number;
};

// Teams
export type Team = {
  id: string;
  title: string;
  user_id: string;            // users[n].id
  team_coaches: string;       // coach id
  team_athletes: string[];    // athlete ids
};

export type MealTag =
  | 'breakfast'
  | 'brunch'
  | 'lunch'
  | 'dinner'
  | 'snack'
  | 'post-workout'
  | 'high-protein';

export type TrainingTag =
  | 'running'
  | 'tempo'
  | 'intervals'
  | 'track'
  | 'long-run'
  | 'endurance'
  | 'recovery'
  | 'strength'
  | 'gym'
  | 'mobility'
  | 'core'
  | 'cycling'
  | 'cross-training';

// Meals
export type Meal = {
  id: string;
  title: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  tags: MealTag[];
};

// Trainings
export type Training = {
  id: string;
  title: string;
  calories: number;
  tags: TrainingTag[];
};

// Plan Items
export type PlanItemStatus = 'PLANNED' | 'DUE' | 'DONE' | 'SKIPPED';
export type PlanItemType = 'MEAL' | 'WORKOUT';

type PlanItemBase = {
  id: string;
  athlete_id: string;     // owner athlete
  start_at: ISODateTime;
  status: PlanItemStatus;
  notes?: string;
};

export type PlanMeal = PlanItemBase & {
  type: 'MEAL';
  meal_id: string;
  training_id?: never;
};

export type PlanWorkout = PlanItemBase & {
  type: 'WORKOUT';
  training_id: string;
  meal_id?: never;
};

export type PlanItem = PlanMeal | PlanWorkout;

export type AthleteField = {
  id: string;
  name: string;
};

export type AthleteForm = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  date_of_birth: ISODate;
  gender: Gender;
  height: number;         // cm
  weight: number;         // grams
  fat_free_mass: number;  // grams
  vo_2_max: number;
};
