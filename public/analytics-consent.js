// Consent gate for the Rybbit analytics (TDDDG § 25 (1), GDPR Art. 6 (1) (a)).
//
// The tracker is not in the built HTML. This script injects it only after the
// visitor chose "Accept". The choice is kept under hl-analytics-consent, which
// is strictly necessary to remember it (TDDDG § 25 (2) no. 2). The Rybbit
// site config (site 23) has session replay, web vitals, errors, outbound
// links, URL parameters, button clicks, copy and form interactions on; the
// banner text and the privacy policy on healthlog.dev describe that set.
(function () {
	var KEY = 'hl-analytics-consent';
	var SRC = 'https://rybbit.bombeck.io/api/script.js';
	var SITE_ID = '23';
	var LOCAL_KEYS = ['rybbit-visitor-id', 'rybbit-user-id'];
	var SESSION_KEYS = ['rybbit-replay-sampled'];
	var memory = null;

	function read() {
		try {
			var v = localStorage.getItem(KEY);
			return v === 'granted' || v === 'denied' ? v : memory;
		} catch (e) {
			return memory;
		}
	}
	function write(v) {
		memory = v;
		try {
			localStorage.setItem(KEY, v);
		} catch (e) {}
	}
	function tag() {
		return document.querySelector('script[src="' + SRC + '"]');
	}
	function load() {
		if (tag()) return;
		var s = document.createElement('script');
		s.src = SRC;
		s.defer = true;
		s.setAttribute('data-site-id', SITE_ID);
		document.head.appendChild(s);
	}
	function clear() {
		try {
			LOCAL_KEYS.forEach(function (k) { localStorage.removeItem(k); });
			SESSION_KEYS.forEach(function (k) { sessionStorage.removeItem(k); });
		} catch (e) {}
	}

	var panel = null;
	var returnFocus = null;
	function close() {
		if (panel) panel.remove();
		panel = null;
		if (returnFocus) returnFocus.focus();
		returnFocus = null;
	}
	function decide(v) {
		var wasLoaded = tag() !== null;
		write(v);
		if (v === 'denied' && wasLoaded) {
			clear();
			location.reload();
			return;
		}
		if (v === 'granted') load();
		if (v === 'denied') clear();
		close();
	}
	function button(label, v) {
		var b = document.createElement('button');
		b.type = 'button';
		b.className = 'hl-consent__button';
		b.textContent = label;
		b.addEventListener('click', function () { decide(v); });
		return b;
	}
	function open(current) {
		if (panel) return;
		panel = document.createElement('div');
		panel.className = 'hl-consent';
		panel.setAttribute('role', 'dialog');
		panel.setAttribute('aria-modal', 'false');
		panel.setAttribute('aria-labelledby', 'hl-consent-title');
		panel.setAttribute('aria-describedby', 'hl-consent-body');
		panel.tabIndex = -1;
		var h = document.createElement('h2');
		h.id = 'hl-consent-title';
		h.textContent = 'Analytics';
		var p = document.createElement('p');
		p.id = 'hl-consent-body';
		p.textContent =
			'May this site measure your visit? If you agree, it loads Rybbit, analytics on the maintainer’s own server. It stores a random visitor id in your browser and records pages viewed, clicks, copied text, form use without what you type, errors and a session replay with form input masked. Nothing loads before you choose, and you can change it any time under Analytics settings at the bottom of every page. ';
		var a = document.createElement('a');
		a.href = 'https://healthlog.dev/privacy#website-analytics';
		a.textContent = 'Privacy policy, section 3';
		p.appendChild(a);
		panel.appendChild(h);
		panel.appendChild(p);
		if (current) {
			var c = document.createElement('p');
			c.className = 'hl-consent__current';
			c.textContent = current === 'granted' ? 'Current choice: accepted.' : 'Current choice: declined.';
			panel.appendChild(c);
		}
		var row = document.createElement('div');
		row.className = 'hl-consent__actions';
		// Same style for both: neither choice is visually preferred.
		row.appendChild(button('Decline', 'denied'));
		row.appendChild(button('Accept', 'granted'));
		panel.appendChild(row);
		panel.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && read() !== null) close();
		});
		document.body.appendChild(panel);
		if (current) panel.focus();
	}

	window.hlAnalyticsSettings = function () {
		returnFocus = document.activeElement;
		open(read());
	};

	function start() {
		var choice = read();
		if (choice === 'granted') load();
		else if (choice === 'denied') clear();
		else open(null);
	}
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
	else start();
})();
