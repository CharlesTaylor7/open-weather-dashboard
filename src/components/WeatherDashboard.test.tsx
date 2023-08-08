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
  global.fetch = jest.fn((url) => {
    json() {
      if (url.startswith('https://api.openweathermap.org/geo/1.0/direct')) {
        return Promise.resolve({})
      } 
      else if (url.startswith('https://api.openweathermap.org/data/3.0/onecall'))
        return Promise.resolve({})
      }
      throw Error("unexpected fetch call")
    }
  })
})

afterEach(() => {
  global.fetch.mockClear();
})

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
