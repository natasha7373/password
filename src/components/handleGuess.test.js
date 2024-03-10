import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hangman from './Hangman';
import wordsData from './wordsData';

// Mock wordsData for consistent testing
jest.mock('./wordsData', () => ({
  0: {
    words: [
      { word: "test", definition: "a procedure intended to establish the quality" }
    ]
  }
}));

test('handles correct and incorrect guesses', () => {
  render(<Hangman stage={0} onStageSelect={() => {}} onStageComplete={() => {}} />);

  // Incorrect guess
  userEvent.click(screen.getByText('A'));
  expect(screen.getByText('Tries Left: 5')).toBeInTheDocument();

  // Correct guess
  userEvent.click(screen.getByText('T'));
  expect(screen.queryByText('Tries Left: 5')).toBeInTheDocument(); // No change in tries left after correct guess
  expect(screen.getByText('T')).toBeInTheDocument(); // Correct letter is shown
});
