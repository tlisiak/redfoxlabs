# Peek: prototype research

Researched 2026-10-05. The research environment couldn't reach YouTube or any domain registry, so **every stream ID and every domain below still needs a 5-minute live check in a browser** before it's shown to anyone.

## 1. The 10 prototype streams

The full "info list" for each one (what you're looking at, watch for, story, facts, sources) lives in [`public/peek/streams.js`](../../public/peek/streams.js). That file is both the research and the data the prototype runs on.

| # | View | Where | Source | Hours | Notes |
|---|------|-------|--------|-------|-------|
| 1 | Namib Desert Waterhole | Gondwana Namib Park, Namibia | [NamibiaCam](https://www.youtube.com/watch?v=ydYDqZQpim8) | 24/7 (infrared at night) | Solar powered, run by a lodge group. Ideal partner profile. |
| 2 | Mount Fuji over Lake Kawaguchiko | Fujikawaguchiko, Japan | [Panoramic Ropeway 4K](https://www.youtube.com/watch?v=Sv9hcJ3k5h4) | Daylight | 36 other Fuji streams indexed at [isfujivisible.com](https://isfujivisible.com/mt-fuji-live-cams) if this one drops. |
| 3 | Rialto Bridge, Grand Canal | Venice, Italy | [I Love You Venice](https://www.youtube.com/channel/UCMpn1qLudF-zb4M4bqxLIbw) (channel embed) | Daylight | Both Rialto video IDs found in research were already removed. The channel runs several Venice cams, so it may show a different one until we pin the current Rialto ID. |
| 4 | Jökulsárlón Glacier Lagoon | Iceland | [Live from Iceland](https://www.youtube.com/watch?v=WDHSEuMUb3w) | Daylight | Days get short fast in winter (~4–5h in December). |
| 5 | Kāʻanapali Beach & Black Rock | Maui, Hawaiʻi | [Maui Live Cam](https://www.youtube.com/channel/UCIQVWkOilfxoQSFcban_d-A) (channel embed) | Daylight | Whale season Nov–Apr. Uses channel embed, so it survives stream restarts. |
| 6 | Kelp Forest | Monterey Bay Aquarium | [MBA Kelp Cam](https://www.youtube.com/watch?v=w3LjpFhySTg) | 7am–7pm PT (assumed) | Hours not confirmed. Aquarium is a nonprofit with a big cam program. |
| 7 | Old Faithful | Yellowstone | [NPS stream](https://www.youtube.com/watch?v=VJSMy-H_GKE) | Daylight | Federal NPS footage. Worth asking NPS directly about reuse terms. |
| 8 | Lake Tahoe | Zephyr Cove, NV | [ABC7 Tahoe cam](https://www.youtube.com/live/Lk0Z5ExUWL0) | Daylight | Owned by a TV station, so it'll be the hardest to license. |
| 9 | San Francisco Bay | Treasure Island, SF | [Mersea Restaurant](https://www.youtube.com/watch?v=BSWhGNXxT9A) | Daylight | Restaurant cam. Easy, local first partner conversation. |
| 10 | The Matterhorn | Zermatt, Switzerland | [Glacier Paradise](https://www.youtube.com/watch?v=o9puACFGW0o) | Daylight | ⚠️ May be a recorded video, not a live stream. Verify. Swap for a Zermatt Bergbahnen live cam if so. |

### Batch 2 (added 2026-10-05)

The first stream check (no API key yet) found 4 of these 10 had links that ended long ago; search engines were still indexing them. Those 4 are paused, not deleted. Chosen for **who runs them** as much as the view: institutional and network operators (explore.org, USGS, EarthCam, aquariums) keep 24/7 streams up for years and embed them on their own sites, which shows embedding is allowed.

| # | View | Where | Operator | Hours | Notes |
|---|------|-------|----------|-------|-------|
| 11 | Tembe Elephant Park | South Africa | [Africam · explore.org](https://explore.org/livecams/africam/tembe-elephant-park) | Daylight | Main ID ended Apr 2026; backup + explore.org scout remain. |
| 12 | Table Mountain | Cape Town, South Africa | [Table Mountain Live Stream](https://www.youtube.com/@TableMountainLiveStream) | Daylight | Classic view across Table Bay from Bloubergstrand. |
| 13 | Sydney Harbour | Australia | [Sydney Live Camera](https://www.youtube.com/@sydneylivecamera) | Daylight | ⏸ Paused: both IDs ended Nov 2024. Returns when the check finds a current one. |
| 14 | Copacabana Beach | Rio, Brazil | [EarthCam](https://www.youtube.com/watch?v=2PJfQY9LUoU) | Daylight | ⏸ Paused: ID ended Jan 2024. |
| 15 | Cayman Reef | Grand Cayman | [explore.org · Teens4Oceans](https://explore.org/livecams/oceans/cayman-reef-cam) | Daylight | Real reef, solar powered: expect weather outages. |
| 16 | Tropical Reef | Long Beach, CA | [Aquarium of the Pacific](https://www.aquariumofpacific.org/exhibits/tropical_pacific_gallery/webcam_tropical_reef) | 8am–8pm PT (assumed) | Backup for when Cayman is down. |
| 17 | Victoria Harbour | Hong Kong | [Peak webcam](https://www.youtube.com/watch?v=bNOWG3jcOlQ) | 24h (night is the point) | No scout channel yet. |
| 18 | Kīlauea Summit | Hawaiʻi | [USGS HVO](https://www.usgs.gov/volcanoes/kilauea/summit-webcams) | 24h | Episodic: fountains only during episodes, steam otherwise. Card says so. |
| 19 | The Grand Tetons | Jackson Hole, Wyoming | [SeeJH](https://www.youtube.com/@Seejh) | Daylight | Research ID had ended; the check auto-found 3 live Wyoming-side cams, now in the catalog. |
| 20 | Horseshoe Falls | Niagara, Canada | [EarthCam](https://www.earthcam.com/canada/niagarafalls/thefalls/) | 24h | ⏸ Paused: one ID blocks embedding, the other ended Feb 2026. |

**Looked at and passed on:** Perito Moreno / Patagonia and Queenstown (no reliable YouTube live stream, mostly still-image cams), Geirangerfjord and Positano (live, but on CamStreamer/SkylineWebcams rather than YouTube; both are good licensing-partner prospects later).

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
- **Reliability:** each view lists backup video IDs and/or a channel embed. If a source errors, won't start within 7s, or turns out to be a recording instead of live, it falls through to the next, then to another view.
- **Stream checker:** `public/peek/check.html` loads every source side by side, says which work and why the others don't (removed, embedding disabled, recording), and has a "Copy report" button.
- **Keys:** Space = peek again, Esc = home.

**Quality bar every view must clear** (all 20, enforced in code, not by hand):
- **On target:** each view lists words its live title must contain (`expect`). The page refuses a source that plays something else, and the check flags it as `mismatch`. This stops a channel switching cams from putting the wrong place on screen.
- **HD or better:** the page refuses a source whose renditions top out below 720p; with the API key the check also flags standard-definition streams as `low-quality`.
- **Actually live:** recordings and ended streams are refused.
- **Embeddable:** owner-blocked embeds are flagged and skipped.
- **Backed up:** every view has a backup ID and/or a trusted channel (`scout`). With the API key the check finds on-target live videos on those channels and promotes them automatically when the catalog's IDs die.
- **Proven over time:** every run records each source as up or down (30-day rolling history in the Actions cache). The report shows uptime per source, flags catalog sources under 80% after 20+ checks as flaky, and marks auto-found streams with 14+ days above 95% as ready to add. Live streams on trusted channels that no view uses yet are listed for curation.
- **YouTube-compliant:** the player is an uncropped, unfiltered 16:9 window with nothing in front of it, only one player exists at a time, and it starts only once it's visible ([Required Minimum Functionality](https://developers.google.com/youtube/terms/required-minimum-functionality)).
- **Human-vetted:** none of the above can judge beauty. That's the "Vet the views" task, and it's still open.

**Automated validation** (`.github/workflows/peek-streams.yml` + `scripts/peek/validate-streams.mjs`): runs on every PR touching Peek and every 6 hours on main. It checks each source's live status and embeddability, lists what scout channels are streaming now, writes `public/peek/status.json` (which the page uses to try live sources first and skip dead ones), and fails only when a view has no source left that isn't confirmed dead. **YouTube serves GitHub's servers a bot check, so live status needs a free YouTube Data API key in the `YOUTUBE_API_KEY` repo secret.** Without it, the check can still catch removed, private and embedding-disabled videos, but everything else reads "unverified." Quota use is about 2,500 of the free 10,000 units a day (channel searches are the expensive part, at 100 units each).

Not built yet: accounts, game, passport, ambient mode, analytics, a stream health checker.
