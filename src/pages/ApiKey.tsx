import { useNavigate } from '@solidjs/router';
import { createSignal } from 'solid-js';
import { createClient, validateKey } from '../openai/connection';
import { Button, FloatingLabel, Form, InputGroup } from 'solid-bootstrap';
import './ApiKey.scss';

export default function ApiKey() {
  const navigate = useNavigate();

  const [apiKey, setApiKey] = createSignal('');
  const [isKeyValid, setIsKeyValid] = createSignal(true);

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
        setIsKeyValid(false);
        setApiKey('');
      }
    } catch (err) {
      setIsKeyValid(false);
      setApiKey('');
    }
  };

  return (
    <div class='container'>
      <h2>BEEMO</h2>
      <form onSubmit={onSubmit} class='form' action='#' method='post'>
        <InputGroup hasValidation>
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
              isInvalid={!isKeyValid()}
            />
            <Form.Control.Feedback type='invalid'>
              Your OpenAI secret key is invalid
            </Form.Control.Feedback>
          </FloatingLabel>
        </InputGroup>
        <Button class='button' size='lg' variant='dark' type='submit'>
          Start
        </Button>
      </form>
    </div>
  );
}
