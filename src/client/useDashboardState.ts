import { useContext, createContext } from 'react';
import WeatherDashboardState from '@/weather-dashboard';

type StateHook<T> = [T, (update: (t: T) => T) => void];
export const initialState = new WeatherDashboardState();
export const DashboardContext =
  createContext<StateHook<WeatherDashboardState> | null>(null);

export function useDashboardState(): StateHook<WeatherDashboardState> {
  const hook = useContext(DashboardContext);
  if (hook === null) {
    throw Error(
      'Did you forget to setup the parent context provider for DashboardContext?',
    );
  }
  return hook;
}
