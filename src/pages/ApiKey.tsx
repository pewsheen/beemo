import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { createClient, validateKey } from '../openai/connection';
import { Button, FloatingLabel, Form } from 'solid-bootstrap';
import './ApiKey.scss';

export default function ApiKey() {
  const navigate = useNavigate();

  const [apiKey, setApiKey] = createSignal('');

  const setinput = (v: any) => {
    setApiKey(v.target.value);
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      const client = createClient(apiKey());
      if ((await validateKey(client)) === true) {
        localStorage.setItem('apiKey', apiKey());
        navigate('/chat', { replace: true });
      } else {
        setApiKey('');
      }
    } catch (err) {
      setApiKey('');
    }
  };

  return (
    <div class='container'>
      <h2>BEEMO</h2>
      <form onSubmit={onSubmit} class='form' action='#' method='post'>
        <FloatingLabel
          class='input'
          controlId='floatingInput'
          label='OPENAI SECRET KEY'
        >
          <Form.Control
            required
            size='lg'
            type='text'
            placeholder='sk-*********'
            onInput={setinput}
            value={apiKey()}
          />
        </FloatingLabel>
        <Button class='button' size='lg' variant='dark' type='submit'>
          Start
        </Button>
      </form>
    </div>
  );
}
