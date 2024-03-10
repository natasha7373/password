test('shows retry modal after maximum tries exceeded', async () => {
    render(<Hangman stage={0} onStageSelect={() => {}} onStageComplete={() => {}} />);
  
    // Assume MAX_TRIES is 6, so we do 6 incorrect guesses
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('B'));
    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('D'));
    fireEvent.click(screen.getByText('E'));
    fireEvent.click(screen.getByText('F')); // 6th incorrect guess
  
    expect(screen.getByText(/You failed to guess the password./i)).toBeInTheDocument();
    expect(screen.getByText(/Please wait/i)).toBeInTheDocument();
  });
  