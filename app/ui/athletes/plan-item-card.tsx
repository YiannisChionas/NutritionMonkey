import { PlanItem, PlanItemStatus } from '@/app/lib/definitions-nm';

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

function TypePill({ type }: { type: PlanItem['type'] }) {
  const c = type === 'MEAL' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700';
  return <span className={pillClasses(c)}>{type}</span>;
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


export function PlanItemsList({ plan_items }: { plan_items: PlanItem[] }) {
  if (!plan_items?.length) {
    return (
      <div className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
        No plan items.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {plan_items.map((it) => (
        <PlanItemCard key={it.id} item={it} />
      ))}
    </div>
  );
}

export function PlanItemCard({ item }: { item: PlanItem }) {
  return (
    <div className="rounded-xl bg-gray-50 shadow-sm flex-auto">
      <div className="flex items-center justify-between gap-2 p-3">
        <TypePill type={item.type} />
        <StatusPill status={item.status} />
      </div>

      {/* Info grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-500">Starts at</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center font-medium">
            {formatDateTime(item.start_at)}
          </dd>
        </div>

        {/* Αριστερά: συνδεδεμένο id ανά τύπο */}
        <div>
          <dt className="text-sm text-gray-500">
            {item.type === 'MEAL' ? 'Meal ID' : 'Training ID'}
          </dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {item.type === 'MEAL' ? item.meal_id : item.training_id}
          </dd>
        </div>

        {/* Notes σε πλήρες πλάτος, με wrap */}
        <div className="sm:col-span-2">
          <dt className="text-sm text-gray-500">Notes</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-start whitespace-pre-wrap break-words">
            {item.notes ?? '—'}
          </dd>
        </div>

        {/* Τεχνικά στοιχεία */}
        <div>
          <dt className="text-sm text-gray-500">Item ID</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center break-words">
            {item.id}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Type</dt>
          <dd className="mt-1 rounded-lg bg-white px-4 py-3 text-center">
            {item.type}
          </dd>
        </div>
      </dl>
    </div>
  );
}