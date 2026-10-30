import { useCallback, useEffect, useState } from 'react';
import { recentActivity } from '../lib/content';
import { friendlyError } from '../lib/supabase';
import ActivityList from '../components/ActivityList';
import { Alert, Button, Card, EmptyState, PageHeader, Spinner, inputClass } from '../components/ui';

export default function Activity() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [type, setType] = useState('');
  const [more, setMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(async () => {
    try {
      const rows = await recentActivity({ entityType: type || undefined });
      setItems(rows);
      setMore(rows.length === 50);
      setError('');
    } catch (err) {
      setError(friendlyError(err, 'Could not load the activity history.'));
    }
  }, [type]);

  useEffect(() => {
    setItems(null);
    load();
  }, [load]);

  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const rows = await recentActivity({ before: items.at(-1).id, entityType: type || undefined });
      setItems((current) => [...current, ...rows]);
      setMore(rows.length === 50);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Activity History"
        description="Who changed what, and when. Entries cannot be edited or deleted from the dashboard."
        actions={
          <select className={`${inputClass()} w-auto`} value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter activity">
            <option value="">Everything</option>
            <option value="content">Content</option>
            <option value="media">Media</option>
            <option value="user">Users</option>
            <option value="site">Website updates</option>
          </select>
        }
      />
      {error ? <Alert tone="danger">{error}</Alert> : null}
      {!items && !error ? <Spinner /> : null}
      {items?.length === 0 ? <EmptyState title="No activity yet">Changes made in the dashboard will be listed here.</EmptyState> : null}
      {items?.length ? (
        <Card padded={false}>
          <ActivityList items={items} />
          {more ? (
            <div className="border-t border-slate-100 p-4 text-center">
              <Button onClick={loadMore} busy={loadingMore}>
                Load older activity
              </Button>
            </div>
          ) : null}
        </Card>
      ) : null}
    </div>
  );
}
