/**
 * Every service location. Each entry drives one unique, SEO-optimized
 * landing page. The `character` and `homes` fields are written to be
 * distinct per location so generated pages are genuinely unique content
 * (not boilerplate), which matters for local search ranking.
 *
 *   name   – display name
 *   county – for content + LocalBusiness areaServed
 *   type   – 'suburb' | 'neighborhood'
 *   nearby – nearby community names used for internal linking + copy.
 *            Keep these geographically adjacent and reciprocal — they are
 *            the internal-link graph Google follows between area pages.
 *   character – one distinct sentence about the community
 *   homes  – one distinct phrase about the local housing stock
 *   pos    – does the city run a point-of-sale / pre-sale inspection?
 *            Defaults to true. Set to false and the page drops all POS
 *            copy, FAQ, and headline wording for that city.
 */

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const raw = [
  ['South Euclid', 'Cuyahoga', 'suburb', ['University Heights', 'Cleveland Heights', 'Lyndhurst', 'Richmond Heights'],
    'a welcoming, tree-lined community with strong neighborhood pride and a busy point-of-sale inspection program.',
    'sturdy century bungalows and Colonials that often need drywall, electrical, and masonry fixes to pass a city inspection.'],
  ['University Heights', 'Cuyahoga', 'suburb', ['South Euclid', 'Cleveland Heights', 'Beachwood', 'Shaker Heights'],
    'a tight-knit suburb built around John Carroll University, with an active resale inspection process.',
    'classic 1920s–40s Tudors and Colonials where careful, code-compliant repairs protect the home’s character.'],
  ['Cleveland Heights', 'Cuyahoga', 'suburb', ['University Heights', 'South Euclid', 'Shaker Heights', 'Beachwood'],
    'an eclectic, walkable community with a vibrant arts scene and one of the region’s strictest point-of-sale inspections.',
    'stately century homes with original plaster, wood, and stonework that frequently flag violations at resale.'],
  ['Beachwood', 'Cuyahoga', 'suburb', ['University Heights', 'Shaker Heights', 'Warrensville Heights', 'Lyndhurst'],
    'an upscale, well-kept suburb with premier shopping and detailed property-maintenance standards.',
    'spacious mid-century and modern homes where quality carpentry, tile, and finish work keep everything move-in ready.'],
  ['Shaker Heights', 'Cuyahoga', 'suburb', ['Cleveland Heights', 'University Heights', 'Beachwood', 'Warrensville Heights'],
    'a nationally recognized garden suburb of landmark districts, boulevards, and rapid stops — with an exacting pre-sale inspection.',
    'landmark Tudors, Georgians, and Colonial Revivals with slate, leaded glass, and original plaster that demand a careful hand.'],
  ['Lyndhurst', 'Cuyahoga', 'suburb', ['South Euclid', 'Richmond Heights', 'Mayfield Heights', 'Euclid'],
    'a steady, family-friendly suburb along the Mayfield Road corridor with a straightforward resale inspection.',
    'well-built postwar ranches and Cape Cods, many still on original panels, fixtures, and finished-basement wiring.'],
  ['Richmond Heights', 'Cuyahoga', 'suburb', ['South Euclid', 'Lyndhurst', 'Euclid', 'Mayfield Heights'],
    'a small, quiet suburb with easy highway access and a practical point-of-sale process.',
    '1950s and ’60s ranches and split-levels where decks, railings, drywall, and outlets top the punch list.'],
  ['Mayfield Heights', 'Cuyahoga', 'suburb', ['Lyndhurst', 'Richmond Heights', 'South Euclid'],
    'a busy eastside hub of shops, restaurants, and hospitals, with long-tenured homeowners on quiet side streets.',
    'compact postwar ranches and bungalows that reward smart updates — paint, tile, flooring, and electrical.'],
  ['Euclid', 'Cuyahoga', 'suburb', ['Richmond Heights', 'South Euclid', 'Lyndhurst'],
    'a lakefront city with deep manufacturing roots, a revitalized waterfront, and a well-known point-of-sale inspection.',
    '1920s–50s bungalows, Colonials, and doubles where porches, paint, wiring, and masonry are the usual inspection flags.'],
  ['Maple Heights', 'Cuyahoga', 'suburb', ['Warrensville Heights', 'Shaker Heights', 'Beachwood'],
    'a hard-working southeast suburb of walkable streets and long-standing neighborhoods, with a required pre-sale inspection.',
    'tidy postwar Cape Cods and bungalows where paint, steps, handrails, and GFCI outlets are the fixes that come up most.'],
  ['Warrensville Heights', 'Cuyahoga', 'suburb', ['Beachwood', 'Shaker Heights', 'Maple Heights'],
    'a connected southeast suburb bordering Beachwood’s shopping district, with an active housing inspection program.',
    'solid postwar ranches and Cape Cods that need dependable electrical, drywall, and exterior repairs to clear inspection.'],
];

const locations = raw.map(([name, county, type, nearby, character, homes, pos = true]) => ({
  name,
  slug: slugify(name),
  county,
  type,
  nearby,
  character,
  homes,
  pos,
}));

const site = require('./site');

/**
 * Body-copy phrase for our footprint: the headline cities plus a count of the
 * rest, so prose stays readable while still claiming the full service area.
 * Recomputes automatically whenever a location is added above.
 *   → "South Euclid, University Heights, Cleveland Heights, Beachwood,
 *      and 7 more eastside communities"
 */
const rest = locations.length - site.serviceCities.length;
const areaPhrase =
  rest > 0
    ? `${site.serviceCities.join(', ')}, and ${rest} more eastside communities`
    : site.serviceCities.join(', ');

/** Every city we serve as schema.org City nodes, for `areaServed`. */
const areaServedSchema = locations.map((l) => ({
  '@type': 'City',
  name: `${l.name}, OH`,
  containedInPlace: { '@type': 'AdministrativeArea', name: `${l.county} County, Ohio` },
}));

module.exports = { locations, slugify, areaPhrase, areaServedSchema };
