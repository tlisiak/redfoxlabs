# Peek: prototype research

Researched 2026-10-05. The research environment couldn't reach YouTube or any domain registry, so **every stream ID and every domain below still needs a 5-minute live check in a browser** before it's shown to anyone.

## 1. The 10 prototype streams

The full "info list" for each one (what you're looking at, watch for, story, facts, sources) lives in [`public/peek/streams.js`](../../public/peek/streams.js). That file is both the research and the data the prototype runs on.

| # | View | Where | Source | Hours | Notes |
|---|------|-------|--------|-------|-------|
| 1 | Namib Desert Waterhole | Gondwana Namib Park, Namibia | [NamibiaCam](https://www.youtube.com/watch?v=ydYDqZQpim8) | 24/7 (infrared at night) | Solar powered, run by a lodge group. Ideal partner profile. |
| 2 | Mount Fuji over Lake Kawaguchiko | Fujikawaguchiko, Japan | [Panoramic Ropeway 4K](https://www.youtube.com/watch?v=Sv9hcJ3k5h4) | Daylight | 36 other Fuji streams indexed at [isfujivisible.com](https://isfujivisible.com/mt-fuji-live-cams) if this one drops. |
| 3 | Rialto Bridge, Grand Canal | Venice, Italy | [I Love You Venice 4K](https://www.youtube.com/watch?v=Kmf_wiTFuXY) | Daylight | Independent operator with several Venice cams. |
| 4 | Jökulsárlón Glacier Lagoon | Iceland | [Live from Iceland](https://www.youtube.com/watch?v=WDHSEuMUb3w) | Daylight | Days get short fast in winter (~4–5h in December). |
| 5 | Kāʻanapali Beach & Black Rock | Maui, Hawaiʻi | [Maui Live Cam](https://www.youtube.com/channel/UCIQVWkOilfxoQSFcban_d-A) (channel embed) | Daylight | Whale season Nov–Apr. Uses channel embed, so it survives stream restarts. |
| 6 | Kelp Forest | Monterey Bay Aquarium | [MBA Kelp Cam](https://www.youtube.com/watch?v=w3LjpFhySTg) | 7am–7pm PT (assumed) | Hours not confirmed. Aquarium is a nonprofit with a big cam program. |
| 7 | Old Faithful | Yellowstone | [NPS stream](https://www.youtube.com/watch?v=VJSMy-H_GKE) | Daylight | Federal NPS footage. Worth asking NPS directly about reuse terms. |
| 8 | Lake Tahoe | Zephyr Cove, NV | [ABC7 Tahoe cam](https://www.youtube.com/live/Lk0Z5ExUWL0) | Daylight | Owned by a TV station, so it'll be the hardest to license. |
| 9 | San Francisco Bay | Treasure Island, SF | [Mersea Restaurant](https://www.youtube.com/watch?v=BSWhGNXxT9A) | Daylight | Restaurant cam. Easy, local first partner conversation. |
| 10 | The Matterhorn | Zermatt, Switzerland | [Glacier Paradise](https://www.youtube.com/watch?v=o9puACFGW0o) | Daylight | ⚠️ May be a recorded video, not a live stream. Verify. Swap for a Zermatt Bergbahnen live cam if so. |

**Gaps:** nothing yet from South America, Australia/NZ or Southeast Asia. That matters for the daylight model: from about 03:00 to 06:00 UTC (8–11pm in California), only 3 of the 10 are eligible, and one of those is the Namib cam in night mode. Next additions should be Patagonia (Torres del Paine), Sydney Harbour or the Great Barrier Reef, and Bali or Ha Long Bay.

**Seasonal ones to add later:** Brooks Falls bear cam, Katmai (explore.org; [season ran from June 23, 2026](https://earthsky.org/earth/katmai-brown-bear-cam-season-livestream-here/)), and a Lofoten or Abisko aurora cam for winter nights (the one case where night is worth showing).

## 2. YouTube terms: what's allowed

From the [YouTube API Services Developer Policies](https://developers.google.com/youtube/terms/developer-policies) (relayed via search, since the page itself was unreachable here):

- **"API Clients must not charge users to watch content in an embedded YouTube player."** So the $1-per-drop model on YouTube embeds was out, and the move to free is right.
- **You also can't offer rewards or compensation for viewing.** A passport or badges for *watching* streams could be read as this. Rewards for *visiting places* in a game sit in a gray area.
- **You can't sell access to any part of the API services** without YouTube's written approval.

**On your question (a subscription for features, not streams):** that's the right instinct, and it's how most apps that embed YouTube make money: charge for your own product (game mode, passport, accounts, ambient mode) while the YouTube video stays free for everyone. The line you can't cross is "pay or you can't watch this video." So:

- ✅ Free: every stream, plus basic info.
- ✅ Paid: game mode, passport/collections, ambient/screensaver mode, custom playlists, notifications for sunrise or whale season.
- ⚠️ Gray: a paid tier that unlocks *more streams* when those streams are YouTube embeds. That's effectively charging to watch.
- ✅ Fine: a paid tier that unlocks streams you license directly (tourism boards, your own cameras), served from your own player, not YouTube.

**Two more things to know** (from memory of the policies, so verify): YouTube's rules say you shouldn't block or obscure the player, and the prototype puts a transparent shield over the video so people can't touch it. Cropping to fill the screen and hiding controls via `controls=0` are standard and widely used. The shield is the riskiest part, so keep it in mind before launch. Long term, partner-provided HLS streams in your own player avoid all of this: full control, no branding, and you can charge for them.

## 3. Domains

⚠️ **Couldn't check availability from here.** The registry lookups were blocked. Run these through a registrar search (Cloudflare Registrar, Porkbun, or Namecheap) yourself.

**The bigger issue is the name, not the domain.** [Peek.com](https://www.peek.com/about) is an SF-based company that [raised $80M](https://techcrunch.com/2021/11/23/peek-raises-80m-as-its-travel-experiences-software-and-marketplace-business-passes-2b-in-bookings/) and runs booking software for tours, attractions and museums. That's *the exact industry you want as partners* (tourism boards, attractions). Using "Peek" for a travel-adjacent product is a real trademark collision risk, not just a domain inconvenience. There's also already a [Peek Live app (peekapp.live)](https://www.peekapp.live/). Talk to a trademark attorney before you spend money on branding. A quick USPTO search (tmsearch.uspto.gov) for "PEEK" in class 39 (travel) and 41/42 (entertainment/software) is free and takes 10 minutes.

**Ways to keep the vibe:**

| Option | Why it works | Check first |
|---|---|---|
| peek.earth / peekearth.com | Keeps the word, adds the "anywhere on the planet" part | Trademark is still "Peek" + descriptor |
| takeapeek.live / takeapeek.world | It's literally your CTA | Fun, a bit long |
| peekhole.com / peekhole.live | Wormhole + peephole, own-able | Make sure it doesn't read as voyeur-y |
| windowpeek.com | Clear concept | WindowSwap is a neighbor |
| **Lookout** (lookout.live / golookout.com) | The binoculars-at-a-viewpoint feeling you described | Lookout is also a mobile security company, but in a different class |
| **Quarter** (quarter.live) | Nod to the 25¢ binoculars | Abstract |
| **Overlook** (overlook.live) | Scenic-viewpoint word | Check |

My pick: if trademark counsel says Peek is too close to peek.com, go with **Lookout**. It's the coin-operated-binoculars moment in one word, and "take a look out" works as the button.

Things to check for any domain: (1) availability and renewal price (.live and .earth renew at ~$25–30/yr, .com ~$10), (2) USPTO and the App Store for the bare word, (3) social handles.

## 4. Prototype: what's built

`public/peek/` is a static, no-build page (open `index.html` or serve the folder):

- **Landing:** a live, muted daylight stream as the background, the "peek" wordmark, and one "Take a peek" button.
- **Picking a view:** chooses only from views where the sun is up (or civil twilight, or within a camera's set hours), weights golden hour 3×, and avoids repeats. Sun position is calculated in the browser from lat/lng, so there's no API.
- **Wormhole:** a minimal canvas particle tunnel (≥1.9s). The next stream loads hidden underneath it. When the stream is actually playing, the destination irises open from the center.
- **No video control:** controls are off, keyboard is off, and a transparent shield sits over the player. The only control is a small sound toggle (flagged below).
- **Info panel:** a glass panel on the right on desktop, a bottom sheet on mobile. It shows live local time, live weather (Open-Meteo, free, no key), a sunset/sunrise countdown, coordinates, what you're looking at, what to watch for, the story, facts, and a stream credit with sources.
- **Reliability:** if a stream errors or doesn't start within 9s, it silently tries another, up to 4 times.
- **Keys:** Space = peek again, Esc = home.

Not built yet: accounts, game, passport, ambient mode, analytics, a stream health checker.
