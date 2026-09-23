import type { ConceptInfo } from "./types";

/**
 * Knowledge entries for the visceral systems: nervous (brain, eye, cranial and peripheral
 * nerves), respiratory, digestive, urinary, reproductive (male and female), endocrine and
 * integumentary. Values are typical adult figures from standard references (Gray's, Moore,
 * Netter, Guyton & Hall, Kandel) and are hedged where they vary between individuals.
 *
 * Relation conventions used in nerve entries: "controls" = motor/secretomotor supply to a
 * target, "receives-from" = sensory (afferent) input from a territory, "gives-rise-to" /
 * "branch-of" = nerve branching.
 */
export const visceral: Record<string, ConceptInfo> = {
  // ─────────────────────────── Digestive: oral cavity & pharynx ───────────────────────────
  "gingiva": {
    summary:
      "The gingivae (gums) are the firm mucosa covering the alveolar processes of the maxilla and mandible and surrounding the necks of the teeth. Their surface epithelium is keratinized, and a junctional epithelium attaches to the tooth, sealing the tooth socket off from the mouth.",
    functions: [
      "Seals the junction between tooth and bone against oral bacteria",
      "Protects the alveolar bone and periodontal ligament from friction during chewing",
      "Attached gingiva is bound firmly to bone, resisting shear forces",
    ],
    facts: [
      { label: "Healthy gingival sulcus depth", value: "About 1–3 mm" },
      { label: "Surface epithelium", value: "Keratinized (or parakeratinized) stratified squamous" },
    ],
    connections: [
      { concept: "maxilla", relation: "attaches-to", note: "covers the alveolar process around the upper teeth" },
      { concept: "mandible", relation: "attaches-to", note: "covers the alveolar part around the lower teeth" },
      { concept: "upper-teeth", relation: "adjacent-to", note: "cuffs the necks of the teeth" },
      { concept: "lower-teeth", relation: "adjacent-to", note: "cuffs the necks of the teeth" },
    ],
    clinical:
      "Plaque-induced inflammation (gingivitis) makes the gums red, swollen and prone to bleeding and is reversible; if it progresses to periodontitis, the periodontal ligament and alveolar bone are destroyed — a leading cause of tooth loss in adults.",
  },

  "upper-teeth": {
    summary:
      "The upper (maxillary) teeth are set in sockets in the alveolar process of the maxilla. The adult permanent set has 16 upper teeth — in each half 2 incisors, 1 canine, 2 premolars and 3 molars — which meet the lower teeth to cut, tear and grind food.",
    functions: [
      "Incisors cut, canines tear, premolars and molars crush and grind food (mastication)",
      "Increase the surface area of food for digestive enzymes and help form a bolus",
      "Support the upper lip and help articulate speech sounds such as 'f', 'v' and 'th'",
    ],
    facts: [
      { label: "Permanent dentition", value: "32 teeth (per quadrant: 2 incisors, 1 canine, 2 premolars, 3 molars)" },
      { label: "Primary (deciduous) dentition", value: "20 teeth; permanent first molars erupt at about 6 years" },
      { label: "Enamel", value: "Hardest tissue in the body — about 96% mineral (hydroxyapatite) by weight" },
      { label: "Nerve supply", value: "Superior alveolar nerves (maxillary division of the trigeminal nerve, CN V2)" },
    ],
    connections: [
      { concept: "maxilla", relation: "attaches-to", note: "held in alveolar sockets by the periodontal ligament (a gomphosis)" },
      { concept: "lower-teeth", relation: "adjacent-to", note: "meet in occlusion when the jaw closes" },
      { concept: "gingiva", relation: "adjacent-to" },
      { concept: "tongue", relation: "adjacent-to" },
    ],
    clinical:
      "The roots of the upper molars and premolars lie close to the floor of the maxillary sinus, so a dental abscess can spread into the sinus and sinusitis can be felt as upper toothache.",
  },

  "lower-teeth": {
    summary:
      "The lower (mandibular) teeth are anchored in the alveolar part of the mandible. The 16 adult lower teeth mirror the upper set, and because the mandible moves against the fixed maxilla they are the mobile partner in biting and chewing.",
    functions: [
      "Bite and grind food against the upper teeth",
      "Break food into smaller particles to speed digestion",
      "Help articulate speech sounds",
    ],
    facts: [
      { label: "Nerve supply", value: "Inferior alveolar nerve (mandibular division of the trigeminal nerve, CN V3)" },
      { label: "Third molars (wisdom teeth)", value: "Usually erupt in the late teens to mid-twenties, if at all; lower ones are the most often impacted" },
    ],
    connections: [
      { concept: "mandible", relation: "attaches-to", note: "held in alveolar sockets by the periodontal ligament (a gomphosis)" },
      { concept: "upper-teeth", relation: "adjacent-to", note: "meet in occlusion" },
      { concept: "gingiva", relation: "adjacent-to" },
      { concept: "tongue", relation: "adjacent-to" },
    ],
    clinical:
      "An inferior alveolar nerve block, injected on the inner surface of the mandibular ramus, numbs all the lower teeth on one side together with the lower lip and chin; impacted lower third molars are a common reason for oral surgery.",
  },

  "tongue": {
    summary:
      "The tongue is a highly mobile muscular organ in the floor of the mouth, covered by mucosa bearing papillae and taste buds. Its intrinsic muscles change its shape and its extrinsic muscles change its position, making it essential for chewing, swallowing, taste and speech.",
    latin: "Lingua",
    functions: [
      "Positions food between the teeth and shapes it into a bolus",
      "Pushes the bolus back into the oropharynx to start swallowing",
      "Taste (gustation) and general sensation in the mouth",
      "Articulation of speech",
    ],
    facts: [
      { label: "Motor nerve", value: "Hypoglossal nerve (CN XII) for all tongue muscles except palatoglossus (vagus, CN X)" },
      { label: "Anterior two-thirds", value: "General sensation via the lingual nerve (CN V3); taste via the chorda tympani (CN VII)" },
      { label: "Posterior one-third", value: "General sensation and taste via the glossopharyngeal nerve (CN IX)" },
      { label: "Vallate papillae", value: "About 8–12, in a V-shaped row just in front of the sulcus terminalis" },
    ],
    connections: [
      { concept: "extrinsic-tongue-muscles", relation: "contains" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "root of the tongue anchored via hyoglossus" },
      { concept: "mandible", relation: "attaches-to", note: "via genioglossus from the mental spines" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "taste, anterior two-thirds (chorda tympani)" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "palatoglossus; sensation near the epiglottis" },
      { concept: "pharyngeal-constrictors", relation: "flows-to", note: "pushes the bolus into the oropharynx" },
      { concept: "epiglottis", relation: "adjacent-to", note: "the valleculae lie between the tongue root and epiglottis" },
      { concept: "submandibular-gland", relation: "adjacent-to", note: "its duct opens beside the lingual frenulum" },
      { concept: "sublingual-gland", relation: "adjacent-to", note: "lies beneath the tongue in the floor of the mouth" },
    ],
    clinical:
      "After a hypoglossal nerve lesion the protruded tongue deviates toward the paralysed side, because the healthy genioglossus pushes unopposed. The lateral border of the tongue and the floor of the mouth are the commonest sites of oral squamous cell carcinoma.",
  },

  "extrinsic-tongue-muscles": {
    summary:
      "Four paired muscles — genioglossus, hyoglossus, styloglossus and palatoglossus — arise outside the tongue and insert into it. They move the tongue as a whole: protrusion, retraction, elevation and depression.",
    functions: [
      "Genioglossus protrudes the tongue and depresses its centre, keeping it off the posterior pharyngeal wall",
      "Hyoglossus depresses and retracts the tongue",
      "Styloglossus retracts and elevates the tongue during swallowing",
      "Palatoglossus elevates the back of the tongue and narrows the oropharyngeal isthmus",
    ],
    origin:
      "Genioglossus: superior mental spine of the mandible; hyoglossus: body and greater horn of the hyoid; styloglossus: styloid process of the temporal bone; palatoglossus: palatine aponeurosis of the soft palate",
    insertion: "Into the substance of the tongue (dorsum, sides and root); lowest genioglossus fibres also reach the hyoid body",
    action: "Protrude, retract, elevate and depress the tongue",
    innervation: "Hypoglossal nerve (CN XII), except palatoglossus — vagus nerve (CN X) via the pharyngeal plexus",
    connections: [
      { concept: "tongue", relation: "part-of" },
      { concept: "mandible", relation: "attaches-to", note: "genioglossus origin" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "hyoglossus origin" },
      { concept: "temporal-bone", relation: "attaches-to", note: "styloglossus, from the styloid process" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "palatoglossus only" },
      { concept: "muscles-of-pharynx-soft-palate", relation: "adjacent-to", note: "palatoglossus blends with the soft palate" },
      { concept: "submandibular-gland", relation: "adjacent-to", note: "deep part of the gland lies on hyoglossus" },
    ],
    clinical:
      "In unconscious or deeply sedated patients, loss of genioglossus tone lets the tongue fall back and obstruct the airway — a jaw thrust or chin lift pulls it forward and reopens the airway.",
  },

  "sublingual-gland": {
    summary:
      "The sublingual gland is the smallest of the three pairs of major salivary glands. It lies in the floor of the mouth beneath the sublingual fold, between the mucosa and the mylohyoid muscle, and secretes mainly mucous saliva through many small ducts.",
    latin: "Glandula sublingualis",
    functions: [
      "Secretes predominantly mucous saliva that lubricates food and the oral surfaces",
      "Adds mucins and antimicrobial proteins to saliva",
    ],
    facts: [
      { label: "Ducts", value: "Roughly 8–20 small ducts opening along the sublingual fold; some join the submandibular duct" },
      { label: "Share of saliva", value: "Only a small fraction (roughly 5%) of total saliva" },
      { label: "Secretomotor supply", value: "Parasympathetic fibres of the facial nerve (chorda tympani) via the submandibular ganglion" },
    ],
    connections: [
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "parasympathetic via chorda tympani and submandibular ganglion" },
      { concept: "mylohyoid", relation: "adjacent-to", note: "rests on its upper surface" },
      { concept: "mandible", relation: "adjacent-to", note: "lies in the sublingual fossa" },
      { concept: "submandibular-gland", relation: "adjacent-to", note: "the submandibular duct runs along its medial side" },
      { concept: "tongue", relation: "adjacent-to" },
    ],
    clinical:
      "Rupture of a sublingual duct produces a ranula, a bluish mucus-filled swelling in the floor of the mouth that can extend below mylohyoid into the neck ('plunging ranula').",
  },

  "submandibular-gland": {
    summary:
      "The submandibular gland is a walnut-sized salivary gland under the body of the mandible. Its large superficial part lies in the submandibular triangle and wraps around the posterior border of mylohyoid into a deep part, from which the submandibular duct runs forward to open beside the lingual frenulum.",
    latin: "Glandula submandibularis",
    functions: [
      "Produces mixed serous and mucous saliva — the largest share of resting (unstimulated) saliva",
      "Saliva moistens food, begins starch digestion (salivary amylase), buffers acid and protects the teeth",
    ],
    facts: [
      { label: "Share of resting saliva", value: "Roughly 60–70%" },
      { label: "Total saliva", value: "About 1–1.5 L per day from all salivary glands" },
      { label: "Duct", value: "Submandibular (Wharton) duct, about 5 cm long, opening on the sublingual caruncle" },
    ],
    connections: [
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "parasympathetic via chorda tympani and submandibular ganglion" },
      { concept: "mylohyoid", relation: "adjacent-to", note: "gland wraps around its free posterior border" },
      { concept: "digastric", relation: "adjacent-to", note: "the two bellies bound the submandibular triangle" },
      { concept: "mandible", relation: "adjacent-to", note: "lies in the submandibular fossa" },
      { concept: "sublingual-gland", relation: "adjacent-to" },
      { concept: "extrinsic-tongue-muscles", relation: "adjacent-to", note: "deep part lies on hyoglossus" },
      { concept: "tongue", relation: "adjacent-to", note: "duct opens under the tongue" },
    ],
    clinical:
      "About 80% of salivary stones (sialolithiasis) form in the submandibular gland or duct, because its saliva is thicker and more alkaline and the duct drains upward; the classic symptom is painful swelling of the gland at mealtimes.",
  },

  "muscles-of-pharynx-soft-palate": {
    summary:
      "This group combines the longitudinal muscles of the pharynx (stylopharyngeus, palatopharyngeus, salpingopharyngeus) with the muscles of the soft palate (levator and tensor veli palatini, musculus uvulae, palatoglossus). Together they seal off the nasopharynx and raise and shorten the pharynx during swallowing and speech.",
    functions: [
      "Elevate and tense the soft palate to close the nasopharynx so food does not enter the nose",
      "Elevate and shorten the pharynx and larynx to receive the bolus",
      "Open the pharyngotympanic (auditory) tube during swallowing and yawning, equalizing middle-ear pressure",
      "Control nasal resonance in speech (velopharyngeal closure)",
    ],
    action: "Elevate/tense the soft palate; elevate and shorten the pharynx",
    innervation:
      "Pharyngeal plexus (vagus nerve, CN X) for most; stylopharyngeus — glossopharyngeal nerve (CN IX); tensor veli palatini — mandibular nerve (CN V3)",
    connections: [
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "via the pharyngeal plexus" },
      { concept: "pharyngeal-constrictors", relation: "adjacent-to", note: "longitudinal muscles run inside/between the constrictors" },
      { concept: "extrinsic-tongue-muscles", relation: "adjacent-to", note: "palatoglossus forms the palatoglossal arch" },
      { concept: "temporal-bone", relation: "attaches-to", note: "stylopharyngeus (styloid process); levator veli palatini (petrous part)" },
      { concept: "sphenoid-bone", relation: "attaches-to", note: "tensor veli palatini, hooking around the pterygoid hamulus" },
      { concept: "palatine-bone", relation: "attaches-to", note: "palatine aponeurosis at the posterior edge of the hard palate" },
    ],
    clinical:
      "With a unilateral vagus nerve lesion the soft palate droops on the affected side and the uvula deviates toward the healthy side when the patient says 'ah'. A cleft palate disrupts the levator and tensor veli palatini, contributing to nasal speech and middle-ear effusions.",
  },

  "pharyngeal-constrictors": {
    summary:
      "The superior, middle and inferior constrictors are three overlapping, curved sheets of skeletal muscle that form most of the pharyngeal wall. They insert posteriorly into a midline raphe and contract in sequence from above downward, squeezing the bolus into the esophagus.",
    latin: "Musculi constrictores pharyngis",
    functions: [
      "Propel the bolus down the pharynx by sequential (peristaltic) contraction",
      "Cricopharyngeus (lowest part of the inferior constrictor) acts as the upper esophageal sphincter, keeping air out of the esophagus",
      "Form the muscular wall of the pharynx, a passage shared by food and air",
    ],
    origin:
      "Superior: pterygoid hamulus, pterygomandibular raphe and mylohyoid line of the mandible; middle: stylohyoid ligament and horns of the hyoid; inferior: oblique line of the thyroid cartilage (thyropharyngeus) and the cricoid cartilage (cricopharyngeus)",
    insertion: "Pharyngeal raphe, attached above to the pharyngeal tubercle of the occipital bone",
    action: "Constrict the pharynx sequentially during swallowing",
    innervation: "Pharyngeal plexus — motor fibres from the vagus nerve (CN X)",
    connections: [
      { concept: "tongue", relation: "receives-from", note: "bolus pushed back from the oral cavity" },
      { concept: "esophagus", relation: "flows-to", note: "through the upper esophageal sphincter (cricopharyngeus)" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "via the pharyngeal plexus" },
      { concept: "occipital-bone", relation: "attaches-to", note: "pharyngeal raphe to the pharyngeal tubercle" },
      { concept: "mandible", relation: "attaches-to", note: "superior constrictor" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "middle constrictor" },
      { concept: "stylohyoid-ligament", relation: "attaches-to", note: "middle constrictor" },
      { concept: "thyroid-cartilage", relation: "attaches-to", note: "thyropharyngeus" },
      { concept: "cricoid-cartilage", relation: "attaches-to", note: "cricopharyngeus" },
      { concept: "muscles-of-pharynx-soft-palate", relation: "adjacent-to" },
    ],
    clinical:
      "A weak area between the thyropharyngeal and cricopharyngeal parts of the inferior constrictor (Killian's dehiscence) is where a pharyngeal pouch (Zenker diverticulum) forms, causing dysphagia, regurgitation of undigested food and bad breath.",
  },

  // ─────────────────────────── Digestive: alimentary tract (in food-flow order) ───────────────────────────
  "esophagus": {
    summary:
      "The esophagus is a muscular tube about 25 cm long that carries food from the pharynx to the stomach. It begins at the level of the cricoid cartilage (C6), descends behind the trachea and heart, and passes through the diaphragm at about T10 to join the stomach.",
    latin: "Oesophagus",
    functions: [
      "Transports food and liquid to the stomach by peristalsis (a swallow reaches the stomach in roughly 8–10 s)",
      "Upper and lower esophageal sphincters keep air out and prevent reflux of gastric contents",
      "Secretes mucus that lubricates the bolus",
    ],
    facts: [
      { label: "Length", value: "About 25 cm (incisor teeth to cardia ≈ 40 cm)" },
      { label: "Muscle", value: "Skeletal in the upper third, mixed in the middle third, smooth in the lower third" },
      { label: "Normal narrowings", value: "At its start (cricopharyngeus), where crossed by the aortic arch and left main bronchus, and at the diaphragm" },
      { label: "Lining", value: "Non-keratinized stratified squamous epithelium" },
    ],
    connections: [
      { concept: "pharyngeal-constrictors", relation: "receives-from", note: "bolus from the pharynx" },
      { concept: "stomach", relation: "flows-to", note: "through the cardiac orifice" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by", note: "cervical part" },
      { concept: "esophageal-arteries", relation: "supplied-by", note: "thoracic part, from the aorta" },
      { concept: "celiac-trunk-branches", relation: "supplied-by", note: "abdominal part, via the left gastric artery" },
      { concept: "azygos-system", relation: "drained-by", note: "thoracic part" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "abdominal part via the left gastric vein — a portosystemic anastomosis" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "esophageal plexus" },
      { concept: "trachea", relation: "adjacent-to", note: "esophagus lies directly behind it" },
      { concept: "atrium", relation: "adjacent-to", note: "left atrium lies just in front — basis of transesophageal echocardiography" },
      { concept: "diaphragm", relation: "adjacent-to", note: "passes through the esophageal hiatus at about T10" },
    ],
    clinical:
      "In portal hypertension, veins of the lower esophagus (where portal and systemic drainage meet) dilate into varices that can bleed massively. Chronic acid reflux can cause metaplasia of the lower esophageal lining (Barrett esophagus), a precursor of adenocarcinoma.",
  },

  "stomach": {
    summary:
      "The stomach is the J-shaped, expandable part of the digestive tract between the esophagus and duodenum, lying mainly in the left upper abdomen. It stores food, churns it with acidic gastric juice into semi-liquid chyme and releases it gradually through the pylorus.",
    latin: "Gaster (ventriculus)",
    functions: [
      "Stores and mixes food, then empties chyme gradually into the duodenum",
      "Parietal cells secrete hydrochloric acid (kills microbes, activates pepsin) and intrinsic factor (needed for vitamin B12 absorption in the ileum)",
      "Chief cells secrete pepsinogen, beginning protein digestion",
      "G cells in the antrum release gastrin, which stimulates acid secretion",
    ],
    facts: [
      { label: "Parts", value: "Cardia, fundus, body, pyloric antrum and pylorus (with the pyloric sphincter)" },
      { label: "Capacity", value: "About 1–1.5 L after a normal meal; it can stretch further" },
      { label: "Gastric juice", value: "Roughly 1.5–2 L per day, pH about 1.5–3.5" },
    ],
    connections: [
      { concept: "esophagus", relation: "receives-from", note: "through the cardiac orifice" },
      { concept: "duodenum", relation: "flows-to", note: "through the pylorus" },
      { concept: "celiac-trunk-branches", relation: "supplied-by", note: "left/right gastric, gastro-omental and short gastric arteries" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "gastric veins drain to the portal vein" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "stimulates acid secretion and motility" },
      { concept: "spleen", relation: "adjacent-to", note: "at the left of the fundus/greater curvature" },
      { concept: "pancreas", relation: "adjacent-to", note: "lies behind the stomach across the lesser sac (stomach bed)" },
      { concept: "liver-segment-iii", relation: "adjacent-to", note: "left lobe of the liver covers its anterior surface" },
      { concept: "diaphragm", relation: "adjacent-to" },
      { concept: "transverse-colon", relation: "adjacent-to", note: "joined by the greater omentum (gastrocolic ligament)" },
    ],
    clinical:
      "Peptic ulcers — usually due to Helicobacter pylori infection or NSAIDs — can bleed or perforate; a posterior gastric ulcer may erode into the pancreas or splenic artery. Loss of parietal cells in autoimmune gastritis removes intrinsic factor and causes pernicious anemia (vitamin B12 deficiency).",
  },

  "duodenum": {
    summary:
      "The duodenum is the first and shortest part of the small intestine, a C-shaped tube about 25 cm long curving around the head of the pancreas. Its descending part receives bile and pancreatic juice at the major duodenal papilla, so it is where acidic chyme is neutralized and chemical digestion accelerates.",
    functions: [
      "Neutralizes acidic chyme with bicarbonate from pancreatic juice, bile and duodenal (Brunner) glands",
      "Mixes chyme with bile (fat emulsification) and pancreatic enzymes",
      "Releases secretin and cholecystokinin (CCK), which drive pancreatic secretion and gallbladder contraction and slow gastric emptying",
      "Important site of iron and calcium absorption",
    ],
    facts: [
      { label: "Length", value: "About 25 cm, in four parts (superior, descending, horizontal, ascending)" },
      { label: "Major duodenal papilla", value: "In the descending part; bile duct and main pancreatic duct open here via the hepatopancreatic ampulla (of Vater)" },
      { label: "Peritoneum", value: "Mostly retroperitoneal, except the first ~2.5 cm (duodenal cap)" },
    ],
    connections: [
      { concept: "stomach", relation: "receives-from", note: "chyme through the pylorus" },
      { concept: "jejunum", relation: "flows-to", note: "at the duodenojejunal flexure" },
      { concept: "biliary-tree", relation: "receives-from", note: "bile via the common bile duct" },
      { concept: "pancreatic-duct", relation: "receives-from", note: "pancreatic juice at the major (and minor) papilla" },
      { concept: "celiac-trunk-branches", relation: "supplied-by", note: "gastroduodenal and superior pancreaticoduodenal arteries" },
      { concept: "superior-mesenteric-artery", relation: "supplied-by", note: "inferior pancreaticoduodenal arteries" },
      { concept: "hepatic-portal-system", relation: "drained-by" },
      { concept: "pancreas", relation: "adjacent-to", note: "curves around the pancreatic head" },
      { concept: "kidney", relation: "adjacent-to", note: "descending part lies in front of the right kidney" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "third part passes between the aorta behind and the SMA in front" },
    ],
    clinical:
      "Most duodenal ulcers occur in the first part; a posterior ulcer can erode the gastroduodenal artery and cause severe bleeding. Compression of the third part between the superior mesenteric artery and aorta can obstruct it (SMA syndrome).",
  },

  "jejunum": {
    summary:
      "The jejunum is the middle part of the small intestine, making up roughly the proximal two-fifths of the mobile small bowel. Suspended by the mesentery, it has a thick, highly folded wall and is the principal site for absorbing digested carbohydrates, proteins and fats.",
    functions: [
      "Absorbs most sugars, amino acids and peptides, fatty acids, water and electrolytes",
      "Completes digestion with brush-border enzymes (disaccharidases, peptidases)",
      "Mixes chyme by segmentation and propels it by peristalsis",
    ],
    facts: [
      { label: "Length", value: "Roughly 2.5 m in the cadaver (about 2/5 of jejunum + ileum)" },
      { label: "Small intestine overall", value: "About 6–7 m in the cadaver; shorter in life because of muscle tone" },
      { label: "Surface amplification", value: "Circular folds, villi and microvilli multiply the absorptive area many-fold (estimates range from ~30 m² to over 200 m², depending on method)" },
      { label: "Distinguishing features", value: "Wider, thicker, redder wall; tall, closely packed circular folds; long vasa recta; little mesenteric fat" },
    ],
    connections: [
      { concept: "duodenum", relation: "receives-from" },
      { concept: "ileum", relation: "flows-to", note: "no sharp boundary; gradual transition" },
      { concept: "superior-mesenteric-artery", relation: "supplied-by", note: "jejunal branches" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "via the superior mesenteric vein" },
      { concept: "mesentery-of-small-intestine", relation: "attaches-to", note: "suspended from the posterior abdominal wall" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "parasympathetic; increases motility and secretion" },
      { concept: "transverse-colon", relation: "adjacent-to", note: "jejunal loops lie mostly in the left upper infracolic area" },
    ],
    clinical:
      "In coeliac disease an immune reaction to gluten flattens the villi, most severely in the proximal small intestine (duodenum and jejunum), causing malabsorption, diarrhoea and iron deficiency.",
  },

  "ileum": {
    summary:
      "The ileum is the final and longest part of the small intestine, lying mostly in the lower right abdomen and pelvis and ending at the ileocecal valve. Its terminal part absorbs vitamin B12 and bile salts, and its wall contains abundant lymphoid tissue (Peyer's patches).",
    functions: [
      "Absorbs remaining nutrients, water and electrolytes",
      "Terminal ileum absorbs vitamin B12 (bound to intrinsic factor) and reabsorbs bile salts (enterohepatic circulation)",
      "Peyer's patches sample gut antigens and support mucosal immunity",
      "The ileocecal valve limits backflow of colonic contents",
    ],
    facts: [
      { label: "Length", value: "Roughly 3.5 m in the cadaver (about 3/5 of jejunum + ileum)" },
      { label: "Distinguishing features", value: "Thinner wall, lower and sparser circular folds, many arterial arcades with short vasa recta, more mesenteric fat, Peyer's patches" },
      { label: "Meckel diverticulum", value: "Present in about 2% of people, usually within about 60 cm of the ileocecal junction" },
    ],
    connections: [
      { concept: "jejunum", relation: "receives-from" },
      { concept: "ascending-colon", relation: "flows-to", note: "through the ileocecal valve into the cecum" },
      { concept: "superior-mesenteric-artery", relation: "supplied-by", note: "ileal and ileocolic branches" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "via the superior mesenteric vein" },
      { concept: "mesentery-of-small-intestine", relation: "attaches-to" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "parasympathetic" },
      { concept: "appendix", relation: "adjacent-to", note: "near the ileocecal junction" },
    ],
    clinical:
      "Crohn's disease most often affects the terminal ileum; ileal disease or resection can cause vitamin B12 deficiency and bile-acid diarrhoea. A Meckel diverticulum can bleed (it may contain gastric mucosa) or become inflamed and mimic appendicitis.",
  },

  "mesentery-of-small-intestine": {
    summary:
      "The mesentery is a fan-shaped double fold of peritoneum that suspends the jejunum and ileum from the posterior abdominal wall. Its short root runs obliquely across the back of the abdomen, while its intestinal border is pleated to follow several metres of bowel; between its layers run the vessels, lymphatics and nerves of the small intestine.",
    latin: "Mesenterium",
    functions: [
      "Suspends the jejunum and ileum while allowing them to move",
      "Carries jejunal and ileal branches of the superior mesenteric vessels, lymphatics (lacteals) and autonomic nerves",
      "Contains mesenteric lymph nodes and fat",
    ],
    facts: [
      { label: "Root length", value: "About 15 cm, from the duodenojejunal flexure (left of L2) to near the right sacroiliac joint" },
      { label: "Intestinal border", value: "Several metres long, matching the jejunum and ileum" },
    ],
    connections: [
      { concept: "jejunum", relation: "attaches-to", note: "suspends it" },
      { concept: "ileum", relation: "attaches-to", note: "suspends it" },
      { concept: "superior-mesenteric-artery", relation: "contains", note: "jejunal and ileal branches run between its layers" },
      { concept: "hepatic-portal-system", relation: "contains", note: "tributaries of the superior mesenteric vein" },
      { concept: "duodenum", relation: "adjacent-to", note: "root crosses the third part" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "root crosses in front of it" },
      { concept: "inferior-vena-cava", relation: "adjacent-to", note: "root crosses in front of it" },
      { concept: "ureter", relation: "adjacent-to", note: "root crosses the right ureter" },
      { concept: "psoas-major", relation: "adjacent-to", note: "root crosses the right psoas" },
    ],
    clinical:
      "Twisting of the bowel around the axis of the mesentery (volvulus), especially when intestinal rotation is abnormal (malrotation), can cut off the superior mesenteric blood supply and rapidly cause ischemic bowel.",
  },

  "appendix": {
    summary:
      "The vermiform appendix is a narrow, blind-ended tube that opens into the posteromedial wall of the cecum just below the ileocecal junction. Its position varies, and its wall is rich in lymphoid tissue.",
    latin: "Appendix vermiformis",
    functions: [
      "Contains gut-associated lymphoid tissue (mucosal immunity)",
      "Proposed reservoir of commensal gut bacteria (its role in humans is still debated)",
    ],
    facts: [
      { label: "Length", value: "Typically about 6–10 cm (range roughly 2–20 cm)" },
      { label: "Commonest position", value: "Retrocecal (behind the cecum)" },
      { label: "Surface marking of base", value: "McBurney's point — one-third of the way from the right anterior superior iliac spine to the umbilicus" },
    ],
    connections: [
      { concept: "superior-mesenteric-artery", relation: "supplied-by", note: "appendicular artery, from the ileocolic artery" },
      { concept: "hepatic-portal-system", relation: "drained-by" },
      { concept: "ascending-colon", relation: "adjacent-to", note: "arises from the cecum at the colon's lower end" },
      { concept: "ileum", relation: "adjacent-to" },
      { concept: "taeniae-coli", relation: "adjacent-to", note: "the three taeniae converge at its base" },
    ],
    clinical:
      "Appendicitis classically begins as vague periumbilical pain (referred visceral pain, T10) that shifts to the right iliac fossa once the parietal peritoneum is inflamed; untreated, the appendix can perforate and cause peritonitis. It is the most common cause of emergency abdominal surgery.",
  },

  "ascending-colon": {
    summary:
      "The ascending colon runs up the right side of the abdomen from the cecum to the right colic (hepatic) flexure beneath the liver. It is secondarily retroperitoneal and, like the rest of the colon, has taeniae coli, haustra and fatty omental appendices.",
    latin: "Colon ascendens",
    functions: [
      "Absorbs water and electrolytes, beginning to solidify the liquid contents received from the ileum",
      "Hosts dense bacteria that ferment undigested carbohydrate into short-chain fatty acids and make some vitamins (e.g. vitamin K)",
      "Moves contents slowly toward the transverse colon",
    ],
    facts: [
      { label: "Length", value: "Roughly 15 cm (varies)" },
      { label: "Large intestine overall", value: "About 1.5 m from cecum to anus" },
    ],
    connections: [
      { concept: "ileum", relation: "receives-from", note: "via the ileocecal valve and cecum" },
      { concept: "transverse-colon", relation: "flows-to", note: "at the right colic (hepatic) flexure" },
      { concept: "superior-mesenteric-artery", relation: "supplied-by", note: "ileocolic and right colic arteries" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "via the superior mesenteric vein" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "parasympathetic (midgut)" },
      { concept: "taeniae-coli", relation: "contains" },
      { concept: "appendix", relation: "adjacent-to" },
      { concept: "kidney", relation: "adjacent-to", note: "lies in front of the lower pole of the right kidney" },
      { concept: "liver-segment-vi", relation: "adjacent-to", note: "hepatic flexure lies under the right lobe" },
    ],
    clinical:
      "Cancers of the right colon often present with iron-deficiency anemia from occult bleeding rather than obstruction, because the lumen is wide and its contents are still fluid.",
  },

  "transverse-colon": {
    summary:
      "The transverse colon is the longest and most mobile part of the colon, hanging between the right (hepatic) and left (splenic) colic flexures on its own mesentery, the transverse mesocolon. The greater omentum is attached along it.",
    latin: "Colon transversum",
    functions: [
      "Continues absorption of water and electrolytes",
      "Bacterial fermentation; periodic mass movements propel contents toward the descending colon",
    ],
    facts: [
      { label: "Length", value: "About 45 cm" },
      { label: "Blood-supply boundary", value: "Proximal two-thirds from the middle colic artery (SMA); distal third from the left colic artery (IMA), linked by the marginal artery" },
    ],
    connections: [
      { concept: "ascending-colon", relation: "receives-from" },
      { concept: "descending-colon", relation: "flows-to", note: "at the left colic (splenic) flexure" },
      { concept: "superior-mesenteric-artery", relation: "supplied-by", note: "middle colic artery (proximal two-thirds)" },
      { concept: "inferior-mesenteric-artery", relation: "supplied-by", note: "left colic branches (distal third)" },
      { concept: "hepatic-portal-system", relation: "drained-by" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "proximal two-thirds; distal third by pelvic splanchnic nerves" },
      { concept: "transverse-mesocolon", relation: "attaches-to" },
      { concept: "taeniae-coli", relation: "contains" },
      { concept: "stomach", relation: "adjacent-to", note: "linked by the greater omentum (gastrocolic ligament)" },
      { concept: "spleen", relation: "adjacent-to", note: "at the splenic flexure" },
    ],
    clinical:
      "The splenic flexure lies at the junction of the superior and inferior mesenteric arterial territories — a watershed area that is especially vulnerable to ischemic colitis when blood pressure falls.",
  },

  "transverse-mesocolon": {
    summary:
      "The transverse mesocolon is the double fold of peritoneum that suspends the transverse colon from the posterior abdominal wall. Its root runs across the head and along the anterior border of the pancreas, dividing the peritoneal cavity into supracolic and infracolic compartments.",
    latin: "Mesocolon transversum",
    functions: [
      "Suspends the transverse colon and allows it to move",
      "Carries the middle colic vessels, lymphatics and nerves",
      "Forms a horizontal partition between the supracolic and infracolic compartments",
    ],
    connections: [
      { concept: "transverse-colon", relation: "attaches-to", note: "suspends it" },
      { concept: "superior-mesenteric-artery", relation: "contains", note: "middle colic artery" },
      { concept: "pancreas", relation: "adjacent-to", note: "root lies along its anterior surface" },
      { concept: "duodenum", relation: "adjacent-to", note: "root crosses the descending part" },
      { concept: "stomach", relation: "adjacent-to", note: "lies below the stomach and lesser sac" },
      { concept: "jejunum", relation: "adjacent-to", note: "small-bowel loops lie below it" },
    ],
    clinical:
      "Because its root lies along the pancreas, pancreatic inflammation or tumours can spread into the transverse mesocolon and involve the middle colic vessels. In a retrocolic gastrojejunostomy a jejunal loop is brought up through an opening in it.",
  },

  "descending-colon": {
    summary:
      "The descending colon runs down the left side of the abdomen from the left colic (splenic) flexure to the pelvic brim, where it continues as the sigmoid colon. It is secondarily retroperitoneal and receives hindgut blood from the inferior mesenteric artery.",
    latin: "Colon descendens",
    functions: [
      "Stores and further dehydrates feces",
      "Moves feces toward the sigmoid colon and rectum by mass movements, often after meals (gastrocolic reflex)",
    ],
    facts: [
      { label: "Length", value: "About 25–30 cm" },
      { label: "Parasympathetic supply", value: "Pelvic splanchnic nerves (S2–S4) — not the vagus" },
    ],
    connections: [
      { concept: "transverse-colon", relation: "receives-from" },
      { concept: "rectum", relation: "flows-to", note: "via the sigmoid colon" },
      { concept: "inferior-mesenteric-artery", relation: "supplied-by", note: "left colic and sigmoid arteries" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "via the inferior mesenteric vein" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "parasympathetic via pelvic splanchnic nerves (S2–S4)" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "sympathetic via lumbar splanchnic nerves" },
      { concept: "taeniae-coli", relation: "contains" },
      { concept: "kidney", relation: "adjacent-to", note: "lies along the lateral border of the left kidney" },
      { concept: "spleen", relation: "adjacent-to", note: "near the splenic flexure" },
    ],
    clinical:
      "Diverticular disease in Western populations mostly affects the sigmoid and descending colon. Left-sided colorectal cancers more often cause obstruction and a change in bowel habit than right-sided ones.",
  },

  "taeniae-coli": {
    summary:
      "The taeniae coli are three narrow longitudinal bands formed by the concentrated outer longitudinal muscle of the cecum and colon. Because they are shorter than the colon, they gather its wall into sacculations called haustra.",
    functions: [
      "Provide the longitudinal muscle of the colon; their contraction shortens it",
      "Bunch the colonic wall into haustra",
      "Converge on the base of the appendix and spread out into a continuous layer at the rectosigmoid junction",
    ],
    facts: [
      { label: "Named bands", value: "Taenia mesocolica, taenia omentalis and taenia libera" },
      { label: "Width", value: "Roughly 1 cm each" },
    ],
    connections: [
      { concept: "ascending-colon", relation: "part-of" },
      { concept: "transverse-colon", relation: "part-of" },
      { concept: "descending-colon", relation: "part-of" },
      { concept: "appendix", relation: "adjacent-to", note: "converge on its base" },
      { concept: "rectum", relation: "adjacent-to", note: "fan out into a continuous muscle layer where the rectum begins" },
    ],
    clinical:
      "Following the taeniae to where they converge is a reliable way for surgeons to find the base of the appendix, whatever its position. Their absence helps distinguish rectum and small intestine from colon.",
  },

  "rectum": {
    summary:
      "The rectum is the terminal part of the large intestine, continuing from the sigmoid colon at about S3 and following the curve of the sacrum to the anorectal junction, where it passes through the pelvic floor into the anal canal. It lacks taeniae, haustra and omental appendices and has a distensible ampulla that stores feces.",
    functions: [
      "Stores feces until defecation is convenient",
      "Stretch receptors signal the urge to defecate and trigger relaxation of the internal anal sphincter",
      "Expels feces during defecation, aided by abdominal pressure and relaxation of puborectalis and the external anal sphincter",
    ],
    facts: [
      { label: "Length", value: "About 12–15 cm" },
      { label: "Transverse rectal folds", value: "Usually three" },
      { label: "Venous drainage", value: "Superior rectal vein → portal system; middle and inferior rectal veins → internal iliac veins (a portosystemic anastomosis)" },
    ],
    connections: [
      { concept: "descending-colon", relation: "receives-from", note: "via the sigmoid colon" },
      { concept: "inferior-mesenteric-artery", relation: "supplied-by", note: "superior rectal artery" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "middle and inferior rectal arteries" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "superior rectal vein" },
      { concept: "internal-iliac-vein", relation: "drained-by", note: "middle and inferior rectal veins" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "parasympathetic via pelvic splanchnic nerves (S2–S4)" },
      { concept: "levator-ani", relation: "adjacent-to", note: "puborectalis slings around the anorectal junction" },
      { concept: "external-anal-sphincter", relation: "adjacent-to", note: "continues into the anal canal encircled by the sphincters" },
      { concept: "prostate", relation: "adjacent-to", note: "male: in front of the lower rectum" },
      { concept: "vagina", relation: "adjacent-to", note: "female: in front of the rectum" },
    ],
    sexDifferences:
      "In males the bladder, seminal vesicles, ampullae of the ductus deferens and prostate lie in front of the rectum (rectovesical pouch above). In females the vagina and cervix lie in front, with the rectouterine pouch (of Douglas) — the lowest point of the female peritoneal cavity — between rectum and uterus.",
    clinical:
      "Digital rectal examination palpates the prostate in males and the cervix in females through the anterior rectal wall. The rectum is a common site of colorectal cancer, and its dual venous drainage means tumours can spread to the liver (portal) or directly to the lungs (systemic).",
  },

  // ─────────────────────────── Digestive: accessory organs ───────────────────────────
  "biliary-tree": {
    summary:
      "The biliary tree is the system of ducts that carries bile from liver cells to the duodenum. Bile canaliculi join into intrahepatic ducts and then the right and left hepatic ducts, which form the common hepatic duct; this joins the cystic duct from the gallbladder to form the common bile duct, which ends with the main pancreatic duct at the major duodenal papilla.",
    latin: "Ductus biliferi",
    functions: [
      "Carries bile from hepatocytes to the gallbladder for storage and to the duodenum",
      "Delivers bile salts that emulsify fats and aid absorption of fats and fat-soluble vitamins (A, D, E, K)",
      "Route for excretion of bilirubin, excess cholesterol and some drugs",
      "The sphincter of Oddi regulates entry of bile and pancreatic juice into the duodenum",
    ],
    facts: [
      { label: "Bile production", value: "About 0.6–1 L per day" },
      { label: "Common bile duct", value: "About 5–15 cm long; passes behind the first part of the duodenum and through the back of the pancreatic head" },
      { label: "Pathway", value: "Right/left hepatic ducts → common hepatic duct (+ cystic duct) → common bile duct → hepatopancreatic ampulla → duodenum" },
    ],
    connections: [
      { concept: "liver-segment-iv", relation: "receives-from", note: "left hepatic duct drains segments II–IV" },
      { concept: "liver-segment-v", relation: "receives-from", note: "right hepatic duct drains segments V–VIII" },
      { concept: "gallbladder", relation: "flows-to", note: "via the cystic duct, for storage and concentration" },
      { concept: "duodenum", relation: "secretes-into", note: "common bile duct opens at the major duodenal papilla" },
      { concept: "pancreatic-duct", relation: "adjacent-to", note: "unites with it at the hepatopancreatic ampulla" },
      { concept: "pancreas", relation: "adjacent-to", note: "bile duct runs behind/through the pancreatic head" },
      { concept: "hepatic-portal-system", relation: "adjacent-to", note: "bile duct, portal vein and hepatic artery form the portal triad in the hepatoduodenal ligament" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "bile ducts depend mainly on arterial blood" },
    ],
    clinical:
      "A gallstone in the common bile duct causes obstructive jaundice and can trigger acute pancreatitis if it blocks the ampulla. Cancer of the pancreatic head typically compresses the bile duct, causing painless jaundice with a palpable, non-tender gallbladder (Courvoisier's sign).",
  },

  "gallbladder": {
    summary:
      "The gallbladder is a pear-shaped sac lying in a fossa on the visceral surface of the liver, between Couinaud segments IVb and V. It stores and concentrates bile between meals and contracts to release it into the duodenum when fatty chyme arrives.",
    latin: "Vesica biliaris (vesica fellea)",
    functions: [
      "Stores bile between meals",
      "Concentrates bile several-fold by absorbing water and electrolytes",
      "Contracts in response to cholecystokinin (CCK) while the sphincter of Oddi relaxes, delivering bile to the duodenum",
    ],
    facts: [
      { label: "Capacity", value: "About 30–50 mL" },
      { label: "Concentrating power", value: "Typically about 5- to 10-fold" },
      { label: "Parts", value: "Fundus, body and neck, draining through the cystic duct" },
      { label: "Surface marking of fundus", value: "Tip of the right 9th costal cartilage, at the lateral edge of rectus abdominis" },
    ],
    connections: [
      { concept: "biliary-tree", relation: "receives-from", note: "hepatic bile enters via the cystic duct" },
      { concept: "duodenum", relation: "secretes-into", note: "via the cystic and common bile ducts; its body and neck also lie against the duodenum" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "cystic artery, usually from the right hepatic artery" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "cystic veins, largely directly into the liver" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "parasympathetic via hepatic branches" },
      { concept: "liver-segment-iv", relation: "adjacent-to", note: "gallbladder fossa borders segment IVb" },
      { concept: "liver-segment-v", relation: "adjacent-to", note: "gallbladder fossa borders segment V" },
      { concept: "transverse-colon", relation: "adjacent-to", note: "fundus contacts the transverse colon" },
    ],
    clinical:
      "A gallstone impacted in the cystic duct causes biliary colic or acute cholecystitis, with right upper quadrant pain that may be referred to the right shoulder (diaphragmatic irritation, phrenic nerve C3–C5). During cholecystectomy the cystic duct and artery are identified in the hepatocystic triangle (of Calot) to avoid injuring the common bile duct.",
  },

  "pancreas": {
    summary:
      "The pancreas is an elongated, soft gland lying mostly behind the stomach across the posterior abdominal wall, with its head in the C-loop of the duodenum and its tail reaching the spleen. It is both an exocrine gland (digestive enzymes and bicarbonate) and an endocrine gland (insulin, glucagon and other hormones from the islets of Langerhans).",
    functions: [
      "Acinar cells secrete digestive enzymes (trypsinogen, chymotrypsinogen, amylase, lipase, nucleases) into the duodenum",
      "Duct cells secrete bicarbonate-rich fluid that neutralizes gastric acid",
      "Islet beta cells secrete insulin, alpha cells glucagon, delta cells somatostatin",
      "Central regulator of blood glucose",
    ],
    facts: [
      { label: "Length", value: "About 12–15 cm; head (with uncinate process), neck, body and tail" },
      { label: "Pancreatic juice", value: "About 1–1.5 L per day" },
      { label: "Islets of Langerhans", value: "Roughly 1 million islets, making up only about 1–2% of pancreatic mass" },
    ],
    connections: [
      { concept: "duodenum", relation: "secretes-into", note: "via the main pancreatic duct at the major duodenal papilla; the head sits in the duodenal C-loop" },
      { concept: "pancreatic-duct", relation: "contains" },
      { concept: "celiac-trunk-branches", relation: "supplied-by", note: "pancreatic branches of the splenic artery; superior pancreaticoduodenal arteries" },
      { concept: "superior-mesenteric-artery", relation: "supplied-by", note: "inferior pancreaticoduodenal arteries; the SMA passes behind the neck" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "splenic and superior mesenteric veins; the portal vein forms behind the neck" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "parasympathetic; stimulates secretion" },
      { concept: "stomach", relation: "adjacent-to", note: "lies behind the stomach, across the lesser sac" },
      { concept: "spleen", relation: "adjacent-to", note: "tail reaches the splenic hilum" },
      { concept: "kidney", relation: "adjacent-to", note: "body and tail lie in front of the left kidney" },
    ],
    clinical:
      "Acute pancreatitis, most often caused by gallstones or alcohol, results from premature activation of enzymes that digest the gland, causing severe epigastric pain radiating to the back. Carcinoma of the pancreatic head often presents with painless obstructive jaundice because the bile duct runs through the head.",
  },

  "pancreatic-duct": {
    summary:
      "The main pancreatic duct runs the length of the pancreas from tail to head, collecting pancreatic juice from many small tributaries. In the head it usually joins the common bile duct to form the hepatopancreatic ampulla, which opens at the major duodenal papilla; an accessory duct often opens separately at the minor papilla.",
    latin: "Ductus pancreaticus",
    functions: [
      "Carries enzyme- and bicarbonate-rich pancreatic juice to the duodenum",
      "Its sphincter (part of the sphincter of Oddi complex) helps prevent reflux of bile and duodenal contents",
    ],
    facts: [
      { label: "Openings", value: "Main duct (of Wirsung) at the major duodenal papilla; accessory duct (of Santorini) at the minor papilla, about 2 cm higher" },
      { label: "Normal calibre", value: "Roughly 3 mm in the head, tapering toward the tail" },
    ],
    connections: [
      { concept: "pancreas", relation: "part-of" },
      { concept: "duodenum", relation: "secretes-into", note: "at the major duodenal papilla" },
      { concept: "biliary-tree", relation: "adjacent-to", note: "joins the common bile duct at the hepatopancreatic ampulla" },
    ],
    clinical:
      "Obstruction at the ampulla (for example by a gallstone) can cause acute pancreatitis. In pancreas divisum — failed fusion of the embryonic dorsal and ventral ducts, present in roughly 5–10% of people — most juice drains through the minor papilla.",
  },

  // ─────────────────────────── Liver: Couinaud segments ───────────────────────────
  "liver-segment-i-caudate-lobe": {
    summary:
      "Segment I is the caudate lobe, a small posterior part of the liver lying against the front of the inferior vena cava, between the IVC and the fissure for the ligamentum venosum. It is functionally unique: it receives portal and arterial branches from both the right and left sides and drains through several short hepatic veins directly into the IVC.",
    latin: "Lobus caudatus (segmentum I)",
    functions: [
      "Performs the liver's metabolic, synthetic (e.g. albumin, clotting factors), detoxifying and bile-forming work",
      "Has venous outflow independent of the three main hepatic veins",
    ],
    facts: [
      { label: "Liver as a whole", value: "About 1.4–1.6 kg; the largest gland in the body" },
      { label: "Liver blood supply", value: "About 75% from the portal vein and 25% from the hepatic artery; roughly a quarter of resting cardiac output" },
      { label: "Couinaud system", value: "Eight functionally independent segments (Couinaud, 1957), each with its own portal pedicle and bile drainage, separated by planes of the hepatic veins" },
      { label: "Venous drainage", value: "Short hepatic veins straight into the IVC" },
    ],
    connections: [
      { concept: "hepatic-portal-system", relation: "receives-from", note: "branches of both right and left portal veins" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "branches of both right and left hepatic arteries" },
      { concept: "inferior-vena-cava", relation: "drained-by", note: "short hepatic veins open directly into it" },
      { concept: "biliary-tree", relation: "flows-to", note: "bile into both right and left hepatic ducts" },
      { concept: "liver-segment-ix", relation: "adjacent-to", note: "paracaval tissue sometimes separated as segment IX" },
      { concept: "liver-segment-ii", relation: "adjacent-to", note: "separated by the fissure for the ligamentum venosum" },
      { concept: "liver-segment-iv", relation: "adjacent-to", note: "the porta hepatis lies between them" },
      { concept: "liver-segment-vii", relation: "adjacent-to" },
    ],
    clinical:
      "In Budd–Chiari syndrome (hepatic vein obstruction) the caudate lobe often enlarges, because its separate drainage into the IVC is spared. Its deep position against the IVC makes isolated caudate resection one of the most demanding liver operations.",
  },

  "liver-segment-ii": {
    summary:
      "Segment II is the posterosuperior part of the left lateral section of the liver, lying to the left of the falciform ligament beneath the left dome of the diaphragm. It sits above segment III; together they form the left lateral section.",
    facts: [
      { label: "Functional side", value: "Left liver (segments II–IV)" },
      { label: "Portal inflow", value: "Segment II branch of the left portal vein, with the left hepatic artery" },
      { label: "Venous drainage", value: "Left hepatic vein" },
      { label: "Bile drainage", value: "Left hepatic duct" },
    ],
    connections: [
      { concept: "hepatic-portal-system", relation: "receives-from", note: "left portal vein" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "left hepatic artery" },
      { concept: "hepatic-veins", relation: "drained-by", note: "left hepatic vein" },
      { concept: "biliary-tree", relation: "flows-to", note: "left hepatic duct" },
      { concept: "liver-segment-iii", relation: "adjacent-to", note: "lies below/in front" },
      { concept: "liver-segment-iv", relation: "adjacent-to", note: "across the falciform ligament/umbilical fissure" },
      { concept: "liver-segment-i-caudate-lobe", relation: "adjacent-to", note: "across the fissure for the ligamentum venosum" },
      { concept: "diaphragm", relation: "adjacent-to", note: "under the left dome" },
      { concept: "stomach", relation: "adjacent-to", note: "overlies the upper stomach" },
      { concept: "esophagus", relation: "adjacent-to", note: "abdominal esophagus grooves its posterior surface" },
    ],
    clinical:
      "Segments II and III (the left lateral section) are often removed together — for tumours, or as the standard living-donor graft for liver transplantation in small children.",
  },

  "liver-segment-iii": {
    summary:
      "Segment III is the anteroinferior part of the left lateral section, lying to the left of the falciform ligament and round ligament (ligamentum teres), below segment II. Its visceral surface covers the front of the stomach.",
    facts: [
      { label: "Functional side", value: "Left liver" },
      { label: "Portal inflow", value: "Segment III branch from the umbilical portion of the left portal vein, with the left hepatic artery" },
      { label: "Venous drainage", value: "Left hepatic vein" },
      { label: "Bile drainage", value: "Left hepatic duct" },
    ],
    connections: [
      { concept: "hepatic-portal-system", relation: "receives-from", note: "left portal vein" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "left hepatic artery" },
      { concept: "hepatic-veins", relation: "drained-by", note: "left hepatic vein" },
      { concept: "biliary-tree", relation: "flows-to", note: "left hepatic duct" },
      { concept: "liver-segment-ii", relation: "adjacent-to" },
      { concept: "liver-segment-iv", relation: "adjacent-to", note: "separated by the umbilical fissure and round ligament" },
      { concept: "stomach", relation: "adjacent-to", note: "covers its anterior surface" },
    ],
    clinical:
      "The segment III bile duct can be reached by following the round ligament, allowing a surgical bypass (segment III hepaticojejunostomy) when tumour blocks the hepatic duct confluence. Segment III is part of the left lateral graft used in paediatric living-donor transplantation.",
  },

  "liver-segment-iv": {
    summary:
      "Segment IV is the medial part of the functional left liver, lying between the falciform ligament/umbilical fissure on the left and the plane of the middle hepatic vein (Cantlie's line, from the gallbladder fossa to the IVC) on the right. It is divided into IVa (superior) and IVb (inferior, roughly the anatomical quadrate lobe), and the gallbladder lies against its lower right border.",
    facts: [
      { label: "Functional side", value: "Left liver — even though it lies to the right of the falciform ligament" },
      { label: "Portal inflow", value: "Branches from the umbilical portion of the left portal vein, with left-sided hepatic arterial branches" },
      { label: "Venous drainage", value: "Mainly the middle hepatic vein (partly the left)" },
      { label: "Subsegments", value: "IVa (superior) and IVb (inferior ≈ quadrate lobe)" },
    ],
    connections: [
      { concept: "hepatic-portal-system", relation: "receives-from", note: "left portal vein (umbilical portion)" },
      { concept: "hepatic-arteries", relation: "supplied-by" },
      { concept: "hepatic-veins", relation: "drained-by", note: "middle hepatic vein" },
      { concept: "biliary-tree", relation: "flows-to", note: "left hepatic duct" },
      { concept: "gallbladder", relation: "adjacent-to", note: "gallbladder fossa borders IVb" },
      { concept: "liver-segment-iii", relation: "adjacent-to", note: "across the umbilical fissure" },
      { concept: "liver-segment-v", relation: "adjacent-to", note: "across Cantlie's line (middle hepatic vein plane)" },
      { concept: "liver-segment-viii", relation: "adjacent-to", note: "across Cantlie's line (IVa)" },
      { concept: "liver-segment-i-caudate-lobe", relation: "adjacent-to", note: "the porta hepatis lies between them" },
    ],
    clinical:
      "Segment IV is removed with II and III in a left hepatectomy, or added to V–VIII in an extended right hepatectomy (right trisectionectomy). Gallbladder cancer often invades the adjacent segments IVb and V.",
  },

  "liver-segment-v": {
    summary:
      "Segment V is the inferior segment of the right anterior section, lying just to the right of Cantlie's line below the plane of the portal vein bifurcation. The gallbladder bed lies partly on it, and its lower surface faces the hepatic flexure of the colon and the duodenum.",
    facts: [
      { label: "Functional side", value: "Right liver — right anterior section (with VIII)" },
      { label: "Portal inflow", value: "Right anterior portal pedicle (right portal vein and right hepatic artery branches)" },
      { label: "Venous drainage", value: "Middle and right hepatic veins" },
      { label: "Bile drainage", value: "Right anterior duct → right hepatic duct" },
    ],
    connections: [
      { concept: "hepatic-portal-system", relation: "receives-from", note: "right portal vein, anterior branch" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "right hepatic artery" },
      { concept: "hepatic-veins", relation: "drained-by", note: "middle and right hepatic veins" },
      { concept: "biliary-tree", relation: "flows-to", note: "right hepatic duct" },
      { concept: "gallbladder", relation: "adjacent-to", note: "gallbladder bed" },
      { concept: "liver-segment-iv", relation: "adjacent-to" },
      { concept: "liver-segment-vi", relation: "adjacent-to" },
      { concept: "liver-segment-viii", relation: "adjacent-to", note: "lies above it" },
      { concept: "transverse-colon", relation: "adjacent-to", note: "hepatic flexure" },
      { concept: "duodenum", relation: "adjacent-to" },
    ],
    clinical:
      "Segment V is removed with VI–VIII in a right hepatectomy, or with VIII in a right anterior sectionectomy. Together with IVb it is resected in radical surgery for gallbladder cancer, which spreads directly into the gallbladder bed.",
  },

  "liver-segment-vi": {
    summary:
      "Segment VI is the inferior segment of the right posterior section, forming the lowest and most lateral part of the right liver. Its visceral surface rests on the right kidney and the right colic (hepatic) flexure.",
    facts: [
      { label: "Functional side", value: "Right liver — right posterior section (with VII)" },
      { label: "Portal inflow", value: "Right posterior portal pedicle" },
      { label: "Venous drainage", value: "Right hepatic vein (sometimes also an inferior right hepatic vein draining directly into the IVC)" },
      { label: "Bile drainage", value: "Right posterior duct → right hepatic duct" },
    ],
    connections: [
      { concept: "hepatic-portal-system", relation: "receives-from", note: "right portal vein, posterior branch" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "right hepatic artery" },
      { concept: "hepatic-veins", relation: "drained-by", note: "right hepatic vein" },
      { concept: "biliary-tree", relation: "flows-to", note: "right hepatic duct" },
      { concept: "liver-segment-v", relation: "adjacent-to" },
      { concept: "liver-segment-vii", relation: "adjacent-to", note: "lies above it" },
      { concept: "kidney", relation: "adjacent-to", note: "right kidney; the hepatorenal recess (Morison's pouch) lies between" },
      { concept: "ascending-colon", relation: "adjacent-to", note: "hepatic flexure" },
    ],
    clinical:
      "The hepatorenal recess (Morison's pouch) between segment VI and the right kidney is the lowest part of the upper abdomen in a supine patient, so free fluid or blood collects there and is looked for on FAST ultrasound after trauma.",
  },

  "liver-segment-vii": {
    summary:
      "Segment VII is the superior segment of the right posterior section, lying high and posteriorly beneath the right dome of the diaphragm, near the bare area of the liver, the right adrenal gland and the inferior vena cava.",
    facts: [
      { label: "Functional side", value: "Right liver — right posterior section (with VI)" },
      { label: "Portal inflow", value: "Right posterior portal pedicle" },
      { label: "Venous drainage", value: "Right hepatic vein" },
      { label: "Bile drainage", value: "Right posterior duct → right hepatic duct" },
    ],
    connections: [
      { concept: "hepatic-portal-system", relation: "receives-from", note: "right portal vein, posterior branch" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "right hepatic artery" },
      { concept: "hepatic-veins", relation: "drained-by", note: "right hepatic vein" },
      { concept: "biliary-tree", relation: "flows-to", note: "right hepatic duct" },
      { concept: "liver-segment-vi", relation: "adjacent-to" },
      { concept: "liver-segment-viii", relation: "adjacent-to" },
      { concept: "liver-segment-i-caudate-lobe", relation: "adjacent-to" },
      { concept: "diaphragm", relation: "adjacent-to", note: "under the right dome; bare area" },
      { concept: "adrenal-gland", relation: "adjacent-to", note: "right adrenal gland" },
      { concept: "inferior-vena-cava", relation: "adjacent-to" },
      { concept: "inferior-lobe-of-lung", relation: "adjacent-to", note: "above, across the diaphragm and pleura" },
    ],
    clinical:
      "Lesions in segment VII are tucked under the ribs and diaphragm, making laparoscopic access difficult, and percutaneous needles aimed here may cross the pleural recess and cause a pneumothorax. It is removed in a right hepatectomy or right posterior sectionectomy (VI + VII).",
  },

  "liver-segment-viii": {
    summary:
      "Segment VIII is the superior segment of the right anterior section, lying high beneath the diaphragm between the planes of the middle and right hepatic veins, close to where the hepatic veins enter the inferior vena cava.",
    facts: [
      { label: "Functional side", value: "Right liver — right anterior section (with V)" },
      { label: "Portal inflow", value: "Right anterior portal pedicle" },
      { label: "Venous drainage", value: "Middle and right hepatic veins" },
      { label: "Bile drainage", value: "Right anterior duct → right hepatic duct" },
    ],
    connections: [
      { concept: "hepatic-portal-system", relation: "receives-from", note: "right portal vein, anterior branch" },
      { concept: "hepatic-arteries", relation: "supplied-by", note: "right hepatic artery" },
      { concept: "hepatic-veins", relation: "drained-by", note: "middle and right hepatic veins" },
      { concept: "biliary-tree", relation: "flows-to", note: "right hepatic duct" },
      { concept: "liver-segment-v", relation: "adjacent-to", note: "lies below it" },
      { concept: "liver-segment-vii", relation: "adjacent-to" },
      { concept: "liver-segment-iv", relation: "adjacent-to", note: "across Cantlie's line (IVa)" },
      { concept: "diaphragm", relation: "adjacent-to" },
      { concept: "inferior-vena-cava", relation: "adjacent-to", note: "near the hepatic vein confluence" },
    ],
    clinical:
      "Tumours in segment VIII often lie close to the confluence of the right and middle hepatic veins with the IVC, so resection demands careful control of these large veins. It is removed with V in a right anterior sectionectomy or as part of a right hepatectomy.",
  },

  "liver-segment-ix": {
    summary:
      "'Segment IX' is a label some authors (including Couinaud in his later work) use for the right, paracaval part of the caudate region — liver tissue directly in front of and to the right of the inferior vena cava, below the hepatic vein confluence. Most clinical descriptions do not use it and count this tissue as part of segment I.",
    facts: [
      { label: "Status", value: "Optional subdivision; most reports use segments I–VIII only" },
      { label: "Venous drainage", value: "Small veins directly into the IVC, like the rest of the caudate region" },
    ],
    connections: [
      { concept: "liver-segment-i-caudate-lobe", relation: "adjacent-to", note: "often regarded as part of it" },
      { concept: "hepatic-portal-system", relation: "receives-from" },
      { concept: "hepatic-arteries", relation: "supplied-by" },
      { concept: "inferior-vena-cava", relation: "drained-by", note: "short veins directly into the IVC" },
      { concept: "biliary-tree", relation: "flows-to" },
      { concept: "liver-segment-vii", relation: "adjacent-to" },
      { concept: "liver-segment-viii", relation: "adjacent-to" },
    ],
    clinical:
      "The distinction matters mainly to hepatobiliary surgeons: a complete caudate resection must include this paracaval tissue and control its short veins entering the IVC.",
  },

  // ─────────────────────────── Respiratory: larynx ───────────────────────────
  "epiglottis": {
    summary:
      "The epiglottis is a leaf-shaped plate of elastic cartilage, covered with mucosa, projecting upward behind the root of the tongue at the entrance (inlet) of the larynx. During swallowing the larynx rises and the epiglottis tips backward over the inlet, steering food and liquid toward the esophagus.",
    functions: [
      "Helps close the laryngeal inlet during swallowing, protecting the airway",
      "Diverts the bolus sideways into the piriform recesses toward the esophagus",
      "Forms the anterior boundary of the laryngeal inlet together with the aryepiglottic folds",
    ],
    facts: [
      { label: "Cartilage type", value: "Elastic cartilage" },
      { label: "Attachments", value: "Stalk (petiole) to the inner angle of the thyroid cartilage (thyroepiglottic ligament); front to the hyoid (hyoepiglottic ligament)" },
      { label: "Valleculae", value: "Paired mucosal pockets between the tongue root and the epiglottis" },
    ],
    connections: [
      { concept: "thyroid-cartilage", relation: "attaches-to", note: "via the thyroepiglottic ligament" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "via the hyoepiglottic ligament" },
      { concept: "tongue", relation: "adjacent-to", note: "valleculae lie between them" },
      { concept: "laryngeal-ligaments-membranes", relation: "adjacent-to", note: "quadrangular membrane and aryepiglottic folds run back from its sides" },
      { concept: "cuneiform-cartilage", relation: "adjacent-to", note: "in the aryepiglottic folds" },
      { concept: "pharyngeal-constrictors", relation: "adjacent-to", note: "projects into the laryngopharynx" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "sensory via the internal laryngeal nerve" },
    ],
    clinical:
      "Acute epiglottitis (classically Haemophilus influenzae type b, now uncommon where Hib vaccine is used) can swell the epiglottis and rapidly obstruct the airway. During intubation with a curved laryngoscope blade the tip is placed in the vallecula to lift the epiglottis out of view.",
  },

  "thyroid-cartilage": {
    summary:
      "The thyroid cartilage is the largest cartilage of the larynx, formed by two plates (laminae) of hyaline cartilage fused in front to make the laryngeal prominence ('Adam's apple'). It shields the vocal folds, which attach to the inside of its angle, and articulates below with the cricoid cartilage.",
    latin: "Cartilago thyroidea",
    functions: [
      "Protects the vocal folds and laryngeal cavity",
      "Anchors the anterior ends of the vocal and vestibular ligaments",
      "Tilts forward on the cricoid (cricothyroid joints) to lengthen and tense the vocal folds, raising pitch",
      "Attachment for infrahyoid and pharyngeal muscles along its oblique line",
    ],
    facts: [
      { label: "Vertebral level", value: "About C4–C5" },
      { label: "Angle between laminae", value: "About 90° in adult males vs about 120° in females" },
      { label: "Horns", value: "Superior horns tie to the hyoid; inferior horns form the cricothyroid joints" },
    ],
    connections: [
      { concept: "cricoid-cartilage", relation: "articulates-with", note: "cricothyroid joints (inferior horns)" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "suspended by the thyrohyoid membrane" },
      { concept: "epiglottis", relation: "adjacent-to", note: "epiglottic stalk attaches inside its angle" },
      { concept: "laryngeal-ligaments-membranes", relation: "adjacent-to", note: "vocal ligaments attach to the inner angle" },
      { concept: "intrinsic-laryngeal-muscles", relation: "adjacent-to", note: "cricothyroid and thyroarytenoid attach to it" },
      { concept: "thyrohyoid", relation: "adjacent-to", note: "attaches along the oblique line" },
      { concept: "sternothyroid", relation: "adjacent-to", note: "inserts on the oblique line" },
      { concept: "pharyngeal-constrictors", relation: "adjacent-to", note: "thyropharyngeus arises from the oblique line" },
      { concept: "thyroid-gland", relation: "adjacent-to", note: "the gland's lobes lie against its laminae" },
    ],
    sexDifferences:
      "At puberty testosterone enlarges the male larynx: the laminae meet at a sharper angle (~90°), producing a prominent Adam's apple and longer vocal folds (deeper voice). In females the angle is wider (~120°) and the prominence is small.",
    clinical:
      "It is the key landmark for an emergency cricothyroidotomy: palpate the laryngeal prominence, then slide down to the soft cricothyroid membrane just above the cricoid ring.",
  },

  "cricoid-cartilage": {
    summary:
      "The cricoid cartilage is the only complete ring of cartilage in the airway, shaped like a signet ring with a narrow arch in front and a tall lamina behind. At the level of C6 it forms the base of the larynx and marks where the larynx becomes the trachea and the pharynx becomes the esophagus.",
    latin: "Cartilago cricoidea",
    functions: [
      "Keeps the lower larynx permanently open",
      "Provides joints for the thyroid cartilage (cricothyroid joints) and arytenoid cartilages (cricoarytenoid joints)",
      "Attachment for the cricopharyngeus (upper esophageal sphincter) and intrinsic laryngeal muscles",
    ],
    facts: [
      { label: "Vertebral level", value: "C6 — also the start of the trachea and esophagus" },
      { label: "Shape", value: "Signet ring: narrow anterior arch, broad posterior lamina" },
    ],
    connections: [
      { concept: "thyroid-cartilage", relation: "articulates-with", note: "cricothyroid joints" },
      { concept: "arytenoid-cartilage", relation: "articulates-with", note: "cricoarytenoid joints on the upper border of the lamina" },
      { concept: "trachea", relation: "flows-to", note: "air passes from the larynx into the trachea" },
      { concept: "laryngeal-ligaments-membranes", relation: "adjacent-to", note: "cricothyroid membrane above, cricotracheal ligament below" },
      { concept: "esophagus", relation: "adjacent-to", note: "lamina lies directly in front of the start of the esophagus" },
      { concept: "pharyngeal-constrictors", relation: "adjacent-to", note: "cricopharyngeus attaches to its sides" },
      { concept: "thyroid-gland", relation: "adjacent-to", note: "isthmus lies just below it" },
      { concept: "sixth-cervical-vertebra", relation: "adjacent-to", note: "vertebral level" },
    ],
    clinical:
      "The cricothyroid membrane just above the cricoid arch is the site for emergency surgical airway access. In young children the subglottic region at the cricoid ring is the narrowest part of the airway, so swelling here (e.g. croup, post-intubation injury) readily causes obstruction.",
  },

  "arytenoid-cartilage": {
    summary:
      "The arytenoid cartilages are a pair of small pyramid-shaped cartilages sitting on the upper border of the cricoid lamina at the back of the larynx. Each has a vocal process (for the vocal ligament) and a muscular process (for muscles that rotate and slide it), so their movements open and close the vocal folds.",
    latin: "Cartilago arytenoidea",
    functions: [
      "Anchor the posterior ends of the vocal ligaments (vocal processes)",
      "Rotate and glide at the cricoarytenoid joints to abduct (open) or adduct (close) the vocal folds",
      "Adjust vocal fold tension for phonation",
    ],
    facts: [
      { label: "Processes", value: "Vocal process (anterior), muscular process (lateral), apex (topped by the corniculate cartilage)" },
    ],
    connections: [
      { concept: "cricoid-cartilage", relation: "articulates-with", note: "cricoarytenoid joints" },
      { concept: "corniculate-cartilage", relation: "adjacent-to", note: "sits on each apex" },
      { concept: "cuneiform-cartilage", relation: "adjacent-to" },
      { concept: "intrinsic-laryngeal-muscles", relation: "adjacent-to", note: "cricoarytenoid and arytenoid muscles move it" },
      { concept: "laryngeal-ligaments-membranes", relation: "adjacent-to", note: "vocal ligament attaches to the vocal process" },
    ],
    clinical:
      "An arytenoid can be dislocated during difficult intubation, causing hoarseness. With recurrent laryngeal nerve paralysis the arytenoid is no longer moved and the vocal fold lies fixed near the midline.",
  },

  "corniculate-cartilage": {
    summary:
      "The corniculate cartilages are two tiny nodules of elastic cartilage perched on the apices of the arytenoid cartilages, within the posterior ends of the aryepiglottic folds. They form small bumps (corniculate tubercles) at the back of the laryngeal inlet.",
    latin: "Cartilago corniculata",
    functions: [
      "Support and stiffen the posterior aryepiglottic folds",
      "Help shape the laryngeal inlet",
    ],
    facts: [{ label: "Cartilage type", value: "Elastic cartilage" }],
    connections: [
      { concept: "arytenoid-cartilage", relation: "attaches-to", note: "sits on its apex" },
      { concept: "cuneiform-cartilage", relation: "adjacent-to", note: "lies just in front, in the same fold" },
      { concept: "laryngeal-ligaments-membranes", relation: "adjacent-to", note: "within the aryepiglottic fold" },
    ],
    clinical:
      "The corniculate tubercles are visible landmarks at laryngoscopy: they mark the posterior edge of the glottic opening and help guide the tube during intubation.",
  },

  "cuneiform-cartilage": {
    summary:
      "The cuneiform cartilages are small, rod-like pieces of elastic cartilage embedded in the aryepiglottic folds, just in front of the corniculate cartilages. They are inconstant (not always present) and stiffen the folds that form the sides of the laryngeal inlet.",
    latin: "Cartilago cuneiformis",
    functions: [
      "Stiffen the aryepiglottic folds",
      "Help keep the laryngeal inlet open during breathing",
    ],
    facts: [
      { label: "Cartilage type", value: "Elastic cartilage" },
      { label: "Variability", value: "Size varies and they may be absent" },
    ],
    connections: [
      { concept: "laryngeal-ligaments-membranes", relation: "adjacent-to", note: "embedded in the aryepiglottic fold (upper edge of the quadrangular membrane)" },
      { concept: "corniculate-cartilage", relation: "adjacent-to" },
      { concept: "arytenoid-cartilage", relation: "adjacent-to" },
      { concept: "epiglottis", relation: "adjacent-to", note: "the aryepiglottic fold runs from the epiglottis to the arytenoid" },
    ],
    clinical: "They show as small cuneiform tubercles at laryngoscopy and are landmarks at the lateral margins of the laryngeal inlet.",
  },

  "laryngeal-ligaments-membranes": {
    summary:
      "Fibroelastic membranes and ligaments bind the laryngeal cartilages together and to the hyoid and trachea. The key ones are the thyrohyoid membrane, the quadrangular membrane (whose lower edge is the vestibular ligament of the false vocal fold), the conus elasticus (whose upper free edge is the vocal ligament of the true vocal fold) with its anterior cricothyroid ligament, and the cricotracheal ligament.",
    functions: [
      "Suspend the larynx from the hyoid (thyrohyoid membrane)",
      "Form the framework of the vocal folds (vocal ligaments) and vestibular folds",
      "Link the cartilages while allowing the movements needed for phonation",
      "Connect the larynx to the trachea (cricotracheal ligament)",
    ],
    facts: [
      { label: "Vocal ligament", value: "Thickened upper free edge of the conus elasticus, from thyroid angle to arytenoid vocal process" },
      { label: "Median cricothyroid ligament", value: "Midline between thyroid and cricoid — the emergency airway site" },
    ],
    connections: [
      { concept: "hyoid-bone", relation: "attaches-to", note: "thyrohyoid membrane" },
      { concept: "thyroid-cartilage", relation: "attaches-to" },
      { concept: "cricoid-cartilage", relation: "attaches-to" },
      { concept: "arytenoid-cartilage", relation: "attaches-to", note: "vocal and vestibular ligaments end here" },
      { concept: "epiglottis", relation: "attaches-to", note: "quadrangular membrane runs from its sides" },
      { concept: "trachea", relation: "attaches-to", note: "cricotracheal ligament" },
    ],
    sexDifferences:
      "Adult male vocal folds are longer (roughly 17–25 mm) than female ones (roughly 12.5–17.5 mm), one reason male voices are lower pitched.",
    clinical:
      "In a 'can't intubate, can't oxygenate' emergency, the median cricothyroid ligament is incised (cricothyroidotomy) because it lies superficially below the skin with few vessels. Vocal fold nodules form on the vocal ligaments with chronic voice overuse.",
  },

  "intrinsic-laryngeal-muscles": {
    summary:
      "The small intrinsic muscles of the larynx move the laryngeal cartilages relative to each other to open and close the airway and to tune the vocal folds. They include cricothyroid, posterior and lateral cricoarytenoids, transverse and oblique arytenoids and thyroarytenoid (with vocalis).",
    functions: [
      "Posterior cricoarytenoid — the only muscle that abducts (opens) the vocal folds",
      "Lateral cricoarytenoid and arytenoids — adduct (close) the vocal folds for speech and airway protection",
      "Cricothyroid — tilts the thyroid cartilage forward, lengthening and tensing the folds (higher pitch)",
      "Thyroarytenoid/vocalis — shorten, relax and fine-tune the vocal folds",
    ],
    action: "Abduct, adduct, tense and relax the vocal folds; close the laryngeal inlet",
    innervation:
      "Recurrent laryngeal nerve (from the vagus) for all except cricothyroid — external laryngeal branch of the superior laryngeal nerve (also vagus)",
    connections: [
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "recurrent laryngeal and external laryngeal branches" },
      { concept: "arytenoid-cartilage", relation: "acts-on", note: "rotate/slide at the cricoarytenoid joints" },
      { concept: "thyroid-cartilage", relation: "acts-on", note: "cricothyroid tilts it on the cricoid" },
      { concept: "cricoid-cartilage", relation: "attaches-to", note: "cricothyroid and cricoarytenoid muscles arise from it" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by", note: "inferior laryngeal branch" },
    ],
    clinical:
      "Injury to a recurrent laryngeal nerve (thyroid surgery; or the long left nerve hooking under the aortic arch, affected by lung cancer or aneurysm) paralyses the fold and causes hoarseness; bilateral injury can obstruct the airway.",
  },

  // ─────────────────────────── Respiratory: airways & lungs (air-flow order) ───────────────────────────
  "trachea": {
    summary:
      "The trachea (windpipe) is a flexible tube that carries air from the larynx to the lungs, running from the cricoid cartilage (C6) to its bifurcation at the carina at about the level of the sternal angle (T4/T5). C-shaped rings of hyaline cartilage keep it open, with the gap at the back bridged by the trachealis muscle next to the esophagus.",
    functions: [
      "Conducts air between larynx and main bronchi",
      "Mucociliary escalator: ciliated epithelium and goblet-cell mucus trap and clear inhaled particles",
      "Warms and humidifies inspired air",
      "Cough reflex, especially sensitive at the carina",
    ],
    facts: [
      { label: "Length", value: "About 10–12 cm; about 2–2.5 cm wide in adults" },
      { label: "Cartilages", value: "16–20 C-shaped hyaline rings" },
      { label: "Lining", value: "Pseudostratified ciliated columnar epithelium with goblet cells" },
    ],
    connections: [
      { concept: "cricoid-cartilage", relation: "receives-from", note: "air from the larynx" },
      { concept: "main-bronchus", relation: "flows-to", note: "divides at the carina" },
      { concept: "esophagus", relation: "adjacent-to", note: "lies directly behind it" },
      { concept: "thyroid-gland", relation: "adjacent-to", note: "isthmus crosses tracheal rings 2–3" },
      { concept: "arch-of-aorta", relation: "adjacent-to", note: "arches over the left main bronchus beside the lower trachea" },
      { concept: "brachiocephalic-trunk", relation: "adjacent-to", note: "crosses in front of it" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by", note: "upper trachea" },
      { concept: "bronchial-arteries", relation: "supplied-by", note: "lower trachea" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "via recurrent laryngeal nerves and pulmonary plexus" },
    ],
    clinical:
      "A tracheostomy is usually made through the 2nd–4th rings, often dividing or retracting the thyroid isthmus. On imaging, a widened carinal angle may indicate enlarged subcarinal lymph nodes or an enlarged left atrium.",
  },

  "main-bronchus": {
    summary:
      "The right and left main (primary) bronchi arise at the carina and enter the lungs at their hila. The right main bronchus is shorter, wider and more vertical than the left, which runs a longer, more horizontal course beneath the aortic arch and in front of the esophagus.",
    latin: "Bronchus principalis",
    functions: [
      "Conduct air from the trachea into each lung",
      "Give rise to the lobar bronchi (three on the right, two on the left)",
      "Continue mucociliary clearance",
    ],
    facts: [
      { label: "Right main bronchus", value: "About 2.5 cm long; gives off the upper lobe bronchus before entering the hilum" },
      { label: "Left main bronchus", value: "About 5 cm long; passes under the aortic arch" },
    ],
    connections: [
      { concept: "trachea", relation: "receives-from" },
      { concept: "bronchial-tree", relation: "flows-to", note: "branches into lobar bronchi" },
      { concept: "arch-of-aorta", relation: "adjacent-to", note: "arches over the left main bronchus" },
      { concept: "azygos-system", relation: "adjacent-to", note: "azygos vein arches over the right main bronchus" },
      { concept: "esophagus", relation: "adjacent-to", note: "left main bronchus crosses in front of it" },
      { concept: "pulmonary-artery", relation: "adjacent-to", note: "together form the lung root" },
      { concept: "pulmonary-veins", relation: "adjacent-to", note: "at the hilum" },
      { concept: "bronchial-arteries", relation: "supplied-by" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "bronchoconstriction and mucus secretion" },
    ],
    clinical:
      "Because the right main bronchus is wider and more in line with the trachea, inhaled foreign bodies (and a too-deeply placed endotracheal tube) more often enter the right side.",
  },

  "bronchial-tree": {
    summary:
      "The bronchial tree is the branching system of airways inside the lungs: main bronchi divide into lobar, then segmental bronchi, and on through many generations to bronchioles, terminal bronchioles and finally respiratory bronchioles, alveolar ducts and alveoli, where gas exchange occurs. Cartilage disappears at the bronchiole level, where smooth muscle controls airway diameter.",
    latin: "Arbor bronchialis",
    functions: [
      "Conducting zone (to terminal bronchioles) distributes, warms, humidifies and filters air",
      "Respiratory zone (respiratory bronchioles to alveoli) exchanges O₂ and CO₂ with pulmonary capillaries",
      "Smooth muscle regulates airflow resistance",
    ],
    facts: [
      { label: "Branching", value: "About 23 generations from trachea to alveolar sacs (Weibel model)" },
      { label: "Segmental bronchi", value: "10 on the right; 8–10 on the left" },
      { label: "Alveoli", value: "Roughly 300–500 million, giving a gas-exchange surface often quoted at ~70 m²" },
      { label: "Anatomical dead space", value: "About 150 mL" },
    ],
    connections: [
      { concept: "main-bronchus", relation: "receives-from" },
      { concept: "superior-lobe-of-lung", relation: "flows-to", note: "upper lobar bronchus" },
      { concept: "middle-lobe-of-lung", relation: "flows-to", note: "right middle lobar bronchus" },
      { concept: "inferior-lobe-of-lung", relation: "flows-to", note: "lower lobar bronchus" },
      { concept: "bronchial-arteries", relation: "supplied-by", note: "nutrient supply to bronchial walls" },
      { concept: "pulmonary-artery-branches", relation: "adjacent-to", note: "arterial branches run alongside the bronchi" },
      { concept: "vagus-nerve-cn-x", relation: "innervated-by", note: "parasympathetic: bronchoconstriction, mucus secretion" },
    ],
    clinical:
      "In asthma, inflammation and reversible smooth-muscle constriction narrow the bronchi and bronchioles, relieved by β2-agonist inhalers. Chronic obstructive pulmonary disease (mainly from smoking) permanently narrows small airways and destroys alveolar walls (emphysema).",
  },

  "superior-lobe-of-lung": {
    summary:
      "The superior (upper) lobe forms the top of each lung, including the apex that rises into the root of the neck above the medial clavicle. On the right it is separated by the horizontal and oblique fissures from the middle and lower lobes; on the left, where there is no middle lobe, it includes the tongue-like lingula and is separated from the lower lobe by the oblique fissure.",
    latin: "Lobus superior pulmonis",
    functions: [
      "Gas exchange in its bronchopulmonary segments",
      "Right: apical, posterior and anterior segments",
      "Left: apicoposterior, anterior, and superior and inferior lingular segments",
    ],
    facts: [
      { label: "Apex", value: "Rises about 2–3 cm above the medial third of the clavicle" },
      { label: "Right lung", value: "3 lobes, 10 segments (upper lobe: 3)" },
      { label: "Left lung", value: "2 lobes, 8–10 segments (upper lobe: 4–5, including the lingula); cardiac notch on its anterior border" },
    ],
    connections: [
      { concept: "bronchial-tree", relation: "receives-from", note: "air via the upper lobar bronchus" },
      { concept: "pulmonary-artery-branches", relation: "receives-from", note: "deoxygenated blood for gas exchange" },
      { concept: "pulmonary-vein-tributaries", relation: "flows-to", note: "oxygenated blood returns to the heart" },
      { concept: "bronchial-arteries", relation: "supplied-by", note: "nutrient supply" },
      { concept: "middle-lobe-of-lung", relation: "adjacent-to", note: "right: across the horizontal fissure" },
      { concept: "inferior-lobe-of-lung", relation: "adjacent-to", note: "across the oblique fissure" },
      { concept: "subclavian-artery", relation: "adjacent-to", note: "grooves the apex" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "lower trunk (C8–T1) lies above the apex" },
      { concept: "sympathetic-trunk", relation: "adjacent-to", note: "stellate ganglion near the apex" },
      { concept: "first-rib", relation: "adjacent-to" },
    ],
    clinical:
      "A Pancoast (superior sulcus) tumour at the lung apex can invade the lower brachial plexus (pain and weakness in the hand) and the cervical sympathetic chain (Horner syndrome). Reactivation tuberculosis favours the apical and posterior segments of the upper lobes.",
  },

  "middle-lobe-of-lung": {
    summary:
      "Only the right lung has a true middle lobe, a wedge between the horizontal fissure above and the oblique fissure below, lying against the right border of the heart. On the left, the lingula of the superior lobe is its developmental equivalent.",
    latin: "Lobus medius pulmonis dextri",
    functions: ["Gas exchange in its two bronchopulmonary segments (lateral and medial)"],
    facts: [
      { label: "Segments", value: "Lateral and medial" },
      { label: "Horizontal fissure", value: "Runs roughly along the right 4th rib/costal cartilage" },
      { label: "Left-sided equivalent", value: "Lingula (superior and inferior lingular segments) of the left superior lobe" },
    ],
    connections: [
      { concept: "bronchial-tree", relation: "receives-from", note: "air via the middle lobar bronchus" },
      { concept: "pulmonary-artery-branches", relation: "receives-from", note: "deoxygenated blood" },
      { concept: "pulmonary-vein-tributaries", relation: "flows-to", note: "oxygenated blood" },
      { concept: "bronchial-arteries", relation: "supplied-by" },
      { concept: "superior-lobe-of-lung", relation: "adjacent-to", note: "across the horizontal fissure" },
      { concept: "inferior-lobe-of-lung", relation: "adjacent-to", note: "across the oblique fissure" },
      { concept: "atrium", relation: "adjacent-to", note: "right atrium forms the right heart border beside it" },
      { concept: "diaphragm", relation: "adjacent-to" },
    ],
    clinical:
      "Consolidation of the middle lobe blurs the right heart border on a frontal chest X-ray (silhouette sign). Its long, narrow bronchus, ringed by lymph nodes, is easily compressed, predisposing to recurrent collapse and infection (middle lobe syndrome).",
  },

  "inferior-lobe-of-lung": {
    summary:
      "The inferior (lower) lobe is the large posterior and basal part of each lung below the oblique fissure, resting on the diaphragm and filling the deep posterior costodiaphragmatic region. It is best examined by listening over the back of the chest.",
    latin: "Lobus inferior pulmonis",
    functions: [
      "Gas exchange — the lung bases receive the most ventilation and blood flow when upright",
      "Right: superior, medial basal, anterior basal, lateral basal and posterior basal segments",
      "Left: superior, anteromedial basal, lateral basal and posterior basal segments",
    ],
    facts: [
      { label: "Oblique fissure", value: "From about the T2–T3 spinous process level behind to the 6th costal cartilage in front" },
      { label: "Segments", value: "Right 5; left 4–5 (anterior and medial basal often combined)" },
    ],
    connections: [
      { concept: "bronchial-tree", relation: "receives-from", note: "air via the lower lobar bronchus" },
      { concept: "pulmonary-artery-branches", relation: "receives-from", note: "deoxygenated blood" },
      { concept: "pulmonary-vein-tributaries", relation: "flows-to", note: "oxygenated blood" },
      { concept: "bronchial-arteries", relation: "supplied-by" },
      { concept: "superior-lobe-of-lung", relation: "adjacent-to", note: "across the oblique fissure" },
      { concept: "middle-lobe-of-lung", relation: "adjacent-to", note: "right side, across the oblique fissure" },
      { concept: "diaphragm", relation: "adjacent-to", note: "base rests on it" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left lower lobe, medially" },
      { concept: "esophagus", relation: "adjacent-to", note: "medial relation" },
      { concept: "liver-segment-vii", relation: "adjacent-to", note: "right base, across the diaphragm" },
    ],
    clinical:
      "Aspirated material usually enters the right lower lobe (basal segments when upright, superior segment when lying supine) because the right main bronchus is more vertical. Pleural effusions collect first in the costodiaphragmatic recesses beside the lower lobes.",
  },

  // ─────────────────────────── Nervous: eye (outer → inner, then light path) ───────────────────────────
  "sclera": {
    summary:
      "The sclera is the tough, white, outer fibrous coat covering roughly the posterior five-sixths of the eyeball. It is continuous in front with the transparent cornea at the limbus and behind with the dural sheath of the optic nerve, and it gives attachment to the extraocular muscles.",
    functions: [
      "Maintains the shape of the eyeball and resists intraocular pressure",
      "Protects the inner layers of the eye",
      "Insertion site for the six extraocular muscles",
      "Perforated posteriorly by the optic nerve fibres (lamina cribrosa)",
    ],
    facts: [
      { label: "Thickness", value: "About 0.3 mm near the muscle insertions to about 1 mm at the back" },
      { label: "Eyeball size", value: "About 24 mm in anteroposterior diameter in adults" },
    ],
    connections: [
      { concept: "cornea", relation: "adjacent-to", note: "continuous at the limbus (corneoscleral junction)" },
      { concept: "choroid", relation: "adjacent-to", note: "lies just inside the sclera" },
      { concept: "optic-nerve", relation: "adjacent-to", note: "nerve exits through the lamina cribrosa; its dural sheath blends with the sclera" },
      { concept: "superior-rectus-eye", relation: "adjacent-to", note: "inserts on the sclera" },
      { concept: "inferior-rectus-eye", relation: "adjacent-to", note: "inserts on the sclera" },
      { concept: "medial-rectus-eye", relation: "adjacent-to", note: "inserts on the sclera" },
      { concept: "lateral-rectus-eye", relation: "adjacent-to", note: "inserts on the sclera" },
      { concept: "superior-oblique-eye", relation: "adjacent-to", note: "inserts on the posterolateral sclera" },
      { concept: "inferior-oblique-eye", relation: "adjacent-to", note: "inserts on the posterolateral sclera" },
    ],
    clinical:
      "A yellow sclera (scleral icterus) is often the first visible sign of jaundice. The lamina cribrosa is the weak point that bows backward (optic disc 'cupping') under raised pressure in glaucoma.",
  },

  "cornea": {
    summary:
      "The cornea is the clear, dome-shaped front window of the eye, continuous with the sclera at the limbus. Being curved and avascular, it provides most of the eye's focusing power, and it is one of the most densely innervated tissues in the body.",
    functions: [
      "Refracts (bends) light — about two-thirds of the eye's total focusing power",
      "Transmits light while protecting the inner eye",
      "Its endothelium pumps water out of the stroma to keep it transparent",
      "Sensory trigger for the blink (corneal) reflex",
    ],
    facts: [
      { label: "Refractive power", value: "About 40–44 dioptres of the eye's roughly 60 D" },
      { label: "Central thickness", value: "About 0.5–0.55 mm; about 11.5–12 mm in horizontal diameter" },
      { label: "Layers", value: "Epithelium, Bowman layer, stroma (~90% of thickness), Descemet membrane, endothelium" },
      { label: "Nutrition", value: "Avascular — from aqueous humor, tear film and atmospheric oxygen" },
    ],
    connections: [
      { concept: "sclera", relation: "adjacent-to", note: "continuous at the limbus" },
      { concept: "aqueous-humor", relation: "adjacent-to", note: "bathes its inner (endothelial) surface" },
      { concept: "iris", relation: "adjacent-to", note: "anterior chamber lies between them" },
      { concept: "ophthalmic-nerve-cn-v1", relation: "innervated-by", note: "long ciliary branches of the nasociliary nerve" },
      { concept: "lacrimal-apparatus", relation: "receives-from", note: "tear film keeps it moist and smooth" },
      { concept: "tarsal-plates", relation: "adjacent-to", note: "eyelids sweep and protect it" },
    ],
    clinical:
      "The corneal reflex tests the ophthalmic nerve (afferent, CN V1) and facial nerve (efferent, CN VII). Because it is avascular, corneal transplants have a low rejection rate; refractive surgery (e.g. LASIK) reshapes the stroma to correct vision.",
  },

  "iris": {
    summary:
      "The iris is the coloured, contractile diaphragm between the cornea and lens, with the pupil at its centre. Two smooth muscles change pupil size — the circular sphincter pupillae (parasympathetic) constricts it and the radial dilator pupillae (sympathetic) widens it — controlling how much light reaches the retina.",
    functions: [
      "Regulates the amount of light entering the eye (pupillary light reflex)",
      "Constricts the pupil for near vision, increasing depth of field (near response)",
      "Divides the anterior segment into anterior and posterior chambers",
    ],
    facts: [
      { label: "Pupil diameter", value: "Roughly 2 mm in bright light to 8 mm in darkness" },
      { label: "Eye colour", value: "Depends mainly on the amount of melanin in the anterior iris stroma" },
      { label: "Uvea", value: "Iris, ciliary body and choroid together form the vascular middle coat (uvea)" },
    ],
    connections: [
      { concept: "oculomotor-nerve-cn-iii", relation: "innervated-by", note: "parasympathetic to sphincter pupillae via the ciliary ganglion" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "dilator pupillae, via the superior cervical ganglion and long ciliary nerves" },
      { concept: "ophthalmic-nerve-cn-v1", relation: "innervated-by", note: "sensory (nasociliary nerve)" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "long posterior and anterior ciliary arteries" },
      { concept: "ciliary-body", relation: "adjacent-to", note: "continuous at the iris root" },
      { concept: "cornea", relation: "adjacent-to" },
      { concept: "lens", relation: "adjacent-to", note: "the pupillary margin rests on the front of the lens" },
      { concept: "aqueous-humor", relation: "adjacent-to", note: "aqueous flows through the pupil" },
    ],
    clinical:
      "A dilated, unreactive ('blown') pupil can signal compression of the oculomotor nerve, whose parasympathetic fibres lie superficially (e.g. uncal herniation, posterior communicating artery aneurysm). A small pupil with ptosis suggests Horner syndrome (loss of sympathetic supply).",
  },

  "ciliary-body": {
    summary:
      "The ciliary body is a ring of tissue between the iris and the choroid, containing the ciliary muscle and the finger-like ciliary processes. The processes secrete aqueous humor, and the muscle changes the shape of the lens via its zonular fibres to focus on near objects (accommodation).",
    latin: "Corpus ciliare",
    functions: [
      "Ciliary processes secrete aqueous humor into the posterior chamber",
      "Ciliary muscle contraction slackens the zonules, letting the lens round up for near focus (accommodation)",
      "Anchors the suspensory ligament (zonules) of the lens",
    ],
    facts: [
      { label: "Aqueous production", value: "About 2–3 µL per minute" },
      { label: "Ciliary muscle supply", value: "Parasympathetic via CN III, ciliary ganglion and short ciliary nerves" },
    ],
    connections: [
      { concept: "aqueous-humor", relation: "secretes-into", note: "into the posterior chamber" },
      { concept: "suspensory-ligament-of-lens", relation: "attaches-to", note: "zonular fibres arise from it" },
      { concept: "lens", relation: "acts-on", note: "changes lens shape via the zonules" },
      { concept: "iris", relation: "adjacent-to" },
      { concept: "choroid", relation: "adjacent-to", note: "continuous behind it" },
      { concept: "oculomotor-nerve-cn-iii", relation: "innervated-by", note: "parasympathetic (accommodation)" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "ciliary arteries" },
    ],
    clinical:
      "Presbyopia — the age-related loss of near focus, usually noticed in the mid-40s — occurs mainly because the lens stiffens, so ciliary muscle contraction no longer rounds it. Glaucoma drugs such as β-blockers and carbonic anhydrase inhibitors lower eye pressure by reducing aqueous production here.",
  },

  "choroid": {
    summary:
      "The choroid is the thin, dark, highly vascular layer between the sclera and the retina, forming the posterior part of the uvea. Its capillary layer (choriocapillaris) nourishes the outer retina, including the photoreceptors, and its pigment absorbs stray light.",
    latin: "Choroidea",
    functions: [
      "Supplies oxygen and nutrients to the outer retina and retinal pigment epithelium",
      "Absorbs scattered light, improving image sharpness",
      "Helps regulate the temperature of the retina",
    ],
    facts: [
      { label: "Blood flow", value: "One of the highest blood flows per gram of tissue in the body" },
      { label: "Arterial supply", value: "Short posterior ciliary arteries (from the ophthalmic artery)" },
    ],
    connections: [
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "short posterior ciliary arteries" },
      { concept: "retina", relation: "adjacent-to", note: "nourishes the outer retina across Bruch's membrane" },
      { concept: "sclera", relation: "adjacent-to" },
      { concept: "ciliary-body", relation: "adjacent-to", note: "continuous in front" },
    ],
    clinical:
      "In 'wet' age-related macular degeneration, new vessels grow from the choroid under the macula and leak, threatening central vision; they are treated with anti-VEGF injections. Choroidal melanoma is the most common primary intraocular cancer in adults.",
  },

  "lens": {
    summary:
      "The lens is a transparent, biconvex, avascular structure behind the iris, suspended by the zonular fibres of the ciliary body. By changing its curvature it fine-tunes the focus of the eye for near and distant objects.",
    latin: "Lens crystallina",
    functions: [
      "Adjustable focusing (accommodation) for near and far vision",
      "Contributes roughly one-third of the eye's refractive power",
      "Filters much of the ultraviolet light before it reaches the retina",
    ],
    facts: [
      { label: "Size", value: "About 9–10 mm in diameter and 4 mm thick" },
      { label: "Composition", value: "Tightly packed fibres filled with crystallin proteins; no blood vessels or nerves" },
    ],
    connections: [
      { concept: "suspensory-ligament-of-lens", relation: "attaches-to", note: "held by the zonules at its equator" },
      { concept: "ciliary-body", relation: "adjacent-to", note: "controls its shape via the zonules" },
      { concept: "iris", relation: "adjacent-to", note: "in front" },
      { concept: "vitreous-body", relation: "adjacent-to", note: "behind, in the hyaloid fossa" },
      { concept: "aqueous-humor", relation: "receives-from", note: "nourishment from aqueous humor" },
    ],
    clinical:
      "A cataract is clouding of the lens; it is the leading cause of blindness worldwide and is treated by replacing the lens with an artificial intraocular lens. Loss of lens elasticity with age causes presbyopia.",
  },

  "suspensory-ligament-of-lens": {
    summary:
      "The suspensory ligament of the lens (ciliary zonule) is a ring of fine fibrillin-rich fibres running from the ciliary body to the equator of the lens capsule. It holds the lens in place and transmits the effects of ciliary muscle contraction or relaxation to the lens.",
    latin: "Zonula ciliaris",
    functions: [
      "Suspends the lens in position behind the iris",
      "Taut when the ciliary muscle relaxes (lens flattened for distance); slack when it contracts (lens rounds up for near vision)",
    ],
    facts: [{ label: "Main protein", value: "Fibrillin-rich microfibrils" }],
    connections: [
      { concept: "lens", relation: "attaches-to", note: "to the lens capsule at its equator" },
      { concept: "ciliary-body", relation: "attaches-to", note: "arises from the ciliary processes and body" },
    ],
    clinical:
      "In Marfan syndrome (fibrillin-1 mutations) weak zonules allow the lens to dislocate (ectopia lentis), classically upward and outward.",
  },

  "aqueous-humor": {
    summary:
      "Aqueous humor is the clear, watery fluid filling the anterior and posterior chambers in front of the lens. It is secreted by the ciliary processes into the posterior chamber, flows through the pupil into the anterior chamber and drains at the iridocorneal angle through the trabecular meshwork into the scleral venous sinus (canal of Schlemm).",
    latin: "Humor aquosus",
    functions: [
      "Supplies nutrients and oxygen to the avascular cornea and lens and removes their wastes",
      "Maintains intraocular pressure, which keeps the eye's shape",
      "Transparent medium that transmits light",
    ],
    facts: [
      { label: "Production", value: "About 2–3 µL per minute; the volume turns over roughly every 1.5–2 hours" },
      { label: "Normal intraocular pressure", value: "About 10–21 mmHg" },
      { label: "Drainage", value: "Mostly via trabecular meshwork → scleral venous sinus; a smaller uveoscleral route" },
    ],
    connections: [
      { concept: "ciliary-body", relation: "receives-from", note: "secreted by the ciliary processes" },
      { concept: "iris", relation: "adjacent-to", note: "flows through the pupil into the anterior chamber" },
      { concept: "cornea", relation: "adjacent-to", note: "nourishes its inner surface" },
      { concept: "lens", relation: "adjacent-to", note: "nourishes the lens" },
      { concept: "sclera", relation: "flows-to", note: "drains into the scleral venous sinus at the iridocorneal angle" },
    ],
    clinical:
      "When drainage is impaired, intraocular pressure rises and can damage the optic nerve (glaucoma). Acute angle-closure glaucoma — sudden blockage of the angle by the iris — causes a painful red eye and is an emergency.",
  },

  "vitreous-body": {
    summary:
      "The vitreous body is the transparent gel filling the large vitreous chamber between the lens and the retina. It is about 99% water held in a scaffold of collagen fibrils and hyaluronic acid and, unlike aqueous humor, is not continuously replaced.",
    latin: "Corpus vitreum",
    functions: [
      "Maintains the shape of the eyeball",
      "Transmits light to the retina",
      "Supports the lens and helps hold the retina against the choroid",
    ],
    facts: [
      { label: "Volume", value: "About 4 mL — roughly four-fifths of the eyeball's volume" },
      { label: "Composition", value: "About 99% water, with collagen and hyaluronan" },
    ],
    connections: [
      { concept: "lens", relation: "adjacent-to", note: "in front" },
      { concept: "retina", relation: "adjacent-to", note: "behind and around" },
      { concept: "ciliary-body", relation: "adjacent-to" },
    ],
    clinical:
      "With age the gel liquefies and can peel away from the retina (posterior vitreous detachment), causing floaters and flashes; traction can tear the retina and lead to retinal detachment. Drugs such as anti-VEGF agents are injected into the vitreous.",
  },

  "retina": {
    summary:
      "The retina is the thin, light-sensitive inner layer at the back of the eye. Photoreceptors (rods and cones) convert light into electrical signals, which are processed by retinal interneurons and sent via ganglion-cell axons into the optic nerve.",
    functions: [
      "Phototransduction by rods (dim-light, black-and-white vision) and cones (colour and fine detail)",
      "Early visual processing (contrast, edges) by bipolar, horizontal and amacrine cells",
      "The fovea at the centre of the macula provides the sharpest vision",
      "Ganglion-cell axons converge at the optic disc to form the optic nerve",
    ],
    facts: [
      { label: "Photoreceptors", value: "Roughly 90–120 million rods and 4.5–6 million cones" },
      { label: "Fovea", value: "Cone-only pit, about 1.5 mm across, in the centre of the macula" },
      { label: "Optic disc", value: "Where axons leave — no photoreceptors, so it forms the physiological blind spot, lying nasal to the fovea" },
    ],
    connections: [
      { concept: "optic-nerve", relation: "flows-to", note: "ganglion-cell axons form the optic nerve" },
      { concept: "choroid", relation: "adjacent-to", note: "choriocapillaris nourishes the outer retina" },
      { concept: "vitreous-body", relation: "adjacent-to" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "central retinal artery supplies the inner retina" },
    ],
    clinical:
      "Retinal detachment (separation of the neural retina from the pigment epithelium) causes a spreading 'curtain' of vision loss and needs urgent repair. Diabetic retinopathy is a leading cause of vision loss in working-age adults; central retinal artery occlusion causes sudden painless blindness with a cherry-red spot.",
  },

  "optic-nerve": {
    summary:
      "The optic nerve (CN II) carries visual information from the retina to the brain. It is formed by about a million ganglion-cell axons that leave the eye at the optic disc, pass back through the orbit and optic canal, and meet the other optic nerve at the optic chiasm. Developmentally it is a tract of the central nervous system, wrapped in meninges.",
    latin: "Nervus opticus (CN II)",
    functions: [
      "Transmits visual signals from the retina",
      "Afferent limb of the pupillary light reflex",
    ],
    facts: [
      { label: "Axons", value: "Roughly 1–1.2 million per nerve" },
      { label: "Length", value: "About 4.5–5 cm from eyeball to chiasm" },
      { label: "Exit from orbit", value: "Optic canal of the sphenoid bone, with the ophthalmic artery" },
      { label: "Myelin", value: "Oligodendrocytes (CNS type), not Schwann cells" },
    ],
    connections: [
      { concept: "retina", relation: "receives-from", note: "ganglion-cell axons" },
      { concept: "optic-chiasm", relation: "flows-to" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "travels with it through the optic canal; the central retinal artery runs within its distal part" },
      { concept: "sphenoid-bone", relation: "adjacent-to", note: "optic canal in the lesser wing" },
      { concept: "sclera", relation: "adjacent-to", note: "exits through the lamina cribrosa" },
      { concept: "orbital-tendons-ligaments", relation: "adjacent-to", note: "passes through the common tendinous ring" },
    ],
    clinical:
      "Raised intracranial pressure is transmitted along the subarachnoid space around the nerve and swells the optic disc (papilloedema). Because it is CNS white matter, the optic nerve is often affected in multiple sclerosis (optic neuritis).",
  },

  "optic-chiasm": {
    summary:
      "The optic chiasm is the X-shaped junction of the two optic nerves, lying above the pituitary gland in front of the hypothalamus. Here fibres from the nasal half of each retina cross to the opposite side, so each optic tract carries information from the opposite half of the visual field.",
    latin: "Chiasma opticum",
    functions: [
      "Partial decussation: nasal retinal fibres (temporal visual fields) cross, temporal retinal fibres stay on the same side",
      "Enables each hemisphere to receive the entire contralateral visual field from both eyes (basis of binocular vision)",
    ],
    facts: [{ label: "Proportion crossing", value: "About half of the fibres (those from the nasal retinae)" }],
    connections: [
      { concept: "optic-nerve", relation: "receives-from" },
      { concept: "optic-tract", relation: "flows-to" },
      { concept: "pituitary-gland", relation: "adjacent-to", note: "lies just above it, across the diaphragma sellae" },
      { concept: "hypothalamus", relation: "adjacent-to", note: "at the front of the hypothalamus; retinal fibres reach the suprachiasmatic nucleus" },
      { concept: "internal-carotid-artery", relation: "adjacent-to", note: "lateral to the chiasm" },
      { concept: "anterior-cerebral-artery", relation: "adjacent-to", note: "passes above it" },
    ],
    clinical:
      "A pituitary adenoma growing upward compresses the crossing fibres from below, typically causing bitemporal hemianopia (loss of both outer visual fields).",
  },

  "optic-tract": {
    summary:
      "Each optic tract continues from the optic chiasm, winding around the cerebral peduncle to reach the lateral geniculate body of the thalamus. It carries fibres from the temporal retina of the same eye and the nasal retina of the opposite eye — that is, the whole opposite half of the visual field.",
    latin: "Tractus opticus",
    functions: [
      "Carries contralateral visual-field information to the lateral geniculate body (the majority of fibres)",
      "Sends branches to the superior colliculus and pretectal area (visual reflexes, pupillary light reflex)",
    ],
    facts: [{ label: "Main target", value: "Lateral geniculate body — about 90% of retinal ganglion-cell axons end there" }],
    connections: [
      { concept: "optic-chiasm", relation: "receives-from" },
      { concept: "lateral-geniculate-body", relation: "flows-to", note: "main visual relay" },
      { concept: "superior-colliculus", relation: "flows-to", note: "via the brachium of the superior colliculus (visual orienting)" },
      { concept: "cerebral-peduncle", relation: "adjacent-to", note: "winds around it" },
      { concept: "hypothalamus", relation: "adjacent-to", note: "begins beside the hypothalamus" },
    ],
    clinical: "A lesion of one optic tract causes contralateral homonymous hemianopia — loss of the same half of the visual field in both eyes.",
  },

  "lateral-geniculate-body": {
    summary:
      "The lateral geniculate body (nucleus) is the thalamic relay station for vision. It receives the optic tract and projects through the optic radiation to the primary visual cortex along the calcarine sulcus of the occipital lobe.",
    latin: "Corpus geniculatum laterale",
    functions: [
      "Relays and filters retinal signals to primary visual cortex (V1)",
      "Keeps inputs from the two eyes in separate layers",
      "Receives substantial feedback from the cortex that modulates transmission (attention)",
    ],
    facts: [
      { label: "Layers", value: "Six: 1–2 magnocellular (motion), 3–6 parvocellular (detail, colour), with koniocellular cells between" },
      { label: "Eye input", value: "Contralateral eye to layers 1, 4, 6; ipsilateral eye to layers 2, 3, 5" },
    ],
    connections: [
      { concept: "thalamus", relation: "part-of" },
      { concept: "optic-tract", relation: "receives-from" },
      { concept: "occipital-lobe", relation: "flows-to", note: "optic radiation to primary visual cortex" },
      { concept: "medial-geniculate-body", relation: "adjacent-to" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "posterior choroidal branches; also the anterior choroidal artery from the internal carotid" },
    ],
    clinical:
      "Lesions of the lateral geniculate body, like those of the optic tract, produce a contralateral homonymous visual field defect.",
  },

  // ─────────────────────────── Nervous: accessory structures of the eye ───────────────────────────
  "tarsal-plates": {
    summary:
      "The tarsal plates (tarsi) are dense plates of fibrous connective tissue — not true cartilage — that form the skeleton of the upper and lower eyelids. They contain the tarsal (meibomian) glands and are anchored to the orbital margin by the medial and lateral palpebral ligaments.",
    latin: "Tarsus superior et inferior",
    functions: [
      "Give the eyelids shape and stiffness",
      "Tarsal (meibomian) glands secrete the oily outer layer of the tear film, slowing evaporation",
      "Attachment for levator palpebrae superioris (via its aponeurosis) and the superior tarsal muscle",
    ],
    facts: [
      { label: "Height", value: "Upper tarsus about 10 mm; lower about 4–5 mm" },
      { label: "Meibomian glands", value: "Roughly 30–40 in the upper lid and 20–30 in the lower" },
    ],
    connections: [
      { concept: "levator-palpebrae-superioris", relation: "adjacent-to", note: "its aponeurosis inserts on the upper tarsus" },
      { concept: "orbital-tendons-ligaments", relation: "attaches-to", note: "medial and lateral palpebral ligaments" },
      { concept: "muscles-of-facial-expression", relation: "adjacent-to", note: "palpebral orbicularis oculi lies in front" },
      { concept: "sympathetic-trunk", relation: "adjacent-to", note: "sympathetically supplied superior tarsal (Müller) muscle attaches to the upper tarsus" },
      { concept: "lacrimal-apparatus", relation: "adjacent-to", note: "lacrimal puncta lie at the medial ends of the lid margins" },
      { concept: "cornea", relation: "adjacent-to", note: "lids close over it" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "palpebral arcades" },
    ],
    clinical:
      "Blockage of a meibomian gland produces a chalazion, a painless lump in the eyelid. Loss of sympathetic tone to the superior tarsal muscle causes the mild ptosis of Horner syndrome.",
  },

  "lacrimal-apparatus": {
    summary:
      "The lacrimal apparatus produces and drains tears. The lacrimal gland in the upper outer orbit secretes tears that wash across the eye toward the medial corner, enter the lacrimal puncta and canaliculi, collect in the lacrimal sac and drain via the nasolacrimal duct into the inferior meatus of the nose.",
    latin: "Apparatus lacrimalis",
    functions: [
      "Keeps the cornea and conjunctiva moist, smooth and optically clear",
      "Washes away debris and delivers antimicrobial proteins (e.g. lysozyme)",
      "Reflex and emotional tearing",
    ],
    facts: [
      { label: "Tear film", value: "Three layers: lipid (meibomian glands), aqueous (lacrimal gland) and mucin (conjunctival goblet cells)" },
      { label: "Secretomotor pathway", value: "Facial nerve → greater petrosal nerve → pterygopalatine ganglion → branches reaching the lacrimal nerve" },
    ],
    connections: [
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "parasympathetic secretomotor supply to the lacrimal gland" },
      { concept: "ophthalmic-nerve-cn-v1", relation: "innervated-by", note: "lacrimal nerve (sensory; carries the secretomotor fibres to the gland)" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "lacrimal artery" },
      { concept: "cornea", relation: "secretes-into", note: "tears spread over the cornea and conjunctiva" },
      { concept: "frontal-bone", relation: "adjacent-to", note: "gland lies in the lacrimal fossa of the orbital roof" },
      { concept: "lacrimal-bone", relation: "adjacent-to", note: "lacrimal sac sits in its fossa" },
      { concept: "maxilla", relation: "adjacent-to", note: "nasolacrimal canal" },
      { concept: "inferior-nasal-concha", relation: "flows-to", note: "nasolacrimal duct opens into the inferior meatus beneath it" },
    ],
    clinical:
      "Nasolacrimal duct obstruction — common in infants whose duct has not fully canalized — causes a watery eye (epiphora) and can lead to infection of the lacrimal sac (dacryocystitis). A facial nerve lesion proximal to the greater petrosal branch reduces tear production (dry eye).",
  },

  // ─────────────────────────── Nervous: cranial nerves ───────────────────────────
  "oculomotor-nerve-cn-iii": {
    summary:
      "The oculomotor nerve (CN III) emerges from the front of the midbrain, runs through the lateral wall of the cavernous sinus and enters the orbit through the superior orbital fissure. It moves most of the eye muscles, raises the upper eyelid, and carries parasympathetic fibres that constrict the pupil and focus the lens.",
    latin: "Nervus oculomotorius (CN III)",
    functions: [
      "Motor to superior, inferior and medial recti, inferior oblique and levator palpebrae superioris",
      "Parasympathetic (via the ciliary ganglion) to sphincter pupillae and ciliary muscle",
      "Efferent limb of the pupillary light reflex and of the near (accommodation) response",
    ],
    facts: [
      { label: "Origin", value: "Midbrain at the level of the superior colliculus; exits in the interpeduncular fossa" },
      { label: "Branches in orbit", value: "Superior division (superior rectus, levator) and inferior division (medial and inferior recti, inferior oblique, ciliary ganglion)" },
    ],
    connections: [
      { concept: "midbrain", relation: "branch-of", note: "emerges from the interpeduncular fossa" },
      { concept: "superior-rectus-eye", relation: "controls" },
      { concept: "inferior-rectus-eye", relation: "controls" },
      { concept: "medial-rectus-eye", relation: "controls" },
      { concept: "inferior-oblique-eye", relation: "controls" },
      { concept: "levator-palpebrae-superioris", relation: "controls", note: "raises the upper eyelid" },
      { concept: "iris", relation: "controls", note: "sphincter pupillae (pupil constriction)" },
      { concept: "ciliary-body", relation: "controls", note: "ciliary muscle (accommodation)" },
      { concept: "posterior-cerebral-artery", relation: "adjacent-to", note: "passes between the posterior cerebral and superior cerebellar arteries" },
      { concept: "internal-carotid-artery", relation: "adjacent-to", note: "posterior communicating artery aneurysms (at the carotid junction) can compress it" },
    ],
    clinical:
      "A complete CN III palsy leaves the eye 'down and out' (unopposed lateral rectus and superior oblique), with ptosis and a dilated, unreactive pupil. Compressive lesions (aneurysm, uncal herniation) usually affect the pupil early, whereas diabetic microvascular palsies often spare it.",
  },

  "trochlear-nerve-cn-iv": {
    summary:
      "The trochlear nerve (CN IV) is the smallest cranial nerve and the only one to emerge from the back of the brainstem, just below the inferior colliculi, after its fibres cross the midline. It has the longest intracranial course and supplies a single muscle, the superior oblique.",
    latin: "Nervus trochlearis (CN IV)",
    functions: ["Motor to the superior oblique, which depresses (especially when adducted), intorts and abducts the eye"],
    facts: [
      { label: "Unique features", value: "Only cranial nerve to exit dorsally; fibres fully decussate, so the nucleus supplies the opposite superior oblique" },
      { label: "Entry to orbit", value: "Superior orbital fissure, outside the common tendinous ring" },
    ],
    connections: [
      { concept: "midbrain", relation: "branch-of", note: "nucleus at the level of the inferior colliculus" },
      { concept: "superior-oblique-eye", relation: "controls" },
      { concept: "inferior-colliculus", relation: "adjacent-to", note: "emerges just below it" },
      { concept: "tentorium-cerebelli", relation: "adjacent-to", note: "runs along the free edge" },
      { concept: "orbital-tendons-ligaments", relation: "adjacent-to", note: "enters the orbit outside the common tendinous ring" },
    ],
    clinical:
      "Its long, thin course makes it vulnerable to head trauma. A palsy causes vertical double vision that is worst looking down and inward (reading, descending stairs); patients often tilt the head away from the affected side to compensate.",
  },

  "ophthalmic-nerve-cn-v1": {
    summary:
      "The ophthalmic nerve (CN V1) is the first, purely sensory division of the trigeminal nerve. It runs in the lateral wall of the cavernous sinus and enters the orbit through the superior orbital fissure as the frontal, lacrimal and nasociliary nerves, supplying the eye, upper eyelid, forehead, scalp to the vertex and the bridge and tip of the nose.",
    latin: "Nervus ophthalmicus (CN V1)",
    functions: [
      "Sensation from the cornea, conjunctiva, iris and ciliary body (nasociliary nerve)",
      "Skin of the forehead, upper eyelid, scalp to the vertex and dorsum of the nose (frontal and nasociliary branches)",
      "Mucosa of the frontal and ethmoidal sinuses and upper nasal cavity; the tentorium cerebelli and anterior dura",
      "Afferent limb of the corneal (blink) reflex",
    ],
    facts: [
      { label: "Main branches", value: "Frontal (supraorbital, supratrochlear), lacrimal, nasociliary" },
      { label: "Fibre type", value: "Sensory only (autonomic fibres hitch-hike along its branches)" },
    ],
    connections: [
      { concept: "cornea", relation: "receives-from", note: "sensory via long ciliary nerves" },
      { concept: "skin", relation: "receives-from", note: "forehead, upper eyelid, scalp and nose" },
      { concept: "lacrimal-apparatus", relation: "receives-from", note: "lacrimal nerve (also carries secretomotor fibres to the gland)" },
      { concept: "tentorium-cerebelli", relation: "receives-from", note: "tentorial (meningeal) branch" },
      { concept: "frontal-bone", relation: "adjacent-to", note: "supraorbital nerve through the supraorbital notch/foramen" },
      { concept: "sphenoid-bone", relation: "adjacent-to", note: "superior orbital fissure" },
      { concept: "internal-carotid-artery", relation: "adjacent-to", note: "in the cavernous sinus" },
    ],
    clinical:
      "Herpes zoster ophthalmicus is shingles in the V1 dermatome; vesicles on the tip of the nose (Hutchinson sign) indicate nasociliary involvement and a high risk of eye involvement. Meningeal fibres of V1 explain why many headaches are felt in the forehead and around the eye.",
  },

  // ─────────────────────────── Nervous: cerebral cortex (frontal → parietal → temporal → occipital) ───────────────────────────
  "precentral-gyrus": {
    summary:
      "The precentral gyrus lies directly in front of the central sulcus in the frontal lobe and contains the primary motor cortex (Brodmann area 4). Its neurons, including giant Betz cells, send axons down the corticospinal and corticobulbar tracts to control voluntary movement of the opposite side of the body.",
    latin: "Gyrus precentralis",
    functions: [
      "Primary motor cortex: initiates and controls voluntary movement of the contralateral body",
      "Somatotopic map (motor homunculus): face and hand laterally, trunk higher, leg and foot on the medial surface (paracentral lobule)",
      "Large cortical territories for the hand, lips and tongue allow fine control",
    ],
    facts: [
      { label: "Brodmann area", value: "4 (primary motor cortex)" },
      { label: "Corticospinal origin", value: "Only about 30% of corticospinal fibres come from area 4; the rest from premotor/supplementary motor and parietal areas" },
      { label: "Decussation", value: "Most corticospinal fibres (roughly 85–90%) cross in the pyramids of the medulla" },
    ],
    connections: [
      { concept: "postcentral-gyrus", relation: "adjacent-to", note: "across the central sulcus" },
      { concept: "superior-frontal-gyrus", relation: "adjacent-to", note: "premotor/supplementary motor areas in front" },
      { concept: "middle-frontal-gyrus", relation: "adjacent-to" },
      { concept: "internal-capsule", relation: "flows-to", note: "corticospinal fibres descend through the posterior limb" },
      { concept: "putamen", relation: "flows-to", note: "motor cortex input to the basal ganglia" },
      { concept: "thalamus", relation: "receives-from", note: "ventral lateral nucleus relays cerebellar and basal ganglia output" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lateral surface: face, arm and hand areas" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "medial surface: leg and foot areas" },
    ],
    clinical:
      "A middle cerebral artery stroke typically causes contralateral weakness of the face and arm more than the leg, with upper-motor-neuron signs; an anterior cerebral artery stroke affects mainly the contralateral leg.",
  },

  "superior-frontal-gyrus": {
    summary:
      "The superior frontal gyrus runs front-to-back along the upper edge of the frontal lobe and continues onto its medial surface. Its posterior part includes premotor cortex and the supplementary motor area, and its anterior part belongs to the prefrontal cortex.",
    latin: "Gyrus frontalis superior",
    functions: [
      "Supplementary motor area (medial area 6): planning and initiating self-generated movement sequences",
      "Contributes to working memory and other executive functions (prefrontal part)",
      "Self-awareness and cognitive control networks",
    ],
    facts: [{ label: "Brodmann areas", value: "Mainly 6 (posterior), 8 and 9 (anterior)" }],
    connections: [
      { concept: "middle-frontal-gyrus", relation: "adjacent-to", note: "across the superior frontal sulcus" },
      { concept: "precentral-gyrus", relation: "adjacent-to", note: "behind it" },
      { concept: "cingulate-gyrus", relation: "adjacent-to", note: "below it on the medial surface" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "main supply (medial and upper surfaces)" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lateral margin" },
    ],
    clinical:
      "Resection or infarction of the supplementary motor area can cause a transient 'SMA syndrome' — reduced spontaneous movement of the opposite limbs and, on the dominant side, reduced speech — that usually recovers over weeks.",
  },

  "middle-frontal-gyrus": {
    summary:
      "The middle frontal gyrus lies between the superior and inferior frontal sulci on the lateral frontal lobe. It contains the frontal eye field in its posterior part and much of the dorsolateral prefrontal cortex in front.",
    latin: "Gyrus frontalis medius",
    functions: [
      "Frontal eye field (area 8): voluntary saccadic eye movements toward the opposite side",
      "Dorsolateral prefrontal cortex (areas 9/46): working memory, planning and cognitive flexibility",
      "Attention control",
    ],
    facts: [{ label: "Brodmann areas", value: "6, 8, 9 and 46 (posterior to anterior)" }],
    connections: [
      { concept: "superior-frontal-gyrus", relation: "adjacent-to" },
      { concept: "inferior-frontal-gyrus", relation: "adjacent-to", note: "across the inferior frontal sulcus" },
      { concept: "precentral-gyrus", relation: "adjacent-to", note: "behind it" },
      { concept: "middle-cerebral-artery", relation: "supplied-by" },
    ],
    clinical:
      "An acute destructive lesion of one frontal eye field (e.g. a stroke) makes the eyes deviate toward the side of the lesion, because the intact opposite field is unopposed.",
  },

  "inferior-frontal-gyrus": {
    summary:
      "The inferior frontal gyrus is the lowest gyrus on the lateral frontal lobe, divided into opercular, triangular and orbital parts. In the language-dominant (usually left) hemisphere, the opercular and triangular parts form Broca's area, essential for speech production.",
    latin: "Gyrus frontalis inferior",
    functions: [
      "Broca's area (areas 44 and 45, usually left): planning and articulation of speech, grammar",
      "Semantic and phonological processing",
      "Right hemisphere: response inhibition and prosody",
    ],
    facts: [
      { label: "Parts", value: "Pars opercularis (44), pars triangularis (45), pars orbitalis (47)" },
      { label: "Dominance", value: "Language is left-lateralized in roughly 95% of right-handers and most left-handers" },
    ],
    connections: [
      { concept: "middle-frontal-gyrus", relation: "adjacent-to" },
      { concept: "insula", relation: "adjacent-to", note: "its opercular part covers the insula" },
      { concept: "orbital-gyrus", relation: "adjacent-to", note: "pars orbitalis continues onto the orbital surface" },
      { concept: "precentral-gyrus", relation: "adjacent-to", note: "lies in front of the face area of motor cortex" },
      { concept: "superior-temporal-gyrus", relation: "adjacent-to", note: "linked to Wernicke's area by the arcuate fasciculus" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "superior division" },
    ],
    clinical:
      "Damage to Broca's area (typically a left MCA superior-division stroke) causes Broca's (expressive, non-fluent) aphasia: effortful, halting, telegraphic speech with relatively preserved comprehension, often with right face and arm weakness.",
  },

  "orbital-gyrus": {
    summary:
      "The orbital gyri form the undersurface of the frontal lobe, resting on the orbital roofs. Together with the gyrus rectus they make up the orbitofrontal cortex, a part of the prefrontal cortex closely linked to the limbic system.",
    latin: "Gyri orbitales",
    functions: [
      "Evaluates reward and punishment and guides decision-making",
      "Regulates emotional and social behaviour and impulse control",
      "Processes smell and taste (secondary olfactory and gustatory cortex)",
    ],
    facts: [{ label: "Relation", value: "The olfactory bulb and tract lie on the adjacent gyrus rectus" }],
    connections: [
      { concept: "inferior-frontal-gyrus", relation: "adjacent-to", note: "pars orbitalis" },
      { concept: "frontal-bone", relation: "adjacent-to", note: "rests on the orbital plates" },
      { concept: "amygdala", relation: "adjacent-to", note: "strong reciprocal connections" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "medial orbitofrontal branches" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lateral orbitofrontal branches" },
    ],
    clinical:
      "The orbitofrontal cortex is commonly bruised in head injuries as the brain slides over the rough orbital roof, and it degenerates in behavioural-variant frontotemporal dementia — both producing disinhibition, impulsivity and poor social judgement.",
  },

  "postcentral-gyrus": {
    summary:
      "The postcentral gyrus lies just behind the central sulcus at the front of the parietal lobe and contains the primary somatosensory cortex (Brodmann areas 3, 1 and 2). It receives touch, pressure, vibration, position sense, pain and temperature information from the opposite side of the body, relayed by the thalamus.",
    latin: "Gyrus postcentralis",
    functions: [
      "Primary somatosensory cortex: localizes and discriminates bodily sensations",
      "Somatotopic map (sensory homunculus): leg medially, face laterally; large areas for hand, lips and tongue",
      "Supplies sensory feedback to motor cortex for skilled movement",
    ],
    facts: [{ label: "Brodmann areas", value: "3a, 3b, 1 and 2" }],
    connections: [
      { concept: "thalamus", relation: "receives-from", note: "ventral posterolateral (body) and ventral posteromedial (face) nuclei" },
      { concept: "precentral-gyrus", relation: "adjacent-to", note: "across the central sulcus" },
      { concept: "superior-parietal-lobule", relation: "adjacent-to", note: "behind it" },
      { concept: "supramarginal-gyrus", relation: "adjacent-to", note: "behind its lower part" },
      { concept: "internal-capsule", relation: "receives-from", note: "thalamocortical fibres pass through the posterior limb" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lateral surface (face, arm)" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "medial surface (leg)" },
    ],
    clinical:
      "A lesion here causes loss of fine touch, position sense and two-point discrimination on the opposite side of the body, with difficulty recognizing objects by touch (astereognosis); crude pain sensation is often partly preserved.",
  },

  "superior-parietal-lobule": {
    summary:
      "The superior parietal lobule is the part of the parietal lobe above the intraparietal sulcus and behind the postcentral gyrus. It integrates somatosensory and visual information to build a map of the body in space and to guide reaching and grasping.",
    latin: "Lobulus parietalis superior",
    functions: [
      "Somatosensory association: body schema and position of the limbs",
      "Visuospatial processing (the dorsal 'where/how' visual stream)",
      "Visually guided reaching and grasping; spatial attention",
    ],
    facts: [{ label: "Brodmann areas", value: "5 and 7" }],
    connections: [
      { concept: "postcentral-gyrus", relation: "adjacent-to", note: "in front" },
      { concept: "supramarginal-gyrus", relation: "adjacent-to", note: "across the intraparietal sulcus (inferior parietal lobule)" },
      { concept: "occipital-lobe", relation: "adjacent-to", note: "behind; receives dorsal-stream visual input" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lateral surface" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "upper medial margin" },
    ],
    clinical:
      "Damage causes optic ataxia (misreaching for objects under visual guidance) and disturbances of body schema; bilateral parieto-occipital damage produces Bálint syndrome.",
  },

  "supramarginal-gyrus": {
    summary:
      "The supramarginal gyrus is the front part of the inferior parietal lobule, arching over the upturned posterior end of the lateral (Sylvian) sulcus. It is an association area involved in language (phonological processing), in planning skilled actions and, on the right, in spatial attention.",
    latin: "Gyrus supramarginalis",
    functions: [
      "Phonological processing and verbal working memory (usually left)",
      "Planning of skilled, learned movements (praxis)",
      "Somatosensory integration and spatial attention (especially right)",
    ],
    facts: [{ label: "Brodmann area", value: "40" }],
    connections: [
      { concept: "postcentral-gyrus", relation: "adjacent-to", note: "in front" },
      { concept: "superior-parietal-lobule", relation: "adjacent-to", note: "across the intraparietal sulcus" },
      { concept: "superior-temporal-gyrus", relation: "adjacent-to", note: "below, around the end of the lateral sulcus" },
      { concept: "middle-cerebral-artery", relation: "supplied-by" },
    ],
    clinical:
      "Left-sided lesions involving the supramarginal gyrus and underlying arcuate fasciculus can cause conduction aphasia (fluent speech and good comprehension but poor repetition) and apraxia; right inferior parietal damage contributes to neglect of the left side of space.",
  },

  "superior-temporal-gyrus": {
    summary:
      "The superior temporal gyrus runs along the top of the temporal lobe beneath the lateral sulcus. Its upper surface holds the transverse temporal (Heschl) gyri — the primary auditory cortex — and its posterior part in the dominant (usually left) hemisphere forms Wernicke's area, crucial for understanding language.",
    latin: "Gyrus temporalis superior",
    functions: [
      "Primary auditory cortex (areas 41, 42): perception of sound, organized by frequency (tonotopic)",
      "Wernicke's area (posterior area 22, usually left): comprehension of spoken and written language",
      "Auditory association and speech perception; social perception (right)",
    ],
    facts: [
      { label: "Brodmann areas", value: "41, 42 (primary auditory) and 22 (auditory association / Wernicke)" },
      { label: "Auditory input", value: "From the medial geniculate body; each ear projects to both hemispheres" },
    ],
    connections: [
      { concept: "medial-geniculate-body", relation: "receives-from", note: "auditory radiation" },
      { concept: "middle-temporal-gyrus", relation: "adjacent-to", note: "below, across the superior temporal sulcus" },
      { concept: "insula", relation: "adjacent-to", note: "its upper surface faces the insula" },
      { concept: "supramarginal-gyrus", relation: "adjacent-to" },
      { concept: "inferior-frontal-gyrus", relation: "adjacent-to", note: "Wernicke's and Broca's areas are linked by the arcuate fasciculus" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "inferior division" },
    ],
    clinical:
      "Damage to Wernicke's area (e.g. a left MCA inferior-division stroke) causes Wernicke's aphasia: fluent but meaningless speech with poor comprehension, often without limb weakness. Because hearing is bilaterally represented, unilateral auditory cortex damage does not cause deafness.",
  },

  "middle-temporal-gyrus": {
    summary:
      "The middle temporal gyrus lies between the superior and inferior temporal sulci on the lateral surface of the temporal lobe. It is a large association area contributing to word meaning, language comprehension and, near its posterior end, visual motion processing.",
    latin: "Gyrus temporalis medius",
    functions: [
      "Semantic memory and retrieving word meanings (especially left)",
      "Language comprehension within the wider temporal language network",
      "Posterior part lies near motion-sensitive visual cortex (MT/V5) at the temporo-occipital junction",
    ],
    facts: [{ label: "Brodmann area", value: "Mainly 21" }],
    connections: [
      { concept: "superior-temporal-gyrus", relation: "adjacent-to", note: "above" },
      { concept: "inferior-temporal-gyrus", relation: "adjacent-to", note: "below" },
      { concept: "occipital-lobe", relation: "adjacent-to", note: "posteriorly" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "temporal branches" },
    ],
    clinical:
      "Left middle temporal gyrus damage (stroke, tumour, or semantic dementia affecting the anterior temporal lobe) impairs word comprehension and naming.",
  },

  "inferior-temporal-gyrus": {
    summary:
      "The inferior temporal gyrus runs along the lower lateral border of the temporal lobe, curving onto its underside. It is a key part of the ventral ('what') visual stream, where complex shapes and objects are recognized.",
    latin: "Gyrus temporalis inferior",
    functions: [
      "High-level visual object recognition (ventral stream)",
      "Visual memory and object categories",
    ],
    facts: [{ label: "Brodmann area", value: "Mainly 20" }],
    connections: [
      { concept: "middle-temporal-gyrus", relation: "adjacent-to", note: "above" },
      { concept: "fusiform-gyrus", relation: "adjacent-to", note: "medially on the inferior surface" },
      { concept: "occipital-lobe", relation: "receives-from", note: "ventral-stream visual input" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lateral surface" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "inferior surface" },
    ],
    clinical: "Damage along the ventral visual stream can produce visual agnosia — normal eyesight but inability to recognize objects by sight.",
  },

  "fusiform-gyrus": {
    summary:
      "The fusiform (lateral occipitotemporal) gyrus lies on the underside of the temporal and occipital lobes, between the inferior temporal gyrus laterally and the parahippocampal gyrus medially. It contains specialized areas for recognizing faces and written words.",
    latin: "Gyrus fusiformis (occipitotemporalis lateralis)",
    functions: [
      "Fusiform face area (usually more prominent on the right): face recognition",
      "Visual word form area (usually left): recognizing written words",
      "Colour and high-level object processing",
    ],
    facts: [{ label: "Brodmann area", value: "Part of 37" }],
    connections: [
      { concept: "inferior-temporal-gyrus", relation: "adjacent-to", note: "laterally" },
      { concept: "parahippocampal-gyrus", relation: "adjacent-to", note: "medially, across the collateral sulcus" },
      { concept: "occipital-lobe", relation: "receives-from", note: "ventral visual stream" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by" },
    ],
    clinical:
      "Damage (usually right-sided or bilateral, e.g. posterior cerebral artery stroke) can cause prosopagnosia — inability to recognize familiar faces; left-sided damage can cause pure alexia (reading without writing loss).",
  },

  "parahippocampal-gyrus": {
    summary:
      "The parahippocampal gyrus lies on the medial underside of the temporal lobe, alongside the hippocampus. Its anterior part contains the entorhinal cortex — the main gateway for information into and out of the hippocampus — and it hooks forward medially as the uncus.",
    latin: "Gyrus parahippocampalis",
    functions: [
      "Entorhinal cortex relays cortical input to the hippocampus (perforant path) and receives its output",
      "Memory encoding and retrieval",
      "Parahippocampal place area: recognizing scenes and places, spatial navigation",
    ],
    facts: [{ label: "Brodmann areas", value: "27, 28 (entorhinal), 35/36 (perirhinal) and others" }],
    connections: [
      { concept: "hippocampus", relation: "flows-to", note: "entorhinal cortex → hippocampus via the perforant path" },
      { concept: "amygdala", relation: "adjacent-to", note: "under the uncus" },
      { concept: "fusiform-gyrus", relation: "adjacent-to", note: "laterally" },
      { concept: "cingulate-gyrus", relation: "adjacent-to", note: "continuous posteriorly around the splenium (limbic lobe)" },
      { concept: "midbrain", relation: "adjacent-to", note: "uncus lies beside the midbrain at the tentorial notch" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by" },
    ],
    clinical:
      "The entorhinal cortex is among the first regions affected by neurofibrillary tangles in Alzheimer's disease. In transtentorial (uncal) herniation the uncus is forced through the tentorial notch, compressing the oculomotor nerve and midbrain.",
  },

  "cingulate-gyrus": {
    summary:
      "The cingulate gyrus arches around the corpus callosum on the medial surface of each hemisphere, above the callosal sulcus. It is a major component of the limbic lobe, linking emotion, motivation, pain and memory with behaviour.",
    latin: "Gyrus cinguli",
    functions: [
      "Anterior cingulate: emotional aspects of pain, error and conflict monitoring, motivation, autonomic control",
      "Posterior cingulate: memory, self-referential thought (part of the default mode network)",
      "Carries the cingulum bundle linking frontal, parietal and medial temporal regions",
    ],
    facts: [{ label: "Brodmann areas", value: "23, 24, 31, 32 (and others)" }],
    connections: [
      { concept: "corpus-callosum", relation: "adjacent-to", note: "arches above it, separated by the callosal sulcus" },
      { concept: "superior-frontal-gyrus", relation: "adjacent-to", note: "above on the medial surface" },
      { concept: "parahippocampal-gyrus", relation: "adjacent-to", note: "continuous behind the splenium" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "pericallosal and callosomarginal branches" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "posterior part" },
    ],
    clinical:
      "In subfalcine herniation the cingulate gyrus is pushed under the falx cerebri, which can compress the anterior cerebral artery and cause leg weakness. Anterior cingulate lesions can cause apathy and reduced spontaneous activity (abulia, or akinetic mutism when bilateral).",
  },

  "insula": {
    summary:
      "The insula is a triangular region of cortex folded deep within the lateral (Sylvian) sulcus, hidden by the frontal, parietal and temporal opercula. It integrates signals from inside the body with emotion and awareness.",
    latin: "Insula (lobus insularis)",
    functions: [
      "Interoception — awareness of heartbeat, breathing, gut sensations and bodily state",
      "Primary gustatory (taste) cortex",
      "Visceral and autonomic control; pain and temperature processing",
      "Emotional awareness (e.g. disgust) and empathy",
    ],
    connections: [
      { concept: "inferior-frontal-gyrus", relation: "adjacent-to", note: "frontal operculum covers it" },
      { concept: "superior-temporal-gyrus", relation: "adjacent-to", note: "temporal operculum covers it" },
      { concept: "putamen", relation: "adjacent-to", note: "deep to it, beyond the extreme capsule, claustrum and external capsule" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "insular (M2) branches run over its surface" },
    ],
    clinical:
      "Because the middle cerebral artery runs over the insula, loss of the normal grey–white 'insular ribbon' on CT is an early sign of MCA stroke.",
  },

  "occipital-lobe": {
    summary:
      "The occipital lobe forms the back of each cerebral hemisphere and is devoted mainly to vision. The primary visual cortex (V1, striate cortex) lines the calcarine sulcus on its medial surface, surrounded by visual association areas.",
    latin: "Lobus occipitalis",
    functions: [
      "Primary visual cortex (area 17): receives the contralateral visual field from the lateral geniculate body",
      "Visual association cortex (areas 18, 19): colour, form and motion analysis",
      "Sends the dorsal ('where/how') stream to parietal cortex and the ventral ('what') stream to temporal cortex",
    ],
    facts: [
      { label: "Retinotopy", value: "Upper bank of the calcarine sulcus = lower visual field; lower bank = upper field; central (macular) vision at the occipital pole" },
      { label: "Brodmann areas", value: "17, 18, 19" },
    ],
    connections: [
      { concept: "lateral-geniculate-body", relation: "receives-from", note: "via the optic radiation" },
      { concept: "superior-parietal-lobule", relation: "flows-to", note: "dorsal visual stream" },
      { concept: "inferior-temporal-gyrus", relation: "flows-to", note: "ventral visual stream" },
      { concept: "fusiform-gyrus", relation: "adjacent-to" },
      { concept: "tentorium-cerebelli", relation: "adjacent-to", note: "rests on it, above the cerebellum" },
      { concept: "occipital-bone", relation: "adjacent-to" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "calcarine artery" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "occipital pole collaterals" },
    ],
    clinical:
      "A posterior cerebral artery stroke causes contralateral homonymous hemianopia, often with macular sparing because the occipital pole may also receive MCA blood. Bilateral damage causes cortical blindness.",
  },

  // ─────────────────────────── Nervous: white matter & deep grey matter ───────────────────────────
  "cerebral-white-matter": {
    summary:
      "The cerebral white matter lies beneath the cortex and is made of myelinated axons that connect cortical areas with each other and with deeper structures. It contains association fibres (within one hemisphere), commissural fibres (between hemispheres, e.g. corpus callosum) and projection fibres (to and from the brainstem and spinal cord, e.g. internal capsule).",
    latin: "Substantia alba cerebri",
    functions: [
      "Association fibres (e.g. arcuate fasciculus, cingulum) link cortical areas within a hemisphere",
      "Commissural fibres coordinate the two hemispheres",
      "Projection fibres (corona radiata → internal capsule) carry motor output and sensory input",
      "Myelin (from oligodendrocytes) greatly increases conduction speed",
    ],
    facts: [
      { label: "Whole brain (context)", value: "About 1.3–1.4 kg with roughly 86 billion neurons, about 16 billion of them in the cerebral cortex" },
      { label: "Blood flow (whole brain)", value: "About 15% of resting cardiac output; about 20% of the body's resting oxygen use" },
      { label: "Myelinated fibres", value: "Estimated total length roughly 150,000–180,000 km in young adults" },
    ],
    connections: [
      { concept: "corpus-callosum", relation: "contains" },
      { concept: "internal-capsule", relation: "contains" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "periventricular white matter surrounds the lateral ventricles" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "deep medullary and lenticulostriate branches" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by" },
    ],
    clinical:
      "Multiple sclerosis produces demyelinating plaques, typically around the ventricles. Small-vessel disease from ageing and hypertension appears as white-matter hyperintensities on MRI and contributes to cognitive decline.",
  },

  "corpus-callosum": {
    summary:
      "The corpus callosum is the largest commissure of the brain, a thick arched band of white matter at the floor of the longitudinal fissure connecting the two cerebral hemispheres. From front to back it has a rostrum, genu, body and splenium.",
    latin: "Corpus callosum",
    functions: [
      "Transfers sensory, motor and cognitive information between the hemispheres",
      "Coordinates bilateral activity (e.g. two-handed tasks)",
      "Splenium carries visual information between occipital lobes",
    ],
    facts: [{ label: "Axons", value: "Roughly 200 million or more" }],
    connections: [
      { concept: "cerebral-white-matter", relation: "part-of" },
      { concept: "cingulate-gyrus", relation: "adjacent-to", note: "above, across the callosal sulcus" },
      { concept: "fornix", relation: "adjacent-to", note: "below; linked by the septum pellucidum" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "forms the roof of the lateral ventricles" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "pericallosal artery" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "splenium" },
    ],
    clinical:
      "Cutting the corpus callosum (callosotomy) to control severe epilepsy produced the 'split-brain' findings of Sperry and Gazzaniga: information shown to one hemisphere is not available to the other. Agenesis of the corpus callosum is a relatively common brain malformation.",
  },

  "internal-capsule": {
    summary:
      "The internal capsule is a compact, V-shaped band of projection fibres (in horizontal section) running between the caudate nucleus and thalamus medially and the lentiform nucleus (putamen and globus pallidus) laterally. Almost all traffic between the cortex and the brainstem and spinal cord passes through it.",
    latin: "Capsula interna",
    functions: [
      "Anterior limb: frontopontine fibres and thalamic radiation to prefrontal cortex",
      "Genu: corticobulbar fibres (face and head muscles)",
      "Posterior limb: corticospinal fibres and somatosensory radiation from the thalamus",
      "Retro- and sublenticular parts: optic and auditory radiations",
    ],
    connections: [
      { concept: "cerebral-white-matter", relation: "part-of", note: "continuous above with the corona radiata" },
      { concept: "precentral-gyrus", relation: "receives-from", note: "corticospinal and corticobulbar fibres" },
      { concept: "cerebral-peduncle", relation: "flows-to", note: "descending fibres continue into the crus cerebri" },
      { concept: "caudate-nucleus", relation: "adjacent-to", note: "medial to the anterior limb" },
      { concept: "thalamus", relation: "adjacent-to", note: "medial to the posterior limb" },
      { concept: "putamen", relation: "adjacent-to", note: "lateral" },
      { concept: "globus-pallidus", relation: "adjacent-to", note: "lateral" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lenticulostriate arteries" },
      { concept: "internal-carotid-artery", relation: "supplied-by", note: "anterior choroidal artery (lower posterior limb)" },
    ],
    clinical:
      "Because fibres are so tightly packed here, a small lacunar infarct in the posterior limb can cause pure motor hemiparesis of the opposite face, arm and leg. Internal capsule haemorrhage from lenticulostriate vessels is a classic cause of dense hemiplegia.",
  },

  "caudate-nucleus": {
    summary:
      "The caudate nucleus is a C-shaped mass of grey matter whose large head bulges into the lateral wall of the anterior horn of the lateral ventricle, tapering through a body into a tail that curves into the temporal lobe. With the putamen it forms the striatum, the main input station of the basal ganglia.",
    latin: "Nucleus caudatus",
    functions: [
      "Basal ganglia circuits for goal-directed behaviour, learning and habit formation",
      "Control of eye movements and cognitive/executive loops with prefrontal cortex",
      "Receives dopaminergic input from the substantia nigra",
    ],
    facts: [{ label: "Striatum", value: "Caudate + putamen, partly separated by the anterior limb of the internal capsule but joined by grey bridges (hence 'striated')" }],
    connections: [
      { concept: "putamen", relation: "adjacent-to", note: "together form the striatum" },
      { concept: "internal-capsule", relation: "adjacent-to", note: "anterior limb separates it from the lentiform nucleus" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "forms the lateral wall of the lateral ventricle" },
      { concept: "thalamus", relation: "adjacent-to" },
      { concept: "amygdala", relation: "adjacent-to", note: "tail ends near it in the temporal lobe" },
      { concept: "midbrain", relation: "receives-from", note: "dopamine from the substantia nigra (nigrostriatal pathway)" },
      { concept: "globus-pallidus", relation: "flows-to", note: "striatal output" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "recurrent artery of Heubner (head)" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lenticulostriate arteries" },
    ],
    clinical:
      "In Huntington's disease the caudate nucleus atrophies early, flattening the lateral ventricle walls on imaging and causing chorea, psychiatric symptoms and cognitive decline.",
  },

  "putamen": {
    summary:
      "The putamen is the outer part of the lentiform nucleus, lying lateral to the globus pallidus and deep to the insula. With the caudate nucleus it forms the striatum and is the main basal ganglia input for motor circuits.",
    latin: "Putamen",
    functions: [
      "Receives motor and somatosensory cortical input and dopamine from the substantia nigra",
      "Motor loop of the basal ganglia: selecting, scaling and learning movements",
      "Habit and procedural learning",
    ],
    connections: [
      { concept: "globus-pallidus", relation: "flows-to", note: "striatal output to external and internal segments" },
      { concept: "precentral-gyrus", relation: "receives-from", note: "motor cortex input" },
      { concept: "midbrain", relation: "receives-from", note: "nigrostriatal dopamine" },
      { concept: "caudate-nucleus", relation: "adjacent-to", note: "together form the striatum" },
      { concept: "internal-capsule", relation: "adjacent-to", note: "medially" },
      { concept: "insula", relation: "adjacent-to", note: "laterally, beyond the external capsule and claustrum" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lateral lenticulostriate arteries" },
    ],
    clinical:
      "The putamen is the most common site of hypertensive intracerebral haemorrhage, from rupture of small lenticulostriate arteries. It is the part of the striatum most depleted of dopamine in Parkinson's disease.",
  },

  "globus-pallidus": {
    summary:
      "The globus pallidus is the pale, inner part of the lentiform nucleus, medial to the putamen and lateral to the internal capsule. Its internal segment is the main inhibitory output of the basal ganglia to the thalamus.",
    latin: "Globus pallidus",
    functions: [
      "Internal segment (GPi): tonic GABAergic inhibition of motor thalamus, released to permit movement",
      "External segment (GPe): part of the indirect pathway regulating GPi via the subthalamic nucleus",
      "Scales and selects movements with the rest of the basal ganglia",
    ],
    facts: [{ label: "Appearance", value: "Pale because of many myelinated fibres passing through it" }],
    connections: [
      { concept: "putamen", relation: "receives-from" },
      { concept: "caudate-nucleus", relation: "receives-from" },
      { concept: "thalamus", relation: "flows-to", note: "to the ventral anterior/ventral lateral nuclei" },
      { concept: "internal-capsule", relation: "adjacent-to", note: "medially" },
      { concept: "middle-cerebral-artery", relation: "supplied-by", note: "lenticulostriate arteries" },
      { concept: "internal-carotid-artery", relation: "supplied-by", note: "anterior choroidal artery (medial part)" },
    ],
    clinical:
      "The internal globus pallidus is a target for deep brain stimulation in Parkinson's disease and dystonia. Carbon monoxide poisoning characteristically damages both globi pallidi.",
  },

  "thalamus": {
    summary:
      "Each thalamus is an egg-shaped mass of grey matter forming the lateral wall of the third ventricle, above the hypothalamus. It contains many nuclei that relay and regulate nearly all information reaching the cerebral cortex, earning it the name 'gateway to the cortex'.",
    latin: "Thalamus",
    functions: [
      "Relays all sensory pathways except smell to the cortex (VPL body, VPM face, lateral geniculate vision, medial geniculate hearing)",
      "Relays basal ganglia and cerebellar output to motor cortex (VA/VL nuclei)",
      "Limbic relay (anterior nucleus) in memory circuits",
      "Regulates arousal, attention and consciousness (intralaminar and reticular nuclei)",
    ],
    connections: [
      { concept: "lateral-geniculate-body", relation: "contains" },
      { concept: "medial-geniculate-body", relation: "contains" },
      { concept: "postcentral-gyrus", relation: "flows-to", note: "somatosensory radiation" },
      { concept: "precentral-gyrus", relation: "flows-to", note: "motor thalamus to motor cortex" },
      { concept: "globus-pallidus", relation: "receives-from", note: "basal ganglia output" },
      { concept: "cerebellum", relation: "receives-from", note: "via the superior cerebellar peduncle" },
      { concept: "mammillary-body", relation: "receives-from", note: "mammillothalamic tract to the anterior nucleus" },
      { concept: "internal-capsule", relation: "adjacent-to", note: "lateral, posterior limb" },
      { concept: "hypothalamus", relation: "adjacent-to", note: "below, across the hypothalamic sulcus" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "thalamoperforating and thalamogeniculate branches" },
    ],
    clinical:
      "A thalamic stroke causes contralateral loss of sensation; some patients later develop severe burning pain on that side (thalamic pain, Dejerine–Roussy syndrome).",
  },

  "medial-geniculate-body": {
    summary:
      "The medial geniculate body (nucleus) is the thalamic relay for hearing, a small swelling on the back of the thalamus beneath the pulvinar. It receives input from the inferior colliculus and projects through the auditory radiation to the primary auditory cortex.",
    latin: "Corpus geniculatum mediale",
    functions: [
      "Relays auditory signals to primary auditory cortex (Heschl gyri)",
      "Contributes to frequency, intensity and sound-localization processing",
    ],
    connections: [
      { concept: "thalamus", relation: "part-of" },
      { concept: "inferior-colliculus", relation: "receives-from", note: "via the brachium of the inferior colliculus" },
      { concept: "superior-temporal-gyrus", relation: "flows-to", note: "auditory radiation to the transverse temporal gyri" },
      { concept: "lateral-geniculate-body", relation: "adjacent-to" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by" },
    ],
    clinical:
      "Because each ear projects to both sides above the cochlear nuclei, a unilateral medial geniculate lesion does not cause deafness in one ear, though it can impair sound localization.",
  },

  "hypothalamus": {
    summary:
      "The hypothalamus is a small region of the diencephalon below the thalamus, forming the floor and lower walls of the third ventricle. Despite weighing only about 4 g, it is the master regulator of homeostasis, linking the nervous system to the endocrine system via the pituitary gland.",
    latin: "Hypothalamus",
    functions: [
      "Controls the anterior pituitary via releasing/inhibiting hormones in the hypophyseal portal vessels",
      "Makes ADH (vasopressin) and oxytocin, released from the posterior pituitary",
      "Regulates body temperature, hunger, satiety, thirst and water balance",
      "Sets circadian rhythms (suprachiasmatic nucleus) and coordinates autonomic and emotional responses",
    ],
    facts: [{ label: "Mass", value: "About 4 g — less than 1% of the brain" }],
    connections: [
      { concept: "pituitary-gland", relation: "controls", note: "portal hormones (anterior lobe) and axons (posterior lobe)" },
      { concept: "pineal-gland", relation: "controls", note: "suprachiasmatic nucleus times melatonin release via a sympathetic pathway" },
      { concept: "mammillary-body", relation: "contains" },
      { concept: "fornix", relation: "receives-from", note: "hippocampal output to the mammillary bodies" },
      { concept: "amygdala", relation: "receives-from", note: "emotional input (stria terminalis)" },
      { concept: "optic-chiasm", relation: "receives-from", note: "retinal light input to the suprachiasmatic nucleus" },
      { concept: "thalamus", relation: "adjacent-to", note: "above, across the hypothalamic sulcus" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "floor and lower walls of the third ventricle" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "small perforating branches of the circle of Willis" },
      { concept: "anterior-cerebral-artery", relation: "supplied-by", note: "small perforating branches of the circle of Willis" },
    ],
    clinical:
      "Hypothalamic lesions (tumours such as craniopharyngioma, trauma, surgery) can disturb temperature, appetite (obesity or wasting), sleep and water balance — for example central diabetes insipidus from loss of ADH.",
  },

  "mammillary-body": {
    summary:
      "The mammillary bodies are a pair of small, round nuclei on the underside of the posterior hypothalamus, just in front of the midbrain. They are relay stations in the Papez circuit, receiving the fornix from the hippocampus and projecting to the anterior thalamus.",
    latin: "Corpus mammillare",
    functions: [
      "Relay in memory circuits (hippocampus → fornix → mammillary body → anterior thalamus)",
      "Contribute to spatial and episodic memory",
    ],
    connections: [
      { concept: "hypothalamus", relation: "part-of" },
      { concept: "fornix", relation: "receives-from" },
      { concept: "thalamus", relation: "flows-to", note: "mammillothalamic tract to the anterior nucleus" },
      { concept: "cerebral-peduncle", relation: "adjacent-to", note: "just in front of the interpeduncular fossa" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "perforating branches" },
    ],
    clinical:
      "In Wernicke–Korsakoff syndrome (thiamine deficiency, often with alcohol misuse) the mammillary bodies are damaged and may atrophy, causing confusion, eye-movement problems, ataxia and lasting amnesia with confabulation.",
  },

  "fornix": {
    summary:
      "The fornix is a C-shaped bundle of white matter that is the main output pathway of the hippocampus. It arches from the hippocampus up beneath the corpus callosum and then down in front of the thalamus to end chiefly in the mammillary bodies.",
    latin: "Fornix",
    functions: [
      "Carries hippocampal output to the mammillary bodies and septal nuclei",
      "Part of the Papez circuit supporting memory formation",
    ],
    facts: [{ label: "Parts", value: "Fimbria → crus → body → columns" }],
    connections: [
      { concept: "hippocampus", relation: "receives-from" },
      { concept: "mammillary-body", relation: "flows-to" },
      { concept: "corpus-callosum", relation: "adjacent-to", note: "body runs beneath it" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "columns form the front of the interventricular foramen" },
      { concept: "thalamus", relation: "adjacent-to" },
      { concept: "choroid-plexus", relation: "adjacent-to", note: "choroid fissure between fornix and thalamus" },
    ],
    clinical:
      "Bilateral damage to the fornix (e.g. during removal of a colloid cyst of the third ventricle) can cause anterograde amnesia.",
  },

  "hippocampus": {
    summary:
      "The hippocampus is a curved ridge of grey matter in the medial temporal lobe, forming the floor of the inferior (temporal) horn of the lateral ventricle. It is essential for forming new declarative (fact and event) memories and for spatial navigation.",
    latin: "Hippocampus",
    functions: [
      "Consolidates new episodic and semantic memories",
      "Spatial memory and navigation ('place cells')",
      "Regulates stress responses via the hypothalamus",
    ],
    facts: [
      { label: "Name", value: "Greek for 'seahorse', after its shape" },
      { label: "Subfields", value: "Dentate gyrus, CA1–CA4 (cornu ammonis) and subiculum" },
      { label: "Classic case", value: "Patient H.M. lost the ability to form new declarative memories after bilateral medial temporal lobe removal in 1953" },
    ],
    connections: [
      { concept: "parahippocampal-gyrus", relation: "receives-from", note: "entorhinal cortex via the perforant path" },
      { concept: "fornix", relation: "flows-to", note: "main output" },
      { concept: "amygdala", relation: "adjacent-to", note: "directly in front" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "floor of the temporal horn" },
      { concept: "choroid-plexus", relation: "adjacent-to", note: "in the temporal horn" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "hippocampal arteries" },
    ],
    clinical:
      "The hippocampus shrinks early in Alzheimer's disease, and its CA1 neurons are highly vulnerable to hypoxia. Hippocampal sclerosis is the commonest cause of drug-resistant temporal lobe epilepsy.",
  },

  "amygdala": {
    summary:
      "The amygdala is an almond-shaped cluster of nuclei deep in the front of the medial temporal lobe, just in front of the hippocampus and beneath the uncus. It evaluates the emotional significance of stimuli — especially threats — and triggers appropriate autonomic, hormonal and behavioural responses.",
    latin: "Corpus amygdaloideum",
    functions: [
      "Detects threat and generates fear responses; fear conditioning",
      "Enhances memory of emotionally charged events",
      "Drives autonomic and hormonal stress responses through the hypothalamus and brainstem",
      "Social and olfactory processing",
    ],
    connections: [
      { concept: "hypothalamus", relation: "controls", note: "via the stria terminalis and ventral amygdalofugal pathway" },
      { concept: "hippocampus", relation: "adjacent-to", note: "behind it" },
      { concept: "parahippocampal-gyrus", relation: "adjacent-to", note: "deep to the uncus" },
      { concept: "orbital-gyrus", relation: "adjacent-to", note: "reciprocal connections with orbitofrontal cortex" },
      { concept: "caudate-nucleus", relation: "adjacent-to", note: "the caudate tail ends near it" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "in front of the tip of the temporal horn" },
      { concept: "internal-carotid-artery", relation: "supplied-by", note: "anterior choroidal artery" },
      { concept: "middle-cerebral-artery", relation: "supplied-by" },
    ],
    clinical:
      "Bilateral amygdala damage (e.g. Urbach–Wiethe disease) impairs fear recognition and fear responses. Amygdala hyperactivity is linked to anxiety disorders and PTSD, and the amygdala is a frequent focus in temporal lobe epilepsy.",
  },

  // ─────────────────────────── Nervous: endocrine brain structures ───────────────────────────
  "pituitary-gland": {
    summary:
      "The pituitary gland (hypophysis) is a pea-sized endocrine gland sitting in the sella turcica of the sphenoid bone, attached to the hypothalamus by the infundibulum (stalk). Its anterior lobe (adenohypophysis) secretes six major hormones that control other endocrine glands, and its posterior lobe (neurohypophysis) releases ADH and oxytocin made in the hypothalamus.",
    latin: "Hypophysis (glandula pituitaria)",
    functions: [
      "Anterior lobe: growth hormone, prolactin, ACTH, TSH, FSH and LH",
      "Posterior lobe: releases antidiuretic hormone (vasopressin) and oxytocin",
      "Relays hypothalamic control to the thyroid, adrenal cortex, gonads, breasts and kidneys",
    ],
    facts: [
      { label: "Size", value: "About 1 cm across; roughly 0.5–1 g" },
      { label: "Origins", value: "Anterior lobe from Rathke's pouch (oral ectoderm); posterior lobe is a downgrowth of the hypothalamus" },
    ],
    connections: [
      { concept: "hypothalamus", relation: "adjacent-to", note: "attached by the infundibulum; controlled by it through portal vessels and axons" },
      { concept: "thyroid-gland", relation: "controls", note: "TSH" },
      { concept: "adrenal-gland", relation: "controls", note: "ACTH → cortisol and adrenal androgens" },
      { concept: "testis", relation: "controls", note: "LH (testosterone) and FSH (spermatogenesis)" },
      { concept: "ovary", relation: "controls", note: "FSH and LH drive the ovarian cycle" },
      { concept: "mammary-gland", relation: "controls", note: "prolactin (milk production), oxytocin (milk ejection)" },
      { concept: "uterus", relation: "controls", note: "oxytocin stimulates contractions in labour" },
      { concept: "kidney", relation: "controls", note: "ADH increases water reabsorption in the collecting ducts" },
      { concept: "optic-chiasm", relation: "adjacent-to", note: "lies just above" },
      { concept: "sphenoid-bone", relation: "adjacent-to", note: "sits in the sella turcica (hypophyseal fossa)" },
      { concept: "internal-carotid-artery", relation: "supplied-by", note: "superior and inferior hypophyseal arteries; also lies beside it in the cavernous sinus" },
    ],
    sexDifferences:
      "The gland enlarges during pregnancy because prolactin-secreting cells multiply; this makes it vulnerable to infarction after severe postpartum haemorrhage (Sheehan syndrome).",
    clinical:
      "Pituitary adenomas can cause hormone excess (prolactinoma, acromegaly from growth hormone, Cushing disease from ACTH) or, as they grow upward, compress the optic chiasm and cause bitemporal hemianopia.",
  },

  "pineal-gland": {
    summary:
      "The pineal gland is a small, pine-cone-shaped endocrine gland in the midline of the epithalamus, attached to the back of the third ventricle and resting between the superior colliculi. It secretes melatonin, mainly at night, under control of the hypothalamic circadian clock.",
    latin: "Glandula pinealis (corpus pineale)",
    functions: [
      "Secretes melatonin in darkness, signalling night to the body",
      "Helps entrain circadian and seasonal rhythms, including sleep timing",
    ],
    facts: [
      { label: "Size", value: "About 5–8 mm long; roughly 0.1–0.2 g" },
      { label: "Calcification", value: "Commonly calcifies with age ('brain sand'), a midline landmark on imaging" },
    ],
    connections: [
      { concept: "superior-colliculus", relation: "adjacent-to", note: "rests between the superior colliculi" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "attached to the posterior wall of the third ventricle" },
      { concept: "thalamus", relation: "adjacent-to" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "postganglionic fibres from the superior cervical ganglion" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "posterior choroidal branches" },
    ],
    clinical:
      "Pineal tumours can compress the cerebral aqueduct, causing obstructive hydrocephalus, and the dorsal midbrain, causing Parinaud syndrome (impaired upward gaze and poorly reactive pupils).",
  },

  // ─────────────────────────── Nervous: brainstem (rostral → caudal), cerebellum, meninges ───────────────────────────
  "midbrain": {
    summary:
      "The midbrain (mesencephalon) is the short, uppermost part of the brainstem, passing through the opening in the tentorium cerebelli between the diencephalon and the pons. It has a dorsal roof (tectum) with the superior and inferior colliculi, a central tegmentum containing the red nucleus and substantia nigra, and ventral cerebral peduncles; the cerebral aqueduct runs through it.",
    latin: "Mesencephalon",
    functions: [
      "Visual and auditory reflex centres (superior and inferior colliculi)",
      "Nuclei of the oculomotor (III) and trochlear (IV) nerves; pupillary light reflex (pretectum)",
      "Substantia nigra supplies dopamine to the striatum for movement control",
      "Conducts ascending sensory and descending motor pathways; periaqueductal grey modulates pain",
    ],
    facts: [{ label: "Length", value: "About 2 cm" }],
    connections: [
      { concept: "superior-colliculus", relation: "contains" },
      { concept: "inferior-colliculus", relation: "contains" },
      { concept: "cerebral-peduncle", relation: "contains" },
      { concept: "oculomotor-nerve-cn-iii", relation: "gives-rise-to", note: "emerges from the interpeduncular fossa" },
      { concept: "trochlear-nerve-cn-iv", relation: "gives-rise-to", note: "emerges dorsally below the inferior colliculi" },
      { concept: "putamen", relation: "controls", note: "dopaminergic nigrostriatal pathway" },
      { concept: "pons", relation: "adjacent-to", note: "below" },
      { concept: "thalamus", relation: "adjacent-to", note: "above" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "cerebral aqueduct runs through it" },
      { concept: "tentorium-cerebelli", relation: "adjacent-to", note: "passes through the tentorial notch" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "basilar and superior cerebellar branches" },
    ],
    clinical:
      "Parkinson's disease results from loss of dopamine-producing neurons in the substantia nigra (pars compacta). Stenosis of the narrow cerebral aqueduct is a classic cause of obstructive hydrocephalus.",
  },

  "cerebral-peduncle": {
    summary:
      "The cerebral peduncles are the two massive stalks on the front of the midbrain that connect the cerebrum to the rest of the brainstem. Their anterior part (crus cerebri) carries descending corticospinal, corticobulbar and corticopontine fibres continuing down from the internal capsule; the oculomotor nerve emerges from the interpeduncular fossa between them.",
    latin: "Pedunculus cerebri",
    functions: [
      "Conduct motor commands from the cortex to the brainstem and spinal cord",
      "Carry corticopontine fibres that link cortex to cerebellum via the pons",
    ],
    connections: [
      { concept: "midbrain", relation: "part-of" },
      { concept: "internal-capsule", relation: "receives-from", note: "descending projection fibres" },
      { concept: "pons", relation: "flows-to", note: "corticospinal and corticopontine fibres continue into the basilar pons" },
      { concept: "optic-tract", relation: "adjacent-to", note: "winds around its lateral side" },
      { concept: "oculomotor-nerve-cn-iii", relation: "adjacent-to", note: "emerges medially, in the interpeduncular fossa" },
      { concept: "posterior-cerebral-artery", relation: "adjacent-to", note: "curves around it" },
      { concept: "mammillary-body", relation: "adjacent-to", note: "in front of the interpeduncular fossa" },
    ],
    clinical:
      "Weber syndrome — a ventral midbrain stroke — combines an ipsilateral oculomotor palsy with contralateral hemiplegia. In uncal herniation the peduncle can be compressed; if the opposite peduncle is pushed against the tentorial edge (Kernohan notch), weakness appears on the same side as the mass, a false localizing sign.",
  },

  "superior-colliculus": {
    summary:
      "The superior colliculi are the upper pair of rounded bumps on the back (tectum) of the midbrain. They receive visual input directly from the retina and from the cortex and direct rapid eye and head movements toward things of interest.",
    latin: "Colliculus superior",
    functions: [
      "Orients the eyes and head toward visual (and auditory and tactile) targets",
      "Generates saccadic eye movements",
      "Integrates multisensory spatial maps",
    ],
    connections: [
      { concept: "midbrain", relation: "part-of" },
      { concept: "optic-tract", relation: "receives-from", note: "via the brachium of the superior colliculus" },
      { concept: "inferior-colliculus", relation: "adjacent-to", note: "below" },
      { concept: "pineal-gland", relation: "adjacent-to", note: "the pineal rests between them" },
      { concept: "thalamus", relation: "adjacent-to", note: "pulvinar lies above" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by" },
    ],
    clinical:
      "Tumours of the nearby pineal gland can compress the dorsal midbrain (superior colliculi and pretectal area), causing Parinaud syndrome with impaired upward gaze.",
  },

  "inferior-colliculus": {
    summary:
      "The inferior colliculi are the lower pair of bumps on the back of the midbrain. They are an obligatory relay in the ascending auditory pathway, integrating input from both ears before passing it to the medial geniculate body of the thalamus.",
    latin: "Colliculus inferior",
    functions: [
      "Integrates ascending auditory information (via the lateral lemniscus) from both ears",
      "Sound localization and frequency analysis",
      "Auditory reflexes such as the startle response",
    ],
    connections: [
      { concept: "midbrain", relation: "part-of" },
      { concept: "medial-geniculate-body", relation: "flows-to", note: "via the brachium of the inferior colliculus" },
      { concept: "superior-colliculus", relation: "adjacent-to", note: "above" },
      { concept: "trochlear-nerve-cn-iv", relation: "adjacent-to", note: "emerges just below" },
      { concept: "cerebellum", relation: "adjacent-to", note: "behind and below" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "superior cerebellar artery branches" },
    ],
    clinical:
      "Because the auditory pathway is bilateral above the cochlear nuclei, a lesion of one inferior colliculus does not cause deafness in one ear.",
  },

  "pons": {
    summary:
      "The pons is the bulging middle part of the brainstem, lying between the midbrain and medulla in front of the cerebellum. Its large basilar part relays signals from the cerebral cortex to the cerebellum, and its dorsal tegmentum contains cranial nerve nuclei and centres that help regulate breathing and sleep.",
    latin: "Pons",
    functions: [
      "Relays cortical information to the cerebellum (pontine nuclei → middle cerebellar peduncle)",
      "Nuclei of the trigeminal (V), abducens (VI), facial (VII) and part of the vestibulocochlear (VIII) nerves",
      "Helps regulate breathing rhythm and REM sleep",
      "Conducts ascending and descending tracts",
    ],
    facts: [{ label: "Length", value: "About 2.5 cm" }],
    connections: [
      { concept: "midbrain", relation: "adjacent-to", note: "above" },
      { concept: "medulla-oblongata", relation: "adjacent-to", note: "below" },
      { concept: "cerebellum", relation: "adjacent-to", note: "joined by the middle cerebellar peduncles" },
      { concept: "cerebral-peduncle", relation: "receives-from", note: "descending corticospinal and corticopontine fibres" },
      { concept: "facial-nerve-cn-vii", relation: "gives-rise-to", note: "emerges at the pontomedullary junction" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "forms the upper floor of the fourth ventricle" },
      { concept: "occipital-bone", relation: "adjacent-to", note: "rests on the clivus" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "pontine branches of the basilar artery" },
    ],
    clinical:
      "A basilar artery occlusion affecting the ventral pons can cause locked-in syndrome: complete paralysis with preserved consciousness and vertical eye movements. Overly rapid correction of low blood sodium can cause osmotic demyelination, classically in the central pons.",
  },

  "medulla-oblongata": {
    summary:
      "The medulla oblongata is the lowest part of the brainstem, about 3 cm long, running from the pons to the foramen magnum, where it becomes the spinal cord. It contains vital centres for breathing, heart rate and blood pressure, the nuclei of the last cranial nerves, and the pyramids where most corticospinal fibres cross.",
    latin: "Medulla oblongata (myelencephalon)",
    functions: [
      "Respiratory rhythm generation and cardiovascular control centres",
      "Reflexes: swallowing, coughing, sneezing, vomiting (area postrema)",
      "Nuclei of glossopharyngeal (IX), vagus (X), accessory (XI) and hypoglossal (XII) nerves",
      "Pyramidal decussation of the corticospinal tracts; relay of dorsal column sensation (gracile and cuneate nuclei)",
    ],
    facts: [{ label: "Length", value: "About 3 cm" }],
    connections: [
      { concept: "pons", relation: "adjacent-to", note: "above" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "continuous at the foramen magnum" },
      { concept: "cerebellum", relation: "adjacent-to", note: "joined by the inferior cerebellar peduncles" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "lower floor of the fourth ventricle; CSF exits via its apertures" },
      { concept: "vagus-nerve-cn-x", relation: "gives-rise-to", note: "rootlets emerge behind the olive" },
      { concept: "occipital-bone", relation: "adjacent-to", note: "foramen magnum" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery branches incl. PICA and anterior spinal artery" },
    ],
    clinical:
      "Lateral medullary (Wallenberg) syndrome, from vertebral or PICA occlusion, causes vertigo, dysphagia, hoarseness, ipsilateral facial and contralateral body pain/temperature loss, ataxia and Horner syndrome. Herniation of the cerebellar tonsils through the foramen magnum compresses the medulla and can cause fatal respiratory arrest.",
  },

  "cerebellum": {
    summary:
      "The cerebellum ('little brain') lies in the posterior cranial fossa beneath the tentorium cerebelli, behind the pons and medulla. It compares intended with actual movement and fine-tunes posture, balance, coordination and motor learning; it is attached to the brainstem by three pairs of peduncles.",
    latin: "Cerebellum",
    functions: [
      "Coordinates the timing and accuracy of voluntary movements",
      "Maintains balance and posture (vermis and flocculonodular lobe)",
      "Motor learning and adaptation",
      "Contributes to some cognitive and language functions",
    ],
    facts: [
      { label: "Size vs neurons", value: "About 10% of brain mass but roughly 80% of its neurons (~69 billion, mostly granule cells)" },
      { label: "Peduncles", value: "Superior (to midbrain), middle (from pons), inferior (from medulla)" },
      { label: "Laterality", value: "Each hemisphere controls the same side of the body" },
    ],
    connections: [
      { concept: "pons", relation: "receives-from", note: "cortical input via the middle cerebellar peduncle" },
      { concept: "medulla-oblongata", relation: "receives-from", note: "spinal and vestibular input via the inferior peduncle" },
      { concept: "thalamus", relation: "flows-to", note: "output via the superior peduncle to the ventral lateral nucleus" },
      { concept: "midbrain", relation: "adjacent-to", note: "superior cerebellar peduncle" },
      { concept: "tentorium-cerebelli", relation: "adjacent-to", note: "roofs it over" },
      { concept: "ventricular-system", relation: "adjacent-to", note: "forms the roof of the fourth ventricle" },
      { concept: "occipital-bone", relation: "adjacent-to", note: "posterior cranial fossa" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "superior cerebellar, AICA and PICA" },
    ],
    clinical:
      "Cerebellar lesions cause ipsilateral ataxia, intention tremor, dysdiadochokinesia, nystagmus and slurred (scanning) speech. Chronic alcohol misuse typically damages the vermis, producing a broad-based unsteady gait.",
  },

  "tentorium-cerebelli": {
    summary:
      "The tentorium cerebelli is a tent-shaped fold of dura mater that roofs the posterior cranial fossa, separating the occipital lobes above from the cerebellum below. Its free, curved inner edge bounds the tentorial notch through which the midbrain passes.",
    latin: "Tentorium cerebelli",
    functions: [
      "Supports the occipital lobes and limits their movement over the cerebellum",
      "Contains dural venous sinuses (transverse, superior petrosal and straight sinuses)",
      "Divides the cranial cavity into supratentorial and infratentorial compartments",
    ],
    connections: [
      { concept: "occipital-bone", relation: "attaches-to", note: "along the grooves for the transverse sinuses" },
      { concept: "temporal-bone", relation: "attaches-to", note: "superior border of the petrous part" },
      { concept: "sphenoid-bone", relation: "attaches-to", note: "clinoid processes" },
      { concept: "cerebellum", relation: "adjacent-to", note: "below" },
      { concept: "occipital-lobe", relation: "adjacent-to", note: "above" },
      { concept: "midbrain", relation: "adjacent-to", note: "passes through the tentorial notch" },
      { concept: "oculomotor-nerve-cn-iii", relation: "adjacent-to", note: "runs close to the free edge" },
      { concept: "trochlear-nerve-cn-iv", relation: "adjacent-to", note: "runs along the free edge" },
      { concept: "ophthalmic-nerve-cn-v1", relation: "innervated-by", note: "tentorial branch" },
    ],
    clinical:
      "In transtentorial (uncal) herniation, a supratentorial mass pushes the medial temporal lobe through the tentorial notch, compressing the oculomotor nerve (dilated pupil), cerebral peduncle and posterior cerebral artery.",
  },

  // ─────────────────────────── Nervous: CSF system ───────────────────────────
  "ventricular-system": {
    summary:
      "The ventricular system is a set of connected, CSF-filled cavities inside the brain. CSF made by the choroid plexus flows from the two lateral ventricles through the interventricular foramina into the third ventricle, down the cerebral aqueduct into the fourth ventricle, and out through its median and lateral apertures into the subarachnoid space, where it is absorbed into the dural venous sinuses mainly via arachnoid granulations.",
    latin: "Ventriculi encephali",
    functions: [
      "Produces and circulates cerebrospinal fluid (CSF)",
      "CSF buoyancy reduces the brain's effective weight, cushioning it against injury",
      "Maintains a stable chemical environment and helps clear metabolic waste",
    ],
    facts: [
      { label: "CSF volume", value: "About 150 mL in total, most of it in the subarachnoid space rather than the ventricles" },
      { label: "CSF production", value: "About 500 mL per day — replaced roughly 3–4 times daily" },
      { label: "Normal opening pressure", value: "Roughly 10–20 cm H₂O at lumbar puncture (lying on the side)" },
      { label: "Pathway", value: "Lateral ventricles → interventricular foramina → third ventricle → cerebral aqueduct → fourth ventricle → median and lateral apertures → subarachnoid space" },
    ],
    connections: [
      { concept: "choroid-plexus", relation: "receives-from", note: "secretes most of the CSF" },
      { concept: "caudate-nucleus", relation: "adjacent-to", note: "lateral wall of the lateral ventricle" },
      { concept: "corpus-callosum", relation: "adjacent-to", note: "roof of the lateral ventricles" },
      { concept: "thalamus", relation: "adjacent-to", note: "lateral walls of the third ventricle" },
      { concept: "hippocampus", relation: "adjacent-to", note: "floor of the temporal horn" },
      { concept: "midbrain", relation: "adjacent-to", note: "cerebral aqueduct" },
      { concept: "pons", relation: "adjacent-to", note: "floor of the fourth ventricle" },
      { concept: "cerebellum", relation: "adjacent-to", note: "roof of the fourth ventricle" },
      { concept: "spinal-cord", relation: "flows-to", note: "CSF flows around the cord in the subarachnoid space and into its central canal" },
    ],
    clinical:
      "Blockage of CSF flow (e.g. aqueductal stenosis, tumours) or impaired absorption enlarges the ventricles — hydrocephalus — treated by a shunt or endoscopic third ventriculostomy. CSF for diagnosis is sampled by lumbar puncture below the end of the spinal cord.",
  },

  "choroid-plexus": {
    summary:
      "The choroid plexuses are fringes of fenestrated capillaries covered by specialized ependymal (choroid epithelial) cells that project into the ventricles. They secrete most of the cerebrospinal fluid and, through tight junctions between their epithelial cells, form the blood–CSF barrier.",
    latin: "Plexus choroideus",
    functions: [
      "Secretes the majority of CSF by active ion transport followed by water",
      "Forms the blood–CSF barrier",
      "Transports nutrients and some hormones into CSF and removes some metabolites",
    ],
    facts: [
      { label: "Locations", value: "Bodies, atria and temporal horns of the lateral ventricles; roofs of the third and fourth ventricles (none in the frontal or occipital horns or aqueduct)" },
    ],
    connections: [
      { concept: "ventricular-system", relation: "secretes-into", note: "CSF" },
      { concept: "internal-carotid-artery", relation: "supplied-by", note: "anterior choroidal artery" },
      { concept: "posterior-cerebral-artery", relation: "supplied-by", note: "posterior choroidal arteries" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "fourth-ventricle plexus (PICA branches)" },
      { concept: "fornix", relation: "adjacent-to", note: "choroid fissure" },
      { concept: "thalamus", relation: "adjacent-to" },
      { concept: "hippocampus", relation: "adjacent-to", note: "in the temporal horn" },
    ],
    clinical:
      "Choroid plexus papillomas (rare, mostly in children) can overproduce CSF and cause hydrocephalus. Calcification of the plexus in the ventricular atria (glomus) is a common incidental CT finding in adults.",
  },

  // ─────────────────────────── Nervous: cranial nerves VII and X ───────────────────────────
  "facial-nerve-cn-vii": {
    summary:
      "The facial nerve (CN VII) emerges at the junction of the pons and medulla, travels with CN VIII into the internal acoustic meatus and winds through the facial canal in the temporal bone before exiting at the stylomastoid foramen. It moves the muscles of facial expression and also carries taste from the front of the tongue and parasympathetic fibres to the lacrimal, submandibular and sublingual glands.",
    latin: "Nervus facialis (CN VII)",
    functions: [
      "Motor to muscles of facial expression, platysma, stylohyoid, posterior belly of digastric and stapedius",
      "Taste from the anterior two-thirds of the tongue (chorda tympani)",
      "Parasympathetic secretomotor to lacrimal, nasal and palatine glands (greater petrosal nerve) and to submandibular and sublingual glands (chorda tympani)",
      "Efferent limb of the corneal (blink) reflex",
    ],
    facts: [
      { label: "Terminal branches (in the parotid gland)", value: "Temporal, zygomatic, buccal, marginal mandibular, cervical" },
      { label: "Exit from skull", value: "Stylomastoid foramen" },
    ],
    connections: [
      { concept: "pons", relation: "branch-of", note: "emerges at the pontomedullary junction (cerebellopontine angle)" },
      { concept: "muscles-of-facial-expression", relation: "controls" },
      { concept: "occipitofrontalis", relation: "controls", note: "temporal and posterior auricular branches" },
      { concept: "orbicularis-oculi", relation: "controls", note: "temporal and zygomatic branches" },
      { concept: "zygomaticus-major", relation: "controls", note: "zygomatic branch" },
      { concept: "levator-labii-superioris", relation: "controls", note: "zygomatic and buccal branches" },
      { concept: "orbicularis-oris", relation: "controls", note: "buccal and marginal mandibular branches" },
      { concept: "depressor-anguli-oris", relation: "controls", note: "marginal mandibular branch" },
      { concept: "platysma", relation: "controls", note: "cervical branch" },
      { concept: "digastric", relation: "controls", note: "posterior belly" },
      { concept: "stylohyoid", relation: "controls" },
      { concept: "lacrimal-apparatus", relation: "controls", note: "secretomotor via greater petrosal nerve and pterygopalatine ganglion" },
      { concept: "submandibular-gland", relation: "controls", note: "secretomotor via chorda tympani" },
      { concept: "sublingual-gland", relation: "controls", note: "secretomotor via chorda tympani" },
      { concept: "tongue", relation: "receives-from", note: "taste, anterior two-thirds" },
      { concept: "temporal-bone", relation: "adjacent-to", note: "facial canal; exits the stylomastoid foramen" },
    ],
    clinical:
      "Bell's palsy (an acute lower-motor-neuron facial palsy) paralyses the whole of one side of the face, including the forehead; a stroke (upper motor neuron lesion) spares the forehead because the upper face receives cortical input from both hemispheres.",
  },

  "vagus-nerve-cn-x": {
    summary:
      "The vagus nerve (CN X) is the longest cranial nerve, leaving the medulla and skull through the jugular foramen and descending in the carotid sheath into the thorax and abdomen. It carries most of the body's parasympathetic outflow to the heart, lungs and gut, motor fibres to the pharynx and larynx, and a large stream of sensory information from the viscera back to the brainstem.",
    latin: "Nervus vagus (CN X)",
    functions: [
      "Parasympathetic: slows the heart, constricts bronchi, increases gut motility and secretion (to about the distal third of the transverse colon)",
      "Motor to pharyngeal and soft-palate muscles (swallowing) and to the larynx (voice) via the recurrent and superior laryngeal nerves",
      "Visceral sensation from thoracic and abdominal organs (e.g. stretch, baroreceptors and chemoreceptors of the aortic arch)",
      "Sensation from the larynx, part of the external ear and the posterior cranial fossa dura",
    ],
    facts: [
      { label: "Parasympathetic share", value: "About 75% of all parasympathetic fibres travel in the vagi" },
      { label: "Fibre composition", value: "Most fibres (roughly 80%) are sensory (afferent)" },
      { label: "Recurrent laryngeal loops", value: "Right under the subclavian artery; left under the aortic arch" },
    ],
    connections: [
      { concept: "medulla-oblongata", relation: "branch-of", note: "rootlets from the medulla" },
      { concept: "internal-jugular-vein", relation: "adjacent-to", note: "within the carotid sheath" },
      { concept: "common-carotid-artery", relation: "adjacent-to", note: "within the carotid sheath" },
      { concept: "arch-of-aorta", relation: "adjacent-to", note: "left recurrent laryngeal nerve hooks beneath it" },
      { concept: "pharyngeal-constrictors", relation: "controls", note: "via the pharyngeal plexus" },
      { concept: "intrinsic-laryngeal-muscles", relation: "controls", note: "recurrent and external laryngeal nerves" },
      { concept: "atrium", relation: "controls", note: "slows the SA node (heart rate) and AV conduction" },
      { concept: "bronchial-tree", relation: "controls", note: "bronchoconstriction, mucus secretion" },
      { concept: "esophagus", relation: "controls", note: "esophageal plexus" },
      { concept: "stomach", relation: "controls", note: "acid secretion and motility" },
    ],
    clinical:
      "The long left recurrent laryngeal nerve can be damaged by lung cancer, aortic aneurysm or surgery, causing hoarseness. A vagus lesion makes the uvula deviate away from the affected side and can cause dysphagia.",
  },

  // ─────────────────────────── Nervous: spinal cord & autonomic chain ───────────────────────────
  "spinal-cord": {
    summary:
      "The spinal cord is the long cylinder of central nervous tissue continuing from the medulla at the foramen magnum and ending as the conus medullaris at about the L1–L2 vertebral level in adults. It carries ascending sensory and descending motor tracts in its white matter, processes reflexes in its grey matter, and gives rise to 31 pairs of spinal nerves.",
    latin: "Medulla spinalis",
    functions: [
      "Conducts sensory information to the brain (dorsal columns, spinothalamic and spinocerebellar tracts)",
      "Conducts motor commands from the brain (corticospinal and other descending tracts)",
      "Integrates spinal reflexes (e.g. stretch and withdrawal reflexes)",
      "Houses autonomic preganglionic neurons: sympathetic T1–L2, parasympathetic S2–S4",
    ],
    facts: [
      { label: "Length", value: "About 42–45 cm" },
      { label: "Lower end", value: "Conus medullaris at about L1–L2 in adults (lower, around L3, at birth)" },
      { label: "Spinal nerves", value: "31 pairs: 8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal" },
      { label: "Enlargements", value: "Cervical (for the upper limbs) and lumbosacral (for the lower limbs)" },
    ],
    connections: [
      { concept: "medulla-oblongata", relation: "adjacent-to", note: "continuous at the foramen magnum" },
      { concept: "spinal-nerves", relation: "gives-rise-to" },
      { concept: "cauda-equina", relation: "gives-rise-to", note: "lumbar, sacral and coccygeal roots descend from the conus" },
      { concept: "sympathetic-trunk", relation: "flows-to", note: "preganglionic fibres from T1–L2 via white rami" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "anterior and posterior spinal arteries arise from the vertebral arteries" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "segmental medullary arteries" },
      { concept: "lumbar-arteries", relation: "supplied-by", note: "segmental arteries, often including the great radicular artery (of Adamkiewicz)" },
      { concept: "atlas-c1", relation: "adjacent-to", note: "passes through the vertebral canal from C1 downward" },
      { concept: "first-lumbar-vertebra", relation: "adjacent-to", note: "conus medullaris ends about here" },
    ],
    clinical:
      "Spinal cord injury causes loss of motor, sensory and autonomic function below the lesion level. A hemisection (Brown-Séquard syndrome) causes ipsilateral weakness and loss of vibration/position sense but contralateral loss of pain and temperature, because the spinothalamic tract crosses soon after entering the cord.",
  },

  "cauda-equina": {
    summary:
      "The cauda equina ('horse's tail') is the bundle of lumbar, sacral and coccygeal nerve roots that descend within the dural sac below the end of the spinal cord to reach their exit foramina. The roots float in CSF in the lumbar cistern, which extends to about S2.",
    latin: "Cauda equina",
    functions: [
      "Carries motor and sensory fibres for the lower limbs, perineum, bladder and bowel",
      "Carries parasympathetic fibres (S2–S4) for bladder, bowel and sexual function",
    ],
    facts: [
      { label: "Extent", value: "From the conus medullaris (about L1–L2) to the end of the dural sac (about S2)" },
      { label: "Lumbar puncture level", value: "L3–L4 or L4–L5 — below the cord; the floating roots move aside from the needle" },
      { label: "Landmark", value: "The line joining the tops of the iliac crests crosses about the L4 spinous process" },
    ],
    connections: [
      { concept: "spinal-cord", relation: "branch-of", note: "roots arise from the conus medullaris and lumbosacral cord" },
      { concept: "spinal-nerves", relation: "part-of", note: "the roots of the lumbar, sacral and coccygeal nerves" },
      { concept: "lumbar-plexus", relation: "gives-rise-to", note: "via the L1–L4 spinal nerves" },
      { concept: "sacral-plexus", relation: "gives-rise-to", note: "via the L4–S4 spinal nerves" },
      { concept: "second-lumbar-vertebra", relation: "adjacent-to" },
      { concept: "fourth-lumbar-vertebra", relation: "adjacent-to", note: "lumbar puncture level" },
      { concept: "sacrum", relation: "adjacent-to", note: "dural sac ends at about S2" },
    ],
    clinical:
      "Cauda equina syndrome — usually from a large central lumbar disc herniation — causes saddle anaesthesia, bladder and bowel dysfunction and bilateral leg weakness or sciatica, and needs urgent surgical decompression.",
  },

  "spinal-nerves": {
    summary:
      "The 31 pairs of spinal nerves are mixed nerves formed where a dorsal (sensory) root, carrying the dorsal root ganglion with sensory cell bodies, joins a ventral (motor) root at the intervertebral foramen. Each then divides into a dorsal ramus for the back and a ventral ramus for the front of the trunk and limbs; ventral rami of the cervical, lumbar and sacral nerves form plexuses.",
    latin: "Nervi spinales",
    functions: [
      "Carry sensation from a defined skin strip (dermatome) and motor supply to a muscle group (myotome)",
      "Dorsal rami supply deep back muscles and skin of the back",
      "Ventral rami form the cervical, brachial, lumbar and sacral plexuses and the intercostal nerves",
      "Carry sympathetic fibres to skin and vessels via grey rami communicantes",
    ],
    facts: [
      { label: "Number", value: "31 pairs: C1–C8, T1–T12, L1–L5, S1–S5, Co1" },
      { label: "Exit level", value: "C1–C7 exit above their same-numbered vertebra; C8 exits below C7; from T1 down, each exits below its vertebra" },
      { label: "Dorsal root ganglion", value: "Contains the cell bodies of pseudounipolar sensory neurons" },
    ],
    connections: [
      { concept: "spinal-cord", relation: "branch-of" },
      { concept: "brachial-plexus", relation: "gives-rise-to", note: "ventral rami C5–T1" },
      { concept: "phrenic-nerve", relation: "gives-rise-to", note: "C3–C5" },
      { concept: "intercostal-nerves", relation: "gives-rise-to", note: "ventral rami T1–T11" },
      { concept: "lumbar-plexus", relation: "gives-rise-to", note: "ventral rami L1–L4" },
      { concept: "sacral-plexus", relation: "gives-rise-to", note: "ventral rami L4–S4" },
      { concept: "sympathetic-trunk", relation: "adjacent-to", note: "linked by white and grey rami communicantes" },
      { concept: "deep-back-muscles-transversospinales", relation: "controls", note: "dorsal rami" },
      { concept: "intervertebral-disc-below-fourth-lumbar", relation: "adjacent-to", note: "a posterolateral L4/5 disc herniation usually compresses the L5 root" },
    ],
    clinical:
      "A herniated disc or narrowed foramen compressing a root causes radicular pain and numbness in its dermatome (e.g. sciatica) with weakness in its myotome. Varicella-zoster virus lies dormant in dorsal root ganglia and reactivates as shingles in a single dermatome.",
  },

  "sympathetic-trunk": {
    summary:
      "Each sympathetic trunk is a chain of ganglia linked by nerve fibres running alongside the vertebral column from the base of the skull to the coccyx, where the two trunks meet. It receives preganglionic fibres from the T1–L2 segments of the spinal cord and distributes sympathetic ('fight or flight') output to the whole body.",
    latin: "Truncus sympathicus",
    functions: [
      "Relays sympathetic output to skin, blood vessels, sweat glands and arrector pili via grey rami to every spinal nerve",
      "Cervical ganglia supply the head (pupil dilation, eyelid elevation, facial sweating) and heart",
      "Splanchnic nerves pass through it to prevertebral ganglia (e.g. celiac) and the adrenal medulla",
      "Increases heart rate and contractility and redirects blood flow during stress",
    ],
    facts: [
      { label: "Ganglia", value: "3 cervical (inferior often fused with T1 as the stellate ganglion), about 11–12 thoracic, about 4 lumbar, 4–5 sacral; the two trunks unite at the ganglion impar" },
      { label: "Outflow", value: "Thoracolumbar: preganglionic neurons in the lateral horn of T1–L2" },
    ],
    connections: [
      { concept: "spinal-cord", relation: "receives-from", note: "preganglionic fibres T1–L2 via white rami" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "grey rami communicantes to every spinal nerve" },
      { concept: "iris", relation: "controls", note: "dilator pupillae via the superior cervical ganglion" },
      { concept: "atrium", relation: "controls", note: "cardiac nerves increase heart rate" },
      { concept: "adrenal-gland", relation: "controls", note: "preganglionic splanchnic fibres to the medulla" },
      { concept: "skin", relation: "controls", note: "sweat glands, arrector pili and skin blood vessels" },
      { concept: "first-rib", relation: "adjacent-to", note: "stellate ganglion lies in front of its neck" },
      { concept: "superior-lobe-of-lung", relation: "adjacent-to", note: "stellate ganglion near the lung apex" },
    ],
    clinical:
      "Interruption of the cervical sympathetic pathway (e.g. by an apical lung tumour or carotid dissection) causes Horner syndrome: ptosis, miosis and reduced facial sweating on the same side. Thoracic sympathectomy is sometimes used for severe palmar hyperhidrosis.",
  },

  // ─────────────────────────── Nervous: upper limb & thorax ───────────────────────────
  "brachial-plexus": {
    summary:
      "The brachial plexus is the network formed by the ventral rami of C5–T1 that supplies the upper limb. Its roots unite into three trunks between the scalene muscles, divide behind the clavicle, regroup as three cords around the axillary artery, and end as five major terminal nerves.",
    latin: "Plexus brachialis",
    functions: [
      "Motor and sensory supply to the entire upper limb and shoulder girdle",
      "Organization: roots → trunks (upper C5–6, middle C7, lower C8–T1) → divisions → cords (lateral, posterior, medial) → branches",
      "Terminal branches: musculocutaneous, axillary, radial, median and ulnar nerves",
    ],
    facts: [
      { label: "Roots", value: "C5–T1 (sometimes contributions from C4 or T2)" },
      { label: "Cords", value: "Named by their position around the axillary artery" },
    ],
    connections: [
      { concept: "spinal-nerves", relation: "branch-of", note: "ventral rami C5–T1" },
      { concept: "musculocutaneous-nerve", relation: "gives-rise-to", note: "lateral cord" },
      { concept: "median-nerve", relation: "gives-rise-to", note: "lateral and medial cords" },
      { concept: "ulnar-nerve", relation: "gives-rise-to", note: "medial cord" },
      { concept: "axillary-nerve", relation: "gives-rise-to", note: "posterior cord" },
      { concept: "radial-nerve", relation: "gives-rise-to", note: "posterior cord" },
      { concept: "scalenus-anterior", relation: "adjacent-to", note: "roots/trunks emerge behind it (interscalene gap)" },
      { concept: "scalenus-medius", relation: "adjacent-to" },
      { concept: "subclavian-artery", relation: "adjacent-to", note: "travels with the trunks" },
      { concept: "axillary-artery", relation: "adjacent-to", note: "cords surround it" },
      { concept: "clavicle", relation: "adjacent-to", note: "divisions pass behind it" },
    ],
    clinical:
      "Erb palsy (upper trunk, C5–C6), from forceful separation of head and shoulder such as a difficult birth, leaves the arm in the 'waiter's tip' position. Klumpke palsy (lower trunk, C8–T1), from traction on an abducted arm, weakens the small hand muscles and can cause a claw hand, sometimes with Horner syndrome.",
  },

  "axillary-nerve": {
    summary:
      "The axillary nerve (C5–C6) is a branch of the posterior cord of the brachial plexus. It passes backward through the quadrangular space with the posterior circumflex humeral artery and winds around the surgical neck of the humerus to supply the deltoid and teres minor and the skin over the lower deltoid.",
    latin: "Nervus axillaris",
    functions: [
      "Motor to deltoid (arm abduction beyond the first ~15°) and teres minor (lateral rotation)",
      "Sensory to skin over the lower deltoid ('regimental badge' area)",
    ],
    facts: [{ label: "Roots", value: "C5–C6" }],
    connections: [
      { concept: "brachial-plexus", relation: "branch-of", note: "posterior cord" },
      { concept: "deltoid", relation: "controls" },
      { concept: "teres-minor", relation: "controls" },
      { concept: "skin", relation: "receives-from", note: "regimental badge area over the lower deltoid" },
      { concept: "humerus", relation: "adjacent-to", note: "winds around the surgical neck" },
      { concept: "posterior-circumflex-humeral-artery", relation: "adjacent-to", note: "travel together through the quadrangular space" },
    ],
    clinical:
      "A fracture of the surgical neck of the humerus or an anterior shoulder dislocation can injure the axillary nerve, weakening abduction, flattening the shoulder contour and numbing the regimental badge area — which should be tested before and after reducing a dislocation.",
  },

  "musculocutaneous-nerve": {
    summary:
      "The musculocutaneous nerve (C5–C7) arises from the lateral cord of the brachial plexus, pierces coracobrachialis and runs between biceps and brachialis, supplying the anterior (flexor) muscles of the arm. It ends as the lateral cutaneous nerve of the forearm.",
    latin: "Nervus musculocutaneus",
    functions: [
      "Motor to coracobrachialis, biceps brachii and brachialis (elbow flexion, forearm supination)",
      "Sensory to the lateral forearm (lateral cutaneous nerve of the forearm)",
    ],
    facts: [
      { label: "Roots", value: "C5–C7" },
      { label: "Reflex", value: "Biceps reflex tests mainly C5–C6" },
    ],
    connections: [
      { concept: "brachial-plexus", relation: "branch-of", note: "lateral cord" },
      { concept: "coracobrachialis", relation: "controls", note: "pierces this muscle" },
      { concept: "biceps-brachii", relation: "controls" },
      { concept: "brachialis", relation: "controls" },
      { concept: "skin", relation: "receives-from", note: "lateral forearm" },
      { concept: "cephalic-vein", relation: "adjacent-to", note: "its cutaneous branch runs near the vein at the elbow" },
    ],
    clinical:
      "Isolated injury is uncommon because the nerve is well protected; when it occurs, elbow flexion and supination are weakened (brachioradialis and supinator partly compensate) and the lateral forearm is numb.",
  },

  "median-nerve": {
    summary:
      "The median nerve (C5/C6–T1) forms from the lateral and medial cords of the brachial plexus and runs down the arm with the brachial artery, through the cubital fossa and between the forearm flexors, then through the carpal tunnel into the hand. It supplies most forearm flexors and the thenar muscles, and sensation to the lateral palm and lateral three-and-a-half digits.",
    latin: "Nervus medianus",
    functions: [
      "Motor to most anterior forearm muscles (except flexor carpi ulnaris and the medial half of flexor digitorum profundus)",
      "Anterior interosseous branch: flexor pollicis longus, lateral half of FDP, pronator quadratus",
      "In the hand: lateral two lumbricals and the thenar muscles (opponens pollicis, abductor pollicis brevis, flexor pollicis brevis)",
      "Sensory to the palmar lateral 3½ digits (and their nail beds) and lateral palm",
    ],
    facts: [
      { label: "Roots", value: "C5/C6–T1" },
      { label: "Carpal tunnel contents", value: "Median nerve plus nine flexor tendons (4 FDS, 4 FDP, FPL)" },
    ],
    connections: [
      { concept: "brachial-plexus", relation: "branch-of", note: "lateral and medial cords" },
      { concept: "brachial-artery", relation: "adjacent-to", note: "accompanies it in the arm and cubital fossa" },
      { concept: "flexor-retinaculum-of-wrist", relation: "adjacent-to", note: "passes beneath it in the carpal tunnel" },
      { concept: "pronator-teres", relation: "controls", note: "passes between its two heads" },
      { concept: "flexor-carpi-radialis", relation: "controls" },
      { concept: "flexor-digitorum-superficialis", relation: "controls" },
      { concept: "flexor-pollicis-longus", relation: "controls", note: "anterior interosseous nerve" },
      { concept: "flexor-digitorum-profundus", relation: "controls", note: "lateral half (index and middle fingers)" },
      { concept: "abductor-pollicis-brevis", relation: "controls", note: "recurrent (thenar) branch" },
      { concept: "opponens-pollicis", relation: "controls", note: "recurrent (thenar) branch" },
      { concept: "flexor-pollicis-brevis", relation: "controls", note: "superficial head" },
    ],
    clinical:
      "Carpal tunnel syndrome — compression beneath the flexor retinaculum — causes tingling and numbness in the thumb, index, middle and half of the ring finger (often worse at night) and, if severe, thenar wasting; the palm is spared because the palmar cutaneous branch passes above the tunnel. A lesion at or above the elbow produces the 'hand of benediction' when trying to make a fist.",
  },

  "ulnar-nerve": {
    summary:
      "The ulnar nerve (C8–T1, often with C7) is the main branch of the medial cord of the brachial plexus. It passes behind the medial epicondyle of the humerus (the 'funny bone'), runs down the forearm under flexor carpi ulnaris, and enters the hand superficial to the flexor retinaculum through Guyon's canal to supply most of the small hand muscles.",
    latin: "Nervus ulnaris",
    functions: [
      "Motor to flexor carpi ulnaris and the medial half of flexor digitorum profundus",
      "Motor to most intrinsic hand muscles: hypothenar muscles, all interossei, medial two lumbricals, adductor pollicis",
      "Sensory to the medial 1½ digits and medial side of the hand",
    ],
    facts: [
      { label: "Roots", value: "C8–T1 (often C7)" },
      { label: "Entrapment sites", value: "Cubital tunnel behind the medial epicondyle; Guyon's canal between pisiform and hook of hamate" },
    ],
    connections: [
      { concept: "brachial-plexus", relation: "branch-of", note: "medial cord" },
      { concept: "flexor-carpi-ulnaris", relation: "controls", note: "enters the forearm between its heads" },
      { concept: "flexor-digitorum-profundus", relation: "controls", note: "medial half (ring and little fingers)" },
      { concept: "adductor-pollicis", relation: "controls" },
      { concept: "abductor-digiti-minimi-of-hand", relation: "controls", note: "hypothenar muscles" },
      { concept: "intrinsic-muscles-of-hand", relation: "controls", note: "interossei and medial lumbricals" },
      { concept: "humerus", relation: "adjacent-to", note: "behind the medial epicondyle" },
      { concept: "ulnar-artery", relation: "adjacent-to", note: "runs alongside in the forearm and Guyon's canal" },
      { concept: "pisiform-bone", relation: "adjacent-to", note: "Guyon's canal" },
      { concept: "hamate-bone", relation: "adjacent-to", note: "Guyon's canal (hook of hamate)" },
    ],
    clinical:
      "Ulnar nerve damage produces an 'ulnar claw' (hyperextended knuckles and flexed finger joints of the ring and little fingers) and weak finger spreading; clawing is paradoxically worse with lesions at the wrist, because FDP to those fingers is spared. Weak adductor pollicis gives a positive Froment sign.",
  },

  "radial-nerve": {
    summary:
      "The radial nerve (C5–T1) is the largest branch of the brachial plexus, continuing from the posterior cord. It spirals around the back of the humerus in the radial groove with the deep brachial artery, then divides near the elbow into a superficial (sensory) branch and a deep (motor) branch — the posterior interosseous nerve — that supplies the forearm extensors.",
    latin: "Nervus radialis",
    functions: [
      "Motor to triceps and anconeus (elbow extension)",
      "Motor to brachioradialis, supinator and all wrist and finger extensors of the posterior forearm",
      "Sensory to the back of the arm and forearm and the dorsum of the lateral hand (first web space)",
    ],
    facts: [{ label: "Roots", value: "C5–T1" }],
    connections: [
      { concept: "brachial-plexus", relation: "branch-of", note: "posterior cord" },
      { concept: "triceps-brachii", relation: "controls" },
      { concept: "brachioradialis", relation: "controls" },
      { concept: "extensor-carpi-radialis-longus", relation: "controls" },
      { concept: "supinator", relation: "controls", note: "deep branch passes through it" },
      { concept: "extensor-digitorum", relation: "controls", note: "posterior interosseous nerve" },
      { concept: "extensor-pollicis-longus", relation: "controls", note: "posterior interosseous nerve" },
      { concept: "humerus", relation: "adjacent-to", note: "radial groove on the posterior shaft" },
      { concept: "deep-brachial-artery", relation: "adjacent-to", note: "accompanies it in the radial groove" },
      { concept: "skin", relation: "receives-from", note: "posterior arm/forearm and dorsal first web space" },
    ],
    clinical:
      "A mid-shaft humeral fracture or prolonged pressure on the arm ('Saturday night palsy') damages the nerve in the radial groove, causing wrist drop with numbness of the dorsal first web space; triceps is usually spared because its branches arise higher.",
  },

  "intercostal-nerves": {
    summary:
      "The intercostal nerves are the ventral rami of T1–T11, running in the costal groove under each rib between the internal and innermost intercostal muscles, below the intercostal vein and artery. They supply the chest wall and, from T7 to T11, continue into the anterior abdominal wall.",
    latin: "Nervi intercostales",
    functions: [
      "Motor to the intercostal muscles and (T7–T11) the anterior abdominal wall muscles",
      "Sensory to the skin of the chest and abdomen in dermatomal bands and to the parietal pleura and peritoneum",
      "T10 supplies the skin around the umbilicus",
    ],
    facts: [
      { label: "Order in costal groove (top → bottom)", value: "Vein, artery, nerve (VAN)" },
      { label: "Subcostal nerve", value: "T12, below the 12th rib" },
    ],
    connections: [
      { concept: "spinal-nerves", relation: "branch-of", note: "ventral rami T1–T11" },
      { concept: "external-intercostal-muscles", relation: "controls" },
      { concept: "internal-intercostal-muscles", relation: "controls" },
      { concept: "innermost-intercostal-muscles", relation: "controls" },
      { concept: "rectus-abdominis", relation: "controls", note: "T7–T11 (thoracoabdominal nerves)" },
      { concept: "external-oblique", relation: "controls", note: "lower intercostal nerves" },
      { concept: "intercostal-arteries", relation: "adjacent-to", note: "neurovascular bundle in the costal groove" },
      { concept: "intercostal-veins", relation: "adjacent-to" },
      { concept: "skin", relation: "receives-from", note: "thoracic and abdominal dermatomes" },
    ],
    clinical:
      "Chest drains and needles are inserted just above the upper border of a rib to avoid the neurovascular bundle sheltered under the rib above. Shingles most often affects thoracic dermatomes, producing a band-like rash along one intercostal nerve.",
  },

  "phrenic-nerve": {
    summary:
      "The phrenic nerve (C3–C5) descends on the front of scalenus anterior, enters the thorax between the subclavian artery and vein, and runs down in front of the lung root along the fibrous pericardium to the diaphragm. It is the sole motor nerve of the diaphragm.",
    latin: "Nervus phrenicus",
    functions: [
      "Motor to its half of the diaphragm — essential for breathing",
      "Sensory from the central diaphragm (pleura and peritoneum), mediastinal pleura and pericardium",
    ],
    facts: [
      { label: "Roots", value: "C3, C4, C5 — 'C3, 4 and 5 keep the diaphragm alive'" },
      { label: "Course", value: "Right nerve beside the superior vena cava and right atrium; left nerve over the left ventricle's pericardium" },
    ],
    connections: [
      { concept: "spinal-nerves", relation: "branch-of", note: "ventral rami C3–C5 (via the cervical plexus)" },
      { concept: "diaphragm", relation: "controls" },
      { concept: "scalenus-anterior", relation: "adjacent-to", note: "descends on its anterior surface" },
      { concept: "subclavian-artery", relation: "adjacent-to", note: "enters the thorax behind the subclavian vein, in front of the artery" },
      { concept: "subclavian-vein", relation: "adjacent-to" },
      { concept: "superior-vena-cava", relation: "adjacent-to", note: "right phrenic nerve" },
      { concept: "atrium", relation: "adjacent-to", note: "right phrenic nerve runs on the pericardium over the right atrium" },
    ],
    clinical:
      "Irritation of the diaphragm (e.g. blood from a ruptured spleen, subphrenic abscess, gallbladder disease) is felt as shoulder-tip pain because the phrenic nerve shares roots (C3–C5) with the skin of the shoulder. Phrenic nerve injury paralyses the hemidiaphragm, which rises and moves paradoxically.",
  },

  // ─────────────────────────── Nervous: lower limb ───────────────────────────
  "lumbar-plexus": {
    summary:
      "The lumbar plexus is formed within the psoas major muscle by the ventral rami of L1–L4 (often with a contribution from T12). It supplies the lower abdominal wall, the groin and the front and medial side of the thigh, chiefly through the femoral and obturator nerves.",
    latin: "Plexus lumbalis",
    functions: [
      "Iliohypogastric and ilioinguinal nerves (L1): lower abdominal wall and groin",
      "Genitofemoral (L1–L2) and lateral femoral cutaneous (L2–L3) nerves: genital region and lateral thigh skin",
      "Femoral nerve (L2–L4): hip flexors and knee extensors; obturator nerve (L2–L4): thigh adductors",
      "Contributes L4 to the sacral plexus via the lumbosacral trunk",
    ],
    facts: [{ label: "Roots", value: "L1–L4 (± T12)" }],
    connections: [
      { concept: "spinal-nerves", relation: "branch-of", note: "ventral rami L1–L4" },
      { concept: "femoral-nerve", relation: "gives-rise-to", note: "posterior divisions of L2–L4" },
      { concept: "obturator-nerve", relation: "gives-rise-to", note: "anterior divisions of L2–L4" },
      { concept: "sacral-plexus", relation: "adjacent-to", note: "joined by the lumbosacral trunk (L4–L5)" },
      { concept: "psoas-major", relation: "controls", note: "forms within the muscle and supplies it by direct branches (L1–L3)" },
    ],
    clinical:
      "Compression of the lateral femoral cutaneous nerve near the anterior superior iliac spine causes meralgia paresthetica — burning numbness over the outer thigh — often linked to tight belts, obesity or pregnancy.",
  },

  "femoral-nerve": {
    summary:
      "The femoral nerve (L2–L4) is the largest branch of the lumbar plexus. It descends in the groove between psoas and iliacus, passes under the inguinal ligament lateral to the femoral artery (outside the femoral sheath) and fans out in the femoral triangle to supply the anterior thigh.",
    latin: "Nervus femoralis",
    functions: [
      "Motor to iliacus, pectineus, sartorius and quadriceps femoris (hip flexion, knee extension)",
      "Sensory to the anterior thigh and, via the saphenous nerve, the medial leg and foot",
      "Carries the patellar (knee-jerk) reflex, L3–L4",
    ],
    facts: [
      { label: "Roots", value: "L2–L4" },
      { label: "Femoral triangle order (lateral → medial)", value: "Nerve, artery, vein, (empty space), lymphatics — 'NAVEL'" },
    ],
    connections: [
      { concept: "lumbar-plexus", relation: "branch-of" },
      { concept: "saphenous-nerve", relation: "gives-rise-to" },
      { concept: "iliacus", relation: "controls" },
      { concept: "sartorius", relation: "controls" },
      { concept: "pectineus", relation: "controls", note: "usually" },
      { concept: "rectus-femoris", relation: "controls" },
      { concept: "vastus-lateralis", relation: "controls" },
      { concept: "vastus-medialis", relation: "controls" },
      { concept: "vastus-intermedius", relation: "controls" },
      { concept: "femoral-artery", relation: "adjacent-to", note: "lies lateral to it" },
      { concept: "psoas-major", relation: "adjacent-to", note: "emerges at its lateral border" },
    ],
    clinical:
      "Femoral nerve injury (e.g. from pelvic surgery or a haematoma after femoral catheterization) weakens knee extension — the knee buckles — abolishes the knee jerk and numbs the anterior thigh and medial leg.",
  },

  "saphenous-nerve": {
    summary:
      "The saphenous nerve (L3–L4) is the longest cutaneous branch of the femoral nerve and is purely sensory. It travels with the femoral artery through the adductor canal, becomes superficial at the medial knee and descends with the great saphenous vein to the medial ankle and foot.",
    latin: "Nervus saphenus",
    functions: ["Sensory to the skin of the medial knee, medial leg and medial side of the foot"],
    facts: [{ label: "Roots", value: "L3–L4 (via the femoral nerve)" }],
    connections: [
      { concept: "femoral-nerve", relation: "branch-of" },
      { concept: "femoral-artery", relation: "adjacent-to", note: "in the adductor canal" },
      { concept: "sartorius", relation: "adjacent-to", note: "emerges near its tendon at the medial knee" },
      { concept: "great-saphenous-vein", relation: "adjacent-to", note: "accompanies it down the leg" },
      { concept: "tibia", relation: "adjacent-to", note: "passes in front of the medial malleolus" },
      { concept: "skin", relation: "receives-from", note: "medial leg and foot" },
    ],
    clinical:
      "It can be injured during great saphenous vein harvesting or varicose vein surgery, leaving numbness along the medial leg and ankle. An adductor canal block anaesthetizes it for knee surgery while largely sparing quadriceps strength.",
  },

  "obturator-nerve": {
    summary:
      "The obturator nerve (L2–L4) emerges from the medial border of psoas, runs along the lateral wall of the pelvis and passes through the obturator canal into the medial thigh, where it supplies the adductor muscles.",
    latin: "Nervus obturatorius",
    functions: [
      "Motor to adductor longus, adductor brevis, the adductor part of adductor magnus, gracilis and obturator externus",
      "Sensory to a patch of skin on the medial thigh",
    ],
    facts: [{ label: "Roots", value: "L2–L4" }],
    connections: [
      { concept: "lumbar-plexus", relation: "branch-of" },
      { concept: "adductor-longus", relation: "controls" },
      { concept: "adductor-brevis", relation: "controls" },
      { concept: "adductor-magnus", relation: "controls", note: "adductor part" },
      { concept: "gracilis", relation: "controls" },
      { concept: "obturator-externus", relation: "controls" },
      { concept: "hip-bone", relation: "adjacent-to", note: "exits through the obturator canal" },
      { concept: "psoas-major", relation: "adjacent-to", note: "emerges at its medial border" },
      { concept: "ovary", relation: "adjacent-to", note: "runs on the lateral pelvic wall near the ovarian fossa" },
    ],
    clinical:
      "Injury during pelvic surgery, pelvic fracture or childbirth weakens thigh adduction and numbs the medial thigh. Because it passes close to the ovary, ovarian disease can refer pain to the medial thigh.",
  },

  "sacral-plexus": {
    summary:
      "The sacral plexus is formed on the front of the piriformis muscle by the lumbosacral trunk (L4–L5) and the ventral rami of S1–S4. It supplies the buttock, the back of the thigh, nearly all of the leg and foot, and — through the pudendal nerve — the perineum.",
    latin: "Plexus sacralis",
    functions: [
      "Sciatic nerve (L4–S3): posterior thigh, leg and foot",
      "Superior (L4–S1) and inferior (L5–S2) gluteal nerves: gluteal muscles",
      "Pudendal nerve (S2–S4): perineum, external anal and urethral sphincters",
      "Posterior femoral cutaneous nerve and nerves to the small lateral rotators of the hip",
    ],
    facts: [{ label: "Roots", value: "L4–S4" }],
    connections: [
      { concept: "spinal-nerves", relation: "branch-of", note: "L4–S4 ventral rami" },
      { concept: "lumbar-plexus", relation: "adjacent-to", note: "lumbosacral trunk links them" },
      { concept: "sciatic-nerve", relation: "gives-rise-to" },
      { concept: "gluteus-maximus", relation: "controls", note: "inferior gluteal nerve" },
      { concept: "gluteus-medius", relation: "controls", note: "superior gluteal nerve" },
      { concept: "gluteus-minimus", relation: "controls", note: "superior gluteal nerve" },
      { concept: "external-anal-sphincter", relation: "controls", note: "pudendal nerve (S2–S4)" },
      { concept: "levator-ani", relation: "controls", note: "nerve to levator ani (S3–S4) and pudendal nerve" },
      { concept: "piriformis", relation: "adjacent-to", note: "plexus lies on its anterior surface" },
      { concept: "internal-iliac-artery", relation: "adjacent-to", note: "branches run among the roots" },
    ],
    clinical:
      "Injury to the superior gluteal nerve weakens the hip abductors, giving a positive Trendelenburg sign — the pelvis drops on the unsupported side when standing on the affected leg.",
  },

  "sciatic-nerve": {
    summary:
      "The sciatic nerve (L4–S3) is the largest nerve in the body, about as wide as a thumb. It leaves the pelvis through the greater sciatic foramen, usually below piriformis, descends deep to gluteus maximus and the hamstrings, and usually divides into the tibial and common fibular nerves near the top of the popliteal fossa.",
    latin: "Nervus ischiadicus",
    functions: [
      "Motor to the hamstrings (semitendinosus, semimembranosus, biceps femoris) and the hamstring part of adductor magnus",
      "Via its branches, motor to all muscles below the knee",
      "Sensory to most of the leg and foot (except the medial side supplied by the saphenous nerve)",
    ],
    facts: [
      { label: "Roots", value: "L4–S3" },
      { label: "Width", value: "Up to about 2 cm" },
    ],
    connections: [
      { concept: "sacral-plexus", relation: "branch-of" },
      { concept: "tibial-nerve", relation: "gives-rise-to" },
      { concept: "common-fibular-nerve", relation: "gives-rise-to" },
      { concept: "semitendinosus", relation: "controls", note: "tibial part" },
      { concept: "semimembranosus", relation: "controls", note: "tibial part" },
      { concept: "biceps-femoris", relation: "controls", note: "long head (tibial part), short head (fibular part)" },
      { concept: "adductor-magnus", relation: "controls", note: "hamstring part" },
      { concept: "piriformis", relation: "adjacent-to", note: "usually exits below it" },
      { concept: "gluteus-maximus", relation: "adjacent-to", note: "lies deep to it" },
      { concept: "hip-bone", relation: "adjacent-to", note: "greater sciatic notch" },
    ],
    clinical:
      "Gluteal intramuscular injections are given in the upper outer quadrant of the buttock to avoid the sciatic nerve, and a posterior hip dislocation can injure it. 'Sciatica' usually means pain radiating down the leg from compression of the L4–S1 roots rather than of the nerve itself.",
  },

  "tibial-nerve": {
    summary:
      "The tibial nerve (L4–S3) is the larger terminal branch of the sciatic nerve. It runs down the middle of the popliteal fossa, then deep to gastrocnemius and soleus with the posterior tibial artery, and passes behind the medial malleolus through the tarsal tunnel, dividing into the medial and lateral plantar nerves of the sole.",
    latin: "Nervus tibialis",
    functions: [
      "Motor to all posterior leg muscles (plantarflexion of the ankle, flexion of the toes, inversion)",
      "Motor to the intrinsic muscles of the sole via the plantar nerves",
      "Sensory to the sole of the foot and (with the sural nerve) the lateral foot",
      "Carries the ankle-jerk reflex (S1–S2)",
    ],
    facts: [
      { label: "Roots", value: "L4–S3" },
      { label: "Popliteal fossa", value: "Most superficial of the main neurovascular structures (nerve, then vein, then artery deepest)" },
    ],
    connections: [
      { concept: "sciatic-nerve", relation: "branch-of" },
      { concept: "gastrocnemius", relation: "controls" },
      { concept: "soleus", relation: "controls" },
      { concept: "popliteus", relation: "controls" },
      { concept: "tibialis-posterior", relation: "controls" },
      { concept: "flexor-digitorum-longus", relation: "controls" },
      { concept: "flexor-hallucis-longus", relation: "controls" },
      { concept: "intrinsic-muscles-of-foot", relation: "controls", note: "via the medial and lateral plantar nerves" },
      { concept: "popliteal-artery", relation: "adjacent-to", note: "in the popliteal fossa" },
      { concept: "posterior-tibial-artery", relation: "adjacent-to", note: "accompanies it in the leg and tarsal tunnel" },
    ],
    clinical:
      "Tarsal tunnel syndrome — compression behind the medial malleolus — causes burning pain and numbness of the sole. A complete tibial nerve lesion prevents standing on tiptoe.",
  },

  "common-fibular-nerve": {
    summary:
      "The common fibular (peroneal) nerve (L4–S2) is the smaller terminal branch of the sciatic nerve. It follows the biceps femoris tendon along the lateral side of the popliteal fossa and winds superficially around the neck of the fibula, where it divides into the superficial and deep fibular nerves.",
    latin: "Nervus fibularis (peroneus) communis",
    functions: [
      "Deep fibular nerve: anterior compartment (tibialis anterior, toe extensors) — dorsiflexion; skin of the first web space",
      "Superficial fibular nerve: fibularis longus and brevis — eversion; skin of most of the dorsum of the foot",
    ],
    facts: [
      { label: "Roots", value: "L4–S2" },
      { label: "Vulnerable point", value: "Neck of the fibula, just under the skin" },
    ],
    connections: [
      { concept: "sciatic-nerve", relation: "branch-of" },
      { concept: "tibialis-anterior", relation: "controls", note: "deep fibular nerve" },
      { concept: "extensor-digitorum-longus", relation: "controls", note: "deep fibular nerve" },
      { concept: "extensor-hallucis-longus", relation: "controls", note: "deep fibular nerve" },
      { concept: "fibularis-longus", relation: "controls", note: "superficial fibular nerve" },
      { concept: "fibularis-brevis", relation: "controls", note: "superficial fibular nerve" },
      { concept: "fibula", relation: "adjacent-to", note: "winds around the fibular neck" },
      { concept: "biceps-femoris", relation: "adjacent-to", note: "follows its tendon" },
      { concept: "anterior-tibial-artery", relation: "adjacent-to", note: "deep fibular nerve accompanies it" },
    ],
    clinical:
      "The most commonly injured nerve of the lower limb — by fibular neck fractures, tight plaster casts or prolonged leg crossing — producing foot drop with a high-stepping gait, weak eversion and numbness over the dorsum of the foot.",
  },

  // ─────────────────────────── Endocrine ───────────────────────────
  "thyroid-gland": {
    summary:
      "The thyroid gland is a butterfly-shaped endocrine gland in the front of the neck, with two lobes beside the larynx and trachea joined by an isthmus over the upper tracheal rings. Its follicles store thyroglobulin and release thyroid hormones (T4 and T3) that set the body's metabolic rate; parafollicular C cells secrete calcitonin.",
    latin: "Glandula thyroidea",
    functions: [
      "Secretes thyroxine (T4) and triiodothyronine (T3), which raise metabolic rate and heat production",
      "Essential for normal growth and brain development in children",
      "Parafollicular (C) cells secrete calcitonin, which lowers blood calcium",
      "Stores hormone as thyroglobulin within follicles; secretion is controlled by pituitary TSH",
    ],
    facts: [
      { label: "Mass", value: "Roughly 15–25 g in adults" },
      { label: "Hormone output", value: "About 93% T4 and 7% T3; most T3 is made from T4 in the tissues" },
      { label: "Isthmus", value: "Crosses tracheal rings 2–3" },
    ],
    connections: [
      { concept: "pituitary-gland", relation: "receives-from", note: "TSH stimulates it" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by", note: "from the thyrocervical trunk (superior thyroid artery also supplies it)" },
      { concept: "internal-jugular-vein", relation: "drained-by", note: "superior and middle thyroid veins" },
      { concept: "brachiocephalic-vein", relation: "drained-by", note: "inferior thyroid veins" },
      { concept: "trachea", relation: "adjacent-to", note: "wraps around its front and sides" },
      { concept: "thyroid-cartilage", relation: "adjacent-to" },
      { concept: "cricoid-cartilage", relation: "adjacent-to" },
      { concept: "esophagus", relation: "adjacent-to", note: "posteromedially" },
      { concept: "common-carotid-artery", relation: "adjacent-to", note: "carotid sheath lies lateral" },
      { concept: "sternothyroid", relation: "adjacent-to", note: "infrahyoid muscles cover it" },
      { concept: "vagus-nerve-cn-x", relation: "adjacent-to", note: "recurrent laryngeal nerves run close to its posterior surface" },
    ],
    clinical:
      "Thyroid disorders are common: hyperthyroidism (e.g. Graves disease) and hypothyroidism (e.g. Hashimoto thyroiditis, or iodine deficiency worldwide), and goitre (enlargement). Thyroid surgery risks the recurrent laryngeal nerves (hoarseness) and the parathyroid glands on its back (low calcium).",
  },

  "adrenal-gland": {
    summary:
      "The adrenal (suprarenal) glands sit on the upper poles of the kidneys, within the renal fascia — the right one pyramidal, the left crescent-shaped. Each is really two glands: an outer cortex that makes steroid hormones and an inner medulla, derived from neural crest, that releases adrenaline and noradrenaline.",
    latin: "Glandula suprarenalis",
    functions: [
      "Zona glomerulosa: aldosterone (salt and water balance, blood pressure)",
      "Zona fasciculata: cortisol (stress response, glucose metabolism, anti-inflammatory)",
      "Zona reticularis: adrenal androgens (e.g. DHEA)",
      "Medulla: adrenaline (about 80%) and noradrenaline for the fight-or-flight response",
    ],
    facts: [
      { label: "Mass", value: "Roughly 4–6 g each" },
      { label: "Arteries", value: "Superior (from inferior phrenic), middle (from aorta) and inferior (from renal) suprarenal arteries" },
      { label: "Veins", value: "Single vein: right → IVC directly; left → left renal vein" },
    ],
    connections: [
      { concept: "kidney", relation: "adjacent-to", note: "caps its upper pole" },
      { concept: "phrenic-arteries", relation: "supplied-by", note: "superior suprarenal arteries" },
      { concept: "abdominal-aorta", relation: "supplied-by", note: "middle suprarenal artery" },
      { concept: "renal-artery", relation: "supplied-by", note: "inferior suprarenal artery" },
      { concept: "suprarenal-vein", relation: "drained-by" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "preganglionic splanchnic fibres synapse directly on medullary cells" },
      { concept: "pituitary-gland", relation: "receives-from", note: "ACTH controls cortisol and androgen output" },
      { concept: "inferior-vena-cava", relation: "adjacent-to", note: "right gland lies behind it" },
      { concept: "diaphragm", relation: "adjacent-to", note: "on the crura" },
      { concept: "pancreas", relation: "adjacent-to", note: "left gland lies behind the pancreas and splenic vessels" },
    ],
    clinical:
      "Adrenal insufficiency (Addison disease) causes fatigue, low blood pressure and hyperpigmentation and can precipitate a life-threatening crisis; cortisol excess causes Cushing syndrome; a pheochromocytoma of the medulla causes episodic hypertension, headaches and sweating.",
  },

  // ─────────────────────────── Urinary (urine-flow order) ───────────────────────────
  "kidney": {
    summary:
      "The kidneys are paired, bean-shaped retroperitoneal organs on the posterior abdominal wall at about T12–L3, the right slightly lower than the left because of the liver. They filter the blood, adjusting water, electrolyte and acid–base balance and excreting wastes as urine, and they also act as endocrine organs.",
    latin: "Ren (nephros)",
    functions: [
      "Filter plasma and form urine, excreting urea, creatinine, drugs and toxins",
      "Regulate water, sodium, potassium, calcium, phosphate and acid–base balance",
      "Control blood pressure (renin–angiotensin–aldosterone system and salt/water excretion)",
      "Produce erythropoietin (red cell production) and activate vitamin D (calcitriol); gluconeogenesis",
    ],
    facts: [
      { label: "Size and mass", value: "Roughly 10–12 cm long, 5–6 cm wide, 3 cm thick; about 150 g" },
      { label: "Nephrons", value: "About 1 million per kidney (wide individual range)" },
      { label: "Blood flow", value: "About 20–25% of resting cardiac output (~1.1–1.2 L/min)" },
      { label: "Filtration", value: "GFR about 125 mL/min ≈ 180 L/day, of which ~99% is reabsorbed, leaving ~1–2 L of urine" },
    ],
    connections: [
      { concept: "renal-artery", relation: "supplied-by" },
      { concept: "renal-vein", relation: "drained-by" },
      { concept: "ureter", relation: "flows-to", note: "urine from the renal pelvis" },
      { concept: "adrenal-gland", relation: "adjacent-to", note: "on its upper pole" },
      { concept: "liver-segment-vi", relation: "adjacent-to", note: "right kidney; hepatorenal recess" },
      { concept: "duodenum", relation: "adjacent-to", note: "right kidney, in front of its hilum" },
      { concept: "spleen", relation: "adjacent-to", note: "left kidney" },
      { concept: "pancreas", relation: "adjacent-to", note: "left kidney" },
      { concept: "psoas-major", relation: "adjacent-to", note: "posteromedially" },
      { concept: "twelfth-rib", relation: "adjacent-to", note: "crosses behind the upper pole" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "renal plexus: vasoconstriction and renin release" },
    ],
    clinical:
      "Kidney stones cause renal colic, severe loin pain radiating to the groin. Chronic kidney disease, most often due to diabetes and hypertension, is estimated from the GFR and can progress to kidney failure requiring dialysis or transplantation.",
  },

  "ureter": {
    summary:
      "Each ureter is a narrow muscular tube, about 25–30 cm long, that carries urine from the renal pelvis to the bladder by peristalsis. It descends retroperitoneally on psoas major, crosses the pelvic brim over the bifurcation of the common iliac artery, runs down the lateral pelvic wall and enters the bladder obliquely.",
    latin: "Ureter",
    functions: [
      "Propels urine to the bladder by peristaltic waves",
      "Oblique passage through the bladder wall forms a flap valve preventing reflux",
    ],
    facts: [
      { label: "Length", value: "About 25–30 cm" },
      { label: "Natural narrowings", value: "Pelviureteric junction, crossing of the iliac vessels at the pelvic brim, and the ureterovesical junction" },
      { label: "Lining", value: "Urothelium (transitional epithelium)" },
    ],
    connections: [
      { concept: "kidney", relation: "receives-from" },
      { concept: "urinary-bladder", relation: "flows-to" },
      { concept: "psoas-major", relation: "adjacent-to", note: "descends on it" },
      { concept: "common-iliac-artery", relation: "adjacent-to", note: "crosses its bifurcation at the pelvic brim" },
      { concept: "testicular-artery", relation: "adjacent-to", note: "gonadal vessels cross in front of it" },
      { concept: "ductus-deferens", relation: "adjacent-to", note: "male: crosses above the ureter near the bladder" },
      { concept: "uterus", relation: "adjacent-to", note: "female: passes under the uterine artery beside the cervix" },
      { concept: "renal-artery", relation: "supplied-by", note: "upper part" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "pelvic part" },
    ],
    sexDifferences:
      "In males the ductus deferens crosses over the ureter near the bladder; in females the uterine artery crosses over it about 1.5–2 cm lateral to the cervix ('water under the bridge').",
    clinical:
      "Kidney stones typically lodge at the three narrowings, causing renal colic. During hysterectomy the ureter is at risk where it passes beneath the uterine artery.",
  },

  "urinary-bladder": {
    summary:
      "The urinary bladder is a hollow, distensible muscular reservoir for urine. When empty it lies in the pelvis behind the pubic symphysis; as it fills it rises into the abdomen. Its smooth-walled trigone lies between the two ureteric openings and the internal urethral opening.",
    latin: "Vesica urinaria",
    functions: [
      "Stores urine at low pressure as it fills",
      "Detrusor muscle contracts to empty the bladder during micturition",
      "Stretch receptors signal fullness; voluntary control via the external urethral sphincter",
    ],
    facts: [
      { label: "Capacity", value: "Typically about 400–600 mL in adults; the urge to void begins well before this" },
      { label: "Innervation", value: "Parasympathetic S2–S4 (contracts detrusor); sympathetic T11–L2 (relaxes detrusor, closes bladder neck); pudendal nerve S2–S4 (external sphincter)" },
    ],
    connections: [
      { concept: "ureter", relation: "receives-from" },
      { concept: "urethra", relation: "flows-to" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "superior and inferior vesical arteries" },
      { concept: "internal-iliac-vein", relation: "drained-by", note: "via the vesical venous plexus" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "parasympathetic pelvic splanchnic nerves (S2–S4)" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "sympathetic T11–L2 via the hypogastric plexus" },
      { concept: "hip-bone", relation: "adjacent-to", note: "behind the pubic symphysis" },
      { concept: "prostate", relation: "adjacent-to", note: "male: bladder neck rests on it" },
      { concept: "seminal-vesicle", relation: "adjacent-to", note: "male: on its posterior surface" },
      { concept: "uterus", relation: "adjacent-to", note: "female: rests on its upper surface" },
      { concept: "vagina", relation: "adjacent-to", note: "female: behind the bladder" },
    ],
    sexDifferences:
      "In males the bladder neck sits on the prostate, with the seminal vesicles, ductus deferens and rectum behind (rectovesical pouch). In females the uterus lies over the bladder and the vagina behind it (vesicouterine pouch), and the bladder sits slightly lower.",
    clinical:
      "A full bladder rises above the pubic symphysis without entering the peritoneal cavity, allowing suprapubic catheterization. Bladder outlet obstruction (e.g. prostatic enlargement) causes urinary retention; spinal cord injury disrupts the neural control of voiding (neurogenic bladder).",
  },

  "urethra": {
    summary:
      "The urethra is the tube that carries urine from the bladder to the outside. It is very different in the two sexes: in females it is short (about 4 cm) and conveys only urine, whereas in males it is long (about 18–20 cm), runs through the prostate and penis, and carries both urine and semen.",
    latin: "Urethra",
    functions: [
      "Conveys urine from the bladder to the external urethral orifice",
      "In males, also conveys semen during ejaculation",
      "Surrounded by the external urethral sphincter (voluntary continence)",
    ],
    facts: [
      { label: "Female urethra", value: "About 4 cm; opens in the vestibule in front of the vaginal opening" },
      { label: "Male urethra", value: "About 18–20 cm: preprostatic, prostatic, membranous (intermediate; narrowest) and spongy (penile) parts" },
    ],
    connections: [
      { concept: "urinary-bladder", relation: "receives-from" },
      { concept: "prostate", relation: "receives-from", note: "male: prostatic secretions; the prostatic urethra passes through the gland" },
      { concept: "seminal-vesicle", relation: "receives-from", note: "male: via the ejaculatory ducts in the prostatic urethra" },
      { concept: "ductus-deferens", relation: "receives-from", note: "male: sperm via the ejaculatory ducts" },
      { concept: "penis", relation: "part-of", note: "male: spongy urethra runs through the corpus spongiosum" },
      { concept: "vagina", relation: "adjacent-to", note: "female: embedded in the anterior vaginal wall" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "pudendal nerve to the external urethral sphincter" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "vesical and internal pudendal branches" },
    ],
    sexDifferences:
      "Female: short (~4 cm), straight, urine only, opening in the vestibule. Male: long (~18–20 cm), S-shaped, passing through prostate, pelvic floor and penis, and shared by the urinary and reproductive tracts.",
    clinical:
      "The short female urethra explains why urinary tract infections are much more common in women. In men, catheters must negotiate the curves and the narrow membranous part, and pelvic fractures can tear the urethra just below the prostate.",
  },

  // ─────────────────────────── Male reproductive (sperm-flow order) ───────────────────────────
  "testis": {
    summary:
      "The testes are the paired male gonads, suspended in the scrotum by the spermatic cords. Inside a tough capsule (tunica albuginea), coiled seminiferous tubules produce sperm, while Leydig (interstitial) cells between the tubules secrete testosterone.",
    latin: "Testis (orchis)",
    functions: [
      "Spermatogenesis in the seminiferous tubules, supported by Sertoli cells (which also form the blood–testis barrier and secrete inhibin)",
      "Testosterone production by Leydig cells under the control of pituitary LH",
      "Testosterone drives male sexual development, secondary sex characteristics and libido",
    ],
    facts: [
      { label: "Size", value: "About 4–5 cm long; volume roughly 15–25 mL" },
      { label: "Spermatogenesis", value: "About 64–74 days from spermatogonium to sperm; on the order of 100 million sperm per day" },
      { label: "Temperature", value: "Kept about 2–3 °C below core temperature (pampiniform plexus, cremaster and dartos muscles)" },
      { label: "Lymph drainage", value: "To para-aortic (lumbar) nodes, reflecting its abdominal origin" },
    ],
    connections: [
      { concept: "testicular-artery", relation: "supplied-by", note: "from the abdominal aorta near L2" },
      { concept: "testicular-vein", relation: "drained-by", note: "pampiniform plexus → testicular vein (right → IVC, left → left renal vein)" },
      { concept: "epididymis", relation: "flows-to", note: "sperm via the efferent ductules" },
      { concept: "pituitary-gland", relation: "receives-from", note: "LH and FSH" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "autonomic fibres from about T10; testicular pain may be felt around the umbilicus" },
    ],
    clinical:
      "Testicular torsion (twisting of the spermatic cord) cuts off the blood supply and is a surgical emergency, with the best salvage within about 6 hours. Testicular cancer is the commonest solid cancer in young men and spreads first to para-aortic nodes.",
  },

  "epididymis": {
    summary:
      "The epididymis is a comma-shaped structure on the back of each testis, consisting of a single, tightly coiled duct. Sperm enter its head from the efferent ductules, mature as they pass through its body, and are stored in its tail before entering the ductus deferens.",
    latin: "Epididymis",
    functions: [
      "Sperm maturation — sperm acquire forward motility and the capacity to fertilize",
      "Storage of sperm, mainly in the tail",
      "Absorbs fluid and concentrates sperm",
    ],
    facts: [
      { label: "Duct length", value: "About 6 m when uncoiled" },
      { label: "Parts", value: "Head, body and tail" },
    ],
    connections: [
      { concept: "testis", relation: "receives-from", note: "sperm via the efferent ductules" },
      { concept: "ductus-deferens", relation: "flows-to", note: "from the tail" },
      { concept: "testicular-artery", relation: "supplied-by" },
      { concept: "testicular-vein", relation: "drained-by", note: "via the pampiniform plexus" },
    ],
    clinical:
      "Epididymitis (often sexually transmitted infection in younger men, urinary organisms in older men) causes a painful, swollen scrotum; testicular torsion must be excluded urgently because the symptoms overlap.",
  },

  "ductus-deferens": {
    summary:
      "The ductus (vas) deferens is a thick-walled muscular tube that carries sperm from the tail of the epididymis up through the spermatic cord and inguinal canal into the pelvis. It crosses over the ureter to reach the back of the bladder, widens into an ampulla and joins the duct of the seminal vesicle to form the ejaculatory duct.",
    latin: "Ductus deferens (vas deferens)",
    functions: [
      "Transports sperm from the epididymis to the ejaculatory duct",
      "Powerful peristaltic contractions propel sperm during emission (sympathetic control)",
    ],
    facts: [
      { label: "Length", value: "About 30–45 cm" },
      { label: "Palpation", value: "Felt as a firm cord within the spermatic cord in the scrotum" },
    ],
    connections: [
      { concept: "epididymis", relation: "receives-from" },
      { concept: "urethra", relation: "flows-to", note: "via the ejaculatory duct into the prostatic urethra" },
      { concept: "seminal-vesicle", relation: "adjacent-to", note: "their ducts unite to form the ejaculatory duct" },
      { concept: "ureter", relation: "adjacent-to", note: "crosses over it beside the bladder" },
      { concept: "urinary-bladder", relation: "adjacent-to", note: "ampulla lies on its posterior surface" },
      { concept: "external-iliac-artery", relation: "adjacent-to", note: "crosses over it after the deep inguinal ring" },
      { concept: "testicular-artery", relation: "adjacent-to", note: "together in the spermatic cord" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "artery to the ductus deferens (from a vesical artery)" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "emission" },
    ],
    clinical:
      "Vasectomy divides and ties the ductus deferens through a small scrotal incision for contraception; sperm-free semen must be confirmed after some weeks, because sperm already beyond the cut remain for a while.",
  },

  "seminal-vesicle": {
    summary:
      "The seminal vesicles are paired, lobulated glands about 5 cm long lying on the back of the bladder above the prostate. Their ducts join the ampullae of the ductus deferens to form the ejaculatory ducts, and they produce most of the volume of semen.",
    latin: "Glandula vesiculosa (vesicula seminalis)",
    functions: [
      "Secrete an alkaline, fructose-rich fluid that fuels sperm",
      "Add prostaglandins and proteins (semenogelins) that make semen coagulate briefly after ejaculation",
      "Contribute roughly 60–70% of semen volume",
    ],
    facts: [
      { label: "Length", value: "About 5 cm (a coiled tube about 10–15 cm long)" },
      { label: "Ejaculate volume", value: "Typically about 2–5 mL; sperm make up only a small fraction" },
    ],
    connections: [
      { concept: "urethra", relation: "secretes-into", note: "via the ejaculatory duct into the prostatic urethra" },
      { concept: "ductus-deferens", relation: "adjacent-to", note: "ducts unite to form the ejaculatory duct" },
      { concept: "urinary-bladder", relation: "adjacent-to", note: "on its posterior surface" },
      { concept: "prostate", relation: "adjacent-to", note: "above it" },
      { concept: "rectum", relation: "adjacent-to", note: "behind, separated by the rectoprostatic fascia" },
      { concept: "ureter", relation: "adjacent-to", note: "near its upper end" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "inferior vesical and middle rectal branches" },
    ],
    clinical:
      "Invasion of the seminal vesicles by prostate cancer raises the stage and worsens prognosis; enlarged or tender vesicles may occasionally be felt on rectal examination.",
  },

  "prostate": {
    summary:
      "The prostate is a walnut-sized fibromuscular gland below the bladder neck that surrounds the first part of the urethra (prostatic urethra). It lies in front of the rectum, where it can be felt, and its secretions form about a quarter of the semen.",
    latin: "Prostata",
    functions: [
      "Secretes a thin, milky fluid containing PSA (which liquefies the semen clot), citrate, zinc and acid phosphatase",
      "Contributes roughly 20–30% of semen volume",
      "Smooth muscle helps expel semen and closes the bladder neck during ejaculation",
    ],
    facts: [
      { label: "Size", value: "About 20 g in young men (roughly 3 × 4 × 2 cm); enlarges with age" },
      { label: "Zones", value: "Peripheral (~70% of glandular tissue; most cancers), central (~25%), transition (~5%; site of benign enlargement)" },
    ],
    connections: [
      { concept: "urethra", relation: "secretes-into", note: "via 15–20 ducts into the prostatic urethra" },
      { concept: "urinary-bladder", relation: "adjacent-to", note: "base against the bladder neck" },
      { concept: "rectum", relation: "adjacent-to", note: "behind — palpable on rectal examination" },
      { concept: "seminal-vesicle", relation: "adjacent-to", note: "above and behind" },
      { concept: "levator-ani", relation: "adjacent-to", note: "sides rest on it" },
      { concept: "hip-bone", relation: "adjacent-to", note: "behind the pubic symphysis" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "inferior vesical, middle rectal and internal pudendal branches" },
      { concept: "internal-iliac-vein", relation: "drained-by", note: "via the prostatic venous plexus" },
    ],
    clinical:
      "Benign prostatic hyperplasia (in the transition zone) squeezes the urethra, causing hesitancy, a weak stream, frequency and nocturia. Prostate cancer usually arises in the peripheral zone — the part felt on rectal examination — and tends to spread to bone, especially the vertebrae via the prostatic venous plexus.",
  },

  "penis": {
    summary:
      "The penis is the male copulatory organ and the outlet for urine and semen. It contains three cylinders of erectile tissue — two dorsal corpora cavernosa and a ventral corpus spongiosum, which surrounds the spongy urethra and expands at the tip as the glans — and its root is anchored to the perineal membrane and ischiopubic rami.",
    latin: "Penis",
    functions: [
      "Conducts urine and semen through the spongy urethra",
      "Erection: parasympathetic (S2–S4) release of nitric oxide relaxes arterial and trabecular smooth muscle so the erectile tissue fills with blood",
      "Ejaculation: sympathetic emission followed by rhythmic contraction of bulbospongiosus (pudendal nerve)",
    ],
    facts: [
      { label: "Erectile bodies", value: "Paired corpora cavernosa (dorsal) and corpus spongiosum (ventral, containing the urethra)" },
      { label: "Nerves", value: "Dorsal nerve of the penis (pudendal, sensory); cavernous nerves (autonomic)" },
    ],
    connections: [
      { concept: "urethra", relation: "contains", note: "spongy (penile) urethra" },
      { concept: "dorsal-artery-of-penis", relation: "supplied-by" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via the internal pudendal artery (deep arteries to the corpora)" },
      { concept: "dorsal-veins-of-penis", relation: "drained-by" },
      { concept: "internal-pudendal-vein", relation: "drained-by" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "pudendal nerve (dorsal nerve of the penis; bulbospongiosus)" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "parasympathetic pelvic splanchnic nerves (S2–S4) for erection" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "emission and detumescence" },
      { concept: "hip-bone", relation: "attaches-to", note: "crura attach to the ischiopubic rami" },
    ],
    sexDifferences:
      "Develops from the same embryonic genital tubercle as the clitoris: the corpora cavernosa are homologous to those of the clitoris and the corpus spongiosum to the bulbs of the vestibule.",
    clinical:
      "Erectile dysfunction is often vascular and shares risk factors with cardiovascular disease; PDE5 inhibitors such as sildenafil enhance the nitric-oxide pathway. Hypospadias, an abnormal ventral urethral opening, is a common congenital anomaly.",
  },

  // ─────────────────────────── Female reproductive (ovum-flow order) ───────────────────────────
  "ovary": {
    summary:
      "The ovaries are the paired female gonads, almond-shaped and about 3 cm long, lying in the ovarian fossae on the lateral pelvic walls. They contain the ovarian follicles, release an oocyte roughly monthly (ovulation), and secrete estrogens and progesterone that control the menstrual cycle.",
    latin: "Ovarium",
    functions: [
      "Oogenesis and ovulation of a secondary oocyte about once per cycle",
      "Estrogen secretion by developing follicles (female sex characteristics, endometrial growth)",
      "Progesterone from the corpus luteum after ovulation (prepares the endometrium for implantation)",
      "Inhibin and small amounts of androgens",
    ],
    facts: [
      { label: "Size", value: "About 3 × 1.5 × 1 cm" },
      { label: "Follicle numbers", value: "About 1–2 million at birth; roughly 300,000–400,000 at puberty; only about 400–500 ovulate in a lifetime" },
      { label: "Blood supply", value: "Ovarian arteries from the abdominal aorta near L2, anastomosing with the uterine arteries" },
    ],
    connections: [
      { concept: "uterine-tube", relation: "flows-to", note: "ovulated oocyte is swept into the tube by the fimbriae" },
      { concept: "uterus", relation: "controls", note: "estrogen and progesterone drive the endometrial cycle; attached to it by the ligament of the ovary" },
      { concept: "mammary-gland", relation: "controls", note: "estrogen (ducts) and progesterone (lobules)" },
      { concept: "pituitary-gland", relation: "receives-from", note: "FSH and LH" },
      { concept: "abdominal-aorta", relation: "supplied-by", note: "via the ovarian arteries" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "ovarian branches of the uterine artery" },
      { concept: "inferior-vena-cava", relation: "drained-by", note: "right ovarian vein" },
      { concept: "renal-vein", relation: "drained-by", note: "left ovarian vein" },
      { concept: "obturator-nerve", relation: "adjacent-to", note: "on the lateral pelvic wall beneath the ovarian fossa" },
    ],
    clinical:
      "Ovarian cancer often causes only vague symptoms until advanced. Ovarian torsion is a gynaecological emergency, and polycystic ovary syndrome is a common cause of irregular cycles and infertility.",
  },

  "uterine-tube": {
    summary:
      "The uterine (fallopian) tubes are paired muscular tubes about 10 cm long running from the upper corners of the uterus toward the ovaries in the upper edge of the broad ligament. Their fringed, funnel-shaped ends (fimbriae) capture the ovulated oocyte, which is usually fertilized in the wide ampulla and then carried toward the uterus.",
    latin: "Tuba uterina (salpinx)",
    functions: [
      "Captures the oocyte at ovulation (fimbriae and infundibulum)",
      "Site of fertilization, usually in the ampulla",
      "Transports sperm toward the oocyte and the early embryo toward the uterus by cilia and peristalsis (about 3–4 days)",
    ],
    facts: [
      { label: "Length", value: "About 10 cm" },
      { label: "Parts (lateral → medial)", value: "Infundibulum with fimbriae, ampulla, isthmus, intramural (uterine) part" },
    ],
    connections: [
      { concept: "ovary", relation: "receives-from", note: "oocyte captured by the fimbriae draped over the ovary" },
      { concept: "uterus", relation: "flows-to", note: "early embryo enters the uterine cavity" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "tubal branches of the uterine artery" },
      { concept: "abdominal-aorta", relation: "supplied-by", note: "tubal branches of the ovarian artery" },
    ],
    clinical:
      "Ectopic pregnancy most often implants in the uterine tube (usually the ampulla); rupture can cause life-threatening internal bleeding. Pelvic inflammatory disease can scar the tubes, causing infertility; tubal ligation is a method of sterilization.",
  },

  "uterus": {
    summary:
      "The uterus is a thick-walled, pear-shaped muscular organ in the pelvis between the bladder and rectum, usually tilted forward (anteverted and anteflexed) over the bladder. It has a fundus, body and cervix; its lining (endometrium) thickens and sheds each menstrual cycle, and in pregnancy it houses and nourishes the fetus.",
    latin: "Uterus (metra)",
    functions: [
      "Receives the embryo for implantation and supports the pregnancy via the placenta",
      "Endometrium undergoes cyclical proliferation, secretion and shedding (menstruation)",
      "Myometrium contracts powerfully to expel the fetus at birth (stimulated by oxytocin)",
    ],
    facts: [
      { label: "Size (non-pregnant)", value: "About 7.5 cm long, 5 cm wide and 2.5 cm thick" },
      { label: "Pregnancy growth", value: "Increases from well under 100 g to about 1 kg at term" },
      { label: "Wall layers", value: "Perimetrium, myometrium (smooth muscle), endometrium" },
    ],
    connections: [
      { concept: "uterine-tube", relation: "receives-from" },
      { concept: "vagina", relation: "flows-to", note: "through the cervix (menstrual flow, birth canal)" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "uterine artery (anastomoses with the ovarian artery)" },
      { concept: "internal-iliac-vein", relation: "drained-by", note: "via the uterine venous plexus" },
      { concept: "ovary", relation: "adjacent-to", note: "attached by the ligament of the ovary" },
      { concept: "urinary-bladder", relation: "adjacent-to", note: "in front and below (vesicouterine pouch)" },
      { concept: "rectum", relation: "adjacent-to", note: "behind (rectouterine pouch of Douglas)" },
      { concept: "ureter", relation: "adjacent-to", note: "passes under the uterine artery beside the cervix" },
      { concept: "levator-ani", relation: "adjacent-to", note: "pelvic floor support" },
    ],
    clinical:
      "Fibroids (leiomyomas) are very common benign smooth-muscle tumours that can cause heavy periods. Cervical cancer is largely caused by HPV and prevented by vaccination and screening; during hysterectomy the ureters must be protected where they pass under the uterine arteries.",
  },

  "vagina": {
    summary:
      "The vagina is a distensible fibromuscular tube, about 7–9 cm long, running upward and backward from the vestibule to the cervix, between the bladder and urethra in front and the rectum behind. Its upper end forms recesses (fornices) around the cervix, the posterior fornix being the deepest.",
    latin: "Vagina (colpos)",
    functions: [
      "Receives the penis and semen during intercourse",
      "Outlet for menstrual flow",
      "Forms the lower birth canal",
    ],
    facts: [
      { label: "Length", value: "About 7–9 cm" },
      { label: "Lining", value: "Non-keratinized stratified squamous epithelium; glycogen feeds lactobacilli that keep the pH acidic (about 3.8–4.5)" },
      { label: "Sensory supply", value: "Lower part somatic (pudendal nerve, pain-sensitive); upper part visceral" },
    ],
    connections: [
      { concept: "uterus", relation: "receives-from", note: "via the cervix" },
      { concept: "urethra", relation: "adjacent-to", note: "embedded in its anterior wall" },
      { concept: "urinary-bladder", relation: "adjacent-to", note: "in front" },
      { concept: "rectum", relation: "adjacent-to", note: "behind" },
      { concept: "levator-ani", relation: "adjacent-to", note: "passes through the urogenital hiatus of the pelvic floor" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "vaginal and uterine arteries" },
      { concept: "internal-iliac-vein", relation: "drained-by", note: "via the vaginal venous plexus" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "pudendal nerve (lower part)" },
    ],
    clinical:
      "Weakening of the pelvic floor and vaginal supports, often after childbirth, can lead to pelvic organ prolapse (bladder, uterus or rectum bulging into the vagina). The posterior fornix lies against the rectouterine pouch, the lowest point of the peritoneal cavity.",
  },

  "mammary-gland": {
    summary:
      "The mammary glands (breasts) are modified apocrine sweat glands in the subcutaneous tissue of the anterior chest wall, overlying pectoralis major. In females each develops at puberty into about 15–20 lobes of milk-producing glandular tissue embedded in fat and supported by suspensory (Cooper) ligaments, with ducts converging on the nipple.",
    latin: "Glandula mammaria (mamma)",
    functions: [
      "Produces milk (lactation) to nourish the infant",
      "Prolactin drives milk synthesis; oxytocin causes milk ejection (let-down)",
      "Milk supplies antibodies (especially IgA) for passive infant immunity",
    ],
    facts: [
      { label: "Extent", value: "Roughly 2nd to 6th rib, from the sternum toward the midaxillary line, with an axillary tail" },
      { label: "Lymph drainage", value: "About 75% to axillary nodes; most of the rest to parasternal (internal thoracic) nodes" },
      { label: "Blood supply", value: "Internal thoracic (medial), lateral thoracic and thoracoacromial (lateral) and posterior intercostal arteries" },
    ],
    connections: [
      { concept: "pectoralis-major", relation: "adjacent-to", note: "lies on its fascia" },
      { concept: "serratus-anterior", relation: "adjacent-to", note: "lateral part" },
      { concept: "skin", relation: "adjacent-to", note: "develops from the skin; Cooper ligaments attach to the dermis" },
      { concept: "internal-thoracic-artery", relation: "supplied-by", note: "medial perforating branches" },
      { concept: "lateral-thoracic-artery", relation: "supplied-by" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "internal-thoracic-vein", relation: "drained-by" },
      { concept: "lateral-thoracic-vein", relation: "drained-by", note: "to the axillary vein" },
      { concept: "pituitary-gland", relation: "receives-from", note: "prolactin and oxytocin" },
      { concept: "ovary", relation: "receives-from", note: "estrogen and progesterone" },
    ],
    sexDifferences:
      "Female breasts develop at puberty under estrogen and progesterone and become functional in pregnancy and lactation. In males the gland stays rudimentary (small ducts, little or no lobular tissue), but men can still develop gynaecomastia and breast cancer (about 1% of all cases).",
    clinical:
      "Breast cancer is most common in the upper outer quadrant and spreads mainly to the axillary lymph nodes. Tumour involvement of Cooper ligaments dimples the skin, and blocked dermal lymphatics give an orange-peel appearance (peau d'orange).",
  },

  "breast-adipose-tissue": {
    summary:
      "Most of the volume of the adult female breast is subcutaneous fat rather than glandular tissue. This adipose tissue surrounds and separates the lobes of the mammary gland, is partitioned by the suspensory (Cooper) ligaments, and gives the breast its size and contour.",
    latin: "Corpus adiposum mammae",
    functions: [
      "Gives the breast its shape and most of its volume",
      "Cushions and supports the glandular lobes and ducts",
      "Stores energy and acts as an endocrine tissue (aromatase converts androgens to estrogens)",
    ],
    facts: [
      { label: "Composition", value: "Typically about half to two-thirds fat by volume, varying widely between individuals and with age" },
      { label: "Retromammary space", value: "A loose layer of areolar tissue between the breast and the pectoral fascia that lets the breast move over the chest wall" },
      { label: "With age", value: "Glandular tissue is progressively replaced by fat, especially after menopause" },
    ],
    connections: [
      { concept: "mammary-gland", relation: "contains", note: "surrounds the glandular lobes and lactiferous ducts" },
      { concept: "pectoralis-major", relation: "adjacent-to", note: "separated from it by the retromammary space" },
      { concept: "skin", relation: "adjacent-to", note: "Cooper ligaments run from the deep fascia to the dermis" },
      { concept: "internal-thoracic-artery", relation: "supplied-by", note: "perforating branches" },
      { concept: "lateral-thoracic-artery", relation: "supplied-by" },
      { concept: "lateral-thoracic-vein", relation: "drained-by" },
    ],
    sexDifferences:
      "Estrogen drives fat deposition in the breast at puberty, so the female breast is much larger and more fatty than the male breast, which is mostly skin, a little fat and rudimentary ducts.",
    clinical:
      "Fatty breasts look dark (radiolucent) on a mammogram, making tumours easier to see than in dense glandular breasts. Trauma can cause fat necrosis, a benign lump that can mimic cancer on examination.",
  },

  // ─────────────────────────── Integumentary ───────────────────────────
  "skin": {
    summary:
      "The skin is the body's largest organ, covering about 1.5–2 m² in adults. It has an outer epidermis of keratinized stratified squamous epithelium and a deeper dermis of connective tissue containing blood vessels, nerves, hair follicles and glands, resting on the subcutaneous fat (hypodermis).",
    latin: "Cutis",
    functions: [
      "Barrier against water loss, microbes, chemicals and UV radiation (keratin, lipids, melanin)",
      "Temperature regulation through sweating and changes in skin blood flow",
      "Sensation: touch, pressure, vibration, temperature and pain receptors",
      "Synthesizes vitamin D when exposed to UVB; immune surveillance (Langerhans cells)",
    ],
    facts: [
      { label: "Surface area", value: "About 1.5–2 m²" },
      { label: "Epidermal thickness", value: "From about 0.05 mm (eyelids) to about 1.5 mm (palms and soles)" },
      { label: "Eccrine sweat glands", value: "Roughly 2–4 million" },
      { label: "Sweating capacity", value: "Up to about 1 L/h, rising to 2–3 L/h after heat acclimatization" },
    ],
    connections: [
      { concept: "spinal-nerves", relation: "innervated-by", note: "sensory supply in segmental dermatomes" },
      { concept: "intercostal-nerves", relation: "innervated-by", note: "chest and abdominal wall" },
      { concept: "ophthalmic-nerve-cn-v1", relation: "innervated-by", note: "forehead, upper eyelid, scalp and nose" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "sweat glands, arrector pili and skin blood vessels" },
      { concept: "mammary-gland", relation: "adjacent-to", note: "a modified skin gland" },
      { concept: "muscles-of-facial-expression", relation: "adjacent-to", note: "insert into the facial skin" },
      { concept: "platysma", relation: "adjacent-to", note: "a thin sheet within the neck's superficial fascia" },
    ],
    sexDifferences:
      "On average male skin is thicker and oilier, with androgen-dependent terminal hair (beard, body hair), while female skin has more subcutaneous fat, especially over the hips, thighs and breasts. Pregnancy often causes hyperpigmentation (e.g. linea nigra, melasma).",
    clinical:
      "Burns are classified by depth, and their extent in adults is estimated with the 'rule of nines'. Skin cancers are the most common cancers: basal cell carcinoma is most frequent, while melanoma is the most dangerous.",
  },
};
