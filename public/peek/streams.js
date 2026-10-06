// Peek prototype catalog. One entry per vetted live view.
//
// source: { videoIds: [...] } YouTube live videos to try in order, and/or { channelId } to
//         embed whatever that channel is currently broadcasting (survives stream restarts).
//         Open check.html to see which sources are working right now.
// scout:  optional channel IDs (UC…) or @handles the stream check searches for live videos,
//         so a dead source can be replaced by the channel's current stream. Never played directly.
// expect: { title: [...] } words the live video's title must contain (any one, accents and
//         case ignored). The page refuses a source that plays something else, and the stream
//         check flags it, so a channel switching cams can't put the wrong place on screen.
// paused: why a view is out of rotation (e.g. every known ID died). It returns on its own once
//         the stream check auto-finds an on-target live video on one of its scout channels.
// hours:  optional local-time window [start, end) when the camera is worth showing.
//         Without it, a view is eligible while the sun is up (or always, if night: true).
// verify: true marks streams whose live status couldn't be confirmed during research.
window.PEEK_STREAMS = [
  {
    id: "namib",
    name: "Namib Desert Waterhole",
    place: "Gondwana Namib Park",
    country: "Namibia",
    lat: -24.07,
    lng: 15.93,
    tz: "Africa/Windhoek",
    // iQOHVoyun2k (a third-party re-stream) ended Dec 2025 (API check, Oct 5 2026).
    source: { videoIds: ["ydYDqZQpim8"] },
    scout: ["UC9X6gGKDv2yhMoofoeS7-Gg"],
    night: true,
    expect: { title: ["Namib Desert"] },
    credit: { name: "NamibiaCam · Gondwana Collection", url: "https://gondwana-collection.com/namib-desert-live-stream" },
    headline: "A solar-powered waterhole on the edge of the oldest desert on Earth.",
    looking:
      "An artificial waterhole on an open gravel plain, about 8 km from Namib Desert Lodge. Behind it are the red dunes and fossilised sandstone of the Namib. Everything that lives out here eventually comes to drink.",
    watchFor: [
      "Gemsbok (oryx), with their long, dead-straight horns",
      "Springbok, ostrich and black-backed jackals around dusk",
      "After dark, the infrared camera picks up brown hyena, and now and then a leopard or cheetah",
    ],
    history:
      "This plain used to be farmland. Gondwana Collection turned it into a nature reserve and brought back game species that once lived here. The waterhole was built in 2006. The camera runs on solar power and beams its signal 35 km across the dunes to the nearest service provider.",
    facts: [
      "The Namib is widely considered the oldest desert in the world.",
      "The Namib Sand Sea has been a UNESCO World Heritage Site since 2013.",
      "Gemsbok can go a long time without drinking. Instead of sweating, they let their body temperature climb on hot days to save water.",
    ],
    sources: [
      { label: "Gondwana: Namib Desert live stream", url: "https://gondwana-collection.com/namib-desert-live-stream" },
      { label: "Gondwana: Waterhole FAQ", url: "https://gondwana-collection.com/waterhole-camera/faq-0" },
    ],
  },
  {
    id: "fuji",
    name: "Mount Fuji over Lake Kawaguchiko",
    place: "Mt. Fuji Panoramic Ropeway, Fujikawaguchiko",
    country: "Japan",
    lat: 35.5003,
    lng: 138.7686,
    tz: "Asia/Tokyo",
    // vhaZLwUwP9w and mbeid4wxX5s ended (Nov 2025, Oct 1 2026).
    source: { videoIds: ["Sv9hcJ3k5h4", "bdUbACCWmoY"] },
    expect: { title: ["Fuji", "富士"] },
    credit: { name: "Mt. Fuji Panoramic Ropeway", url: "https://www.youtube.com/watch?v=Sv9hcJ3k5h4" },
    headline: "Japan's sacred volcano, seen from a mountaintop above the Fuji Five Lakes.",
    looking:
      "Mount Fuji (3,776 m), Japan's highest mountain, seen from the top of the Panoramic Ropeway above Lake Kawaguchiko. The lake is one of the Fuji Five Lakes. The dark green carpet at the base of the mountain is Aokigahara forest.",
    watchFor: [
      "Fuji is shy. Clouds often hide it by midday, so mornings are your best shot",
      "Kasa-gumo, the lens-shaped 'hat' clouds that settle over the summit",
      "The first snowcap of the season, which usually shows up in early autumn",
    ],
    history:
      "Fuji is an active volcano. Its last eruption, the Hōei eruption of 1707–08, came 49 days after a huge earthquake and dropped ash on Edo (now Tokyo), about 100 km away. An earlier eruption in 864 sent lava flows that dammed rivers, formed several of the Five Lakes, and laid the ground Aokigahara forest grows on today.",
    facts: [
      "UNESCO listed Fuji in 2013 as a cultural site, not a natural one, because of its influence on Japanese art and religion.",
      "Hokusai's 'Thirty-six Views of Mount Fuji' (which includes The Great Wave) is the most famous example of that influence.",
    ],
    sources: [
      { label: "Wikipedia: Mount Fuji", url: "https://en.wikipedia.org/wiki/Mount_Fuji" },
      { label: "Wikipedia: Hōei eruption", url: "https://en.wikipedia.org/wiki/H%C5%8Dei_eruption" },
      { label: "nippon.com: Fuji's eruptions", url: "https://www.nippon.com/en/japan-data/h00420/mount-fuji%E2%80%99s-history-of-eruptions.html" },
    ],
  },
  {
    id: "venice",
    name: "Rialto Bridge, Grand Canal",
    place: "Venice, from Palazzo Bembo",
    country: "Italy",
    lat: 45.4379,
    lng: 12.3359,
    tz: "Europe/Rome",
    // nviU2HYj-Jc: listed live on the channel by the stream check, Oct 5 2026 (the IDs from
    // research, Kmf_wiTFuXY and K_Vg94nBiaY, had been removed). The channel embed is a last resort;
    // expect.title stops it from showing one of the channel's other Venice cams.
    source: { videoIds: ["nviU2HYj-Jc"], channelId: "UCMpn1qLudF-zb4M4bqxLIbw" },
    expect: { title: ["Rialto"] },
    credit: { name: "I Love You Venice", url: "https://www.youtube.com/channel/UCMpn1qLudF-zb4M4bqxLIbw" },
    headline: "Venice's main street, where the traffic is all boats.",
    looking:
      "The Rialto Bridge over the Grand Canal, seen from Palazzo Bembo. The canal is the city's main road. Vaporetti (water buses), delivery barges, water taxis and gondolas all share it.",
    watchFor: [
      "The morning rush of supply barges delivering to shops and restaurants",
      "Gondolas, traditionally all black",
      "The crowd on the bridge itself. Its arcades are lined with shops",
    ],
    history:
      "The Rialto has been Venice's commercial heart for centuries. Earlier wooden bridges here kept failing, with one collapsing under a crowd in 1444. The stone bridge you're looking at was finished in 1591 to a design by Antonio da Ponte, which beat out proposals attributed to Michelangelo and Palladio. It's the oldest of the bridges across the Grand Canal.",
    facts: [
      "Venice is built on 118 small islands in a lagoon, on foundations of wooden piles driven into the mud.",
      "The Grand Canal snakes about 3.8 km through the city in a reverse-S shape.",
    ],
    sources: [
      { label: "Wikipedia: Rialto Bridge", url: "https://en.wikipedia.org/wiki/Rialto_Bridge" },
      { label: "Treffpunkt Venedig: Venice webcams", url: "https://www.treffpunkt-venedig.de/en/venice-webcams/" },
    ],
  },
  {
    id: "jokulsarlon",
    name: "Jökulsárlón Glacier Lagoon",
    place: "Vatnajökull National Park",
    country: "Iceland",
    lat: 64.0484,
    lng: -16.1795,
    tz: "Atlantic/Reykjavik",
    // WDHSEuMUb3w ended in 2020 (API check, Oct 5 2026). Needs a new source and a scout channel.
    source: {},
    paused: "The only stream we had ended in 2020. Needs a new source.",
    expect: { title: ["Jokulsarlon", "Glacier Lagoon"] },
    credit: { name: "Live from Iceland", url: "https://www.youtube.com/watch?v=WDHSEuMUb3w" },
    headline: "Icebergs drifting from a glacier to the sea.",
    looking:
      "Iceland's glacier lagoon. Icebergs break off Breiðamerkurjökull, an outlet glacier of the huge Vatnajökull ice cap, drift across the lagoon, then squeeze through a short channel out to the Atlantic.",
    watchFor: [
      "Seals hauled out on the ice or popping up between bergs",
      "Bright blue icebergs. Old, dense glacier ice absorbs red light, so it glows blue",
      "An iceberg rolling over as it melts and its balance shifts",
    ],
    history:
      "This lagoon didn't exist a century ago. It started forming around 1934–35 as the glacier retreated. In 1975 it covered about 8 km². Today it's around 25 km² and still growing, and at 284 m it's the deepest lake in Iceland.",
    facts: [
      "Across the road is Diamond Beach, where chunks of ice wash up on black volcanic sand.",
      "The lagoon has appeared in two Bond films, A View to a Kill and Die Another Day.",
    ],
    sources: [
      { label: "Wikipedia: Jökulsárlón", url: "https://en.wikipedia.org/wiki/J%C3%B6kuls%C3%A1rl%C3%B3n" },
      { label: "Guide to Iceland: Jökulsárlón", url: "https://guidetoiceland.is/travel-iceland/drive/jokulsarlon" },
    ],
  },
  {
    id: "kaanapali",
    name: "Kāʻanapali Beach & Black Rock",
    place: "West Maui, Hawaiʻi",
    country: "United States",
    lat: 20.9262,
    lng: -156.6955,
    tz: "Pacific/Honolulu",
    // The channel's only live stream (RLv4FlYmrM4) blocks embedding (API check, Oct 5 2026).
    source: {},
    scout: ["UCIQVWkOilfxoQSFcban_d-A"],
    paused: "The owner blocks embedding on this channel's stream. Needs another Kāʻanapali source.",
    expect: { title: ["Kaanapali", "Black Rock", "Maui"] },
    credit: { name: "Maui Live Cam", url: "https://www.youtube.com/channel/UCIQVWkOilfxoQSFcban_d-A" },
    headline: "A sacred lava point on one of the best beaches in America.",
    looking:
      "Kāʻanapali Beach on Maui's west shore, with Puʻu Kekaʻa (Black Rock), an old lava formation, jutting into the sea. Across the channel are the islands of Lānaʻi and Molokaʻi.",
    watchFor: [
      "Humpback whales breaching, November through April",
      "The cliff dive off Black Rock every evening at sunset",
      "Snorkelers around the rock, one of Maui's best reef spots",
    ],
    history:
      "In Hawaiian tradition, Puʻu Kekaʻa is a leina a ka ʻuhane, a 'leap of the soul', where the spirits of the dead jump into the afterlife. Kahekili, the last ruling chief of Maui, famously leapt from it in lele kawa, a feet-first, splashless dive, to show his courage. The nightly sunset dive has honored him since 1963.",
    facts: [
      "Humpbacks swim thousands of miles from Alaska every winter to breed and calve in the warm, shallow water between these islands.",
    ],
    sources: [
      { label: "To-Hawaii: Puʻu Kekaʻa", url: "https://www.to-hawaii.com/maui/ancientsites/puukekaa.php" },
      { label: "Sheraton Maui: cliff dive ceremony", url: "https://www.marriott.com/en-us/hotels/hnmsi-sheraton-maui-resort-and-spa/experiences/" },
    ],
  },
  {
    id: "kelp",
    name: "Kelp Forest",
    place: "Monterey Bay Aquarium, Cannery Row",
    country: "United States",
    lat: 36.6183,
    lng: -121.9018,
    tz: "America/Los_Angeles",
    source: { videoId: "w3LjpFhySTg" },
    scout: ["UCnM5iMGiKsZg-iOlIO2ZkdQ"],
    hours: [7, 19],
    expect: { title: ["Kelp"] },
    credit: { name: "Monterey Bay Aquarium", url: "https://www.montereybayaquarium.org/animals/live-cams" },
    headline: "A diver's-eye view of a swaying underwater forest.",
    looking:
      "Inside the Kelp Forest exhibit, a 28-foot-tall, 335,000-gallon tank that recreates the ecosystem just outside the aquarium walls in Monterey Bay.",
    watchFor: [
      "Leopard sharks gliding along the bottom",
      "Silver schools of sardines turning all at once",
      "Divers during feeding time",
    ],
    history:
      "When the aquarium opened in October 1984, this was the first living kelp forest ever shown in an aquarium. The building sits on Cannery Row, in a former sardine cannery from the era John Steinbeck wrote about.",
    facts: [
      "Giant kelp can grow up to eight inches a day in the wild, and more than four inches a day in this exhibit.",
    ],
    sources: [
      { label: "Monterey Bay Aquarium: Kelp Forest", url: "https://www.montereybayaquarium.org/visit/exhibits/kelp-forest" },
      { label: "Monterey Bay Aquarium: Facts & figures", url: "https://newsroom.montereybayaquarium.org/press/facts-figures" },
    ],
  },
  {
    id: "oldfaithful",
    name: "Old Faithful",
    place: "Upper Geyser Basin, Yellowstone",
    country: "United States",
    lat: 44.4605,
    lng: -110.8281,
    tz: "America/Denver",
    // VJSMy-H_GKE was an unofficial re-stream and ended Mar 2026. Needs the official NPS feed.
    source: {},
    paused: "The stream we had was an unofficial re-stream and has ended. Needs the official NPS feed.",
    expect: { title: ["Old Faithful", "Upper Geyser"] },
    scout: ["@usgs"],
    credit: { name: "National Park Service", url: "https://www.nps.gov/yell/learn/photosmultimedia/webcams.htm" },
    headline: "The world's most famous geyser, in the world's first national park.",
    looking:
      "Old Faithful in Yellowstone's Upper Geyser Basin, home to the largest concentration of geysers on the planet.",
    watchFor: [
      "A crowd gathering on the boardwalk usually means an eruption is close",
      "Small 'preplay' splashes just before the main eruption",
      "Bison wandering through the basin like they own it (they do)",
    ],
    history:
      "Rangers predict each eruption from the length of the previous one, and about 90% of predictions land within ±10 minutes. The median gap between eruptions is about 102 minutes. Yellowstone became the world's first national park in 1872.",
    facts: [
      "Eruptions reach 106 to over 180 feet, averaging about 130.",
      "Each eruption lasts 1.5 to 5 minutes and throws out 3,700 to 8,400 gallons of water.",
    ],
    sources: [
      { label: "NPS: Exploring Old Faithful", url: "https://www.nps.gov/yell/planyourvisit/exploreoldfaithful.htm" },
      { label: "Wikipedia: Old Faithful", url: "https://en.wikipedia.org/wiki/Old_Faithful" },
    ],
  },
  {
    id: "tahoe",
    name: "Lake Tahoe from Zephyr Cove",
    place: "Zephyr Cove, Nevada",
    country: "United States",
    lat: 39.006,
    lng: -119.949,
    tz: "America/Los_Angeles",
    source: { videoId: "Lk0Z5ExUWL0" },
    expect: { title: ["Tahoe"] },
    credit: { name: "ABC7 News Bay Area", url: "https://abc7news.com" },
    headline: "The largest alpine lake in North America, and one of the clearest.",
    looking:
      "Lake Tahoe from Zephyr Cove on the Nevada shore, looking west across the water to the Sierra Nevada.",
    watchFor: [
      "The color shift from turquoise shallows to deep cobalt farther out",
      "Afternoon wind kicking up whitecaps",
      "The MS Dixie II paddlewheeler, which sails out of Zephyr Cove",
    ],
    history:
      "This basin has been the homeland of the Washoe people for thousands of years. Tahoe is famous for its clarity: in the late 1960s you could see a white disk 97.4 feet down. Development and runoff clouded the water, and in 2025 the annual average was 69.2 feet.",
    facts: [
      "At 1,645 feet at its deepest, Tahoe is one of the deepest lakes in the United States.",
    ],
    sources: [
      { label: "UC Davis: Tahoe clarity report", url: "https://www.ucdavis.edu/climate/news/lake-tahoe-clarity-report-trend-stable-not-improving" },
      { label: "EPA: About Lake Tahoe", url: "https://www.epa.gov/lake-tahoe/about" },
    ],
  },
  {
    id: "sfbay",
    name: "San Francisco Bay",
    place: "Treasure Island, San Francisco",
    country: "United States",
    lat: 37.8234,
    lng: -122.3707,
    tz: "America/Los_Angeles",
    source: { videoId: "BSWhGNXxT9A" },
    expect: { title: ["San Francisco", "Golden Gate", "Bay"] },
    credit: { name: "Mersea Restaurant", url: "https://www.youtube.com/watch?v=BSWhGNXxT9A" },
    headline: "The city, the bridge and the fog, from an island built for a world's fair.",
    looking:
      "San Francisco Bay from Treasure Island: the city skyline across the water, the Golden Gate Bridge out toward the Pacific, and the Marin Headlands beyond.",
    watchFor: [
      "Fog pouring in through the Golden Gate on summer afternoons",
      "Container ships heading to and from the Port of Oakland",
      "Sunset lining up right behind the bridge",
    ],
    history:
      "Treasure Island is man-made. The Army Corps of Engineers built it in 1936–37 from about 19 million cubic yards of bay sand, for the 1939–40 Golden Gate International Exposition, which celebrated the brand-new Bay Bridge and Golden Gate Bridge. The fair drew 17 million visitors.",
    facts: [
      "The island covers 385 acres, all of it dredged from the bay floor next to Yerba Buena Island.",
    ],
    sources: [
      { label: "Wikipedia: Treasure Island", url: "https://en.wikipedia.org/wiki/Treasure_Island,_San_Francisco" },
      { label: "Wikipedia: Golden Gate International Exposition", url: "https://en.wikipedia.org/wiki/Golden_Gate_International_Exposition" },
    ],
  },
  {
    id: "matterhorn",
    name: "The Matterhorn",
    place: "Matterhorn Glacier Paradise, Zermatt",
    country: "Switzerland",
    lat: 45.9387,
    lng: 7.7296,
    tz: "Europe/Zurich",
    // o9puACFGW0o is a recording, not a livestream (API check, Oct 5 2026).
    source: {},
    paused: "The video we had is a recording, not a live stream. Needs a live Zermatt source.",
    expect: { title: ["Matterhorn", "Zermatt"] },
    credit: { name: "Zermatt Bergbahnen", url: "https://www.youtube.com/watch?v=o9puACFGW0o" },
    headline: "The most recognizable mountain on Earth, from 3,883 m up.",
    looking:
      "The Matterhorn (4,478 m) seen from Matterhorn Glacier Paradise on the Klein Matterhorn, one of the highest cable-car stations in Europe. The peak sits right on the border between Switzerland and Italy, where it's called Monte Cervino.",
    watchFor: [
      "Alpenglow, when the peak turns pink at sunrise and sunset",
      "A banner cloud streaming off the summit like a flag",
    ],
    history:
      "On 14 July 1865, Edward Whymper's party of seven became the first to reach the summit. On the way down, Douglas Hadow slipped and pulled three others with him, and all four fell about 1,400 m to the glacier below. The tragedy made the Matterhorn famous overnight.",
    facts: [
      "Its pyramid shape was carved by glaciers eroding the mountain from several sides at once.",
    ],
    sources: [
      { label: "Wikipedia: Matterhorn", url: "https://en.wikipedia.org/wiki/Matterhorn" },
      { label: "Wikipedia: First ascent of the Matterhorn", url: "https://en.wikipedia.org/wiki/First_ascent_of_the_Matterhorn" },
    ],
  },
  {
    id: "tembe",
    name: "Tembe Elephant Park",
    place: "Tau Waterhole, Maputaland",
    country: "South Africa",
    lat: -26.95,
    lng: 32.42,
    tz: "Africa/Johannesburg",
    // VUJbDTIYlM4 ended 2026-04-08 (stream check, Oct 5).
    source: { videoIds: ["0P_LBKqVbfs"] },
    scout: ["UC-2KSeUU5SMCX6XLRD-AEvw"],
    expect: { title: ["Tembe"] },
    credit: { name: "Africam · explore.org", url: "https://explore.org/livecams/africam/tembe-elephant-park" },
    headline: "A waterhole where some of Africa's biggest elephants come to drink.",
    looking:
      "Tau Waterhole, seen from the hide in Tembe Elephant Park, a 300 km² reserve on South Africa's border with Mozambique. The dense sand forest around it hides everything until it walks into the open.",
    watchFor: [
      "Elephant herds, and the park's famously large-tusked bulls",
      "Giraffe, zebra and nyala coming in to drink",
      "Lions or a cheetah, if you're lucky",
    ],
    history:
      "Tembe was proclaimed in 1983 as a partnership between KwaZulu-Natal's conservation authority and the Tembe Tribal Authority, one of South Africa's earliest community-run reserves. Its elephants once roamed freely into Mozambique. During the Mozambican Civil War, the ones that escaped poaching found refuge here and stayed.",
    facts: [
      "It protects the last free-ranging elephants of KwaZulu-Natal.",
      "The park holds the Big Five and more than 340 bird species.",
    ],
    sources: [
      { label: "Wikipedia: Tembe Elephant Park", url: "https://en.wikipedia.org/wiki/Tembe_Elephant_Park" },
      { label: "explore.org: Tembe cam", url: "https://explore.org/livecams/africam/tembe-elephant-park" },
    ],
  },
  {
    id: "tablemountain",
    name: "Table Mountain",
    place: "Seen across Table Bay from Bloubergstrand",
    country: "South Africa",
    lat: -33.8,
    lng: 18.46,
    tz: "Africa/Johannesburg",
    source: { videoIds: ["vOLCjL4kv-w", "jOqASqt3vVI"] },
    scout: ["@TableMountainLiveStream"],
    expect: { title: ["Table Mountain"] },
    credit: { name: "Table Mountain Live Stream", url: "https://www.youtube.com/@TableMountainLiveStream" },
    headline: "Cape Town's flat-topped mountain, across the water.",
    looking:
      "The classic postcard view: Table Mountain rising behind Cape Town, seen across Table Bay from the beach at Bloubergstrand. Its highest point, Maclear's Beacon, is 1,086 m.",
    watchFor: [
      "The 'tablecloth', a sheet of cloud that pours over the top when the south-easter blows",
      "Kitesurfers on the bay on windy afternoons",
      "Ships heading in and out of Cape Town harbour",
    ],
    history:
      "In the 1750s, the French astronomer Nicolas-Louis de Lacaille mapped the southern sky from an observatory below this mountain. He named a constellation after it, Mensa (originally Mons Mensae, 'Table Mountain'), the only constellation named after a feature on Earth.",
    facts: [
      "Table Mountain was named one of the New7Wonders of Nature in 2011.",
      "Sailors read the tablecloth cloud as a weather sign.",
    ],
    sources: [
      { label: "Wikipedia: Mensa (constellation)", url: "https://en.wikipedia.org/wiki/Mensa_(constellation)" },
      { label: "Brand South Africa: New7Wonders", url: "https://brandsouthafrica.com/105040/travel/table-mountain-one-of-the-new-seven-wonders/" },
    ],
  },
  {
    id: "sydney",
    name: "Sydney Harbour",
    place: "Harbour Bridge & Opera House",
    country: "Australia",
    lat: -33.852,
    lng: 151.211,
    tz: "Australia/Sydney",
    // Old IDs fwhOL-pDaG8 and hhdI4mN6ueM ended Nov 2024. 5uZa3-RMFos is WebcamSydney 1, a fixed
    // cam (WebcamSydney 2 pans), confirmed live and HD by the Data API on Oct 6 2026.
    source: { videoIds: ["5uZa3-RMFos"] },
    scout: ["@webcamsydney", "@sydneylivecamera"],
    expect: { title: ["Sydney"] },
    credit: { name: "WebcamSydney", url: "https://webcamsydney.com/" },
    headline: "The bridge, the sails and the busiest harbour in the South Pacific.",
    looking:
      "A fixed camera looking across Sydney Harbour at the Opera House, Circular Quay, The Rocks and the Harbour Bridge. It has been streaming the harbour around the clock since 2015.",
    watchFor: [
      "Ferries crossing to Manly and Circular Quay",
      "Climbers walking the arch of the bridge",
      "Cruise ships docking at the Overseas Passenger Terminal",
    ],
    history:
      "The Harbour Bridge opened in 1932. The Opera House, designed by the Danish architect Jørn Utzon, opened in 1973 after years of delays and cost overruns. In 2007 UNESCO listed it as a World Heritage Site, one of the youngest buildings ever added.",
    facts: [
      "The Opera House's roof is a series of sail-shaped shells, one of the most photographed rooflines in the world.",
    ],
    sources: [
      { label: "UNESCO: Sydney Opera House", url: "https://whc.unesco.org/en/list/166/" },
      { label: "Wikipedia: Sydney Opera House", url: "https://en.wikipedia.org/wiki/Sydney_Opera_House" },
    ],
  },
  {
    id: "copacabana",
    name: "Copacabana Beach",
    place: "Rio de Janeiro",
    country: "Brazil",
    lat: -22.971,
    lng: -43.182,
    tz: "America/Sao_Paulo",
    // 2PJfQY9LUoU ended Jan 2024.
    source: {},
    paused: "No current stream ID yet. Comes back when the stream check finds one on the channel.",
    scout: ["UC6qrG3W8SMK0jior2olka3g"],
    expect: { title: ["Copacabana"] },
    credit: { name: "EarthCam", url: "https://www.earthcam.com" },
    headline: "Four kilometres of the most famous beach in the world.",
    looking:
      "Copacabana Beach in Rio de Janeiro: a 4 km curve of sand, the Atlantic, and the black-and-white promenade along Avenida Atlântica.",
    watchFor: [
      "Beach football and footvolley games",
      "Surfers when the swell comes in",
      "The wave pattern in the promenade's stone mosaic",
    ],
    history:
      "The promenade has used a black-and-white Portuguese stone pavement since the 1930s. In 1970 the landscape architect Roberto Burle Marx redesigned it, giving it the giant geometric wave that echoes the ocean beside it. Every New Year's Eve, millions of people fill the beach.",
    facts: [
      "The mosaic alternates black basalt and white limestone, laid by hand.",
    ],
    sources: [
      { label: "Wikipedia: Copacabana", url: "https://en.wikipedia.org/wiki/Copacabana,_Rio_de_Janeiro" },
      { label: "NEH: Making the promenade modern", url: "https://www.neh.gov/article/making-promenade-modern-0" },
    ],
  },
  {
    id: "caymanreef",
    name: "Cayman Reef",
    place: "East End, Grand Cayman",
    country: "Cayman Islands",
    lat: 19.3,
    lng: -81.1,
    tz: "America/Cayman",
    // ZpnyPXloF2U is a recording, not a livestream (API check, Oct 5 2026). Watching explore.org for the live cam.
    source: {},
    paused: "The video we had is a recording. Comes back if explore.org puts the live reef cam back up.",
    scout: ["UC-2KSeUU5SMCX6XLRD-AEvw"],
    expect: { title: ["Cayman"] },
    credit: { name: "explore.org · Teens4Oceans", url: "https://explore.org/livecams/oceans/cayman-reef-cam" },
    headline: "A live seat at a fish 'car wash' on a Caribbean reef.",
    looking:
      "A solar-powered camera on a lagoon reef off Grand Cayman's East End, pointed at a boulder star coral. It's a cleaning station: bigger fish line up here so cleaner wrasse and shrimp can pick parasites off them.",
    watchFor: [
      "Blue tangs and porcupinefish waiting their turn",
      "Spotted eagle rays and southern stingrays gliding past",
      "The occasional nurse shark or Caribbean reef shark",
    ],
    history:
      "The camera is a partnership between explore.org and Teens4Oceans, a student ocean-science program. Because it runs on solar power out on the reef, it can drop out in long stretches of bad weather.",
    facts: [
      "Cleaning stations are a truce zone: predators hold still and let small cleaners swim right into their mouths.",
    ],
    sources: [
      { label: "explore.org: Cayman Reef Cam", url: "https://explore.org/livecams/oceans/cayman-reef-cam" },
    ],
  },
  {
    id: "pacificreef",
    name: "Tropical Reef",
    place: "Aquarium of the Pacific, Long Beach",
    country: "United States",
    lat: 33.762,
    lng: -118.197,
    tz: "America/Los_Angeles",
    source: { videoIds: ["DHUnz4dyb54"] },
    scout: ["UC-2KSeUU5SMCX6XLRD-AEvw"],
    expect: { title: ["Tropical Reef"] },
    hours: [8, 20],
    credit: { name: "Aquarium of the Pacific · explore.org", url: "https://www.aquariumofpacific.org/exhibits/tropical_pacific_gallery/webcam_tropical_reef" },
    headline: "Palau's Blue Corner, rebuilt in Long Beach.",
    looking:
      "The Tropical Reef Habitat, the Aquarium of the Pacific's largest exhibit: 350,000 gallons and more than 1,000 animals, modeled on the Blue Corner off Palau.",
    watchFor: [
      "The zebra shark resting on the sand",
      "Cleaner wrasse working on much bigger fish",
      "Divers during feeding presentations",
    ],
    history:
      "The real Blue Corner is a reef wall in Palau, in the western Pacific, where strong currents bring in huge schools of fish and sharks. Divers rank it among the best dive sites in the world.",
    facts: [
      "The animals range from tiny cleaner wrasse to the zebra shark.",
    ],
    sources: [
      { label: "Aquarium of the Pacific: Tropical Reef cam", url: "https://www.aquariumofpacific.org/exhibits/tropical_pacific_gallery/webcam_tropical_reef" },
    ],
  },
  {
    id: "hongkong",
    name: "Victoria Harbour from The Peak",
    place: "Victoria Peak, Hong Kong Island",
    country: "Hong Kong",
    lat: 22.271,
    lng: 114.15,
    tz: "Asia/Hong_Kong",
    // bNOWG3jcOlQ ended May 2025 (API check, Oct 5 2026).
    source: {},
    paused: "The stream we had ended in May 2025. Needs a new source.",
    expect: { title: ["Hong Kong", "Peak"] },
    night: true,
    credit: { name: "Hong Kong Peak Webcam", url: "https://www.youtube.com/watch?v=bNOWG3jcOlQ" },
    headline: "One of the densest skylines on Earth, from the top.",
    looking:
      "Looking down from Victoria Peak (552 m) over the towers of Central and Wan Chai, across Victoria Harbour to the Kowloon peninsula.",
    watchFor: [
      "Star Ferries and container ships crossing the harbour",
      "The Symphony of Lights at 8pm local time, when the towers light up together",
      "Fog swallowing the skyline from the top down",
    ],
    history:
      "The Peak Tram has been hauling people up here since 1888, the first funicular railway in Asia. The Peak was once a cool retreat for the colony's wealthy, and you needed permission to live up here.",
    facts: [
      "This is one of the few views on Peek that's just as good at night, so it stays in rotation after dark.",
    ],
    sources: [
      { label: "Wikipedia: Peak Tram", url: "https://en.wikipedia.org/wiki/Peak_Tram" },
      { label: "Lonely Planet: Victoria Peak", url: "https://www.lonelyplanet.com/points-of-interest/victoria-peak/1245445" },
    ],
  },
  {
    id: "kilauea",
    name: "Kīlauea Summit",
    place: "Halemaʻumaʻu Crater, Hawaiʻi Volcanoes National Park",
    country: "United States",
    lat: 19.405,
    lng: -155.281,
    tz: "Pacific/Honolulu",
    source: { videoIds: ["HggWKlZv9yk", "f9-oSpYpubg", "gXKuUyKt8mc"] },
    scout: ["@usgs"],
    expect: { title: ["Kilauea", "Halemaumau"] },
    night: true,
    credit: { name: "USGS Hawaiian Volcano Observatory", url: "https://www.usgs.gov/volcanoes/kilauea/summit-webcams" },
    headline: "An active volcano, live from the rim.",
    looking:
      "USGS monitoring cameras on Halemaʻumaʻu, the summit crater of Kīlauea, one of the most active volcanoes on Earth. The current eruption began on December 23, 2024 and comes in episodes.",
    watchFor: [
      "During an episode, lava fountains hundreds of feet high, glowing brightest at night",
      "Between episodes, a steaming crater floor and the occasional overflow",
      "Rain and cloud rolling over the rim and hiding everything",
    ],
    history:
      "Since December 2024 the summit has erupted in short episodes of lava fountaining, more than 50 so far. During episode 54 on August 25, 2026, the north vent fountain reached about 500 feet. In Hawaiian tradition, Halemaʻumaʻu is the home of Pele, goddess of volcanoes.",
    facts: [
      "Fountains in some episodes have topped 1,500 feet, with plumes above 20,000 feet.",
      "These are scientific cameras, so expect clouds, rain and the odd outage.",
    ],
    sources: [
      { label: "USGS: Kīlauea summit webcams", url: "https://www.usgs.gov/volcanoes/kilauea/summit-webcams" },
      { label: "USGS: Episode 54, Aug 25 2026", url: "https://www.usgs.gov/media/images/august-25-2026-episode-54-lava-fountain-and-plume-summit-kilauea" },
    ],
  },
  {
    id: "tetons",
    name: "The Grand Tetons",
    place: "Jackson Hole, Wyoming",
    country: "United States",
    lat: 43.49,
    lng: -110.76,
    tz: "America/Denver",
    // Found live on SeeJH by the stream check, Oct 5 2026 (the Teton Valley ID from research ended
    // Aug 2025): East Gros Ventre Butte PTZ, Buffalo Valley, Dornan's.
    source: { videoIds: ["j-0fhrHzEiM", "Jqo7Z9QiOEQ", "o4fKtgPVpoU"] },
    scout: ["@Seejh"],
    expect: { title: ["Teton"] },
    credit: { name: "SeeJH", url: "https://www.youtube.com/@Seejh" },
    headline: "The youngest mountains in the Rockies, rising straight out of the valley.",
    looking:
      "The Teton Range from the valley of Jackson Hole, where the mountains jump almost 7,000 feet above the valley floor with no foothills in between. The tallest peak, the Grand Teton, is 13,775 feet. Some of these cameras pan across the range.",
    watchFor: [
      "Alpenglow on the peaks at sunrise and sunset",
      "Storms building over the range on summer afternoons",
      "Snow line creeping down the slopes in autumn",
    ],
    history:
      "French-Canadian fur trappers, working this west side as early as 1819, named the three peaks 'Les Trois Tétons'. The range is young: movement on the Teton fault began lifting it less than 9 million years ago, and the fault is still active.",
    facts: [
      "The USGS calls the Tetons the youngest range in the Rockies.",
    ],
    sources: [
      { label: "Wikipedia: Teton Range", url: "https://en.wikipedia.org/wiki/Teton_Range" },
      { label: "Visit Jackson Hole: mountain names", url: "https://visitjacksonhole.com/where-did-the-mountains-around-jackson-hole-get-their-names" },
    ],
  },
  {
    id: "niagara",
    name: "Horseshoe Falls",
    place: "Niagara Falls, Ontario",
    country: "Canada",
    lat: 43.078,
    lng: -79.075,
    tz: "America/Toronto",
    // qx7gry390YA: EarthCam's current Niagara stream, auto-found by the API check Oct 5 2026
    // (UAB9wLwku3g blocks embedding; gIv9J38Dax8 ended Feb 2026).
    source: { videoIds: ["qx7gry390YA"] },
    scout: ["UC6qrG3W8SMK0jior2olka3g"],
    expect: { title: ["Niagara"] },
    night: true,
    credit: { name: "EarthCam", url: "https://www.earthcam.com/canada/niagarafalls/thefalls/" },
    headline: "About 2,400 cubic metres of water a second, falling 51 metres.",
    looking:
      "Horseshoe Falls, the largest of Niagara's three falls, seen from above on the Canadian side. It's 51 m high and 820 m wide.",
    watchFor: [
      "Tour boats pushing into the mist at the base",
      "Rainbows in the spray on sunny afternoons",
      "The nightly illumination, which turns the falls different colors",
    ],
    history:
      "On her 63rd birthday, October 24, 1901, the schoolteacher Annie Edson Taylor became the first person to survive going over the falls, in an oak-and-iron barrel padded with a mattress. The falls have been lit at night since 1860.",
    facts: [
      "At night and in winter, half the water is diverted to hydroelectric plants, so the falls you see after dark are literally thinner.",
    ],
    sources: [
      { label: "Wikipedia: Horseshoe Falls", url: "https://en.wikipedia.org/wiki/Horseshoe_Falls" },
      { label: "Wikipedia: Annie Edson Taylor", url: "https://en.wikipedia.org/wiki/Annie_Edson_Taylor" },
    ],
  },
  {
    id: "brooksfalls",
    name: "Brooks Falls",
    place: "Katmai National Park, Alaska",
    country: "United States",
    lat: 58.555,
    lng: -155.778,
    tz: "America/Anchorage",
    // Found live on explore.org by the API check, Oct 5 2026. Seasonal: the bears (and usually
    // the cams) leave in the fall, and the check will flag it when the stream ends.
    source: { videoIds: ["J7ZrIDvqlic"] },
    scout: ["UC-2KSeUU5SMCX6XLRD-AEvw"],
    expect: { title: ["Brooks Falls"] },
    credit: { name: "explore.org", url: "https://explore.org/livecams/brown-bears/brown-bear-salmon-cam-brooks-falls" },
    headline: "Brown bears fishing for salmon at the most famous little waterfall in Alaska.",
    looking:
      "Brooks Falls in Katmai National Park, where brown bears line up at a short waterfall on the Brooks River and wait for sockeye salmon to jump.",
    watchFor: [
      "Bears standing at the lip of the falls, catching salmon mid-jump",
      "Mothers with cubs keeping their distance from the big males",
      "In the fall, bears at their heaviest before hibernation",
    ],
    history:
      "explore.org set up the Katmai bear cams in 2012. Every fall, viewers vote in Fat Bear Week for the bear that put on the most weight before winter. In 2026, more than 2.5 million votes were cast.",
    facts: [
      "Between June 22 and August 4, 2026, this cam drew 7.3 million views, up 70% from the same stretch in 2025.",
    ],
    sources: [
      { label: "explore.org: Fat Bear Week 2026", url: "https://www.morningstar.com/news/pr-newswire/20260922la53605/fat-bear-week-2026-brings-the-world-together-to-celebrate-wildlife-and-conservation" },
      { label: "NPS: Brooks Falls Bearcam", url: "https://www.nps.gov/katm/learn/photosmultimedia/brown-bear-salmon-cam-brooks-falls.htm" },
    ],
  },
  {
    id: "etosha",
    name: "Okaukuejo Waterhole",
    place: "Okaukuejo, Etosha National Park",
    country: "Namibia",
    lat: -19.18,
    lng: 15.93,
    tz: "Africa/Windhoek",
    // Added Oct 6 2026; both confirmed live and HD by the Data API that day.
    source: { videoIds: ["AeMUdOPFcXI", "JMMoRwYo5kE"] },
    scout: ["UC9X6gGKDv2yhMoofoeS7-Gg", "UCfn4vrrgKXCCg3rxxLRGOvg"],
    night: true,
    expect: { title: ["Okaukuejo"] },
    credit: { name: "NamibiaCam · Gondwana Collection, and Namibia Wildlife Resorts", url: "https://gondwana-collection.com/okaukuejo-live-stream" },
    headline: "A floodlit waterhole where black rhino come to drink after dark.",
    looking:
      "The permanent waterhole at Okaukuejo, the first rest camp in Etosha and the park's administrative hub, 17 km from the southern gate. It's lit by floodlights at night, so the show carries on after sunset.",
    watchFor: [
      "Black rhino, which show up here remarkably often, mostly after dark",
      "Family groups of elephant, plus giraffe, zebra and springbok",
      "Lions coming in to drink alongside everything else",
    ],
    history:
      "Okaukuejo started as a German military post in 1897, set up to help stop the rinderpest cattle plague. A fort followed in 1901, and the round tower in camp recalls it, though the current tower dates from 1963. In 1907 the governor of German South West Africa proclaimed the game reserve that became Etosha National Park.",
    facts: [
      "Etosha covers 22,270 km². The salt pan at its heart is about 120 km long and covers almost a quarter of the park.",
      "'Etosha' means 'Great White Place' in Oshindonga, after the pan.",
      "The Etosha Ecological Institute, the park's research centre, was founded at Okaukuejo in 1974.",
    ],
    sources: [
      { label: "Wikipedia: Etosha National Park", url: "https://en.wikipedia.org/wiki/Etosha_National_Park" },
      { label: "Wikipedia: Okaukuejo", url: "https://en.wikipedia.org/wiki/Okaukuejo" },
      { label: "NWR: Okaukuejo waterhole live stream", url: "https://www.nwr.com.na/okaukuejo-waterhole-live-streaming-now-available-on-dstv/" },
    ],
  },
  {
    id: "maramara",
    name: "Mara River Crossings",
    place: "Mara Triangle, Maasai Mara",
    country: "Kenya",
    lat: -1.43,
    lng: 35.04,
    tz: "Africa/Nairobi",
    // Added Oct 6 2026; all three confirmed live and HD by the Data API that day.
    source: { videoIds: ["-7GOA9KIWcs", "BaEFc79IMCA", "Io1Kle7QR-E"] },
    scout: ["UC-2KSeUU5SMCX6XLRD-AEvw"],
    expect: { title: ["Mara"] },
    credit: { name: "Africam · explore.org · Mara Conservancy", url: "https://explore.org/livecams/africam/mara-main-crossing" },
    headline: "The river the Great Migration has to get across.",
    looking:
      "The Mara River in the Mara Triangle, the western part of the Maasai Mara. The cameras watch two well-known crossing points, Main Crossing and Fig Tree Crossing. Most of the year it's a quiet river full of crocodiles. From roughly July to October, the wildebeest arrive.",
    watchFor: [
      "Herds bunching up on the bank, sometimes for hours, before the first animal jumps",
      "Nile crocodiles patrolling the water or lying still along the banks",
      "Zebra crossing with the wildebeest, and hippos that were here all along",
    ],
    history:
      "By the late 1990s the Mara Triangle was in bad shape, with broken roads, missing gate revenue and widespread poaching. In 2001 a not-for-profit, the Mara Conservancy, took over running it in partnership with the local council. These cameras went up in May 2026, a joint project of the Conservancy and explore.org.",
    facts: [
      "The Mara River rises on the Mau Escarpment and flows about 395 km to Lake Victoria, crossing from Kenya into Tanzania.",
      "Over 1.2 million wildebeest move between the Serengeti and the Mara each year, along with hundreds of thousands of zebra.",
      "The Mara Triangle covers about 510 km².",
    ],
    sources: [
      { label: "explore.org: Mara Main Crossing cam", url: "https://explore.org/livecams/africam/mara-main-crossing" },
      { label: "Mara Triangle: Our history", url: "https://www.maratriangle.org/history" },
      { label: "Wikipedia: Mara River", url: "https://en.wikipedia.org/wiki/Mara_River" },
    ],
  },
  {
    id: "mpala",
    name: "Mpala Waterhole & Hippo River",
    place: "Mpala Research Centre, Laikipia",
    country: "Kenya",
    lat: 0.29,
    lng: 36.9,
    tz: "Africa/Nairobi",
    // Added Oct 6 2026; both confirmed live by the Data API that day.
    source: { videoIds: ["oORXfTviuCs", "7x5kRo1B84Y"] },
    scout: ["UC-2KSeUU5SMCX6XLRD-AEvw"],
    expect: { title: ["Mpala"] },
    credit: { name: "Mpala Live! · explore.org", url: "https://explore.org/livecams/mpala" },
    headline: "A research station's backyard, where hippos grunt and elephants come to drink.",
    looking:
      "One of two views at Mpala, about 50 km north of the Equator on the Laikipia Plateau, northwest of Mount Kenya. One camera watches a watering hole. The other pans across the hippo pools on the Ewaso Ng'iro River, from the fever trees up to a sandbank nicknamed 'Basking Beach'.",
    watchFor: [
      "Hippos in the pool. Their grunting is the soundtrack here",
      "Reticulated giraffe and the rare Grevy's zebra, both specialties of this region",
      "Elephants, baboons and vervet monkeys coming down to the water",
    ],
    history:
      "Mpala is a working cattle ranch and a wildlife research centre on the same land. The research centre opened in 1994 as a Kenyan-US partnership between the Kenya Wildlife Service, the National Museums of Kenya, the Smithsonian and Princeton. Scientists come here to study how people, livestock and wildlife share the same ground.",
    facts: [
      "The property covers about 48,000 acres.",
      "Hippos make a red-brown skin secretion, sometimes called 'blood sweat', that works as sunscreen and fights infection.",
    ],
    sources: [
      { label: "Princeton: Mpala history and governance", url: "https://international.princeton.edu/mpala-research-centre/about-mpala/mpala-history-governance" },
      { label: "explore.org: Mpala cams", url: "https://explore.org/livecams/mpala" },
      { label: "Nature: Hippo sweat", url: "https://www.nature.com/news/2004/040524/full/news040524-7.html" },
    ],
  },
  {
    id: "djuma",
    name: "Djuma Waterhole",
    place: "Gowrie Dam, Djuma Game Reserve, Sabi Sand",
    country: "South Africa",
    lat: -24.73,
    lng: 31.55,
    tz: "Africa/Johannesburg",
    // Added Oct 6 2026; confirmed live and HD by the Data API that day.
    source: { videoIds: ["iUdDKf9aDUU"] },
    scout: ["@djumacam"],
    night: true,
    expect: { title: ["Djuma"] },
    credit: { name: "Djuma Cam", url: "https://www.djuma.com/djumacam" },
    headline: "The waterhole where live wildlife cams began.",
    looking:
      "Gowrie Dam, a waterhole in Djuma Game Reserve, in the Sabi Sand next to Kruger National Park. The camera runs around the clock and switches to infrared after dark.",
    watchFor: [
      "Leopards, which the Sabi Sand is famous for",
      "Elephant, buffalo and hippo at the water's edge",
      "Hyenas and other night visitors on the infrared picture",
    ],
    history:
      "On 17 August 1998, a small startup called Africam put the first live wildlife webcam on the internet here, with Djuma's owners, Jurie and Pippa Moolman. At first it posted a still JPEG that refreshed every 30 seconds. Within a few months the camera moved to overlook Gowrie Dam, and it has watched the same water ever since.",
    facts: [
      "Djuma is named after the roar of a lion.",
      "The Sabi Sand was formed by its landowners in 1948 and shares an unfenced border with Kruger. The fences between them came down in 1993.",
    ],
    sources: [
      { label: "Djuma: The Djuma Cam story", url: "https://www.djuma.com/about" },
      { label: "Wikipedia: Djuma Game Reserve", url: "https://en.wikipedia.org/wiki/Djuma_Game_Reserve" },
      { label: "Wikipedia: Sabi Sand Game Reserve", url: "https://en.wikipedia.org/wiki/Sabi_Sand_Game_Reserve" },
    ],
  },
  {
    id: "langebaan",
    name: "Langebaan Lagoon",
    place: "Pearly's, Langebaan, West Coast",
    country: "South Africa",
    lat: -33.09,
    lng: 18.03,
    tz: "Africa/Johannesburg",
    // Added Oct 6 2026; confirmed live and HD by the Data API that day.
    source: { videoIds: ["mxEholKv57A"] },
    scout: ["@TableMountainLiveStream"],
    expect: { title: ["Langebaan"] },
    credit: { name: "Table Mountain Live Stream", url: "https://www.youtube.com/@TableMountainLiveStream" },
    headline: "A salt-water lagoon where Arctic shorebirds spend the southern summer.",
    looking:
      "Langebaan Lagoon from the main beach in Langebaan, in front of Pearly's restaurant. The lagoon is about 16 km long and opens into Saldanha Bay to the north. No river flows into it. It's all sea water, and it's protected by West Coast National Park.",
    watchFor: [
      "Kitesurfers on the flat water on windy afternoons",
      "Shorebirds feeding on the sand flats at low tide, mostly in the southern summer",
      "Sunset over the lagoon. Pearly's beach is known for it",
    ],
    history:
      "West Coast National Park was proclaimed in 1985 around the lagoon. In 1995, a set of fossil footprints turned up in the rock at Kraalbaai, across the water. Known as Eve's footprints, they are about 117,000 years old and are among the oldest known tracks of an anatomically modern human. The originals are now in a museum in Cape Town.",
    facts: [
      "The lagoon has been a Ramsar wetland of international importance since 1988.",
      "Its tidal flats can hold up to 55,000 water birds in summer, many of them waders that breed in the Arctic, such as curlew sandpipers and knots.",
    ],
    sources: [
      { label: "Wikipedia: West Coast National Park", url: "https://en.wikipedia.org/wiki/West_Coast_National_Park" },
      { label: "SANParks: West Coast birds", url: "https://www.sanparks.org/parks/west-coast/explore/fauna-flora/birds" },
      { label: "Wikipedia: Langebaan", url: "https://en.wikipedia.org/wiki/Langebaan" },
    ],
  },
  {
    id: "royalcam",
    name: "Royal Albatross Nest",
    place: "Pukekura / Taiaroa Head, Otago Peninsula",
    country: "New Zealand",
    lat: -45.774,
    lng: 170.728,
    tz: "Pacific/Auckland",
    // Added Oct 6 2026; confirmed live and HD by the Data API that day. Older season IDs
    // (LZ5Ja2mHgoA, fDhIv9iBzWk) have ended.
    source: { videoIds: ["Mm_zVDDUeNA"] },
    expect: { title: ["Albatross", "RoyalCam"] },
    credit: { name: "NZ Department of Conservation · Cornell Lab", url: "https://www.allaboutbirds.org/cams/royal-albatross/" },
    headline: "One albatross nest, on the only mainland colony of great albatrosses.",
    looking:
      "A northern royal albatross nest at the tip of the Otago Peninsula, near Dunedin. The cam follows one nest each season, with a new pair every year. Chicks fly in September, and the next egg comes around November, so between seasons you may see an empty nest and no bird at all.",
    watchFor: [
      "A parent landing after days at sea. With 3-metre wings, landings are not always graceful",
      "The adults swapping turns on the egg, or flying in to feed the chick",
      "The chick in its fluffy white down, sitting out the wind and rain alone",
    ],
    history:
      "The first albatross egg here was found in 1919. Chicks kept dying until 1938, when the ornithologist Lance Richdale camped beside one nest to protect it. On 22 September 1938 he watched that chick fly, the first known to leave the headland. The Department of Conservation set up the cam in 2016, and the Cornell Lab of Ornithology joined in 2019.",
    facts: [
      "Northern royal albatrosses breed only in New Zealand and are listed as Endangered.",
      "A pair raises one chick every two years. After a chick leaves, the parents spend a year at sea.",
      "The colony had raised 500 chicks by 2007.",
    ],
    sources: [
      { label: "Cornell Lab: Royal Albatross Cam", url: "https://www.allaboutbirds.org/cams/royal-albatross/" },
      { label: "DOC: Royal albatross/toroa", url: "https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/albatrosses/royal-albatross-toroa/" },
      { label: "Wikipedia: Taiaroa Head", url: "https://en.wikipedia.org/wiki/Taiaroa_Head" },
    ],
  },
  {
    id: "elkrefuge",
    name: "National Elk Refuge",
    place: "Jackson, Wyoming",
    country: "United States",
    lat: 43.51,
    lng: -110.75,
    tz: "America/Denver",
    // Added Oct 6 2026; both confirmed live and HD by the Data API that day. Two SeeJH cams:
    // National Museum of Wildlife Art, and Flat Creek Inn.
    source: { videoIds: ["_2rvoH5oDcg", "kIZp6fUSpS0"] },
    scout: ["@Seejh"],
    expect: { title: ["Elk Refuge"] },
    credit: { name: "SeeJH", url: "https://www.youtube.com/@Seejh" },
    headline: "Where thousands of elk come down from the mountains to spend the winter.",
    looking:
      "The grasslands and marshes of the National Elk Refuge, just north of the town of Jackson. One camera is at the National Museum of Wildlife Art, on a butte above the refuge. The other is at the Flat Creek Inn. Elk come down after the first big snows and are easiest to see from mid-December to early April. In summer and fall the meadows can look empty.",
    watchFor: [
      "Elk herds spread across the snow in winter",
      "Horse-drawn sleighs taking visitors out among the elk, mid-December to early April",
      "Bison, and trumpeter swans on Flat Creek",
    ],
    history:
      "Ranches and fences had cut the elk off from their old winter range. In the hard winters of 1909 to 1911, thousands starved. Locals raised money for hay, and the photographer Stephen Leek sent his pictures of dead and starving elk to newspapers and magazines. In 1912, Congress set aside $45,000 and created the refuge.",
    facts: [
      "The refuge covers about 24,700 acres and holds around 7,500 elk in an average winter.",
      "Male elk shed their antlers here every spring. Since 1967, Boy Scouts have collected them for an auction in Jackson, and most of the money goes back to the refuge.",
    ],
    sources: [
      { label: "USFWS: National Elk Refuge", url: "https://www.fws.gov/refuge/national-elk/about-us" },
      { label: "Wikipedia: National Elk Refuge", url: "https://en.wikipedia.org/wiki/National_Elk_Refuge" },
      { label: "Jackson Hole History: Elk Refuge 1912-2012", url: "https://jacksonholehistory.org/national-elk-refuge-1912-2012/" },
    ],
  },
  {
    id: "montereybay",
    name: "Monterey Bay",
    place: "Monterey Bay Aquarium decks, Cannery Row",
    country: "United States",
    lat: 36.6183,
    lng: -121.9018,
    tz: "America/Los_Angeles",
    // Added Oct 6 2026; confirmed live and HD by the Data API that day.
    source: { videoIds: ["fVa6-zCBR7A"] },
    scout: ["UCnM5iMGiKsZg-iOlIO2ZkdQ"],
    expect: { title: ["Monterey Bay Cam"] },
    credit: { name: "Monterey Bay Aquarium", url: "https://www.montereybayaquarium.org/cams-videos/live-cams/monterey-bay-cam" },
    headline: "The open water outside the aquarium, with whoever happens to swim by.",
    looking:
      "Monterey Bay from the aquarium's ocean-view decks on Cannery Row. This is the real bay, not a tank. Sea otters and harbor seals live here all year, and the water belongs to a national marine sanctuary.",
    watchFor: [
      "Sea otters floating on their backs, often wrapped in kelp",
      "A harbor seal's head popping up out of the water",
      "Humpback whales, sometimes, from late April to early December",
    ],
    history:
      "In the early 1940s, more than 30 canneries and reduction plants lined this street. Then the sardines crashed, and the canneries shut one by one. The last one closed in 1973. In 1958, Ocean View Avenue was officially renamed Cannery Row, after John Steinbeck's 1945 novel. The bay became a national marine sanctuary on September 18, 1992.",
    facts: [
      "Out in the bay, Monterey Canyon cuts down as deep as the Grand Canyon. It's the largest submarine canyon on the West Coast of North America.",
      "Sea otters were thought to be gone from California until 1938, when about 50 turned up off Big Sur. Every southern sea otter alive today descends from that group.",
    ],
    sources: [
      { label: "Wikipedia: Cannery Row", url: "https://en.wikipedia.org/wiki/Cannery_Row" },
      { label: "Wikipedia: Monterey Bay National Marine Sanctuary", url: "https://en.wikipedia.org/wiki/Monterey_Bay_National_Marine_Sanctuary" },
      { label: "Wikipedia: Monterey Canyon", url: "https://en.wikipedia.org/wiki/Monterey_Canyon" },
      { label: "USFWS: The southern sea otter's return", url: "https://www.fws.gov/story/2022-07/second-chances-southern-sea-otters-return-ecological-relevance" },
    ],
  },
];
