import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { RoomCard } from '../RoomCard'

describe('RoomCard Component', () => {
  const defaultProps = {
    id: 'room-1',
    name: 'Deluxe Room',
    description: 'A spacious room with premium amenities',
    price: 150,
  }

  it('renders room information', () => {
    render(<RoomCard {...defaultProps} />)

    expect(screen.getByTestId('room-name-room-1')).toHaveTextContent('Deluxe Room')
    expect(screen.getByTestId('room-description-room-1')).toHaveTextContent(
      'A spacious room with premium amenities'
    )
    expect(screen.getByTestId('room-price-room-1')).toHaveTextContent('$150')
  })

  it('renders room image when provided', () => {
    const imageUrl = 'https://example.com/room.jpg'
    render(<RoomCard {...defaultProps} image={imageUrl} />)

    const image = screen.getByTestId('room-image-room-1')
    expect(image).toHaveAttribute('src', imageUrl)
    expect(image).toHaveAttribute('alt', 'Deluxe Room')
  })

  it('does not render image when not provided', () => {
    render(<RoomCard {...defaultProps} />)

    const image = screen.queryByTestId('room-image-room-1')
    expect(image).not.toBeInTheDocument()
  })

  it('calls onSelect callback when button is clicked', () => {
    const handleSelect = jest.fn()
    render(<RoomCard {...defaultProps} onSelect={handleSelect} />)

    const button = screen.getByTestId('room-select-button-room-1')
    fireEvent.click(button)

    expect(handleSelect).toHaveBeenCalledWith('room-1')
  })

  it('renders select button text', () => {
    render(<RoomCard {...defaultProps} />)

    expect(screen.getByText('Select Room')).toBeInTheDocument()
  })

  it('renders with correct test id', () => {
    render(<RoomCard {...defaultProps} />)

    expect(screen.getByTestId('room-card-room-1')).toBeInTheDocument()
  })

  it('displays correct price format', () => {
    render(<RoomCard {...defaultProps} price={299} />)

    expect(screen.getByTestId('room-price-room-1')).toHaveTextContent('$299')
  })
})
