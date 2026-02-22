import { AuraProvider } from './context/AuraContext';
import { Layout } from './components/Layout';
import { StatsWidget } from './components/StatsWidget';
import { TimerWidget } from './components/TimerWidget';
import { AmbienceMixer } from './components/AmbienceMixer';
import { TaskList } from './components/TaskList';
import { Navigation } from './components/Navigation';

const AuraSpace = () => {
  return (
    <Layout>
      <StatsWidget />
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-lg lg:w-2/5 relative">
        <TimerWidget />
        <AmbienceMixer />
      </div>
      <TaskList />
      <Navigation />
    </Layout>
  );
};

function App() {
  return (
    <AuraProvider>
      <AuraSpace />
    </AuraProvider>
  );
}

export default App;
