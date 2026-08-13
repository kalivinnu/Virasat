import karnataka from "@/assets/states/karnataka.jpg";
import rajasthan from "@/assets/states/rajasthan.jpg";
import uttarPradesh from "@/assets/states/uttar-pradesh.jpg";
import westBengal from "@/assets/states/west-bengal.jpg";
import maharashtra from "@/assets/states/maharashtra.jpg";
import gujarat from "@/assets/states/gujarat.jpg";
import jammuAndKashmir from "@/assets/states/jammu-and-kashmir.jpg";
import punjab from "@/assets/states/punjab.jpg";
import madhyaPradesh from "@/assets/states/madhya-pradesh.jpg";
import assam from "@/assets/states/assam.jpg";
import telangana from "@/assets/states/telangana.jpg";
import kerala from "@/assets/states/kerala.jpg";
import tamilNadu from "@/assets/states/tamil-nadu.jpg";

import culture1 from "@/assets/culture1.jpg";
import culture2 from "@/assets/culture2.jpg";
import culture3 from "@/assets/culture3.jpg";
import culture4 from "@/assets/culture4.jpg";
import archive from "@/assets/archive.jpg";

/** One unique hero image per state. */
export const STATE_HERO: Record<string, string> = {
  karnataka,
  rajasthan,
  "uttar-pradesh": uttarPradesh,
  "west-bengal": westBengal,
  maharashtra,
  gujarat,
  "jammu-and-kashmir": jammuAndKashmir,
  punjab,
  "madhya-pradesh": madhyaPradesh,
  assam,
  telangana,
  kerala,
  "tamil-nadu": tamilNadu,
};

const TEXTURES = [culture1, culture2, culture3, culture4, archive];

/** Supporting gallery: the state's own frame plus rotating heritage textures. */
export function stateGallery(id: string): string[] {
  const hero = STATE_HERO[id] ?? karnataka;
  const seed = Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0);
  return [
    hero,
    TEXTURES[seed % TEXTURES.length] ?? culture1,
    TEXTURES[(seed + 2) % TEXTURES.length] ?? culture2,
    TEXTURES[(seed + 4) % TEXTURES.length] ?? culture3,
  ];
}

export function stateHero(id: string): string {
  return STATE_HERO[id] ?? karnataka;
}
