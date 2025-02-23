export const Routes = {
  loginLoading: '/loginLoading',
  tabs: '/(tabs)',
  profile: '/(tabs)/profile',
  transfer: {
    sendMoney: '/transferScreen/sendMoney',
    selectContact: '/transferScreen/selectContact',
    confirmation: '/transferScreen/confirmation',
    success: '/transferScreen/success',
  },
  notFound: '/+not-found',
} as const;

// Utility function to sanitize all routes recursively
const sanitizeRoutes = <T extends Record<string, unknown>>(routes: T): T => {
  return Object.fromEntries(
    Object.entries(routes).map(([key, value]) => [
      key,
      typeof value === 'string' ? value.slice(1) : sanitizeRoutes(value as Record<string, unknown>),
    ]),
  ) as T;
};

export const NormalizeRoutes = sanitizeRoutes(Routes);
