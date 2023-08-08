/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherDashboard from '@/components/WeatherDashboard';

// I want the test suite to be as close as simulcram to the browser as possible
// I wasn't planning to mock out apexcharts
// But it doesn't play nice with jsdom
jest.mock(
  'apexcharts',
  () =>
    class MockApexChart {
      updateSeries(o: any) {}
      render() {}
    },
);
// mock browser fetch calls
// approved open weather apis succeed with fake results
// other calls fail
beforeAll(() => {
  global.fetch = jest.fn((url) => ({
    json() {
      if (typeof url !== 'string') {
        throw Error('unexpected fetch call');
      }
      if (url.startsWith('https://api.openweathermap.org/geo/1.0/direct')) {
        return Promise.resolve({});
      } else if (
        url.startsWith('https://api.openweathermap.org/data/3.0/onecall')
      ) {
        return Promise.resolve({});
      }
      throw Error('unexpected fetch call');
    },
  })) as any;
});

afterEach(() => {
  (global.fetch as any).mockClear();
});

describe('WeatherDashboard', () => {
  test('Toggle Chart/Table view', async () => {
    const dom = render(<WeatherDashboard />);
    const user = await userEvent.setup();

    // view as table
    await userEvent.selectOptions(
      dom.getByTestId('dropdown-view-type'),
      dom.getByRole('option', { name: 'Table View' }),
    );
    expect((await dom.findByTestId("table"))).toBeVisible();

    // view as chart
    await userEvent.selectOptions(
      dom.getByTestId('dropdown-view-type'),
      dom.getByRole('option', { name: 'Chart View' }),
    );
    expect((await dom.findByTestId("chart"))).toBeVisible();
  });
});
