import { render, fireEvent } from '@testing-library/react';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import ChangeHistory from '../index';

const SAMPLE_CHANGES = [
  {
    versions: ['v20.0.0'],
    label: 'Initial change',
  },
];

describe('ChangeHistory', () => {
  it('renders correctly with label and summary', () => {
    const { getByText } = render(
      <ChangeHistory label="History" changes={SAMPLE_CHANGES} />
    );

    const summaryLabel = getByText('History');
    assert.ok(summaryLabel.ownerDocument);
  });

  it('closes dropdown when clicking outside', () => {
    const { container, getByText } = render(
      <div>
        <span>Outside element</span>
        <ChangeHistory label="History" changes={SAMPLE_CHANGES} />
      </div>
    );

    const details = container.querySelector('details');
    assert.ok(details);

    // Open details
    details.setAttribute('open', '');
    assert.strictEqual(details.hasAttribute('open'), true);

    // Click outside
    const outsideElement = getByText('Outside element');
    fireEvent.pointerDown(outsideElement);

    assert.strictEqual(details.hasAttribute('open'), false);
  });

  it('does not close dropdown when clicking inside', () => {
    const { container, getByText } = render(
      <ChangeHistory label="History" changes={SAMPLE_CHANGES} />
    );

    const details = container.querySelector('details');
    assert.ok(details);

    // Open details
    details.setAttribute('open', '');
    assert.strictEqual(details.hasAttribute('open'), true);

    // Click inside
    const insideItem = getByText('Initial change');
    fireEvent.pointerDown(insideItem);

    assert.strictEqual(details.hasAttribute('open'), true);
  });
});
