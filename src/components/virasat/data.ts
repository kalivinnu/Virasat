import ff1 from "@/assets/ff1.jpg";
import ff2 from "@/assets/ff2.jpg";
import ff3 from "@/assets/ff3.jpg";
import ff4 from "@/assets/ff4.jpg";
import culture1 from "@/assets/culture1.jpg";
import culture2 from "@/assets/culture2.jpg";
import culture3 from "@/assets/culture3.jpg";
import culture4 from "@/assets/culture4.jpg";

export const fighters = [
  {
    name: "Birsa Munda",
    years: "1875 – 1900",
    role: "Tribal Leader & Freedom Fighter",
    region: "Jharkhand",
    image: ff1,
    note: "Led the Ulgulan uprising against colonial land laws before he turned twenty-five.",
  },
  {
    name: "Matangini Hazra",
    years: "1869 – 1942",
    role: "Freedom Fighter",
    region: "West Bengal",
    image: ff2,
    note: "Marched with the national flag held high, refusing to fall until the last breath.",
  },
  {
    name: "Chandra Shekhar Azad",
    years: "1906 – 1931",
    role: "Revolutionary",
    region: "Uttar Pradesh",
    image: ff3,
    note: "Organised a generation of young revolutionaries and never allowed his own capture.",
  },
  {
    name: "Kalpana Datta",
    years: "1913 – 1995",
    role: "Revolutionary",
    region: "Chittagong",
    image: ff4,
    note: "Joined the armoury raid group and carried the movement through years of imprisonment.",
  },
];

export const eras = [
  {
    id: "ancient",
    label: "Ancient India",
    range: "3300 BCE – 500 CE",
    headline: "Cities of brick and water",
    body: "Planned drainage at Dholavira, seals from Lothal, and trade routes that reached Mesopotamia — an urban civilisation remembered only in fragments.",
  },
  {
    id: "classical",
    label: "Classical Era",
    range: "500 – 1200 CE",
    headline: "Temples as mathematics",
    body: "Astronomers, grammarians and stone masons worked to the same geometry. Entire schools of thought survive only in commentaries on lost books.",
  },
  {
    id: "medieval",
    label: "Medieval India",
    range: "1200 – 1750 CE",
    headline: "Courts, saints and bazaars",
    body: "Bhakti and Sufi poets moved between languages while regional kingdoms built libraries, step-wells and observatories.",
  },
  {
    id: "colonial",
    label: "Colonial Era",
    range: "1750 – 1900 CE",
    headline: "Resistance in the margins",
    body: "Peasant revolts, tribal uprisings and forest wars that rarely reach a textbook page, recorded mostly in colonial court files.",
  },
  {
    id: "freedom",
    label: "Freedom Movement",
    range: "1900 – 1947 CE",
    headline: "A million unnamed hands",
    body: "Beyond the famous names stood printers, couriers, students and villagers whose stories were never collected.",
  },
];

export const states = [
  { name: "Jammu & Kashmir", x: 30, y: 11, stories: 38 },
  { name: "Punjab", x: 28, y: 21, stories: 64 },
  { name: "Rajasthan", x: 20, y: 33, stories: 96 },
  { name: "Gujarat", x: 13, y: 44, stories: 71 },
  { name: "Uttar Pradesh", x: 39, y: 30, stories: 132 },
  { name: "Madhya Pradesh", x: 32, y: 42, stories: 88 },
  { name: "West Bengal", x: 58, y: 42, stories: 104 },
  { name: "Assam", x: 71, y: 33, stories: 47 },
  { name: "Maharashtra", x: 23, y: 54, stories: 118 },
  { name: "Telangana", x: 33, y: 60, stories: 52 },
  { name: "Karnataka", x: 26, y: 70, stories: 93 },
  { name: "Tamil Nadu", x: 33, y: 82, stories: 87 },
  { name: "Kerala", x: 25, y: 85, stories: 61 },
];

export const culture = [
  {
    title: "Folk Dance",
    image: culture1,
    body: "Regional dance forms that carry oral history in gesture — from Chhau to Sattriya.",
  },
  {
    title: "Handicrafts",
    image: culture2,
    body: "Madhubani, Bidri, Pattachitra and the workshops that still teach by hand.",
  },
  {
    title: "Festivals",
    image: culture3,
    body: "Lamp festivals, harvest calendars and local fairs older than the states they sit in.",
  },
  {
    title: "Architecture",
    image: culture4,
    body: "Step-wells, rock-cut caves and temple towns built to survive centuries of weather.",
  },
];

export const archiveItems = [
  { label: "Manuscripts", count: "4,120", note: "Palm-leaf and paper folios" },
  { label: "Historical Letters", count: "2,860", note: "Personal & official correspondence" },
  { label: "Photographs", count: "9,540", note: "Studio and field images" },
  { label: "Documents", count: "6,310", note: "Court files, land records" },
  { label: "Maps", count: "1,180", note: "Survey and pilgrimage maps" },
  { label: "Newspaper Clippings", count: "3,470", note: "Vernacular press, 1857–1947" },
  { label: "Artifacts", count: "1,905", note: "Coins, seals, tools, textiles" },
];

export const verificationSteps = [
  {
    title: "Claim",
    body: "A story, date or attribution enters the archive as an unverified claim.",
  },
  { title: "Sources", body: "Researchers gather primary records, gazetteers and oral accounts." },
  { title: "Cross-Check", body: "Independent sources are compared for agreement and contradiction." },
  { title: "Evidence", body: "Scans, citations and provenance are attached to the record." },
  { title: "Result", body: "The claim receives a public status that anyone can inspect." },
];

export const statuses = [
  { label: "Verified", token: "verified" as const, share: "62%" },
  { label: "Partially Verified", token: "partial" as const, share: "21%" },
  { label: "Under Review", token: "review" as const, share: "12%" },
  { label: "Disputed", token: "disputed" as const, share: "5%" },
];
