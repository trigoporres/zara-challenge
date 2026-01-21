import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('renders both logos', () => {
    render(<App />)
    const viteLogo = screen.getByAltText('Vite logo')
    const reactLogo = screen.getByAltText('React logo')

    expect(viteLogo).toBeInTheDocument()
    expect(reactLogo).toBeInTheDocument()
  })

  it('increments counter when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()

    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument()
  })

  it('renders external links with correct attributes', () => {
    render(<App />)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)

    const viteLink = links[0]
    const reactLink = links[1]

    expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
    expect(viteLink).toHaveAttribute('target', '_blank')

    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
    expect(reactLink).toHaveAttribute('target', '_blank')
  })

  it('displays the instruction text', () => {
    render(<App />)
    expect(screen.getByText(/Edit/i)).toBeInTheDocument()
    expect(screen.getByText('src/App.tsx')).toBeInTheDocument()
    expect(screen.getByText(/and save to test HMR/i)).toBeInTheDocument()
  })
})
