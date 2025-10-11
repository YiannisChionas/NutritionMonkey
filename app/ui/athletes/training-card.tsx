import Image from 'next/image';
import type { TrainingPlanItem, PlanItemStatus, TrainingTag } from '@/app/lib/definitions-nm';
import { lusitana } from '@/app/ui/fonts';
import { FaRunning } from "react-icons/fa";

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

export function TrainingTagPills({ tags }: { tags?: TrainingTag[] }) {
  if (!tags || tags.length === 0) return null;

  const colorMap: Record<TrainingTag, string> = {
    running:        'bg-sky-100 text-sky-700',
    tempo:          'bg-orange-100 text-orange-700',
    intervals:      'bg-fuchsia-100 text-fuchsia-700',
    track:          'bg-purple-100 text-purple-700',
    'long-run':     'bg-indigo-100 text-indigo-700',
    endurance:      'bg-emerald-100 text-emerald-700',
    recovery:       'bg-teal-100 text-teal-700',
    strength:       'bg-rose-100 text-rose-700',
    gym:            'bg-stone-200 text-stone-700',
    mobility:       'bg-cyan-100 text-cyan-700',
    core:           'bg-lime-100 text-lime-700',
    cycling:        'bg-yellow-100 text-yellow-700',
    'cross-training':'bg-pink-100 text-pink-700',
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

export function TrainingPlanItemsList({ plan_items }: { plan_items: TrainingPlanItem[] }) {
  if (!plan_items?.length) {
    return (
      <div className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
        No training plan items.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {plan_items.map((it) => (
        <TrainingCard key={it.id} item={it} />
      ))}
    </div>
  );
}

export function TrainingCard({ item }: { item: TrainingPlanItem }) {
  return (
    <div className="rounded-xl bg-gray-50 shadow-sm">
      {/* Header: status + tags */}
      <div className="flex items-center justify-between gap-2 p-3">
        <StatusPill status={item.status} />
        <h1 className={`${lusitana.className} text-2xl text-center`}>Workouts</h1>
        <TrainingTagPills tags={item.tags} />
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
          <dt className="text-sm text-gray-500">Title</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {item.title}
          </dd>
        </div>

        {/* Static preview image for now */}
        <div className="sm:col-span-2">
          <Image
            src="/trainings/test1.png"
            className="rounded-xl w-full h-auto"
            width={500}
            height={500}
            alt="training preview"
            priority
          />
        </div>

        <div>
          <dt className="text-sm text-gray-500">Calories</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center">
            {item.calories}
          </dd>
        </div>

        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-500">Notes</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-start whitespace-pre-wrap break-words">
            {item.notes}
          </dd>
        </div>
      </dl>
    </div>
  );
}
