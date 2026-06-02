const { layout, site, esc } = require('../layout');
const C = require('../components');

module.exports = function about() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'About', path: '/about.html' },
  ];

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript(
      C.localBusinessSchema({
        foundingDate: site.founded,
        foundingLocation: `${site.address.locality}, ${site.address.regionName}`,
      })
    );

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">About us</span>
      <h1>Big-city smart home expertise, with a neighbor’s care</h1>
      <p class="lead">Cleveland Smart Home Solutions is locally owned and operated, founded to bring sophisticated smart home technology to ${esc(site.serviceAreaLabel)} — at honest, local prices.</p>
    </div>
  </section>

  <section class="section">
    <div class="container prose-wide">
      <div class="about-grid">
        <div class="about-copy">
          <h2>A new company, built on real experience</h2>
          <p>We may be a new name in ${esc(site.serviceAreaLabel)}, but we’re not new to this work. Our founder is a smart home specialist with years of hands-on installation experience — the kind of background that turns a pile of devices into a home that simply <em>works</em>.</p>
          <p>We started Cleveland Smart Home Solutions with a simple belief: the smart home experience you’d expect in a big-city luxury build should be available right here, to everyday homeowners, without the big-city price tag or the construction-zone chaos.</p>

          <h2>The neighbor who cares about your comfort</h2>
          <p>When we’re working in your home, we treat it like our own. We’re tidy. We’re respectful. We explain what we’re doing and why. And we’re genuinely invested in your comfort while the work is happening — because we’re your neighbors, not a faceless crew passing through.</p>

          <h2>Our promise: clean, simple, elegant</h2>
          <p>This is the heart of everything we do. Unlike companies that treat smart home installation like a renovation — opening walls, running wire, and disrupting your home for days — we specialize in clean, minimal-impact installs. <strong>No major construction. No mess. No stress.</strong> It isn’t a shortcut; it’s a more sophisticated, modern way to make a home smart.</p>
        </div>
        <aside class="about-side">
          <div class="founder-card">
            <img class="founder-photo" src="/images/technician-tablet-kitchen.jpg" width="1408" height="768"
                 alt="Cleveland Smart Home Solutions founder configuring a smart home system on a tablet in a client’s kitchen" loading="lazy" decoding="async">

            <h3>Founder &amp; Lead Installer</h3>
            <p class="muted">Smart home specialist · ${esc(site.serviceAreaLabel)}</p>
            <p>“I built this company to give my neighbors the smart home they deserve — beautifully done, honestly priced, and without tearing their house apart.”</p>
          </div>
          <ul class="fact-list">
            <li>${C.icon('pin', 'icon icon-sm icon-accent')}<span>Based in ${esc(site.address.locality)}, ${esc(site.address.region)}</span></li>
            <li>${C.icon('shield', 'icon icon-sm icon-accent')}<span>Licensed &amp; insured</span></li>
            <li>${C.icon('hand', 'icon icon-sm icon-accent')}<span>Years of hands-on experience</span></li>
            <li>${C.icon('home', 'icon icon-sm icon-accent')}<span>Serving all of ${esc(site.serviceAreaLabel)}</span></li>
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="values-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">What we stand for</span>
        <h2 id="values-h">Values you can feel in the work</h2>
      </div>
      <div class="values-grid">
        <div class="value-card">${C.icon('leaf', 'icon icon-lg icon-accent')}<h3>Minimal impact</h3><p>We protect your home and your time. Clean installs, careful work, spotless cleanup.</p></div>
        <div class="value-card">${C.icon('star', 'icon icon-lg icon-accent')}<h3>Honest pricing</h3><p>Transparent quotes and the right recommendation for you — never an upsell.</p></div>
        <div class="value-card">${C.icon('hand', 'icon icon-lg icon-accent')}<h3>Genuine care</h3><p>We treat your home like our own and your comfort like it matters — because it does.</p></div>
        <div class="value-card">${C.icon('spark', 'icon icon-lg icon-accent')}<h3>Effortless results</h3><p>We’re not done until everything feels simple and works the way you expect.</p></div>
      </div>
    </div>
  </section>

  ${C.trustRow()}

  ${C.ctaBand('Meet your new smart home partner', 'Have a question or a project in mind? We’d love to hear from you — no pressure, just a friendly conversation.')}
  `;

  return {
    path: 'about.html',
    html: layout({
      title: `About | Locally Owned Smart Home Experts in ${site.serviceAreaLabel}`,
      description:
        'Cleveland Smart Home Solutions is locally owned & operated in University Heights, OH. Founded by an experienced smart home specialist bringing big-city expertise to NE Ohio at honest prices.',
      path: '/about.html',
      body,
      jsonLd,
    }),
  };
};
