/* Cleveland Smart Home Solutions — front-end behavior.
   Vanilla JS, no dependencies. Progressive enhancement only. */
(function () {
  'use strict';

  /* ---------------- Mobile nav ---------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close the menu after tapping a link.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- Pre-fill contact form from query string ---------------- */
  // e.g. /contact.html?tier=landlord  or  ?city=Shaker%20Heights
  try {
    var params = new URLSearchParams(window.location.search);
    var tier = params.get('tier');
    if (tier) {
      var tierSel = document.getElementById('tier');
      if (tierSel && [].some.call(tierSel.options, function (o) { return o.value === tier; })) {
        tierSel.value = tier;
      }
    }
    var city = params.get('city');
    if (city) {
      var cityInput = document.getElementById('city');
      if (cityInput && !cityInput.value) cityInput.value = city;
    }
  } catch (e) { /* no-op */ }

  /* ---------------- AJAX form submission (contact + review) ---------------- */
  function wireForm(formId, successMsg) {
    var form = document.getElementById(formId);
    if (!form) return;
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('.form-submit');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Native validation first.
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Honeypot — if filled, silently pretend success (likely a bot).
      var hp = form.querySelector('input[name="company"]');
      if (hp && hp.value) {
        setStatus(status, successMsg, 'is-success');
        form.reset();
        return;
      }

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      submitBtn.disabled = true;
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      setStatus(status, '', '');

      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (body) {
            return { ok: res.ok, body: body };
          });
        })
        .then(function (result) {
          if (result.ok) {
            setStatus(status, successMsg, 'is-success');
            form.reset();
          } else {
            setStatus(
              status,
              (result.body && result.body.error) ||
                'Sorry — something went wrong. Please call or email us and we’ll take care of you.',
              'is-error'
            );
          }
        })
        .catch(function () {
          setStatus(
            status,
            'We couldn’t reach the server. Please call or email us directly and we’ll respond right away.',
            'is-error'
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }

  function setStatus(el, msg, cls) {
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-status' + (cls ? ' ' + cls : '');
  }

  wireForm('contact-form', 'Thank you! Your request is on its way — we’ll be in touch within one business day.');
  wireForm('review-form', 'Thank you for your review! It has been sent to us and will appear after approval.');

  /* ---------------- Service-area filter ---------------- */
  var filter = document.getElementById('area-filter');
  if (filter) {
    var links = [].slice.call(document.querySelectorAll('.area-link'));
    var groups = [].slice.call(document.querySelectorAll('.area-list'));
    var empty = document.querySelector('.area-empty');
    var groupTitles = [].slice.call(document.querySelectorAll('.area-group-title'));

    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      var anyVisible = false;

      links.forEach(function (a) {
        var match = a.getAttribute('data-name').indexOf(q) !== -1;
        a.parentElement.hidden = !match;
        if (match) anyVisible = true;
      });

      // Hide a group + its title if it has no visible items.
      groups.forEach(function (g, i) {
        var visible = [].some.call(g.children, function (li) { return !li.hidden; });
        g.hidden = !visible;
        if (groupTitles[i]) groupTitles[i].hidden = !visible;
      });

      if (empty) empty.hidden = anyVisible;
    });
  }

  /* ---------------- Second-switch before/after explainer ---------------- */
  setupSwitchDemo();

  function setupSwitchDemo() {
    var modal = document.getElementById('switch-demo-modal');
    if (!modal) return;

    var openers = [].slice.call(document.querySelectorAll('[data-switch-demo-open]'));
    var closers = [].slice.call(modal.querySelectorAll('[data-switch-demo-close]'));
    var replayBtn = modal.querySelector('[data-switch-demo-replay]');
    var canvases = [].slice.call(modal.querySelectorAll('.switch-demo-canvas'));
    var lastFocused = null;
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---- virtual drawing space + palette (site navy / blue-grey) ---- */
    var VW = 400, VH = 300, FLOOR = 250;
    var INK = '#0f1d2e', MUTED = '#5c6b7e', LINE = '#c2cdda',
        SOFT = '#cdd9e8', FLOORCOL = '#e6ebf3', WALL = '#aeb9c8';
    var RED = '#d2483b', TEAL = '#1d9b6c';
    var BULB = { x: 200, y: 88 };
    var BEFORE_SW = { x: 352, y: 150 };
    var FAR_SW = { x: 352, y: 150 };
    var NEW_SW = { x: 104, y: 164 };

    function lerp(a, b, t) { return a + (b - a) * t; }
    function ease(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }

    function roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    /* ---------- scene pieces (all in virtual coords) ---------- */
    function drawRoom(ctx) {
      ctx.fillStyle = FLOORCOL;
      ctx.fillRect(0, FLOOR, VW, VH - FLOOR);
      ctx.strokeStyle = WALL;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(24, 50); ctx.lineTo(24, FLOOR);            // left wall
      ctx.moveTo(376, 50); ctx.lineTo(376, FLOOR);          // right wall
      ctx.moveTo(24, 50); ctx.lineTo(376, 50);              // ceiling
      ctx.moveTo(24, FLOOR); ctx.lineTo(376, FLOOR);        // floor line
      ctx.stroke();
    }

    function drawLight(ctx, on) {
      ctx.strokeStyle = MUTED;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(BULB.x, 50); ctx.lineTo(BULB.x, BULB.y - 12);
      ctx.stroke();
      if (on) {
        var g = ctx.createRadialGradient(BULB.x, BULB.y, 4, BULB.x, BULB.y, 60);
        g.addColorStop(0, 'rgba(255, 214, 110, .75)');
        g.addColorStop(1, 'rgba(255, 214, 110, 0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(BULB.x, BULB.y, 60, 0, Math.PI * 2); ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(BULB.x, BULB.y, 13, 0, Math.PI * 2);
      ctx.fillStyle = on ? '#ffdc77' : SOFT;
      ctx.fill();
      ctx.strokeStyle = on ? '#e0ad36' : LINE;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // active: highlight color (or null for idle); receiving: draw a glow ring.
    function drawSwitch(ctx, s, active, receiving) {
      if (receiving) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(29, 155, 108, .18)';
        ctx.fill();
      }
      roundRect(ctx, s.x - 8, s.y - 12, 16, 24, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = active || LINE;
      ctx.lineWidth = active ? 2 : 1.4;
      ctx.stroke();
      roundRect(ctx, s.x - 3.5, s.y - 7, 7, 14, 2.5);
      ctx.fillStyle = active || MUTED;
      ctx.fill();
    }

    // o: { reach: 0..1, target: {x,y}, walk: progress|null }
    function drawPerson(ctx, px, o) {
      o = o || {};
      ctx.strokeStyle = INK;
      ctx.fillStyle = INK;
      ctx.lineCap = 'round';
      // body
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(px, 198); ctx.lineTo(px, 226);
      ctx.stroke();
      // head
      ctx.beginPath();
      ctx.arc(px, 188, 9, 0, Math.PI * 2);
      ctx.fill();
      // legs
      var swing = (o.walk != null) ? Math.sin(o.walk * Math.PI * 6) * 7 : 0;
      ctx.beginPath();
      ctx.moveTo(px, 226); ctx.lineTo(px - 6 + swing, FLOOR - 2);
      ctx.moveTo(px, 226); ctx.lineTo(px + 6 - swing, FLOOR - 2);
      ctx.stroke();
      // back arm
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(px, 206); ctx.lineTo(px - 9, 220);
      ctx.stroke();
      // front (reaching) arm
      var hx = px + 9, hy = 220;
      if (o.target && o.reach) {
        var r = ease(Math.min(1, o.reach));
        hx = lerp(px + 9, o.target.x, r);
        hy = lerp(220, o.target.y, r);
      }
      ctx.beginPath();
      ctx.moveTo(px, 206); ctx.lineTo(hx, hy);
      ctx.stroke();
    }

    // Traveling wireless pulse from A to B along progress s (0..1).
    function drawPulse(ctx, ax, ay, bx, by, s, color) {
      ctx.save();
      ctx.setLineDash([3, 5]);
      ctx.strokeStyle = 'rgba(29, 155, 108, .35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
      ctx.stroke();
      ctx.restore();

      var x = lerp(ax, bx, s), y = lerp(ay, by, s);
      var halo = ctx.createRadialGradient(x, y, 1, x, y, 16);
      halo.addColorStop(0, 'rgba(29, 155, 108, .55)');
      halo.addColorStop(1, 'rgba(29, 155, 108, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI * 2); ctx.fill();
      // expanding ripple trailing the pulse
      var rip = (s * 3) % 1;
      ctx.strokeStyle = 'rgba(29, 155, 108,' + (0.5 * (1 - rip)) + ')';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x, y, 4 + rip * 12, 0, Math.PI * 2); ctx.stroke();
      // core
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    }

    /* ---------- timelines ---------- */
    function beforePhases() {
      return [
        { d: 1000, msg: 'The only switch is on the far wall — across the room.',
          render: function (ctx) {
            drawSwitch(ctx, BEFORE_SW, null, false);
            drawLight(ctx, true);
            drawPerson(ctx, 78, {});
          } },
        { d: 2100, msg: 'Walking all the way across to reach it…',
          render: function (ctx, p) {
            drawSwitch(ctx, BEFORE_SW, null, false);
            drawLight(ctx, true);
            drawPerson(ctx, lerp(78, 322, ease(p)), { walk: p });
          } },
        { d: 800, msg: 'Reached the switch — lights off.',
          render: function (ctx, p) {
            var off = p > 0.55;
            drawSwitch(ctx, BEFORE_SW, off ? RED : null, false);
            drawLight(ctx, !off);
            drawPerson(ctx, 322, { target: BEFORE_SW, reach: Math.min(1, p * 1.8) });
          } },
        { d: 2100, msg: '…then the long walk all the way back.',
          render: function (ctx, p) {
            drawSwitch(ctx, BEFORE_SW, RED, false);
            drawLight(ctx, false);
            drawPerson(ctx, lerp(322, 78, ease(p)), { walk: p });
          } },
        { d: 1400, msg: 'All that — just to switch off one light.',
          render: function (ctx) {
            drawSwitch(ctx, BEFORE_SW, RED, false);
            drawLight(ctx, false);
            drawPerson(ctx, 78, {});
          } }
      ];
    }

    function afterPhases() {
      return [
        { d: 1100, msg: 'A smart switch, added right where you stand.',
          render: function (ctx) {
            drawSwitch(ctx, NEW_SW, TEAL, false);
            drawSwitch(ctx, FAR_SW, null, false);
            drawLight(ctx, true);
            drawPerson(ctx, 74, {});
          } },
        { d: 750, msg: 'Just tap it — no walking required.',
          render: function (ctx, p) {
            drawSwitch(ctx, NEW_SW, TEAL, p > 0.4);
            drawSwitch(ctx, FAR_SW, null, false);
            drawLight(ctx, true);
            drawPerson(ctx, 74, { target: NEW_SW, reach: Math.min(1, p * 1.6) });
          } },
        { d: 1700, msg: 'A wireless signal glides across the room…',
          render: function (ctx, p) {
            drawSwitch(ctx, NEW_SW, TEAL, true);
            drawSwitch(ctx, FAR_SW, null, p > 0.9);
            drawLight(ctx, true);
            drawPerson(ctx, 74, {});
            drawPulse(ctx, NEW_SW.x + 8, NEW_SW.y, FAR_SW.x - 8, FAR_SW.y, ease(p), TEAL);
          } },
        { d: 1100, msg: '…reaches the far switch and rises up to the light.',
          render: function (ctx, p) {
            drawSwitch(ctx, NEW_SW, TEAL, false);
            drawSwitch(ctx, FAR_SW, TEAL, true);
            drawLight(ctx, true);
            drawPerson(ctx, 74, {});
            drawPulse(ctx, FAR_SW.x, FAR_SW.y - 10, BULB.x, BULB.y, ease(p), TEAL);
          } },
        { d: 600, msg: 'Lights off — without taking a single step.',
          render: function (ctx) {
            drawSwitch(ctx, NEW_SW, TEAL, false);
            drawSwitch(ctx, FAR_SW, TEAL, false);
            drawLight(ctx, false);
            drawPerson(ctx, 74, {});
          } },
        { d: 1500, msg: 'Same result. Zero steps.',
          render: function (ctx) {
            drawSwitch(ctx, NEW_SW, TEAL, false);
            drawSwitch(ctx, FAR_SW, TEAL, false);
            drawLight(ctx, false);
            drawPerson(ctx, 74, {});
          } }
      ];
    }

    /* ---------- per-canvas scene controller ---------- */
    function makeScene(canvas) {
      var ctx = canvas.getContext('2d');
      var type = canvas.getAttribute('data-scene');
      var statusEl = modal.querySelector('[data-status="' + type + '"]');
      var phases = type === 'before' ? beforePhases() : afterPhases();
      var total = phases.reduce(function (a, ph) { return a + ph.d; }, 0);
      var raf = null, startTime = 0, lastMsg = '';

      function resize() {
        var rect = canvas.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        var w = Math.max(1, Math.round((rect.width || VW) * dpr));
        var h = Math.max(1, Math.round((rect.height || (VW * VH / VW)) * dpr));
        if (canvas.width !== w) canvas.width = w;
        if (canvas.height !== h) canvas.height = h;
      }

      function setStatus(msg) {
        if (msg !== lastMsg && statusEl) { statusEl.textContent = msg; lastMsg = msg; }
      }

      function draw(t) {
        ctx.setTransform(canvas.width / VW, 0, 0, canvas.height / VH, 0, 0);
        ctx.clearRect(0, 0, VW, VH);
        drawRoom(ctx);
        var acc = 0, i;
        for (i = 0; i < phases.length; i++) {
          if (t < acc + phases[i].d || i === phases.length - 1) {
            var p = Math.max(0, Math.min(1, (t - acc) / phases[i].d));
            phases[i].render(ctx, p);
            setStatus(phases[i].msg);
            return;
          }
          acc += phases[i].d;
        }
      }

      function loop(now) {
        var t = now - startTime;
        if (t >= total) { draw(total); raf = null; return; }
        draw(t);
        raf = requestAnimationFrame(loop);
      }

      function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

      function play() {
        resize();
        stop();
        lastMsg = '';
        if (reduceMotion) { draw(total); return; }
        startTime = (window.performance && performance.now) ? performance.now() : Date.now();
        raf = requestAnimationFrame(loop);
      }

      function refresh() { resize(); draw(raf ? 0 : total); }

      return { play: play, stop: stop, refresh: refresh };
    }

    var scenes = canvases.map(makeScene);

    function playAll() { scenes.forEach(function (s) { s.play(); }); }
    function stopAll() { scenes.forEach(function (s) { s.stop(); }); }

    /* ---------- open / close ---------- */
    function openModal() {
      lastFocused = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeydown);
      if (closers[0]) closers[0].focus();
      // Let layout settle so canvases have a measured size, then play.
      requestAnimationFrame(playAll);
    }
    function closeModal() {
      stopAll();
      modal.hidden = true;
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    function onKeydown(e) {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'Tab') {
        var f = [].slice.call(
          modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
        ).filter(function (el) { return el.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    openers.forEach(function (el) {
      el.addEventListener('click', openModal);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
      });
    });
    closers.forEach(function (el) { el.addEventListener('click', closeModal); });
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    if (replayBtn) replayBtn.addEventListener('click', playAll);

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      if (modal.hidden) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        scenes.forEach(function (s) { s.refresh(); });
      }, 150);
    });
  }
})();
