import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Episodes from './pages/Episodes';
import Locations from './pages/Locations';
import Favorites from './pages/Favorites';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="characters" element={<Characters />} />
        <Route path="characters/:id" element={<CharacterDetail />} />
        <Route path="episodes" element={<Episodes />} />
        <Route path="locations" element={<Locations />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}
