import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  route('dashboard', './dashboard.tsx', [route('about', './about.tsx')]),
  layout('./marketing/layout.tsx', [
    index('./marketing/home.tsx'),
    route('contact', './marketing/contact.tsx'),
  ]),
] satisfies RouteConfig;
