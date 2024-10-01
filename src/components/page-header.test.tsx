import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { PageHeader } from './page-header'

describe('PageHeader', () => {
  const exampleText = 'Test Header'

  it('should render the children text', () => {
    const { getByText } = render(<PageHeader>{exampleText}</PageHeader>)
    const headerElement = getByText(exampleText)
    expect(headerElement).toBeInTheDocument()
  })

  it('should apply the provided className', () => {
    const { getByText } = render(
      <PageHeader className="custom-class">{exampleText}</PageHeader>,
    )
    const headerElement = getByText(exampleText)
    expect(headerElement.parentElement).toHaveClass(
      'custom-class py-8 text-4xl font-bold',
    )
  })

  it('should have default classes', () => {
    const { getByText } = render(<PageHeader>{exampleText}</PageHeader>)
    const headerElement = getByText(exampleText)
    expect(headerElement.parentElement).toHaveClass('py-8 text-4xl font-bold')
  })
})
