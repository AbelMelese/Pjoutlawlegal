import { useEffect, useState } from 'react';
import { adminApi } from './api';

/** Which optional services are configured (from /admin-api/status). */
export function useIntegrationStatus() {
  const [state, setState] = useState({ loading: true, error: '', integrations: null });
  useEffect(() => {
    let cancelled = false;
    adminApi('status')
      .then((data) => !cancelled && setState({ loading: false, error: '', integrations: data.integrations }))
      .catch((error) => !cancelled && setState({ loading: false, error: error.message, integrations: null }));
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}
