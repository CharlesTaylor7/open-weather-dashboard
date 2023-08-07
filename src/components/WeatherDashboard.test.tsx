/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherDashboard from '@/components/WeatherDashboard';

jest.mock(
  'apexcharts',
  () =>
    class MockApexChart {
      updateSeries(o: any) {}
      render() {}
    },
);

describe('WeatherDashboard', () => {
  test('Toggle Chart/Table view', async () => {
    const dom = render(<WeatherDashboard />);
    const user = await userEvent.setup();

    // User selects an option

    await userEvent.selectOptions(
      dom.getByTestId('dropdown-view-type') as HTMLSelectElement,
      dom.getByRole('option', { name: 'Table View' }),
    );

    await userEvent.selectOptions(
      dom.getByTestId('dropdown-view-type') as HTMLSelectElement,
      dom.getByRole('option', { name: 'Chart View' }),
    );
  });
});
