import { useNavigate } from '@solidjs/router';
import { OpenAIApi } from 'openai';
import { createEffect, createSignal, For } from 'solid-js';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import TopBar from '../components/TopBar';
import { createClient, validateKey } from '../openai/connection';
import DisplayMessageStore from '../store/displayMessage';
import './Chat.scss';

export default function Chat() {
  const [openai, setOpenai] = createSignal<OpenAIApi>();
  const navigate = useNavigate();

  const [displayMessage] = DisplayMessageStore;

  let messageBox: HTMLDivElement | undefined = void 0;

  // router guard
  const redirectToSetup = () => {
    localStorage.removeItem('apiKey');
    navigate('/setup', { replace: true });
  };
  createEffect(async () => {
    const key = localStorage.getItem('apiKey');
    if (key) {
      setOpenai(createClient(key));

      const client = openai();
      if (!client || (await validateKey(client)) === false) {
        redirectToSetup();
      }
    } else {
      redirectToSetup();
    }
  });

  createEffect(() => {
    const _ = displayMessage();
    messageBox?.scrollTo(0, messageBox?.scrollHeight);
  });

  return (
    <div class='chat-container'>
      <div class='topbar-container'>
        <TopBar />
      </div>
      <div ref={messageBox} class='message-container'>
        <For each={displayMessage()}>
          {(message) => <MessageBubble message={message} />}
        </For>
      </div>
      <div class='message-input-container'>
        <MessageInput openai={openai()} />
      </div>
    </div>
  );
}
