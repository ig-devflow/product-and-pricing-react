import { useState, type ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppSelect } from '@/shared/ui/controls';

const options = [
  { label: 'HTML', value: 'html' },
  { label: 'Plain text', value: 'plain' },
  { label: 'Markdown', value: 'markdown' },
];

function setupSelect(props: Partial<ComponentProps<typeof AppSelect>> = {}) {
  const user = userEvent.setup();
  const view = render(
    <AppSelect id="test-select" placeholder="Select format" options={options} {...props} />,
  );
  const combobox = screen.getByRole('combobox');

  return {
    user,
    combobox,
    ...view,
  };
}

describe('AppSelect', () => {
  it('opens and closes the list on click', async () => {
    const { user, combobox } = setupSelect();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    await user.click(combobox);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(combobox);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('moves highlight with ArrowDown and ArrowUp', async () => {
    const { user, combobox } = setupSelect();

    await user.click(combobox);
    expect(combobox).toHaveAttribute('aria-activedescendant', 'test-select-option-0');

    await user.keyboard('{ArrowDown}');
    expect(combobox).toHaveAttribute('aria-activedescendant', 'test-select-option-1');

    await user.keyboard('{ArrowUp}');
    expect(combobox).toHaveAttribute('aria-activedescendant', 'test-select-option-0');
  });

  it('selects highlighted option on Enter', async () => {
    const onValueChange = vi.fn();
    const { user, combobox } = setupSelect({ onValueChange });

    await user.click(combobox);
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(onValueChange).toHaveBeenCalledWith('plain');
    expect(combobox).toHaveTextContent('Plain text');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes the list on Escape', async () => {
    const { user, combobox } = setupSelect();

    await user.click(combobox);
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('updates aria-expanded when the list is toggled', async () => {
    const { user, combobox } = setupSelect();

    expect(combobox).toHaveAttribute('aria-expanded', 'false');

    await user.click(combobox);
    expect(combobox).toHaveAttribute('aria-expanded', 'true');

    await user.click(combobox);
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-activedescendant for the highlighted option', async () => {
    const { user, combobox } = setupSelect();

    expect(combobox).not.toHaveAttribute('aria-activedescendant');

    await user.click(combobox);
    expect(combobox).toHaveAttribute('aria-activedescendant', 'test-select-option-0');

    await user.keyboard('{ArrowDown}');
    expect(combobox).toHaveAttribute('aria-activedescendant', 'test-select-option-1');

    await user.keyboard('{Escape}');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
  });

  it('keeps hidden input value in sync when name is provided', async () => {
    const { user, combobox, container } = setupSelect({ name: 'visaLetterNoteFormat' });
    const hiddenInput = container.querySelector(
      'input[type="hidden"][name="visaLetterNoteFormat"]',
    ) as HTMLInputElement;

    expect(hiddenInput.value).toBe('');

    await user.click(combobox);
    await user.keyboard('{Enter}');

    expect(hiddenInput.value).toBe('html');
  });

  it('works in uncontrolled mode', async () => {
    const { user, combobox } = setupSelect({ defaultValue: 'html' });

    expect(combobox).toHaveTextContent('HTML');

    await user.click(combobox);
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(combobox).toHaveTextContent('Plain text');
  });

  it('works in controlled mode', async () => {
    const ControlledSelect = () => {
      const [value, setValue] = useState('plain');
      return (
        <AppSelect
          id="controlled-select"
          value={value}
          options={options}
          onValueChange={setValue}
        />
      );
    };

    const user = userEvent.setup();
    render(<ControlledSelect />);
    const combobox = screen.getByRole('combobox');

    expect(combobox).toHaveTextContent('Plain text');

    await user.click(combobox);
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(combobox).toHaveTextContent('Markdown');
  });
});
