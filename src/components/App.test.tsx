/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/components/App";
import testData from "@/test.json";
/* eslint-disable @typescript-eslint/no-explicit-any */

// I want the test suite to be as close as simulcram to the browser as possible
// I wasn't planning to mock out apexcharts
// But it doesn't play nice with jsdom
jest.mock(
  "apexcharts",
  () =>
    class MockApexChart {
      updateSeries() {}
      render() {}
      destroy() {}
    },
);
// mock browser fetch calls
// approved open weather apis succeed with fake results
// other calls fail
beforeAll(() => {
  (global as any).OPEN_WEATHER_API_KEY = "test-api-key";
  global.fetch = jest.fn(async (url) => ({
    json() {
      if (typeof url !== "string") {
        throw Error("unexpected fetch call");
      }
      if (url.startsWith("https://api.openweathermap.org/geo/1.0/direct")) {
        return Promise.resolve(testData.geocode);
      } else if (
        url.startsWith("https://api.openweathermap.org/data/3.0/onecall")
      ) {
        return Promise.resolve(testData.forecast);
      }
      throw Error("unexpected fetch call");
    },
  })) as any;
});

afterEach(() => {
  (global.fetch as any).mockClear();
});

describe("App", () => {
  // failing because the table is not rendered
  // when there are no cities on the dashboard
  test("End 2 end", async () => {
    const dom = render(<App />);
    const user = userEvent.setup();

    // search
    await user.keyboard("Chattanooga{Enter}");

    // select specific search term
    await user.click(await dom.findByText("Chattanooga, Tennessee, US"));

    expect(await dom.findByTestId("chart")).toBeVisible();
  });
});
