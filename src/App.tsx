'use strict';

import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  let resetButton;
  const [sort, setSort] = useState<'alphabetically' | 'length' | ''>('');
  const [reverseOn, setReverseOn] = useState(false);

  function toggleReverse() {
    setReverseOn(!reverseOn);
  }

  if (sort !== '' || reverseOn) {
    resetButton = (
      <button
        type="button"
        className="button is-danger is-light"
        onClick={() => {
          setSort('');
          setReverseOn(false);
        }}
      >
        Reset
      </button>
    );
  }

  function sorting(): string[] {
    let goodsList = [...goodsFromServer];

    switch (sort) {
      case 'alphabetically':
        goodsList = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
        break;

      case 'length':
        goodsList = [...goodsFromServer].sort((a, b) => a.length - b.length);
    }

    if (reverseOn) {
      goodsList.reverse();
    }

    return goodsList;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort === 'length' ? '' : 'is-light'}`}
          onClick={() => setSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseOn ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {resetButton}
      </div>

      <ul>
        <ul>
          {sorting().map((good, i) => (
            <li key={i} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
