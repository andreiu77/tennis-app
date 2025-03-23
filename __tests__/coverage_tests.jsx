import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from '../src/app/page';
import AddPlayerForm from '../src/app/components/add-player-form/add-player-form'; 
import { useState } from 'react';
import PlayersList from '../src/app/components/players-list/players-list';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('PlayersList Search Functionality', () => {
  test('Filters players based on search input', () => {
    // Render component inside the PlayersProvider
    render(<MainPage />);

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

describe('AddPlayerForm Functionality', () => {
  test('renders AddPlayerForm correctly', () => {
    render(<AddPlayerForm onClose={jest.fn()} onAddPlayer={jest.fn()} />);

    // Check if the form inputs are present
    expect(screen.getByPlaceholderText("Enter name...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter country...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter racket brand...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Current rank...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("# of titles...")).toBeInTheDocument();
  });

  test('allows user to input player details', () => {
    render(<AddPlayerForm onClose={jest.fn()} onAddPlayer={jest.fn()} />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("Enter name..."), { target: { value: "Novak Djokovic" } });
    fireEvent.change(screen.getByPlaceholderText("Enter country..."), { target: { value: "Serbia" } });
    fireEvent.change(screen.getByPlaceholderText("Enter racket brand..."), { target: { value: "Head" } });
    fireEvent.change(screen.getByPlaceholderText("Current rank..."), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText("# of titles..."), { target: { value: "95" } });

    // Check if values are updated
    expect(screen.getByPlaceholderText("Enter name...")).toHaveValue("Novak Djokovic");
    expect(screen.getByPlaceholderText("Enter country...")).toHaveValue("Serbia");
    expect(screen.getByPlaceholderText("Enter racket brand...")).toHaveValue("Head");
    expect(screen.getByPlaceholderText("Current rank...")).toHaveValue(1);
    expect(screen.getByPlaceholderText("# of titles...")).toHaveValue(95);
  });

  test('calls onAddPlayer with correct data when form is submitted', () => {
    const onAddPlayerMock = jest.fn();
    const onCloseMock = jest.fn();

    render(<AddPlayerForm onClose={onCloseMock} onAddPlayer={onAddPlayerMock} />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("Enter name..."), { target: { value: "Novak Djokovic" } });
    fireEvent.change(screen.getByPlaceholderText("Enter country..."), { target: { value: "Serbia" } });
    fireEvent.change(screen.getByPlaceholderText("Enter racket brand..."), { target: { value: "Head" } });
    fireEvent.change(screen.getByPlaceholderText("Current rank..."), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText("# of titles..."), { target: { value: "95" } });

    // Click submit button
    fireEvent.click(screen.getByText("Submit"));

    // Ensure onAddPlayer was called with correct data
    expect(onAddPlayerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Novak Djokovic",
        country: "Serbia",
        racket_brand: "Head",
        ranking: 1,
        number_of_titles: 95,
        handedness: "right-handed",
      })
    );

    // Ensure onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('calls onClose when cancel button is clicked', () => {
    const onCloseMock = jest.fn();

    render(<AddPlayerForm onClose={onCloseMock} onAddPlayer={jest.fn()} />);

    // Click cancel button
    fireEvent.click(screen.getByText("Cancel"));

    // Ensure onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });
});

describe('PlayersList Delete Functionality', () => {
  test('Removes a player when delete button is clicked', async () => {
      render(<PlayersList searchQuery="" showForm={false} onCloseForm={jest.fn()} />);

      // Ensure players are initially displayed
      expect(await screen.findByText("Roger Federer")).toBeInTheDocument();
      expect(screen.getByText("Rafael Nadal")).toBeInTheDocument();

      // Find delete buttons
      const deleteButtons = screen.getAllByRole("button"); // Select all buttons
      expect(deleteButtons.length).toBeGreaterThan(0); // Ensure buttons exist

      // Click the first delete button (assumed to be Federer’s)
      fireEvent.click(deleteButtons[1]);

      // Federer should be removed
      expect(screen.queryByText("Roger Federer")).not.toBeInTheDocument();

      // Rafael Nadal should still be present
      expect(screen.getByText("Rafael Nadal")).toBeInTheDocument();
  });
});