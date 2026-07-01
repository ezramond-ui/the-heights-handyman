/* The Heights Handyman — front-end behavior.
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
  // e.g. /contact.html?tier=Electrical  or  ?city=Cleveland%20Heights
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

  /* ---------------- AJAX form submission (contact + home estimate) ---------------- */
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
                'Sorry — something went wrong. Please call or text us and we’ll take care of you.',
              'is-error'
            );
          }
        })
        .catch(function () {
          setStatus(
            status,
            'We couldn’t reach the server. Please call or text us directly and we’ll respond right away.',
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

  wireForm('contact-form', 'Thank you! Your request is on its way — we’ll be in touch soon, usually the same day.');
  wireForm('home-quote-form', 'Thank you! Your request is on its way — we’ll be in touch soon with your free estimate.');

  /* ---------------- Service-area filter (optional) ---------------- */
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

      groups.forEach(function (g, i) {
        var visible = [].some.call(g.children, function (li) { return !li.hidden; });
        g.hidden = !visible;
        if (groupTitles[i]) groupTitles[i].hidden = !visible;
      });

      if (empty) empty.hidden = anyVisible;
    });
  }
})();
