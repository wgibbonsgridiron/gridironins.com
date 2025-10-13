# USMap Component Usage

## Overview

The `USMap.astro` component displays an interactive US map with state outlines, labels, and customizable highlighting for specified states. It includes built-in support for both light and dark themes.

The component uses a combined SVG (`us-states-with-labels.svg`) that includes:
- Individual state paths from Wikimedia Commons for selective highlighting
- State labels extracted and scaled from the original Fla-shop.com map
- Automatic viewBox adjustment for proper responsive scaling

## Features

- Individual state paths with unique IDs (state abbreviations)
- Customizable state highlighting via props
- Automatic light/dark theme support
- Hover effects on all states
- Responsive design
- State labels
- CSS custom properties for easy color customization
- Accessible with proper ARIA labels

## Basic Usage

```astro
---
import USMap from '@/components/USMap.astro';
---

<!-- Simple map with no highlighting -->
<USMap />
```

## Highlighting States

Pass an array of state abbreviations to highlight specific states:

```astro
---
import USMap from '@/components/USMap.astro';

const highlightedStates = ['CA', 'TX', 'NY', 'FL'];
---

<USMap highlightedStates={highlightedStates} />
```

## Adding Custom Classes

```astro
---
import USMap from '@/components/USMap.astro';
---

<USMap class="my-custom-map" highlightedStates={['OH', 'PA', 'MI']} />
```

## State Abbreviations Reference

Use these two-letter state codes when highlighting states:

| State | Code | State | Code | State | Code |
|-------|------|-------|------|-------|------|
| Alabama | AL | Alaska | AK | Arizona | AZ |
| Arkansas | AR | California | CA | Colorado | CO |
| Connecticut | CT | Delaware | DE | Florida | FL |
| Georgia | GA | Hawaii | HI | Idaho | ID |
| Illinois | IL | Indiana | IN | Iowa | IA |
| Kansas | KS | Kentucky | KY | Louisiana | LA |
| Maine | ME | Maryland | MD | Massachusetts | MA |
| Michigan | MI | Minnesota | MN | Mississippi | MS |
| Missouri | MO | Montana | MT | Nebraska | NE |
| Nevada | NV | New Hampshire | NH | New Jersey | NJ |
| New Mexico | NM | New York | NY | North Carolina | NC |
| North Dakota | ND | Ohio | OH | Oklahoma | OK |
| Oregon | OR | Pennsylvania | PA | Rhode Island | RI |
| South Carolina | SC | South Dakota | SD | Tennessee | TN |
| Texas | TX | Utah | UT | Vermont | VT |
| Virginia | VA | Washington | WA | West Virginia | WV |
| Wisconsin | WI | Wyoming | WY | | |

## Theme Support

The component automatically adapts to light and dark themes using:

1. **Browser preference**: Automatically detects `prefers-color-scheme`
2. **Explicit theme classes**: Add `.light-theme` or `.dark-theme` to a parent element

### Example with Explicit Theme

```astro
<div class="dark-theme">
  <USMap highlightedStates={['WA', 'OR', 'CA']} />
</div>
```

## Customizing Colors

You can customize colors using CSS custom properties:

```css
.my-custom-map {
  /* Default state colors */
  --state-default-fill: #f0f0f0;
  --state-stroke: #ffffff;
  --state-hover-fill: #d0d0d0;

  /* Highlighted state colors */
  --state-highlighted-fill: #ff6b6b;
  --state-highlighted-stroke: #c92a2a;
  --state-highlighted-hover: #e03131;

  /* State label colors */
  --state-label-fill: #000000;
}

/* Dark theme custom colors */
.dark-theme .my-custom-map {
  --state-default-fill-dark: #1e1e1e;
  --state-stroke-dark: #0a0a0a;
  --state-hover-fill-dark: #2e2e2e;

  --state-highlighted-fill-dark: #ff8787;
  --state-highlighted-stroke-dark: #d14343;
  --state-highlighted-hover-dark: #f05252;

  --state-label-fill-dark: #f0f0f0;
}
```

## Full Example: Interactive State Selection

```astro
---
import USMap from '@/components/USMap.astro';

// Example: Highlighting states with NFL teams
const nflStates = [
  'AZ', 'CA', 'CO', 'FL', 'GA', 'IL', 'IN', 'LA',
  'MD', 'MA', 'MI', 'MN', 'MO', 'NV', 'NJ', 'NY',
  'NC', 'OH', 'PA', 'TN', 'TX', 'WA', 'WI'
];
---

<div class="map-section">
  <h2>States with NFL Teams</h2>
  <USMap highlightedStates={nflStates} class="nfl-map" />
  <p class="map-legend">
    <span class="legend-item">
      <span class="legend-color highlighted"></span>
      States with NFL teams
    </span>
    <span class="legend-item">
      <span class="legend-color default"></span>
      Other states
    </span>
  </p>
</div>

<style>
  .map-section {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
  }

  .nfl-map {
    --state-highlighted-fill: #013369;
    --state-highlighted-stroke: #D50A0A;
    --state-highlighted-hover: #014d9a;
  }

  .map-legend {
    display: flex;
    gap: 2rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .legend-color {
    width: 24px;
    height: 24px;
    border: 2px solid #333;
    border-radius: 4px;
  }

  .legend-color.highlighted {
    background-color: #013369;
  }

  .legend-color.default {
    background-color: #e0e0e0;
  }
</style>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `highlightedStates` | `string[]` | `[]` | Array of two-letter state codes to highlight |
| `class` | `string` | `''` | Additional CSS classes to apply to the container |

## Accessibility

The component includes:
- Proper ARIA labels on the SVG
- `role="img"` attribute
- Title element for screen readers
- State labels are marked with `aria-hidden="true"` since they're decorative (IDs provide the semantic meaning)

## Browser Support

Works in all modern browsers that support:
- CSS custom properties
- CSS Grid and Flexbox
- SVG
- `prefers-color-scheme` media query

## Regenerating the Map with Labels

If you need to update the map or regenerate the labels, run:

```bash
node scripts/add-labels-to-map.js
```

This script:
1. Extracts state labels from `public/maps/map.svg`
2. Scales the coordinates to match the Wikimedia map dimensions (959x593 vs 2000x1200)
3. Combines them with `public/maps/us-states.svg`
4. Outputs to `public/maps/us-states-with-labels.svg`

The scaling factors are:
- X axis: 959/2000 = 0.4795
- Y axis: 593/1200 = 0.4942
