import { useNavigate } from '@solidjs/router';
import {
  CloseButton,
  Container,
  Form,
  InputGroup,
  Navbar,
} from 'solid-bootstrap';
import LanguageSelector from '../store/language';
import ToneSelector from '../store/tone';
import './TopBar.scss';

export default function TopBar() {
  const navigate = useNavigate();

  const [tone, setTone] = ToneSelector;
  const onToneChange = (e: Event) => {
    setTone(e.currentTarget?.value);
    console.debug('tone', tone());
  };

  const [lang, setLang] = LanguageSelector;
  const onLangChange = (e: Event) => {
    setLang(e.currentTarget?.value);
    console.debug('lang', lang());
  };

  const onClickClose = () => {
    navigate('/setup', { replace: true });
  };

  return (
    <Navbar class='top-bar' bg='light' expand='lg'>
      <Container class='d-flex' fluid>
        <Form class='d-flex nav-form'>
          <InputGroup>
            <InputGroup.Text>Lang</InputGroup.Text>
            <Form.Select size='sm' value={lang()} onChange={onLangChange}>
              <option value='Japanese'>Japanese</option>
              <option value='English'>English</option>
              <option value='Traditional Chinese'>Traditional Chinese</option>
            </Form.Select>
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Tone</InputGroup.Text>
            <Form.Select size='sm' value={tone()} onChange={onToneChange}>
              <option value='formal'>Formal</option>
              <option value='casual'>Casual</option>
            </Form.Select>
          </InputGroup>
        </Form>
        <CloseButton class='close-button' onClick={onClickClose} />
      </Container>
    </Navbar>
  );
}
