/**
 * Every service location. Each entry drives one unique, SEO-optimized
 * landing page. The `character` and `homes` fields are written to be
 * distinct per location so generated pages are genuinely unique content
 * (not boilerplate), which matters for local search ranking.
 *
 *   name   – display name
 *   county – for content + LocalBusiness areaServed
 *   type   – 'suburb' | 'neighborhood'
 *   nearby – nearby community names used for internal linking + copy
 *   character – one distinct sentence about the community
 *   homes  – one distinct phrase about the local housing stock
 */

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const raw = [
  ['South Euclid', 'Cuyahoga', 'suburb', ['University Heights', 'Cleveland Heights', 'Beachwood'],
    'a welcoming, tree-lined community with strong neighborhood pride and a busy point-of-sale inspection program.',
    'sturdy century bungalows and Colonials that often need drywall, electrical, and masonry fixes to pass a city inspection.'],
  ['University Heights', 'Cuyahoga', 'suburb', ['South Euclid', 'Cleveland Heights', 'Beachwood'],
    'a tight-knit suburb built around John Carroll University, with an active resale inspection process.',
    'classic 1920s–40s Tudors and Colonials where careful, code-compliant repairs protect the home’s character.'],
  ['Cleveland Heights', 'Cuyahoga', 'suburb', ['University Heights', 'South Euclid', 'Beachwood'],
    'an eclectic, walkable community with a vibrant arts scene and one of the region’s strictest point-of-sale inspections.',
    'stately century homes with original plaster, wood, and stonework that frequently flag violations at resale.'],
  ['Beachwood', 'Cuyahoga', 'suburb', ['University Heights', 'Cleveland Heights', 'South Euclid'],
    'an upscale, well-kept suburb with premier shopping and detailed property-maintenance standards.',
    'spacious mid-century and modern homes where quality carpentry, tile, and finish work keep everything move-in ready.'],
];

const locations = raw.map(([name, county, type, nearby, character, homes]) => ({
  name,
  slug: slugify(name),
  county,
  type,
  nearby,
  character,
  homes,
}));

module.exports = { locations, slugify };
