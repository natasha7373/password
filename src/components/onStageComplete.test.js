test('progresses to the next level on correct word guess', () => {
    const onStageCompleteMock = jest.fn();
    
    render(<Hangman stage={0} onStageSelect={() => {}} onStageComplete={onStageCompleteMock} />);
  
    // Simulate guessing the word "test" correctly
    userEvent.click(screen.getByText('T'));
    userEvent.click(screen.getByText('E'));
    userEvent.click(screen.getByText('S'));
    userEvent.click(screen.getByText('T'));
  
    // Since "test" is the only word, onStageComplete should be called
    expect(onStageCompleteMock).toHaveBeenCalled();
  });
  