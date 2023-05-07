import { Route, Routes } from '@solidjs/router';
import ApiKey from './pages/ApiKey';
import Chat from './pages/Chat';
import RouterGuard from './RouterGuard';

function App() {
  return (
    <Routes>
      <Route path="/" component={RouterGuard} />
      <Route path="/setup" component={ApiKey} />
      <Route path="/chat" component={Chat} />
    </Routes>
  );
}

export default App;
