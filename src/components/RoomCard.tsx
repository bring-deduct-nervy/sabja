'use client'

import { FC } from 'react'
/* eslint-disable @next/next/no-img-element */
import { Button } from './Button'

interface RoomCardProps {
  id: string
  name: string
  description: string
  price: number
  image?: string
  onSelect?: (id: string) => void
}

export const RoomCard: FC<RoomCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  onSelect,
}) => {
  return (
    <div
      className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      data-testid={`room-card-${id}`}
    >
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
          data-testid={`room-image-${id}`}
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2" data-testid={`room-name-${id}`}>
          {name}
        </h3>
        <p className="text-gray-600 mb-4" data-testid={`room-description-${id}`}>
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span
            className="text-2xl font-bold text-blue-600"
            data-testid={`room-price-${id}`}
          >
            ${price}
          </span>
          <Button
            onClick={() => onSelect?.(id)}
            data-testid={`room-select-button-${id}`}
          >
            Select Room
          </Button>
        </div>
      </div>
    </div>
  )
}
