import Navbar from './components/Navbar';
import Player from './components/Player';

const App = () => (
  <div className="bg-gray-300 dark:bg-black text-black dark:text-white h-screen flex flex-col">
    <Navbar />
    <main className="flex flex-1 items-center justify-center p-6">
      <Player />
    </main>
  </div>
);

export default App;
