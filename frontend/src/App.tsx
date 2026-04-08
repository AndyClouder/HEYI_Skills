import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { UploadPage } from '@/pages/UploadPage';
import { CaseDetailPage } from '@/pages/CaseDetailPage';
import { SearchPage } from '@/pages/SearchPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { IntroPage } from '@/pages/IntroPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="case/:id" element={<CaseDetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="intro" element={<IntroPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
