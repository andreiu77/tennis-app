import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from '../src/app/page';
import { useState } from 'react';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
  }));

describe('PlayersList Search Functionality', () => {
    test('Filters players based on search input', () => {
        // Render component inside the PlayersProvider
        render(
            <MainPage />
        );

        // Ensure both players are initially displayed
        expect(screen.getByText("Roger Federer")).toBeInTheDocument();
        expect(screen.getByText("Rafael Nadal")).toBeInTheDocument();

        // Simulate user typing 'Roger' in the search bar
        const searchInput = screen.getByPlaceholderText("Search by name...");
        fireEvent.change(searchInput, { target: { value: "roger" } });

        // Federer should be visible, but Nadal should be hidden
        expect(screen.getByText("Roger Federer")).toBeInTheDocument();
        expect(screen.queryByText("Rafael Nadal")).not.toBeInTheDocument();
    });
});
