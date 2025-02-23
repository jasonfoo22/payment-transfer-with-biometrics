import { Redirect } from 'expo-router';
import { Routes } from '@/constants/Routes';

export default function Index() {
  return <Redirect href={Routes.loginLoading} />;
}
