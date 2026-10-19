import { useState } from 'react';
import Counter from './Counter';
import TextInput from './TextInput';

export default function App() {
  const [text, setText] = useState('');

  return (
    <main className="container">
      <h1>Лічильник та введення тексту</h1>
      <Counter />
      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #d9cdd7' }} />
      <TextInput value={text} onTextChange={setText} />
      <p>Number of characters: {text.length}</p>
    </main>
  );
}
