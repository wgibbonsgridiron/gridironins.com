// Centralized state data for all insurance products

export const ALL_US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

/**
 * Helper function to get all states except specified ones
 */
export function getAllStatesExcept(...excludedStates: string[]): string[] {
  return ALL_US_STATES.filter(state => !excludedStates.includes(state));
}

export interface ProductStateData {
  states: string[];
  stateCount: number;
  description: string;
  isAllStatesExcept?: boolean;
  excludedStates?: string[];
}

/**
 * Centralized state data for each insurance product
 * Each product includes the list of states, count, and description
 */
export const productStates: Record<string, ProductStateData> = {
  'property': {
    states: ['FL', 'TX', 'LA', 'MS', 'AL', 'GA', 'SC', 'NC', 'NJ', 'NY'],
    stateCount: 10,
    description: 'Non-admitted coverage in 10 coastal states'
  },

  'excess-liability': {
    states: getAllStatesExcept('KY', 'NY'),
    stateCount: 48,
    description: 'Follow-form excess liability coverage in 48 states',
    isAllStatesExcept: true,
    excludedStates: ['KY', 'NY']
  },

  'inland-marine': {
    states: getAllStatesExcept('KY'),
    stateCount: 49,
    description: 'Admitted inland marine coverage in 49 states',
    isAllStatesExcept: true,
    excludedStates: ['KY']
  },

  'contractors-equipment': {
    states: ['WA', 'OR', 'CA', 'TX', 'LA', 'MS', 'AL', 'GA', 'FL', 'SC', 'NC', 'VA', 'NJ', 'PA', 'CT'],
    stateCount: 15,
    description: 'Available in 15 states across West Coast, Southern, and select Northeast regions'
  },

  'primary-flood': {
    states: ['WA', 'OR', 'CA', 'TX', 'FL', 'GA', 'SC', 'NC', 'VA', 'DC', 'MD', 'NJ', 'NY', 'CT', 'RI', 'MA'],
    stateCount: 16,
    description: 'Available in 16 states along coastal regions'
  }
};

/**
 * Get state data for a specific product
 */
export function getProductStates(productSlug: string): ProductStateData | undefined {
  return productStates[productSlug];
}

/**
 * Check if a product is available in a specific state
 */
export function isProductAvailableInState(productSlug: string, stateCode: string): boolean {
  const product = productStates[productSlug];
  return product ? product.states.includes(stateCode) : false;
}
