import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";
import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import TeamsPage from "./pages/TeamsPage";
import NewsPage from "./pages/NewsPage";
import ClubPage from "./pages/ClubPage";
import GalleryPage from "./pages/GalleryPage";
import CalendarPage from "./pages/CalendarPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminMatchesPage from "./pages/admin/AdminMatchesPage";
import AdminTeamsPage from "./pages/admin/AdminTeamsPage";
import AdminPlayersPage from "./pages/admin/AdminPlayersPage";
import AdminArticlesPage from "./pages/admin/AdminArticlesPage";
import AdminGalleryPage from "./pages/admin/AdminGalleryPage";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/zapasy" element={<MatchesPage />} />
        <Route path="/tymy" element={<TeamsPage />} />
        <Route path="/novinky" element={<NewsPage />} />
        <Route path="/klub" element={<ClubPage />} />
        <Route path="/kalendar" element={<CalendarPage />} />
        <Route path="/galerie" element={<GalleryPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="zapasy" element={<AdminMatchesPage />} />
        <Route path="tymy" element={<AdminTeamsPage />} />
        <Route path="hraci" element={<AdminPlayersPage />} />
        <Route path="novinky" element={<AdminArticlesPage />} />
        <Route path="galerie" element={<AdminGalleryPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
