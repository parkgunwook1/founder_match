import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout';
import { HomePage } from '../pages/Home/HomePage';
import { LoginPage } from '../pages/Auth/LoginPage';
import { SignupPage } from '../pages/Auth/SignupPage';
import { UserProfilePage } from '../pages/User/UserProfilePage';
import { FounderProfilesPage } from '../pages/Profile/FounderProfilesPage';
import { FounderProfileFormPage } from '../pages/Profile/FounderProfileFormPage';
import { ProjectListPage } from '../pages/Projects/ProjectListPage';
import { ProjectFormPage } from '../pages/Projects/ProjectFormPage';
import { ProjectDetailPage } from '../pages/Projects/ProjectDetailPage';

export const AppRouter = () => (
  <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/profile" element={<UserProfilePage />} />
        <Route path="/user/profile/edit" element={<FounderProfileFormPage />} />
        <Route path="/profiles" element={<FounderProfilesPage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/new" element={<ProjectFormPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/projects/:projectId/edit" element={<ProjectFormPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  </BrowserRouter>
);



