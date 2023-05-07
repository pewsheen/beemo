import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';
import { createClient, validateKey } from './openai/connection';

export default function RouterGuard() {
  // check has apikey
  const navigate = useNavigate();
  createEffect(async () => {
    const key = localStorage.getItem('apiKey');
    if (key) {
      const openai = createClient(key);
      if ((await validateKey(openai)) === false) {
        localStorage.removeItem('apiKey');
      }
      navigate('/chat', { replace: true });
    } else {
      navigate('/setup', { replace: true });
    }
  });

  return <></>;
}
