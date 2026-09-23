import type { ConceptInfo } from "./types";

/**
 * Knowledge entries for the muscular system (muscles, tendons, retinacula and aponeuroses).
 * Content follows standard references (Gray's Anatomy, Moore's Clinically Oriented Anatomy,
 * Netter). Spinal root values are typical and vary slightly between texts.
 */
export const muscular: Record<string, ConceptInfo> = {
  // ───────────────────────────── Orbit ─────────────────────────────
  "orbital-tendons-ligaments": {
    summary:
      "The connective-tissue framework of the orbit. It includes the common tendinous ring (annulus of Zinn), from which the four rectus muscles arise; the trochlea, a fibrocartilage pulley for the superior oblique tendon; the check ligaments and suspensory ligament (of Lockwood) that support the eyeball; and the medial and lateral palpebral ligaments that anchor the eyelids.",
    latin: "Anulus tendineus communis; trochlea; ligamenta palpebralia",
    functions: [
      "Provides a common origin for the superior, inferior, medial and lateral rectus muscles",
      "Acts as a pulley (trochlea) that redirects the pull of the superior oblique",
      "Check ligaments limit excessive movement of the eye; the suspensory ligament supports it like a hammock",
      "Palpebral ligaments anchor the tarsal plates of the eyelids to the orbital margin",
    ],
    facts: [
      { label: "Passes through the ring", value: "Optic nerve, ophthalmic artery, CN III (both divisions), nasociliary nerve and CN VI" },
      { label: "Passes outside the ring", value: "Trochlear nerve (CN IV), frontal and lacrimal nerves, superior ophthalmic vein" },
    ],
    connections: [
      { concept: "sphenoid-bone", relation: "attaches-to", note: "common tendinous ring around the optic canal and superior orbital fissure" },
      { concept: "frontal-bone", relation: "attaches-to", note: "trochlea attaches in the trochlear fovea" },
      { concept: "zygomatic-bone", relation: "attaches-to", note: "lateral palpebral ligament (lateral orbital tubercle)" },
      { concept: "maxilla", relation: "attaches-to", note: "medial palpebral ligament (frontal process of maxilla)" },
      { concept: "tarsal-plates", relation: "attaches-to", note: "palpebral ligaments anchor the tarsal plates" },
      { concept: "optic-nerve", relation: "adjacent-to", note: "passes through the common tendinous ring" },
      { concept: "ophthalmic-artery", relation: "adjacent-to", note: "enters the orbit within the ring" },
      { concept: "oculomotor-nerve-cn-iii", relation: "adjacent-to", note: "both divisions pass through the ring" },
      { concept: "superior-rectus-eye", relation: "adjacent-to", note: "arises from the ring" },
      { concept: "inferior-rectus-eye", relation: "adjacent-to", note: "arises from the ring" },
      { concept: "medial-rectus-eye", relation: "adjacent-to", note: "arises from the ring" },
      { concept: "lateral-rectus-eye", relation: "adjacent-to", note: "arises from the ring" },
      { concept: "superior-oblique-eye", relation: "adjacent-to", note: "tendon runs through the trochlea" },
    ],
    clinical:
      "Inflammation or masses at the orbital apex can involve the common tendinous ring and the nerves passing through it, producing combined visual loss and eye-movement palsies (orbital apex syndrome).",
  },

  "superior-rectus-eye": {
    summary:
      "One of the four rectus muscles of the eye. It lies above the eyeball, just beneath levator palpebrae superioris, and is the main elevator of the eye, especially when the eye is turned outward.",
    functions: [
      "Elevates the eye, most effectively when the eye is abducted",
      "Helps adduct the eye",
      "Rotates the top of the eye medially (intorsion)",
      "Works with the inferior oblique to look upward",
    ],
    facts: [
      { label: "Clinical test", value: "Patient looks out (laterally), then up" },
      { label: "Insertion from limbus", value: "About 7.5–8 mm (farthest of the recti)" },
    ],
    origin: "Superior part of the common tendinous ring",
    insertion: "Superior sclera, roughly 7.5–8 mm behind the corneoscleral junction (limbus)",
    action: "Elevates, adducts and medially rotates (intorts) the eyeball",
    innervation: "Oculomotor nerve (CN III), superior division",
    bloodSupply: "Muscular branches of the ophthalmic artery",
    connections: [
      { concept: "orbital-tendons-ligaments", relation: "attaches-to", note: "origin: common tendinous ring" },
      { concept: "sphenoid-bone", relation: "attaches-to", note: "origin (via the ring at the orbital apex)" },
      { concept: "sclera", relation: "attaches-to", note: "insertion; moves the eyeball" },
      { concept: "oculomotor-nerve-cn-iii", relation: "innervated-by", note: "superior division" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "muscular branches" },
      { concept: "levator-palpebrae-superioris", relation: "adjacent-to", note: "lies directly above; fascial sheaths are linked" },
      { concept: "inferior-rectus-eye", relation: "adjacent-to", note: "antagonist (depression)" },
      { concept: "superior-oblique-eye", relation: "adjacent-to", note: "SO tendon passes beneath it" },
    ],
    clinical:
      "In a complete oculomotor (CN III) palsy the superior rectus is paralysed along with most other extraocular muscles, leaving the eye 'down and out' with ptosis and often a dilated pupil.",
  },

  "inferior-rectus-eye": {
    summary:
      "The rectus muscle below the eyeball. It is the main depressor of the eye when the eye is turned outward and lies on the floor of the orbit.",
    functions: [
      "Depresses the eye, most effectively when the eye is abducted",
      "Helps adduct the eye",
      "Rotates the top of the eye laterally (extorsion)",
    ],
    facts: [
      { label: "Clinical test", value: "Patient looks out (laterally), then down" },
      { label: "Insertion from limbus", value: "About 6.5 mm" },
    ],
    origin: "Inferior part of the common tendinous ring",
    insertion: "Inferior sclera, roughly 6.5 mm behind the limbus",
    action: "Depresses, adducts and laterally rotates (extorts) the eyeball",
    innervation: "Oculomotor nerve (CN III), inferior division",
    bloodSupply: "Muscular branches of the ophthalmic artery; infraorbital artery",
    connections: [
      { concept: "orbital-tendons-ligaments", relation: "attaches-to", note: "origin: common tendinous ring" },
      { concept: "sphenoid-bone", relation: "attaches-to", note: "origin (via the ring at the orbital apex)" },
      { concept: "sclera", relation: "attaches-to", note: "insertion; moves the eyeball" },
      { concept: "oculomotor-nerve-cn-iii", relation: "innervated-by", note: "inferior division" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "muscular branches" },
      { concept: "maxilla", relation: "adjacent-to", note: "lies on the orbital floor" },
      { concept: "inferior-oblique-eye", relation: "adjacent-to", note: "IO passes beneath it" },
      { concept: "superior-rectus-eye", relation: "adjacent-to", note: "antagonist (elevation)" },
    ],
    clinical:
      "In an orbital floor 'blowout' fracture the inferior rectus can become trapped in the fracture, causing restricted upward gaze and double vision.",
  },

  "medial-rectus-eye": {
    summary:
      "The rectus muscle on the nasal side of the eyeball and the prime adductor of the eye. It is generally described as the largest of the extraocular muscles.",
    functions: [
      "Turns the eye toward the nose (adduction)",
      "Both medial recti contract together to converge the eyes for near vision",
      "Pairs with the opposite lateral rectus during sideways gaze",
    ],
    facts: [
      { label: "Clinical test", value: "Patient looks medially (toward the nose)" },
      { label: "Insertion from limbus", value: "About 5.5 mm (closest of the recti)" },
    ],
    origin: "Medial part of the common tendinous ring",
    insertion: "Medial sclera, roughly 5.5 mm behind the limbus",
    action: "Adducts the eyeball",
    innervation: "Oculomotor nerve (CN III), inferior division",
    bloodSupply: "Muscular branches of the ophthalmic artery",
    connections: [
      { concept: "orbital-tendons-ligaments", relation: "attaches-to", note: "origin: common tendinous ring" },
      { concept: "sphenoid-bone", relation: "attaches-to", note: "origin (via the ring at the orbital apex)" },
      { concept: "sclera", relation: "attaches-to", note: "insertion; moves the eyeball" },
      { concept: "oculomotor-nerve-cn-iii", relation: "innervated-by", note: "inferior division" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "muscular branches" },
      { concept: "ethmoid-bone", relation: "adjacent-to", note: "lies along the medial orbital wall" },
      { concept: "lateral-rectus-eye", relation: "adjacent-to", note: "antagonist (abduction)" },
      { concept: "superior-oblique-eye", relation: "adjacent-to", note: "SO runs above it along the superomedial wall" },
    ],
    clinical:
      "A lesion of the medial longitudinal fasciculus (e.g. in multiple sclerosis) causes internuclear ophthalmoplegia: the medial rectus fails to adduct on sideways gaze even though convergence may still work.",
  },

  "lateral-rectus-eye": {
    summary:
      "The rectus muscle on the temporal side of the eyeball and the only abductor among the recti. It is the one extraocular muscle supplied by the abducens nerve (CN VI).",
    functions: [
      "Turns the eye outward (abduction)",
      "Pairs with the opposite medial rectus during sideways gaze",
    ],
    facts: [
      { label: "Mnemonic", value: "LR6 SO4, the rest 3 (lateral rectus: CN VI; superior oblique: CN IV)" },
      { label: "Insertion from limbus", value: "About 6.9 mm" },
    ],
    origin: "Lateral part of the common tendinous ring (by two heads that bridge the superior orbital fissure)",
    insertion: "Lateral sclera, roughly 7 mm behind the limbus",
    action: "Abducts the eyeball",
    innervation: "Abducens nerve (CN VI)",
    bloodSupply: "Muscular branches of the ophthalmic artery (including the lacrimal artery)",
    connections: [
      { concept: "orbital-tendons-ligaments", relation: "attaches-to", note: "origin: common tendinous ring" },
      { concept: "sphenoid-bone", relation: "attaches-to", note: "origin (via the ring at the orbital apex)" },
      { concept: "sclera", relation: "attaches-to", note: "insertion; moves the eyeball" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "muscular and lacrimal branches" },
      { concept: "oculomotor-nerve-cn-iii", relation: "adjacent-to", note: "CN III and CN VI enter the ring between its two heads" },
      { concept: "medial-rectus-eye", relation: "adjacent-to", note: "antagonist (adduction)" },
      { concept: "zygomatic-bone", relation: "adjacent-to", note: "lies along the lateral orbital wall" },
      { concept: "lacrimal-apparatus", relation: "adjacent-to", note: "lacrimal gland lies superolateral to it" },
    ],
    clinical:
      "The abducens nerve has a long intracranial course and is often affected by raised intracranial pressure; a CN VI palsy leaves the eye unable to abduct and turned inward, with horizontal double vision.",
  },

  "superior-oblique-eye": {
    summary:
      "A long, slender extraocular muscle whose tendon passes through a pulley (the trochlea) before turning back to insert on the eyeball. It is the only muscle supplied by the trochlear nerve (CN IV).",
    functions: [
      "Depresses the eye, especially when it is turned toward the nose (e.g. reading, walking downstairs)",
      "Rotates the top of the eye medially (intorsion)",
      "Helps abduct the eye",
    ],
    facts: [
      { label: "Clinical test", value: "Patient looks in (medially), then down" },
      { label: "Nerve", value: "Trochlear nerve (CN IV) only" },
    ],
    origin: "Body of the sphenoid bone, superomedial to the optic canal",
    insertion: "Sclera of the posterosuperolateral quadrant, behind the equator, after passing through the trochlea and beneath the superior rectus",
    action: "Medially rotates (intorts), depresses and abducts the eyeball",
    innervation: "Trochlear nerve (CN IV)",
    bloodSupply: "Muscular branches of the ophthalmic artery",
    connections: [
      { concept: "sphenoid-bone", relation: "attaches-to", note: "origin" },
      { concept: "sclera", relation: "attaches-to", note: "insertion; moves the eyeball" },
      { concept: "orbital-tendons-ligaments", relation: "adjacent-to", note: "tendon runs through the trochlea" },
      { concept: "frontal-bone", relation: "adjacent-to", note: "trochlea sits on the frontal bone" },
      { concept: "trochlear-nerve-cn-iv", relation: "innervated-by" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "muscular branches" },
      { concept: "superior-rectus-eye", relation: "adjacent-to", note: "tendon passes beneath it" },
      { concept: "inferior-oblique-eye", relation: "adjacent-to", note: "antagonist in torsion" },
    ],
    clinical:
      "A trochlear nerve palsy causes vertical double vision that is worst when looking down and in (e.g. descending stairs); patients often tilt the head away from the affected side to compensate.",
  },

  "inferior-oblique-eye": {
    summary:
      "The only extraocular muscle that arises from the front of the orbit rather than the orbital apex. It runs beneath the eyeball from the orbital floor to the back of its lateral side.",
    functions: [
      "Elevates the eye, especially when it is turned toward the nose",
      "Rotates the top of the eye laterally (extorsion)",
      "Helps abduct the eye",
    ],
    facts: [
      { label: "Clinical test", value: "Patient looks in (medially), then up" },
      { label: "Unique feature", value: "Only extraocular muscle arising from the anterior orbit" },
    ],
    origin: "Orbital surface of the maxilla at the front of the orbital floor, just lateral to the nasolacrimal canal",
    insertion: "Sclera of the posterolateral quadrant, behind the equator, deep to the lateral rectus",
    action: "Laterally rotates (extorts), elevates and abducts the eyeball",
    innervation: "Oculomotor nerve (CN III), inferior division",
    bloodSupply: "Muscular branches of the ophthalmic artery; infraorbital artery",
    connections: [
      { concept: "maxilla", relation: "attaches-to", note: "origin: orbital floor" },
      { concept: "sclera", relation: "attaches-to", note: "insertion; moves the eyeball" },
      { concept: "oculomotor-nerve-cn-iii", relation: "innervated-by", note: "inferior division" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "muscular branches" },
      { concept: "lacrimal-apparatus", relation: "adjacent-to", note: "arises just lateral to the nasolacrimal canal" },
      { concept: "inferior-rectus-eye", relation: "adjacent-to", note: "passes beneath it" },
      { concept: "lateral-rectus-eye", relation: "adjacent-to", note: "inserts deep to it" },
      { concept: "superior-oblique-eye", relation: "adjacent-to", note: "antagonist in torsion" },
    ],
    clinical:
      "Overaction of the inferior oblique is a common finding in childhood strabismus and shows as the eye drifting upward when it is turned toward the nose.",
  },

  "levator-palpebrae-superioris": {
    summary:
      "A thin, triangular muscle that raises the upper eyelid. It lies above the superior rectus and ends in a broad aponeurosis in the eyelid; a small smooth-muscle portion (the superior tarsal muscle) adds sympathetic tone.",
    functions: [
      "Raises (retracts) the upper eyelid to open the eye",
      "Keeps the lid elevated while awake",
      "Superior tarsal (smooth) part adds a few millimetres of lift via sympathetic nerves",
    ],
    facts: [
      { label: "Dual innervation", value: "Skeletal part: CN III; smooth superior tarsal part: sympathetic fibres" },
      { label: "Antagonist", value: "Orbicularis oculi (facial nerve) closes the eye" },
    ],
    origin: "Lesser wing of the sphenoid bone, superior and anterior to the optic canal",
    insertion: "Superior tarsal plate and skin of the upper eyelid (via its aponeurosis)",
    action: "Elevates the upper eyelid",
    innervation: "Oculomotor nerve (CN III), superior division; superior tarsal muscle by postganglionic sympathetic fibres from the superior cervical ganglion",
    bloodSupply: "Branches of the ophthalmic artery (e.g. supraorbital artery)",
    connections: [
      { concept: "sphenoid-bone", relation: "attaches-to", note: "origin: lesser wing" },
      { concept: "tarsal-plates", relation: "attaches-to", note: "insertion: superior tarsus" },
      { concept: "skin", relation: "attaches-to", note: "insertion: upper-eyelid skin" },
      { concept: "oculomotor-nerve-cn-iii", relation: "innervated-by", note: "superior division" },
      { concept: "sympathetic-trunk", relation: "innervated-by", note: "superior tarsal (smooth) part" },
      { concept: "ophthalmic-artery", relation: "supplied-by" },
      { concept: "superior-rectus-eye", relation: "adjacent-to", note: "lies directly beneath it" },
      { concept: "muscles-of-facial-expression", relation: "adjacent-to", note: "orbicularis oculi is its antagonist" },
    ],
    clinical:
      "A CN III palsy causes complete ptosis (drooping lid), whereas Horner syndrome causes only mild ptosis because just the sympathetic superior tarsal muscle is lost.",
  },

  // ─────────────────────────── Foot (intrinsic) ───────────────────────────
  "intrinsic-muscles-of-foot": {
    summary:
      "The small muscles that begin and end within the foot. In the sole they form four layers: (1) abductor hallucis, flexor digitorum brevis and abductor digiti minimi; (2) quadratus plantae (flexor accessorius) and the four lumbricals; (3) flexor hallucis brevis, adductor hallucis and flexor digiti minimi brevis; (4) the plantar and dorsal interossei. Extensor digitorum brevis and extensor hallucis brevis lie on the top (dorsum) of the foot.",
    functions: [
      "Support the arches of the foot, especially during push-off",
      "Stabilise the toes against the ground when standing and walking",
      "Lumbricals flex the metatarsophalangeal joints and extend the interphalangeal joints",
      "Plantar interossei adduct (PAD) and dorsal interossei abduct (DAB) the toes relative to the 2nd toe",
    ],
    facts: [
      { label: "Plantar layers", value: "4" },
      { label: "Nerve supply", value: "Medial and lateral plantar nerves (tibial nerve); dorsal muscles by the deep fibular nerve" },
      { label: "Axis for toe abduction", value: "Second toe (the middle finger in the hand)" },
    ],
    innervation:
      "Medial plantar nerve (abductor hallucis, flexor digitorum brevis, flexor hallucis brevis, 1st lumbrical) and lateral plantar nerve (all other plantar muscles), both from the tibial nerve (S2–S3); deep fibular nerve for the dorsal muscles",
    bloodSupply:
      "Medial and lateral plantar arteries and the deep plantar arch (from the posterior tibial artery); dorsalis pedis artery on the dorsum",
    connections: [
      { concept: "abductor-hallucis", relation: "contains", note: "layer 1" },
      { concept: "flexor-digitorum-brevis", relation: "contains", note: "layer 1" },
      { concept: "abductor-digiti-minimi-of-foot", relation: "contains", note: "layer 1" },
      { concept: "flexor-accessorius", relation: "contains", note: "layer 2 (quadratus plantae)" },
      { concept: "flexor-hallucis-brevis", relation: "contains", note: "layer 3" },
      { concept: "adductor-hallucis", relation: "contains", note: "layer 3" },
      { concept: "flexor-digiti-minimi-brevis-of-foot", relation: "contains", note: "layer 3" },
      { concept: "opponens-digiti-minimi-of-foot", relation: "contains", note: "inconstant slip of layer 3" },
      { concept: "extensor-hallucis-brevis", relation: "contains", note: "dorsum of foot" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via medial and lateral plantar nerves" },
      { concept: "common-fibular-nerve", relation: "innervated-by", note: "deep fibular branch (dorsal muscles)" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "plantar arteries and plantar arch" },
      { concept: "dorsalis-pedis-artery", relation: "supplied-by", note: "dorsal muscles" },
      { concept: "plantar-veins-of-foot", relation: "drained-by" },
      { concept: "calcaneus", relation: "attaches-to", note: "origin of many superficial plantar muscles" },
      { concept: "long-plantar-ligament", relation: "adjacent-to", note: "lies deep to the plantar muscles" },
    ],
    clinical:
      "Weakness of the intrinsic foot muscles (e.g. in diabetic neuropathy) lets the long flexors and extensors act unopposed, producing claw toes and pressure ulcers under the metatarsal heads.",
  },

  "abductor-hallucis": {
    summary:
      "The most medial muscle of the first (superficial) layer of the sole, forming the soft medial border of the foot. It abducts and flexes the big toe and helps support the medial arch.",
    functions: [
      "Moves the big toe away from the second toe (abduction)",
      "Flexes the big toe at its base",
      "Helps support the medial longitudinal arch",
    ],
    origin: "Medial process of the calcaneal tuberosity, flexor retinaculum and plantar aponeurosis",
    insertion: "Medial side of the base of the proximal phalanx of the big toe (with the medial tendon of flexor hallucis brevis)",
    action: "Abducts and flexes the big toe (hallux) at the metatarsophalangeal joint",
    innervation: "Medial plantar nerve (S2–S3), a branch of the tibial nerve",
    bloodSupply: "Medial plantar artery",
    connections: [
      { concept: "calcaneus", relation: "attaches-to", note: "origin: medial process of calcaneal tuberosity" },
      { concept: "phalanges-of-big-toe", relation: "attaches-to", note: "insertion: base of proximal phalanx" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via medial plantar nerve" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "medial plantar artery" },
      { concept: "posterior-tibial-artery", relation: "adjacent-to", note: "plantar vessels and nerves pass deep to its origin" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of", note: "first plantar layer" },
      { concept: "flexor-digitorum-brevis", relation: "adjacent-to", note: "lateral neighbour in layer 1" },
      { concept: "flexor-hallucis-brevis", relation: "adjacent-to", note: "shares insertion on the big toe" },
    ],
    clinical:
      "The medial and lateral plantar nerves pass deep to its origin, where they can be compressed (part of tarsal tunnel syndrome), causing burning pain and numbness in the sole.",
  },

  "flexor-digitorum-brevis": {
    summary:
      "The central muscle of the first layer of the sole, lying just deep to the plantar aponeurosis. Its four tendons split to let the tendons of flexor digitorum longus pass through, just like flexor digitorum superficialis in the hand.",
    functions: [
      "Flexes the lateral four toes, mainly at the proximal interphalangeal joints",
      "Helps grip the ground and support the longitudinal arch",
    ],
    facts: [{ label: "Hand equivalent", value: "Flexor digitorum superficialis" }],
    origin: "Medial process of the calcaneal tuberosity, plantar aponeurosis and intermuscular septa",
    insertion: "Both sides of the middle phalanges of the lateral four toes",
    action: "Flexes the lateral four toes",
    innervation: "Medial plantar nerve (S2–S3)",
    bloodSupply: "Medial and lateral plantar arteries; plantar digital arteries",
    connections: [
      { concept: "calcaneus", relation: "attaches-to", note: "origin: medial process of calcaneal tuberosity" },
      { concept: "phalanges-of-second-toe", relation: "attaches-to", note: "insertion: middle phalanx" },
      { concept: "phalanges-of-third-toe", relation: "attaches-to", note: "insertion: middle phalanx" },
      { concept: "phalanges-of-fourth-toe", relation: "attaches-to", note: "insertion: middle phalanx" },
      { concept: "phalanges-of-little-toe", relation: "attaches-to", note: "insertion: middle phalanx" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via medial plantar nerve" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "medial and lateral plantar arteries" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of", note: "first plantar layer" },
      { concept: "flexor-digitorum-longus", relation: "adjacent-to", note: "its tendons pass through FDB's split tendons" },
      { concept: "flexor-accessorius", relation: "adjacent-to", note: "lies deep to it" },
    ],
    clinical:
      "It shares its calcaneal origin with the plantar aponeurosis, the usual site of heel pain in plantar fasciitis.",
  },

  "abductor-digiti-minimi-of-foot": {
    summary:
      "The most lateral muscle of the first layer of the sole, forming the fleshy lateral border of the foot. It abducts and flexes the little toe.",
    functions: [
      "Moves the little toe away from the other toes (abduction)",
      "Flexes the little toe at its base",
      "Helps support the lateral longitudinal arch",
    ],
    origin: "Medial and lateral processes of the calcaneal tuberosity, plantar aponeurosis and intermuscular septa",
    insertion: "Lateral side of the base of the proximal phalanx of the 5th toe",
    action: "Abducts and flexes the little toe",
    innervation: "Lateral plantar nerve (S2–S3)",
    bloodSupply: "Lateral plantar artery",
    connections: [
      { concept: "calcaneus", relation: "attaches-to", note: "origin: calcaneal tuberosity" },
      { concept: "phalanges-of-little-toe", relation: "attaches-to", note: "insertion: base of proximal phalanx" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via lateral plantar nerve" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "lateral plantar artery" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of", note: "first plantar layer" },
      { concept: "fifth-metatarsal", relation: "adjacent-to", note: "runs along the lateral border of the foot" },
      { concept: "flexor-digitorum-brevis", relation: "adjacent-to", note: "medial neighbour in layer 1" },
    ],
    clinical:
      "Entrapment of the nerve to abductor digiti minimi (first branch of the lateral plantar nerve) near the heel is a recognised cause of chronic heel pain.",
  },

  "flexor-accessorius": {
    summary:
      "Also called quadratus plantae, a flat, two-headed muscle in the second layer of the sole. It pulls backward on the tendon of flexor digitorum longus, straightening that tendon's oblique line of pull so the toes flex straight.",
    latin: "Musculus quadratus plantae",
    functions: [
      "Corrects the oblique pull of flexor digitorum longus",
      "Assists in flexing the lateral four toes",
    ],
    origin: "Medial head: medial surface of the calcaneus; lateral head: lateral margin of the plantar surface of the calcaneus (and long plantar ligament)",
    insertion: "Posterolateral margin of the tendon of flexor digitorum longus",
    action: "Assists flexor digitorum longus in flexing the lateral four toes",
    innervation: "Lateral plantar nerve (S2–S3)",
    bloodSupply: "Medial and lateral plantar arteries",
    connections: [
      { concept: "calcaneus", relation: "attaches-to", note: "origin (two heads)" },
      { concept: "long-plantar-ligament", relation: "attaches-to", note: "origin (lateral head)" },
      { concept: "flexor-digitorum-longus", relation: "attaches-to", note: "insertion: FDL tendon" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via lateral plantar nerve" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "plantar arteries" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of", note: "second plantar layer" },
      { concept: "flexor-digitorum-brevis", relation: "adjacent-to", note: "lies superficial to it" },
    ],
  },

  "flexor-hallucis-brevis": {
    summary:
      "A two-bellied muscle of the third layer of the sole that flexes the big toe at its base. Each of its two tendons contains a sesamoid bone that sits beneath the head of the 1st metatarsal.",
    functions: [
      "Flexes the big toe at the metatarsophalangeal joint",
      "Its sesamoids protect the flexor hallucis longus tendon and take weight at push-off",
    ],
    origin: "Plantar surfaces of the cuboid and lateral cuneiform bones",
    insertion: "Both sides of the base of the proximal phalanx of the big toe, via two tendons each containing a sesamoid bone",
    action: "Flexes the proximal phalanx of the big toe",
    innervation: "Medial plantar nerve (S2–S3)",
    bloodSupply: "Medial plantar artery and first plantar metatarsal artery",
    connections: [
      { concept: "cuboid-bone", relation: "attaches-to", note: "origin" },
      { concept: "lateral-cuneiform-bone", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-big-toe", relation: "attaches-to", note: "insertion: base of proximal phalanx" },
      { concept: "sesamoid-bones-of-foot", relation: "attaches-to", note: "a sesamoid lies in each tendon" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via medial plantar nerve" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "medial plantar artery" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of", note: "third plantar layer" },
      { concept: "flexor-hallucis-longus", relation: "adjacent-to", note: "FHL tendon runs between its two bellies" },
      { concept: "adductor-hallucis", relation: "adjacent-to", note: "blends with its lateral tendon" },
    ],
    clinical:
      "The sesamoid bones in its tendons bear body weight at push-off and can fracture or become inflamed (sesamoiditis), especially in runners and dancers.",
  },

  "adductor-hallucis": {
    summary:
      "A two-headed muscle in the third layer of the sole. Its oblique head runs forward from the middle metatarsals and its transverse head runs across beneath the metatarsal heads; both converge on the big toe.",
    functions: [
      "Pulls the big toe toward the second toe (adduction)",
      "Helps maintain the transverse arch of the foot",
    ],
    origin: "Oblique head: bases of the 2nd–4th metatarsals; transverse head: plantar ligaments of the 3rd–5th metatarsophalangeal joints",
    insertion: "Lateral side of the base of the proximal phalanx of the big toe (tendon blends with the lateral tendon of flexor hallucis brevis)",
    action: "Adducts the big toe; assists in maintaining the transverse arch",
    innervation: "Deep branch of the lateral plantar nerve (S2–S3)",
    bloodSupply: "Medial and lateral plantar arteries, deep plantar arch and plantar metatarsal arteries",
    connections: [
      { concept: "second-metatarsal", relation: "attaches-to", note: "origin: oblique head" },
      { concept: "third-metatarsal", relation: "attaches-to", note: "origin: oblique head" },
      { concept: "fourth-metatarsal", relation: "attaches-to", note: "origin: oblique head" },
      { concept: "phalanges-of-big-toe", relation: "attaches-to", note: "insertion: base of proximal phalanx" },
      { concept: "sesamoid-bones-of-foot", relation: "adjacent-to", note: "inserts with the lateral sesamoid" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via deep branch of lateral plantar nerve" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "plantar arch" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of", note: "third plantar layer" },
      { concept: "flexor-hallucis-brevis", relation: "adjacent-to" },
    ],
    clinical:
      "Its pull contributes to the lateral drift of the big toe in hallux valgus (bunion); releasing its tendon is part of some bunion operations.",
  },

  "flexor-digiti-minimi-brevis-of-foot": {
    summary:
      "A small muscle of the third layer of the sole lying along the underside of the 5th metatarsal. It flexes the little toe at its base.",
    functions: ["Flexes the little toe at the metatarsophalangeal joint", "Helps support the lateral side of the foot"],
    origin: "Base of the 5th metatarsal and the sheath of the fibularis longus tendon",
    insertion: "Base of the proximal phalanx of the 5th toe",
    action: "Flexes the proximal phalanx of the little toe",
    innervation: "Superficial branch of the lateral plantar nerve (S2–S3)",
    bloodSupply: "Lateral plantar artery",
    connections: [
      { concept: "fifth-metatarsal", relation: "attaches-to", note: "origin: base" },
      { concept: "phalanges-of-little-toe", relation: "attaches-to", note: "insertion: base of proximal phalanx" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via lateral plantar nerve" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "lateral plantar artery" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of", note: "third plantar layer" },
      { concept: "fibularis-longus", relation: "adjacent-to", note: "arises from its tendon sheath" },
      { concept: "abductor-digiti-minimi-of-foot", relation: "adjacent-to" },
      { concept: "opponens-digiti-minimi-of-foot", relation: "adjacent-to", note: "deep fibres sometimes separated as this muscle" },
    ],
  },

  "opponens-digiti-minimi-of-foot": {
    summary:
      "An inconstant slip of deep fibres from flexor digiti minimi brevis that inserts on the shaft of the 5th metatarsal. Many textbooks treat it as part of that muscle; unlike the little finger, the little toe cannot truly be opposed.",
    functions: ["Draws the 5th metatarsal slightly downward and inward, helping deepen the lateral arch (weak action)"],
    facts: [{ label: "Variability", value: "Inconstant; often counted as part of flexor digiti minimi brevis" }],
    origin: "With flexor digiti minimi brevis, from the region of the base of the 5th metatarsal and the sheath of fibularis longus",
    insertion: "Lateral border of the distal half of the 5th metatarsal",
    action: "Weakly draws the 5th metatarsal plantarward and medially",
    innervation: "Lateral plantar nerve (S2–S3)",
    bloodSupply: "Lateral plantar artery",
    connections: [
      { concept: "fifth-metatarsal", relation: "attaches-to", note: "origin (base region) and insertion (shaft)" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "via lateral plantar nerve" },
      { concept: "arteries-of-the-foot", relation: "supplied-by", note: "lateral plantar artery" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of" },
      { concept: "flexor-digiti-minimi-brevis-of-foot", relation: "adjacent-to", note: "parent muscle" },
      { concept: "fibularis-longus", relation: "adjacent-to", note: "tendon sheath" },
    ],
  },

  "extensor-hallucis-brevis": {
    summary:
      "A small muscle on the top (dorsum) of the foot, usually regarded as the medial part of extensor digitorum brevis. It helps extend the big toe.",
    functions: ["Extends the big toe at the metatarsophalangeal joint", "Assists extensor hallucis longus"],
    origin: "Superolateral surface of the calcaneus (floor of the tarsal sinus) and the inferior extensor retinaculum",
    insertion: "Dorsal surface of the base of the proximal phalanx of the big toe",
    action: "Extends the big toe at the metatarsophalangeal joint",
    innervation: "Deep fibular nerve (S1–S2; some texts L5–S1)",
    bloodSupply: "Dorsalis pedis artery and its branches",
    connections: [
      { concept: "calcaneus", relation: "attaches-to", note: "origin: superolateral surface" },
      { concept: "phalanges-of-big-toe", relation: "attaches-to", note: "insertion: base of proximal phalanx" },
      { concept: "common-fibular-nerve", relation: "innervated-by", note: "via deep fibular nerve" },
      { concept: "dorsalis-pedis-artery", relation: "supplied-by", note: "its tendon also crosses the artery" },
      { concept: "intrinsic-muscles-of-foot", relation: "part-of", note: "dorsal intrinsic muscle" },
      { concept: "extensor-hallucis-longus", relation: "adjacent-to", note: "synergist" },
    ],
    clinical:
      "Its tendon crosses the dorsalis pedis artery on the top of the foot, a landmark when feeling for the pulse or operating on the dorsum.",
  },

  // ───────────────────────────── Leg ─────────────────────────────
  gastrocnemius: {
    summary:
      "The most superficial calf muscle, with two heads that form the bulge of the calf. Together with soleus it makes up the triceps surae, which inserts through the calcaneal (Achilles) tendon.",
    functions: [
      "Plantarflexes the ankle (points the foot), most strongly when the knee is straight",
      "Lifts the heel during walking, running and jumping",
      "Helps flex the knee",
    ],
    facts: [
      { label: "Part of", value: "Triceps surae (with soleus)" },
      { label: "Crosses", value: "Knee and ankle (two-joint muscle)" },
      { label: "Fibre type", value: "Mixed, with relatively more fast-twitch fibres than soleus" },
    ],
    origin: "Lateral head: lateral surface of the lateral femoral condyle; medial head: popliteal surface of the femur just above the medial condyle",
    insertion: "Posterior surface of the calcaneus via the calcaneal tendon",
    action: "Plantarflexes the ankle when the knee is extended, raises the heel during walking, and flexes the knee",
    innervation: "Tibial nerve (S1–S2)",
    bloodSupply: "Sural arteries (branches of the popliteal artery)",
    connections: [
      { concept: "femur", relation: "attaches-to", note: "origin: above the femoral condyles" },
      { concept: "calcaneal-tendon", relation: "attaches-to", note: "insertion via the Achilles tendon" },
      { concept: "calcaneus", relation: "attaches-to", note: "insertion: posterior surface" },
      { concept: "tibial-nerve", relation: "innervated-by" },
      { concept: "popliteal-artery", relation: "supplied-by", note: "via sural arteries" },
      { concept: "talus", relation: "acts-on", note: "ankle (talocrural) joint: plantarflexion" },
      { concept: "tibia", relation: "acts-on", note: "knee flexion" },
      { concept: "soleus", relation: "adjacent-to", note: "lies deep to it; together form the triceps surae" },
      { concept: "plantaris", relation: "adjacent-to", note: "runs between gastrocnemius and soleus" },
      { concept: "small-saphenous-vein", relation: "adjacent-to", note: "runs superficially between its two heads" },
    ],
    clinical:
      "A sudden tear of the medial head during push-off ('tennis leg') causes sharp mid-calf pain. Tapping the calcaneal tendon tests the ankle-jerk reflex (S1).",
  },

  soleus: {
    summary:
      "A broad, flat calf muscle lying deep to gastrocnemius. Rich in slow-twitch fibres, it is a key postural muscle that keeps the body from falling forward over the ankle while standing.",
    functions: [
      "Plantarflexes the ankle whether the knee is bent or straight",
      "Steadies the leg on the foot during standing (postural muscle)",
      "Pumps venous blood out of the calf when it contracts (calf muscle pump)",
    ],
    facts: [
      { label: "Fibre type", value: "Predominantly slow-twitch (type I), fatigue-resistant" },
      { label: "Part of", value: "Triceps surae (with gastrocnemius)" },
    ],
    origin: "Posterior head and upper quarter of the fibula, soleal line and medial border of the tibia, and a tendinous arch between the two bones",
    insertion: "Posterior surface of the calcaneus via the calcaneal tendon",
    action: "Plantarflexes the ankle independent of knee position; steadies the leg on the foot",
    innervation: "Tibial nerve (S1–S2)",
    bloodSupply: "Popliteal, posterior tibial and fibular arteries",
    connections: [
      { concept: "fibula", relation: "attaches-to", note: "origin: head and upper shaft" },
      { concept: "tibia", relation: "attaches-to", note: "origin: soleal line" },
      { concept: "calcaneal-tendon", relation: "attaches-to", note: "insertion via the Achilles tendon" },
      { concept: "calcaneus", relation: "attaches-to", note: "insertion: posterior surface" },
      { concept: "tibial-nerve", relation: "innervated-by", note: "also passes deep to its tendinous arch" },
      { concept: "posterior-tibial-artery", relation: "supplied-by", note: "passes deep to the soleal arch" },
      { concept: "popliteal-artery", relation: "supplied-by" },
      { concept: "talus", relation: "acts-on", note: "ankle joint: plantarflexion" },
      { concept: "posterior-tibial-vein", relation: "drained-by", note: "soleal venous sinuses" },
      { concept: "gastrocnemius", relation: "adjacent-to", note: "lies superficial to it" },
    ],
    clinical:
      "Its intramuscular venous sinuses are a common starting point for deep vein thrombosis, and its contractions drive the calf muscle pump that returns blood from the leg.",
  },

  plantaris: {
    summary:
      "A small muscle with a short belly and a very long, thin tendon running between gastrocnemius and soleus. It contributes little to movement and is absent in some people.",
    functions: [
      "Weakly assists gastrocnemius in plantarflexing the ankle",
      "Weakly assists knee flexion",
    ],
    facts: [
      { label: "Absent in", value: "Roughly 5–10% of people" },
      { label: "Tendon", value: "Long and slender, running between gastrocnemius and soleus" },
    ],
    origin: "Lower end of the lateral supracondylar line of the femur and the oblique popliteal ligament",
    insertion: "Posterior surface of the calcaneus, alongside or blending with the calcaneal tendon",
    action: "Weakly assists gastrocnemius in plantarflexing the ankle and flexing the knee",
    innervation: "Tibial nerve (S1–S2)",
    bloodSupply: "Sural branches of the popliteal artery",
    connections: [
      { concept: "femur", relation: "attaches-to", note: "origin: lateral supracondylar line" },
      { concept: "calcaneus", relation: "attaches-to", note: "insertion" },
      { concept: "tibial-nerve", relation: "innervated-by" },
      { concept: "popliteal-artery", relation: "supplied-by", note: "sural branches" },
      { concept: "calcaneal-tendon", relation: "adjacent-to", note: "runs along its medial side" },
      { concept: "gastrocnemius", relation: "adjacent-to" },
      { concept: "soleus", relation: "adjacent-to" },
    ],
    clinical:
      "Its long, expendable tendon is commonly harvested for tendon grafts; rupture of the muscle can cause sudden calf pain that mimics other calf injuries.",
  },

  "calcaneal-tendon": {
    summary:
      "The common tendon of gastrocnemius and soleus (the triceps surae), about 15 cm long, which inserts on the back of the heel bone. It is the thickest and strongest tendon in the body.",
    latin: "Tendo calcaneus (Achilles tendon)",
    functions: [
      "Transmits the pull of the calf muscles to the calcaneus to plantarflex the ankle",
      "Stores and releases elastic energy during walking, running and jumping",
      "Lifts the heel for push-off in gait",
    ],
    facts: [
      { label: "Length", value: "About 15 cm" },
      { label: "Strength", value: "Thickest and strongest tendon in the body" },
      { label: "Reflex", value: "Ankle jerk tests the S1 (and S2) segments" },
    ],
    connections: [
      { concept: "calcaneus", relation: "attaches-to", note: "insertion: middle of the posterior surface" },
      { concept: "gastrocnemius", relation: "attaches-to", note: "formed by its tendon" },
      { concept: "soleus", relation: "attaches-to", note: "formed by its tendon" },
      { concept: "plantaris", relation: "adjacent-to", note: "its tendon runs medially and may merge" },
      { concept: "talus", relation: "acts-on", note: "ankle joint: plantarflexion" },
      { concept: "small-saphenous-vein", relation: "adjacent-to", note: "runs lateral to the tendon with the sural nerve" },
      { concept: "posterior-tibial-artery", relation: "adjacent-to", note: "runs medial to the tendon behind the medial malleolus" },
    ],
    clinical:
      "Rupture typically occurs about 2–6 cm above the insertion, where blood supply is poorest; squeezing the calf then fails to plantarflex the foot (positive Thompson test).",
  },

  popliteus: {
    summary:
      "A small, flat muscle forming the floor of the lower popliteal fossa behind the knee. It 'unlocks' the fully straightened knee so that flexion can begin.",
    functions: [
      "Unlocks the extended knee by rotating the femur laterally on the fixed tibia",
      "Weakly flexes the knee",
      "Pulls the lateral meniscus backward during flexion",
    ],
    facts: [{ label: "Key role", value: "'Unlocks' the knee from its locked, fully extended position" }],
    origin: "Lateral surface of the lateral femoral condyle and the lateral meniscus (via an intracapsular tendon)",
    insertion: "Posterior surface of the tibia above the soleal line",
    action: "Weakly flexes the knee and unlocks it by laterally rotating the femur on the tibia (or medially rotating the tibia when the foot is free)",
    innervation: "Tibial nerve (L4–S1)",
    bloodSupply: "Inferior medial and lateral genicular arteries (branches of the popliteal artery)",
    connections: [
      { concept: "femur", relation: "attaches-to", note: "origin: lateral femoral condyle" },
      { concept: "menisci-of-knee", relation: "attaches-to", note: "origin: lateral meniscus" },
      { concept: "tibia", relation: "attaches-to", note: "insertion: posterior surface above soleal line" },
      { concept: "tibial-nerve", relation: "innervated-by" },
      { concept: "genicular-arteries", relation: "supplied-by", note: "inferior genicular arteries" },
      { concept: "popliteal-artery", relation: "adjacent-to", note: "lies on the muscle in the popliteal fossa" },
      { concept: "soleus", relation: "adjacent-to", note: "lies just below it" },
    ],
    clinical:
      "Because its tendon attaches to the lateral meniscus, the lateral meniscus is more mobile and injured less often than the medial meniscus.",
  },

  "tibialis-anterior": {
    summary:
      "The largest and most medial muscle of the anterior (extensor) compartment of the leg, lying just lateral to the shin. It is the main dorsiflexor and a strong invertor of the foot.",
    functions: [
      "Dorsiflexes the ankle (lifts the foot), e.g. to clear the toes during the swing phase of walking",
      "Inverts the foot",
      "Supports the medial longitudinal arch",
    ],
    facts: [
      { label: "Role", value: "Strongest dorsiflexor of the ankle" },
      { label: "Stirrup", value: "Forms a 'stirrup' under the foot with fibularis longus" },
    ],
    origin: "Lateral condyle and upper half of the lateral surface of the tibia, and the interosseous membrane",
    insertion: "Medial and inferior surfaces of the medial cuneiform and base of the 1st metatarsal",
    action: "Dorsiflexes the ankle and inverts the foot",
    innervation: "Deep fibular (peroneal) nerve (L4–L5)",
    bloodSupply: "Anterior tibial artery",
    connections: [
      { concept: "tibia", relation: "attaches-to", note: "origin: lateral condyle and shaft" },
      { concept: "interosseous-membrane-of-leg", relation: "attaches-to", note: "origin" },
      { concept: "medial-cuneiform-bone", relation: "attaches-to", note: "insertion" },
      { concept: "first-metatarsal", relation: "attaches-to", note: "insertion: base" },
      { concept: "common-fibular-nerve", relation: "innervated-by", note: "via deep fibular nerve" },
      { concept: "anterior-tibial-artery", relation: "supplied-by" },
      { concept: "talus", relation: "acts-on", note: "ankle joint: dorsiflexion" },
      { concept: "extensor-hallucis-longus", relation: "adjacent-to", note: "lateral neighbour" },
      { concept: "fibularis-longus", relation: "adjacent-to", note: "antagonist in inversion/eversion" },
    ],
    clinical:
      "Injury to the common fibular nerve at the neck of the fibula paralyses tibialis anterior, causing foot drop and a high-stepping gait; overuse causes anterior shin pain ('shin splints').",
  },

  "extensor-digitorum-longus": {
    summary:
      "A feather-shaped (pennate) muscle of the anterior compartment of the leg. Its tendon splits into four on the dorsum of the foot to extend the lateral four toes.",
    functions: [
      "Extends (lifts) the lateral four toes",
      "Dorsiflexes the ankle",
    ],
    facts: [{ label: "Muscle type", value: "Pennate" }],
    origin: "Lateral condyle of the tibia, upper three-quarters of the anterior surface of the fibula and the interosseous membrane",
    insertion: "Middle and distal phalanges of the lateral four toes via the dorsal extensor expansions",
    action: "Extends the lateral four toes and dorsiflexes the ankle",
    innervation: "Deep fibular nerve (L5–S1)",
    bloodSupply: "Anterior tibial artery",
    connections: [
      { concept: "tibia", relation: "attaches-to", note: "origin: lateral condyle" },
      { concept: "fibula", relation: "attaches-to", note: "origin: anterior surface" },
      { concept: "interosseous-membrane-of-leg", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-second-toe", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "phalanges-of-third-toe", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "phalanges-of-fourth-toe", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "phalanges-of-little-toe", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "common-fibular-nerve", relation: "innervated-by", note: "via deep fibular nerve" },
      { concept: "anterior-tibial-artery", relation: "supplied-by" },
      { concept: "fibularis-tertius", relation: "adjacent-to", note: "often regarded as its lower part" },
    ],
    clinical:
      "Like the other anterior compartment muscles it is affected in anterior compartment syndrome, where swelling within the tight fascial compartment compresses the anterior tibial vessels and deep fibular nerve.",
  },

  "extensor-hallucis-longus": {
    summary:
      "A thin muscle of the anterior compartment of the leg, lying between tibialis anterior and extensor digitorum longus. Its tendon is easily seen on the top of the foot when the big toe is lifted.",
    functions: ["Extends (lifts) the big toe", "Dorsiflexes the ankle", "Weakly inverts the foot"],
    origin: "Middle part of the anterior surface of the fibula and the interosseous membrane",
    insertion: "Dorsal aspect of the base of the distal phalanx of the big toe",
    action: "Extends the big toe and dorsiflexes the ankle",
    innervation: "Deep fibular nerve (L5–S1)",
    bloodSupply: "Anterior tibial artery",
    connections: [
      { concept: "fibula", relation: "attaches-to", note: "origin: middle of anterior surface" },
      { concept: "interosseous-membrane-of-leg", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-big-toe", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "common-fibular-nerve", relation: "innervated-by", note: "via deep fibular nerve" },
      { concept: "anterior-tibial-artery", relation: "supplied-by" },
      { concept: "talus", relation: "acts-on", note: "ankle joint: dorsiflexion" },
      { concept: "dorsalis-pedis-artery", relation: "adjacent-to", note: "pulse felt just lateral to its tendon" },
      { concept: "tibialis-anterior", relation: "adjacent-to" },
      { concept: "extensor-digitorum-longus", relation: "adjacent-to" },
    ],
    clinical:
      "Weak big-toe extension is a sensitive sign of L5 nerve-root compression; the dorsalis pedis pulse is felt just lateral to its tendon.",
  },

  "fibularis-tertius": {
    summary:
      "A small muscle at the lower lateral part of the anterior compartment, usually regarded as a detached part of extensor digitorum longus. It is absent in some people.",
    latin: "Musculus fibularis (peroneus) tertius",
    functions: ["Dorsiflexes the ankle", "Assists eversion of the foot"],
    facts: [{ label: "Variability", value: "Absent in a minority of people (reported rates vary widely)" }],
    origin: "Lower third of the anterior surface of the fibula and the interosseous membrane",
    insertion: "Dorsum of the base of the 5th metatarsal",
    action: "Dorsiflexes the ankle and aids eversion of the foot",
    innervation: "Deep fibular nerve (L5–S1)",
    bloodSupply: "Anterior tibial artery",
    connections: [
      { concept: "fibula", relation: "attaches-to", note: "origin: lower anterior surface" },
      { concept: "interosseous-membrane-of-leg", relation: "attaches-to", note: "origin" },
      { concept: "fifth-metatarsal", relation: "attaches-to", note: "insertion: dorsum of base" },
      { concept: "common-fibular-nerve", relation: "innervated-by", note: "via deep fibular nerve" },
      { concept: "anterior-tibial-artery", relation: "supplied-by" },
      { concept: "extensor-digitorum-longus", relation: "adjacent-to", note: "partly fused with it" },
      { concept: "fibularis-brevis", relation: "adjacent-to", note: "both reach the 5th metatarsal" },
    ],
  },

  "fibularis-longus": {
    summary:
      "The more superficial muscle of the lateral compartment of the leg. Its long tendon passes behind the lateral malleolus and then crosses the sole in a groove on the cuboid to reach the medial side of the foot.",
    latin: "Musculus fibularis (peroneus) longus",
    functions: [
      "Everts the foot (turns the sole outward)",
      "Weakly plantarflexes the ankle",
      "Supports the transverse and lateral longitudinal arches",
    ],
    facts: [{ label: "Stirrup", value: "With tibialis anterior forms a supporting 'stirrup' under the foot" }],
    origin: "Head and upper two-thirds of the lateral surface of the fibula",
    insertion: "Base of the 1st metatarsal and the medial cuneiform (plantar side)",
    action: "Everts the foot and weakly plantarflexes the ankle",
    innervation: "Superficial fibular nerve (L5–S2)",
    bloodSupply: "Anterior tibial and fibular arteries",
    connections: [
      { concept: "fibula", relation: "attaches-to", note: "origin: head and upper lateral shaft" },
      { concept: "first-metatarsal", relation: "attaches-to", note: "insertion: base" },
      { concept: "medial-cuneiform-bone", relation: "attaches-to", note: "insertion" },
      { concept: "common-fibular-nerve", relation: "innervated-by", note: "via superficial fibular nerve; the nerve winds around the fibular neck deep to this muscle" },
      { concept: "anterior-tibial-artery", relation: "supplied-by" },
      { concept: "cuboid-bone", relation: "adjacent-to", note: "tendon runs in the groove on the cuboid" },
      { concept: "calcaneus", relation: "acts-on", note: "subtalar joint: eversion" },
      { concept: "fibularis-brevis", relation: "adjacent-to", note: "lies over it in the lateral compartment" },
      { concept: "tibialis-anterior", relation: "adjacent-to", note: "antagonist in inversion/eversion" },
    ],
    clinical:
      "The common fibular nerve winds around the fibular neck deep to this muscle, where it is vulnerable to fractures and tight casts; the fibular tendons can also sublux from behind the lateral malleolus after ankle injuries.",
  },

  "fibularis-brevis": {
    summary:
      "The deeper muscle of the lateral compartment of the leg. Its tendon runs behind the lateral malleolus to the prominent tuberosity at the base of the 5th metatarsal.",
    latin: "Musculus fibularis (peroneus) brevis",
    functions: ["Everts the foot", "Weakly plantarflexes the ankle", "Helps resist ankle inversion sprains"],
    origin: "Lower two-thirds of the lateral surface of the fibula",
    insertion: "Dorsal surface of the tuberosity on the lateral side of the base of the 5th metatarsal",
    action: "Everts the foot and weakly plantarflexes the ankle",
    innervation: "Superficial fibular nerve (L5–S2)",
    bloodSupply: "Fibular and anterior tibial arteries",
    connections: [
      { concept: "fibula", relation: "attaches-to", note: "origin: lower lateral surface" },
      { concept: "fifth-metatarsal", relation: "attaches-to", note: "insertion: tuberosity of the base" },
      { concept: "common-fibular-nerve", relation: "innervated-by", note: "via superficial fibular nerve" },
      { concept: "anterior-tibial-artery", relation: "supplied-by" },
      { concept: "fibular-vein", relation: "drained-by" },
      { concept: "calcaneus", relation: "acts-on", note: "subtalar joint: eversion" },
      { concept: "fibularis-longus", relation: "adjacent-to", note: "lies deep to it" },
    ],
    clinical:
      "A forceful inversion injury can make its tendon pull off a fragment of the 5th metatarsal tuberosity (avulsion fracture).",
  },

  "tibialis-posterior": {
    summary:
      "The deepest muscle of the posterior compartment of the leg. Its tendon passes behind the medial malleolus and fans out to many bones of the sole, making it a key dynamic support of the medial arch.",
    functions: [
      "Inverts the foot",
      "Plantarflexes the ankle",
      "Supports the medial longitudinal arch during standing and walking",
    ],
    facts: [
      { label: "Behind the medial malleolus", value: "Most anterior structure ('Tom, Dick, And Very Nervous Harry')" },
      { label: "Depth", value: "Deepest muscle of the posterior compartment" },
    ],
    origin: "Interosseous membrane and adjacent posterior surfaces of the tibia (below the soleal line) and fibula",
    insertion: "Mainly the tuberosity of the navicular; also the cuneiforms, cuboid and bases of the 2nd–4th metatarsals",
    action: "Plantarflexes the ankle and inverts the foot",
    innervation: "Tibial nerve (L4–L5)",
    bloodSupply: "Fibular and posterior tibial arteries",
    connections: [
      { concept: "interosseous-membrane-of-leg", relation: "attaches-to", note: "origin" },
      { concept: "tibia", relation: "attaches-to", note: "origin: posterior surface" },
      { concept: "fibula", relation: "attaches-to", note: "origin: posterior surface" },
      { concept: "navicular-bone", relation: "attaches-to", note: "main insertion: navicular tuberosity" },
      { concept: "medial-cuneiform-bone", relation: "attaches-to", note: "insertion slips" },
      { concept: "cuboid-bone", relation: "attaches-to", note: "insertion slips" },
      { concept: "tibial-nerve", relation: "innervated-by" },
      { concept: "posterior-tibial-artery", relation: "supplied-by", note: "including its fibular branch" },
      { concept: "talus", relation: "acts-on", note: "ankle and subtalar joints" },
      { concept: "flexor-digitorum-longus", relation: "adjacent-to", note: "FDL crosses superficial to it in the lower leg" },
    ],
    clinical:
      "Degeneration or rupture of its tendon (posterior tibial tendon dysfunction) is the commonest cause of adult-acquired flatfoot.",
  },

  "flexor-digitorum-longus": {
    summary:
      "A muscle of the deep posterior compartment of the leg that flexes the lateral four toes. Its tendon passes behind the medial malleolus and divides into four in the sole.",
    functions: [
      "Flexes the lateral four toes (curls them)",
      "Assists plantarflexion of the ankle",
      "Helps support the longitudinal arches and grip the ground",
    ],
    origin: "Medial part of the posterior surface of the tibia below the soleal line (and by an aponeurosis from the fibula)",
    insertion: "Bases of the distal phalanges of the lateral four toes",
    action: "Flexes the lateral four toes and plantarflexes the ankle",
    innervation: "Tibial nerve (S2–S3; some texts L5–S2)",
    bloodSupply: "Posterior tibial artery",
    connections: [
      { concept: "tibia", relation: "attaches-to", note: "origin: posterior surface" },
      { concept: "phalanges-of-second-toe", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "phalanges-of-third-toe", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "phalanges-of-fourth-toe", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "phalanges-of-little-toe", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "tibial-nerve", relation: "innervated-by" },
      { concept: "posterior-tibial-artery", relation: "supplied-by" },
      { concept: "flexor-accessorius", relation: "adjacent-to", note: "quadratus plantae inserts into its tendon" },
      { concept: "flexor-hallucis-longus", relation: "adjacent-to", note: "their tendons cross in the sole" },
      { concept: "tibialis-posterior", relation: "adjacent-to", note: "crosses superficial to it in the leg" },
    ],
    clinical:
      "Transfer of the flexor digitorum longus tendon is a standard operation to replace a failed tibialis posterior tendon in adult flatfoot.",
  },

  "flexor-hallucis-longus": {
    summary:
      "A powerful muscle of the deep posterior compartment of the leg that flexes the big toe. It provides much of the final push-off from the big toe when walking and running.",
    functions: [
      "Flexes the big toe at all its joints",
      "Provides push-off from the big toe in walking and running",
      "Assists plantarflexion and supports the medial longitudinal arch",
    ],
    facts: [{ label: "Tendon path", value: "Groove on the posterior talus, then beneath the sustentaculum tali of the calcaneus" }],
    origin: "Lower two-thirds of the posterior surface of the fibula and the lower interosseous membrane",
    insertion: "Base of the distal phalanx of the big toe",
    action: "Flexes the big toe and weakly plantarflexes the ankle",
    innervation: "Tibial nerve (S2–S3; some texts L5–S2)",
    bloodSupply: "Fibular artery (branch of the posterior tibial artery)",
    connections: [
      { concept: "fibula", relation: "attaches-to", note: "origin: lower posterior surface" },
      { concept: "interosseous-membrane-of-leg", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-big-toe", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "tibial-nerve", relation: "innervated-by" },
      { concept: "posterior-tibial-artery", relation: "supplied-by", note: "via its fibular branch" },
      { concept: "fibular-vein", relation: "drained-by" },
      { concept: "talus", relation: "adjacent-to", note: "tendon grooves the posterior talus" },
      { concept: "calcaneus", relation: "adjacent-to", note: "tendon runs under the sustentaculum tali" },
      { concept: "sesamoid-bones-of-foot", relation: "adjacent-to", note: "tendon passes between the sesamoids" },
      { concept: "flexor-digitorum-longus", relation: "adjacent-to", note: "tendons cross in the sole" },
    ],
    clinical:
      "Tenosynovitis of its tendon behind the ankle is common in ballet dancers ('dancer's tendinitis') because of repeated rising onto the toes.",
  },

  // ─────────────────────────── Thigh: hamstrings ───────────────────────────
  "biceps-femoris": {
    summary:
      "The lateral hamstring muscle, with a long head from the ischial tuberosity and a short head from the femur. Its tendon forms the lateral border of the popliteal fossa and can be felt behind the outer knee.",
    functions: [
      "Flexes the knee",
      "Extends the hip (long head only)",
      "Laterally rotates the leg when the knee is bent",
    ],
    facts: [
      { label: "Heads", value: "Long head (crosses hip and knee) and short head (knee only)" },
      { label: "Dual innervation", value: "Long head: tibial division; short head: common fibular division of the sciatic nerve" },
    ],
    origin: "Long head: ischial tuberosity (common tendon with semitendinosus); short head: lateral lip of the linea aspera and lateral supracondylar line of the femur",
    insertion: "Lateral side of the head of the fibula (tendon is split by the fibular collateral ligament)",
    action: "Flexes the knee and laterally rotates the tibia when the knee is flexed; long head extends the hip",
    innervation: "Long head: tibial division of the sciatic nerve (L5–S2); short head: common fibular division of the sciatic nerve (L5–S2)",
    bloodSupply: "Perforating branches of the deep artery of the thigh; inferior gluteal artery; muscular branches of the popliteal artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin (long head): ischial tuberosity" },
      { concept: "femur", relation: "attaches-to", note: "origin (short head): linea aspera" },
      { concept: "fibula", relation: "attaches-to", note: "insertion: head of fibula" },
      { concept: "sciatic-nerve", relation: "innervated-by", note: "tibial division (long head) and common fibular division (short head)" },
      { concept: "perforating-arteries", relation: "supplied-by", note: "from the deep artery of the thigh" },
      { concept: "tibia", relation: "acts-on", note: "knee flexion and lateral rotation" },
      { concept: "common-fibular-nerve", relation: "adjacent-to", note: "follows the medial border of its tendon behind the knee" },
      { concept: "semitendinosus", relation: "adjacent-to", note: "shares a common origin tendon" },
      { concept: "iliotibial-tract", relation: "adjacent-to" },
    ],
    clinical:
      "The long head of biceps femoris is the hamstring most often strained in sprinters; the common fibular nerve runs along its tendon behind the knee and can be injured there.",
  },

  semitendinosus: {
    summary:
      "A medial hamstring muscle, named for its long cord-like tendon that begins around mid-thigh. It lies on top of semimembranosus and ends in the pes anserinus on the upper medial tibia.",
    functions: [
      "Extends the hip",
      "Flexes the knee",
      "Medially rotates the leg when the knee is bent",
    ],
    facts: [{ label: "Pes anserinus", value: "Inserts with sartorius and gracilis ('goose's foot')" }],
    origin: "Ischial tuberosity (common tendon with the long head of biceps femoris)",
    insertion: "Upper part of the medial surface of the tibia (pes anserinus)",
    action: "Extends the hip, flexes the knee and medially rotates the tibia when the knee is flexed",
    innervation: "Tibial division of the sciatic nerve (L5–S2)",
    bloodSupply: "Perforating branches of the deep artery of the thigh; inferior gluteal artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: ischial tuberosity" },
      { concept: "tibia", relation: "attaches-to", note: "insertion: pes anserinus" },
      { concept: "sciatic-nerve", relation: "innervated-by", note: "tibial division" },
      { concept: "perforating-arteries", relation: "supplied-by" },
      { concept: "femur", relation: "acts-on", note: "hip extension" },
      { concept: "semimembranosus", relation: "adjacent-to", note: "lies on it" },
      { concept: "biceps-femoris", relation: "adjacent-to", note: "common origin" },
      { concept: "gracilis", relation: "adjacent-to", note: "pes anserinus" },
      { concept: "sartorius", relation: "adjacent-to", note: "pes anserinus" },
    ],
    clinical:
      "Its tendon, often with gracilis, is commonly harvested as a graft for anterior cruciate ligament reconstruction.",
  },

  semimembranosus: {
    summary:
      "The deepest and most medial hamstring, named for its flat, membrane-like upper tendon. It lies beneath semitendinosus and forms the upper medial border of the popliteal fossa.",
    functions: [
      "Extends the hip",
      "Flexes the knee",
      "Medially rotates the leg when the knee is bent",
    ],
    origin: "Superolateral impression on the ischial tuberosity",
    insertion: "Posterior part of the medial condyle of the tibia; a reflected expansion forms the oblique popliteal ligament",
    action: "Extends the hip, flexes the knee and medially rotates the tibia when the knee is flexed",
    innervation: "Tibial division of the sciatic nerve (L5–S2)",
    bloodSupply: "Perforating branches of the deep artery of the thigh; branches of the popliteal artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: ischial tuberosity" },
      { concept: "tibia", relation: "attaches-to", note: "insertion: posterior medial condyle" },
      { concept: "sciatic-nerve", relation: "innervated-by", note: "tibial division" },
      { concept: "perforating-arteries", relation: "supplied-by" },
      { concept: "femur", relation: "acts-on", note: "hip extension" },
      { concept: "menisci-of-knee", relation: "adjacent-to", note: "some fibres attach to the medial meniscus" },
      { concept: "popliteal-artery", relation: "adjacent-to", note: "forms the superomedial border of the popliteal fossa" },
      { concept: "semitendinosus", relation: "adjacent-to", note: "lies beneath it" },
      { concept: "adductor-magnus", relation: "adjacent-to" },
    ],
    clinical:
      "A Baker's (popliteal) cyst usually arises from the bursa between semimembranosus and the medial head of gastrocnemius, causing a swelling behind the knee.",
  },

  // ─────────────────────────── Thigh: adductors ───────────────────────────
  "adductor-longus": {
    summary:
      "The most anterior of the adductor muscles, forming the medial border of the femoral triangle. Its tendon is easily felt in the groin when the thigh is squeezed inward against resistance.",
    functions: ["Adducts the thigh (pulls it toward the midline)", "Assists hip flexion", "Stabilises the pelvis during walking"],
    origin: "Body of the pubis just below the pubic crest",
    insertion: "Middle third of the linea aspera of the femur",
    action: "Adducts the thigh and assists flexion",
    innervation: "Obturator nerve, anterior division (L2–L4)",
    bloodSupply: "Deep artery of the thigh and medial circumflex femoral artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: body of pubis" },
      { concept: "femur", relation: "attaches-to", note: "insertion: linea aspera" },
      { concept: "obturator-nerve", relation: "innervated-by", note: "anterior division" },
      { concept: "femoral-artery", relation: "supplied-by", note: "via the deep artery of the thigh" },
      { concept: "femoral-vein", relation: "adjacent-to", note: "medial border of the femoral triangle" },
      { concept: "sartorius", relation: "adjacent-to", note: "the two muscles bound the femoral triangle" },
      { concept: "adductor-brevis", relation: "adjacent-to", note: "lies behind it" },
      { concept: "pectineus", relation: "adjacent-to" },
      { concept: "gracilis", relation: "adjacent-to" },
    ],
    clinical:
      "It is the adductor most often strained in 'groin pulls', typically near its pubic attachment in footballers and ice-hockey players.",
  },

  "adductor-brevis": {
    summary:
      "A short, triangular adductor lying behind adductor longus and pectineus. The two divisions of the obturator nerve lie in front of and behind it.",
    functions: ["Adducts the thigh", "Weakly flexes the hip"],
    origin: "Body and inferior ramus of the pubis",
    insertion: "Pectineal line and upper part of the linea aspera of the femur",
    action: "Adducts the thigh and weakly flexes it",
    innervation: "Obturator nerve (L2–L4)",
    bloodSupply: "Deep artery of the thigh, medial circumflex femoral and obturator arteries",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: body and inferior ramus of pubis" },
      { concept: "femur", relation: "attaches-to", note: "insertion: pectineal line / upper linea aspera" },
      { concept: "obturator-nerve", relation: "innervated-by", note: "anterior division lies in front, posterior division behind" },
      { concept: "femoral-artery", relation: "supplied-by", note: "via the deep artery of the thigh" },
      { concept: "perforating-arteries", relation: "adjacent-to", note: "the first perforating artery usually pierces it" },
      { concept: "obturator-vein", relation: "drained-by" },
      { concept: "adductor-longus", relation: "adjacent-to", note: "in front" },
      { concept: "adductor-magnus", relation: "adjacent-to", note: "behind" },
    ],
    clinical:
      "The obturator nerve divisions sandwich adductor brevis, a relationship used to locate the nerve for obturator nerve blocks.",
  },

  "adductor-magnus": {
    summary:
      "The largest and deepest adductor, with an 'adductor part' and a 'hamstring part' that differ in nerve supply and action. A gap in its insertion, the adductor hiatus, lets the femoral vessels pass to the back of the knee.",
    functions: [
      "Adducts the thigh",
      "Adductor part helps flex the hip",
      "Hamstring part helps extend the hip",
    ],
    facts: [
      { label: "Size", value: "Largest of the adductor muscles" },
      { label: "Dual innervation", value: "Obturator nerve (adductor part) and tibial division of the sciatic nerve (hamstring part)" },
      { label: "Adductor hiatus", value: "Opening where the femoral vessels become the popliteal vessels" },
    ],
    origin: "Adductor part: inferior pubic ramus and ischial ramus; hamstring part: ischial tuberosity",
    insertion: "Adductor part: gluteal tuberosity, linea aspera and medial supracondylar line; hamstring part: adductor tubercle of the femur",
    action: "Adducts the thigh; adductor part flexes and hamstring part extends the hip",
    innervation: "Adductor part: obturator nerve, posterior division (L2–L4); hamstring part: tibial division of the sciatic nerve (L4)",
    bloodSupply: "Deep artery of the thigh (including perforating branches) and obturator artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: pubic/ischial rami and ischial tuberosity" },
      { concept: "femur", relation: "attaches-to", note: "insertion: linea aspera and adductor tubercle" },
      { concept: "obturator-nerve", relation: "innervated-by", note: "adductor part" },
      { concept: "sciatic-nerve", relation: "innervated-by", note: "hamstring part (tibial division)" },
      { concept: "perforating-arteries", relation: "supplied-by" },
      { concept: "femoral-artery", relation: "adjacent-to", note: "passes through the adductor hiatus" },
      { concept: "popliteal-artery", relation: "adjacent-to", note: "begins at the adductor hiatus" },
      { concept: "adductor-minimus", relation: "adjacent-to", note: "its uppermost part" },
      { concept: "adductor-brevis", relation: "adjacent-to" },
      { concept: "semimembranosus", relation: "adjacent-to" },
    ],
    clinical:
      "The region of the adductor canal and hiatus is a common site of atherosclerotic narrowing of the femoral artery, causing calf pain on walking (claudication).",
  },

  "adductor-minimus": {
    summary:
      "The uppermost, nearly horizontal part of adductor magnus, often described as a separate muscle. It lies just below quadratus femoris.",
    functions: ["Adducts the thigh", "May assist lateral rotation of the hip"],
    origin: "Inferior pubic ramus (the most anterior part of the adductor magnus origin)",
    insertion: "Upper end of the linea aspera, medial to the gluteal tuberosity of the femur",
    action: "Adducts the thigh; may assist lateral rotation",
    innervation: "Obturator nerve, posterior division (L2–L4)",
    bloodSupply: "Medial circumflex femoral artery and first perforating artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: inferior pubic ramus" },
      { concept: "femur", relation: "attaches-to", note: "insertion: upper linea aspera" },
      { concept: "obturator-nerve", relation: "innervated-by", note: "posterior division" },
      { concept: "perforating-arteries", relation: "supplied-by", note: "first perforating artery" },
      { concept: "medial-circumflex-femoral-vein", relation: "drained-by" },
      { concept: "adductor-magnus", relation: "adjacent-to", note: "usually regarded as its upper part" },
      { concept: "quadratus-femoris", relation: "adjacent-to", note: "lies just above it" },
      { concept: "adductor-brevis", relation: "adjacent-to" },
    ],
  },

  gracilis: {
    summary:
      "A long, strap-like muscle on the inner thigh — the most superficial adductor and the only one that crosses the knee. It ends in the pes anserinus with sartorius and semitendinosus.",
    functions: ["Adducts the thigh", "Flexes the knee", "Medially rotates the leg when the knee is bent"],
    facts: [
      { label: "Unique feature", value: "Only adductor muscle that crosses the knee" },
      { label: "Pes anserinus", value: "Inserts between sartorius (in front) and semitendinosus (behind)" },
    ],
    origin: "Body and inferior ramus of the pubis",
    insertion: "Upper part of the medial surface of the tibia (pes anserinus)",
    action: "Adducts the thigh, flexes the knee and helps medially rotate the leg",
    innervation: "Obturator nerve, anterior division (L2–L3)",
    bloodSupply: "Deep artery of the thigh and medial circumflex femoral artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: body and inferior ramus of pubis" },
      { concept: "tibia", relation: "attaches-to", note: "insertion: pes anserinus" },
      { concept: "obturator-nerve", relation: "innervated-by", note: "anterior division" },
      { concept: "femoral-artery", relation: "supplied-by", note: "via the deep artery of the thigh" },
      { concept: "femur", relation: "acts-on", note: "hip adduction" },
      { concept: "sartorius", relation: "adjacent-to", note: "pes anserinus" },
      { concept: "semitendinosus", relation: "adjacent-to", note: "pes anserinus" },
      { concept: "adductor-longus", relation: "adjacent-to" },
    ],
    clinical:
      "Because the other adductors compensate for its loss, gracilis is often transplanted as a functioning muscle flap (e.g. for facial reanimation) and its tendon is used for ligament grafts.",
  },

  pectineus: {
    summary:
      "A flat, quadrangular muscle in the floor of the femoral triangle, lying between iliopsoas and adductor longus. It sits at the junction of the anterior (femoral) and medial (obturator) compartments of the thigh.",
    functions: ["Adducts the thigh", "Flexes the hip", "Assists medial rotation of the thigh"],
    origin: "Superior ramus of the pubis (pecten pubis)",
    insertion: "Pectineal line of the femur, just below the lesser trochanter",
    action: "Adducts and flexes the thigh; assists medial rotation",
    innervation: "Femoral nerve (L2–L3); sometimes also a branch of the obturator nerve",
    bloodSupply: "Medial circumflex femoral and obturator arteries",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: pecten pubis" },
      { concept: "femur", relation: "attaches-to", note: "insertion: pectineal line" },
      { concept: "femoral-nerve", relation: "innervated-by" },
      { concept: "obturator-nerve", relation: "innervated-by", note: "inconstant contribution" },
      { concept: "femoral-artery", relation: "supplied-by", note: "via the medial circumflex femoral artery" },
      { concept: "femoral-vein", relation: "adjacent-to", note: "lies behind the femoral vessels in the femoral triangle" },
      { concept: "psoas-major", relation: "adjacent-to", note: "lateral neighbour in the floor of the femoral triangle" },
      { concept: "adductor-longus", relation: "adjacent-to", note: "medial neighbour" },
      { concept: "obturator-externus", relation: "adjacent-to", note: "lies deep to it" },
    ],
  },

  "obturator-externus": {
    summary:
      "A flat, fan-shaped muscle covering the outer surface of the obturator membrane, deep in the upper medial thigh. Its tendon passes beneath the neck of the femur to reach the trochanteric fossa.",
    functions: ["Laterally rotates the thigh", "Steadies the head of the femur in the acetabulum"],
    origin: "Margins of the obturator foramen and external surface of the obturator membrane",
    insertion: "Trochanteric fossa of the femur",
    action: "Laterally rotates the thigh; steadies the femoral head in the acetabulum",
    innervation: "Obturator nerve (L3–L4)",
    bloodSupply: "Obturator and medial circumflex femoral arteries",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: around the obturator foramen" },
      { concept: "femur", relation: "attaches-to", note: "insertion: trochanteric fossa" },
      { concept: "obturator-nerve", relation: "innervated-by" },
      { concept: "obturator-vein", relation: "drained-by" },
      { concept: "medial-circumflex-femoral-vein", relation: "drained-by" },
      { concept: "pectineus", relation: "adjacent-to", note: "covers it anteriorly" },
      { concept: "quadratus-femoris", relation: "adjacent-to", note: "covers its tendon posteriorly" },
      { concept: "adductor-brevis", relation: "adjacent-to" },
    ],
  },

  // ─────────────────────────── Hip flexors & quadriceps ───────────────────────────
  iliacus: {
    summary:
      "A large, fan-shaped muscle filling the iliac fossa of the pelvis. It joins psoas major to form iliopsoas, the most powerful flexor of the hip.",
    functions: [
      "Flexes the hip (lifts the thigh)",
      "Stabilises the hip joint",
      "Tilts the pelvis forward when the thigh is fixed",
    ],
    facts: [{ label: "Forms", value: "Iliopsoas (with psoas major), the chief flexor of the hip" }],
    origin: "Upper two-thirds of the iliac fossa, ala of the sacrum and anterior sacroiliac ligaments",
    insertion: "Lesser trochanter of the femur (via the psoas tendon) and the shaft just below it",
    action: "Flexes the thigh at the hip and stabilises the hip joint (with psoas major)",
    innervation: "Femoral nerve (L2–L3)",
    bloodSupply: "Iliac branches of the iliolumbar artery (from the internal iliac artery); deep circumflex iliac artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: iliac fossa" },
      { concept: "sacrum", relation: "attaches-to", note: "origin: ala of sacrum" },
      { concept: "femur", relation: "attaches-to", note: "insertion: lesser trochanter" },
      { concept: "femoral-nerve", relation: "innervated-by", note: "the nerve runs in the groove between iliacus and psoas" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via the iliolumbar artery" },
      { concept: "external-iliac-artery", relation: "supplied-by", note: "via the deep circumflex iliac artery" },
      { concept: "psoas-major", relation: "adjacent-to", note: "together form iliopsoas" },
    ],
    clinical:
      "Bleeding into iliacus (e.g. in haemophilia or on anticoagulants) can compress the femoral nerve, causing thigh weakness and numbness.",
  },

  "psoas-major": {
    summary:
      "A long, thick muscle lying beside the lumbar vertebrae that crosses the pelvic brim to reach the femur. With iliacus it forms iliopsoas, and the lumbar plexus forms within its substance.",
    functions: [
      "Flexes the hip (with iliacus)",
      "Flexes the trunk toward the thigh, e.g. when sitting up from lying",
      "Flexes the lumbar spine to the side and helps stabilise it",
    ],
    facts: [{ label: "Lumbar plexus", value: "Forms within the substance of the muscle" }],
    origin: "Sides of the bodies of T12–L5 and the intervening discs; transverse processes of L1–L5",
    insertion: "Lesser trochanter of the femur",
    action: "Flexes the hip; acting from below, flexes the trunk and laterally flexes the lumbar spine",
    innervation: "Anterior rami of lumbar nerves (L1–L3)",
    bloodSupply: "Lumbar arteries (with contributions from the iliolumbar artery)",
    connections: [
      { concept: "twelfth-thoracic-vertebra", relation: "attaches-to", note: "origin: vertebral body" },
      { concept: "first-lumbar-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "third-lumbar-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "fifth-lumbar-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "femur", relation: "attaches-to", note: "insertion: lesser trochanter" },
      { concept: "lumbar-plexus", relation: "innervated-by", note: "the plexus forms within the muscle" },
      { concept: "lumbar-arteries", relation: "supplied-by" },
      { concept: "iliacus", relation: "adjacent-to", note: "together form iliopsoas" },
      { concept: "diaphragm", relation: "adjacent-to", note: "medial arcuate ligament arches over it" },
      { concept: "kidney", relation: "adjacent-to", note: "lies in front of its upper part" },
      { concept: "ureter", relation: "adjacent-to", note: "descends on its anterior surface" },
      { concept: "appendix", relation: "adjacent-to", note: "psoas sign" },
    ],
    clinical:
      "An inflamed retrocaecal appendix lying on psoas makes hip extension painful (psoas sign), and infection from the spine can track down its sheath to the groin as a psoas abscess.",
  },

  "rectus-femoris": {
    summary:
      "The central, most superficial head of the quadriceps femoris and the only one that crosses both the hip and the knee. It flexes the hip as well as extending the knee.",
    functions: [
      "Extends the knee (straightens the leg)",
      "Flexes the hip",
      "Powers kicking movements",
    ],
    facts: [
      { label: "Muscle type", value: "Bipennate" },
      { label: "Crosses", value: "Hip and knee — the only quadriceps head crossing the hip" },
    ],
    origin: "Straight head: anterior inferior iliac spine; reflected head: ilium just above the acetabulum",
    insertion: "Base of the patella via the quadriceps tendon, and hence the tibial tuberosity via the patellar ligament",
    action: "Extends the knee and flexes the hip",
    innervation: "Femoral nerve (L2–L4)",
    bloodSupply: "Descending branch of the lateral circumflex femoral artery; deep artery of the thigh",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: anterior inferior iliac spine" },
      { concept: "patella", relation: "attaches-to", note: "insertion via the quadriceps tendon" },
      { concept: "tibia", relation: "acts-on", note: "knee extension via the patellar ligament" },
      { concept: "femur", relation: "acts-on", note: "hip flexion" },
      { concept: "femoral-nerve", relation: "innervated-by" },
      { concept: "lateral-circumflex-femoral-artery", relation: "supplied-by", note: "descending branch" },
      { concept: "vastus-intermedius", relation: "adjacent-to", note: "lies on it" },
      { concept: "vastus-lateralis", relation: "adjacent-to" },
      { concept: "vastus-medialis", relation: "adjacent-to" },
      { concept: "sartorius", relation: "adjacent-to" },
    ],
    clinical:
      "Being a two-joint muscle, it is the quadriceps head most often strained during kicking or sprinting; in adolescents it can pull off (avulse) the anterior inferior iliac spine.",
  },

  "vastus-lateralis": {
    summary:
      "The largest head of the quadriceps femoris, forming the bulk of the outer thigh beneath the iliotibial tract.",
    functions: ["Extends the knee", "Helps stabilise the patella on its lateral side"],
    facts: [{ label: "Size", value: "Largest part of the quadriceps femoris" }],
    origin: "Greater trochanter, upper intertrochanteric line and lateral lip of the linea aspera",
    insertion: "Base and lateral border of the patella via the quadriceps tendon (and lateral patellar retinaculum); tibial tuberosity via the patellar ligament",
    action: "Extends the knee",
    innervation: "Femoral nerve (L2–L4)",
    bloodSupply: "Lateral circumflex femoral artery (descending branch) and perforating branches of the deep artery of the thigh",
    connections: [
      { concept: "femur", relation: "attaches-to", note: "origin: greater trochanter and linea aspera" },
      { concept: "patella", relation: "attaches-to", note: "insertion via the quadriceps tendon" },
      { concept: "tibia", relation: "acts-on", note: "knee extension via the patellar ligament" },
      { concept: "femoral-nerve", relation: "innervated-by" },
      { concept: "lateral-circumflex-femoral-artery", relation: "supplied-by" },
      { concept: "perforating-arteries", relation: "supplied-by" },
      { concept: "iliotibial-tract", relation: "adjacent-to", note: "covers it laterally" },
      { concept: "rectus-femoris", relation: "adjacent-to" },
      { concept: "vastus-intermedius", relation: "adjacent-to" },
    ],
    clinical:
      "Its large, easily reached mass makes it a preferred site for intramuscular injections in infants and for muscle biopsy.",
  },

  "vastus-medialis": {
    summary:
      "The medial head of the quadriceps, forming the teardrop-shaped bulge above the inner knee. Its lowest, most horizontal fibres (vastus medialis obliquus) help keep the patella tracking centrally.",
    functions: [
      "Extends the knee",
      "Its oblique lower fibres pull the patella medially and stop it sliding laterally",
    ],
    origin: "Intertrochanteric line, medial lip of the linea aspera and medial supracondylar line",
    insertion: "Base and medial border of the patella via the quadriceps tendon and medial patellar retinaculum; tibial tuberosity via the patellar ligament",
    action: "Extends the knee; oblique fibres resist lateral displacement of the patella",
    innervation: "Femoral nerve (L2–L4)",
    bloodSupply: "Femoral artery and deep artery of the thigh",
    connections: [
      { concept: "femur", relation: "attaches-to", note: "origin: intertrochanteric line and linea aspera" },
      { concept: "patella", relation: "attaches-to", note: "insertion via the quadriceps tendon" },
      { concept: "tibia", relation: "acts-on", note: "knee extension via the patellar ligament" },
      { concept: "femoral-nerve", relation: "innervated-by" },
      { concept: "femoral-artery", relation: "supplied-by" },
      { concept: "sartorius", relation: "adjacent-to", note: "together bound the adductor canal" },
      { concept: "saphenous-nerve", relation: "adjacent-to", note: "runs in the adductor canal beside it" },
      { concept: "vastus-intermedius", relation: "adjacent-to" },
    ],
    clinical:
      "Weakness or poor activation of its oblique fibres is linked to lateral patellar maltracking and anterior knee (patellofemoral) pain.",
  },

  "vastus-intermedius": {
    summary:
      "The deepest head of the quadriceps, lying directly on the front of the femur beneath rectus femoris.",
    functions: ["Extends the knee", "Its deep slip (articularis genus) lifts the suprapatellar bursa during extension"],
    facts: [{ label: "Articularis genus", value: "Small slip from its deep fibres that pulls the suprapatellar bursa upward" }],
    origin: "Anterior and lateral surfaces of the upper two-thirds of the femoral shaft",
    insertion: "Deep surface of the quadriceps tendon to the base of the patella; tibial tuberosity via the patellar ligament",
    action: "Extends the knee",
    innervation: "Femoral nerve (L2–L4)",
    bloodSupply: "Lateral circumflex femoral artery and deep artery of the thigh",
    connections: [
      { concept: "femur", relation: "attaches-to", note: "origin: anterior and lateral shaft" },
      { concept: "patella", relation: "attaches-to", note: "insertion via the quadriceps tendon" },
      { concept: "tibia", relation: "acts-on", note: "knee extension via the patellar ligament" },
      { concept: "femoral-nerve", relation: "innervated-by" },
      { concept: "lateral-circumflex-femoral-artery", relation: "supplied-by" },
      { concept: "rectus-femoris", relation: "adjacent-to", note: "lies over it" },
      { concept: "vastus-lateralis", relation: "adjacent-to" },
      { concept: "vastus-medialis", relation: "adjacent-to" },
    ],
    clinical:
      "A direct blow to the front of the thigh crushes it against the femur (a 'dead leg'); occasionally bone forms within the bruised muscle (myositis ossificans).",
  },

  sartorius: {
    summary:
      "A long, strap-like muscle that runs obliquely across the front of the thigh from the hip to the inner knee — the longest muscle in the body.",
    functions: [
      "Flexes, abducts and laterally rotates the hip",
      "Flexes the knee",
      "Together these produce the cross-legged sitting position",
    ],
    facts: [
      { label: "Length", value: "Longest muscle in the body" },
      { label: "Name", value: "From Latin sartor, 'tailor' — the cross-legged tailor's posture" },
    ],
    origin: "Anterior superior iliac spine and the notch below it",
    insertion: "Upper part of the medial surface of the tibia (pes anserinus)",
    action: "Flexes, abducts and laterally rotates the thigh at the hip; flexes the knee",
    innervation: "Femoral nerve (L2–L3)",
    bloodSupply: "Muscular branches of the femoral artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: anterior superior iliac spine" },
      { concept: "tibia", relation: "attaches-to", note: "insertion: pes anserinus" },
      { concept: "femoral-nerve", relation: "innervated-by" },
      { concept: "femoral-artery", relation: "supplied-by" },
      { concept: "femur", relation: "acts-on", note: "hip flexion, abduction and lateral rotation" },
      { concept: "adductor-longus", relation: "adjacent-to", note: "the two muscles bound the femoral triangle" },
      { concept: "saphenous-nerve", relation: "adjacent-to", note: "roof of the adductor canal" },
      { concept: "gracilis", relation: "adjacent-to", note: "pes anserinus" },
      { concept: "semitendinosus", relation: "adjacent-to", note: "pes anserinus" },
    ],
    clinical:
      "It forms the lateral border of the femoral triangle and the roof of the adductor canal, landmarks used to locate the femoral vessels and the saphenous nerve (e.g. for nerve blocks).",
  },

  // ─────────────────────────── Gluteal region ───────────────────────────
  "tensor-fasciae-latae": {
    summary:
      "A small muscle at the front of the hip, enclosed between two layers of the fascia lata. It pulls on the iliotibial tract to help stabilise the hip and knee.",
    functions: [
      "Abducts and medially rotates the hip",
      "Assists hip flexion",
      "Tenses the iliotibial tract to steady the extended knee",
    ],
    origin: "Anterior superior iliac spine and anterior part of the outer lip of the iliac crest",
    insertion: "Iliotibial tract, which attaches to the lateral condyle of the tibia (Gerdy's tubercle)",
    action: "Abducts, medially rotates and flexes the hip; tenses the fascia lata and helps stabilise the knee",
    innervation: "Superior gluteal nerve (L4–S1)",
    bloodSupply: "Ascending branch of the lateral circumflex femoral artery; superior gluteal artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: anterior superior iliac spine" },
      { concept: "iliotibial-tract", relation: "attaches-to", note: "insertion" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the superior gluteal nerve" },
      { concept: "lateral-circumflex-femoral-artery", relation: "supplied-by", note: "ascending branch" },
      { concept: "superior-gluteal-vein", relation: "drained-by" },
      { concept: "femur", relation: "acts-on", note: "hip abduction and medial rotation" },
      { concept: "gluteus-medius", relation: "adjacent-to", note: "synergist" },
      { concept: "gluteus-maximus", relation: "adjacent-to", note: "both insert into the iliotibial tract" },
      { concept: "sartorius", relation: "adjacent-to" },
    ],
    clinical:
      "Tightness of tensor fasciae latae and the iliotibial tract contributes to lateral hip and knee pain in runners.",
  },

  "iliotibial-tract": {
    summary:
      "A thick band of deep fascia (fascia lata) running down the outer thigh from the iliac crest to the tibia just below the knee. Tensor fasciae latae and much of gluteus maximus insert into it.",
    latin: "Tractus iliotibialis",
    functions: [
      "Stabilises the hip and knee laterally, especially when standing on one leg",
      "Transmits the pull of tensor fasciae latae and gluteus maximus to the tibia",
      "Helps hold the knee extended when standing",
    ],
    facts: [{ label: "Attachments", value: "Iliac crest/tubercle above; anterolateral tibial condyle (Gerdy's tubercle) below" }],
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "iliac crest (tubercle)" },
      { concept: "tibia", relation: "attaches-to", note: "Gerdy's tubercle on the lateral condyle" },
      { concept: "tensor-fasciae-latae", relation: "attaches-to", note: "muscle inserts into the tract" },
      { concept: "gluteus-maximus", relation: "attaches-to", note: "most superficial fibres insert into the tract" },
      { concept: "femur", relation: "adjacent-to", note: "glides over the lateral femoral epicondyle" },
      { concept: "vastus-lateralis", relation: "adjacent-to", note: "lies over it" },
      { concept: "patella", relation: "adjacent-to", note: "sends fibres to the lateral patellar retinaculum" },
      { concept: "biceps-femoris", relation: "adjacent-to" },
    ],
    clinical:
      "Iliotibial band syndrome — lateral knee pain in runners and cyclists — results from repeated friction or compression of the tract over the lateral femoral epicondyle.",
  },

  "gluteus-maximus": {
    summary:
      "The largest and most superficial gluteal muscle, forming the shape of the buttock. It is the main extensor of the hip, used powerfully when rising from sitting, climbing stairs and running.",
    functions: [
      "Extends the hip, especially from a flexed position (standing up, climbing, running)",
      "Laterally rotates the thigh",
      "Steadies the pelvis and, through the iliotibial tract, the extended knee",
    ],
    facts: [
      { label: "Size", value: "Usually described as the largest single muscle in the body" },
      { label: "Insertion", value: "About three-quarters of its fibres insert into the iliotibial tract" },
    ],
    origin: "Posterior ilium behind the posterior gluteal line, dorsal surface of the sacrum and coccyx, and the sacrotuberous ligament",
    insertion: "Most fibres into the iliotibial tract; deep lower fibres into the gluteal tuberosity of the femur",
    action: "Extends and laterally rotates the thigh; steadies the pelvis and extended knee",
    innervation: "Inferior gluteal nerve (L5–S2)",
    bloodSupply: "Inferior and superior gluteal arteries (branches of the internal iliac artery)",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: posterior ilium" },
      { concept: "sacrum", relation: "attaches-to", note: "origin: dorsal surface" },
      { concept: "coccyx", relation: "attaches-to", note: "origin" },
      { concept: "iliotibial-tract", relation: "attaches-to", note: "main insertion" },
      { concept: "femur", relation: "attaches-to", note: "insertion: gluteal tuberosity" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the inferior gluteal nerve" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via superior and inferior gluteal arteries" },
      { concept: "inferior-gluteal-vein", relation: "drained-by" },
      { concept: "superior-gluteal-vein", relation: "drained-by" },
      { concept: "sciatic-nerve", relation: "adjacent-to", note: "runs deep to its lower half" },
      { concept: "gluteus-medius", relation: "adjacent-to", note: "partly covered by it" },
    ],
    clinical:
      "Intramuscular injections are given in the upper outer quadrant of the buttock to avoid the sciatic nerve, which runs deep to the lower part of gluteus maximus.",
  },

  "gluteus-medius": {
    summary:
      "A thick, fan-shaped muscle on the outer surface of the ilium, partly covered by gluteus maximus. It keeps the pelvis level when you stand on one leg.",
    functions: [
      "Abducts the hip",
      "Keeps the pelvis level during walking when the opposite foot is off the ground",
      "Its anterior fibres medially rotate the hip",
    ],
    origin: "External surface of the ilium between the anterior and posterior gluteal lines",
    insertion: "Lateral surface of the greater trochanter of the femur",
    action: "Abducts and medially rotates the thigh; stabilises the pelvis during single-leg stance",
    innervation: "Superior gluteal nerve (L4–S1)",
    bloodSupply: "Deep branch of the superior gluteal artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: external ilium" },
      { concept: "femur", relation: "attaches-to", note: "insertion: greater trochanter" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the superior gluteal nerve" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via the superior gluteal artery" },
      { concept: "superior-gluteal-vein", relation: "drained-by" },
      { concept: "gluteus-minimus", relation: "adjacent-to", note: "lies beneath it; synergist" },
      { concept: "gluteus-maximus", relation: "adjacent-to", note: "covers its posterior part" },
      { concept: "piriformis", relation: "adjacent-to", note: "lies along its lower border" },
      { concept: "tensor-fasciae-latae", relation: "adjacent-to", note: "synergist" },
    ],
    clinical:
      "Weakness or superior gluteal nerve injury produces a positive Trendelenburg sign: when standing on the affected leg, the pelvis drops on the opposite side.",
  },

  "gluteus-minimus": {
    summary:
      "The smallest and deepest of the three gluteal muscles, lying beneath gluteus medius. It works with gluteus medius to abduct the hip and keep the pelvis level.",
    functions: [
      "Abducts the hip",
      "Medially rotates the hip",
      "Stabilises the pelvis during single-leg stance",
    ],
    origin: "External surface of the ilium between the anterior and inferior gluteal lines",
    insertion: "Anterior surface of the greater trochanter of the femur",
    action: "Abducts and medially rotates the thigh; stabilises the pelvis",
    innervation: "Superior gluteal nerve (L4–S1)",
    bloodSupply: "Deep branch of the superior gluteal artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: external ilium" },
      { concept: "femur", relation: "attaches-to", note: "insertion: greater trochanter" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the superior gluteal nerve" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via the superior gluteal artery" },
      { concept: "superior-gluteal-vein", relation: "drained-by" },
      { concept: "gluteus-medius", relation: "adjacent-to", note: "lies over it" },
      { concept: "piriformis", relation: "adjacent-to" },
    ],
    clinical:
      "Tears of the gluteus minimus and medius tendons at the greater trochanter are a common cause of lateral hip pain in older adults.",
  },

  piriformis: {
    summary:
      "A pear-shaped muscle that passes from inside the pelvis through the greater sciatic foramen to the femur. It is the key landmark of the gluteal region: vessels and nerves are described as emerging above or below it.",
    functions: [
      "Laterally rotates the extended hip",
      "Abducts the flexed hip",
      "Helps hold the head of the femur in the acetabulum",
    ],
    origin: "Anterior surface of the sacrum (about S2–S4) and the sacrotuberous ligament",
    insertion: "Superior border of the greater trochanter of the femur",
    action: "Laterally rotates the extended thigh and abducts the flexed thigh; steadies the femoral head",
    innervation: "Nerve to piriformis, from the anterior rami of S1–S2",
    bloodSupply: "Superior and inferior gluteal arteries (and lateral sacral arteries)",
    connections: [
      { concept: "sacrum", relation: "attaches-to", note: "origin: anterior surface" },
      { concept: "femur", relation: "attaches-to", note: "insertion: greater trochanter" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "the plexus also lies on its pelvic surface" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via gluteal branches" },
      { concept: "sciatic-nerve", relation: "adjacent-to", note: "usually emerges below it" },
      { concept: "superior-gluteal-vein", relation: "adjacent-to", note: "superior gluteal vessels emerge above it" },
      { concept: "inferior-gluteal-vein", relation: "adjacent-to", note: "inferior gluteal vessels emerge below it" },
      { concept: "gemellus-superior", relation: "adjacent-to", note: "lies just below it" },
      { concept: "gluteus-medius", relation: "adjacent-to" },
    ],
    clinical:
      "The sciatic nerve normally emerges below piriformis but sometimes passes through it; compression by the muscle ('piriformis syndrome') is a debated cause of buttock pain and sciatica.",
  },

  "obturator-internus": {
    summary:
      "A fan-shaped muscle lining the side wall of the pelvis whose tendon turns sharply around the lesser sciatic notch to reach the femur. Its fascia gives origin to part of the levator ani.",
    functions: [
      "Laterally rotates the extended hip",
      "Abducts the flexed hip",
      "Steadies the head of the femur in the acetabulum",
    ],
    facts: [{ label: "Triceps coxae", value: "With the two gemelli it forms a three-headed tendon to the greater trochanter" }],
    origin: "Pelvic surface of the obturator membrane and surrounding bone (ilium, ischium and pubis)",
    insertion: "Medial surface of the greater trochanter of the femur (with the gemelli)",
    action: "Laterally rotates the extended thigh and abducts the flexed thigh; steadies the femoral head",
    innervation: "Nerve to obturator internus (L5–S2)",
    bloodSupply: "Internal pudendal and obturator arteries",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: inner surface around the obturator foramen" },
      { concept: "femur", relation: "attaches-to", note: "insertion: greater trochanter" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the nerve to obturator internus" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via internal pudendal and obturator arteries" },
      { concept: "obturator-vein", relation: "drained-by" },
      { concept: "gemellus-superior", relation: "adjacent-to", note: "blends with its tendon" },
      { concept: "gemellus-inferior", relation: "adjacent-to", note: "blends with its tendon" },
      { concept: "tendinous-arch-of-levator-ani", relation: "adjacent-to", note: "a thickening of its fascia" },
      { concept: "levator-ani", relation: "adjacent-to", note: "arises partly from its fascia" },
    ],
    clinical:
      "The pudendal nerve and internal pudendal vessels run in a fascial tunnel (pudendal canal) on the medial surface of obturator internus, where the nerve can be compressed.",
  },

  "gemellus-superior": {
    summary:
      "A small, narrow muscle running just above the tendon of obturator internus and merging with it. It assists obturator internus in rotating the hip laterally.",
    functions: ["Laterally rotates the extended hip", "Abducts the flexed hip", "Steadies the femoral head"],
    origin: "Outer surface of the ischial spine",
    insertion: "Medial surface of the greater trochanter, via the obturator internus tendon",
    action: "Laterally rotates the extended thigh and abducts the flexed thigh",
    innervation: "Nerve to obturator internus (L5–S2)",
    bloodSupply: "Inferior gluteal and internal pudendal arteries",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: ischial spine" },
      { concept: "femur", relation: "attaches-to", note: "insertion: greater trochanter (via obturator internus tendon)" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the nerve to obturator internus" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via inferior gluteal and internal pudendal arteries" },
      { concept: "obturator-internus", relation: "adjacent-to", note: "blends with its tendon" },
      { concept: "piriformis", relation: "adjacent-to", note: "lies just above it" },
      { concept: "gemellus-inferior", relation: "adjacent-to" },
    ],
  },

  "gemellus-inferior": {
    summary:
      "A small muscle running just below the tendon of obturator internus and merging with it. It shares its nerve with quadratus femoris.",
    functions: ["Laterally rotates the extended hip", "Abducts the flexed hip", "Steadies the femoral head"],
    origin: "Upper part of the ischial tuberosity",
    insertion: "Medial surface of the greater trochanter, via the obturator internus tendon",
    action: "Laterally rotates the extended thigh and abducts the flexed thigh",
    innervation: "Nerve to quadratus femoris (L4–S1)",
    bloodSupply: "Medial circumflex femoral artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: ischial tuberosity" },
      { concept: "femur", relation: "attaches-to", note: "insertion: greater trochanter (via obturator internus tendon)" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the nerve to quadratus femoris" },
      { concept: "medial-circumflex-femoral-vein", relation: "drained-by" },
      { concept: "obturator-internus", relation: "adjacent-to", note: "blends with its tendon" },
      { concept: "gemellus-superior", relation: "adjacent-to" },
      { concept: "quadratus-femoris", relation: "adjacent-to", note: "lies just below it" },
    ],
  },

  "quadratus-femoris": {
    summary:
      "A short, flat, rectangular muscle below the gemelli, running from the ischial tuberosity to the back of the femur. It is a strong lateral rotator of the hip.",
    functions: ["Laterally rotates the hip", "Steadies the head of the femur in the acetabulum"],
    origin: "Lateral border of the ischial tuberosity",
    insertion: "Quadrate tubercle on the intertrochanteric crest of the femur",
    action: "Laterally rotates the thigh; steadies the femoral head",
    innervation: "Nerve to quadratus femoris (L4–S1)",
    bloodSupply: "Medial circumflex femoral artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: ischial tuberosity" },
      { concept: "femur", relation: "attaches-to", note: "insertion: quadrate tubercle" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the nerve to quadratus femoris" },
      { concept: "medial-circumflex-femoral-vein", relation: "drained-by" },
      { concept: "sciatic-nerve", relation: "adjacent-to", note: "runs over its posterior surface" },
      { concept: "gemellus-inferior", relation: "adjacent-to", note: "lies just above it" },
      { concept: "adductor-minimus", relation: "adjacent-to", note: "lies just below it" },
      { concept: "obturator-externus", relation: "adjacent-to", note: "lies in front of it" },
    ],
    clinical:
      "Narrowing of the space between the ischium and the lesser trochanter can squeeze quadratus femoris (ischiofemoral impingement), causing deep buttock pain.",
  },

  // ─────────────────────────── Pectoral region & thoracic wall ───────────────────────────
  "pectoralis-major": {
    summary:
      "A large, fan-shaped muscle covering the upper front of the chest, with clavicular and sternocostal heads. It forms the anterior fold of the armpit and is a powerful adductor and medial rotator of the arm.",
    functions: [
      "Adducts the arm (pulls it toward the body) and rotates it medially",
      "Clavicular head flexes the arm (lifting it forward)",
      "Sternocostal head extends the arm from a flexed position (e.g. climbing, swimming strokes)",
      "Can help lift the ribs in forced breathing when the arm is fixed",
    ],
    facts: [
      { label: "Heads", value: "Clavicular and sternocostal" },
      { label: "Forms", value: "The anterior axillary fold" },
    ],
    origin: "Clavicular head: anterior surface of the medial half of the clavicle; sternocostal head: anterior sternum, upper six costal cartilages and aponeurosis of the external oblique",
    insertion: "Lateral lip of the intertubercular sulcus (crest of the greater tubercle) of the humerus",
    action: "Adducts and medially rotates the humerus; clavicular head flexes and sternocostal head extends the flexed arm",
    innervation: "Lateral and medial pectoral nerves (clavicular head C5–C6; sternocostal head C7–T1)",
    bloodSupply: "Pectoral branch of the thoraco-acromial artery; perforating branches of the internal thoracic artery; lateral thoracic artery",
    connections: [
      { concept: "clavicle", relation: "attaches-to", note: "origin: clavicular head" },
      { concept: "manubrium-of-sternum", relation: "attaches-to", note: "origin: sternocostal head" },
      { concept: "body-of-sternum", relation: "attaches-to", note: "origin: sternocostal head (and upper six costal cartilages)" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: lateral lip of intertubercular sulcus" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "lateral and medial pectoral nerves" },
      { concept: "thoraco-acromial-artery", relation: "supplied-by", note: "pectoral branch" },
      { concept: "internal-thoracic-artery", relation: "supplied-by", note: "perforating branches" },
      { concept: "lateral-thoracic-artery", relation: "supplied-by" },
      { concept: "pectoralis-minor", relation: "adjacent-to", note: "lies deep to it" },
      { concept: "deltoid", relation: "adjacent-to", note: "separated by the deltopectoral groove" },
      { concept: "cephalic-vein", relation: "adjacent-to", note: "runs in the deltopectoral groove" },
      { concept: "mammary-gland", relation: "adjacent-to", note: "the breast rests on its fascia" },
    ],
    clinical:
      "Its tendon can rupture near the humerus during heavy bench pressing; part of the muscle is congenitally absent in Poland syndrome.",
  },

  "pectoralis-minor": {
    summary:
      "A thin, triangular muscle lying beneath pectoralis major. It anchors the scapula to the chest wall and is an important landmark in the axilla.",
    functions: [
      "Draws the scapula forward and downward, holding it against the chest wall",
      "Helps raise the ribs in forced inspiration when the scapula is fixed",
    ],
    facts: [{ label: "Landmark", value: "Divides the axillary artery into its three parts" }],
    origin: "3rd–5th ribs near their costal cartilages",
    insertion: "Medial border and upper surface of the coracoid process of the scapula",
    action: "Stabilises the scapula by drawing it inferiorly and anteriorly against the thoracic wall",
    innervation: "Medial pectoral nerve (C8–T1), with a variable contribution from the lateral pectoral nerve",
    bloodSupply: "Pectoral branch of the thoraco-acromial artery; lateral thoracic artery",
    connections: [
      { concept: "third-rib", relation: "attaches-to", note: "origin" },
      { concept: "fourth-rib", relation: "attaches-to", note: "origin" },
      { concept: "fifth-rib", relation: "attaches-to", note: "origin" },
      { concept: "scapula", relation: "attaches-to", note: "insertion: coracoid process" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "medial pectoral nerve" },
      { concept: "thoraco-acromial-artery", relation: "supplied-by", note: "pectoral branch" },
      { concept: "lateral-thoracic-artery", relation: "supplied-by" },
      { concept: "axillary-artery", relation: "adjacent-to", note: "crosses in front of its second part" },
      { concept: "pectoralis-major", relation: "adjacent-to", note: "covers it" },
    ],
    clinical:
      "A tight pectoralis minor can compress the brachial plexus and axillary vessels passing beneath it (pectoralis minor syndrome, a form of thoracic outlet syndrome).",
  },

  "serratus-anterior": {
    summary:
      "A broad sheet of muscle wrapping around the side of the chest, arising by finger-like slips from the upper eight or nine ribs. It holds the scapula against the ribs and rotates it so the arm can be raised above the head.",
    functions: [
      "Protracts the scapula (e.g. punching, pushing)",
      "Holds the scapula flat against the chest wall",
      "Rotates the scapula upward, allowing the arm to be raised above 90°",
    ],
    facts: [{ label: "Nickname", value: "'Boxer's muscle'" }],
    origin: "External surfaces of the lateral parts of ribs 1–8 (or 9)",
    insertion: "Anterior (costal) surface of the medial border of the scapula",
    action: "Protracts the scapula and holds it against the thoracic wall; rotates the scapula upward",
    innervation: "Long thoracic nerve (C5–C7)",
    bloodSupply: "Lateral thoracic and thoracodorsal arteries",
    connections: [
      { concept: "first-rib", relation: "attaches-to", note: "origin: highest slip (ribs 1–8/9)" },
      { concept: "eighth-rib", relation: "attaches-to", note: "origin: lower slips (ribs 1–8/9)" },
      { concept: "scapula", relation: "attaches-to", note: "insertion: medial border (costal surface)" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "long thoracic nerve from the C5–C7 roots" },
      { concept: "lateral-thoracic-artery", relation: "supplied-by" },
      { concept: "thoracodorsal-artery", relation: "supplied-by" },
      { concept: "trapezius", relation: "adjacent-to", note: "synergist in upward rotation" },
      { concept: "rhomboid-major", relation: "adjacent-to", note: "antagonist; both insert on the medial border" },
      { concept: "subscapularis", relation: "adjacent-to", note: "lies against it" },
      { concept: "external-oblique", relation: "adjacent-to", note: "their lower slips interdigitate" },
    ],
    clinical:
      "Injury to the long thoracic nerve (e.g. during axillary surgery) paralyses serratus anterior, so the medial border of the scapula lifts away from the chest when pushing against a wall ('winged scapula').",
  },

  subclavius: {
    summary:
      "A small, pencil-shaped muscle lying beneath the clavicle, between it and the first rib.",
    functions: [
      "Anchors and depresses the clavicle",
      "Stabilises the sternoclavicular joint during shoulder movements",
    ],
    origin: "Junction of the 1st rib and its costal cartilage",
    insertion: "Inferior surface of the middle third of the clavicle",
    action: "Anchors and depresses the clavicle",
    innervation: "Nerve to subclavius (C5–C6)",
    bloodSupply: "Clavicular branch of the thoraco-acromial artery; suprascapular artery",
    connections: [
      { concept: "first-rib", relation: "attaches-to", note: "origin" },
      { concept: "first-costal-cartilage", relation: "attaches-to", note: "origin" },
      { concept: "clavicle", relation: "attaches-to", note: "insertion: inferior surface" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "nerve to subclavius from the upper trunk" },
      { concept: "thoraco-acromial-artery", relation: "supplied-by", note: "clavicular branch" },
      { concept: "subclavian-vein", relation: "adjacent-to", note: "lies just beneath it" },
      { concept: "subclavian-artery", relation: "adjacent-to" },
      { concept: "pectoralis-major", relation: "adjacent-to" },
    ],
    clinical:
      "In a fractured clavicle it offers some protection to the subclavian vessels and brachial plexus that lie beneath the bone.",
  },

  "external-intercostal-muscles": {
    summary:
      "The outermost of the three layers of intercostal muscles, filling each intercostal space from the rib tubercles almost to the costal cartilages. Their fibres run downward and forward, like hands slipped into front pockets.",
    functions: [
      "Elevate the ribs during inspiration, especially forced inspiration",
      "Keep the intercostal spaces rigid so they do not bulge or suck in with breathing",
    ],
    facts: [
      { label: "Number", value: "11 pairs (one per intercostal space)" },
      { label: "Fibre direction", value: "Downward and forward ('hands in pockets')" },
      { label: "Anteriorly replaced by", value: "External intercostal membrane" },
    ],
    origin: "Inferior border of the rib above",
    insertion: "Superior border of the rib below",
    action: "Elevate the ribs during inspiration; support the intercostal spaces",
    innervation: "Intercostal nerves (T1–T11)",
    bloodSupply: "Posterior intercostal arteries and anterior intercostal branches of the internal thoracic artery",
    connections: [
      { concept: "first-rib", relation: "attaches-to" },
      { concept: "second-rib", relation: "attaches-to" },
      { concept: "third-rib", relation: "attaches-to" },
      { concept: "fourth-rib", relation: "attaches-to" },
      { concept: "fifth-rib", relation: "attaches-to" },
      { concept: "sixth-rib", relation: "attaches-to" },
      { concept: "seventh-rib", relation: "attaches-to" },
      { concept: "eighth-rib", relation: "attaches-to" },
      { concept: "ninth-rib", relation: "attaches-to" },
      { concept: "tenth-rib", relation: "attaches-to" },
      { concept: "eleventh-rib", relation: "attaches-to" },
      { concept: "twelfth-rib", relation: "attaches-to" },
      { concept: "intercostal-nerves", relation: "innervated-by" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "posterior intercostal arteries" },
      { concept: "internal-thoracic-artery", relation: "supplied-by", note: "anterior intercostal branches" },
      { concept: "intercostal-veins", relation: "drained-by" },
      { concept: "internal-intercostal-muscles", relation: "adjacent-to", note: "next layer inward; fibres at right angles" },
      { concept: "diaphragm", relation: "adjacent-to", note: "synergist in inspiration" },
    ],
    clinical:
      "In a flail chest (several ribs broken in two places) the intercostal support fails and the loose segment moves inward on inspiration (paradoxical breathing).",
  },

  "internal-intercostal-muscles": {
    summary:
      "The middle layer of intercostal muscles, running from the sternum back to the angles of the ribs. Their fibres run at right angles to the external intercostals — downward and backward.",
    functions: [
      "Depress the ribs during forced expiration (interosseous parts)",
      "The parts between the costal cartilages (interchondral parts) help elevate the ribs in inspiration",
      "Keep the intercostal spaces rigid",
    ],
    facts: [
      { label: "Fibre direction", value: "Downward and backward (at right angles to the external layer)" },
      { label: "Posteriorly replaced by", value: "Internal intercostal membrane" },
    ],
    origin: "Inferior border of the rib above (lateral to the costal groove)",
    insertion: "Superior border of the rib below",
    action: "Interosseous parts depress the ribs (forced expiration); interchondral parts elevate them",
    innervation: "Intercostal nerves (T1–T11)",
    bloodSupply: "Posterior intercostal arteries and anterior intercostal branches of the internal thoracic artery",
    connections: [
      { concept: "first-rib", relation: "attaches-to" },
      { concept: "second-rib", relation: "attaches-to" },
      { concept: "third-rib", relation: "attaches-to" },
      { concept: "fourth-rib", relation: "attaches-to" },
      { concept: "fifth-rib", relation: "attaches-to" },
      { concept: "sixth-rib", relation: "attaches-to" },
      { concept: "seventh-rib", relation: "attaches-to" },
      { concept: "eighth-rib", relation: "attaches-to" },
      { concept: "ninth-rib", relation: "attaches-to" },
      { concept: "tenth-rib", relation: "attaches-to" },
      { concept: "eleventh-rib", relation: "attaches-to" },
      { concept: "twelfth-rib", relation: "attaches-to" },
      { concept: "intercostal-nerves", relation: "innervated-by" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "internal-thoracic-artery", relation: "supplied-by", note: "anterior intercostal branches" },
      { concept: "intercostal-veins", relation: "drained-by" },
      { concept: "external-intercostal-muscles", relation: "adjacent-to", note: "superficial layer" },
      { concept: "innermost-intercostal-muscles", relation: "adjacent-to", note: "the intercostal neurovascular bundle runs between them" },
    ],
    clinical:
      "The intercostal vein, artery and nerve run in the costal groove between the internal and innermost layers, so needles and chest drains are passed just above the upper border of a rib.",
  },

  "innermost-intercostal-muscles": {
    summary:
      "The deepest layer of intercostal muscle, present mainly in the lateral parts of the intercostal spaces and best developed lower down. It is separated from the internal intercostals by the intercostal vein, artery and nerve.",
    functions: [
      "Probably act with the internal intercostals to depress the ribs",
      "Help keep the intercostal spaces rigid",
    ],
    facts: [{ label: "Innermost layer also includes", value: "Subcostales (posteriorly) and transversus thoracis (anteriorly)" }],
    origin: "Internal surface of the rib above",
    insertion: "Internal surface of the rib below",
    action: "Likely assist the internal intercostals in depressing the ribs and stiffening the intercostal spaces",
    innervation: "Intercostal nerves",
    bloodSupply: "Posterior intercostal arteries and anterior intercostal branches of the internal thoracic artery",
    connections: [
      { concept: "second-rib", relation: "attaches-to", note: "poorly developed in the upper spaces" },
      { concept: "fourth-rib", relation: "attaches-to" },
      { concept: "sixth-rib", relation: "attaches-to" },
      { concept: "eighth-rib", relation: "attaches-to" },
      { concept: "tenth-rib", relation: "attaches-to" },
      { concept: "twelfth-rib", relation: "attaches-to" },
      { concept: "intercostal-nerves", relation: "innervated-by" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-veins", relation: "drained-by" },
      { concept: "internal-intercostal-muscles", relation: "adjacent-to", note: "the neurovascular bundle lies between them" },
      { concept: "transversus-thoracis", relation: "adjacent-to", note: "same (innermost) layer, anteriorly" },
    ],
  },

  "transversus-thoracis": {
    summary:
      "A thin sheet of muscle on the inner surface of the front of the chest wall, fanning out from the lower sternum to the costal cartilages. It belongs to the innermost layer of thoracic wall muscles.",
    functions: ["Weakly depresses the ribs and costal cartilages during expiration"],
    origin: "Posterior surface of the lower sternum (body and xiphoid process)",
    insertion: "Internal surfaces of costal cartilages 2–6",
    action: "Weakly depresses the ribs and costal cartilages",
    innervation: "Intercostal nerves (T2–T6)",
    bloodSupply: "Anterior intercostal branches of the internal thoracic artery",
    connections: [
      { concept: "body-of-sternum", relation: "attaches-to", note: "origin: posterior surface" },
      { concept: "xiphoid-process", relation: "attaches-to", note: "origin" },
      { concept: "second-costal-cartilage", relation: "attaches-to", note: "insertion" },
      { concept: "third-costal-cartilage", relation: "attaches-to", note: "insertion" },
      { concept: "fourth-costal-cartilage", relation: "attaches-to", note: "insertion" },
      { concept: "fifth-costal-cartilage", relation: "attaches-to", note: "insertion" },
      { concept: "sixth-costal-cartilage", relation: "attaches-to", note: "insertion" },
      { concept: "intercostal-nerves", relation: "innervated-by" },
      { concept: "internal-thoracic-artery", relation: "supplied-by", note: "runs between the muscle and the costal cartilages" },
      { concept: "internal-thoracic-vein", relation: "drained-by" },
    ],
    clinical:
      "The internal thoracic vessels lie just in front of it, which is relevant when these vessels are harvested for coronary artery bypass grafting.",
  },

  diaphragm: {
    summary:
      "A dome-shaped sheet of skeletal muscle separating the thoracic and abdominal cavities, with a central tendon at its top. It is the principal muscle of breathing: each contraction flattens the dome and draws air into the lungs.",
    latin: "Diaphragma",
    functions: [
      "Main muscle of inspiration — contracting lowers the dome and enlarges the chest cavity",
      "Raises abdominal pressure for coughing, vomiting, urination, defecation and childbirth",
      "Fibres of the right crus encircle the oesophagus and help prevent reflux",
      "Pressure changes it creates aid venous return to the heart",
    ],
    facts: [
      { label: "Main openings", value: "Caval (T8: IVC), oesophageal (T10: oesophagus and vagal trunks), aortic (T12: aorta, thoracic duct, azygos vein)" },
      { label: "Nerve roots", value: "C3, C4, C5 'keep the diaphragm alive'" },
      { label: "Movement", value: "About 1–2 cm in quiet breathing; several centimetres in deep breathing" },
    ],
    origin: "Sternal part: back of the xiphoid process; costal part: inner surfaces of the lower six costal cartilages and adjoining ribs; lumbar part: medial and lateral arcuate ligaments and the bodies of L1–L3 (right crus) and L1–L2 (left crus)",
    insertion: "Central tendon",
    action: "Draws the central tendon downward, increasing the vertical dimension of the thorax (inspiration); raises intra-abdominal pressure",
    innervation: "Phrenic nerves (C3–C5) — all motor supply; the periphery also receives sensory fibres from the lower intercostal and subcostal nerves",
    bloodSupply: "Superior phrenic arteries (thoracic aorta), pericardiacophrenic and musculophrenic arteries (internal thoracic artery), and inferior phrenic arteries (abdominal aorta)",
    connections: [
      { concept: "xiphoid-process", relation: "attaches-to", note: "origin: sternal part" },
      { concept: "seventh-costal-cartilage", relation: "attaches-to", note: "origin: costal part (lower six cartilages)" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "origin: costal part and lateral arcuate ligament" },
      { concept: "first-lumbar-vertebra", relation: "attaches-to", note: "origin: crura" },
      { concept: "second-lumbar-vertebra", relation: "attaches-to", note: "origin: crura" },
      { concept: "third-lumbar-vertebra", relation: "attaches-to", note: "origin: right crus" },
      { concept: "phrenic-nerve", relation: "innervated-by", note: "sole motor supply (C3–C5)" },
      { concept: "intercostal-nerves", relation: "innervated-by", note: "sensory to the periphery" },
      { concept: "phrenic-arteries", relation: "supplied-by", note: "superior and inferior phrenic arteries" },
      { concept: "internal-thoracic-artery", relation: "supplied-by", note: "pericardiacophrenic and musculophrenic branches" },
      { concept: "phrenic-veins", relation: "drained-by" },
      { concept: "inferior-vena-cava", relation: "adjacent-to", note: "passes through the caval opening (T8)" },
      { concept: "esophagus", relation: "adjacent-to", note: "passes through the oesophageal hiatus (T10)" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "passes behind it through the aortic hiatus (T12)" },
      { concept: "vagus-nerve-cn-x", relation: "adjacent-to", note: "vagal trunks pass with the oesophagus" },
      { concept: "psoas-major", relation: "adjacent-to", note: "medial arcuate ligament arches over it" },
    ],
    clinical:
      "Irritation of the diaphragm (e.g. by blood or pus beneath it) causes pain referred to the shoulder tip via the C3–C5 phrenic nerve; part of the stomach can herniate through the oesophageal hiatus (hiatal hernia).",
  },

  // ─────────────────────────── Abdominal wall ───────────────────────────
  "external-oblique": {
    summary:
      "The largest and most superficial of the three flat muscles of the side and front of the abdomen. Its fibres run downward and medially ('hands in pockets'), and its lower border folds under to form the inguinal ligament.",
    functions: [
      "Compresses and supports the abdominal organs",
      "Flexes the trunk and rotates it to the opposite side",
      "Bends the trunk to the same side",
      "Assists forced expiration",
    ],
    facts: [
      { label: "Inguinal ligament", value: "Formed by its folded lower aponeurotic border" },
      { label: "Superficial inguinal ring", value: "An opening in its aponeurosis" },
    ],
    origin: "External surfaces of the 5th–12th ribs",
    insertion: "Linea alba, pubic tubercle and anterior half of the iliac crest (largely via its aponeurosis)",
    action: "Compresses and supports the abdominal viscera; flexes the trunk and rotates it to the opposite side",
    innervation: "Thoraco-abdominal nerves (anterior rami of T7–T11) and subcostal nerve (T12)",
    bloodSupply: "Lower posterior intercostal and subcostal arteries; superior and inferior epigastric arteries; deep circumflex iliac artery",
    connections: [
      { concept: "fifth-rib", relation: "attaches-to", note: "origin: highest slip (ribs 5–12)" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "origin: lowest slip (ribs 5–12)" },
      { concept: "linea-alba", relation: "attaches-to", note: "insertion via aponeurosis" },
      { concept: "hip-bone", relation: "attaches-to", note: "insertion: iliac crest and pubic tubercle" },
      { concept: "intercostal-nerves", relation: "innervated-by", note: "thoraco-abdominal (T7–T11) and subcostal nerves" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "lower posterior intercostal arteries" },
      { concept: "external-iliac-artery", relation: "supplied-by", note: "via inferior epigastric and deep circumflex iliac arteries" },
      { concept: "internal-oblique", relation: "adjacent-to", note: "lies deep to it; fibres roughly perpendicular" },
      { concept: "rectus-abdominis", relation: "adjacent-to", note: "its aponeurosis forms the front of the rectus sheath" },
      { concept: "serratus-anterior", relation: "adjacent-to", note: "upper slips interdigitate" },
      { concept: "latissimus-dorsi", relation: "adjacent-to", note: "lower slips interdigitate" },
    ],
    clinical:
      "The superficial inguinal ring, a gap in its aponeurosis above the pubic tubercle, is where an inguinal hernia emerges into the groin or scrotum.",
  },

  "internal-oblique": {
    summary:
      "The middle of the three flat muscles of the abdominal wall. Its fibres fan upward and medially, roughly at right angles to those of the external oblique.",
    functions: [
      "Compresses and supports the abdominal organs",
      "Flexes the trunk and rotates it to the same side",
      "Bends the trunk to the same side",
    ],
    facts: [
      { label: "Conjoint tendon", value: "Formed with transversus abdominis; reinforces the inguinal canal" },
      { label: "Cremaster", value: "The cremaster muscle of the spermatic cord derives from it" },
    ],
    origin: "Thoracolumbar fascia, anterior two-thirds of the iliac crest and connective tissue deep to the lateral part of the inguinal ligament",
    insertion: "Inferior borders of the 10th–12th ribs, linea alba, and pubic crest and pecten pubis via the conjoint tendon",
    action: "Compresses and supports the abdominal viscera; flexes the trunk and rotates it to the same side",
    innervation: "Thoraco-abdominal nerves (T7–T11), subcostal nerve (T12) and first lumbar nerve (iliohypogastric and ilioinguinal nerves)",
    bloodSupply: "Lower posterior intercostal and subcostal arteries; superior and inferior epigastric arteries; deep circumflex iliac artery",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: iliac crest; insertion: pubic crest via conjoint tendon" },
      { concept: "tenth-rib", relation: "attaches-to", note: "insertion" },
      { concept: "eleventh-rib", relation: "attaches-to", note: "insertion" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "insertion" },
      { concept: "linea-alba", relation: "attaches-to", note: "insertion via aponeurosis" },
      { concept: "intercostal-nerves", relation: "innervated-by", note: "thoraco-abdominal and subcostal nerves" },
      { concept: "lumbar-plexus", relation: "innervated-by", note: "iliohypogastric and ilioinguinal nerves (L1)" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "lower posterior intercostal arteries" },
      { concept: "external-iliac-artery", relation: "supplied-by", note: "via inferior epigastric and deep circumflex iliac arteries" },
      { concept: "external-oblique", relation: "adjacent-to", note: "superficial layer" },
      { concept: "transversus-abdominis", relation: "adjacent-to", note: "deep layer; nerves run between them" },
      { concept: "rectus-abdominis", relation: "adjacent-to", note: "its aponeurosis splits to enclose the rectus above the arcuate line" },
    ],
    clinical:
      "With transversus abdominis it forms the conjoint tendon that reinforces the back wall of the inguinal canal; weakness here predisposes to direct inguinal hernia.",
  },

  "transversus-abdominis": {
    summary:
      "The deepest of the three flat abdominal muscles, with fibres running horizontally around the abdomen like a corset. It is a key 'core' muscle that stabilises the lumbar spine.",
    functions: [
      "Compresses the abdominal contents, raising intra-abdominal pressure",
      "Stabilises the lumbar spine and pelvis before limb movements",
      "Assists forced expiration",
    ],
    origin: "Internal surfaces of the 7th–12th costal cartilages, thoracolumbar fascia, iliac crest and connective tissue deep to the lateral third of the inguinal ligament",
    insertion: "Linea alba (with the internal oblique aponeurosis), pubic crest and pecten pubis via the conjoint tendon",
    action: "Compresses and supports the abdominal viscera; stabilises the trunk",
    innervation: "Thoraco-abdominal nerves (T7–T11), subcostal nerve (T12) and first lumbar nerve (L1)",
    bloodSupply: "Lower posterior intercostal and subcostal arteries; superior and inferior epigastric arteries; deep circumflex iliac artery",
    connections: [
      { concept: "seventh-costal-cartilage", relation: "attaches-to", note: "origin: costal cartilages 7–12" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "origin: lowest costal slip" },
      { concept: "hip-bone", relation: "attaches-to", note: "origin: iliac crest; insertion: pubic crest" },
      { concept: "linea-alba", relation: "attaches-to", note: "insertion via aponeurosis" },
      { concept: "intercostal-nerves", relation: "innervated-by", note: "thoraco-abdominal and subcostal nerves" },
      { concept: "lumbar-plexus", relation: "innervated-by", note: "L1 (iliohypogastric and ilioinguinal nerves)" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "lower posterior intercostal arteries" },
      { concept: "external-iliac-artery", relation: "supplied-by", note: "via inferior epigastric and deep circumflex iliac arteries" },
      { concept: "internal-oblique", relation: "adjacent-to", note: "the abdominal wall nerves run between them" },
      { concept: "diaphragm", relation: "adjacent-to", note: "costal slips interdigitate" },
      { concept: "rectus-abdominis", relation: "adjacent-to", note: "its aponeurosis helps form the rectus sheath" },
    ],
    clinical:
      "The nerves supplying the abdominal wall run between internal oblique and transversus abdominis; local anaesthetic injected into this plane (a TAP block) numbs the abdominal wall after surgery.",
  },

  "rectus-abdominis": {
    summary:
      "A long, strap-like muscle on each side of the midline of the abdomen, enclosed in the rectus sheath. Tendinous intersections divide it into segments, producing the 'six-pack' appearance in lean people.",
    functions: [
      "Flexes the trunk (e.g. sit-ups, curling forward)",
      "Compresses the abdominal organs",
      "Controls tilt of the pelvis and stabilises the trunk",
    ],
    facts: [
      { label: "Tendinous intersections", value: "Usually three, fused to the front of the rectus sheath" },
      { label: "Arterial anastomosis", value: "Superior and inferior epigastric arteries meet within it" },
    ],
    origin: "Pubic symphysis and pubic crest",
    insertion: "Xiphoid process and 5th–7th costal cartilages",
    action: "Flexes the trunk (lumbar spine); compresses the abdominal viscera; stabilises and controls tilt of the pelvis",
    innervation: "Thoraco-abdominal nerves (anterior rami of T7–T11) and subcostal nerve (T12)",
    bloodSupply: "Superior epigastric artery (from the internal thoracic artery) and inferior epigastric artery (from the external iliac artery)",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: pubic crest and symphysis" },
      { concept: "xiphoid-process", relation: "attaches-to", note: "insertion" },
      { concept: "fifth-costal-cartilage", relation: "attaches-to", note: "insertion" },
      { concept: "sixth-costal-cartilage", relation: "attaches-to", note: "insertion" },
      { concept: "seventh-costal-cartilage", relation: "attaches-to", note: "insertion" },
      { concept: "intercostal-nerves", relation: "innervated-by", note: "thoraco-abdominal and subcostal nerves" },
      { concept: "internal-thoracic-artery", relation: "supplied-by", note: "via the superior epigastric artery" },
      { concept: "external-iliac-artery", relation: "supplied-by", note: "via the inferior epigastric artery" },
      { concept: "linea-alba", relation: "adjacent-to", note: "separates the left and right muscles" },
      { concept: "external-oblique", relation: "adjacent-to", note: "aponeurosis forms the rectus sheath" },
      { concept: "internal-oblique", relation: "adjacent-to", note: "aponeurosis forms the rectus sheath" },
      { concept: "transversus-abdominis", relation: "adjacent-to", note: "aponeurosis forms the rectus sheath" },
    ],
    clinical:
      "The two recti can separate along the linea alba during and after pregnancy (diastasis recti); the muscle with its epigastric vessels can also be used as a flap for breast reconstruction.",
  },

  "linea-alba": {
    summary:
      "A tendinous seam in the midline of the abdomen running from the xiphoid process to the pubic symphysis, formed where the aponeuroses of the three flat abdominal muscles interlace. It separates the left and right rectus abdominis and contains the umbilical ring.",
    latin: "Linea alba ('white line')",
    functions: [
      "Anchors the aponeuroses of the flat abdominal muscles in the midline",
      "Holds the two rectus sheaths together",
      "Transmits tension across the front of the abdominal wall",
    ],
    facts: [
      { label: "Extent", value: "Xiphoid process to pubic symphysis" },
      { label: "Shape", value: "Wider above the umbilicus, narrow below it" },
    ],
    connections: [
      { concept: "xiphoid-process", relation: "attaches-to", note: "upper attachment" },
      { concept: "hip-bone", relation: "attaches-to", note: "lower attachment: pubic symphysis and crest" },
      { concept: "external-oblique", relation: "attaches-to", note: "aponeurosis interlaces here" },
      { concept: "internal-oblique", relation: "attaches-to", note: "aponeurosis interlaces here" },
      { concept: "transversus-abdominis", relation: "attaches-to", note: "aponeurosis interlaces here" },
      { concept: "rectus-abdominis", relation: "adjacent-to", note: "separates the left and right recti" },
    ],
    clinical:
      "Being relatively avascular, it is a common route for midline surgical incisions; weak spots give rise to epigastric or umbilical hernias, and it widens in diastasis recti.",
  },

  // ─────────────────────────── Pelvic floor ───────────────────────────
  "levator-ani": {
    summary:
      "A broad, thin muscular sheet forming most of the pelvic floor (pelvic diaphragm). It has three parts — puborectalis, pubococcygeus and iliococcygeus — that support the pelvic organs and help maintain continence.",
    functions: [
      "Supports the pelvic organs and resists rises in abdominal pressure (coughing, lifting)",
      "Puborectalis slings the anorectal junction forward, keeping the anorectal angle for faecal continence",
      "Relaxes to allow defecation and urination",
      "Contributes to urinary continence",
    ],
    facts: [
      { label: "Parts", value: "Puborectalis, pubococcygeus and iliococcygeus" },
      { label: "Pelvic diaphragm", value: "Levator ani + coccygeus" },
    ],
    origin: "Body of the pubis, tendinous arch of the obturator fascia (tendinous arch of levator ani) and ischial spine",
    insertion: "Perineal body, anococcygeal body, coccyx, and the walls of the prostate (or vagina), rectum and anal canal",
    action: "Supports the pelvic viscera, resists increased intra-abdominal pressure and helps maintain faecal and urinary continence",
    innervation: "Nerve to levator ani (branches of S4), inferior anal (rectal) nerve from the pudendal nerve, and the coccygeal plexus",
    bloodSupply: "Inferior gluteal, internal pudendal and inferior vesical arteries (branches of the internal iliac artery)",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: pubis and ischial spine" },
      { concept: "tendinous-arch-of-levator-ani", relation: "attaches-to", note: "origin" },
      { concept: "coccyx", relation: "attaches-to", note: "insertion (with the anococcygeal body)" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "S4 branches and the pudendal nerve" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via inferior gluteal, internal pudendal and inferior vesical arteries" },
      { concept: "rectum", relation: "adjacent-to", note: "puborectalis slings the anorectal junction" },
      { concept: "prostate", relation: "adjacent-to", note: "supported by its most medial fibres" },
      { concept: "urethra", relation: "adjacent-to", note: "passes through the urogenital hiatus" },
      { concept: "external-anal-sphincter", relation: "adjacent-to", note: "blends with puborectalis" },
      { concept: "obturator-internus", relation: "adjacent-to", note: "arises from its fascia" },
      { concept: "coccygeus", relation: "adjacent-to", note: "completes the pelvic diaphragm posteriorly" },
    ],
    clinical:
      "Stretching or tearing of levator ani during vaginal childbirth weakens the pelvic floor and predisposes to pelvic organ prolapse and stress urinary incontinence; pelvic floor (Kegel) exercises strengthen it.",
    sexDifferences:
      "In females the gap between the two muscles (urogenital hiatus) is wider and transmits the vagina as well as the urethra; fibres that support the vagina (pubovaginalis) correspond to those supporting the prostate in males (levator prostatae).",
  },

  "tendinous-arch-of-levator-ani": {
    summary:
      "A thickened band in the fascia covering obturator internus, running from the back of the pubis to the ischial spine. It gives origin to much of levator ani, anchoring the pelvic floor to the side wall of the pelvis.",
    latin: "Arcus tendineus musculi levatoris ani",
    functions: [
      "Provides a lateral anchoring line for levator ani (pubococcygeus and iliococcygeus)",
      "Transfers tension in the pelvic floor to the bony pelvis",
    ],
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "back of the pubis in front; ischial spine behind" },
      { concept: "obturator-internus", relation: "adjacent-to", note: "a thickening of the fascia covering it" },
      { concept: "levator-ani", relation: "attaches-to", note: "gives origin to the muscle" },
      { concept: "coccygeus", relation: "adjacent-to", note: "lies behind its posterior end at the ischial spine" },
    ],
    clinical:
      "It lies just above the tendinous arch of the pelvic fascia, which supports the vagina and bladder; weakening of these lateral pelvic-wall supports contributes to pelvic organ prolapse.",
  },

  coccygeus: {
    summary:
      "A small, triangular muscle forming the back part of the pelvic diaphragm, lying on the pelvic surface of the sacrospinous ligament.",
    latin: "Musculus ischiococcygeus",
    functions: [
      "Completes the pelvic floor behind levator ani",
      "Supports the pelvic organs",
      "Flexes the coccyx",
    ],
    facts: [{ label: "Sacrospinous ligament", value: "Lies against (and may be a regressed part of) this muscle" }],
    origin: "Ischial spine",
    insertion: "Lateral borders of the lower sacrum and coccyx",
    action: "Forms part of the pelvic diaphragm supporting the pelvic viscera; flexes the coccyx",
    innervation: "Branches of the anterior rami of S4–S5",
    bloodSupply: "Inferior gluteal and internal pudendal arteries",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: ischial spine" },
      { concept: "sacrum", relation: "attaches-to", note: "insertion: lower lateral border" },
      { concept: "coccyx", relation: "attaches-to", note: "insertion: lateral border" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "S4–S5 branches" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via inferior gluteal and internal pudendal arteries" },
      { concept: "levator-ani", relation: "adjacent-to", note: "together form the pelvic diaphragm" },
      { concept: "piriformis", relation: "adjacent-to", note: "lies just above it" },
    ],
  },

  "external-anal-sphincter": {
    summary:
      "A ring of voluntary skeletal muscle surrounding the lower anal canal, with subcutaneous, superficial and deep parts. It lets us consciously keep the anus closed until defecation is convenient.",
    functions: [
      "Voluntarily closes the anal canal",
      "Maintains faecal continence with the internal anal sphincter and puborectalis",
      "Contracts reflexly when abdominal pressure rises (e.g. coughing)",
    ],
    facts: [
      { label: "Parts", value: "Subcutaneous, superficial and deep" },
      { label: "Control", value: "Voluntary (skeletal muscle), unlike the smooth internal anal sphincter" },
    ],
    origin: "Skin and fascia around the anus, and the coccyx via the anococcygeal body",
    insertion: "Perineal body",
    action: "Constricts the anal canal, resisting defecation; supports the perineal body",
    innervation: "Inferior anal (rectal) nerves from the pudendal nerve (S2–S4, mainly S4)",
    bloodSupply: "Inferior rectal arteries (from the internal pudendal artery)",
    connections: [
      { concept: "rectum", relation: "adjacent-to", note: "surrounds the anal canal just below the rectum" },
      { concept: "levator-ani", relation: "adjacent-to", note: "deep part blends with puborectalis" },
      { concept: "coccyx", relation: "attaches-to", note: "via the anococcygeal body" },
      { concept: "skin", relation: "attaches-to", note: "subcutaneous part: perianal skin" },
      { concept: "sacral-plexus", relation: "innervated-by", note: "via the pudendal nerve" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "via internal pudendal and inferior rectal arteries" },
      { concept: "internal-pudendal-vein", relation: "drained-by" },
    ],
    clinical:
      "Tears of the sphincter during childbirth (third- and fourth-degree perineal tears) can cause faecal incontinence; the 'anal wink' reflex tests its S2–S4 innervation.",
  },

  // ─────────────────────────── Shoulder ───────────────────────────
  deltoid: {
    summary:
      "The thick, triangular muscle that forms the rounded contour of the shoulder. Its anterior, middle and posterior parts can act separately to flex, abduct or extend the arm.",
    functions: [
      "Abducts the arm (middle part) after supraspinatus starts the movement",
      "Flexes and medially rotates the arm (anterior part)",
      "Extends and laterally rotates the arm (posterior part)",
      "Helps prevent downward dislocation of the shoulder when carrying loads",
    ],
    facts: [
      { label: "Parts", value: "Clavicular (anterior), acromial (middle), spinal (posterior)" },
      { label: "Muscle type", value: "Acromial part is multipennate (strong but short-range)" },
    ],
    origin: "Lateral third of the clavicle, acromion and spine of the scapula",
    insertion: "Deltoid tuberosity of the humerus",
    action: "Anterior part flexes and medially rotates, middle part abducts, posterior part extends and laterally rotates the arm",
    innervation: "Axillary nerve (C5–C6)",
    bloodSupply: "Posterior circumflex humeral artery; deltoid branch of the thoraco-acromial artery; anterior circumflex humeral artery",
    connections: [
      { concept: "clavicle", relation: "attaches-to", note: "origin: lateral third" },
      { concept: "scapula", relation: "attaches-to", note: "origin: acromion and spine" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: deltoid tuberosity (moves the arm at the shoulder)" },
      { concept: "axillary-nerve", relation: "innervated-by" },
      { concept: "posterior-circumflex-humeral-artery", relation: "supplied-by" },
      { concept: "thoraco-acromial-artery", relation: "supplied-by", note: "deltoid branch" },
      { concept: "anterior-circumflex-humeral-artery", relation: "supplied-by" },
      { concept: "supraspinatus", relation: "adjacent-to", note: "initiates abduction for it" },
      { concept: "pectoralis-major", relation: "adjacent-to", note: "deltopectoral groove between them" },
      { concept: "cephalic-vein", relation: "adjacent-to", note: "runs in the deltopectoral groove" },
      { concept: "trapezius", relation: "adjacent-to", note: "shares the same bony attachments" },
    ],
    clinical:
      "The axillary nerve can be damaged in fractures of the surgical neck of the humerus or shoulder dislocation, paralysing deltoid and numbing skin over the lower deltoid ('regimental badge' area); deltoid is also a common injection site.",
  },

  supraspinatus: {
    summary:
      "A rotator cuff muscle filling the supraspinous fossa above the spine of the scapula. Its tendon passes beneath the acromion to the top of the humerus and it starts the movement of raising the arm sideways.",
    functions: [
      "Initiates abduction of the arm (roughly the first 15°) and then assists deltoid",
      "Holds the head of the humerus in the glenoid cavity (rotator cuff)",
    ],
    facts: [{ label: "Rotator cuff", value: "One of four SITS muscles (supraspinatus, infraspinatus, teres minor, subscapularis)" }],
    origin: "Supraspinous fossa of the scapula",
    insertion: "Superior facet of the greater tubercle of the humerus",
    action: "Initiates and assists abduction of the arm; stabilises the glenohumeral joint",
    innervation: "Suprascapular nerve (C5–C6, with some C4)",
    bloodSupply: "Suprascapular artery",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin: supraspinous fossa" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: greater tubercle" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "suprascapular nerve from the upper trunk" },
      { concept: "suprascapular-artery", relation: "supplied-by" },
      { concept: "suprascapular-vein", relation: "drained-by" },
      { concept: "deltoid", relation: "adjacent-to", note: "synergist in abduction" },
      { concept: "trapezius", relation: "adjacent-to", note: "covers it" },
      { concept: "infraspinatus", relation: "adjacent-to", note: "rotator cuff partner" },
    ],
    clinical:
      "It is the most frequently torn rotator cuff tendon; pinching of the tendon under the acromion (impingement) causes pain on raising the arm, typically between about 60° and 120° (painful arc).",
  },

  infraspinatus: {
    summary:
      "A thick, triangular rotator cuff muscle occupying most of the infraspinous fossa on the back of the scapula. It is the main lateral rotator of the arm.",
    functions: [
      "Laterally rotates the arm",
      "Holds the head of the humerus in the glenoid cavity (rotator cuff)",
    ],
    origin: "Infraspinous fossa of the scapula",
    insertion: "Middle facet of the greater tubercle of the humerus",
    action: "Laterally rotates the arm; stabilises the glenohumeral joint",
    innervation: "Suprascapular nerve (C5–C6)",
    bloodSupply: "Suprascapular and circumflex scapular arteries",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin: infraspinous fossa" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: greater tubercle" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "suprascapular nerve" },
      { concept: "suprascapular-artery", relation: "supplied-by" },
      { concept: "circumflex-scapular-artery", relation: "supplied-by" },
      { concept: "teres-minor", relation: "adjacent-to", note: "synergist just below it" },
      { concept: "supraspinatus", relation: "adjacent-to" },
      { concept: "deltoid", relation: "adjacent-to", note: "covers its lateral part" },
    ],
    clinical:
      "Compression of the suprascapular nerve at the spinoglenoid notch (e.g. by a ganglion cyst) causes isolated wasting and weakness of infraspinatus.",
  },

  "teres-minor": {
    summary:
      "A narrow rotator cuff muscle lying along the lateral border of the scapula just below infraspinatus. Unlike the other cuff muscles, it is supplied by the axillary nerve.",
    functions: [
      "Laterally rotates the arm",
      "Holds the head of the humerus in the glenoid cavity (rotator cuff)",
    ],
    facts: [{ label: "Quadrangular space", value: "Bounded by teres minor, teres major, long head of triceps and humerus; transmits the axillary nerve and posterior circumflex humeral vessels" }],
    origin: "Middle part of the lateral border of the scapula",
    insertion: "Inferior facet of the greater tubercle of the humerus",
    action: "Laterally rotates the arm; stabilises the glenohumeral joint",
    innervation: "Axillary nerve (C5–C6)",
    bloodSupply: "Circumflex scapular artery",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin: lateral border" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: greater tubercle" },
      { concept: "axillary-nerve", relation: "innervated-by" },
      { concept: "circumflex-scapular-artery", relation: "supplied-by" },
      { concept: "posterior-circumflex-humeral-artery", relation: "adjacent-to", note: "passes through the quadrangular space below it" },
      { concept: "infraspinatus", relation: "adjacent-to", note: "synergist" },
      { concept: "teres-major", relation: "adjacent-to", note: "the two bound the quadrangular and triangular spaces" },
      { concept: "triceps-brachii", relation: "adjacent-to", note: "long head passes between teres minor and major" },
    ],
    clinical:
      "Axillary nerve injury weakens teres minor along with deltoid; the nerve passes through the quadrangular space just below this muscle.",
  },

  subscapularis: {
    summary:
      "A large, triangular rotator cuff muscle filling the subscapular fossa on the front (rib-facing) surface of the scapula. It is the largest and strongest of the rotator cuff muscles and the only one in front of the joint.",
    functions: [
      "Medially rotates the arm",
      "Helps adduct the arm",
      "Holds the head of the humerus in the glenoid cavity, resisting anterior dislocation",
    ],
    facts: [{ label: "Size", value: "Largest and strongest rotator cuff muscle" }],
    origin: "Subscapular fossa (costal surface of the scapula)",
    insertion: "Lesser tubercle of the humerus",
    action: "Medially rotates and adducts the arm; stabilises the glenohumeral joint",
    innervation: "Upper and lower subscapular nerves (C5–C7)",
    bloodSupply: "Subscapular artery (with suprascapular and lateral thoracic contributions)",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin: subscapular fossa" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: lesser tubercle" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "upper and lower subscapular nerves (posterior cord)" },
      { concept: "subscapular-artery", relation: "supplied-by" },
      { concept: "subscapular-vein", relation: "drained-by" },
      { concept: "serratus-anterior", relation: "adjacent-to", note: "lies against it" },
      { concept: "teres-major", relation: "adjacent-to", note: "synergist in medial rotation" },
    ],
    clinical:
      "Its strength is tested with the lift-off or belly-press tests; subscapularis tears can accompany anterior shoulder dislocation, especially in older adults.",
  },

  "teres-major": {
    summary:
      "A thick, rounded muscle running from the lower angle of the scapula to the front of the humerus, closely partnering latissimus dorsi. Its lower border marks where the axillary artery becomes the brachial artery.",
    functions: [
      "Adducts the arm",
      "Medially rotates the arm",
      "Helps extend the arm from a flexed position",
    ],
    origin: "Posterior surface of the inferior angle of the scapula",
    insertion: "Medial lip of the intertubercular sulcus (crest of the lesser tubercle) of the humerus",
    action: "Adducts and medially rotates the arm; assists extension",
    innervation: "Lower subscapular nerve (C5–C6)",
    bloodSupply: "Thoracodorsal and circumflex scapular arteries",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin: inferior angle" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: medial lip of intertubercular sulcus" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "lower subscapular nerve" },
      { concept: "thoracodorsal-artery", relation: "supplied-by" },
      { concept: "circumflex-scapular-artery", relation: "supplied-by" },
      { concept: "latissimus-dorsi", relation: "adjacent-to", note: "synergist; tendons lie side by side" },
      { concept: "teres-minor", relation: "adjacent-to" },
      { concept: "triceps-brachii", relation: "adjacent-to", note: "long head passes between the teres muscles" },
      { concept: "brachial-artery", relation: "adjacent-to", note: "axillary artery becomes brachial at its lower border" },
    ],
    clinical:
      "It is a key landmark: the axillary artery is renamed the brachial artery at the inferior border of teres major.",
  },

  // ─────────────────────────── Arm ───────────────────────────
  "biceps-brachii": {
    summary:
      "The two-headed muscle on the front of the arm. It is a strong flexor of the elbow and the most powerful supinator of the forearm — the movement used to turn a screwdriver clockwise with the right hand.",
    functions: [
      "Supinates the forearm (turns the palm up), most powerfully with the elbow bent",
      "Flexes the elbow, especially when the forearm is supinated",
      "Weakly flexes the shoulder",
    ],
    facts: [
      { label: "Heads", value: "Long head (supraglenoid tubercle) and short head (coracoid process)" },
      { label: "Reflex", value: "Biceps jerk tests C5–C6" },
    ],
    origin: "Short head: tip of the coracoid process; long head: supraglenoid tubercle of the scapula (tendon runs inside the shoulder joint and through the intertubercular sulcus)",
    insertion: "Radial tuberosity and, via the bicipital aponeurosis, the deep fascia of the medial forearm",
    action: "Supinates the forearm and, when supine, flexes the elbow; weakly flexes the arm at the shoulder",
    innervation: "Musculocutaneous nerve (C5–C6)",
    bloodSupply: "Muscular branches of the brachial artery",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin: coracoid process and supraglenoid tubercle" },
      { concept: "radius", relation: "attaches-to", note: "insertion: radial tuberosity (supination)" },
      { concept: "ulna", relation: "acts-on", note: "elbow flexion (forearm)" },
      { concept: "musculocutaneous-nerve", relation: "innervated-by" },
      { concept: "brachial-artery", relation: "supplied-by", note: "muscular branches" },
      { concept: "brachialis", relation: "adjacent-to", note: "lies deep to it; synergist" },
      { concept: "coracobrachialis", relation: "adjacent-to", note: "shares the coracoid origin with the short head" },
      { concept: "triceps-brachii", relation: "adjacent-to", note: "antagonist" },
      { concept: "median-nerve", relation: "adjacent-to", note: "bicipital aponeurosis covers the nerve and brachial artery at the elbow" },
    ],
    clinical:
      "Rupture of the long-head tendon produces a 'Popeye' bulge in the lower arm; the bicipital aponeurosis protects the brachial artery and median nerve in the cubital fossa (e.g. during venepuncture).",
  },

  brachialis: {
    summary:
      "A broad muscle lying deep to biceps on the front of the lower arm. It is the main 'workhorse' flexor of the elbow, acting whatever the position of the forearm.",
    functions: ["Flexes the elbow in all positions of the forearm", "Supplies most of the force for slow, steady elbow flexion"],
    facts: [{ label: "Role", value: "Pure elbow flexor (not affected by forearm rotation)" }],
    origin: "Distal half of the anterior surface of the humerus",
    insertion: "Coronoid process and tuberosity of the ulna",
    action: "Flexes the elbow",
    innervation: "Musculocutaneous nerve (C5–C6); a small lateral part by the radial nerve (C7)",
    bloodSupply: "Muscular branches of the brachial artery; radial recurrent artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: distal anterior surface" },
      { concept: "ulna", relation: "attaches-to", note: "insertion: coronoid process and tuberosity" },
      { concept: "musculocutaneous-nerve", relation: "innervated-by" },
      { concept: "radial-nerve", relation: "innervated-by", note: "small lateral part" },
      { concept: "brachial-artery", relation: "supplied-by" },
      { concept: "radial-recurrent-artery", relation: "supplied-by" },
      { concept: "biceps-brachii", relation: "adjacent-to", note: "lies over it" },
      { concept: "brachioradialis", relation: "adjacent-to", note: "the radial nerve runs between them" },
    ],
    clinical:
      "After elbow fractures or dislocations, bleeding into brachialis can calcify (myositis ossificans), restricting elbow movement.",
  },

  coracobrachialis: {
    summary:
      "A slender muscle in the upper medial arm running from the coracoid process to the middle of the humerus. It is pierced by the musculocutaneous nerve.",
    functions: [
      "Helps flex the arm at the shoulder",
      "Helps adduct the arm",
      "Resists downward dislocation of the humeral head",
    ],
    origin: "Tip of the coracoid process of the scapula",
    insertion: "Middle third of the medial surface of the humerus",
    action: "Helps flex and adduct the arm; stabilises the shoulder",
    innervation: "Musculocutaneous nerve (C5–C7)",
    bloodSupply: "Muscular branches of the brachial artery",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin: coracoid process" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: medial shaft" },
      { concept: "musculocutaneous-nerve", relation: "innervated-by", note: "the nerve pierces the muscle" },
      { concept: "brachial-artery", relation: "supplied-by" },
      { concept: "axillary-artery", relation: "adjacent-to", note: "runs along its medial side" },
      { concept: "biceps-brachii", relation: "adjacent-to", note: "short head shares its origin" },
    ],
    clinical:
      "The musculocutaneous nerve pierces coracobrachialis, a useful landmark for finding the nerve during axillary nerve blocks.",
  },

  "triceps-brachii": {
    summary:
      "The large three-headed muscle on the back of the arm and the main extensor of the elbow. It is the only muscle of the posterior compartment of the arm.",
    functions: [
      "Extends (straightens) the elbow",
      "Long head helps extend and adduct the arm at the shoulder",
      "Steadies the shoulder joint",
    ],
    facts: [
      { label: "Heads", value: "Long, lateral and medial" },
      { label: "Reflex", value: "Triceps jerk tests C7 (C6–C8)" },
    ],
    origin: "Long head: infraglenoid tubercle of the scapula; lateral head: posterior humerus above the radial groove; medial head: posterior humerus below the radial groove",
    insertion: "Proximal end of the olecranon of the ulna and the fascia of the forearm",
    action: "Chief extensor of the elbow; long head also extends and adducts the arm",
    innervation: "Radial nerve (C6–C8)",
    bloodSupply: "Deep artery of the arm (profunda brachii); posterior circumflex humeral artery; superior ulnar collateral artery",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin (long head): infraglenoid tubercle" },
      { concept: "humerus", relation: "attaches-to", note: "origin (lateral and medial heads)" },
      { concept: "ulna", relation: "attaches-to", note: "insertion: olecranon (extends the elbow)" },
      { concept: "radial-nerve", relation: "innervated-by", note: "runs in the radial groove between its heads" },
      { concept: "deep-brachial-artery", relation: "supplied-by" },
      { concept: "posterior-circumflex-humeral-artery", relation: "supplied-by", note: "long head" },
      { concept: "superior-ulnar-collateral-artery", relation: "supplied-by" },
      { concept: "anconeus", relation: "adjacent-to", note: "assists elbow extension" },
      { concept: "biceps-brachii", relation: "adjacent-to", note: "antagonist" },
      { concept: "teres-major", relation: "adjacent-to", note: "long head passes in front of teres minor and behind teres major" },
    ],
    clinical:
      "The radial nerve lies in the radial groove between the lateral and medial head origins, where a mid-shaft humeral fracture can injure it (wrist drop).",
  },

  anconeus: {
    summary:
      "A small triangular muscle at the back of the elbow, partly blended with triceps. It helps extend the elbow and stabilise the joint.",
    functions: [
      "Assists triceps in extending the elbow",
      "Stabilises the elbow joint",
      "May move the ulna slightly outward during pronation",
    ],
    origin: "Lateral epicondyle of the humerus",
    insertion: "Lateral surface of the olecranon and upper posterior surface of the ulna",
    action: "Assists triceps in extending the elbow; stabilises the elbow",
    innervation: "Radial nerve (C7–T1)",
    bloodSupply: "Middle collateral branch of the deep artery of the arm; recurrent interosseous artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: lateral epicondyle" },
      { concept: "ulna", relation: "attaches-to", note: "insertion: olecranon" },
      { concept: "radial-nerve", relation: "innervated-by" },
      { concept: "deep-brachial-artery", relation: "supplied-by", note: "middle collateral branch" },
      { concept: "recurrent-interosseous-artery", relation: "supplied-by" },
      { concept: "triceps-brachii", relation: "adjacent-to", note: "blends with it" },
      { concept: "extensor-carpi-ulnaris", relation: "adjacent-to" },
    ],
  },

  // ─────────────────────────── Forearm: flexor-pronator group ───────────────────────────
  brachioradialis: {
    summary:
      "The most superficial muscle on the thumb side of the forearm, forming the lateral border of the cubital fossa. Although supplied by the radial (extensor) nerve, it is an elbow flexor.",
    functions: [
      "Flexes the elbow, most strongly with the forearm half-way between pronation and supination (e.g. hammering)",
      "Returns the forearm toward the mid-prone position",
    ],
    facts: [{ label: "Paradox", value: "An elbow flexor supplied by the radial nerve" }],
    origin: "Proximal two-thirds of the lateral supracondylar ridge of the humerus",
    insertion: "Lateral surface of the distal radius, just above the styloid process",
    action: "Flexes the elbow, especially in mid-pronation",
    innervation: "Radial nerve (C5–C6, with C7)",
    bloodSupply: "Radial recurrent artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: lateral supracondylar ridge" },
      { concept: "radius", relation: "attaches-to", note: "insertion: above the styloid process" },
      { concept: "radial-nerve", relation: "innervated-by" },
      { concept: "radial-recurrent-artery", relation: "supplied-by" },
      { concept: "radial-artery", relation: "adjacent-to", note: "lies under its medial edge in the forearm" },
      { concept: "brachialis", relation: "adjacent-to", note: "the radial nerve runs between them" },
      { concept: "extensor-carpi-radialis-longus", relation: "adjacent-to" },
      { concept: "pronator-teres", relation: "adjacent-to", note: "together bound the cubital fossa" },
    ],
    clinical:
      "The brachioradialis reflex tests mainly the C6 segment; in the forearm the muscle overlaps the radial artery and the superficial branch of the radial nerve.",
  },

  "pronator-teres": {
    summary:
      "A two-headed muscle crossing the front of the upper forearm obliquely and forming the medial border of the cubital fossa. The median nerve passes between its two heads.",
    functions: ["Pronates the forearm (turns the palm down)", "Assists elbow flexion"],
    facts: [{ label: "Cubital fossa", value: "Forms its medial boundary" }],
    origin: "Humeral head: medial epicondyle (common flexor origin); ulnar head: coronoid process of the ulna",
    insertion: "Middle of the lateral surface of the radius (pronator tuberosity)",
    action: "Pronates the forearm and flexes the elbow",
    innervation: "Median nerve (C6–C7)",
    bloodSupply: "Anterior ulnar recurrent artery; muscular branches of the ulnar and radial arteries",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: medial epicondyle" },
      { concept: "ulna", relation: "attaches-to", note: "origin: coronoid process" },
      { concept: "radius", relation: "attaches-to", note: "insertion: mid-lateral shaft (pronates)" },
      { concept: "median-nerve", relation: "innervated-by", note: "passes between its two heads" },
      { concept: "anterior-ulnar-recurrent-artery", relation: "supplied-by" },
      { concept: "ulnar-artery", relation: "supplied-by", note: "deep head separates it from the median nerve" },
      { concept: "pronator-quadratus", relation: "adjacent-to", note: "synergist" },
      { concept: "brachioradialis", relation: "adjacent-to", note: "together bound the cubital fossa" },
      { concept: "flexor-carpi-radialis", relation: "adjacent-to" },
    ],
    clinical:
      "The median nerve can be compressed between its two heads (pronator syndrome), causing forearm ache and numbness in the lateral fingers.",
  },

  "flexor-carpi-radialis": {
    summary:
      "A superficial forearm flexor running from the medial epicondyle to the base of the index-finger metacarpal. Its tendon is a key landmark at the wrist.",
    functions: ["Flexes the wrist", "Abducts (radially deviates) the wrist"],
    origin: "Medial epicondyle of the humerus (common flexor origin)",
    insertion: "Base of the 2nd metacarpal (and 3rd)",
    action: "Flexes and abducts the wrist",
    innervation: "Median nerve (C6–C7)",
    bloodSupply: "Muscular branches of the radial and ulnar arteries",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: medial epicondyle" },
      { concept: "second-metacarpal", relation: "attaches-to", note: "insertion: base" },
      { concept: "third-metacarpal", relation: "attaches-to", note: "insertion: base (slip)" },
      { concept: "median-nerve", relation: "innervated-by" },
      { concept: "radial-artery", relation: "supplied-by", note: "the radial pulse is felt just lateral to its tendon" },
      { concept: "ulnar-artery", relation: "supplied-by" },
      { concept: "flexor-retinaculum-of-wrist", relation: "adjacent-to", note: "tendon runs in a split within the retinaculum" },
      { concept: "trapezium-bone", relation: "adjacent-to", note: "tendon grooves the trapezium" },
      { concept: "palmaris-longus", relation: "adjacent-to" },
    ],
    clinical:
      "At the wrist its tendon is a key landmark: the radial pulse is felt just lateral to it.",
  },

  "palmaris-longus": {
    summary:
      "A small, spindle-shaped muscle with a long thin tendon that runs superficial to the flexor retinaculum into the palm. It is absent in a sizeable minority of people.",
    functions: ["Weakly flexes the wrist", "Tenses the palmar aponeurosis"],
    facts: [{ label: "Absent in", value: "Roughly 10–15% of people (one or both sides)" }],
    origin: "Medial epicondyle of the humerus (common flexor origin)",
    insertion: "Distal half of the flexor retinaculum and apex of the palmar aponeurosis",
    action: "Flexes the wrist and tenses the palmar aponeurosis",
    innervation: "Median nerve (C7–C8)",
    bloodSupply: "Muscular branches of the ulnar artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: medial epicondyle" },
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "insertion (superficial surface)" },
      { concept: "median-nerve", relation: "innervated-by", note: "the nerve lies just deep to its tendon at the wrist" },
      { concept: "ulnar-artery", relation: "supplied-by" },
      { concept: "flexor-carpi-radialis", relation: "adjacent-to" },
      { concept: "flexor-carpi-ulnaris", relation: "adjacent-to" },
    ],
    clinical:
      "Because it is often absent and expendable, its tendon is a favourite donor for tendon grafts; the median nerve lies just deep to it at the wrist.",
  },

  "flexor-carpi-ulnaris": {
    summary:
      "The most medial superficial flexor of the forearm, running to the pisiform. The ulnar nerve enters the forearm between its two heads.",
    functions: ["Flexes the wrist", "Adducts (ulnar deviates) the wrist", "Stabilises the pisiform for abductor digiti minimi"],
    facts: [{ label: "Pisiform", value: "A sesamoid bone within its tendon" }],
    origin: "Humeral head: medial epicondyle; ulnar head: olecranon and posterior border of the ulna",
    insertion: "Pisiform, hook of the hamate and base of the 5th metacarpal (via the pisohamate and pisometacarpal ligaments)",
    action: "Flexes and adducts the wrist",
    innervation: "Ulnar nerve (C7–C8)",
    bloodSupply: "Ulnar artery; posterior ulnar recurrent artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: medial epicondyle" },
      { concept: "ulna", relation: "attaches-to", note: "origin: olecranon and posterior border" },
      { concept: "pisiform-bone", relation: "attaches-to", note: "insertion" },
      { concept: "hamate-bone", relation: "attaches-to", note: "insertion via pisohamate ligament" },
      { concept: "fifth-metacarpal", relation: "attaches-to", note: "insertion via pisometacarpal ligament" },
      { concept: "ulnar-nerve", relation: "innervated-by", note: "enters the forearm between its heads" },
      { concept: "ulnar-artery", relation: "supplied-by" },
      { concept: "posterior-ulnar-recurrent-artery", relation: "supplied-by" },
      { concept: "extensor-carpi-ulnaris", relation: "adjacent-to", note: "synergist in wrist adduction" },
      { concept: "flexor-digitorum-profundus", relation: "adjacent-to", note: "lies over its medial part" },
    ],
    clinical:
      "The ulnar nerve can be compressed where it passes between the two heads of flexor carpi ulnaris (cubital tunnel syndrome), causing numbness of the little and ring fingers.",
  },

  "flexor-digitorum-superficialis": {
    summary:
      "The largest superficial forearm flexor, forming an intermediate layer between the superficial and deep muscles. Each of its four tendons splits to let the deeper flexor digitorum profundus tendon pass through.",
    functions: [
      "Flexes the middle (proximal interphalangeal) joints of the four fingers",
      "Assists flexion of the knuckles (MCP joints) and the wrist",
    ],
    facts: [{ label: "Test", value: "Hold the other fingers straight and ask the patient to bend one finger at the middle joint" }],
    origin: "Humero-ulnar head: medial epicondyle, ulnar collateral ligament and coronoid process; radial head: upper half of the anterior border of the radius",
    insertion: "Shafts of the middle phalanges of the medial four digits",
    action: "Flexes the proximal interphalangeal joints of the medial four digits; assists flexion at the MCP joints and wrist",
    innervation: "Median nerve (C7–T1)",
    bloodSupply: "Ulnar and radial arteries",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: medial epicondyle" },
      { concept: "ulna", relation: "attaches-to", note: "origin: coronoid process" },
      { concept: "radius", relation: "attaches-to", note: "origin: anterior border" },
      { concept: "phalanges-of-index-finger", relation: "attaches-to", note: "insertion: middle phalanx" },
      { concept: "phalanges-of-middle-finger", relation: "attaches-to", note: "insertion: middle phalanx" },
      { concept: "phalanges-of-ring-finger", relation: "attaches-to", note: "insertion: middle phalanx" },
      { concept: "phalanges-of-little-finger", relation: "attaches-to", note: "insertion: middle phalanx" },
      { concept: "median-nerve", relation: "innervated-by", note: "the nerve runs on its deep surface" },
      { concept: "ulnar-artery", relation: "supplied-by" },
      { concept: "radial-artery", relation: "supplied-by" },
      { concept: "flexor-digitorum-profundus", relation: "adjacent-to", note: "its tendons pass through FDS's split tendons" },
      { concept: "flexor-retinaculum-of-wrist", relation: "adjacent-to", note: "tendons pass through the carpal tunnel" },
    ],
    clinical:
      "Its four tendons pass through the carpal tunnel with those of flexor digitorum profundus and flexor pollicis longus; swelling of their sheaths can compress the median nerve (carpal tunnel syndrome).",
  },

  "flexor-digitorum-profundus": {
    summary:
      "A deep forearm flexor arising from the ulna whose tendons reach the fingertips. It is the only muscle that can bend the end joints of the fingers, and its tendons give origin to the lumbrical muscles of the hand.",
    functions: [
      "Flexes the distal interphalangeal joints (fingertips) of the four fingers",
      "Assists flexion of the other finger joints and the wrist",
      "Provides the origin for the lumbricals",
    ],
    facts: [
      { label: "Dual innervation", value: "Ulnar nerve (ring and little fingers); anterior interosseous branch of the median nerve (index and middle fingers)" },
    ],
    origin: "Proximal three-quarters of the medial and anterior surfaces of the ulna and the interosseous membrane",
    insertion: "Bases of the distal phalanges of the medial four digits",
    action: "Flexes the distal interphalangeal joints of the medial four digits; assists flexion of the hand",
    innervation: "Medial part: ulnar nerve (C8–T1); lateral part: anterior interosseous nerve from the median nerve (C8–T1)",
    bloodSupply: "Anterior interosseous artery and muscular branches of the ulnar artery",
    connections: [
      { concept: "ulna", relation: "attaches-to", note: "origin: anterior and medial surfaces" },
      { concept: "interosseous-membrane-of-forearm", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-index-finger", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "phalanges-of-middle-finger", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "phalanges-of-ring-finger", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "phalanges-of-little-finger", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "ulnar-nerve", relation: "innervated-by", note: "medial part" },
      { concept: "median-nerve", relation: "innervated-by", note: "lateral part via anterior interosseous nerve" },
      { concept: "anterior-interosseous-artery", relation: "supplied-by" },
      { concept: "ulnar-artery", relation: "supplied-by" },
      { concept: "flexor-digitorum-superficialis", relation: "adjacent-to", note: "lies superficial to it" },
      { concept: "flexor-pollicis-longus", relation: "adjacent-to", note: "lateral neighbour" },
      { concept: "intrinsic-muscles-of-hand", relation: "adjacent-to", note: "lumbricals arise from its tendons" },
    ],
    clinical:
      "Avulsion of its tendon from the distal phalanx, usually of the ring finger when grabbing an opponent's shirt ('jersey finger'), leaves the patient unable to bend that fingertip.",
  },

  "flexor-pollicis-longus": {
    summary:
      "A deep forearm muscle lying beside flexor digitorum profundus whose tendon runs through the carpal tunnel to the tip of the thumb. It is the only muscle that flexes the thumb's end joint.",
    functions: [
      "Flexes the interphalangeal joint of the thumb",
      "Assists flexion of the thumb's other joints (important in pinch grip)",
    ],
    origin: "Anterior surface of the radius and the adjacent interosseous membrane",
    insertion: "Base of the distal phalanx of the thumb",
    action: "Flexes the phalanges of the thumb",
    innervation: "Anterior interosseous nerve from the median nerve (C8–T1)",
    bloodSupply: "Anterior interosseous artery",
    connections: [
      { concept: "radius", relation: "attaches-to", note: "origin: anterior surface" },
      { concept: "interosseous-membrane-of-forearm", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-thumb", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "median-nerve", relation: "innervated-by", note: "via the anterior interosseous nerve" },
      { concept: "anterior-interosseous-artery", relation: "supplied-by" },
      { concept: "flexor-digitorum-profundus", relation: "adjacent-to" },
      { concept: "pronator-quadratus", relation: "adjacent-to", note: "lies over it distally" },
      { concept: "flexor-retinaculum-of-wrist", relation: "adjacent-to", note: "tendon passes through the carpal tunnel" },
    ],
    clinical:
      "In anterior interosseous nerve palsy, loss of FPL and the index part of FDP prevents making a round 'OK' sign with the thumb and index finger.",
  },

  "pronator-quadratus": {
    summary:
      "A flat, square muscle lying deepest in the front of the lower forearm, joining the ulna to the radius. It is the prime mover of pronation.",
    functions: [
      "Pronates the forearm (prime mover)",
      "Holds the lower ends of the radius and ulna together",
    ],
    facts: [{ label: "Role", value: "Prime mover of pronation; pronator teres assists for speed or power" }],
    origin: "Distal quarter of the anterior surface of the ulna",
    insertion: "Distal quarter of the anterior surface of the radius",
    action: "Pronates the forearm; binds the radius and ulna together",
    innervation: "Anterior interosseous nerve from the median nerve (C8–T1)",
    bloodSupply: "Anterior interosseous artery",
    connections: [
      { concept: "ulna", relation: "attaches-to", note: "origin: distal anterior surface" },
      { concept: "radius", relation: "attaches-to", note: "insertion: distal anterior surface (pronates)" },
      { concept: "median-nerve", relation: "innervated-by", note: "via the anterior interosseous nerve" },
      { concept: "anterior-interosseous-artery", relation: "supplied-by" },
      { concept: "pronator-teres", relation: "adjacent-to", note: "synergist" },
      { concept: "supinator", relation: "adjacent-to", note: "antagonist" },
      { concept: "flexor-pollicis-longus", relation: "adjacent-to", note: "lies over it" },
    ],
  },

  supinator: {
    summary:
      "A broad, sheet-like muscle wrapped around the upper radius in the back of the forearm. It supinates the forearm, and the deep branch of the radial nerve passes through it.",
    functions: [
      "Supinates the forearm (turns the palm up), especially slow or unresisted supination",
      "Works with biceps when supination is forceful",
    ],
    origin: "Lateral epicondyle of the humerus, radial collateral and annular ligaments, supinator fossa and crest of the ulna",
    insertion: "Lateral, posterior and anterior surfaces of the proximal third of the radius",
    action: "Supinates the forearm",
    innervation: "Deep branch of the radial nerve (C6–C7)",
    bloodSupply: "Radial recurrent and recurrent interosseous arteries",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: lateral epicondyle" },
      { concept: "ulna", relation: "attaches-to", note: "origin: supinator crest" },
      { concept: "radius", relation: "attaches-to", note: "insertion: proximal third (supinates)" },
      { concept: "radial-nerve", relation: "innervated-by", note: "deep branch passes through the muscle" },
      { concept: "radial-recurrent-artery", relation: "supplied-by" },
      { concept: "recurrent-interosseous-artery", relation: "supplied-by" },
      { concept: "biceps-brachii", relation: "adjacent-to", note: "synergist" },
      { concept: "pronator-teres", relation: "adjacent-to", note: "antagonist" },
    ],
    clinical:
      "The deep branch of the radial nerve can be compressed as it enters supinator (arcade of Frohse), weakening finger and thumb extension without sensory loss (posterior interosseous nerve syndrome).",
  },

  // ─────────────────────────── Forearm: extensor group ───────────────────────────
  "extensor-carpi-radialis-longus": {
    summary:
      "A long wrist extensor on the thumb side of the forearm, lying just behind brachioradialis. It keeps the wrist extended while the fingers grip.",
    functions: [
      "Extends the wrist",
      "Abducts (radially deviates) the wrist",
      "Holds the wrist extended during a power grip",
    ],
    origin: "Lateral supracondylar ridge of the humerus",
    insertion: "Dorsal surface of the base of the 2nd metacarpal",
    action: "Extends and abducts the wrist",
    innervation: "Radial nerve (C6–C7)",
    bloodSupply: "Radial artery and radial recurrent artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: lateral supracondylar ridge" },
      { concept: "second-metacarpal", relation: "attaches-to", note: "insertion: base" },
      { concept: "radial-nerve", relation: "innervated-by" },
      { concept: "radial-artery", relation: "supplied-by" },
      { concept: "radial-recurrent-artery", relation: "supplied-by" },
      { concept: "brachioradialis", relation: "adjacent-to" },
      { concept: "extensor-carpi-radialis-brevis", relation: "adjacent-to", note: "synergist" },
    ],
  },

  "extensor-carpi-radialis-brevis": {
    summary:
      "A shorter wrist extensor lying beneath extensor carpi radialis longus and arising from the common extensor origin on the lateral epicondyle.",
    functions: ["Extends the wrist", "Abducts (radially deviates) the wrist", "Stabilises the wrist during gripping"],
    origin: "Lateral epicondyle of the humerus (common extensor origin)",
    insertion: "Dorsal surface of the base of the 3rd metacarpal",
    action: "Extends and abducts the wrist",
    innervation: "Deep branch of the radial nerve (C7–C8)",
    bloodSupply: "Radial artery and radial recurrent artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: lateral epicondyle" },
      { concept: "third-metacarpal", relation: "attaches-to", note: "insertion: base" },
      { concept: "radial-nerve", relation: "innervated-by", note: "deep branch" },
      { concept: "radial-artery", relation: "supplied-by" },
      { concept: "radial-recurrent-artery", relation: "supplied-by" },
      { concept: "extensor-carpi-radialis-longus", relation: "adjacent-to", note: "synergist" },
      { concept: "extensor-digitorum", relation: "adjacent-to" },
    ],
    clinical:
      "Lateral epicondylitis ('tennis elbow') most commonly involves degeneration of the ECRB tendon at the lateral epicondyle.",
  },

  "extensor-digitorum": {
    summary:
      "The main extensor of the fingers, arising from the lateral epicondyle. Its four tendons fan out over the back of the hand into the extensor expansions of the fingers.",
    functions: [
      "Extends the four fingers, mainly at the knuckles (MCP joints)",
      "Helps extend the finger joints via the extensor expansions",
      "Assists wrist extension",
    ],
    origin: "Lateral epicondyle of the humerus (common extensor origin)",
    insertion: "Extensor expansions of the medial four digits (to the middle and distal phalanges)",
    action: "Extends the medial four digits at the MCP joints and, via the expansions, the IP joints; assists wrist extension",
    innervation: "Posterior interosseous nerve (C7–C8), the continuation of the deep branch of the radial nerve",
    bloodSupply: "Posterior interosseous artery (from the common interosseous artery)",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: lateral epicondyle" },
      { concept: "phalanges-of-index-finger", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "phalanges-of-middle-finger", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "phalanges-of-ring-finger", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "phalanges-of-little-finger", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "radial-nerve", relation: "innervated-by", note: "posterior interosseous nerve" },
      { concept: "common-interosseous-artery", relation: "supplied-by", note: "via the posterior interosseous artery" },
      { concept: "extensor-indicis", relation: "adjacent-to", note: "joins its index tendon" },
      { concept: "extensor-digiti-minimi", relation: "adjacent-to" },
      { concept: "extensor-carpi-radialis-brevis", relation: "adjacent-to" },
    ],
    clinical:
      "Disruption of the extensor tendon at the fingertip produces 'mallet finger', a drooping fingertip that cannot be actively straightened.",
  },

  "extensor-digiti-minimi": {
    summary:
      "A slender muscle, partly split off from extensor digitorum, that provides independent extension of the little finger.",
    functions: ["Extends the little finger independently", "Assists wrist extension"],
    origin: "Lateral epicondyle of the humerus (common extensor origin)",
    insertion: "Extensor expansion of the little finger",
    action: "Extends the little finger at the MCP and IP joints",
    innervation: "Posterior interosseous nerve (C7–C8)",
    bloodSupply: "Posterior interosseous artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: lateral epicondyle" },
      { concept: "phalanges-of-little-finger", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "radial-nerve", relation: "innervated-by", note: "posterior interosseous nerve" },
      { concept: "common-interosseous-artery", relation: "supplied-by", note: "via the posterior interosseous artery" },
      { concept: "extensor-digitorum", relation: "adjacent-to" },
      { concept: "extensor-carpi-ulnaris", relation: "adjacent-to" },
    ],
  },

  "extensor-carpi-ulnaris": {
    summary:
      "The most medial superficial extensor of the forearm, running along the ulna to the base of the little-finger metacarpal.",
    functions: ["Extends the wrist", "Adducts (ulnar deviates) the wrist", "Stabilises the wrist during gripping"],
    origin: "Lateral epicondyle of the humerus and posterior border of the ulna",
    insertion: "Dorsal surface of the base of the 5th metacarpal",
    action: "Extends and adducts the wrist",
    innervation: "Posterior interosseous nerve (C7–C8)",
    bloodSupply: "Posterior interosseous artery and branches of the ulnar artery",
    connections: [
      { concept: "humerus", relation: "attaches-to", note: "origin: lateral epicondyle" },
      { concept: "ulna", relation: "attaches-to", note: "origin: posterior border" },
      { concept: "fifth-metacarpal", relation: "attaches-to", note: "insertion: base" },
      { concept: "radial-nerve", relation: "innervated-by", note: "posterior interosseous nerve" },
      { concept: "common-interosseous-artery", relation: "supplied-by", note: "via the posterior interosseous artery" },
      { concept: "ulnar-artery", relation: "supplied-by" },
      { concept: "flexor-carpi-ulnaris", relation: "adjacent-to", note: "synergist in wrist adduction" },
      { concept: "anconeus", relation: "adjacent-to" },
      { concept: "extensor-digiti-minimi", relation: "adjacent-to" },
    ],
    clinical:
      "Its tendon runs in a groove on the ulnar head and can become inflamed or slip out of place in racquet sports, causing pain on the little-finger side of the wrist.",
  },

  "abductor-pollicis-longus": {
    summary:
      "A deep muscle of the back of the forearm whose tendon winds around the radius to the base of the thumb. With extensor pollicis brevis it forms the front border of the anatomical snuffbox.",
    functions: [
      "Abducts the thumb (moves it forward away from the palm)",
      "Extends the thumb at the carpometacarpal joint",
      "Assists wrist abduction",
    ],
    facts: [{ label: "Anatomical snuffbox", value: "APL and EPB tendons form its lateral (anterior) border" }],
    origin: "Posterior surfaces of the proximal halves of the ulna, radius and interosseous membrane",
    insertion: "Base of the 1st metacarpal (lateral side)",
    action: "Abducts the thumb and extends it at the carpometacarpal joint",
    innervation: "Posterior interosseous nerve (C7–C8)",
    bloodSupply: "Posterior interosseous artery",
    connections: [
      { concept: "ulna", relation: "attaches-to", note: "origin" },
      { concept: "radius", relation: "attaches-to", note: "origin" },
      { concept: "interosseous-membrane-of-forearm", relation: "attaches-to", note: "origin" },
      { concept: "first-metacarpal", relation: "attaches-to", note: "insertion: base" },
      { concept: "radial-nerve", relation: "innervated-by", note: "posterior interosseous nerve" },
      { concept: "common-interosseous-artery", relation: "supplied-by", note: "via the posterior interosseous artery" },
      { concept: "extensor-pollicis-brevis", relation: "adjacent-to", note: "shares the first extensor compartment" },
      { concept: "radial-artery", relation: "adjacent-to", note: "crosses the floor of the anatomical snuffbox" },
      { concept: "scaphoid-bone", relation: "adjacent-to", note: "forms the floor of the snuffbox" },
    ],
    clinical:
      "Inflammation of the APL and EPB tendons in their shared sheath at the wrist (De Quervain tenosynovitis) causes pain on the thumb side of the wrist, reproduced by Finkelstein's test.",
  },

  "extensor-pollicis-brevis": {
    summary:
      "A deep forearm muscle that extends the base of the thumb. Its tendon runs alongside abductor pollicis longus, forming the front border of the anatomical snuffbox.",
    functions: ["Extends the thumb at the MCP joint", "Assists extension at the carpometacarpal joint"],
    origin: "Posterior surface of the distal third of the radius and the interosseous membrane",
    insertion: "Dorsal surface of the base of the proximal phalanx of the thumb",
    action: "Extends the thumb at the MCP and carpometacarpal joints",
    innervation: "Posterior interosseous nerve (C7–C8)",
    bloodSupply: "Posterior interosseous artery",
    connections: [
      { concept: "radius", relation: "attaches-to", note: "origin: distal posterior surface" },
      { concept: "interosseous-membrane-of-forearm", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-thumb", relation: "attaches-to", note: "insertion: proximal phalanx" },
      { concept: "radial-nerve", relation: "innervated-by", note: "posterior interosseous nerve" },
      { concept: "common-interosseous-artery", relation: "supplied-by", note: "via the posterior interosseous artery" },
      { concept: "abductor-pollicis-longus", relation: "adjacent-to", note: "shares the first extensor compartment" },
      { concept: "extensor-pollicis-longus", relation: "adjacent-to", note: "together bound the anatomical snuffbox" },
      { concept: "radial-artery", relation: "adjacent-to", note: "in the snuffbox" },
    ],
    clinical:
      "Along with abductor pollicis longus it is involved in De Quervain tenosynovitis.",
  },

  "extensor-pollicis-longus": {
    summary:
      "A deep forearm muscle whose tendon hooks around the dorsal (Lister's) tubercle of the radius to reach the tip of the thumb. It forms the back border of the anatomical snuffbox.",
    functions: [
      "Extends the thumb at all its joints, especially the tip",
      "Draws the thumb backward (retroposition)",
    ],
    facts: [{ label: "Anatomical snuffbox", value: "Forms its medial (posterior) border" }],
    origin: "Posterior surface of the middle third of the ulna and the interosseous membrane",
    insertion: "Dorsal surface of the base of the distal phalanx of the thumb",
    action: "Extends the distal phalanx of the thumb at the IP joint and assists extension at the MCP and carpometacarpal joints",
    innervation: "Posterior interosseous nerve (C7–C8)",
    bloodSupply: "Posterior interosseous artery",
    connections: [
      { concept: "ulna", relation: "attaches-to", note: "origin: middle posterior surface" },
      { concept: "interosseous-membrane-of-forearm", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-thumb", relation: "attaches-to", note: "insertion: distal phalanx" },
      { concept: "radial-nerve", relation: "innervated-by", note: "posterior interosseous nerve" },
      { concept: "common-interosseous-artery", relation: "supplied-by", note: "via the posterior interosseous artery" },
      { concept: "radius", relation: "adjacent-to", note: "tendon hooks around the dorsal (Lister's) tubercle" },
      { concept: "radial-artery", relation: "adjacent-to", note: "crosses the snuffbox beneath its tendon" },
      { concept: "extensor-pollicis-brevis", relation: "adjacent-to", note: "opposite border of the snuffbox" },
    ],
    clinical:
      "Its tendon can rupture weeks after a distal radius fracture as it frays around Lister's tubercle, leaving the patient unable to straighten the thumb tip.",
  },

  "extensor-indicis": {
    summary:
      "A narrow, deep forearm muscle that gives the index finger independent extension, as when pointing.",
    functions: ["Extends the index finger independently (pointing)", "Assists wrist extension"],
    origin: "Posterior surface of the distal third of the ulna and the interosseous membrane",
    insertion: "Extensor expansion of the index finger (joining the extensor digitorum tendon)",
    action: "Extends the index finger; helps extend the wrist",
    innervation: "Posterior interosseous nerve (C7–C8)",
    bloodSupply: "Posterior interosseous artery",
    connections: [
      { concept: "ulna", relation: "attaches-to", note: "origin: distal posterior surface" },
      { concept: "interosseous-membrane-of-forearm", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-index-finger", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "radial-nerve", relation: "innervated-by", note: "posterior interosseous nerve" },
      { concept: "common-interosseous-artery", relation: "supplied-by", note: "via the posterior interosseous artery" },
      { concept: "extensor-digitorum", relation: "adjacent-to", note: "joins its index tendon" },
      { concept: "extensor-pollicis-longus", relation: "adjacent-to" },
    ],
    clinical:
      "Because extensor digitorum can still extend the index finger, extensor indicis is often transferred to restore thumb extension after EPL rupture.",
  },

  // ─────────────────────────── Wrist & hand ───────────────────────────
  "flexor-retinaculum-of-wrist": {
    summary:
      "A strong fibrous band stretching across the front of the carpal bones, converting the carpal arch into the carpal tunnel. The median nerve and nine long flexor tendons pass beneath it.",
    latin: "Retinaculum musculorum flexorum (transverse carpal ligament)",
    functions: [
      "Forms the roof of the carpal tunnel",
      "Holds the long flexor tendons against the wrist, preventing 'bowstringing'",
      "Provides origin for the thenar and hypothenar muscles",
    ],
    facts: [
      { label: "Attachments", value: "Pisiform and hook of hamate medially; tubercles of scaphoid and trapezium laterally" },
      { label: "Carpal tunnel contents", value: "Median nerve plus 9 tendons (4 FDS, 4 FDP, 1 FPL)" },
    ],
    connections: [
      { concept: "pisiform-bone", relation: "attaches-to", note: "medial attachment" },
      { concept: "hamate-bone", relation: "attaches-to", note: "medial attachment: hook of hamate" },
      { concept: "scaphoid-bone", relation: "attaches-to", note: "lateral attachment: tubercle" },
      { concept: "trapezium-bone", relation: "attaches-to", note: "lateral attachment: tubercle" },
      { concept: "median-nerve", relation: "adjacent-to", note: "passes beneath it in the carpal tunnel" },
      { concept: "flexor-digitorum-superficialis", relation: "adjacent-to", note: "tendons in the carpal tunnel" },
      { concept: "flexor-digitorum-profundus", relation: "adjacent-to", note: "tendons in the carpal tunnel" },
      { concept: "flexor-pollicis-longus", relation: "adjacent-to", note: "tendon in the carpal tunnel" },
      { concept: "flexor-carpi-radialis", relation: "adjacent-to", note: "tendon in a separate split of the retinaculum" },
      { concept: "palmaris-longus", relation: "adjacent-to", note: "inserts on its superficial surface" },
      { concept: "ulnar-nerve", relation: "adjacent-to", note: "passes superficial to it (Guyon's canal)" },
      { concept: "ulnar-artery", relation: "adjacent-to", note: "passes superficial to it (Guyon's canal)" },
      { concept: "abductor-pollicis-brevis", relation: "adjacent-to", note: "arises from it" },
      { concept: "opponens-digiti-minimi-of-hand", relation: "adjacent-to", note: "arises from it" },
    ],
    clinical:
      "Carpal tunnel syndrome is compression of the median nerve beneath it; cutting the retinaculum (carpal tunnel release) relieves the pressure.",
  },

  "intrinsic-muscles-of-hand": {
    summary:
      "The small muscles lying entirely within the hand that give it fine, precise control. They comprise the thenar muscles (abductor pollicis brevis, flexor pollicis brevis, opponens pollicis), adductor pollicis, the hypothenar muscles (abductor, flexor and opponens digiti minimi), palmaris brevis, the four lumbricals, and the palmar and dorsal interossei.",
    functions: [
      "Opposition and precision movements of the thumb",
      "Lumbricals flex the knuckles while straightening the finger joints (e.g. holding a card)",
      "Palmar interossei adduct (PAD) and dorsal interossei abduct (DAB) the fingers relative to the middle finger",
      "Shape and stabilise the hand for grip",
    ],
    facts: [
      { label: "Nerve supply", value: "Mostly the deep branch of the ulnar nerve; the median nerve supplies the 'LOAF' muscles" },
      { label: "LOAF", value: "Lateral two Lumbricals, Opponens pollicis, Abductor pollicis brevis, Flexor pollicis brevis" },
      { label: "Myotome", value: "T1 (with C8)" },
    ],
    innervation:
      "Deep branch of the ulnar nerve for most; median nerve (recurrent and digital branches) for the thenar muscles and lateral two lumbricals (C8–T1)",
    bloodSupply: "Superficial and deep palmar arches (from the ulnar and radial arteries)",
    connections: [
      { concept: "abductor-pollicis-brevis", relation: "contains", note: "thenar group" },
      { concept: "flexor-pollicis-brevis", relation: "contains", note: "thenar group" },
      { concept: "opponens-pollicis", relation: "contains", note: "thenar group" },
      { concept: "adductor-pollicis", relation: "contains" },
      { concept: "abductor-digiti-minimi-of-hand", relation: "contains", note: "hypothenar group" },
      { concept: "flexor-digiti-minimi-brevis-of-hand", relation: "contains", note: "hypothenar group" },
      { concept: "opponens-digiti-minimi-of-hand", relation: "contains", note: "hypothenar group" },
      { concept: "ulnar-nerve", relation: "innervated-by", note: "deep branch (most muscles)" },
      { concept: "median-nerve", relation: "innervated-by", note: "LOAF muscles" },
      { concept: "arteries-of-the-hand", relation: "supplied-by", note: "palmar arches" },
      { concept: "deep-veins-of-the-hand", relation: "drained-by" },
      { concept: "flexor-retinaculum-of-wrist", relation: "adjacent-to", note: "origin of thenar and hypothenar muscles" },
      { concept: "flexor-digitorum-profundus", relation: "adjacent-to", note: "lumbricals arise from its tendons" },
    ],
    clinical:
      "Ulnar nerve damage paralyses most intrinsic muscles, producing a 'claw hand' with wasting between the metacarpals; median nerve damage at the wrist causes thenar wasting and loss of thumb opposition.",
  },

  "abductor-pollicis-brevis": {
    summary:
      "The most superficial thenar muscle, forming much of the ball of the thumb. It moves the thumb forward away from the palm and helps opposition.",
    functions: ["Abducts the thumb (moves it forward, perpendicular to the palm)", "Assists opposition"],
    origin: "Flexor retinaculum and tubercles of the scaphoid and trapezium",
    insertion: "Lateral side of the base of the proximal phalanx of the thumb",
    action: "Abducts the thumb; helps oppose it",
    innervation: "Recurrent branch of the median nerve (C8–T1)",
    bloodSupply: "Superficial palmar branch of the radial artery",
    connections: [
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "origin" },
      { concept: "scaphoid-bone", relation: "attaches-to", note: "origin: tubercle" },
      { concept: "trapezium-bone", relation: "attaches-to", note: "origin: tubercle" },
      { concept: "phalanges-of-thumb", relation: "attaches-to", note: "insertion: proximal phalanx" },
      { concept: "median-nerve", relation: "innervated-by", note: "recurrent (motor) branch" },
      { concept: "radial-artery", relation: "supplied-by", note: "superficial palmar branch" },
      { concept: "intrinsic-muscles-of-hand", relation: "part-of", note: "thenar group" },
      { concept: "opponens-pollicis", relation: "adjacent-to", note: "lies over it" },
      { concept: "flexor-pollicis-brevis", relation: "adjacent-to" },
    ],
    clinical:
      "Testing thumb abduction against resistance is a reliable check of median nerve function; wasting of this muscle is an early sign of severe carpal tunnel syndrome.",
  },

  "flexor-pollicis-brevis": {
    summary:
      "A thenar muscle lying beside abductor pollicis brevis, with superficial and deep heads. It flexes the thumb at its base.",
    functions: ["Flexes the thumb at the MCP joint", "Assists opposition"],
    facts: [{ label: "Dual innervation", value: "Superficial head: median nerve; deep head: ulnar nerve" }],
    origin: "Superficial head: flexor retinaculum and tubercle of the trapezium; deep head: trapezoid and capitate",
    insertion: "Lateral side of the base of the proximal phalanx of the thumb",
    action: "Flexes the thumb at the MCP (and carpometacarpal) joint",
    innervation: "Superficial head: recurrent branch of the median nerve (C8–T1); deep head: deep branch of the ulnar nerve (C8–T1)",
    bloodSupply: "Superficial palmar branch of the radial artery",
    connections: [
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "origin: superficial head" },
      { concept: "trapezium-bone", relation: "attaches-to", note: "origin: superficial head" },
      { concept: "trapezoid-bone", relation: "attaches-to", note: "origin: deep head" },
      { concept: "capitate-bone", relation: "attaches-to", note: "origin: deep head" },
      { concept: "phalanges-of-thumb", relation: "attaches-to", note: "insertion: proximal phalanx" },
      { concept: "median-nerve", relation: "innervated-by", note: "superficial head" },
      { concept: "ulnar-nerve", relation: "innervated-by", note: "deep head" },
      { concept: "radial-artery", relation: "supplied-by", note: "superficial palmar branch" },
      { concept: "intrinsic-muscles-of-hand", relation: "part-of", note: "thenar group" },
      { concept: "abductor-pollicis-brevis", relation: "adjacent-to" },
    ],
  },

  "opponens-pollicis": {
    summary:
      "The deepest thenar muscle, lying under abductor pollicis brevis. It rotates the thumb across the palm so the thumb pad can meet the fingertips — the movement that makes the human hand so dexterous.",
    functions: [
      "Opposes the thumb (brings its pad to meet the fingertips)",
      "Rotates the 1st metacarpal medially",
    ],
    origin: "Flexor retinaculum and tubercle of the trapezium",
    insertion: "Lateral border of the 1st metacarpal",
    action: "Opposes the thumb: draws the 1st metacarpal medially toward the centre of the palm and rotates it medially",
    innervation: "Recurrent branch of the median nerve (C8–T1)",
    bloodSupply: "Superficial palmar branch of the radial artery",
    connections: [
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "origin" },
      { concept: "trapezium-bone", relation: "attaches-to", note: "origin: tubercle" },
      { concept: "first-metacarpal", relation: "attaches-to", note: "insertion: lateral border" },
      { concept: "median-nerve", relation: "innervated-by", note: "recurrent (motor) branch" },
      { concept: "radial-artery", relation: "supplied-by", note: "superficial palmar branch" },
      { concept: "intrinsic-muscles-of-hand", relation: "part-of", note: "thenar group" },
      { concept: "abductor-pollicis-brevis", relation: "adjacent-to", note: "covers it" },
    ],
    clinical:
      "Loss of opposition from median nerve injury leaves the thumb lying flat alongside the fingers ('ape hand').",
  },

  "adductor-pollicis": {
    summary:
      "A fan-shaped, two-headed muscle deep in the palm between the thumb and index finger. It pulls the thumb toward the palm and gives power to the grip.",
    functions: ["Adducts the thumb toward the palm", "Provides power for key pinch and grip"],
    origin: "Oblique head: bases of the 2nd and 3rd metacarpals, capitate and adjacent carpals; transverse head: anterior surface of the shaft of the 3rd metacarpal",
    insertion: "Medial side of the base of the proximal phalanx of the thumb",
    action: "Adducts the thumb toward the lateral border of the palm",
    innervation: "Deep branch of the ulnar nerve (C8–T1)",
    bloodSupply: "Deep palmar arch (mainly from the radial artery)",
    connections: [
      { concept: "capitate-bone", relation: "attaches-to", note: "origin: oblique head" },
      { concept: "second-metacarpal", relation: "attaches-to", note: "origin: oblique head" },
      { concept: "third-metacarpal", relation: "attaches-to", note: "origin: both heads" },
      { concept: "phalanges-of-thumb", relation: "attaches-to", note: "insertion: proximal phalanx" },
      { concept: "ulnar-nerve", relation: "innervated-by", note: "deep branch" },
      { concept: "arteries-of-the-hand", relation: "supplied-by", note: "deep palmar arch" },
      { concept: "radial-artery", relation: "adjacent-to", note: "passes between its two heads to form the deep palmar arch" },
      { concept: "intrinsic-muscles-of-hand", relation: "part-of" },
    ],
    clinical:
      "With ulnar nerve palsy the patient cannot grip a sheet of paper between thumb and index finger using adductor pollicis and instead flexes the thumb tip with FPL (Froment's sign).",
  },

  "abductor-digiti-minimi-of-hand": {
    summary:
      "The most superficial hypothenar muscle, forming the fleshy ulnar border of the palm. It spreads the little finger away from the others.",
    functions: ["Abducts the little finger", "Helps flex the little finger at its base"],
    origin: "Pisiform (and the tendon of flexor carpi ulnaris)",
    insertion: "Medial side of the base of the proximal phalanx of the little finger",
    action: "Abducts the little finger; assists flexion of its proximal phalanx",
    innervation: "Deep branch of the ulnar nerve (C8–T1)",
    bloodSupply: "Deep palmar branch of the ulnar artery",
    connections: [
      { concept: "pisiform-bone", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-little-finger", relation: "attaches-to", note: "insertion: proximal phalanx" },
      { concept: "ulnar-nerve", relation: "innervated-by", note: "deep branch" },
      { concept: "ulnar-artery", relation: "supplied-by", note: "deep palmar branch" },
      { concept: "flexor-carpi-ulnaris", relation: "adjacent-to", note: "partly arises from its tendon" },
      { concept: "intrinsic-muscles-of-hand", relation: "part-of", note: "hypothenar group" },
      { concept: "flexor-digiti-minimi-brevis-of-hand", relation: "adjacent-to" },
    ],
  },

  "flexor-digiti-minimi-brevis-of-hand": {
    summary:
      "A small hypothenar muscle lying beside abductor digiti minimi. It flexes the little finger at the knuckle.",
    functions: ["Flexes the little finger at the MCP joint"],
    origin: "Hook of the hamate and flexor retinaculum",
    insertion: "Medial side of the base of the proximal phalanx of the little finger",
    action: "Flexes the proximal phalanx of the little finger",
    innervation: "Deep branch of the ulnar nerve (C8–T1)",
    bloodSupply: "Deep palmar branch of the ulnar artery",
    connections: [
      { concept: "hamate-bone", relation: "attaches-to", note: "origin: hook of hamate" },
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "origin" },
      { concept: "phalanges-of-little-finger", relation: "attaches-to", note: "insertion: proximal phalanx" },
      { concept: "ulnar-nerve", relation: "innervated-by", note: "deep branch" },
      { concept: "ulnar-artery", relation: "supplied-by", note: "deep palmar branch" },
      { concept: "intrinsic-muscles-of-hand", relation: "part-of", note: "hypothenar group" },
      { concept: "abductor-digiti-minimi-of-hand", relation: "adjacent-to" },
      { concept: "opponens-digiti-minimi-of-hand", relation: "adjacent-to", note: "lies deep to it" },
    ],
  },

  "opponens-digiti-minimi-of-hand": {
    summary:
      "The deepest hypothenar muscle. It rotates the 5th metacarpal forward, bringing the little finger toward the thumb and cupping the palm.",
    functions: [
      "Brings the little finger into opposition with the thumb",
      "Deepens the hollow of the palm (cupping)",
    ],
    origin: "Hook of the hamate and flexor retinaculum",
    insertion: "Medial (palmar) border of the 5th metacarpal",
    action: "Draws the 5th metacarpal anteriorly and rotates it, bringing the little finger into opposition with the thumb",
    innervation: "Deep branch of the ulnar nerve (C8–T1)",
    bloodSupply: "Deep palmar branch of the ulnar artery",
    connections: [
      { concept: "hamate-bone", relation: "attaches-to", note: "origin: hook of hamate" },
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "origin" },
      { concept: "fifth-metacarpal", relation: "attaches-to", note: "insertion: medial border" },
      { concept: "ulnar-nerve", relation: "innervated-by", note: "deep branch" },
      { concept: "ulnar-artery", relation: "supplied-by", note: "deep palmar branch" },
      { concept: "intrinsic-muscles-of-hand", relation: "part-of", note: "hypothenar group" },
      { concept: "flexor-digiti-minimi-brevis-of-hand", relation: "adjacent-to" },
    ],
  },

  // ─────────────────────────── Back: superficial & intermediate ───────────────────────────
  trapezius: {
    summary:
      "A large, flat, triangular muscle covering the back of the neck and upper trunk; left and right together form a trapezoid. Its upper, middle and lower fibres move the scapula in different directions.",
    functions: [
      "Upper fibres elevate the scapula (shrugging)",
      "Middle fibres retract the scapula (squeezing the shoulder blades together)",
      "Lower fibres depress the scapula",
      "Upper and lower fibres together rotate the scapula upward so the arm can be raised above the head",
    ],
    facts: [
      { label: "Parts", value: "Descending (upper), transverse (middle) and ascending (lower)" },
      { label: "Unusual nerve", value: "Motor supply from a cranial nerve (spinal accessory, CN XI)" },
    ],
    origin: "Medial third of the superior nuchal line, external occipital protuberance, nuchal ligament and spinous processes of C7–T12",
    insertion: "Lateral third of the clavicle, acromion and spine of the scapula",
    action: "Elevates, retracts, depresses and upwardly rotates the scapula; upper fibres can extend and laterally flex the neck",
    innervation: "Spinal accessory nerve (CN XI) for motor fibres; C3–C4 for pain and proprioception",
    bloodSupply: "Superficial branch of the transverse cervical artery (superficial cervical artery), with contributions from the occipital, dorsal scapular and posterior intercostal arteries",
    connections: [
      { concept: "occipital-bone", relation: "attaches-to", note: "origin: superior nuchal line" },
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "origin: spinous processes C7–T12 (upper end)" },
      { concept: "twelfth-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous processes C7–T12 (lower end)" },
      { concept: "clavicle", relation: "attaches-to", note: "insertion: lateral third" },
      { concept: "scapula", relation: "attaches-to", note: "insertion: acromion and spine" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "C3–C4 (sensory); motor supply is the spinal accessory nerve" },
      { concept: "transverse-cervical-artery", relation: "supplied-by" },
      { concept: "superficial-cervical-artery", relation: "supplied-by" },
      { concept: "levator-scapulae", relation: "adjacent-to", note: "lies deep to it" },
      { concept: "rhomboid-major", relation: "adjacent-to", note: "lies deep to it" },
      { concept: "sternocleidomastoid", relation: "adjacent-to", note: "together bound the posterior triangle of the neck" },
      { concept: "deltoid", relation: "adjacent-to", note: "shares its bony attachments" },
      { concept: "latissimus-dorsi", relation: "adjacent-to", note: "overlaps its upper edge" },
    ],
    clinical:
      "Damage to the spinal accessory nerve (e.g. during lymph node biopsy in the posterior triangle of the neck) causes a drooping shoulder and difficulty shrugging or raising the arm above the head.",
  },

  "levator-scapulae": {
    summary:
      "A strap-like muscle running down the side and back of the neck from the upper cervical vertebrae to the upper corner of the scapula. It lies in the floor of the posterior triangle of the neck, partly covered by sternocleidomastoid and trapezius.",
    functions: [
      "Elevates the scapula",
      "Rotates the scapula downward (tilting the glenoid cavity down)",
      "Bends the neck to the same side",
    ],
    origin: "Posterior tubercles of the transverse processes of C1–C4",
    insertion: "Medial border of the scapula above the root of the spine (superior angle region)",
    action: "Elevates the scapula and rotates it downward; laterally flexes the neck",
    innervation: "Dorsal scapular nerve (C5) and cervical spinal nerves (C3–C4)",
    bloodSupply: "Dorsal scapular and transverse cervical arteries",
    connections: [
      { concept: "atlas-c1", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "axis-c2", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "third-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "fourth-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "scapula", relation: "attaches-to", note: "insertion: superior angle region" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "dorsal scapular nerve from the C5 root" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "C3–C4 branches" },
      { concept: "dorsal-scapular-artery", relation: "supplied-by" },
      { concept: "transverse-cervical-artery", relation: "supplied-by" },
      { concept: "trapezius", relation: "adjacent-to", note: "covers its lower part" },
      { concept: "rhomboid-minor", relation: "adjacent-to", note: "inserts just below it" },
      { concept: "splenius-capitis", relation: "adjacent-to", note: "neighbour in the floor of the posterior triangle" },
      { concept: "scalenus-medius", relation: "adjacent-to" },
    ],
    clinical:
      "Tension in levator scapulae is a frequent cause of pain at the top of the shoulder blade and of the 'stiff neck' that follows sustained awkward postures.",
  },

  "rhomboid-major": {
    summary:
      "A flat, rhomboid-shaped muscle between the thoracic spine and the medial border of the scapula, lying deep to trapezius. With rhomboid minor it pulls the shoulder blade toward the spine.",
    functions: [
      "Retracts the scapula (pulls it toward the spine)",
      "Rotates the scapula downward",
      "Holds the scapula against the chest wall",
    ],
    origin: "Spinous processes of T2–T5",
    insertion: "Medial border of the scapula from the level of the spine to the inferior angle",
    action: "Retracts the scapula and rotates it to depress the glenoid cavity; fixes the scapula to the thoracic wall",
    innervation: "Dorsal scapular nerve (C4–C5)",
    bloodSupply: "Dorsal scapular artery (or deep branch of the transverse cervical artery)",
    connections: [
      { concept: "second-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "third-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "fourth-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "fifth-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "scapula", relation: "attaches-to", note: "insertion: medial border" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "dorsal scapular nerve" },
      { concept: "dorsal-scapular-artery", relation: "supplied-by" },
      { concept: "trapezius", relation: "adjacent-to", note: "covers it" },
      { concept: "rhomboid-minor", relation: "adjacent-to", note: "lies just above it" },
      { concept: "serratus-anterior", relation: "adjacent-to", note: "antagonist on the same border" },
      { concept: "serratus-posterior-superior", relation: "adjacent-to", note: "lies deep to it" },
    ],
    clinical:
      "Injury to the dorsal scapular nerve weakens the rhomboids, so the medial border of the scapula on that side drifts away from the midline.",
  },

  "rhomboid-minor": {
    summary:
      "A small, cylindrical muscle just above rhomboid major, running from the lower neck to the medial border of the scapula at the root of its spine.",
    functions: [
      "Retracts the scapula",
      "Rotates the scapula downward",
      "Holds the scapula against the chest wall",
    ],
    origin: "Nuchal ligament and spinous processes of C7 and T1",
    insertion: "Medial border of the scapula at the level of the root of the spine",
    action: "Retracts the scapula and rotates it to depress the glenoid cavity",
    innervation: "Dorsal scapular nerve (C4–C5)",
    bloodSupply: "Dorsal scapular artery (or deep branch of the transverse cervical artery)",
    connections: [
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "first-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "scapula", relation: "attaches-to", note: "insertion: medial border at the spine" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "dorsal scapular nerve" },
      { concept: "dorsal-scapular-artery", relation: "supplied-by" },
      { concept: "rhomboid-major", relation: "adjacent-to", note: "lies just below it" },
      { concept: "levator-scapulae", relation: "adjacent-to", note: "inserts just above it" },
      { concept: "trapezius", relation: "adjacent-to", note: "covers it" },
    ],
  },

  "latissimus-dorsi": {
    summary:
      "A very broad, flat muscle covering the lower back and sweeping up to the arm, forming the posterior fold of the armpit. It is a powerful extensor, adductor and medial rotator of the arm used in climbing, rowing and swimming.",
    functions: [
      "Extends, adducts and medially rotates the arm",
      "Pulls the body up toward the arms when climbing or doing pull-ups",
      "Depresses the shoulder girdle (e.g. when using crutches)",
    ],
    facts: [
      { label: "Forms", value: "Posterior axillary fold (with teres major)" },
      { label: "Main vascular pedicle", value: "Thoracodorsal artery" },
    ],
    origin: "Spinous processes of the lower six thoracic vertebrae, thoracolumbar fascia, iliac crest and the lower 3–4 ribs (often also the inferior angle of the scapula)",
    insertion: "Floor of the intertubercular sulcus of the humerus",
    action: "Extends, adducts and medially rotates the arm; raises the body toward the arms during climbing",
    innervation: "Thoracodorsal nerve (C6–C8)",
    bloodSupply: "Thoracodorsal artery; dorsal perforating branches of the posterior intercostal and lumbar arteries",
    connections: [
      { concept: "seventh-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous processes T7–T12 (upper end)" },
      { concept: "twelfth-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous processes T7–T12 (lower end)" },
      { concept: "hip-bone", relation: "attaches-to", note: "origin: iliac crest" },
      { concept: "tenth-rib", relation: "attaches-to", note: "origin: lower 3–4 ribs" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "origin: lower 3–4 ribs" },
      { concept: "humerus", relation: "attaches-to", note: "insertion: floor of intertubercular sulcus" },
      { concept: "brachial-plexus", relation: "innervated-by", note: "thoracodorsal nerve (posterior cord)" },
      { concept: "thoracodorsal-artery", relation: "supplied-by" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal perforating branches" },
      { concept: "thoracodorsal-vein", relation: "drained-by" },
      { concept: "scapula", relation: "adjacent-to", note: "passes over (and often attaches to) the inferior angle" },
      { concept: "teres-major", relation: "adjacent-to", note: "synergist; tendons lie together" },
      { concept: "trapezius", relation: "adjacent-to" },
      { concept: "external-oblique", relation: "adjacent-to", note: "slips interdigitate" },
    ],
    clinical:
      "Supplied mainly by the single thoracodorsal pedicle, it is widely used as a flap for breast and chest-wall reconstruction; the thoracodorsal nerve can be injured during axillary surgery.",
  },

  "serratus-posterior-superior": {
    summary:
      "A thin, quadrilateral muscle in the upper back lying deep to the rhomboids. It was traditionally thought to raise the upper ribs, but it may act mainly as a proprioceptive (position-sensing) structure.",
    functions: ["Traditionally described as elevating the upper ribs", "May mainly provide proprioceptive information"],
    origin: "Nuchal ligament and spinous processes of C7–T3",
    insertion: "Upper borders of the 2nd–4th ribs (sometimes 5th), lateral to their angles",
    action: "Traditionally said to elevate the ribs; may be mainly proprioceptive",
    innervation: "Second to fifth intercostal nerves (T2–T5)",
    bloodSupply: "Posterior intercostal arteries",
    connections: [
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "first-thoracic-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "third-thoracic-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "second-rib", relation: "attaches-to", note: "insertion" },
      { concept: "third-rib", relation: "attaches-to", note: "insertion" },
      { concept: "fourth-rib", relation: "attaches-to", note: "insertion" },
      { concept: "intercostal-nerves", relation: "innervated-by" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "rhomboid-major", relation: "adjacent-to", note: "covers it" },
      { concept: "splenius-capitis", relation: "adjacent-to", note: "lies over it" },
    ],
  },

  "serratus-posterior-inferior": {
    summary:
      "A thin, quadrilateral muscle in the lower back lying deep to latissimus dorsi. It was traditionally thought to pull the lower ribs down, but its main role may be proprioceptive.",
    functions: ["Traditionally described as depressing the lower ribs", "May mainly provide proprioceptive information"],
    origin: "Spinous processes of T11–L2",
    insertion: "Lower borders of the 8th/9th–12th ribs near their angles",
    action: "Traditionally said to depress the lower ribs; may be mainly proprioceptive",
    innervation: "Anterior rami of T9–T12 (lower intercostal and subcostal nerves)",
    bloodSupply: "Posterior intercostal, subcostal and lumbar arteries",
    connections: [
      { concept: "eleventh-thoracic-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "twelfth-thoracic-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "first-lumbar-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "second-lumbar-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "ninth-rib", relation: "attaches-to", note: "insertion" },
      { concept: "tenth-rib", relation: "attaches-to", note: "insertion" },
      { concept: "eleventh-rib", relation: "attaches-to", note: "insertion" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "insertion" },
      { concept: "intercostal-nerves", relation: "innervated-by" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "lumbar-arteries", relation: "supplied-by" },
      { concept: "latissimus-dorsi", relation: "adjacent-to", note: "covers it" },
      { concept: "iliocostalis-lumborum", relation: "adjacent-to", note: "lies over it" },
    ],
  },

  "splenius-capitis": {
    summary:
      "A broad, strap-like muscle on the back of the neck that wraps (like a bandage) over the deeper neck muscles. It extends the head and turns the face toward the same side.",
    functions: [
      "Extends the head and neck (both sides together)",
      "Bends the neck to the same side",
      "Turns the face to the same side",
    ],
    facts: [{ label: "Name", value: "From Greek splenion, 'bandage'" }],
    origin: "Lower half of the nuchal ligament and spinous processes of C7–T3 (or T4)",
    insertion: "Mastoid process of the temporal bone and lateral third of the superior nuchal line of the occipital bone",
    action: "Bilaterally extends the head and neck; unilaterally laterally flexes and rotates the head to the same side",
    innervation: "Posterior (dorsal) rami of the middle cervical spinal nerves",
    bloodSupply: "Muscular branches of the occipital and deep cervical arteries",
    connections: [
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "first-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "third-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "temporal-bone", relation: "attaches-to", note: "insertion: mastoid process" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: superior nuchal line" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "deep-cervical-artery", relation: "supplied-by" },
      { concept: "sternocleidomastoid", relation: "adjacent-to", note: "shares the mastoid region; turns the head the opposite way" },
      { concept: "trapezius", relation: "adjacent-to", note: "covers it" },
      { concept: "semispinalis-capitis", relation: "adjacent-to", note: "lies deep to it" },
      { concept: "levator-scapulae", relation: "adjacent-to", note: "neighbour in the floor of the posterior triangle" },
    ],
  },

  "splenius-cervicis": {
    summary:
      "The lower, narrower partner of splenius capitis, running from the upper thoracic spinous processes to the upper cervical transverse processes.",
    functions: [
      "Extends the neck (both sides together)",
      "Bends and rotates the neck to the same side",
    ],
    origin: "Spinous processes of T3–T6",
    insertion: "Posterior tubercles of the transverse processes of C1–C3 (or C4)",
    action: "Bilaterally extends the neck; unilaterally laterally flexes and rotates it to the same side",
    innervation: "Posterior rami of the lower cervical spinal nerves",
    bloodSupply: "Deep cervical artery and neighbouring muscular branches",
    connections: [
      { concept: "third-thoracic-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "fourth-thoracic-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "fifth-thoracic-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "sixth-thoracic-vertebra", relation: "attaches-to", note: "origin" },
      { concept: "atlas-c1", relation: "attaches-to", note: "insertion: transverse process" },
      { concept: "axis-c2", relation: "attaches-to", note: "insertion: transverse process" },
      { concept: "third-cervical-vertebra", relation: "attaches-to", note: "insertion: transverse process" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "deep-cervical-artery", relation: "supplied-by" },
      { concept: "splenius-capitis", relation: "adjacent-to" },
      { concept: "levator-scapulae", relation: "adjacent-to", note: "shares attachments on C1–C3" },
    ],
  },

  // ─────────────────────────── Back: erector spinae ───────────────────────────
  "iliocostalis-lumborum": {
    summary:
      "The lowest part of the iliocostalis column, the most lateral of the three columns of the erector spinae. It runs from the sacrum and iliac crest up to the lower ribs.",
    functions: [
      "Extends the lumbar and lower thoracic spine (both sides together)",
      "Bends the trunk to the same side",
      "Controls forward bending of the trunk",
    ],
    facts: [{ label: "Erector spinae columns (lateral → medial)", value: "Iliocostalis, longissimus, spinalis ('I Love Spine')" }],
    origin: "Common erector spinae tendon: iliac crest, posterior sacrum, sacroiliac ligaments and lower lumbar spinous processes",
    insertion: "Angles of the lower six to nine ribs (its lumbar fibres also reach the lumbar transverse processes)",
    action: "Bilaterally extends the vertebral column; unilaterally flexes it laterally",
    innervation: "Posterior (dorsal) rami of lumbar and lower thoracic spinal nerves",
    bloodSupply: "Lumbar arteries and dorsal branches of the lower posterior intercostal arteries",
    connections: [
      { concept: "hip-bone", relation: "attaches-to", note: "origin: iliac crest" },
      { concept: "sacrum", relation: "attaches-to", note: "origin: posterior surface" },
      { concept: "sixth-rib", relation: "attaches-to", note: "insertion: angles of lower ribs (upper end)" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "insertion: angles of lower ribs (lower end)" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "lumbar-arteries", relation: "supplied-by" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal branches" },
      { concept: "longissimus-thoracis", relation: "adjacent-to", note: "medial neighbour" },
      { concept: "iliocostalis-thoracis", relation: "adjacent-to", note: "continues upward" },
      { concept: "serratus-posterior-inferior", relation: "adjacent-to", note: "covers it" },
    ],
    clinical:
      "Spasm of the erector spinae, including iliocostalis lumborum, is a common source of acute low back pain.",
  },

  "iliocostalis-thoracis": {
    summary:
      "The middle part of the iliocostalis column of the erector spinae, linking the lower ribs to the upper ribs.",
    functions: ["Extends the thoracic spine (both sides together)", "Bends the trunk to the same side", "Helps maintain upright posture"],
    origin: "Angles of the lower six ribs (medial to the insertions of iliocostalis lumborum)",
    insertion: "Angles of the upper six ribs and the transverse process of C7",
    action: "Bilaterally extends the thoracic vertebral column; unilaterally flexes it laterally",
    innervation: "Posterior rami of thoracic spinal nerves",
    bloodSupply: "Dorsal branches of the posterior intercostal arteries",
    connections: [
      { concept: "seventh-rib", relation: "attaches-to", note: "origin: angles of lower six ribs (upper end)" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "origin: angles of lower six ribs (lower end)" },
      { concept: "first-rib", relation: "attaches-to", note: "insertion: angles of upper six ribs (upper end)" },
      { concept: "sixth-rib", relation: "attaches-to", note: "insertion: angles of upper six ribs (lower end)" },
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "insertion: transverse process" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal branches" },
      { concept: "iliocostalis-lumborum", relation: "adjacent-to", note: "below" },
      { concept: "iliocostalis-cervicis", relation: "adjacent-to", note: "above" },
      { concept: "longissimus-thoracis", relation: "adjacent-to", note: "medial neighbour" },
    ],
  },

  "iliocostalis-cervicis": {
    summary:
      "The uppermost part of the iliocostalis column of the erector spinae, running from the upper ribs to the transverse processes of the lower neck vertebrae.",
    functions: ["Extends the neck (both sides together)", "Bends the neck to the same side"],
    origin: "Angles of the 3rd–6th ribs",
    insertion: "Posterior tubercles of the transverse processes of C4–C6",
    action: "Bilaterally extends the cervical spine; unilaterally flexes it laterally",
    innervation: "Posterior rami of lower cervical and upper thoracic spinal nerves",
    bloodSupply: "Deep cervical artery and dorsal branches of the upper posterior intercostal arteries",
    connections: [
      { concept: "third-rib", relation: "attaches-to", note: "origin: rib angles 3–6" },
      { concept: "sixth-rib", relation: "attaches-to", note: "origin: rib angles 3–6" },
      { concept: "fourth-cervical-vertebra", relation: "attaches-to", note: "insertion: transverse process" },
      { concept: "fifth-cervical-vertebra", relation: "attaches-to", note: "insertion: transverse process" },
      { concept: "sixth-cervical-vertebra", relation: "attaches-to", note: "insertion: transverse process" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "deep-cervical-artery", relation: "supplied-by" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal branches" },
      { concept: "iliocostalis-thoracis", relation: "adjacent-to", note: "below" },
      { concept: "longissimus-cervicis", relation: "adjacent-to", note: "medial neighbour" },
    ],
  },

  "longissimus-thoracis": {
    summary:
      "The main part of the longissimus column, the intermediate and longest column of the erector spinae. It runs from the sacrum and lumbar vertebrae up to the thoracic transverse processes and ribs.",
    functions: [
      "Extends the vertebral column (both sides together)",
      "Bends the trunk to the same side",
      "Maintains upright posture and controls forward bending",
    ],
    facts: [{ label: "Size", value: "Largest and longest column of the erector spinae" }],
    origin: "Common erector spinae tendon (iliac crest, posterior sacrum, lumbar spinous processes) and lumbar transverse processes",
    insertion: "Tips of the transverse processes of the thoracic vertebrae and the lower 9–10 ribs between their tubercles and angles",
    action: "Bilaterally extends the vertebral column; unilaterally flexes it laterally",
    innervation: "Posterior rami of thoracic and lumbar spinal nerves",
    bloodSupply: "Dorsal branches of the posterior intercostal and lumbar arteries",
    connections: [
      { concept: "sacrum", relation: "attaches-to", note: "origin: via common tendon" },
      { concept: "hip-bone", relation: "attaches-to", note: "origin: iliac crest" },
      { concept: "third-lumbar-vertebra", relation: "attaches-to", note: "origin: lumbar processes" },
      { concept: "first-thoracic-vertebra", relation: "attaches-to", note: "insertion: thoracic transverse processes (upper end)" },
      { concept: "twelfth-thoracic-vertebra", relation: "attaches-to", note: "insertion: thoracic transverse processes (lower end)" },
      { concept: "third-rib", relation: "attaches-to", note: "insertion: lower 9–10 ribs (upper end)" },
      { concept: "twelfth-rib", relation: "attaches-to", note: "insertion: lower 9–10 ribs (lower end)" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal branches" },
      { concept: "lumbar-arteries", relation: "supplied-by" },
      { concept: "iliocostalis-lumborum", relation: "adjacent-to", note: "lateral neighbour" },
      { concept: "spinalis-thoracis", relation: "adjacent-to", note: "medial neighbour" },
      { concept: "longissimus-cervicis", relation: "adjacent-to", note: "continues upward" },
    ],
    clinical:
      "The erector spinae, of which longissimus is the largest part, bulge on either side of the spine in the lower back; they are frequently involved in muscular low back pain.",
  },

  "longissimus-cervicis": {
    summary:
      "The part of the longissimus column (erector spinae) that runs from the upper thoracic transverse processes to those of the cervical vertebrae.",
    functions: ["Extends the neck (both sides together)", "Bends the neck to the same side"],
    origin: "Transverse processes of T1–T5",
    insertion: "Posterior tubercles of the transverse processes of C2–C6",
    action: "Bilaterally extends the cervical spine; unilaterally flexes it laterally",
    innervation: "Posterior rami of lower cervical and upper thoracic spinal nerves",
    bloodSupply: "Deep cervical artery and dorsal branches of the upper posterior intercostal arteries",
    connections: [
      { concept: "first-thoracic-vertebra", relation: "attaches-to", note: "origin: transverse processes T1–T5" },
      { concept: "fifth-thoracic-vertebra", relation: "attaches-to", note: "origin: transverse processes T1–T5" },
      { concept: "axis-c2", relation: "attaches-to", note: "insertion: transverse processes C2–C6" },
      { concept: "sixth-cervical-vertebra", relation: "attaches-to", note: "insertion: transverse processes C2–C6" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "deep-cervical-artery", relation: "supplied-by" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal branches" },
      { concept: "longissimus-thoracis", relation: "adjacent-to", note: "below" },
      { concept: "longissimus-capitis", relation: "adjacent-to", note: "medial neighbour" },
      { concept: "iliocostalis-cervicis", relation: "adjacent-to", note: "lateral neighbour" },
    ],
  },

  "longissimus-capitis": {
    summary:
      "The uppermost part of the longissimus column of the erector spinae, and the only part that reaches the skull. It runs to the mastoid process behind the ear.",
    functions: [
      "Extends the head (both sides together)",
      "Bends the head to the same side",
      "Turns the face to the same side",
    ],
    origin: "Transverse processes of T1–T4/T5 and articular processes of C4–C7",
    insertion: "Posterior margin of the mastoid process of the temporal bone",
    action: "Bilaterally extends the head; unilaterally laterally flexes the head and rotates the face to the same side",
    innervation: "Posterior rami of middle and lower cervical spinal nerves",
    bloodSupply: "Deep cervical, occipital and vertebral arteries",
    connections: [
      { concept: "first-thoracic-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "fourth-cervical-vertebra", relation: "attaches-to", note: "origin: articular processes C4–C7" },
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "origin: articular processes C4–C7" },
      { concept: "temporal-bone", relation: "attaches-to", note: "insertion: mastoid process" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "deep-cervical-artery", relation: "supplied-by" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "muscular branches of the vertebral artery" },
      { concept: "splenius-capitis", relation: "adjacent-to", note: "covers it" },
      { concept: "semispinalis-capitis", relation: "adjacent-to", note: "medial neighbour" },
      { concept: "longissimus-cervicis", relation: "adjacent-to" },
    ],
  },

  "spinalis-thoracis": {
    summary:
      "The smallest and most medial column of the erector spinae, running between the spinous processes of the thoracic and upper lumbar vertebrae. It often blends with semispinalis.",
    functions: ["Extends the thoracic spine", "Helps maintain upright posture"],
    facts: [{ label: "Position", value: "Most medial column of the erector spinae" }],
    origin: "Spinous processes of T11–L2",
    insertion: "Spinous processes of the upper thoracic vertebrae (about T1–T8)",
    action: "Extends the thoracic vertebral column",
    innervation: "Posterior rami of thoracic spinal nerves",
    bloodSupply: "Dorsal branches of the posterior intercostal arteries",
    connections: [
      { concept: "eleventh-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "twelfth-thoracic-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "first-lumbar-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "second-lumbar-vertebra", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "first-thoracic-vertebra", relation: "attaches-to", note: "insertion: spinous processes of upper thoracic vertebrae" },
      { concept: "eighth-thoracic-vertebra", relation: "attaches-to", note: "insertion: spinous processes of upper thoracic vertebrae" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal branches" },
      { concept: "longissimus-thoracis", relation: "adjacent-to", note: "lateral neighbour" },
      { concept: "semispinalis-thoracis", relation: "adjacent-to", note: "lies deep and often blends with it" },
    ],
  },

  // ─────────────────────────── Back: transversospinales ───────────────────────────
  "deep-back-muscles-transversospinales": {
    summary:
      "The deep layer of intrinsic back muscles filling the groove between the transverse and spinous processes. It comprises semispinalis (thoracis, cervicis, capitis), multifidus and the rotatores, whose fibres run upward and medially from transverse to spinous processes — semispinalis spans about 4–6 vertebrae, multifidus 2–4 and rotatores 1–2.",
    functions: [
      "Stabilise individual vertebrae during movements of the trunk",
      "Extend the vertebral column",
      "Rotate the vertebral column toward the opposite side",
      "Provide position sense (the small rotatores are rich in muscle spindles)",
    ],
    facts: [
      { label: "Members", value: "Semispinalis, multifidus and rotatores" },
      { label: "Multifidus", value: "Thickest in the lumbar region" },
    ],
    origin: "Transverse processes of the vertebrae (for multifidus also the sacrum, posterior superior iliac spine and lumbar mammillary processes)",
    insertion: "Spinous processes of vertebrae 1–6 segments higher (semispinalis capitis reaches the occipital bone)",
    action: "Bilaterally extend and stabilise the vertebral column; unilaterally rotate it to the opposite side",
    innervation: "Posterior (dorsal) rami of spinal nerves",
    bloodSupply: "Dorsal branches of the vertebral, deep cervical, posterior intercostal and lumbar arteries",
    connections: [
      { concept: "semispinalis-thoracis", relation: "contains" },
      { concept: "semispinalis-cervicis", relation: "contains" },
      { concept: "semispinalis-capitis", relation: "contains" },
      { concept: "sacrum", relation: "attaches-to", note: "origin of multifidus" },
      { concept: "hip-bone", relation: "attaches-to", note: "origin of multifidus (posterior superior iliac spine)" },
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "transverse/spinous processes along the spine" },
      { concept: "sixth-thoracic-vertebra", relation: "attaches-to", note: "transverse/spinous processes along the spine" },
      { concept: "third-lumbar-vertebra", relation: "attaches-to", note: "transverse/mammillary and spinous processes" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "deep-cervical-artery", relation: "supplied-by" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal branches" },
      { concept: "lumbar-arteries", relation: "supplied-by" },
      { concept: "longissimus-thoracis", relation: "adjacent-to", note: "erector spinae lies superficial" },
    ],
    clinical:
      "Wasting and fatty change of multifidus is associated with chronic low back pain, and retraining it is a common focus of back rehabilitation.",
  },

  "semispinalis-thoracis": {
    summary:
      "The lowest part of semispinalis, one of the transversospinales, whose fibres run upward and medially across about 4–6 vertebrae from transverse processes to spinous processes.",
    functions: ["Extends the thoracic and lower cervical spine", "Rotates the spine to the opposite side"],
    origin: "Transverse processes of T6–T10",
    insertion: "Spinous processes of C6–T4",
    action: "Extends the thoracic and cervical vertebral column and rotates it to the opposite side",
    innervation: "Posterior rami of thoracic spinal nerves",
    bloodSupply: "Dorsal branches of the posterior intercostal arteries",
    connections: [
      { concept: "sixth-thoracic-vertebra", relation: "attaches-to", note: "origin: transverse processes T6–T10" },
      { concept: "tenth-thoracic-vertebra", relation: "attaches-to", note: "origin: transverse processes T6–T10" },
      { concept: "sixth-cervical-vertebra", relation: "attaches-to", note: "insertion: spinous processes C6–T4" },
      { concept: "fourth-thoracic-vertebra", relation: "attaches-to", note: "insertion: spinous processes C6–T4" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "dorsal branches" },
      { concept: "deep-back-muscles-transversospinales", relation: "part-of" },
      { concept: "spinalis-thoracis", relation: "adjacent-to", note: "lies over it" },
      { concept: "semispinalis-cervicis", relation: "adjacent-to", note: "continues upward" },
    ],
  },

  "semispinalis-cervicis": {
    summary:
      "The middle part of semispinalis, running from the upper thoracic transverse processes to the cervical spinous processes — especially the large spinous process of the axis (C2).",
    functions: ["Extends the cervical spine", "Rotates the neck to the opposite side", "Stabilises the upper cervical spine"],
    origin: "Transverse processes of T1–T6",
    insertion: "Spinous processes of C2–C5, mainly C2",
    action: "Extends the cervical vertebral column and rotates it to the opposite side",
    innervation: "Posterior rami of cervical spinal nerves",
    bloodSupply: "Deep cervical artery",
    connections: [
      { concept: "first-thoracic-vertebra", relation: "attaches-to", note: "origin: transverse processes T1–T6" },
      { concept: "sixth-thoracic-vertebra", relation: "attaches-to", note: "origin: transverse processes T1–T6" },
      { concept: "axis-c2", relation: "attaches-to", note: "insertion: spinous process (main attachment)" },
      { concept: "fifth-cervical-vertebra", relation: "attaches-to", note: "insertion: spinous processes C2–C5" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami" },
      { concept: "deep-cervical-artery", relation: "supplied-by" },
      { concept: "deep-back-muscles-transversospinales", relation: "part-of" },
      { concept: "semispinalis-capitis", relation: "adjacent-to", note: "lies over it" },
      { concept: "obliquus-capitis-inferior", relation: "adjacent-to", note: "both attach to the spine of C2" },
    ],
  },

  "semispinalis-capitis": {
    summary:
      "A large, thick muscle in the back of the neck running from the upper thoracic and lower cervical vertebrae to the occipital bone. It is the largest muscle in the back of the neck and a powerful extensor of the head.",
    functions: ["Extends the head", "Turns the head slightly to the opposite side", "Holds the head upright"],
    facts: [{ label: "Size", value: "Largest muscle in the back of the neck" }],
    origin: "Transverse processes of C7–T6 and articular processes of C4–C6",
    insertion: "Occipital bone between the superior and inferior nuchal lines",
    action: "Extends the head and rotates it slightly to the opposite side",
    innervation: "Posterior rami of cervical spinal nerves (including the greater occipital nerve, C2)",
    bloodSupply: "Deep cervical and occipital arteries",
    connections: [
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "origin: transverse processes C7–T6" },
      { concept: "sixth-thoracic-vertebra", relation: "attaches-to", note: "origin: transverse processes C7–T6" },
      { concept: "fourth-cervical-vertebra", relation: "attaches-to", note: "origin: articular processes C4–C6" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: between the nuchal lines" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "posterior rami; pierced by the greater occipital nerve" },
      { concept: "deep-cervical-artery", relation: "supplied-by" },
      { concept: "deep-back-muscles-transversospinales", relation: "part-of" },
      { concept: "splenius-capitis", relation: "adjacent-to", note: "covers it" },
      { concept: "longissimus-capitis", relation: "adjacent-to", note: "lateral neighbour" },
      { concept: "rectus-capitis-posterior-major", relation: "adjacent-to", note: "covers the suboccipital muscles" },
    ],
    clinical:
      "The greater occipital nerve pierces semispinalis capitis; irritation here is one cause of occipital neuralgia (shooting pain over the back of the scalp).",
  },

  // ─────────────────────────── Suboccipital muscles ───────────────────────────
  "rectus-capitis-posterior-major": {
    summary:
      "One of four small suboccipital muscles beneath the back of the skull, forming the upper medial border of the suboccipital triangle. It extends the head and turns it to the same side.",
    functions: ["Extends the head at the atlanto-occipital joint", "Rotates the head to the same side", "Fine-tunes head posture"],
    facts: [{ label: "Suboccipital triangle", value: "Bounded by rectus capitis posterior major and the superior and inferior obliques; contains the vertebral artery and suboccipital nerve" }],
    origin: "Spinous process of the axis (C2)",
    insertion: "Lateral part of the inferior nuchal line of the occipital bone",
    action: "Extends the head and rotates it to the same side",
    innervation: "Suboccipital nerve (posterior ramus of C1)",
    bloodSupply: "Vertebral artery and deep descending branch of the occipital artery",
    connections: [
      { concept: "axis-c2", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: inferior nuchal line" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "suboccipital nerve (C1 posterior ramus)" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery lies in the suboccipital triangle" },
      { concept: "rectus-capitis-posterior-minor", relation: "adjacent-to", note: "medial neighbour" },
      { concept: "obliquus-capitis-superior", relation: "adjacent-to", note: "suboccipital triangle" },
      { concept: "obliquus-capitis-inferior", relation: "adjacent-to", note: "suboccipital triangle" },
      { concept: "semispinalis-capitis", relation: "adjacent-to", note: "covers it" },
    ],
  },

  "rectus-capitis-posterior-minor": {
    summary:
      "The smallest and most medial suboccipital muscle, running from the back of the atlas to the occipital bone. It is rich in muscle spindles and helps fine-tune head posture.",
    functions: ["Extends the head at the atlanto-occipital joint", "Provides proprioceptive feedback about head position"],
    facts: [{ label: "Dural link", value: "Connective-tissue bridges to the spinal dura mater have been described" }],
    origin: "Posterior tubercle of the posterior arch of the atlas (C1)",
    insertion: "Medial part of the inferior nuchal line of the occipital bone",
    action: "Extends the head",
    innervation: "Suboccipital nerve (posterior ramus of C1)",
    bloodSupply: "Vertebral artery and branches of the occipital artery",
    connections: [
      { concept: "atlas-c1", relation: "attaches-to", note: "origin: posterior tubercle" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: inferior nuchal line" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "suboccipital nerve (C1)" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery" },
      { concept: "rectus-capitis-posterior-major", relation: "adjacent-to", note: "lateral neighbour" },
      { concept: "semispinalis-capitis", relation: "adjacent-to", note: "covers it" },
    ],
  },

  "obliquus-capitis-inferior": {
    summary:
      "A thick suboccipital muscle running from the spine of the axis to the transverse process of the atlas. Despite its name, it is the only 'capitis' muscle that does not attach to the skull; it forms the lower border of the suboccipital triangle.",
    functions: ["Rotates the atlas and head to the same side (the 'no' movement)", "Stabilises the atlanto-axial joint"],
    facts: [{ label: "Unique feature", value: "Only 'capitis' muscle with no attachment to the skull" }],
    origin: "Spinous process of the axis (C2)",
    insertion: "Transverse process of the atlas (C1)",
    action: "Rotates the atlas and head to the same side at the atlanto-axial joint",
    innervation: "Suboccipital nerve (posterior ramus of C1)",
    bloodSupply: "Vertebral and occipital arteries",
    connections: [
      { concept: "axis-c2", relation: "attaches-to", note: "origin: spinous process" },
      { concept: "atlas-c1", relation: "attaches-to", note: "insertion: transverse process" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "suboccipital nerve; the greater occipital nerve (C2) emerges below it" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery" },
      { concept: "obliquus-capitis-superior", relation: "adjacent-to", note: "suboccipital triangle" },
      { concept: "rectus-capitis-posterior-major", relation: "adjacent-to", note: "suboccipital triangle" },
    ],
    clinical:
      "The greater occipital nerve winds around its lower border before ascending to the scalp, so tension here is implicated in some occipital headaches.",
  },

  "obliquus-capitis-superior": {
    summary:
      "A small suboccipital muscle running from the transverse process of the atlas up to the occipital bone. It forms the upper lateral border of the suboccipital triangle.",
    functions: ["Extends the head", "Bends the head to the same side", "Fine-tunes head posture"],
    origin: "Transverse process of the atlas (C1)",
    insertion: "Occipital bone between the superior and inferior nuchal lines (lateral part)",
    action: "Extends the head and flexes it laterally to the same side",
    innervation: "Suboccipital nerve (posterior ramus of C1)",
    bloodSupply: "Vertebral and occipital arteries",
    connections: [
      { concept: "atlas-c1", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: between the nuchal lines" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "suboccipital nerve (C1)" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery" },
      { concept: "obliquus-capitis-inferior", relation: "adjacent-to", note: "suboccipital triangle" },
      { concept: "rectus-capitis-posterior-major", relation: "adjacent-to", note: "suboccipital triangle" },
    ],
  },

  // ─────────────────────────── Neck: superficial & lateral ───────────────────────────
  sternocleidomastoid: {
    summary:
      "A prominent strap-like muscle running obliquely across the side of the neck from the sternum and clavicle to the mastoid process behind the ear. It divides each side of the neck into anterior and posterior triangles.",
    functions: [
      "Turns the face to the opposite side and tilts it upward (one side acting)",
      "Bends the neck to the same side",
      "Flexes the neck and thrusts the chin forward (both sides acting)",
      "Acts as an accessory muscle of inspiration when the head is fixed",
    ],
    facts: [
      { label: "Heads", value: "Sternal and clavicular" },
      { label: "Landmark", value: "Divides the neck into anterior and posterior triangles" },
    ],
    origin: "Sternal head: anterior surface of the manubrium; clavicular head: upper surface of the medial third of the clavicle",
    insertion: "Lateral surface of the mastoid process of the temporal bone and lateral half of the superior nuchal line",
    action: "Unilaterally: laterally flexes the neck and rotates the face to the opposite side. Bilaterally: flexes the neck and thrusts the chin forward; assists inspiration when the head is fixed",
    innervation: "Spinal accessory nerve (CN XI) for motor fibres; C2–C3 for pain and proprioception",
    bloodSupply: "Branches of the occipital and superior thyroid arteries (with a contribution from the suprascapular artery)",
    connections: [
      { concept: "manubrium-of-sternum", relation: "attaches-to", note: "origin: sternal head" },
      { concept: "clavicle", relation: "attaches-to", note: "origin: clavicular head" },
      { concept: "temporal-bone", relation: "attaches-to", note: "insertion: mastoid process" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: superior nuchal line" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "C2–C3 (sensory); motor supply is the spinal accessory nerve" },
      { concept: "internal-jugular-vein", relation: "adjacent-to", note: "carotid sheath lies deep to it" },
      { concept: "common-carotid-artery", relation: "adjacent-to", note: "carotid sheath lies deep to it" },
      { concept: "trapezius", relation: "adjacent-to", note: "together bound the posterior triangle" },
      { concept: "platysma", relation: "adjacent-to", note: "covers it superficially" },
      { concept: "scalenus-anterior", relation: "adjacent-to", note: "lies deep to its lower part" },
      { concept: "splenius-capitis", relation: "adjacent-to", note: "shares the mastoid region" },
    ],
    clinical:
      "Congenital muscular torticollis (wry neck) results from fibrosis and shortening of one sternocleidomastoid in infancy; spinal accessory nerve function is tested by turning the head against resistance.",
  },

  platysma: {
    summary:
      "A broad, thin sheet of muscle in the subcutaneous tissue of the neck, running from the upper chest to the lower jaw. Although in the neck, it is a muscle of facial expression supplied by the facial nerve.",
    functions: [
      "Tenses the skin of the neck (e.g. grimacing or straining)",
      "Draws the corners of the mouth downward (expressions of fear or sadness)",
      "Helps depress the mandible",
    ],
    origin: "Subcutaneous tissue and fascia over the upper parts of pectoralis major and deltoid",
    insertion: "Inferior border of the mandible, skin of the lower face and the angle of the mouth",
    action: "Tenses the skin of the neck; depresses the mandible and draws the corners of the mouth down",
    innervation: "Cervical branch of the facial nerve (CN VII)",
    bloodSupply: "Submental branch of the facial artery and the suprascapular artery",
    connections: [
      { concept: "mandible", relation: "attaches-to", note: "insertion: inferior border" },
      { concept: "skin", relation: "attaches-to", note: "origin and insertion in the skin/fascia" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "cervical branch" },
      { concept: "suprascapular-artery", relation: "supplied-by" },
      { concept: "muscles-of-facial-expression", relation: "part-of" },
      { concept: "sternocleidomastoid", relation: "adjacent-to", note: "lies over it" },
      { concept: "pectoralis-major", relation: "adjacent-to", note: "arises from the fascia over it" },
      { concept: "deltoid", relation: "adjacent-to", note: "arises from the fascia over it" },
    ],
    clinical:
      "Injury to the cervical branch of the facial nerve during neck surgery weakens platysma; the muscle is also tightened in cosmetic neck-lift procedures.",
  },

  "scalenus-anterior": {
    summary:
      "A deep neck muscle running from the cervical transverse processes to the first rib. It is a key landmark: the phrenic nerve crosses its front, the subclavian vein passes in front of it, and the subclavian artery and brachial plexus pass behind it.",
    functions: [
      "Raises the first rib during forced inspiration",
      "Bends the neck to the same side",
      "Assists neck flexion",
    ],
    origin: "Anterior tubercles of the transverse processes of C3–C6",
    insertion: "Scalene tubercle on the inner border of the 1st rib",
    action: "Elevates the 1st rib; laterally flexes the neck",
    innervation: "Anterior rami of cervical spinal nerves (C4–C6)",
    bloodSupply: "Ascending cervical branch of the inferior thyroid artery",
    connections: [
      { concept: "third-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "fourth-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "fifth-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "sixth-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "first-rib", relation: "attaches-to", note: "insertion: scalene tubercle" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "cervical anterior rami" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by", note: "ascending cervical branch" },
      { concept: "phrenic-nerve", relation: "adjacent-to", note: "descends on its anterior surface" },
      { concept: "subclavian-vein", relation: "adjacent-to", note: "passes in front of it" },
      { concept: "subclavian-artery", relation: "adjacent-to", note: "passes behind it" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "emerges between it and scalenus medius" },
      { concept: "scalenus-medius", relation: "adjacent-to" },
    ],
    clinical:
      "The brachial plexus and subclavian artery pass through the gap between scalenus anterior and medius, where they can be compressed (thoracic outlet syndrome); the same gap is targeted in interscalene nerve blocks.",
  },

  "scalenus-medius": {
    summary:
      "The largest and longest of the scalene muscles, lying behind the brachial plexus and subclavian artery at the side of the neck.",
    functions: ["Raises the first rib during forced inspiration", "Bends the neck to the same side"],
    origin: "Posterior tubercles of the transverse processes of C2–C7 (often also C1)",
    insertion: "Upper surface of the 1st rib, behind the groove for the subclavian artery",
    action: "Elevates the 1st rib; laterally flexes the neck",
    innervation: "Anterior rami of cervical spinal nerves (C3–C8)",
    bloodSupply: "Ascending cervical branch of the inferior thyroid artery",
    connections: [
      { concept: "axis-c2", relation: "attaches-to", note: "origin: transverse processes C2–C7 (upper end)" },
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "origin: transverse processes C2–C7 (lower end)" },
      { concept: "first-rib", relation: "attaches-to", note: "insertion" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "cervical anterior rami" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by", note: "ascending cervical branch" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "lies in front of it; long thoracic and dorsal scapular nerves pierce it" },
      { concept: "subclavian-artery", relation: "adjacent-to", note: "grooves the 1st rib in front of its insertion" },
      { concept: "scalenus-anterior", relation: "adjacent-to" },
      { concept: "scalenus-posterior", relation: "adjacent-to" },
      { concept: "levator-scapulae", relation: "adjacent-to" },
    ],
  },

  "scalenus-posterior": {
    summary:
      "The smallest and deepest of the scalene muscles, and the only one that attaches to the second rib.",
    functions: ["Raises the second rib during forced inspiration", "Bends the neck to the same side"],
    origin: "Posterior tubercles of the transverse processes of C4–C6",
    insertion: "External border of the 2nd rib",
    action: "Elevates the 2nd rib; laterally flexes the neck",
    innervation: "Anterior rami of the lower cervical nerves (about C6–C8)",
    bloodSupply: "Ascending cervical and superficial cervical arteries",
    connections: [
      { concept: "fourth-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "fifth-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "sixth-cervical-vertebra", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "second-rib", relation: "attaches-to", note: "insertion: external border" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "lower cervical anterior rami" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by", note: "ascending cervical branch" },
      { concept: "superficial-cervical-artery", relation: "supplied-by" },
      { concept: "scalenus-medius", relation: "adjacent-to" },
      { concept: "levator-scapulae", relation: "adjacent-to" },
    ],
  },

  // ─────────────────────────── Neck: prevertebral ───────────────────────────
  "longus-colli": {
    summary:
      "A long, thin muscle lying on the front of the cervical and upper thoracic vertebral bodies, behind the pharynx and oesophagus. It flexes the neck and helps stabilise the cervical spine.",
    functions: [
      "Flexes the cervical spine",
      "Stabilises the neck against extension (e.g. during sudden movements)",
      "Assists slight rotation and side-bending of the neck",
    ],
    origin: "Bodies of C5–T3 and anterior tubercles of the transverse processes of C3–C5",
    insertion: "Anterior tubercle of the atlas, bodies of C2–C4 and anterior tubercles of the transverse processes of C5–C6",
    action: "Flexes the cervical spine, with slight rotation and lateral flexion",
    innervation: "Anterior rami of C2–C6",
    bloodSupply: "Inferior thyroid (ascending cervical branch) and vertebral arteries",
    connections: [
      { concept: "atlas-c1", relation: "attaches-to", note: "insertion: anterior tubercle" },
      { concept: "axis-c2", relation: "attaches-to", note: "insertion: vertebral body" },
      { concept: "fifth-cervical-vertebra", relation: "attaches-to", note: "origin and insertion" },
      { concept: "seventh-cervical-vertebra", relation: "attaches-to", note: "origin: vertebral body" },
      { concept: "third-thoracic-vertebra", relation: "attaches-to", note: "origin: lowest vertebral body (C5–T3)" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "cervical anterior rami" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery" },
      { concept: "sympathetic-trunk", relation: "adjacent-to", note: "lies on its anterior surface" },
      { concept: "esophagus", relation: "adjacent-to", note: "lies in front of it" },
      { concept: "longus-capitis", relation: "adjacent-to" },
    ],
    clinical:
      "It is commonly strained in whiplash (hyperextension) injuries; the cervical sympathetic trunk lies on its anterior surface.",
  },

  "longus-capitis": {
    summary:
      "A broad band of muscle in front of the upper cervical vertebrae, running up to the base of the skull. It flexes the head and upper neck.",
    functions: ["Flexes the head on the neck", "Flexes the upper cervical spine"],
    origin: "Anterior tubercles of the transverse processes of C3–C6",
    insertion: "Basilar part of the occipital bone",
    action: "Flexes the head and the upper cervical spine",
    innervation: "Anterior rami of C1–C3",
    bloodSupply: "Ascending cervical (inferior thyroid), ascending pharyngeal and vertebral arteries",
    connections: [
      { concept: "third-cervical-vertebra", relation: "attaches-to", note: "origin: transverse processes C3–C6" },
      { concept: "sixth-cervical-vertebra", relation: "attaches-to", note: "origin: transverse processes C3–C6" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: basilar part" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "C1–C3 anterior rami" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by", note: "ascending cervical branch" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery" },
      { concept: "sympathetic-trunk", relation: "adjacent-to", note: "lies in front of it" },
      { concept: "longus-colli", relation: "adjacent-to" },
      { concept: "rectus-capitis-anterior", relation: "adjacent-to", note: "lies deep to its upper part" },
    ],
  },

  "rectus-capitis-anterior": {
    summary:
      "A short, flat muscle lying deep to longus capitis, running from the atlas to the base of the skull.",
    functions: ["Flexes the head at the atlanto-occipital joint", "Stabilises the head on the atlas"],
    origin: "Anterior surface of the lateral mass of the atlas (C1)",
    insertion: "Base of the skull (basilar part of the occipital bone) just in front of the occipital condyle",
    action: "Flexes the head at the atlanto-occipital joint",
    innervation: "Branches from the loop between the C1 and C2 spinal nerves",
    bloodSupply: "Vertebral and ascending pharyngeal arteries",
    connections: [
      { concept: "atlas-c1", relation: "attaches-to", note: "origin: lateral mass" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: basilar part" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "C1–C2 loop" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery" },
      { concept: "longus-capitis", relation: "adjacent-to", note: "covers it" },
      { concept: "rectus-capitis-lateralis", relation: "adjacent-to", note: "lateral neighbour" },
    ],
  },

  "rectus-capitis-lateralis": {
    summary:
      "A short, flat muscle running from the transverse process of the atlas to the jugular process of the occipital bone, just behind the internal jugular vein.",
    functions: ["Bends the head to the same side", "Stabilises the head on the atlas"],
    origin: "Transverse process of the atlas (C1)",
    insertion: "Jugular process of the occipital bone",
    action: "Laterally flexes the head and stabilises it",
    innervation: "Branches from the loop between the C1 and C2 spinal nerves",
    bloodSupply: "Vertebral, occipital and ascending pharyngeal arteries",
    connections: [
      { concept: "atlas-c1", relation: "attaches-to", note: "origin: transverse process" },
      { concept: "occipital-bone", relation: "attaches-to", note: "insertion: jugular process" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "C1–C2 loop" },
      { concept: "vertebrobasilar-arteries", relation: "supplied-by", note: "vertebral artery" },
      { concept: "internal-jugular-vein", relation: "adjacent-to", note: "lies just in front of it below the jugular foramen" },
      { concept: "rectus-capitis-anterior", relation: "adjacent-to" },
    ],
  },

  // ─────────────────────────── Neck: suprahyoid ───────────────────────────
  digastric: {
    summary:
      "A small muscle below the jaw with two bellies joined by an intermediate tendon that is slung to the hyoid bone. The two bellies develop from different pharyngeal arches and so are supplied by different nerves.",
    functions: [
      "Opens the jaw (depresses the mandible), especially against resistance",
      "Raises and steadies the hyoid bone during swallowing and speech",
    ],
    facts: [
      { label: "Two bellies, two nerves", value: "Anterior: nerve to mylohyoid (CN V3); posterior: facial nerve (CN VII)" },
      { label: "Embryology", value: "Anterior belly from the 1st pharyngeal arch, posterior belly from the 2nd" },
    ],
    origin: "Anterior belly: digastric fossa on the inner surface of the mandible; posterior belly: mastoid notch of the temporal bone",
    insertion: "Intermediate tendon, attached by a fibrous sling to the body and greater horn of the hyoid bone",
    action: "Depresses the mandible; raises and steadies the hyoid during swallowing and speaking",
    innervation: "Anterior belly: nerve to mylohyoid (from the inferior alveolar nerve, CN V3); posterior belly: facial nerve (CN VII)",
    bloodSupply: "Anterior belly: submental artery; posterior belly: posterior auricular and occipital arteries",
    connections: [
      { concept: "mandible", relation: "attaches-to", note: "origin (anterior belly): digastric fossa" },
      { concept: "temporal-bone", relation: "attaches-to", note: "origin (posterior belly): mastoid notch" },
      { concept: "intermediate-tendon", relation: "attaches-to", note: "the two bellies unite at it" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "via a fibrous sling around the intermediate tendon" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "posterior belly" },
      { concept: "stylohyoid", relation: "adjacent-to", note: "runs with the posterior belly" },
      { concept: "mylohyoid", relation: "adjacent-to", note: "anterior belly lies on it" },
      { concept: "submandibular-gland", relation: "adjacent-to", note: "lies in the triangle between the two bellies" },
    ],
    clinical:
      "The two bellies and the lower border of the mandible outline the submandibular (digastric) triangle, which contains the submandibular gland — a key landmark in neck surgery.",
  },

  "intermediate-tendon": {
    summary:
      "The rounded tendon that joins the anterior and posterior bellies of the digastric muscle just above the hyoid bone. It passes through a split in the stylohyoid tendon and is held to the hyoid by a fibrous loop.",
    latin: "Tendo intermedius musculi digastrici",
    functions: [
      "Links the two bellies of digastric so they can act together",
      "Anchors digastric to the hyoid, letting it raise the hyoid or open the jaw",
      "Acts like a pulley, redirecting the muscle's pull",
    ],
    facts: [{ label: "Similar tendon", value: "Omohyoid also has an intermediate tendon, slung toward the clavicle" }],
    connections: [
      { concept: "digastric", relation: "attaches-to", note: "unites its anterior and posterior bellies" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "held by a fibrous sling to the body and greater horn" },
      { concept: "stylohyoid", relation: "adjacent-to", note: "passes through the split in its tendon" },
      { concept: "mylohyoid", relation: "adjacent-to" },
      { concept: "submandibular-gland", relation: "adjacent-to" },
    ],
  },

  stylohyoid: {
    summary:
      "A slender muscle running from the styloid process to the hyoid bone alongside the posterior belly of digastric. Its tendon splits to let the digastric intermediate tendon pass through.",
    functions: ["Raises and pulls back the hyoid bone", "Lengthens the floor of the mouth during swallowing"],
    origin: "Styloid process of the temporal bone",
    insertion: "Body of the hyoid bone near the greater horn (tendon splits around the digastric intermediate tendon)",
    action: "Elevates and retracts the hyoid bone",
    innervation: "Stylohyoid branch of the facial nerve (CN VII)",
    bloodSupply: "Branches of the facial, posterior auricular and occipital arteries",
    connections: [
      { concept: "temporal-bone", relation: "attaches-to", note: "origin: styloid process" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "insertion: body near greater horn" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by" },
      { concept: "digastric", relation: "adjacent-to", note: "runs with its posterior belly" },
      { concept: "intermediate-tendon", relation: "adjacent-to", note: "passes through its split tendon" },
      { concept: "stylohyoid-ligament", relation: "adjacent-to", note: "runs parallel from the styloid process" },
    ],
  },

  mylohyoid: {
    summary:
      "A flat, triangular muscle whose left and right halves meet in a midline seam to form the muscular floor of the mouth (oral diaphragm).",
    functions: [
      "Raises the floor of the mouth and the tongue during swallowing and speaking",
      "Elevates the hyoid bone",
      "Helps depress the mandible",
    ],
    facts: [{ label: "Forms", value: "The muscular floor of the mouth" }],
    origin: "Mylohyoid line on the inner surface of the mandible",
    insertion: "Midline mylohyoid raphe and body of the hyoid bone",
    action: "Elevates the hyoid, floor of the mouth and tongue; depresses the mandible when the hyoid is fixed",
    innervation: "Nerve to mylohyoid (branch of the inferior alveolar nerve, CN V3)",
    bloodSupply: "Mylohyoid branch of the inferior alveolar artery and submental artery",
    connections: [
      { concept: "mandible", relation: "attaches-to", note: "origin: mylohyoid line" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "insertion: body" },
      { concept: "submandibular-gland", relation: "adjacent-to", note: "wraps around its free posterior border" },
      { concept: "sublingual-gland", relation: "adjacent-to", note: "rests on its upper surface" },
      { concept: "digastric", relation: "adjacent-to", note: "anterior belly lies below it" },
      { concept: "geniohyoid", relation: "adjacent-to", note: "lies above it" },
      { concept: "tongue", relation: "adjacent-to", note: "supports it from below" },
    ],
    clinical:
      "Dental infections that spread below the mylohyoid line enter the submandibular space; rapid bilateral spread (Ludwig's angina) can push the tongue upward and threaten the airway.",
  },

  geniohyoid: {
    summary:
      "A narrow muscle lying just above mylohyoid beside the midline, running from the inner chin to the hyoid bone. It is supplied by C1 fibres that travel with the hypoglossal nerve.",
    functions: [
      "Pulls the hyoid bone forward and upward, widening the pharynx for swallowing",
      "Shortens the floor of the mouth",
      "Helps open the jaw when the hyoid is fixed",
    ],
    origin: "Inferior mental spine (genial tubercle) on the inner surface of the mandible",
    insertion: "Body of the hyoid bone",
    action: "Pulls the hyoid anterosuperiorly; depresses the mandible when the hyoid is fixed",
    innervation: "C1 fibres carried by the hypoglossal nerve (CN XII)",
    bloodSupply: "Branches of the lingual artery",
    connections: [
      { concept: "mandible", relation: "attaches-to", note: "origin: inferior mental spine" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "insertion: body" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "C1 fibres via the hypoglossal nerve" },
      { concept: "mylohyoid", relation: "adjacent-to", note: "lies below it" },
      { concept: "extrinsic-tongue-muscles", relation: "adjacent-to", note: "genioglossus lies above it" },
      { concept: "tongue", relation: "adjacent-to" },
    ],
  },

  // ─────────────────────────── Neck: infrahyoid ('strap') ───────────────────────────
  omohyoid: {
    summary:
      "A long, thin infrahyoid ('strap') muscle with two bellies joined by an intermediate tendon that is held down toward the clavicle by a fascial sling. It crosses the side of the neck from the scapula to the hyoid bone.",
    functions: ["Depresses the hyoid bone after swallowing", "Pulls back and steadies the hyoid"],
    facts: [
      { label: "Landmark", value: "Superior belly divides the anterior triangle; inferior belly divides the posterior triangle" },
    ],
    origin: "Inferior belly: superior border of the scapula near the suprascapular notch",
    insertion: "Superior belly: inferior border of the body of the hyoid bone",
    action: "Depresses, retracts and steadies the hyoid bone",
    innervation: "Ansa cervicalis (C1–C3)",
    bloodSupply: "Mainly the superior thyroid artery; the inferior belly also from branches of the thyrocervical trunk",
    connections: [
      { concept: "scapula", relation: "attaches-to", note: "origin: superior border" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "insertion: body" },
      { concept: "clavicle", relation: "adjacent-to", note: "intermediate tendon slung toward it" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "ansa cervicalis (C1–C3)" },
      { concept: "thyrocervical-trunk", relation: "supplied-by", note: "inferior belly" },
      { concept: "internal-jugular-vein", relation: "adjacent-to", note: "its tendon crosses over the vein" },
      { concept: "sternocleidomastoid", relation: "adjacent-to", note: "passes deep to it" },
      { concept: "sternohyoid", relation: "adjacent-to", note: "lies lateral to it" },
    ],
    clinical:
      "Its intermediate tendon crosses the internal jugular vein, making it a useful surgical landmark for the vein and the deep cervical lymph nodes around it.",
  },

  sternohyoid: {
    summary:
      "A thin, strap-like infrahyoid muscle running up the front of the neck from the sternum to the hyoid bone, close to the midline.",
    functions: ["Depresses the hyoid bone after it has been raised during swallowing", "Steadies the hyoid during speech"],
    origin: "Posterior surfaces of the manubrium of the sternum and medial end of the clavicle",
    insertion: "Body of the hyoid bone",
    action: "Depresses the hyoid bone",
    innervation: "Ansa cervicalis (C1–C3)",
    bloodSupply: "Superior thyroid artery",
    connections: [
      { concept: "manubrium-of-sternum", relation: "attaches-to", note: "origin" },
      { concept: "clavicle", relation: "attaches-to", note: "origin: medial end" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "insertion: body" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "ansa cervicalis (C1–C3)" },
      { concept: "sternothyroid", relation: "adjacent-to", note: "lies deep to it" },
      { concept: "thyroid-gland", relation: "adjacent-to", note: "covers it anteriorly" },
      { concept: "omohyoid", relation: "adjacent-to" },
    ],
    clinical:
      "The infrahyoid strap muscles are separated in the midline (or divided) to reach the thyroid gland during thyroidectomy.",
  },

  sternothyroid: {
    summary:
      "An infrahyoid strap muscle lying deep to sternohyoid and directly covering the thyroid gland. It runs from the sternum to the thyroid cartilage.",
    functions: ["Depresses the larynx and hyoid after swallowing or singing high notes"],
    origin: "Posterior surface of the manubrium (and 1st costal cartilage)",
    insertion: "Oblique line of the lamina of the thyroid cartilage",
    action: "Depresses the larynx and hyoid bone",
    innervation: "Ansa cervicalis (C2–C3)",
    bloodSupply: "Superior thyroid artery",
    connections: [
      { concept: "manubrium-of-sternum", relation: "attaches-to", note: "origin: posterior surface" },
      { concept: "first-costal-cartilage", relation: "attaches-to", note: "origin" },
      { concept: "thyroid-cartilage", relation: "attaches-to", note: "insertion: oblique line" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "ansa cervicalis (C2–C3)" },
      { concept: "thyroid-gland", relation: "adjacent-to", note: "lies directly on it" },
      { concept: "sternohyoid", relation: "adjacent-to", note: "covers it" },
      { concept: "thyrohyoid", relation: "adjacent-to", note: "continues upward from the oblique line" },
    ],
    clinical:
      "Because it attaches to the thyroid cartilage, it limits upward enlargement of a goitre, which therefore tends to extend downward behind the sternum.",
  },

  thyrohyoid: {
    summary:
      "A short, quadrilateral infrahyoid muscle that looks like an upward continuation of sternothyroid, running from the thyroid cartilage to the hyoid bone.",
    functions: ["Depresses the hyoid bone", "Raises the larynx when the hyoid is fixed (e.g. during swallowing)"],
    origin: "Oblique line of the thyroid cartilage",
    insertion: "Inferior border of the body and greater horn of the hyoid bone",
    action: "Depresses the hyoid; elevates the larynx when the hyoid is fixed",
    innervation: "C1 fibres carried by the hypoglossal nerve (CN XII)",
    bloodSupply: "Superior thyroid artery",
    connections: [
      { concept: "thyroid-cartilage", relation: "attaches-to", note: "origin: oblique line" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "insertion" },
      { concept: "spinal-nerves", relation: "innervated-by", note: "C1 fibres via the hypoglossal nerve" },
      { concept: "sternothyroid", relation: "adjacent-to", note: "continuous with it below" },
      { concept: "laryngeal-ligaments-membranes", relation: "adjacent-to", note: "thyrohyoid membrane lies deep to it" },
      { concept: "omohyoid", relation: "adjacent-to" },
    ],
  },

  // ─────────────────────────── Head: mastication & facial expression ───────────────────────────
  temporalis: {
    summary:
      "A broad, fan-shaped muscle filling the temporal fossa on the side of the skull. Its fibres converge beneath the zygomatic arch onto the coronoid process of the mandible, closing the jaw.",
    functions: [
      "Elevates the mandible (closes the jaw)",
      "Posterior fibres pull the mandible backward (retrusion)",
      "Maintains the resting position of the jaw",
    ],
    facts: [
      { label: "Muscles of mastication", value: "Temporalis, masseter, medial and lateral pterygoids — all supplied by CN V3" },
    ],
    origin: "Floor of the temporal fossa and deep surface of the temporal fascia",
    insertion: "Tip and medial surface of the coronoid process and anterior border of the ramus of the mandible",
    action: "Elevates the mandible; posterior fibres retrude it",
    innervation: "Deep temporal nerves (branches of the mandibular nerve, CN V3)",
    bloodSupply: "Deep temporal arteries (from the maxillary artery) and middle temporal artery (from the superficial temporal artery)",
    connections: [
      { concept: "temporal-bone", relation: "attaches-to", note: "origin: temporal fossa" },
      { concept: "parietal-bone", relation: "attaches-to", note: "origin: temporal fossa" },
      { concept: "frontal-bone", relation: "attaches-to", note: "origin: temporal fossa" },
      { concept: "sphenoid-bone", relation: "attaches-to", note: "origin: greater wing in the temporal fossa" },
      { concept: "mandible", relation: "attaches-to", note: "insertion: coronoid process (closes the jaw)" },
      { concept: "zygomatic-bone", relation: "adjacent-to", note: "passes deep to the zygomatic arch" },
      { concept: "masseter", relation: "adjacent-to", note: "synergist" },
    ],
    clinical:
      "It can be felt contracting above the ear when the teeth are clenched; overactivity of temporalis contributes to temporomandibular disorders and tension-type headache.",
  },

  masseter: {
    summary:
      "A thick, quadrilateral muscle on the side of the face covering the ramus of the mandible. It is the most powerful elevator of the jaw and is easily felt when the teeth are clenched.",
    functions: [
      "Elevates the mandible (closes the jaw) for biting and chewing",
      "Superficial fibres help protrude the mandible",
      "Deep fibres help retract it",
    ],
    facts: [
      { label: "Strength", value: "Often cited as one of the strongest muscles in the body relative to its size" },
      { label: "Layers", value: "Superficial and deep parts" },
    ],
    origin: "Inferior border and medial surface of the zygomatic arch (including the maxillary process of the zygomatic bone)",
    insertion: "Angle and lateral surface of the ramus of the mandible (and coronoid process)",
    action: "Elevates the mandible; superficial part helps protrude and deep part helps retrude it",
    innervation: "Masseteric nerve (branch of the mandibular nerve, CN V3)",
    bloodSupply: "Masseteric artery (from the maxillary artery), with transverse facial and facial artery branches",
    connections: [
      { concept: "zygomatic-bone", relation: "attaches-to", note: "origin: zygomatic arch" },
      { concept: "temporal-bone", relation: "attaches-to", note: "origin: zygomatic process (posterior arch)" },
      { concept: "mandible", relation: "attaches-to", note: "insertion: angle and ramus (closes the jaw)" },
      { concept: "temporalis", relation: "adjacent-to", note: "synergist" },
      { concept: "muscles-of-facial-expression", relation: "adjacent-to", note: "buccinator lies deep and in front of it" },
    ],
    clinical:
      "Habitual clenching or grinding (bruxism) can enlarge the masseter; the parotid duct crosses its surface and can be rolled against it when the teeth are clenched.",
  },

  "muscles-of-facial-expression": {
    summary:
      "A group of thin muscles in the subcutaneous tissue of the face, scalp and neck, most of which insert into the skin. All develop from the second pharyngeal arch and are supplied by the facial nerve (CN VII); members include occipitofrontalis, orbicularis oculi, corrugator supercilii, procerus, nasalis, orbicularis oris, zygomaticus major and minor, levator labii superioris, levator anguli oris, risorius, depressor anguli oris, depressor labii inferioris, mentalis, buccinator, the auricular muscles and platysma.",
    functions: [
      "Produce facial expressions by moving the skin",
      "Close the eyelids (orbicularis oculi) to protect the cornea and spread tears",
      "Close and shape the lips for speech and eating (orbicularis oris)",
      "Keep food between the teeth during chewing (buccinator)",
    ],
    facts: [
      { label: "Nerve", value: "Facial nerve (CN VII): temporal, zygomatic, buccal, marginal mandibular and cervical branches" },
      { label: "Embryology", value: "Second pharyngeal arch mesoderm" },
    ],
    innervation: "Facial nerve (CN VII) — temporal, zygomatic, buccal, marginal mandibular and cervical branches",
    bloodSupply:
      "Mainly the facial artery, with branches of the superficial temporal (e.g. transverse facial), maxillary (e.g. infraorbital) and ophthalmic (supraorbital, supratrochlear) arteries",
    connections: [
      { concept: "facial-nerve-cn-vii", relation: "innervated-by" },
      { concept: "skin", relation: "attaches-to", note: "most insert into the skin of the face" },
      { concept: "maxilla", relation: "attaches-to", note: "origin of several lip elevators" },
      { concept: "mandible", relation: "attaches-to", note: "origin of the lip depressors and mentalis" },
      { concept: "zygomatic-bone", relation: "attaches-to", note: "origin of zygomaticus major and minor" },
      { concept: "nasal-bone", relation: "attaches-to", note: "origin of procerus" },
      { concept: "occipital-bone", relation: "attaches-to", note: "occipital belly of occipitofrontalis" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "supraorbital and supratrochlear branches (forehead)" },
      { concept: "platysma", relation: "contains" },
      { concept: "orbital-tendons-ligaments", relation: "adjacent-to", note: "palpebral ligaments anchor orbicularis oculi" },
      { concept: "levator-palpebrae-superioris", relation: "adjacent-to", note: "antagonist of orbicularis oculi" },
      { concept: "lacrimal-apparatus", relation: "adjacent-to", note: "orbicularis oculi aids tear drainage" },
      { concept: "masseter", relation: "adjacent-to", note: "buccinator lies deep to its front edge" },
    ],
    clinical:
      "In Bell's palsy (a lower motor neuron facial nerve lesion) all these muscles on one side are paralysed, including the forehead; after a stroke (upper motor neuron lesion) the forehead is largely spared because it receives input from both hemispheres.",
  },
  occipitofrontalis: {
    summary:
      "The muscle of the scalp: a frontal belly over the forehead and an occipital belly over the back of the skull, joined by the tough epicranial aponeurosis. The frontal belly raises the eyebrows and wrinkles the forehead; the occipital belly anchors the aponeurosis from behind.",
    latin: "Musculus occipitofrontalis",
    functions: [
      "Raises the eyebrows (surprise, attention) and wrinkles the forehead horizontally",
      "Helps open the eyes widely by lifting the brow",
      "Occipital belly pulls the scalp backwards and tenses the aponeurosis",
    ],
    facts: [
      { label: "Parts", value: "Frontal and occipital bellies linked by the epicranial aponeurosis (galea)" },
      { label: "Bony attachment", value: "Only the occipital belly attaches to bone; the frontal belly inserts into the skin of the eyebrows" },
    ],
    origin: "Frontal belly: epicranial aponeurosis. Occipital belly: lateral two-thirds of the superior nuchal line of the occipital bone and the mastoid process",
    insertion: "Frontal belly: skin and fascia of the eyebrows and forehead. Occipital belly: epicranial aponeurosis",
    action: "Elevates the eyebrows and wrinkles the forehead; moves the scalp",
    innervation: "Facial nerve (CN VII): temporal branch to the frontal belly, posterior auricular branch to the occipital belly",
    bloodSupply: "Supraorbital and supratrochlear arteries (from the ophthalmic artery) in front; occipital and posterior auricular arteries behind",
    connections: [
      { concept: "epicranial-aponeurosis", relation: "attaches-to", note: "both bellies insert into it" },
      { concept: "occipital-bone", relation: "attaches-to", note: "origin of the occipital belly: superior nuchal line" },
      { concept: "frontal-bone", relation: "adjacent-to", note: "frontal belly lies over it without bony attachment" },
      { concept: "skin", relation: "attaches-to", note: "frontal belly inserts into the skin of the eyebrows" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "temporal and posterior auricular branches" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "supraorbital and supratrochlear branches" },
      { concept: "orbicularis-oculi", relation: "adjacent-to", note: "antagonist at the brow" },
    ],
    clinical:
      "Loss of forehead wrinkling on one side distinguishes a facial nerve (lower motor neuron) palsy from a stroke, which spares the forehead because the frontalis receives input from both cerebral hemispheres.",
  },

  "epicranial-aponeurosis": {
    summary:
      "A strong, flat sheet of tendon (the galea aponeurotica) covering the top of the skull, joining the frontal and occipital bellies of occipitofrontalis. It is the third layer of the scalp and is firmly bound to the skin above but moves freely over the loose connective tissue beneath.",
    latin: "Galea aponeurotica",
    functions: [
      "Transmits the pull of the frontal and occipital bellies, letting the scalp move as one unit",
      "Forms the tough middle layer of the scalp (S-C-A-L-P: skin, connective tissue, aponeurosis, loose areolar tissue, pericranium)",
    ],
    facts: [
      { label: "Layer of scalp", value: "The 'A' in SCALP" },
      { label: "Lateral attachment", value: "Temporal fascia above the zygomatic arch" },
    ],
    connections: [
      { concept: "occipitofrontalis", relation: "attaches-to", note: "frontal and occipital bellies" },
      { concept: "parietal-bone", relation: "adjacent-to", note: "glides over the pericranium via loose areolar tissue" },
      { concept: "frontal-bone", relation: "adjacent-to" },
      { concept: "temporalis", relation: "adjacent-to", note: "blends laterally with the temporal fascia" },
      { concept: "skin", relation: "attaches-to", note: "bound to the scalp skin by dense connective tissue" },
    ],
    clinical:
      "Scalp wounds that cut through the aponeurosis gape widely because the frontal and occipital bellies pull the edges apart; blood and pus can spread freely in the loose layer beneath it (the 'danger area' of the scalp).",
  },

  "orbicularis-oculi": {
    summary:
      "A flat, ring-shaped sphincter surrounding each eye. Its thin palpebral part in the eyelids closes the eye gently in blinking and sleep, while the thicker orbital part around the orbit screws the eye shut forcefully.",
    latin: "Musculus orbicularis oculi",
    functions: [
      "Closes the eyelids: gently in blinking (palpebral part), tightly in squinting (orbital part)",
      "Spreads the tear film over the cornea and pumps tears into the lacrimal canaliculi (lacrimal part)",
      "Produces 'crow's feet' wrinkles at the corner of the eye",
    ],
    facts: [
      { label: "Parts", value: "Orbital, palpebral and lacrimal (deep) parts" },
      { label: "Blink rate", value: "About 15–20 blinks per minute at rest" },
    ],
    origin: "Nasal part of the frontal bone, frontal process of the maxilla, medial palpebral ligament and lacrimal bone",
    insertion: "Skin around the orbit, lateral palpebral raphe and the tarsal plates of the eyelids",
    action: "Closes the eyelids; aids tear drainage",
    innervation: "Facial nerve (CN VII): temporal and zygomatic branches",
    bloodSupply: "Branches of the ophthalmic artery (palpebral, supraorbital) and of the facial and superficial temporal arteries",
    connections: [
      { concept: "frontal-bone", relation: "attaches-to", note: "origin: medial orbital margin" },
      { concept: "maxilla", relation: "attaches-to", note: "origin: frontal process" },
      { concept: "tarsal-plates", relation: "attaches-to", note: "palpebral part lies on them" },
      { concept: "lacrimal-apparatus", relation: "acts-on", note: "lacrimal part pumps tears into the canaliculi" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "temporal and zygomatic branches" },
      { concept: "ophthalmic-artery", relation: "supplied-by", note: "palpebral branches" },
      { concept: "occipitofrontalis", relation: "adjacent-to", note: "antagonist at the brow" },
    ],
    clinical:
      "Facial nerve palsy prevents eye closure, so the cornea dries and ulcerates unless protected; the corneal reflex (blinking when the cornea is touched) tests the trigeminal (sensory) and facial (motor) nerves together.",
  },

  "orbicularis-oris": {
    summary:
      "The sphincter muscle of the mouth, forming most of the substance of the lips. Many other facial muscles blend into it, so it shapes the lips for speech, kissing, whistling and keeping food and fluid in the mouth.",
    latin: "Musculus orbicularis oris",
    functions: [
      "Closes and purses the lips",
      "Shapes the lips for articulating speech sounds (p, b, m, w)",
      "Seals the mouth during chewing, sucking and swallowing",
    ],
    facts: [
      { label: "Structure", value: "Mostly fibres from other facial muscles (especially buccinator) interlacing around the mouth, plus intrinsic lip fibres" },
      { label: "Modiolus", value: "A knot of muscle fibres just lateral to each mouth corner where several muscles converge" },
    ],
    origin: "Maxilla and mandible near the midline, and fibres of buccinator and other muscles converging at the modiolus",
    insertion: "Mucous membrane and skin of the lips",
    action: "Closes, compresses and protrudes the lips",
    innervation: "Facial nerve (CN VII): buccal and marginal mandibular branches",
    bloodSupply: "Superior and inferior labial arteries (from the facial artery, a branch of the external carotid)",
    connections: [
      { concept: "maxilla", relation: "attaches-to", note: "incisive fibres near the midline" },
      { concept: "mandible", relation: "attaches-to", note: "incisive fibres near the midline" },
      { concept: "zygomaticus-major", relation: "adjacent-to", note: "inserts at the modiolus" },
      { concept: "levator-labii-superioris", relation: "adjacent-to", note: "blends into the upper lip" },
      { concept: "depressor-anguli-oris", relation: "adjacent-to", note: "inserts at the modiolus" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "buccal and marginal mandibular branches" },
      { concept: "common-carotid-artery", relation: "supplied-by", note: "via the external carotid's facial artery (labial branches)" },
      { concept: "upper-teeth", relation: "adjacent-to", note: "the lips rest against the incisors" },
    ],
    clinical:
      "Weakness from a facial nerve palsy lets food collect in the cheek and saliva drool from the mouth corner; the muscle is repaired in layers during cleft-lip surgery to restore lip function.",
  },

  "zygomaticus-major": {
    summary:
      "The main 'smiling muscle': a slender band running from the zygomatic (cheek) bone down to the corner of the mouth, which it pulls upwards and outwards.",
    latin: "Musculus zygomaticus major",
    functions: ["Draws the angle of the mouth up and laterally in smiling and laughing", "Deepens the nasolabial fold"],
    facts: [
      { label: "Genuine smile", value: "A felt (Duchenne) smile combines zygomaticus major with orbicularis oculi" },
      { label: "Variation", value: "A bifid muscle is thought to underlie cheek dimples" },
    ],
    origin: "Lateral surface of the zygomatic bone, in front of the zygomaticotemporal suture",
    insertion: "Modiolus at the angle of the mouth, blending with orbicularis oris",
    action: "Elevates and retracts the angle of the mouth",
    innervation: "Facial nerve (CN VII): zygomatic and buccal branches",
    bloodSupply: "Superior labial branch of the facial artery (external carotid)",
    connections: [
      { concept: "zygomatic-bone", relation: "attaches-to", note: "origin" },
      { concept: "orbicularis-oris", relation: "attaches-to", note: "insertion at the modiolus" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "zygomatic and buccal branches" },
      { concept: "common-carotid-artery", relation: "supplied-by", note: "via the external carotid's facial artery" },
      { concept: "masseter", relation: "adjacent-to", note: "crosses superficial to its front edge" },
      { concept: "depressor-anguli-oris", relation: "adjacent-to", note: "antagonist at the mouth corner" },
    ],
    clinical: "Drooping of the mouth corner on one side, with an asymmetric smile, is an early sign of facial nerve weakness.",
  },

  "levator-labii-superioris": {
    summary:
      "A thin, flat muscle running from just below the eye socket down into the upper lip, which it raises and everts, as when showing the upper teeth or expressing disgust.",
    latin: "Musculus levator labii superioris",
    functions: ["Elevates and everts the upper lip", "Deepens the nasolabial furrow in sadness or disgust"],
    origin: "Infraorbital margin of the maxilla (and adjacent zygomatic bone), above the infraorbital foramen",
    insertion: "Muscle and skin of the upper lip",
    action: "Raises the upper lip",
    innervation: "Facial nerve (CN VII): zygomatic and buccal branches",
    bloodSupply: "Facial artery and infraorbital artery",
    connections: [
      { concept: "maxilla", relation: "attaches-to", note: "origin: infraorbital margin" },
      { concept: "orbicularis-oris", relation: "attaches-to", note: "inserts into the upper lip" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by" },
      { concept: "orbicularis-oculi", relation: "adjacent-to", note: "origin is covered by its orbital part" },
      { concept: "zygomaticus-major", relation: "adjacent-to" },
    ],
    clinical: "It covers the infraorbital foramen, the site where the infraorbital nerve is anaesthetised for procedures on the upper lip and teeth.",
  },

  "depressor-anguli-oris": {
    summary:
      "A triangular muscle below the corner of the mouth, arising from the lower border of the mandible and converging on the modiolus. It pulls the mouth corner down, as in frowning or sadness.",
    latin: "Musculus depressor anguli oris",
    functions: ["Depresses the angle of the mouth (frowning, sadness)", "Antagonises zygomaticus major and levator anguli oris"],
    origin: "Oblique line of the mandible, below the canine to first molar teeth",
    insertion: "Modiolus at the angle of the mouth",
    action: "Draws the angle of the mouth downwards and laterally",
    innervation: "Facial nerve (CN VII): marginal mandibular branch",
    bloodSupply: "Inferior labial branch of the facial artery",
    connections: [
      { concept: "mandible", relation: "attaches-to", note: "origin: oblique line" },
      { concept: "orbicularis-oris", relation: "attaches-to", note: "insertion at the modiolus" },
      { concept: "facial-nerve-cn-vii", relation: "innervated-by", note: "marginal mandibular branch" },
      { concept: "platysma", relation: "adjacent-to", note: "continuous with it below" },
      { concept: "zygomaticus-major", relation: "adjacent-to", note: "antagonist" },
    ],
    clinical:
      "Injury to the marginal mandibular branch of the facial nerve, which runs along the jaw line, during neck or jaw surgery causes an asymmetric lower lip and smile.",
  },
};
