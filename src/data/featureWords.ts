export interface FeatureWord {
  id: string;
  word: string;
  pronunciation: string;
  subtitle: string;
  description: string;
  details: string[];
}

export const FEATURE_WORDS: FeatureWord[] = [
  {
    id: "privacy",
    word: "Privacy",
    pronunciation: "/ˈprɪv.ə.si/",
    subtitle: "Absolute spatial isolation.",
    description: "An uncompromising defensive barrier against external noise. Walls engineered for acoustic silence, personal gated domains, and secure, completely unmonitored shorelines.",
    details: ["Acoustic dampening rating of STC 65", "Encrypted satellite communications", "Private heliport & deep-water wharf accessibility"]
  },
  {
    id: "comfort",
    word: "Comfort",
    pronunciation: "/ˈkʌm.fət/",
    subtitle: "Organic thermal and sensory symbiosis.",
    description: "Unconscious ease crafted from tactile intelligence. Low-velocity geothermal airflow, self-adjusting circadian luminosity, and custom-molded pure merino and raw silk linens.",
    details: ["Circadian biosympathetic circadian lighting", "Hypoallergenic climate isolation", "Floating mineral bath systems"]
  },
  {
    id: "service",
    word: "Service",
    pronunciation: "/ˈsɜː.vɪs/",
    subtitle: "Intuitive preemptive care.",
    description: "A phantom support network that materializes only when anticipated. Every preference logged to a private localized profile, allowing services to manifest without a sound.",
    details: ["Dedicated butler trained in silent service", "Chauffeur fleet of electric custom-series sedans", "On-demand master culinary curation"]
  },
  {
    id: "experience",
    word: "Experience",
    pronunciation: "/ˈɛk.spɪə.rɪ.əns/",
    subtitle: "Unrepeatable ephemeral memories.",
    description: "Curation designed to transcend standard travel. Privileged off-grid treks, nocturnal architectural gallery viewing, and custom organic botanical scent profiles.",
    details: ["Exclusive access to private reserves", "Curated local cultural expeditions", "Tailored seasonal sensory identity"]
  }
];
