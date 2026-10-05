// Peek prototype catalog. One entry per vetted live view.
//
// source: { videoId } for a single YouTube live video, or { channelId } to embed
//         whatever that channel is currently broadcasting (survives stream restarts).
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
    source: { videoId: "ydYDqZQpim8" },
    night: true,
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
    source: { videoId: "Sv9hcJ3k5h4" },
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
    source: { videoId: "Kmf_wiTFuXY" },
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
    source: { videoId: "WDHSEuMUb3w" },
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
    source: { channelId: "UCIQVWkOilfxoQSFcban_d-A" },
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
    hours: [7, 19],
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
    source: { videoId: "VJSMy-H_GKE" },
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
    source: { videoId: "o9puACFGW0o" },
    verify: true,
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
];
