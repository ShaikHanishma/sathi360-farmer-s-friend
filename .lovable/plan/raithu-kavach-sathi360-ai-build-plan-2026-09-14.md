# Raithu Kavach Sathi360 AI — Build Plan

A mobile-first app for Indian farmers that listens and speaks in Telugu, Hindi and English, installable on a phone like a normal app.

## Phase 1 — Foundation and look
- Cinematic opening animation (sunrise over fields, logo bloom, shield motif) shown once per session.
- Earthy, high-contrast visual identity: deep soil brown, harvest gold, monsoon green; large tap targets and big text for outdoor, low-literacy use.
- Bottom tab bar: Sathi (chat), Crop, Weather, Market, Kavach, Me.
- Language picker on first open (Telugu / Hindi / English), remembered afterwards; every screen's text switches with it.
- Installable on the home screen and usable with a weak connection.

## Phase 2 — Sathi360 voice companion
- Big press-to-talk mic as the main action; the farmer speaks, sees the words appear, and hears the answer read aloud.
- Typed chat also available; answers keep conversation memory.
- Answers spoken in the chosen language; a stop button ends speaking.

## Phase 3 — Crop Doctor
- Take or upload a leaf/crop photo, get likely disease, severity, organic and chemical remedies, and prevention steps, read aloud.
- History of past scans on the device profile.

## Phase 4 — Weather and Market
- Weather: location-based today/7-day view with farm advice (spray, irrigate, harvest warnings).
- Market: crop prices with trend up/down and a simple "sell now or wait" suggestion.

## Phase 5 — Cyber Kavach
- Scam Call checker: describe or paste a call transcript, get a risk verdict.
- SMS analyzer and Link analyzer: paste text or a link, get risk reasons in plain language.
- Animated risk meter (safe / caution / danger) plus a spoken warning in the chosen language.

## Phase 6 — Schemes, SOS, Profile
- Government Schemes: searchable cards with eligibility, benefit, how to apply.
- SOS: one big button with confirm, sharing location and alerting saved contacts.
- Profile: name, village, land size, crops, language, saved contacts, scan history.

## Technical notes
- TanStack Start with file routes per section; Tailwind design tokens in `src/styles.css`; PWA manifest and service worker.
- Lovable Cloud enabled for auth, profiles, scan/chat history, contacts, and secure server-side AI calls.
- Lovable AI Gateway: chat model for Sathi360, crop-photo analysis and scam/SMS/link analysis; gateway speech-to-text for voice input and text-to-speech for spoken answers, all called from server functions so keys stay server-side.
- Weather and market data start from a server function with a seeded dataset; a live provider key can be added later.

## Out of scope for now
- Real market feeds or government APIs requiring official credentials.
- SMS/telephony interception (browsers cannot read a phone's calls or messages) — Kavach works on pasted or spoken content.
