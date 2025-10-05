// This file contains placeholder data 
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a5442a',
    username: 'johndoe',
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@example.com',
    password: 'pass123',
  },
  {
    id: '410544b3-4001-4271-9855-fec4b6a6442a',
    username: 'janedoe',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'janedoe@example.com',
    password: 'pass123',
  },
];

const coaches = [
  {
    id: '8b1c2d34-5e67-4a90-9cde-1f23456789ab',
    name: 'Jonas MonkeyBussiness',
    email: 'jonasmonkeybussiness@example.com',
    date_of_birth: '1975-02-02',
    gender: 'male',
  },
  {
    id: '2f3d5a8e-1c2b-4d67-9f10-5a6b7c8d9e01',
    name: 'Maria MonkeyMagic',
    email: 'mariamonkeymagic@example.com',
    date_of_birth: '1992-11-05',
    gender: 'female',
  },
  {
    id: 'a4b7c9d2-3e45-4f67-8a90-b1c2d3e4f5a6',
    name: 'Kostas ChillMonkey',
    email: 'kostaschillmonkey@example.com',
    date_of_birth: '1988-07-19',
    gender: 'male',
  },
];

const athletes = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Jerry Banana',
    email: 'jerrybanana@example.com',
    image_url: '/athletes/jerry-banana.png',
    date_of_birth: '1991-11-14',
    gender: 'male',
    height: 176,
    weight: 72100,
    fat_free_mass: 60600,
    vo_2_max: 56,
  },
  {
    id: '4bb9c9a0-5e43-4f1e-b77b-1a9e8f3a2c9d',
    name: 'Maya Monkey',
    email: 'maya.monkey@example.com',
    image_url: '/athletes/maya-monkey.png',
    date_of_birth: '1995-07-03',
    gender: 'female',
    height: 168,
    weight: 62000,
    fat_free_mass: 51000,
    vo_2_max: 52,
  },
  {
    id: 'a2d15f5a-7d9f-4b23-9b67-0a1c2d3e4f5a',
    name: 'Alex Monkeyson',
    email: 'alex.monkeyson@example.com',
    image_url: '/athletes/alex-monkeyson.png',
    date_of_birth: '1989-02-21',
    gender: 'male',
    height: 182,
    weight: 81500,
    fat_free_mass: 67000,
    vo_2_max: 58,
  },
  {
    id: 'c7fa8e9d-1234-4cf3-8b29-77b289e4d3a1',
    name: 'Nikos Monkeyrunner',
    email: 'nikosmonkeyrunner@example.com',
    image_url: '/athletes/nikos-monkeyrunner.png',
    date_of_birth: '1998-12-09',
    gender: 'male',
    height: 175,
    weight: 70400,
    fat_free_mass: 59000,
    vo_2_max: 60,
  },
  {
    id: 'e13b2f76-9a44-4c69-8f8c-4b1aef9a0d21',
    name: 'Lia Monkeymind',
    email: 'lia.monkeymind@example.com',
    image_url: '/athletes/lia-monkeymind.png',
    date_of_birth: '1993-05-17',
    gender: 'female',
    height: 170,
    weight: 58500,
    fat_free_mass: 49000,
    vo_2_max: 47,
  },
  {
    id: 'f0c3ab55-2e1b-4f8e-91f3-75d5b807c6be',
    name: 'Stavros SuperMonkey',
    email: 'stavros.supermonkey@example.com',
    image_url: '/athletes/stavros-supermonkey.png',
    date_of_birth: '1990-09-28',
    gender: 'male',
    height: 188,
    weight: 92000,
    fat_free_mass: 77000,
    vo_2_max: 62,
  },
];

const teams = [
  {
    id: '3f9a1c2b-7d48-4e91-a3b6-5c8de1f0a2d4',
    title: 'Monkeyster United',
    user_id: users[0].id,
    team_coaches: coaches[0].id,
    team_athletes: [athletes[0].id, athletes[1].id],
  },
  {
    id: '3f9a1c2b-7d44-4e91-a3b6-5c8de1f0a2d4',
    title: 'Monkeyntus',
    user_id: users[1].id,
    team_coaches: coaches[1].id,
    team_athletes: [athletes[2].id, athletes[3].id],
  },
  {
    id: '3f9a1c2b-7d48-4e41-a3b6-5c8de1f0a2d4',
    title: 'Monkeynter',
    user_id: users[1].id,
    team_coaches: coaches[2].id,
    team_athletes: [athletes[4].id, athletes[5].id],
  },
];

const meals = [
  {
    id: '3f9a1c2b-7d48-4e41-a3b6-5c8de1f0a2d6',
    title: 'Fruitsalad',
    calories: 430,
    protein: 50,
    carbohydrates: 20,
    fats: 150,
    tags: ['breakfast', 'lunch'],
  },
  {
    id: 'b7e2f1a4-9c35-4ad8-94b7-1f6c0d9e3a21',
    title: 'Chicken Quinoa Bowl',
    calories: 514,
    protein: 42,
    carbohydrates: 55,
    fats: 14,
    tags: ['lunch', 'post-workout'],
  },
  {
    id: 'fa13b9d7-2c6e-41f5-8f92-4a7d0e3c5b8d',
    title: 'Greek Yogurt Parfait',
    calories: 308,
    protein: 24,
    carbohydrates: 35,
    fats: 8,
    tags: ['breakfast', 'snack'],
  },
  {
    id: '4c2d7a11-8b5e-4bb2-9a0f-7f1e23c4d5a6',
    title: 'Avocado Toast & Eggs',
    calories: 398,
    protein: 20,
    carbohydrates: 30,
    fats: 22,
    tags: ['breakfast', 'brunch'],
  },
  {
    id: 'd1e4f7a9-3b2c-4c8f-91ad-56b7c8e9f012',
    title: 'Salmon & Sweet Potato',
    calories: 486,
    protein: 36,
    carbohydrates: 45,
    fats: 18,
    tags: ['dinner', 'high-protein'],
  },
  {
    id: '6a7b8c9d-0e1f-42a3-b4c5-d6e7f8a9b0c2',
    title: 'Protein Berry Smoothie',
    calories: 370,
    protein: 30,
    carbohydrates: 40,
    fats: 10,
    tags: ['breakfast', 'post-workout'],
  },
  {
    id: '9e8d7c6b-5a4f-43e2-8b1a-2c3d4e5f6a7b',
    title: 'Pasta with Turkey Meatballs',
    calories: 556,
    protein: 38,
    carbohydrates: 65,
    fats: 16,
    tags: ['lunch', 'dinner'],
  },
];

const trainings = [
  {
    id: '9e8d7c7d-5a4f-43e2-8b1a-2c3d4e5f6a7b',
    title: 'Tempo 30 min',
    calories: 530,
    tags: ['running', 'tempo'],
  },
  {
    id: '1a2b3c4d-5e6f-4789-a1b2-c3d4e5f6a8b9',
    title: 'Intervals 8×400m',
    calories: 480,
    tags: ['running', 'intervals', 'track'],
  },
  {
    id: '2c3d4e5f-6a7b-4890-b1c2-d3e4f5a6b7c8',
    title: 'Long Run 90 min',
    calories: 900,
    tags: ['running', 'long-run', 'endurance'],
  },
  {
    id: '3d4e5f6a-7b8c-4a01-c2d3-e4f5a6b7c8d9',
    title: 'Recovery Jog 30 min',
    calories: 260,
    tags: ['running', 'recovery'],
  },
  {
    id: '4e5f6a7b-8c9d-4b12-d3e4-f5a6b7c8d9e0',
    title: 'Strength Lower Body 45 min',
    calories: 350,
    tags: ['strength', 'gym'],
  },
  {
    id: '5f6a7b8c-9d0e-4c23-e4f5-a6b7c8d9e0f1',
    title: 'Mobility & Core 25 min',
    calories: 180,
    tags: ['mobility', 'core', 'recovery'],
  },
  {
    id: '6a7b8c9d-0e1f-4d34-f5a6-b7c8d9e0f1a2',
    title: 'Cycling Endurance 60 min',
    calories: 520,
    tags: ['cycling', 'endurance', 'cross-training'],
  },
];

const plan_items = [
  // Jerry Banana
  {
    id: '0a1b2c3d-4e5f-46a7-b890-1c2d3e4f5a67',
    athlete_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    type: 'MEAL',
    start_at: '2025-09-28T08:00:00+03:00',
    status: 'PLANNED',
    meal_id: 'fa13b9d7-2c6e-41f5-8f92-4a7d0e3c5b8d',
    notes: 'Light breakfast',
  },
  {
    id: '1b2c3d4e-5f60-41a2-b3c4-d5e6f7a8b9c0',
    athlete_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    type: 'WORKOUT',
    start_at: '2025-09-28T18:00:00+03:00',
    status: 'PLANNED',
    training_id: '9e8d7c7d-5a4f-43e2-8b1a-2c3d4e5f6a7b',
  },

  // Maya Monkey
  {
    id: '2c3d4e5f-6071-42b3-c4d5-e6f7a8b9c0d1',
    athlete_id: '4bb9c9a0-5e43-4f1e-b77b-1a9e8f3a2c9d',
    type: 'MEAL',
    start_at: '2025-09-28T13:30:00+03:00',
    status: 'PLANNED',
    meal_id: 'b7e2f1a4-9c35-4ad8-94b7-1f6c0d9e3a21',
  },
  {
    id: '3d4e5f60-7182-43c4-d5e6-f7a8b9c0d1e2',
    athlete_id: '4bb9c9a0-5e43-4f1e-b77b-1a9e8f3a2c9d',
    type: 'WORKOUT',
    start_at: '2025-09-28T19:00:00+03:00',
    status: 'PLANNED',
    training_id: '1a2b3c4d-5e6f-4789-a1b2-c3d4e5f6a8b9',
  },

  // Alex Monkeyson
  {
    id: '4e5f6071-8293-44d5-e6f7-a8b9c0d1e2f3',
    athlete_id: 'a2d15f5a-7d9f-4b23-9b67-0a1c2d3e4f5a',
    type: 'WORKOUT',
    start_at: '2025-09-28T07:30:00+03:00',
    status: 'PLANNED',
    training_id: '3d4e5f6a-7b8c-4a01-c2d3-e4f5a6b7c8d9',
    notes: 'EZ pace',
  },
  {
    id: '5f607182-93a4-45e6-f7a8-b9c0d1e2f3a4',
    athlete_id: 'a2d15f5a-7d9f-4b23-9b67-0a1c2d3e4f5a',
    type: 'MEAL',
    start_at: '2025-09-28T20:30:00+03:00',
    status: 'PLANNED',
    meal_id: 'd1e4f7a9-3b2c-4c8f-91ad-56b7c8e9f012',
  },

  // Nikos Monkeyrunner
  {
    id: '60718293-a4b5-46f7-a8b9-c0d1e2f3a4b5',
    athlete_id: 'c7fa8e9d-1234-4cf3-8b29-77b289e4d3a1',
    type: 'WORKOUT',
    start_at: '2025-09-28T09:00:00+03:00',
    status: 'PLANNED',
    training_id: '2c3d4e5f-6a7b-4890-b1c2-d3e4f5a6b7c8',
  },
  {
    id: '718293a4-b5c6-47a8-b9c0-d1e2f3a4b5c6',
    athlete_id: 'c7fa8e9d-1234-4cf3-8b29-77b289e4d3a1',
    type: 'MEAL',
    start_at: '2025-09-28T10:45:00+03:00',
    status: 'PLANNED',
    meal_id: '6a7b8c9d-0e1f-42a3-b4c5-d6e7f8a9b0c2',
  },

  // Lia Monkeymind
  {
    id: '8293a4b5-c6d7-48b9-c0d1-e2f3a4b5c6d7',
    athlete_id: 'e13b2f76-9a44-4c69-8f8c-4b1aef9a0d21',
    type: 'MEAL',
    start_at: '2025-09-28T09:00:00+03:00',
    status: 'PLANNED',
    meal_id: '4c2d7a11-8b5e-4bb2-9a0f-7f1e23c4d5a6',
  },
  {
    id: '93a4b5c6-d7e8-49c0-d1e2-f3a4b5c6d7e8',
    athlete_id: 'e13b2f76-9a44-4c69-8f8c-4b1aef9a0d21',
    type: 'WORKOUT',
    start_at: '2025-09-28T17:00:00+03:00',
    status: 'PLANNED',
    training_id: '4e5f6a7b-8c9d-4b12-d3e4-f5a6b7c8d9e0',
  },

  // Stavros SuperMonkey
  {
    id: 'a4b5c6d7-e8f9-4dc1-e2f3-a4b5c6d7e8f9',
    athlete_id: 'f0c3ab55-2e1b-4f8e-91f3-75d5b807c6be',
    type: 'WORKOUT',
    start_at: '2025-09-28T16:00:00+03:00',
    status: 'PLANNED',
    training_id: '6a7b8c9d-0e1f-4d34-f5a6-b7c8d9e0f1a2',
  },
  {
    id: 'b5c6d7e8-f9a0-4ec2-f3a4-b5c6d7e8f9a0',
    athlete_id: 'f0c3ab55-2e1b-4f8e-91f3-75d5b807c6be',
    type: 'MEAL',
    start_at: '2025-09-28T21:00:00+03:00',
    status: 'PLANNED',
    meal_id: '9e8d7c6b-5a4f-43e2-8b1a-2c3d4e5f6a7b',
  },
];

export { users, coaches, athletes, teams, meals, trainings, plan_items };
