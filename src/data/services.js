/** Service tiers and the key services menu. */

const tiers = [
  {
    id: 'essentials',
    name: 'Essentials',
    headline: 'Start Smart',
    summary:
      'A few smart switches, basic scheduling, and simple on/off control right from your phone. Perfect for someone dipping their toes into smart living.',
    features: [
      'A handful of smart switches in the rooms you use most',
      'Basic scheduling — lights on at sunset, off at bedtime',
      'Simple on/off and dimming control from your phone',
      'A friendly walkthrough so you feel confident from day one',
    ],
    landlord:
      'Ideal for landlords adding light remote control to a unit — set a simple schedule between tenants and check in from anywhere.',
    popular: false,
    priceNote: 'Custom quote — most Essentials projects are a single, tidy visit.',
  },
  {
    id: 'comfort',
    name: 'Comfort',
    headline: 'Live Smarter',
    summary:
      'Full room coverage, proper three-way switch setups, and scenes like “Movie Night” or “Good Morning,” plus timer automations. The sweet spot for most homeowners.',
    features: [
      'Full smart lighting coverage across your main living spaces',
      'Three-way and multi-switch setups done cleanly',
      'Custom scenes — “Movie Night,” “Good Morning,” “Away”',
      'Timer and sunrise/sunset automations that just work',
      'Voice control ready (Alexa, Google, or Apple)',
    ],
    landlord:
      'A favorite for rental owners: hand tenants polished scenes and keep schedule control and remote oversight of the property for yourself.',
    popular: true,
    priceNote: 'Custom quote — scoped room by room to fit your home.',
  },
  {
    id: 'signature',
    name: 'Signature',
    headline: 'Total Control',
    summary:
      'Whole-home design, custom scenes for every room, integration with Alexa, Google, and Apple, and a dedicated walkthrough so everything feels effortless from day one. Our premium, white-glove package.',
    features: [
      'Whole-home smart lighting and automation design',
      'Custom scenes tailored to every room and routine',
      'Full integration with Alexa, Google Home, and Apple Home',
      'Smart thermostats, locks, shades, and doorbell cameras unified',
      'Dedicated walkthrough and personal onboarding',
      'Priority support after install',
    ],
    landlord:
      'The premium choice for multi-unit and high-end rental owners — centralized remote management, tenant-friendly scenes, and complete oversight of every property.',
    popular: false,
    priceNote: 'Custom quote — a tailored design consultation is where we begin.',
  },
];

// Key services — smart lighting is the core focus and listed first.
const keyServices = [
  {
    id: 'smart-lighting',
    name: 'Smart Lighting',
    core: true,
    blurb:
      'Our specialty. Scenes like “Movie Night” or “Good Morning” set every light in a room — or your whole floor — with one tap, and automatic schedules handle the rest, like all your downstairs lights switching off at 10pm. The heart of a smart home, installed without tearing into your walls.',
    icon: 'bulb',
  },
  {
    id: 'three-way-switches',
    name: 'Three-Way Switch Upgrades',
    blurb:
      'Those tricky staircases and long hallways with two or three switches? We make them smart and reliable — properly, cleanly, the right way.',
    icon: 'switch',
  },
  {
    id: 'smart-thermostats',
    name: 'Smart Thermostats',
    blurb:
      'Comfort that learns your routine and trims your energy bill — controllable from the couch or across the country.',
    icon: 'thermostat',
  },
  {
    id: 'doorbell-cameras',
    name: 'Doorbell Cameras',
    blurb:
      'See who is at the door from anywhere. Clean installs that look like they belong on your home.',
    icon: 'camera',
  },
  {
    id: 'smart-locks',
    name: 'Smart Locks',
    blurb:
      'Keyless entry, guest codes, and the peace of mind of knowing your door is locked — wherever you are.',
    icon: 'lock',
  },
  {
    id: 'smart-shades',
    name: 'Smart Shades',
    blurb:
      'Shades that rise with the sun and lower for movie night. Quiet, elegant, and automatic.',
    icon: 'shade',
  },
  {
    id: 'home-automation',
    name: 'Full Home Automation',
    blurb:
      'Bring it all together into one calm, coordinated system that anticipates your day and responds to your voice.',
    icon: 'home',
  },
];

module.exports = { tiers, keyServices };
