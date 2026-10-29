// Template registry. Order = gallery order (team favourites first).
import eduSpeakerSquare from "./edu-speaker-square.js";
import eduPanelWide from "./edu-panel-wide.js";
import hcPanelWide from "./hc-panel-wide.js";
import hcSpeakerWide from "./hc-speaker-wide.js";
import hcSpeakerSquare from "./hc-speaker-square.js";
import bfsiSpeakerWide from "./bfsi-speaker-wide.js";
import bfsiPanelModerator from "./bfsi-panel-moderator.js";
import eventConferenceWide from "./event-conference-wide.js";
import eventConferenceSquare from "./event-conference-square.js";
import webinarLightCobrand from "./webinar-light-cobrand.json";
import webinarDarkAi from "./webinar-dark-ai.json";
import webinarNavyFinance from "./webinar-navy-finance.json";
import webinarLightHealthcare from "./webinar-light-healthcare.json";

webinarLightCobrand.industry = "Education";
webinarNavyFinance.industry = "Fintech / BFSI";
webinarLightHealthcare.industry = "Healthcare";
webinarDarkAi.industry = null;

export const TEMPLATES = [
  eduSpeakerSquare,
  eduPanelWide,
  hcPanelWide,
  hcSpeakerWide,
  hcSpeakerSquare,
  bfsiSpeakerWide,
  bfsiPanelModerator,
  eventConferenceWide,
  eventConferenceSquare,
  webinarLightCobrand,
  webinarNavyFinance,
  webinarLightHealthcare,
  webinarDarkAi,
];

export const GROUPS = ["Webinar banners", "Social posts", "Event creatives", "Carousels", "One-pagers and ebooks"];
// Same six filters as the Content Repository.
export const INDUSTRIES = ["Education", "Healthcare", "Fintech / BFSI", "Manufacturing", "Events India", "Events US"];
