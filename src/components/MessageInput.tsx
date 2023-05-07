import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Navbar,
} from 'solid-bootstrap';
import { createSignal } from 'solid-js';
import DisplayMessageStore from '../store/displayMessage';
import LanguageSelector from '../store/language';
import ToneSelector from '../store/tone';
import languagePrompt from '../utils/prompt';

interface MessageInputProps {
  openai: any;
}

export default function MessageInput(props: MessageInputProps) {
  const [userInput, setUserInput] = createSignal('');
  const [waitResponse, setWaitResponse] = createSignal(false);

  const [tone] = ToneSelector;
  const [lang] = LanguageSelector;
  const [_, setDisplayMessage] = DisplayMessageStore;

  const onUserInput = (e: any) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    const input = userInput();

    if (!props.openai || !input || waitResponse()) {
      return;
    }

    setWaitResponse(true);
    setUserInput('');
    setDisplayMessage((displayMessage) => [
      ...displayMessage,
      { role: 'user', content: input },
    ]);

    const response = await props.openai.createChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that translates text. You don\'t make any explainations to the traslation.',
          },
          {
            role: 'user',
            content: languagePrompt(lang(), tone(), input),
          },
        ],
        temperature: 0,
        n: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      { responseType: 'stream' }
    );
    const content = response.data.choices[0].message?.content ?? '<ERROR>';

    setWaitResponse(false);

    setDisplayMessage((displayMessage) => [
      ...displayMessage,
      { role: 'system', content },
    ]);
  };

  return (
    <div>
      <Navbar class='top-bar' bg='light' expand='lg'>
        <Container fluid>
          <InputGroup class='mb-3'>
            <FormControl
              onInput={onUserInput}
              value={userInput()}
              placeholder=''
            />
            <Button
              variant='outline-secondary'
              onclick={sendMessage}
              disabled={waitResponse()}
            >
              Translate
            </Button>
          </InputGroup>
        </Container>
      </Navbar>
    </div>
  );
}
