import React from 'react';
import { CATEGORIES } from '../data/posts';

const CATEGORY_ICONS = {
  All:        'bi-grid',
  Technology: 'bi-cpu',
  Design:     'bi-palette',
  Lifestyle:  'bi-heart',
  Travel:     'bi-airplane',
  Food:       'bi-egg-fried',
};

function CategoryFilter({ selected, onChange, counts = {} }) {
  return (
    <div className="category-filter d-flex flex-wrap gap-2 align-items-center">
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat;
        const count = cat === 'All'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[cat] || 0);

        return (
          <button
            key={cat}
            className={`category-pill ${isActive ? 'active' : ''}`}
            onClick={() => onChange(cat)}
            id={`filter-${cat.toLowerCase()}`}
          >
            <i className={`bi ${CATEGORY_ICONS[cat] || 'bi-tag'}`} />
            {cat}
            <span className="category-pill-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
