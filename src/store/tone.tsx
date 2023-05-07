import { Accessor, createSignal } from 'solid-js';

type Tone = 'casual' | 'formal';

const storedTone = (localStorage.getItem('tone') as Tone) ?? 'formal';

const [tone, setTone] = createSignal<Tone>(storedTone);

const setToneProxy = (newtone: Tone) => {
  localStorage.setItem('tone', newtone);
  setTone(newtone);

  return newtone;
};

const signal: [Accessor<Tone>, (newTone: Tone) => Tone] = [tone, setToneProxy];

export default signal;
