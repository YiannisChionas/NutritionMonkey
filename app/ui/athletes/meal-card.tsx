import { MealPlanItem,PlanItemType, PlanItemStatus, MealTag } from '@/app/lib/definitions-nm';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

function pillClasses(base = '') {
  return `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${base}`;
}

function StatusPill({ status }: { status: PlanItemStatus }) {
  const colors: Record<PlanItemStatus, string> = {
    PLANNED: 'bg-blue-100 text-blue-700',
    DUE: 'bg-amber-100 text-amber-700',
    DONE: 'bg-green-100 text-green-700',
    SKIPPED: 'bg-gray-200 text-gray-700',
  };
  return <span className={pillClasses(colors[status])}>{status}</span>;
}

export function MealTagPills({ tags }: { tags?: MealTag[] }) {
  if (!tags || tags.length === 0) return null;

  const colorMap: Record<MealTag, string> = {
    breakfast:     'bg-amber-100 text-amber-700',
    brunch:        'bg-orange-100 text-orange-700',
    lunch:         'bg-lime-100 text-lime-700',
    dinner:        'bg-indigo-100 text-indigo-700',
    snack:         'bg-pink-100 text-pink-700',
    'post-workout':'bg-cyan-100 text-cyan-700',
    'high-protein':'bg-emerald-100 text-emerald-700',
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span key={t} className={pillClasses(colorMap[t])}>
          {t}
        </span>
      ))}
    </div>
  );
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('el-GR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}


export function PlanItemsList({ plan_items }: { plan_items: MealPlanItem[] }) {
  if (!plan_items?.length) {
    return (
      <div className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
        No meal plan items.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {plan_items.map((it) => (
        <MealCard key={it.id} item={it} />
      ))}
    </div>
  );
}

export function MealCard({ item }: { item: MealPlanItem }) {
  return (
    <div className="rounded-xl bg-gray-50 shadow-sm flex-auto">
      <div className="flex items-center justify-between gap-2 p-3">
        <StatusPill status={item.status} />
        <h1 className={`${lusitana.className} text-2xl text-center`}>Meals</h1>
        <MealTagPills tags={item.tags} />
      </div>

      {/* Info grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-500">Starts at</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center font-medium">
            {formatDateTime(item.start_at)}
          </dd>
        </div>

        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-500">
            {'Title'}
          </dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {item.title}
          </dd>
        </div>

        <div className="sm:col-span-2">
            <Image
                    src={"/meals/test.png"}
                    className="rounded-xl w-full h-auto"
                    width={900}
                    height={500}
                    alt={`test meal picture`}
                  />
        </div>

        <div>
          <dt className="text-sm text-gray-500">Calories</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {item.calories}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">Protein</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {item.protein}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">Carbohydrates</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {item.carbohydrates}
          </dd>
        </div>

        <div>
          <dt className="text-sm text-gray-500">Fats</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {item.fats}
          </dd>
        </div>

        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-500">Notes</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-start whitespace-pre-wrap break-words">
            {item.notes ?? '—'}
          </dd>
        </div>
      </dl>
    </div>
  );
}