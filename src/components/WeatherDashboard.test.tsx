/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WeatherDashboard from '@/components/WeatherDashboard'


describe('WeatherDashboard', () => {
  test('Toggle Chart/Table view', async () => {
    const dom = render(<WeatherDashboard />)
    const user = await userEvent.setup()

    // User selects an option
    const dropdown = (await dom.findByTestId('view-type-options')) as HTMLSelectElement
    await userEvent.selectOptions(
      dropdown,
      dom.getByRole('option', {name: 'Chart'})
    )

    await userEvent.selectOptions(
      dropdown,
      dom.getByRole('option', {name: 'Table'})
    )
  })
})
