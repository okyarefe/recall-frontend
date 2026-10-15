import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  route('login', './pages/LoginPage.tsx'),

  // Everything inside requires login.
  layout('./pages/layouts/ProtectedLayout.tsx', [
    route('dashboard', './pages/DashboardPage.tsx', [
      route('about', './pages/AboutPage.tsx'),
      route('upload', './pages/UploadPage.tsx'),
    ]),
  ]),

  layout('./pages/layouts/MarketingLayout.tsx', [
    index('./pages/HomePage.tsx'),
    route('contact', './pages/ContactPage.tsx'),
  ]),
] satisfies RouteConfig;
