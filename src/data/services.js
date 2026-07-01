/**
 * Trade categories that drive the homepage/service tiles.
 *
 * Each tile is intentionally minimal — a circular icon badge, a bold label,
 * and a short one-line description. No pricing, no packages. The `id` doubles
 * as the anchor target on the Services page.
 */
const categories = [
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'bolt',
    blurb: 'Outlets, switches, fixtures, GFCIs, and code corrections for inspections.',
  },
  {
    id: 'drywall',
    name: 'Drywall',
    icon: 'panel',
    blurb: 'Holes, cracks, and water damage patched, taped, and sanded smooth.',
  },
  {
    id: 'painting',
    name: 'Painting',
    icon: 'roller',
    blurb: 'Clean interior and exterior painting, touch-ups, and trim work.',
  },
  {
    id: 'tile',
    name: 'Tile',
    icon: 'tile',
    blurb: 'Floor and wall tile, backsplashes, regrouting, and repairs.',
  },
  {
    id: 'masonry',
    name: 'Masonry',
    icon: 'brick',
    blurb: 'Tuckpointing, step and porch repair, and brick and block work.',
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    icon: 'saw',
    blurb: 'Trim, doors, railings, decks, and general wood repairs.',
  },
  {
    id: 'flooring',
    name: 'Flooring',
    icon: 'plank',
    blurb: 'Laminate, vinyl plank, hardwood repairs, and subfloor fixes.',
  },
  {
    id: 'more',
    name: '& More',
    icon: 'wrench',
    blurb: 'General handyman repairs and small renovation projects around the home.',
  },
];

module.exports = { categories };
