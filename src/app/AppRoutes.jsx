import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { DashboardPage } from '../features/dashboard/ui/DashboardPage';
import { QuestionsPage } from '../features/questions/ui/QuestionsPage';
import { MachineCodingPage } from '../features/machine-coding/ui/MachineCodingPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="machine-coding" element={<MachineCodingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
