import { createSignal } from 'solid-js';

export interface DisplayMessage {
  role: 'user' | 'system';
  content: string;
}

export default createSignal<DisplayMessage[]>([
  { role: 'system', content: 'Hello!' },
]);
