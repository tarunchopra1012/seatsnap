import { useState } from 'react';
import EventList from './components/EventList.jsx';
import EventDetail from './components/EventDetail.jsx';
import CreateEvent from './components/CreateEvent.jsx';

export default function App() {
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'create'
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="app">
      <header className="topbar">
        <h1 onClick={() => setView('list')}>SeatSnap</h1>
        <button onClick={() => setView('create')}>+ New event</button>
      </header>

      <main>
        {view === 'list' && (
          <EventList
            onSelect={(id) => {
              setSelectedId(id);
              setView('detail');
            }}
          />
        )}
        {view === 'detail' && <EventDetail eventId={selectedId} onBack={() => setView('list')} />}
        {view === 'create' && <CreateEvent onCreated={() => setView('list')} />}
      </main>
    </div>
  );
}
