/**
 * Curated mapping from raw BodyParts3D elements to the explorer's anatomical structures.
 * Each element name is normalized (lower case, laterality removed) and matched against
 * ordered rules that assign a concept (the knowledge-base key), body system, render group
 * and dissection layer. Elements of the same concept + side are merged into one structure.
 */
import type { Bp3dElement } from "./sources";

import type { GroupId, Layer, Side, SystemId } from "../../shared/anatomy";

export type { GroupId, Layer, Side, SystemId };

export interface StructureSpec {
  id: string;
  name: string;
  concept: string; // knowledge key (slug without side)
  conceptName: string; // human readable concept (no side)
  side?: Side;
  system: SystemId;
  group: GroupId;
  layer: Layer;
  /** Optional color override (hex) */
  color?: string;
  /** How this structure's geometry is produced */
  source:
    | { kind: "bp3d"; elements: string[] }
    | { kind: "hra"; file: string; nodes: string[] }
    | { kind: "generated"; generator: string };
  /** Only present in one sex's model */
  sex?: "male" | "female";
}

interface Rule {
  re: RegExp;
  concept?: string | ((m: RegExpMatchArray) => string);
  system: SystemId;
  group: GroupId;
  layer: Layer;
  drop?: boolean;
  /** Merge left/right into a single midline structure */
  midline?: boolean;
  color?: string;
  sex?: "male" | "female";
}

// Superficial muscles (visible after the skin is removed); everything else is "deep".
const SUPERFICIAL_MUSCLES = new Set([
  "trapezius",
  "latissimus dorsi",
  "deltoid",
  "pectoralis major",
  "external oblique",
  "rectus abdominis",
  "serratus anterior",
  "sternocleidomastoid",
  "platysma",
  "biceps brachii",
  "triceps brachii",
  "brachialis",
  "brachioradialis",
  "anconeus",
  "flexor carpi radialis",
  "flexor carpi ulnaris",
  "palmaris longus",
  "pronator teres",
  "flexor digitorum superficialis",
  "extensor carpi radialis longus",
  "extensor carpi radialis brevis",
  "extensor carpi ulnaris",
  "extensor digitorum",
  "extensor digiti minimi",
  "abductor pollicis longus",
  "extensor pollicis brevis",
  "extensor pollicis longus",
  "gluteus maximus",
  "gluteus medius",
  "tensor fasciae latae",
  "sartorius",
  "rectus femoris",
  "vastus lateralis",
  "vastus medialis",
  "gracilis",
  "adductor longus",
  "adductor magnus",
  "pectineus",
  "biceps femoris",
  "semitendinosus",
  "semimembranosus",
  "gastrocnemius",
  "soleus",
  "tibialis anterior",
  "fibularis longus",
  "fibularis brevis",
  "fibularis tertius",
  "extensor digitorum longus",
  "extensor hallucis longus",
  "infraspinatus",
  "teres major",
  "teres minor",
  "temporalis",
  "masseter",
  "muscles of facial expression",
  "abductor pollicis brevis",
  "abductor digiti minimi of hand",
  "abductor hallucis",
  "abductor digiti minimi of foot",
  "flexor pollicis brevis",
  "opponens digiti minimi of hand",
  "flexor digiti minimi brevis of hand",
  "extensor hallucis brevis",
  "omohyoid",
  "sternohyoid",
  "splenius capitis",
  "levator scapulae",
  "external anal sphincter",
]);

const SUPERFICIAL_VEINS =
  /^(cephalic vein|basilic vein|median cubital vein|median antebrachial vein|great saphenous vein|small saphenous vein|dorsal venous (network|arch).*|superficial epigastric vein|superficial (dorsal )?vein of penis|superficial dorsal vein of penis|dorsal metacarpal vein|set of dorsal digital veins|superficial palmar venous arch)$/;

const TENDINOUS = /(tendon|retinaculum|linea alba|iliotibial tract|aponeurosis|raphe|tendinous arch|intermediate tendon|common tendinous ring|check ligament|trochlea of superior oblique)/;

const ORDINAL = "(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth)";

const RULES: Rule[] = [
  // ---------- dropped: hair / duplicates / fragments ----------
  { re: /^(hair of head|eyebrow|pubic hair)$/, drop: true, system: "integumentary", group: "skin", layer: 0 },
  { re: /^descending aorta$/, drop: true, system: "cardiovascular", group: "artery", layer: 3 }, // duplicate of thoracic + abdominal aorta
  { re: /^parenchyma of pancreas$/, drop: true, system: "digestive", group: "organ", layer: 3 },
  { re: /^(interpeduncular fossa|interventricular foramen|lamina terminalis|habenula|stria terminalis|stria medullaris of thalamus|posterior commissure|anterior commissure|tuber cinereum|brachium of (inferior|superior) colliculus|septum of telencephalon)$/, drop: true, system: "nervous", group: "brain", layer: 3 },
  { re: /^(lacrimal lake|lacrimal canaliculus)$/, drop: true, system: "nervous", group: "eye", layer: 3 },

  // ---------- integumentary ----------
  { re: /^(skin|lip|external ear)$/, concept: "skin", system: "integumentary", group: "skin", layer: 0, midline: true },

  // ---------- skeletal: axial ----------
  { re: /^(atlas|axis)$/, concept: (m) => `${m[1]} (C${m[1] === "atlas" ? 1 : 2})`, system: "skeletal", group: "bone", layer: 4 },
  { re: new RegExp(`^${ORDINAL} (cervical|thoracic|lumbar) vertebra$`), concept: (m) => `${m[1]} ${m[2]} vertebra`, system: "skeletal", group: "bone", layer: 4 },
  { re: /^(sacrum|coccyx)$/, system: "skeletal", group: "bone", layer: 4 },
  { re: /^intervertebral disk of (.*)$/, concept: (m) => `intervertebral disc below ${m[1].replace(/ vertebra$/, "")}`, system: "skeletal", group: "cartilage", layer: 4 },
  { re: /^intervertebral disk$/, concept: "intervertebral disc below twelfth thoracic", system: "skeletal", group: "cartilage", layer: 4 },
  { re: new RegExp(`^${ORDINAL} rib$`), concept: (m) => `${m[1]} rib`, system: "skeletal", group: "bone", layer: 4 },
  { re: new RegExp(`^${ORDINAL} costal cartilage$`), concept: (m) => `${m[1]} costal cartilage`, system: "skeletal", group: "cartilage", layer: 4 },
  { re: /^(manubrium|body of sternum|xiphoid process)$/, concept: (m) => (m[1] === "manubrium" ? "manubrium of sternum" : m[1]), system: "skeletal", group: "bone", layer: 4 },
  { re: /^(frontal bone|occipital bone|sphenoid bone|ethmoid|vomer|mandible|hyoid bone)$/, concept: (m) => (m[1] === "ethmoid" ? "ethmoid bone" : m[1]), system: "skeletal", group: "bone", layer: 4, midline: true },
  { re: /^(parietal bone|temporal bone|maxilla|zygomatic bone|nasal bone|lacrimal bone|palatine bone|inferior nasal concha)$/, system: "skeletal", group: "bone", layer: 4 },
  { re: /^(septal nasal cartilage|lateral nasal cartilage|major alar cartilage)$/, concept: "nasal cartilages", system: "skeletal", group: "cartilage", layer: 4, midline: true },
  // ---------- skeletal: appendicular ----------
  { re: /^(clavicle|scapula|humerus|radius|ulna|hip bone|femur|patella|tibia|fibula)$/, system: "skeletal", group: "bone", layer: 4 },
  { re: /^(scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate)$/, concept: (m) => `${m[1]} bone`, system: "skeletal", group: "bone", layer: 4 },
  { re: /^(first|second|third|fourth|fifth) metacarpal bone$/, concept: (m) => `${m[1]} metacarpal`, system: "skeletal", group: "bone", layer: 4 },
  { re: /^(?:proximal|middle|distal) phalanx of (thumb|index finger|middle finger|ring finger|little finger)$/, concept: (m) => `phalanges of ${m[1]}`, system: "skeletal", group: "bone", layer: 4 },
  { re: /^(talus|calcaneus|cuboid bone|navicular bone of foot|medial cuneiform bone|intermediate cuneiform bone|lateral cuneiform bone)$/, concept: (m) => m[1].replace(" of foot", ""), system: "skeletal", group: "bone", layer: 4 },
  { re: /^(first|second|third|fourth|fifth) metatarsal bone$/, concept: (m) => `${m[1]} metatarsal`, system: "skeletal", group: "bone", layer: 4 },
  { re: /^(?:proximal|middle|distal) phalanx of (big toe|second toe|third toe|fourth toe|little toe)$/, concept: (m) => `phalanges of ${m[1]}`, system: "skeletal", group: "bone", layer: 4 },
  { re: /^sesamoid bone of foot$/, concept: "sesamoid bones of foot", system: "skeletal", group: "bone", layer: 4 },
  { re: /^(interosseous membrane of (forearm|leg)|long plantar ligament|stylohyoid ligament)$/, system: "skeletal", group: "ligament", layer: 4 },

  // ---------- respiratory ----------
  { re: /^(thyroid cartilage|cricoid cartilage|epiglottis|arytenoid cartilage|corniculate cartilage|cuneiform cartilage)$/, concept: (m) => m[1], system: "respiratory", group: "airway", layer: 3 },
  { re: /^(conus elasticus|vocal ligament|median cricothyroid ligament|median thyrohyoid ligament|lateral thyrohyoid ligament|thyrohyoid membrane|hyo-epiglottic ligament|thyro-epiglottic ligament)$/, concept: "laryngeal ligaments & membranes", system: "respiratory", group: "airway", layer: 3, midline: true },
  { re: /^(vocalis|thyro-arytenoid|lateral crico-arytenoid|posterior crico-arytenoid|oblique arytenoid|transverse arytenoid|aryepiglotticus|(oblique|straight) part of cricothyroid)$/, concept: "intrinsic laryngeal muscles", system: "respiratory", group: "muscle", layer: 3, midline: true },
  { re: /^trachea$/, system: "respiratory", group: "airway", layer: 3 },
  { re: /^main bronchus( proper)?$/, concept: "main bronchus", system: "respiratory", group: "airway", layer: 3 },
  { re: /bronchial tree$/, concept: "bronchial tree", system: "respiratory", group: "airway", layer: 3 },

  // ---------- cardiovascular: heart ----------
  { re: /^wall of ventricle$/, concept: "ventricular myocardium", system: "cardiovascular", group: "heart", layer: 3 },
  { re: /^wall of atrium$/, concept: "atrium", system: "cardiovascular", group: "heart", layer: 3 },
  { re: /^cavity of (atrium|ventricle)$/, concept: (m) => `${m[1]} blood pool`, system: "cardiovascular", group: "heart", layer: 3 },
  { re: /cusp of aortic valve$/, concept: "aortic valve", system: "cardiovascular", group: "heart", layer: 3, midline: true },
  { re: /cusp of pulmonary valve$/, concept: "pulmonary valve", system: "cardiovascular", group: "heart", layer: 3, midline: true },
  { re: /leaflet of mitral valve$/, concept: "mitral valve", system: "cardiovascular", group: "heart", layer: 3, midline: true },
  { re: /leaflet of tricuspid valve$/, concept: "tricuspid valve", system: "cardiovascular", group: "heart", layer: 3, midline: true },
  { re: /papillary muscle/, concept: "papillary muscles", system: "cardiovascular", group: "heart", layer: 3, midline: true },
  // coronary circulation
  { re: /^(great cardiac vein|middle cardiac vein|small cardiac vein|anterior cardiac vein|posterior vein of ventricle|marginal vein|coronary sinus|anterior interventricular vein)$/, concept: "cardiac veins", system: "cardiovascular", group: "vein", layer: 3, midline: true },
  { re: /(anterior interventricular|anterior descending|diagonal branch|septal branch of anterior|conus)/, concept: "left anterior descending artery", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(circumflex branch of coronary|marginal branch of coronary)/, concept: "circumflex artery", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(trunk of coronary artery|ventricular branch of coronary|posterior interventricular|septal branch of posterior interventricular)/, concept: "coronary artery trunks", system: "cardiovascular", group: "artery", layer: 3, midline: true },

  // ---------- cardiovascular: great vessels ----------
  { re: /^(ascending aorta|arch of aorta|descending thoracic aorta|abdominal aorta)$/, system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /^(pulmonary trunk|pulmonary artery|upper lobar artery)$/, concept: (m) => (m[1] === "pulmonary trunk" ? "pulmonary trunk" : "pulmonary artery"), system: "cardiovascular", group: "artery", layer: 3, color: "#3f63c4" },
  { re: /(segmental artery|lingular artery|basal segmental artery|branch of .*segmental artery)/, concept: "pulmonary artery branches", system: "cardiovascular", group: "artery", layer: 3, color: "#5074d0" },
  { re: /(superior|inferior) pulmonary vein$/, concept: "pulmonary veins", system: "cardiovascular", group: "vein", layer: 3, color: "#c83838" },
  { re: /(segmental vein|lingular vein|trunk of apical segmental vein)/, concept: "pulmonary vein tributaries", system: "cardiovascular", group: "vein", layer: 3, color: "#d0504a" },
  { re: /^(superior vena cava|inferior vena cava)$/, system: "cardiovascular", group: "vein", layer: 3, midline: true },
  { re: /^(azygos vein|hemiazygos vein|accessory hemiazygos vein)$/, concept: "azygos system", system: "cardiovascular", group: "vein", layer: 3, midline: true },
  { re: /^brachiocephalic artery$/, concept: "brachiocephalic trunk", system: "cardiovascular", group: "artery", layer: 3 },
  // liver & gut circulation
  { re: /(portal vein|pre-hepatic portal vein|superior mesenteric vein|splenic vein|inferior mesenteric vein|gastric vein|gastroepiploic vein|pancreaticoduodenal vein|colic vein|ileocolic vein|ileal vein|sigmoid vein|superior rectal vein|middle colic vein)/, concept: "hepatic portal system", system: "cardiovascular", group: "vein", layer: 3, midline: true },
  { re: /(hepatic vein|tributary of (middle )?hepatic vein|tributary of hepatic vein)/, concept: "hepatic veins", system: "cardiovascular", group: "vein", layer: 3, midline: true },
  { re: /(hepatic artery|segmental hepatic artery|lobe branch of hepatic artery|caudate lobe branch of hepatic artery|trunk of hepatic artery|common hepatic artery)/, concept: "hepatic arteries", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(celiac|gastric artery|splenic artery|gastro-epiploic artery|gastroduodenal|pancreatic artery|dorsal pancreatic|great pancreatic|caudal pancreatic|pancreaticoduodenal artery)/, concept: "celiac trunk & branches", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(superior mesenteric artery|ileocolic artery|ileal artery|ileal branch|middle colic artery|colic artery|cecal artery|appendicular artery|ascending branch of|descending branch of colic|marginal artery of colon|marginal colic artery|branch of inferior branch of ileocolic)/, concept: "superior mesenteric artery", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(inferior mesenteric artery|sigmoid artery|superior rectal artery)/, concept: "inferior mesenteric artery", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(renal artery|division of renal artery|segmental branch of renal artery|ureteric segment of renal artery)/, concept: "renal artery", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /^renal vein$/, system: "cardiovascular", group: "vein", layer: 3 },
  { re: /(suprarenal artery)/, concept: "suprarenal arteries", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(phrenic artery)/, concept: "phrenic arteries", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(phrenic vein)/, concept: "phrenic veins", system: "cardiovascular", group: "vein", layer: 3, midline: true },
  // brain circulation
  { re: /(callosomarginal|pericallosal|frontobasal|paracentral branch|precuneal|anterior cerebral artery|anterior communicating)/, concept: "anterior cerebral artery", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(middle cerebral artery|prefrontal artery|artery of (pre|post)?central sulcus|parietal artery|temporal artery|polar temporal|angular gyrus|temporo-occipital)/, concept: "middle cerebral artery", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(posterior cerebral artery|occipital artery|temporal branch of lateral occipital|temporal branches of lateral occipital|splenial artery|thalamogeniculate|thalamoperforating|posterior medial choroidal|posterior communicating|hypothalamic branch)/, concept: "posterior cerebral artery", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(basilar artery|vertebral artery|cerebellar artery|pontine artery|vermian branch|anterior spinal artery)/, concept: "vertebrobasilar arteries", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(anterior choroidal artery|internal carotid artery|ophthalmic artery)/, concept: (m) => (m[1].includes("choroidal") ? "internal carotid artery" : m[1]), system: "cardiovascular", group: "artery", layer: 3 },
  // hand / foot fine vessels
  { re: /(palmar digital artery|common palmar digital artery|palmar metacarpal artery|dorsal metacarpal arteries|arteria princeps pollicis|arteria radialis indicis|palmar arch|palmar arterial arch|dorsal carpal branch)/, concept: "arteries of the hand", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(palmar digital vein|common palmar digital vein|palmar metacarpal vein|palmar venous arch|deep palmar venous arch)/, concept: "deep veins of the hand", system: "cardiovascular", group: "vein", layer: 3 },
  { re: /(dorsal metacarpal vein|dorsal digital veins|dorsal venous network of hand)/, concept: "dorsal venous network of hand", system: "cardiovascular", group: "vein", layer: 1 },
  { re: /(plantar arch|plantar metatarsal artery|plantar digital arteries|dorsal digital arter|arcuate artery|deep plantar artery|lateral plantar artery|medial plantar artery|superficial medial plantar|lateral tarsal artery|calcaneal branches|dorsal digital artery of foot)/, concept: "arteries of the foot", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(plantar venous arch|plantar metatarsal vein|plantar digital veins|tributary of plantar venous arch)/, concept: "plantar veins of foot", system: "cardiovascular", group: "vein", layer: 3 },
  { re: /(dorsal venous arch of foot)/, concept: "dorsal venous arch of foot", system: "cardiovascular", group: "vein", layer: 1 },
  { re: /(posterior intercostal arter|first posterior intercostal|second posterior intercostal|superior intercostal artery|subcostal artery)/, concept: "intercostal arteries", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(intercostal vein|superior intercostal vein|subcostal vein)/, concept: "intercostal veins", system: "cardiovascular", group: "vein", layer: 3 },
  { re: /(lumbar artery)/, concept: "lumbar arteries", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(lumbar vein|ascending lumbar vein|iliolumbar vein|median sacral vein|lateral sacral vein)/, concept: "lumbar & sacral veins", system: "cardiovascular", group: "vein", layer: 3 },
  { re: /(genicular artery)/, concept: "genicular arteries", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(genicular vein)/, concept: "genicular veins", system: "cardiovascular", group: "vein", layer: 3 },
  { re: /(perforating arter|distal perforating artery)/, concept: "perforating arteries", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(perforating veins)/, concept: "perforating veins", system: "cardiovascular", group: "vein", layer: 3 },
  { re: /lateral circumflex femoral artery$/, concept: "lateral circumflex femoral artery", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(branch of thoraco-acromial artery|trunk of thoraco-acromial artery)/, concept: "thoraco-acromial artery", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /(collateral branch of deep brachial artery|deep brachial artery)/, concept: "deep brachial artery", system: "cardiovascular", group: "artery", layer: 3 },
  { re: /^dorsal artery of penis$/, system: "cardiovascular", group: "artery", layer: 3, sex: "male" },
  { re: /(deep|superficial) dorsal vein of penis/, concept: "dorsal veins of penis", system: "cardiovascular", group: "vein", layer: 3, midline: true, sex: "male" },
  { re: /^testicular artery$/, system: "cardiovascular", group: "artery", layer: 3, sex: "male" },
  { re: /^testicular vein$/, system: "cardiovascular", group: "vein", layer: 3, sex: "male" },
  { re: /(esophageal artery|oesophageal branches)/, concept: "esophageal arteries", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  { re: /(bronchial artery|bronchial branch of arch of aorta)/, concept: "bronchial arteries", system: "cardiovascular", group: "artery", layer: 3, midline: true },
  // generic named arteries / veins (kept individually)
  { re: /^(.*\bartery|.*\barteries|.*\btrunk)$/, system: "cardiovascular", group: "artery", layer: 3 },
  { re: /^(.*\bvein|.*\bveins)$/, system: "cardiovascular", group: "vein", layer: 3 },

  // ---------- nervous ----------
  { re: /^(superior|middle|inferior) frontal gyrus$/, system: "nervous", group: "brain", layer: 3 },
  { re: /^(precentral gyrus|postcentral gyrus|orbital gyrus|angular gyrus|supramarginal gyrus|superior parietal lobule|fusiform gyrus|cingulate gyrus|parahippocampal gyrus|middle temporal gyrus|inferior temporal gyrus|insula|occipital lobe)$/, system: "nervous", group: "brain", layer: 3 },
  { re: /^(anterior|posterior) part of superior temporal gyrus$/, concept: "superior temporal gyrus", system: "nervous", group: "brain", layer: 3 },
  { re: /^white matter of cerebral hemisphere$/, concept: "cerebral white matter", system: "nervous", group: "brain", layer: 3 },
  { re: /^(cerebellum|pons|medulla oblongata|midbrain|hypothalamus|corpus callosum|pineal body|pituitary gland|optic chiasm|mammillary body)$/, concept: (m) => (m[1] === "pineal body" ? "pineal gland" : m[1]), system: "nervous", group: "brain", layer: 3, midline: true },
  { re: /^peduncle of midbrain$/, concept: "cerebral peduncle", system: "nervous", group: "brain", layer: 3 },
  { re: /^(thalamus|caudate nucleus|putamen|globus pallidus|hippocampus|amygdala|internal capsule|lateral geniculate body|medial geniculate body|superior colliculus|inferior colliculus)$/, system: "nervous", group: "brain", layer: 3 },
  { re: /^(fornix of forebrain|commissure of fornix of forebrain)$/, concept: "fornix", system: "nervous", group: "brain", layer: 3, midline: true },
  { re: /^(lateral ventricle|third ventricle|fourth ventricle|cerebral aqueduct|central canal of spinal cord)$/, concept: "ventricular system", system: "nervous", group: "brain", layer: 3, midline: true, color: "#6fb6e8" },
  { re: /^choroid plexus of cerebral hemisphere$/, concept: "choroid plexus", system: "nervous", group: "brain", layer: 3, midline: true },
  { re: /^tentorium cerebelli$/, concept: "tentorium cerebelli", system: "nervous", group: "membrane", layer: 3, midline: true },
  { re: /^(optic nerve|optic tract)$/, system: "nervous", group: "nerve", layer: 3 },
  { re: /(ophthalmic nerve|frontal nerve|supra-orbital nerve|supratrochlear nerve|lacrimal nerve|nasociliary nerve|infratrochlear nerve|ethmoidal nerve|ciliary nerve|ciliary ganglion|communicating branch of nasociliary)/, concept: "ophthalmic nerve (CN V1)", system: "nervous", group: "nerve", layer: 3 },
  { re: /(trochlear nerve)/, concept: "trochlear nerve (CN IV)", system: "nervous", group: "nerve", layer: 3 },
  { re: /(branch of oculomotor nerve)/, concept: "oculomotor nerve (CN III)", system: "nervous", group: "nerve", layer: 3 },
  // eye
  { re: /^(sclera|cornea|iris|lens|choroid|vitreous body|corona ciliaris|optic part of retina|suspensory ligament of lens|anterior chamber of eyeball)$/, concept: (m) => (m[1] === "optic part of retina" ? "retina" : m[1] === "corona ciliaris" ? "ciliary body" : m[1] === "anterior chamber of eyeball" ? "aqueous humor" : m[1]), system: "nervous", group: "eye", layer: 3 },
  { re: /^(lacrimal gland|lacrimal sac|nasolacrimal duct)$/, concept: "lacrimal apparatus", system: "nervous", group: "gland", layer: 3 },
  { re: /^tarsal plate of (upper|lower) eyelid$/, concept: "tarsal plates", system: "nervous", group: "ligament", layer: 3 },
  { re: /^(superior|inferior|lateral|medial) rectus$/, concept: (m) => `${m[1]} rectus (eye)`, system: "muscular", group: "muscle", layer: 2 },
  { re: /^(superior|inferior) oblique$/, concept: (m) => `${m[1]} oblique (eye)`, system: "muscular", group: "muscle", layer: 2 },
  { re: /^levator palpebrae superioris$/, system: "muscular", group: "muscle", layer: 2 },
  { re: /^(check ligament of (lateral|medial) rectus|common tendinous ring|trochlea of superior oblique|tendon of levator palpebrae superioris)$/, concept: "orbital tendons & ligaments", system: "muscular", group: "tendon", layer: 2 },

  // ---------- digestive ----------
  { re: /^(upper|lower) .*tooth$/, concept: (m) => `${m[1]} teeth`, system: "digestive", group: "teeth", layer: 3, midline: true },
  { re: /^gingiva of (upper|lower) jaw$/, concept: "gingiva", system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /^tongue$/, system: "digestive", group: "organ", layer: 3 },
  { re: /^(submandibular gland|sublingual gland)$/, system: "digestive", group: "gland", layer: 3 },
  { re: /^(esophagus|stomach|duodenum|appendix|rectum|gallbladder)$/, concept: (m) => m[1], system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /^spleen$/, system: "lymphatic", group: "organ", layer: 3, midline: true },
  { re: /jejunum$/, concept: "jejunum", system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /ileum$|^ileocecal junction$/, concept: "ileum", system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /^(ascending|transverse|descending) colon$/, system: "digestive", group: "organ", layer: 3 },
  { re: /^taenia (libera|mesocolica|omentalis)$/, concept: "taeniae coli", system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /^(mesentery of small intestine|transverse mesocolon|mesoappendix)$/, concept: (m) => (m[1] === "mesoappendix" ? "mesentery of small intestine" : m[1]), system: "digestive", group: "membrane", layer: 3, midline: true },
  { re: /^hepatovenous segment (.*)$/, concept: (m) => `liver segment ${m[1]}`, system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /^caudate lobe of liver$/, concept: "liver segment i (caudate lobe)", system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /(biliary tree|hepatic duct|common hepatic duct|cystic duct|duct of caudate lobe)/, concept: "biliary tree", system: "digestive", group: "organ", layer: 3, midline: true, color: "#6f9a3c" },
  { re: /^pancreas$/, system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /^pancreatic duct( tree)?$/, concept: "pancreatic duct", system: "digestive", group: "organ", layer: 3, midline: true },
  { re: /^(superior|middle|inferior) pharyngeal constrictor$/, concept: "pharyngeal constrictors", system: "digestive", group: "muscle", layer: 3, midline: true },
  { re: /^(palatopharyngeus|salpingopharyngeus|stylopharyngeus|levator veli palatini|tensor veli palatini|uvular muscle|pharyngeal raphe|pterygomandibular raphe)$/, concept: "muscles of pharynx & soft palate", system: "digestive", group: "muscle", layer: 3, midline: true },
  { re: /^(genioglossus|hyoglossus)$/, concept: "extrinsic tongue muscles", system: "digestive", group: "muscle", layer: 3, midline: true },

  // ---------- urinary ----------
  { re: /^(kidney|ureter)$/, system: "urinary", group: "organ", layer: 3 },
  { re: /^(urinary bladder|urethra)$/, system: "urinary", group: "organ", layer: 3, midline: true },

  // ---------- reproductive (male) ----------
  { re: /^(testis|epididymis|deferent duct|seminal vesicle)$/, concept: (m) => (m[1] === "deferent duct" ? "ductus deferens" : m[1]), system: "reproductive", group: "organ", layer: 3, sex: "male" },
  { re: /^(prostate|corpus cavernosum of penis|corpus spongiosum of penis|glans penis)$/, concept: (m) => (m[1] === "prostate" ? "prostate" : "penis"), system: "reproductive", group: "organ", layer: 3, midline: true, sex: "male" },

  // ---------- endocrine / lymphatic ----------
  { re: /^adrenal gland$/, system: "endocrine", group: "gland", layer: 3 },
  { re: /^lobe of thymus$/, concept: "thymus", system: "lymphatic", group: "gland", layer: 3, midline: true },

  // ---------- muscular ----------
  { re: /^(clavicular|acromial|spinal) part of deltoid$/, concept: "deltoid", system: "muscular", group: "muscle", layer: 1 },
  { re: /^(descending|transverse|ascending) part of trapezius$/, concept: "trapezius", system: "muscular", group: "muscle", layer: 1 },
  { re: /^(clavicular|sternocostal|abdominal) part of pectoralis major$/, concept: "pectoralis major", system: "muscular", group: "muscle", layer: 1 },
  { re: /^(long|short) head of biceps brachii$/, concept: "biceps brachii", system: "muscular", group: "muscle", layer: 1 },
  { re: /^(long|lateral|medial) head of triceps brachii$/, concept: "triceps brachii", system: "muscular", group: "muscle", layer: 1 },
  { re: /^(long|short) head of biceps femoris$/, concept: "biceps femoris", system: "muscular", group: "muscle", layer: 1 },
  { re: /^(lateral|medial) head of gastrocnemius$/, concept: "gastrocnemius", system: "muscular", group: "muscle", layer: 1 },
  { re: /^(humeral|ulnar) head of (flexor carpi ulnaris|pronator teres)$/, concept: (m) => m[2], system: "muscular", group: "muscle", layer: 1 },
  { re: /^(oblique|transverse) head of (adductor pollicis|adductor hallucis)$/, concept: (m) => m[2], system: "muscular", group: "muscle", layer: 2 },
  { re: /^(lateral|medial) head of flexor hallucis brevis$/, concept: "flexor hallucis brevis", system: "muscular", group: "muscle", layer: 2 },
  { re: /^superficial head of flexor pollicis brevis$/, concept: "flexor pollicis brevis", system: "muscular", group: "muscle", layer: 1 },
  { re: /part of longus colli$/, concept: "longus colli", system: "muscular", group: "muscle", layer: 2 },
  { re: /^infraspinatus muscle$/, concept: "infraspinatus", system: "muscular", group: "muscle", layer: 1 },
  { re: /^(external|internal|innermost) intercostal muscle$/, concept: (m) => `${m[1]} intercostal muscles`, system: "muscular", group: "muscle", layer: 2 },
  { re: /(rotator|interspinal|intertransversari|levatores costarum|^spinalis$)/, concept: "deep back muscles (transversospinales)", system: "muscular", group: "muscle", layer: 2 },
  { re: /^(pubococcygeus|puborectalis|iliococcygeus|coccygeus)$/, concept: (m) => (m[1] === "coccygeus" ? "coccygeus" : "levator ani"), system: "muscular", group: "muscle", layer: 2 },
  { re: /^external anal sphincter$/, system: "muscular", group: "muscle", layer: 2, midline: true },
  { re: /^diaphragm$/, system: "muscular", group: "muscle", layer: 2 },
  { re: /^digastric$/, system: "muscular", group: "muscle", layer: 2 },
  { re: /^(set of )?(lumbricals of hand|dorsal interossei of hand|palmar interossei of hand)$/, concept: "intrinsic muscles of hand", system: "muscular", group: "muscle", layer: 2 },
  { re: /^(first|second|third|fourth) (lumbrical|plantar interosseous) of foot$/, concept: "intrinsic muscles of foot", system: "muscular", group: "muscle", layer: 2 },
  { re: /^(interosseous|lumbrical)/, concept: "intrinsic muscles of foot", system: "muscular", group: "muscle", layer: 2 },
  { re: TENDINOUS, system: "muscular", group: "tendon", layer: 1 },
  // any other muscle keeps its own name; layer decided by SUPERFICIAL_MUSCLES
  { re: /.*/, system: "muscular", group: "muscle", layer: 2 },
];

export function normalizeName(raw: string): { name: string; side?: Side } {
  let s = raw.trim().toLowerCase().replace(/\s+/g, " ");
  let side: Side | undefined;
  const m = s.match(/\b(left|right)\b/);
  if (m) {
    side = m[1] as Side;
    s = s.replace(/\b(left|right)\s+/g, "").replace(/\s+(left|right)\b/g, "");
  }
  return { name: s.trim(), side };
}

export function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface ClassifiedElement {
  el: Bp3dElement;
  concept: string;
  side?: Side;
  rule: Rule;
}

export function classify(el: Bp3dElement): ClassifiedElement | null {
  const { name, side } = normalizeName(el.rawName);
  if (!name) return null;
  for (const rule of RULES) {
    const m = name.match(rule.re);
    if (!m) continue;
    if (rule.drop) return null;
    const concept = typeof rule.concept === "function" ? rule.concept(m) : rule.concept ?? name;
    return { el, concept, side: rule.midline ? undefined : side, rule };
  }
  return null;
}

function isNearlySame(a: Bp3dElement, b: Bp3dElement) {
  if (a.vertexCount !== b.vertexCount) return false;
  for (let k = 0; k < 3; k++) {
    if (Math.abs(a.bounds.min[k] - b.bounds.min[k]) > 0.0006) return false;
    if (Math.abs(a.bounds.max[k] - b.bounds.max[k]) > 0.0006) return false;
  }
  return true;
}

/** Build the BodyParts3D-derived structure list. */
export function buildBp3dCatalog(elements: Bp3dElement[]): { structures: StructureSpec[]; unmatched: string[] } {
  const classified: ClassifiedElement[] = [];
  const unmatched: string[] = [];
  for (const el of elements) {
    const c = classify(el);
    if (!c) {
      if (el.rawName) unmatched.push(`${el.fj} ${el.rawName}`);
      continue;
    }
    // drop exact duplicates (BP3D lists some elements under several concepts)
    if (classified.some((o) => o.concept === c.concept && isNearlySame(o.el, el))) continue;
    classified.push(c);
  }

  // Concepts that exist on both sides of the midline without explicit laterality get a side by position.
  const byConcept = new Map<string, ClassifiedElement[]>();
  for (const c of classified) {
    const list = byConcept.get(c.concept) ?? [];
    list.push(c);
    byConcept.set(c.concept, list);
  }
  for (const list of byConcept.values()) {
    if (list[0].rule.midline) continue;
    const cx = (c: ClassifiedElement) => (c.el.bounds.min[0] + c.el.bounds.max[0]) / 2;
    const hasLeft = list.some((c) => cx(c) > 0.015);
    const hasRight = list.some((c) => cx(c) < -0.015);
    for (const c of list) {
      if (c.side) continue;
      if (hasLeft && hasRight) c.side = cx(c) > 0 ? "left" : "right";
    }
  }

  const structures = new Map<string, StructureSpec>();
  for (const c of classified) {
    const concept = c.concept;
    const cslug = slug(concept);
    const id = c.side ? `${cslug}-${c.side === "left" ? "l" : "r"}` : cslug;
    let s = structures.get(id);
    if (!s) {
      let layer = c.rule.layer;
      if (c.rule.system === "muscular" && c.rule.group === "muscle" && layer !== 1) {
        layer = SUPERFICIAL_MUSCLES.has(concept) ? 1 : 2;
      }
      if (c.rule.group === "vein" && SUPERFICIAL_VEINS.test(concept)) layer = 1;
      s = {
        id,
        name: c.side ? `${titleCase(c.side)} ${concept}` : titleCase(concept),
        concept: cslug,
        conceptName: titleCase(concept),
        side: c.side,
        system: c.rule.system,
        group: c.rule.group,
        layer,
        color: c.rule.color,
        source: { kind: "bp3d", elements: [] },
        sex: c.rule.sex,
      };
      structures.set(id, s);
    }
    (s.source as { kind: "bp3d"; elements: string[] }).elements.push(c.el.fj);
  }
  return { structures: [...structures.values()], unmatched };
}
