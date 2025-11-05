'use client';

import { useState, useCallback } from 'react';
import type { BedType, RoomFilters } from '@/lib/types';

export interface RoomFiltersProps {
  onFiltersChange: (filters: RoomFilters) => void;
  isLoading?: boolean;
}

const BED_TYPES: BedType[] = ['single', 'double', 'queen', 'king', 'twin'];

export function RoomFilters({
  onFiltersChange,
  isLoading = false,
}: RoomFiltersProps) {
  const [filters, setFilters] = useState<RoomFilters>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleCapacityChange = useCallback(
    (value: string) => {
      const newFilters = {
        ...filters,
        capacity: value ? parseInt(value, 10) : undefined,
      };
      setFilters(newFilters);
      onFiltersChange(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handleBedTypeChange = useCallback(
    (value: string) => {
      const newFilters = {
        ...filters,
        bedType: value ? (value as BedType) : undefined,
      };
      setFilters(newFilters);
      onFiltersChange(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handlePriceRangeChange = useCallback(
    (min: number, max: number) => {
      setPriceRange([min, max]);
      const newFilters: RoomFilters = {
        ...filters,
        priceRange: [min, max] as [number, number],
      };
      setFilters(newFilters);
      onFiltersChange(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      const newFilters = {
        ...filters,
        search: value || undefined,
      };
      setFilters(newFilters);
      onFiltersChange(newFilters);
    },
    [filters, onFiltersChange]
  );

  const handleResetFilters = useCallback(() => {
    setFilters({});
    setPriceRange([0, 1000]);
    onFiltersChange({});
  }, [onFiltersChange]);

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
          aria-expanded={showAdvanced}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </button>
      </div>

      {/* Search */}
      <div>
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Search
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search rooms..."
          onChange={(e) => handleSearchChange(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-offset-gray-800"
        />
      </div>

      {/* Capacity */}
      <div>
        <label
          htmlFor="capacity"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Minimum Capacity
        </label>
        <select
          id="capacity"
          onChange={(e) => handleCapacityChange(e.target.value)}
          disabled={isLoading}
          value={filters.capacity || ''}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
        >
          <option value="">Any</option>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4+ Guests</option>
        </select>
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <>
          {/* Bed Type */}
          <div>
            <label
              htmlFor="bedType"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Bed Type
            </label>
            <select
              id="bedType"
              onChange={(e) => handleBedTypeChange(e.target.value)}
              disabled={isLoading}
              value={filters.bedType || ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-offset-gray-800"
            >
              <option value="">Any</option>
              {BED_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceRangeChange(
                    parseInt(e.target.value, 10),
                    priceRange[1]
                  )
                }
                disabled={isLoading}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceRangeChange(
                    priceRange[0],
                    parseInt(e.target.value, 10)
                  )
                }
                disabled={isLoading}
                className="w-full"
              />
            </div>
          </div>
        </>
      )}

      {/* Reset button */}
      <button
        onClick={handleResetFilters}
        disabled={isLoading || Object.keys(filters).length === 0}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      >
        Reset Filters
      </button>
    </div>
  );
}
