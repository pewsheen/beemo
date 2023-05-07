import { Card } from 'solid-bootstrap';
import { DisplayMessage } from '../store/displayMessage';
import './MessageBubble.scss';

interface MessageBubbleProps {
  message: DisplayMessage;
}

const wrapperCls = (msg: DisplayMessage) => {
  if (msg.role === 'user') {
    return 'message user';
  } else {
    return 'message system';
  }
};

const variant = (msg: DisplayMessage) =>
  msg.role === 'user' ? 'light' : 'dark';

export default function MessageBubble(props: MessageBubbleProps) {
  return (
    <div class={wrapperCls(props.message)}>
      <Card
        bg={variant(props.message)}
        text={variant(props.message) === 'light' ? 'dark' : 'white'}
        class='m-2 bubble'
      >
        <Card.Body>
          <Card.Text>{props.message.content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
