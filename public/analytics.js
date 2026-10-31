// Visit counting with the self-hosted Rybbit server, without consent and
// without touching the visitor's device.
//
// Rybbit's own tracker script is not used: it writes a persistent visitor id
// to local storage on load, which needs consent under TDDDG § 25 (1). This
// script sends the two events the site actually reads, a page view and a
// click on a link to another site, straight to the tracking endpoint. Nothing
// is stored or read for counting. Without a client id the server identifies a
// visitor by a hash of IP address and user agent salted per day (site 23,
// "saltUserIds"), and keeps no IP address ("trackIp" off). Session replay,
// clicks, copy, form, error and web-vitals tracking are off in the site
// config; of the URL parameters only the campaign tags below are passed on.
// The privacy policy on healthlog.dev, section 3, describes exactly this set.
//
// Legal basis is the legitimate interest (GDPR Art. 6 (1) (f)), so a visitor
// can object under Analytics settings in the footer. That request is kept
// under OPT_OUT, which is strictly necessary to remember it (TDDDG § 25 (2)
// no. 2). A browser that sends Global Privacy Control or Do Not Track is not
// counted.
(function () {
	var TRACK_URL = 'https://rybbit.bombeck.io/api/track';
	var SITE_ID = '23';
	var OPT_OUT = 'hl-analytics-optout';
	var CAMPAIGN_PARAMS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign'];
	// The consent banner this replaced stored "denied" here; a visitor who
	// declined then is treated as having objected now.
	var LEGACY_KEY = 'hl-analytics-consent';
	var LEGACY_LOCAL = ['rybbit-visitor-id', 'rybbit-user-id'];
	var LEGACY_SESSION = ['rybbit-replay-sampled'];
	var memory = null;

	function signal() {
		return navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
	}
	function state() {
		if (signal()) return 'signal';
		try {
			if (localStorage.getItem(OPT_OUT) === '1') return 'off';
		} catch (e) {}
		return memory || 'on';
	}
	function setCounting(on) {
		memory = on ? 'on' : 'off';
		try {
			if (on) localStorage.removeItem(OPT_OUT);
			else localStorage.setItem(OPT_OUT, '1');
		} catch (e) {}
	}
	function clearLegacy() {
		try {
			LEGACY_LOCAL.forEach(function (k) { localStorage.removeItem(k); });
			LEGACY_SESSION.forEach(function (k) { sessionStorage.removeItem(k); });
			var old = localStorage.getItem(LEGACY_KEY);
			if (old !== null) {
				if (old === 'denied') localStorage.setItem(OPT_OUT, '1');
				localStorage.removeItem(LEGACY_KEY);
			}
		} catch (e) {}
	}

	function send(event) {
		var body = {
			site_id: SITE_ID,
			hostname: location.hostname,
			pathname: location.pathname,
		};
		for (var k in event) body[k] = event[k];
		try {
			fetch(TRACK_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
				keepalive: true,
				credentials: 'omit',
			}).catch(function () {});
		} catch (e) {}
	}
	function campaignQuery() {
		var params = new URLSearchParams(location.search);
		var kept = new URLSearchParams();
		CAMPAIGN_PARAMS.forEach(function (name) {
			var v = params.get(name);
			if (v) kept.set(name, v.slice(0, 100));
		});
		var q = kept.toString();
		return q ? '?' + q : '';
	}
	// Only the referring site's origin, and only when it is another site.
	function externalReferrer() {
		try {
			var ref = new URL(document.referrer);
			return ref.hostname === location.hostname ? '' : ref.origin;
		} catch (e) {
			return '';
		}
	}
	function onClick(e) {
		if (state() !== 'on') return;
		var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
		if (!a) return;
		var url;
		try {
			url = new URL(a.href);
		} catch (err) {
			return;
		}
		if (url.protocol.indexOf('http') !== 0 || url.hostname === location.hostname) return;
		send({ type: 'outbound', properties: JSON.stringify({ url: url.origin + url.pathname }) });
	}

	var panel = null;
	var returnFocus = null;
	function close() {
		if (panel) panel.remove();
		panel = null;
		if (returnFocus) returnFocus.focus();
		returnFocus = null;
	}
	function currentText(s) {
		if (s === 'signal')
			return 'Your browser sends Global Privacy Control or Do Not Track, so your visits are not counted.';
		return s === 'off' ? 'Your visits are not counted in this browser.' : 'Your visits are counted.';
	}
	function button(label, onPress) {
		var b = document.createElement('button');
		b.type = 'button';
		b.className = 'hl-consent__button';
		b.textContent = label;
		b.addEventListener('click', onPress);
		return b;
	}
	function open() {
		if (panel) return;
		var s = state();
		panel = document.createElement('div');
		panel.className = 'hl-consent';
		panel.setAttribute('role', 'dialog');
		panel.setAttribute('aria-modal', 'false');
		panel.setAttribute('aria-labelledby', 'hl-consent-title');
		panel.setAttribute('aria-describedby', 'hl-consent-body');
		panel.tabIndex = -1;
		var h = document.createElement('h2');
		h.id = 'hl-consent-title';
		h.textContent = 'Visit counting';
		var p = document.createElement('p');
		p.id = 'hl-consent-body';
		p.textContent =
			'This site counts page views and clicks on links to other sites with Rybbit, analytics on the maintainer’s own server. It sets no cookies and stores nothing in your browser for that. Your IP address is not stored, and visits cannot be linked from one day to the next. ';
		var a = document.createElement('a');
		a.href = 'https://healthlog.dev/privacy#website-analytics';
		a.textContent = 'Privacy policy, section 3';
		p.appendChild(a);
		var c = document.createElement('p');
		c.className = 'hl-consent__current';
		c.setAttribute('aria-live', 'polite');
		c.textContent = currentText(s);
		var row = document.createElement('div');
		row.className = 'hl-consent__actions';
		if (s !== 'signal') {
			var toggle = button(s === 'off' ? 'Count my visits' : 'Don’t count me', function () {
				var next = state() === 'off';
				setCounting(next);
				toggle.textContent = next ? 'Don’t count me' : 'Count my visits';
				c.textContent = currentText(state());
			});
			row.appendChild(toggle);
		}
		row.appendChild(button('Close', close));
		panel.appendChild(h);
		panel.appendChild(p);
		panel.appendChild(c);
		panel.appendChild(row);
		panel.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') close();
		});
		document.body.appendChild(panel);
		panel.focus();
	}

	window.hlAnalyticsSettings = function () {
		returnFocus = document.activeElement;
		open();
	};

	function start() {
		clearLegacy();
		document.addEventListener('click', onClick, true);
		if (state() === 'on') {
			send({
				type: 'pageview',
				page_title: document.title,
				referrer: externalReferrer(),
				querystring: campaignQuery(),
			});
		}
	}
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
	else start();
})();
