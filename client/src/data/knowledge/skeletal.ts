import type { ConceptInfo } from "./types";

/**
 * Skeletal system knowledge base: bones, cartilages, intervertebral discs and skeletal ligaments.
 * Typical adult values; see Gray's Anatomy, Moore's Clinically Oriented Anatomy and Netter.
 */
export const skeletal: Record<string, ConceptInfo> = {
  // ───────────────────────────── Upper limb ─────────────────────────────
  "clavicle": {
    summary:
      "The clavicle (collarbone) is an S-shaped long bone that acts as a strut holding the upper limb away from the trunk. It is the only bony link between the upper limb and the axial skeleton.",
    latin: "Clavicula",
    functions: [
      "Braces the shoulder laterally so the arm can swing freely",
      "Transmits forces from the upper limb to the axial skeleton",
      "Protects the subclavian vessels and brachial plexus passing beneath it",
      "Provides attachment for neck, chest and shoulder muscles",
    ],
    facts: [
      { label: "Bone type", value: "long bone lying horizontally; unusually, it has no true medullary (marrow) cavity" },
      { label: "Ossification", value: "first bone to start ossifying (about week 5–6 of gestation), mostly intramembranous; its medial epiphysis is among the last to fuse, often not until the mid-20s" },
      { label: "Joints", value: "sternoclavicular (medial) and acromioclavicular (lateral)" },
    ],
    connections: [
      { concept: "manubrium-of-sternum", relation: "articulates-with", note: "sternoclavicular joint" },
      { concept: "first-costal-cartilage", relation: "articulates-with", note: "sternoclavicular joint (via its articular disc)" },
      { concept: "scapula", relation: "articulates-with", note: "acromioclavicular joint with the acromion" },
      { concept: "first-rib", relation: "adjacent-to", note: "bound by the costoclavicular ligament" },
      { concept: "sternocleidomastoid", relation: "attaches-to", note: "origin of clavicular head (medial third)" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin of clavicular head" },
      { concept: "deltoid", relation: "attaches-to", note: "origin (lateral third, anterior)" },
      { concept: "trapezius", relation: "attaches-to", note: "insertion (lateral third, posterior)" },
      { concept: "subclavius", relation: "attaches-to", note: "insertion (subclavian groove)" },
      { concept: "subclavian-vein", relation: "adjacent-to", note: "passes behind and below the clavicle" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "passes behind the middle third" },
    ],
    clinical:
      "One of the most commonly fractured bones, usually at the middle third after a fall on the shoulder or outstretched hand; the medial fragment is pulled up by sternocleidomastoid while the limb's weight drags the lateral fragment down.",
  },

  "scapula": {
    summary:
      "The scapula (shoulder blade) is a triangular flat bone on the posterior thoracic wall. Its shallow glenoid cavity forms the socket of the shoulder joint, and it slides over the ribs to position the arm.",
    latin: "Scapula",
    functions: [
      "Provides the glenoid socket for the shoulder (glenohumeral) joint",
      "Anchors the rotator cuff and many other shoulder muscles",
      "Rotates, elevates and protracts to extend the arm's range of motion",
    ],
    facts: [
      { label: "Bone type", value: "flat bone" },
      { label: "Position", value: "overlies ribs 2–7 posteriorly" },
      { label: "Key landmarks", value: "spine, acromion, coracoid process, glenoid cavity, supraspinous and infraspinous fossae" },
      { label: "Muscle attachments", value: "about 17 muscles" },
    ],
    connections: [
      { concept: "humerus", relation: "articulates-with", note: "glenohumeral joint" },
      { concept: "clavicle", relation: "articulates-with", note: "acromioclavicular joint" },
      { concept: "supraspinatus", relation: "attaches-to", note: "origin (supraspinous fossa)" },
      { concept: "infraspinatus", relation: "attaches-to", note: "origin (infraspinous fossa)" },
      { concept: "subscapularis", relation: "attaches-to", note: "origin (subscapular fossa)" },
      { concept: "teres-minor", relation: "attaches-to", note: "origin (lateral border)" },
      { concept: "deltoid", relation: "attaches-to", note: "origin (acromion and spine)" },
      { concept: "trapezius", relation: "attaches-to", note: "insertion (acromion and spine)" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "insertion (anterior medial border)" },
      { concept: "biceps-brachii", relation: "attaches-to", note: "origin (coracoid process and supraglenoid tubercle)" },
      { concept: "triceps-brachii", relation: "attaches-to", note: "origin of long head (infraglenoid tubercle)" },
      { concept: "suprascapular-artery", relation: "supplied-by" },
      { concept: "circumflex-scapular-artery", relation: "supplied-by" },
    ],
    clinical:
      "Scapular fractures are uncommon because the bone is well padded by muscle. Injury to the long thoracic nerve paralyses serratus anterior, so the medial border lifts off the chest wall (\"winged scapula\").",
  },

  "humerus": {
    summary:
      "The humerus is the long bone of the arm, running from the shoulder to the elbow. Its rounded head fits the glenoid cavity of the scapula, and its distal end articulates with both forearm bones.",
    latin: "Humerus",
    functions: [
      "Forms the shoulder and elbow joints",
      "Acts as the lever for arm movements",
      "Provides attachment for rotator cuff, deltoid, arm and forearm muscles",
    ],
    facts: [
      { label: "Length", value: "about 30–35 cm (longest bone of the upper limb)" },
      { label: "Bone type", value: "long bone" },
      { label: "Key landmarks", value: "greater and lesser tubercles, surgical neck, deltoid tuberosity, radial groove, medial and lateral epicondyles" },
    ],
    connections: [
      { concept: "scapula", relation: "articulates-with", note: "glenohumeral joint" },
      { concept: "ulna", relation: "articulates-with", note: "humeroulnar joint (trochlea)" },
      { concept: "radius", relation: "articulates-with", note: "humeroradial joint (capitulum)" },
      { concept: "supraspinatus", relation: "attaches-to", note: "insertion (greater tubercle)" },
      { concept: "subscapularis", relation: "attaches-to", note: "insertion (lesser tubercle)" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "insertion (lateral lip of intertubercular sulcus)" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "insertion (floor of intertubercular sulcus)" },
      { concept: "deltoid", relation: "attaches-to", note: "insertion (deltoid tuberosity)" },
      { concept: "brachialis", relation: "attaches-to", note: "origin (distal anterior shaft)" },
      { concept: "axillary-nerve", relation: "adjacent-to", note: "wraps around the surgical neck" },
      { concept: "radial-nerve", relation: "adjacent-to", note: "runs in the radial (spiral) groove" },
      { concept: "ulnar-nerve", relation: "adjacent-to", note: "passes behind the medial epicondyle" },
      { concept: "brachial-artery", relation: "supplied-by", note: "nutrient artery to the shaft" },
      { concept: "posterior-circumflex-humeral-artery", relation: "supplied-by", note: "with the anterior circumflex humeral artery, supplies the head and neck" },
    ],
    clinical:
      "Fractures at three sites each threaten a nerve: surgical neck (axillary nerve), midshaft (radial nerve, causing wrist drop) and medial epicondyle (ulnar nerve). Supracondylar fractures in children can injure the brachial artery.",
  },

  "radius": {
    summary:
      "The radius is the lateral (thumb-side) bone of the forearm. It is narrow at the elbow and broad at the wrist, where it forms most of the wrist joint, and it rotates around the ulna during pronation and supination.",
    latin: "Radius",
    functions: [
      "Forms the main forearm contribution to the wrist (radiocarpal) joint",
      "Rotates around the ulna to pronate and supinate the forearm",
      "Transmits forces from the hand to the forearm",
    ],
    facts: [
      { label: "Bone type", value: "long bone" },
      { label: "Key landmarks", value: "head, neck, radial tuberosity, styloid process, dorsal (Lister's) tubercle" },
      { label: "Joints", value: "humeroradial, proximal and distal radioulnar, radiocarpal" },
    ],
    connections: [
      { concept: "humerus", relation: "articulates-with", note: "head articulates with the capitulum" },
      { concept: "ulna", relation: "articulates-with", note: "proximal and distal radioulnar joints" },
      { concept: "scaphoid-bone", relation: "articulates-with", note: "radiocarpal joint" },
      { concept: "lunate-bone", relation: "articulates-with", note: "radiocarpal joint" },
      { concept: "interosseous-membrane-of-forearm", relation: "attaches-to", note: "interosseous border" },
      { concept: "biceps-brachii", relation: "attaches-to", note: "insertion (radial tuberosity)" },
      { concept: "supinator", relation: "attaches-to", note: "insertion (proximal shaft)" },
      { concept: "pronator-teres", relation: "attaches-to", note: "insertion (middle of lateral shaft)" },
      { concept: "brachioradialis", relation: "attaches-to", note: "insertion (base of styloid process)" },
      { concept: "pronator-quadratus", relation: "attaches-to", note: "insertion (distal anterior shaft)" },
      { concept: "flexor-pollicis-longus", relation: "attaches-to", note: "origin (anterior shaft)" },
      { concept: "anterior-interosseous-artery", relation: "supplied-by", note: "nutrient artery" },
      { concept: "radial-artery", relation: "adjacent-to", note: "radial pulse felt against the distal radius" },
    ],
    clinical:
      "The distal radius is the most commonly fractured forearm site; a Colles fracture (fall on an outstretched hand) displaces the distal fragment dorsally, giving a \"dinner-fork\" deformity.",
  },

  "ulna": {
    summary:
      "The ulna is the medial (little-finger-side) bone of the forearm. Its hook-like proximal end (olecranon and trochlear notch) grips the humerus to form the hinge of the elbow, while its small distal head sits beside the wrist.",
    latin: "Ulna",
    functions: [
      "Forms the main hinge of the elbow with the humerus",
      "Provides a stable axis around which the radius rotates",
      "Anchors many forearm flexor and extensor muscles",
    ],
    facts: [
      { label: "Bone type", value: "long bone; slightly longer than the radius" },
      { label: "Key landmarks", value: "olecranon, coronoid process, trochlear notch, radial notch, head, styloid process" },
      { label: "Wrist", value: "separated from the carpal bones by an articular disc (part of the triangular fibrocartilage complex)" },
    ],
    connections: [
      { concept: "humerus", relation: "articulates-with", note: "humeroulnar joint (trochlea)" },
      { concept: "radius", relation: "articulates-with", note: "proximal and distal radioulnar joints" },
      { concept: "interosseous-membrane-of-forearm", relation: "attaches-to", note: "interosseous border" },
      { concept: "triceps-brachii", relation: "attaches-to", note: "insertion (olecranon)" },
      { concept: "brachialis", relation: "attaches-to", note: "insertion (coronoid process and ulnar tuberosity)" },
      { concept: "anconeus", relation: "attaches-to", note: "insertion (lateral olecranon)" },
      { concept: "flexor-digitorum-profundus", relation: "attaches-to", note: "origin (anterior and medial shaft)" },
      { concept: "pronator-quadratus", relation: "attaches-to", note: "origin (distal anterior shaft)" },
      { concept: "flexor-carpi-ulnaris", relation: "attaches-to", note: "origin of ulnar head (olecranon, posterior border)" },
      { concept: "anterior-interosseous-artery", relation: "supplied-by", note: "nutrient artery" },
      { concept: "ulnar-nerve", relation: "adjacent-to", note: "runs along the medial side of the forearm" },
    ],
    clinical:
      "A fall on the elbow can fracture the olecranon. A Monteggia injury combines a proximal ulnar shaft fracture with dislocation of the radial head.",
  },

  "interosseous-membrane-of-forearm": {
    summary:
      "A strong sheet of fibrous tissue joining the interosseous borders of the radius and ulna. It holds the two bones together, separates the anterior and posterior forearm compartments and gives origin to deep forearm muscles.",
    latin: "Membrana interossea antebrachii",
    functions: [
      "Binds the radius and ulna together (a syndesmosis)",
      "Transfers load from the radius (wrist) to the ulna (elbow)",
      "Provides origin for deep flexor and extensor muscles",
    ],
    facts: [
      { label: "Fibre direction", value: "most fibres run obliquely downward and medially from radius to ulna" },
      { label: "Joint type", value: "fibrous joint (syndesmosis)" },
    ],
    connections: [
      { concept: "radius", relation: "attaches-to", note: "interosseous border" },
      { concept: "ulna", relation: "attaches-to", note: "interosseous border" },
      { concept: "flexor-digitorum-profundus", relation: "attaches-to", note: "origin (anterior surface)" },
      { concept: "flexor-pollicis-longus", relation: "attaches-to", note: "origin (anterior surface)" },
      { concept: "abductor-pollicis-longus", relation: "attaches-to", note: "origin (posterior surface)" },
      { concept: "extensor-pollicis-longus", relation: "attaches-to", note: "origin (posterior surface)" },
      { concept: "anterior-interosseous-artery", relation: "adjacent-to", note: "runs down its anterior surface" },
    ],
    clinical:
      "In an Essex-Lopresti injury a radial head fracture is combined with tearing of the interosseous membrane and disruption of the distal radioulnar joint.",
  },

  // ───────────────────────────── Carpal bones ─────────────────────────────
  "scaphoid-bone": {
    summary:
      "The scaphoid is the largest bone of the proximal carpal row, on the thumb side of the wrist. It bridges the proximal and distal rows and lies in the floor of the anatomical snuffbox.",
    latin: "Os scaphoideum",
    functions: [
      "Forms part of the wrist (radiocarpal) joint with the radius",
      "Links the proximal and distal carpal rows, stabilising the wrist",
      "Its tubercle anchors the flexor retinaculum",
    ],
    facts: [
      { label: "Bone type", value: "short bone (proximal row)" },
      { label: "Fracture frequency", value: "most commonly fractured carpal bone" },
      { label: "Blood supply", value: "enters mainly distally, so the proximal pole depends on retrograde flow" },
    ],
    connections: [
      { concept: "radius", relation: "articulates-with", note: "radiocarpal joint" },
      { concept: "lunate-bone", relation: "articulates-with" },
      { concept: "capitate-bone", relation: "articulates-with" },
      { concept: "trapezium-bone", relation: "articulates-with" },
      { concept: "trapezoid-bone", relation: "articulates-with" },
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "scaphoid tubercle" },
      { concept: "abductor-pollicis-brevis", relation: "attaches-to", note: "partial origin (tubercle)" },
      { concept: "radial-artery", relation: "supplied-by", note: "branches enter the distal part; artery crosses the snuffbox" },
    ],
    clinical:
      "A fall on an outstretched hand can fracture the scaphoid waist; tenderness in the anatomical snuffbox is the classic sign. Because blood enters distally, the proximal fragment may undergo avascular necrosis or fail to unite.",
  },

  "lunate-bone": {
    summary:
      "The lunate is a crescent-shaped bone in the middle of the proximal carpal row. It articulates with the radius and sits at the centre of the wrist, directly behind the carpal tunnel.",
    latin: "Os lunatum",
    functions: [
      "Forms part of the radiocarpal (wrist) joint",
      "Transmits load from the capitate to the radius",
    ],
    facts: [
      { label: "Bone type", value: "short bone (proximal row)" },
      { label: "Dislocation", value: "most commonly dislocated carpal bone" },
    ],
    connections: [
      { concept: "radius", relation: "articulates-with", note: "radiocarpal joint" },
      { concept: "scaphoid-bone", relation: "articulates-with" },
      { concept: "triquetral-bone", relation: "articulates-with" },
      { concept: "capitate-bone", relation: "articulates-with" },
      { concept: "median-nerve", relation: "adjacent-to", note: "anterior dislocation can compress it in the carpal tunnel" },
    ],
    clinical:
      "Anterior dislocation of the lunate can compress the median nerve in the carpal tunnel. Avascular necrosis of the lunate is called Kienböck disease.",
  },

  "triquetral-bone": {
    summary:
      "The triquetrum is a pyramid-shaped bone on the medial (little-finger) side of the proximal carpal row. The pea-shaped pisiform sits on its palmar surface.",
    latin: "Os triquetrum",
    functions: [
      "Forms the medial part of the proximal carpal row",
      "Articulates with the articular disc of the wrist rather than directly with the ulna",
    ],
    facts: [
      { label: "Bone type", value: "short bone (proximal row)" },
      { label: "Fracture frequency", value: "second most commonly fractured carpal (often a dorsal chip)" },
    ],
    connections: [
      { concept: "lunate-bone", relation: "articulates-with" },
      { concept: "pisiform-bone", relation: "articulates-with", note: "palmar surface" },
      { concept: "hamate-bone", relation: "articulates-with" },
      { concept: "ulna", relation: "adjacent-to", note: "separated by the articular disc (triangular fibrocartilage)" },
    ],
  },

  "pisiform-bone": {
    summary:
      "The pisiform is a small, pea-shaped sesamoid bone lying within the tendon of flexor carpi ulnaris on the palmar surface of the triquetrum. It is easily felt at the base of the hypothenar eminence.",
    latin: "Os pisiforme",
    functions: [
      "Increases the leverage of flexor carpi ulnaris",
      "Anchors the flexor retinaculum and abductor digiti minimi",
      "Forms the medial wall of the ulnar (Guyon's) canal",
    ],
    facts: [
      { label: "Bone type", value: "sesamoid bone (proximal row)" },
      { label: "Ossification", value: "last carpal bone to ossify (around 9–12 years)" },
    ],
    connections: [
      { concept: "triquetral-bone", relation: "articulates-with", note: "its only joint" },
      { concept: "flexor-carpi-ulnaris", relation: "attaches-to", note: "insertion (the pisiform lies within its tendon)" },
      { concept: "abductor-digiti-minimi-of-hand", relation: "attaches-to", note: "origin" },
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "medial attachment" },
      { concept: "ulnar-nerve", relation: "adjacent-to", note: "passes lateral to it in Guyon's canal" },
      { concept: "ulnar-artery", relation: "adjacent-to", note: "passes lateral to it in Guyon's canal" },
    ],
    clinical:
      "The ulnar nerve and artery can be compressed in Guyon's canal between the pisiform and the hook of the hamate (e.g. in cyclists).",
  },

  "trapezium-bone": {
    summary:
      "The trapezium is the lateral bone of the distal carpal row, at the base of the thumb. Its saddle-shaped facet with the first metacarpal allows the thumb's wide range of movement, including opposition.",
    latin: "Os trapezium",
    functions: [
      "Forms the saddle joint of the thumb (1st carpometacarpal joint)",
      "Its tubercle anchors the flexor retinaculum and thenar muscles",
      "Has a groove for the tendon of flexor carpi radialis",
    ],
    facts: [
      { label: "Bone type", value: "short bone (distal row)" },
      { label: "Joint", value: "1st carpometacarpal joint is a saddle (sellar) joint" },
    ],
    connections: [
      { concept: "first-metacarpal", relation: "articulates-with", note: "saddle joint of the thumb" },
      { concept: "scaphoid-bone", relation: "articulates-with" },
      { concept: "trapezoid-bone", relation: "articulates-with" },
      { concept: "second-metacarpal", relation: "articulates-with", note: "small facet" },
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "trapezium tubercle" },
      { concept: "opponens-pollicis", relation: "attaches-to", note: "origin (with flexor retinaculum)" },
      { concept: "flexor-carpi-radialis", relation: "adjacent-to", note: "tendon runs in the trapezium groove" },
    ],
    clinical:
      "Osteoarthritis of the trapezium–first metacarpal joint (\"base-of-thumb arthritis\") is very common, especially in older women.",
  },

  "trapezoid-bone": {
    summary:
      "The trapezoid is a small wedge-shaped bone in the distal carpal row, between the trapezium and capitate. It is the smallest bone of the distal row and supports the base of the second metacarpal.",
    latin: "Os trapezoideum",
    functions: [
      "Forms the main joint surface for the second metacarpal",
      "Contributes to the rigid distal carpal row",
    ],
    facts: [
      { label: "Bone type", value: "short bone (distal row)" },
      { label: "Size", value: "smallest bone of the distal row" },
    ],
    connections: [
      { concept: "second-metacarpal", relation: "articulates-with" },
      { concept: "scaphoid-bone", relation: "articulates-with" },
      { concept: "trapezium-bone", relation: "articulates-with" },
      { concept: "capitate-bone", relation: "articulates-with" },
    ],
  },

  "capitate-bone": {
    summary:
      "The capitate is the largest carpal bone and sits in the centre of the wrist. Its rounded head fits into the concavity formed by the scaphoid and lunate, and it supports the third metacarpal.",
    latin: "Os capitatum",
    functions: [
      "Acts as the keystone of the carpus",
      "Transmits force from the middle finger ray to the proximal row",
      "Gives partial origin to adductor pollicis",
    ],
    facts: [
      { label: "Bone type", value: "short bone (distal row)" },
      { label: "Size", value: "largest carpal bone" },
      { label: "Ossification", value: "first carpal to ossify (within the first year)" },
    ],
    connections: [
      { concept: "third-metacarpal", relation: "articulates-with", note: "main distal joint" },
      { concept: "second-metacarpal", relation: "articulates-with" },
      { concept: "fourth-metacarpal", relation: "articulates-with" },
      { concept: "scaphoid-bone", relation: "articulates-with" },
      { concept: "lunate-bone", relation: "articulates-with" },
      { concept: "trapezoid-bone", relation: "articulates-with" },
      { concept: "hamate-bone", relation: "articulates-with" },
      { concept: "adductor-pollicis", relation: "attaches-to", note: "origin of oblique head" },
    ],
  },

  "hamate-bone": {
    summary:
      "The hamate is a wedge-shaped bone on the medial side of the distal carpal row, recognised by its hook (hamulus) projecting into the palm. The hook forms part of the boundary of the carpal tunnel and the ulnar canal.",
    latin: "Os hamatum",
    functions: [
      "Supports the fourth and fifth metacarpals",
      "Its hook anchors the flexor retinaculum and hypothenar muscles",
    ],
    facts: [
      { label: "Bone type", value: "short bone (distal row)" },
      { label: "Key landmark", value: "hook of hamate (palpable deep in the hypothenar eminence)" },
    ],
    connections: [
      { concept: "fourth-metacarpal", relation: "articulates-with" },
      { concept: "fifth-metacarpal", relation: "articulates-with" },
      { concept: "triquetral-bone", relation: "articulates-with" },
      { concept: "capitate-bone", relation: "articulates-with" },
      { concept: "flexor-retinaculum-of-wrist", relation: "attaches-to", note: "hook of hamate" },
      { concept: "flexor-digiti-minimi-brevis-of-hand", relation: "attaches-to", note: "origin (hook)" },
      { concept: "opponens-digiti-minimi-of-hand", relation: "attaches-to", note: "origin (hook)" },
      { concept: "ulnar-nerve", relation: "adjacent-to", note: "deep branch curves around the hook" },
    ],
    clinical:
      "The hook can fracture in golfers and racquet-sport players when the handle strikes the palm, sometimes irritating the ulnar nerve.",
  },

  // ───────────────────────────── Metacarpals ─────────────────────────────
  "first-metacarpal": {
    summary:
      "The first metacarpal is the shortest and stoutest metacarpal, forming the palm skeleton of the thumb. Its saddle joint with the trapezium lets the thumb oppose the other fingers.",
    latin: "Os metacarpi I",
    functions: [
      "Forms the thumb's carpometacarpal (saddle) joint",
      "Positions the thumb for opposition and grip",
    ],
    facts: [
      { label: "Size", value: "shortest and thickest metacarpal" },
      { label: "Ossification", value: "its epiphysis is at the base (like a phalanx), unlike metacarpals 2–5 whose epiphyses are at the head" },
    ],
    connections: [
      { concept: "trapezium-bone", relation: "articulates-with", note: "saddle joint" },
      { concept: "phalanges-of-thumb", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "opponens-pollicis", relation: "attaches-to", note: "insertion (lateral shaft)" },
      { concept: "abductor-pollicis-longus", relation: "attaches-to", note: "insertion (base)" },
    ],
    clinical:
      "A Bennett fracture is an intra-articular fracture-dislocation of the base of the first metacarpal, often from a punch with the thumb flexed.",
  },

  "second-metacarpal": {
    summary:
      "The second metacarpal supports the index finger. It is the longest metacarpal and has the largest base, which is wedged firmly into the distal carpal row.",
    latin: "Os metacarpi II",
    functions: [
      "Supports the index finger",
      "Provides a stable central pillar of the hand",
      "Receives the insertions of two wrist muscles",
    ],
    facts: [
      { label: "Size", value: "longest metacarpal, largest base" },
    ],
    connections: [
      { concept: "trapezoid-bone", relation: "articulates-with", note: "main carpal joint" },
      { concept: "trapezium-bone", relation: "articulates-with" },
      { concept: "capitate-bone", relation: "articulates-with" },
      { concept: "third-metacarpal", relation: "articulates-with" },
      { concept: "phalanges-of-index-finger", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "extensor-carpi-radialis-longus", relation: "attaches-to", note: "insertion (dorsal base)" },
      { concept: "flexor-carpi-radialis", relation: "attaches-to", note: "insertion (palmar base)" },
    ],
  },

  "third-metacarpal": {
    summary:
      "The third metacarpal supports the middle finger and is identified by a styloid process on the lateral side of its base. Its joint with the capitate is almost immobile.",
    latin: "Os metacarpi III",
    functions: [
      "Supports the middle finger",
      "Forms, with the second metacarpal, the rigid central column of the hand",
    ],
    facts: [
      { label: "Key landmark", value: "styloid process at the dorsolateral base" },
    ],
    connections: [
      { concept: "capitate-bone", relation: "articulates-with" },
      { concept: "second-metacarpal", relation: "articulates-with" },
      { concept: "fourth-metacarpal", relation: "articulates-with" },
      { concept: "phalanges-of-middle-finger", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "extensor-carpi-radialis-brevis", relation: "attaches-to", note: "insertion (base)" },
      { concept: "adductor-pollicis", relation: "attaches-to", note: "origin of transverse head (palmar shaft)" },
    ],
  },

  "fourth-metacarpal": {
    summary:
      "The fourth metacarpal supports the ring finger. It is thinner than the second and third, and its carpometacarpal joint allows slight flexion that helps cup the palm.",
    latin: "Os metacarpi IV",
    functions: [
      "Supports the ring finger",
      "Allows a little mobility at its base for cupping and gripping",
    ],
    facts: [
      { label: "Mobility", value: "4th and 5th carpometacarpal joints are more mobile than the 2nd and 3rd" },
    ],
    connections: [
      { concept: "hamate-bone", relation: "articulates-with" },
      { concept: "capitate-bone", relation: "articulates-with" },
      { concept: "third-metacarpal", relation: "articulates-with" },
      { concept: "fifth-metacarpal", relation: "articulates-with" },
      { concept: "phalanges-of-ring-finger", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "intrinsic-muscles-of-hand", relation: "attaches-to", note: "origin of interossei" },
    ],
  },

  "fifth-metacarpal": {
    summary:
      "The fifth metacarpal supports the little finger on the ulnar border of the hand. Its mobile base helps cup the hand, and its neck is a common fracture site when punching.",
    latin: "Os metacarpi V",
    functions: [
      "Supports the little finger",
      "Mobile base contributes to cupping and a strong grip",
    ],
    facts: [
      { label: "Common fracture", value: "\"boxer's fracture\" of the neck" },
    ],
    connections: [
      { concept: "hamate-bone", relation: "articulates-with" },
      { concept: "fourth-metacarpal", relation: "articulates-with" },
      { concept: "phalanges-of-little-finger", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "extensor-carpi-ulnaris", relation: "attaches-to", note: "insertion (medial base)" },
      { concept: "opponens-digiti-minimi-of-hand", relation: "attaches-to", note: "insertion (medial shaft)" },
      { concept: "flexor-carpi-ulnaris", relation: "attaches-to", note: "insertion via the pisometacarpal ligament" },
    ],
    clinical:
      "A boxer's fracture of the fifth metacarpal neck results from punching with a closed fist; the head tilts toward the palm.",
  },

  // ───────────────────────────── Phalanges of the hand ─────────────────────────────
  "phalanges-of-thumb": {
    summary:
      "The thumb has only two phalanges, proximal and distal, joined by a single interphalangeal joint. They carry the insertions of the long and short thumb muscles.",
    latin: "Phalanges pollicis",
    functions: [
      "Form the movable skeleton of the thumb",
      "Transmit pinch and grip forces",
    ],
    facts: [
      { label: "Number", value: "2 (proximal and distal); 14 phalanges in each hand overall" },
      { label: "Joints", value: "metacarpophalangeal and one interphalangeal joint" },
    ],
    connections: [
      { concept: "first-metacarpal", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "flexor-pollicis-longus", relation: "attaches-to", note: "insertion (base of distal phalanx)" },
      { concept: "extensor-pollicis-longus", relation: "attaches-to", note: "insertion (base of distal phalanx)" },
      { concept: "extensor-pollicis-brevis", relation: "attaches-to", note: "insertion (base of proximal phalanx)" },
      { concept: "abductor-pollicis-brevis", relation: "attaches-to", note: "insertion (lateral base of proximal phalanx)" },
      { concept: "flexor-pollicis-brevis", relation: "attaches-to", note: "insertion (base of proximal phalanx)" },
      { concept: "adductor-pollicis", relation: "attaches-to", note: "insertion (medial base of proximal phalanx)" },
    ],
    clinical:
      "Forced abduction of the thumb can tear the ulnar collateral ligament of the metacarpophalangeal joint (\"skier's\" or \"gamekeeper's\" thumb).",
  },

  "phalanges-of-index-finger": {
    summary:
      "The index finger has three phalanges (proximal, middle and distal). It is the most independent finger, with its own extensor tendon (extensor indicis) in addition to extensor digitorum.",
    latin: "Phalanges digiti secundi",
    functions: [
      "Precision pinch with the thumb",
      "Pointing and fine manipulation",
    ],
    facts: [
      { label: "Number", value: "3 phalanges" },
      { label: "Joints", value: "MCP, proximal and distal interphalangeal (PIP, DIP)" },
    ],
    connections: [
      { concept: "second-metacarpal", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "flexor-digitorum-superficialis", relation: "attaches-to", note: "insertion (middle phalanx)" },
      { concept: "flexor-digitorum-profundus", relation: "attaches-to", note: "insertion (distal phalanx)" },
      { concept: "extensor-digitorum", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "extensor-indicis", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "intrinsic-muscles-of-hand", relation: "attaches-to", note: "1st dorsal interosseous and lumbrical" },
    ],
  },

  "phalanges-of-middle-finger": {
    summary:
      "The middle finger has three phalanges and is usually the longest digit. The midline axis of the hand passes through it, so dorsal interossei insert on both of its sides.",
    latin: "Phalanges digiti tertii",
    functions: [
      "Power grip and fine manipulation",
      "Reference axis for finger abduction and adduction",
    ],
    facts: [
      { label: "Number", value: "3 phalanges" },
      { label: "Note", value: "abduction is movement away from the middle finger's axis" },
    ],
    connections: [
      { concept: "third-metacarpal", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "flexor-digitorum-superficialis", relation: "attaches-to", note: "insertion (middle phalanx)" },
      { concept: "flexor-digitorum-profundus", relation: "attaches-to", note: "insertion (distal phalanx)" },
      { concept: "extensor-digitorum", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "intrinsic-muscles-of-hand", relation: "attaches-to", note: "2nd and 3rd dorsal interossei" },
    ],
  },

  "phalanges-of-ring-finger": {
    summary:
      "The ring finger has three phalanges. Its extensor tendon is linked to neighbouring tendons by intertendinous connections, which limits its independent extension.",
    latin: "Phalanges digiti quarti",
    functions: [
      "Power grip",
      "Contributes to cupping of the hand",
    ],
    facts: [
      { label: "Number", value: "3 phalanges" },
    ],
    connections: [
      { concept: "fourth-metacarpal", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "flexor-digitorum-superficialis", relation: "attaches-to", note: "insertion (middle phalanx)" },
      { concept: "flexor-digitorum-profundus", relation: "attaches-to", note: "insertion (distal phalanx)" },
      { concept: "extensor-digitorum", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "intrinsic-muscles-of-hand", relation: "attaches-to", note: "interossei and lumbrical" },
    ],
    clinical:
      "\"Jersey finger\" (avulsion of flexor digitorum profundus from the distal phalanx) most often affects the ring finger.",
  },

  "phalanges-of-little-finger": {
    summary:
      "The little finger has three small phalanges. Besides the long flexors and extensors, it receives the hypothenar muscles and its own extensor, extensor digiti minimi.",
    latin: "Phalanges digiti minimi",
    functions: [
      "Adds strength to power grip",
      "Stabilises the ulnar side of the hand",
    ],
    facts: [
      { label: "Number", value: "3 phalanges" },
    ],
    connections: [
      { concept: "fifth-metacarpal", relation: "articulates-with", note: "metacarpophalangeal joint" },
      { concept: "flexor-digitorum-superficialis", relation: "attaches-to", note: "insertion (middle phalanx)" },
      { concept: "flexor-digitorum-profundus", relation: "attaches-to", note: "insertion (distal phalanx)" },
      { concept: "extensor-digiti-minimi", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "abductor-digiti-minimi-of-hand", relation: "attaches-to", note: "insertion (medial base of proximal phalanx)" },
      { concept: "flexor-digiti-minimi-brevis-of-hand", relation: "attaches-to", note: "insertion (base of proximal phalanx)" },
    ],
  },

  // ───────────────────────────── Pelvis & lower limb ─────────────────────────────
  "hip-bone": {
    summary:
      "The hip bone (os coxae) is a large, irregular bone formed by the fusion of the ilium, ischium and pubis at the acetabulum. The two hip bones and the sacrum make up the bony pelvis, which transmits body weight to the lower limbs.",
    latin: "Os coxae",
    functions: [
      "Forms the hip socket (acetabulum) for the head of the femur",
      "Transfers weight from the vertebral column (via the sacrum) to the legs",
      "Protects pelvic organs and supports the pelvic floor",
      "Anchors trunk, gluteal, thigh and pelvic floor muscles",
    ],
    facts: [
      { label: "Parts", value: "ilium, ischium and pubis, fused at the Y-shaped triradiate cartilage in the mid-to-late teens" },
      { label: "Joints", value: "sacroiliac, hip, and pubic symphysis (with the opposite hip bone)" },
      { label: "Key landmarks", value: "iliac crest, ASIS, ischial tuberosity, greater sciatic notch, obturator foramen" },
    ],
    connections: [
      { concept: "sacrum", relation: "articulates-with", note: "sacroiliac joint" },
      { concept: "femur", relation: "articulates-with", note: "hip joint (acetabulum)" },
      { concept: "gluteus-maximus", relation: "attaches-to", note: "origin (posterior ilium)" },
      { concept: "gluteus-medius", relation: "attaches-to", note: "origin (outer ilium)" },
      { concept: "iliacus", relation: "attaches-to", note: "origin (iliac fossa)" },
      { concept: "sartorius", relation: "attaches-to", note: "origin (anterior superior iliac spine)" },
      { concept: "rectus-femoris", relation: "attaches-to", note: "origin (anterior inferior iliac spine)" },
      { concept: "biceps-femoris", relation: "attaches-to", note: "origin of long head (ischial tuberosity)" },
      { concept: "adductor-magnus", relation: "attaches-to", note: "origin (ischiopubic ramus and ischial tuberosity)" },
      { concept: "rectus-abdominis", relation: "attaches-to", note: "origin (pubic crest and symphysis)" },
      { concept: "levator-ani", relation: "attaches-to", note: "origin (pubis, tendinous arch, ischial spine)" },
      { concept: "sciatic-nerve", relation: "adjacent-to", note: "leaves the pelvis through the greater sciatic foramen" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "iliolumbar, obturator and gluteal branches" },
    ],
    clinical:
      "The iliac crest is a common site for bone-marrow biopsy and bone-graft harvest. Pelvic ring fractures from high-energy trauma can cause severe internal bleeding; in adolescents, muscle pull can avulse the ASIS, AIIS or ischial tuberosity.",
    sexDifferences:
      "The female pelvis is typically wider and shallower, with a wider greater sciatic notch, a larger subpubic angle (roughly 80–90° vs 50–60°), an oval obturator foramen and a rounder pelvic inlet, adaptations for childbirth. The male pelvis is heavier with a narrower, heart-shaped inlet and larger acetabula.",
  },

  "femur": {
    summary:
      "The femur (thigh bone) is the longest and strongest bone in the body. Its head fits into the acetabulum of the hip bone and its two condyles form the upper surface of the knee joint.",
    latin: "Os femoris",
    functions: [
      "Transmits body weight from the hip to the knee",
      "Acts as the lever for walking, running and jumping",
      "Anchors powerful hip and thigh muscles",
      "Its marrow is an important site of blood cell formation in children",
    ],
    facts: [
      { label: "Length", value: "about 45 cm (roughly a quarter of body height; longest bone)" },
      { label: "Neck–shaft angle", value: "about 125° in adults" },
      { label: "Ossification", value: "the distal epiphyseal centre appears around birth, a sign of a full-term fetus" },
    ],
    connections: [
      { concept: "hip-bone", relation: "articulates-with", note: "hip joint" },
      { concept: "tibia", relation: "articulates-with", note: "knee joint" },
      { concept: "patella", relation: "articulates-with", note: "patellofemoral joint" },
      { concept: "gluteus-medius", relation: "attaches-to", note: "insertion (greater trochanter)" },
      { concept: "gluteus-maximus", relation: "attaches-to", note: "insertion (gluteal tuberosity)" },
      { concept: "psoas-major", relation: "attaches-to", note: "insertion (lesser trochanter)" },
      { concept: "iliacus", relation: "attaches-to", note: "insertion (lesser trochanter)" },
      { concept: "vastus-lateralis", relation: "attaches-to", note: "origin (greater trochanter and linea aspera)" },
      { concept: "adductor-magnus", relation: "attaches-to", note: "insertion (linea aspera and adductor tubercle)" },
      { concept: "gastrocnemius", relation: "attaches-to", note: "origin (femoral condyles)" },
      { concept: "perforating-arteries", relation: "supplied-by", note: "nutrient arteries to the shaft" },
      { concept: "popliteal-artery", relation: "adjacent-to", note: "lies against the popliteal surface" },
      { concept: "sciatic-nerve", relation: "adjacent-to", note: "runs down the back of the thigh" },
    ],
    clinical:
      "Femoral neck fractures in older people with osteoporosis can tear the retinacular branches of the medial circumflex femoral artery, risking avascular necrosis of the head. Shaft fractures usually follow high-energy trauma and can lose over a litre of blood into the thigh.",
    sexDifferences:
      "Because the female pelvis is wider, the femora typically slope more steeply toward the knee, giving a larger Q-angle.",
  },

  "patella": {
    summary:
      "The patella (kneecap) is a triangular sesamoid bone embedded in the quadriceps tendon, in front of the knee. It glides in the groove on the front of the femur as the knee bends and straightens.",
    latin: "Patella",
    functions: [
      "Increases the leverage of the quadriceps for knee extension",
      "Protects the front of the knee joint",
      "Reduces friction on the quadriceps tendon",
    ],
    facts: [
      { label: "Bone type", value: "largest sesamoid bone in the body" },
      { label: "Ossification", value: "begins at about 3–6 years" },
    ],
    connections: [
      { concept: "femur", relation: "articulates-with", note: "patellar surface (trochlear groove)" },
      { concept: "rectus-femoris", relation: "attaches-to", note: "insertion via quadriceps tendon" },
      { concept: "vastus-lateralis", relation: "attaches-to", note: "insertion via quadriceps tendon" },
      { concept: "vastus-medialis", relation: "attaches-to", note: "insertion; its lowest fibres resist lateral displacement" },
      { concept: "vastus-intermedius", relation: "attaches-to", note: "insertion via quadriceps tendon" },
      { concept: "tibia", relation: "attaches-to", note: "patellar ligament to the tibial tuberosity" },
      { concept: "articular-cartilage-of-knee", relation: "adjacent-to", note: "thick cartilage covers its posterior surface" },
      { concept: "genicular-arteries", relation: "supplied-by", note: "peripatellar anastomosis" },
    ],
    clinical:
      "The patella usually dislocates laterally. A direct blow can cause a transverse or comminuted fracture; a bipartite patella (normal variant) can mimic a fracture on X-ray.",
  },

  "tibia": {
    summary:
      "The tibia (shin bone) is the large, medial bone of the leg and carries most of the body's weight from the knee to the ankle. Its anterior border and medial surface lie just under the skin along the shin.",
    latin: "Tibia",
    functions: [
      "Main weight-bearing bone of the leg",
      "Forms the lower surface of the knee and the upper surface and medial malleolus of the ankle",
      "Anchors thigh, leg and knee-stabilising muscles",
    ],
    facts: [
      { label: "Size", value: "second-longest bone in the body" },
      { label: "Key landmarks", value: "tibial plateau (condyles), tibial tuberosity, anterior border, medial malleolus, soleal line" },
    ],
    connections: [
      { concept: "femur", relation: "articulates-with", note: "knee joint" },
      { concept: "fibula", relation: "articulates-with", note: "superior and inferior tibiofibular joints" },
      { concept: "talus", relation: "articulates-with", note: "ankle (talocrural) joint" },
      { concept: "menisci-of-knee", relation: "articulates-with", note: "menisci rest on the tibial plateau" },
      { concept: "interosseous-membrane-of-leg", relation: "attaches-to", note: "interosseous border" },
      { concept: "sartorius", relation: "attaches-to", note: "insertion (pes anserinus, medial proximal tibia)" },
      { concept: "semitendinosus", relation: "attaches-to", note: "insertion (pes anserinus)" },
      { concept: "semimembranosus", relation: "attaches-to", note: "insertion (posterior medial condyle)" },
      { concept: "iliotibial-tract", relation: "attaches-to", note: "anterolateral tubercle (Gerdy's tubercle)" },
      { concept: "tibialis-anterior", relation: "attaches-to", note: "origin (lateral surface)" },
      { concept: "soleus", relation: "attaches-to", note: "origin (soleal line)" },
      { concept: "posterior-tibial-artery", relation: "supplied-by", note: "nutrient artery" },
    ],
    clinical:
      "Because its anteromedial surface is subcutaneous, the tibial shaft is the commonest site of open long-bone fractures, and fractures can lead to compartment syndrome. \"Shin splints\" describe pain along the medial tibial border in runners.",
  },

  "fibula": {
    summary:
      "The fibula is the slender lateral bone of the leg. It bears little body weight but anchors muscles and forms the lateral malleolus, which stabilises the ankle.",
    latin: "Fibula",
    functions: [
      "Forms the lateral malleolus and lateral wall of the ankle mortise",
      "Provides attachment for leg muscles and the knee's lateral collateral ligament",
      "Carries only a small share of body weight",
    ],
    facts: [
      { label: "Bone type", value: "long, thin bone" },
      { label: "Key landmarks", value: "head, neck, lateral malleolus" },
    ],
    connections: [
      { concept: "tibia", relation: "articulates-with", note: "superior and inferior tibiofibular joints" },
      { concept: "talus", relation: "articulates-with", note: "lateral malleolus (ankle joint)" },
      { concept: "interosseous-membrane-of-leg", relation: "attaches-to", note: "interosseous border" },
      { concept: "biceps-femoris", relation: "attaches-to", note: "insertion (head of fibula)" },
      { concept: "fibularis-longus", relation: "attaches-to", note: "origin (head and upper lateral shaft)" },
      { concept: "fibularis-brevis", relation: "attaches-to", note: "origin (lower lateral shaft)" },
      { concept: "extensor-digitorum-longus", relation: "attaches-to", note: "origin (anterior shaft)" },
      { concept: "flexor-hallucis-longus", relation: "attaches-to", note: "origin (posterior shaft)" },
      { concept: "common-fibular-nerve", relation: "adjacent-to", note: "winds around the fibular neck" },
      { concept: "posterior-tibial-artery", relation: "supplied-by", note: "via its fibular (peroneal) branch" },
    ],
    clinical:
      "A fracture of the fibular neck (or a tight cast) can injure the common fibular nerve, causing foot drop. The lateral malleolus is fractured in many ankle injuries, and the fibular shaft is often used as a bone graft.",
  },

  "interosseous-membrane-of-leg": {
    summary:
      "A strong fibrous sheet stretching between the interosseous borders of the tibia and fibula. It binds the bones together, separates the anterior and posterior compartments of the leg and gives origin to leg muscles.",
    latin: "Membrana interossea cruris",
    functions: [
      "Binds tibia and fibula together (a syndesmosis)",
      "Separates the anterior and posterior muscle compartments",
      "Increases surface area for muscle origin",
    ],
    facts: [
      { label: "Opening", value: "a gap at its upper end transmits the anterior tibial vessels" },
    ],
    connections: [
      { concept: "tibia", relation: "attaches-to", note: "interosseous border" },
      { concept: "fibula", relation: "attaches-to", note: "interosseous border" },
      { concept: "tibialis-anterior", relation: "attaches-to", note: "origin (anterior surface)" },
      { concept: "extensor-hallucis-longus", relation: "attaches-to", note: "origin (anterior surface)" },
      { concept: "extensor-digitorum-longus", relation: "attaches-to", note: "origin (anterior surface)" },
      { concept: "tibialis-posterior", relation: "attaches-to", note: "origin (posterior surface)" },
      { concept: "anterior-tibial-artery", relation: "adjacent-to", note: "passes over its upper border and descends on it" },
    ],
  },

  "menisci-of-knee": {
    summary:
      "The menisci are two crescent-shaped pads of fibrocartilage (medial and lateral) sitting on the tibial plateau. They deepen the shallow tibial surfaces so the rounded femoral condyles fit better.",
    latin: "Menisci articulationis genus",
    functions: [
      "Deepen the tibial articular surfaces",
      "Distribute load and absorb shock",
      "Improve knee stability and lubrication",
    ],
    facts: [
      { label: "Shape", value: "medial meniscus is C-shaped; lateral is more nearly circular" },
      { label: "Blood supply", value: "only the outer (peripheral) portion is vascular, so inner tears heal poorly" },
      { label: "Attachment", value: "the medial meniscus is fixed to the tibial collateral ligament, making it less mobile" },
    ],
    connections: [
      { concept: "tibia", relation: "attaches-to", note: "horns attach to the intercondylar area" },
      { concept: "femur", relation: "articulates-with", note: "femoral condyles glide on their upper surfaces" },
      { concept: "popliteus", relation: "attaches-to", note: "tendon fibres attach to the lateral meniscus" },
      { concept: "articular-cartilage-of-knee", relation: "adjacent-to" },
      { concept: "genicular-arteries", relation: "supplied-by", note: "peripheral zone" },
    ],
    clinical:
      "Twisting on a flexed, weight-bearing knee tears the menisci; the less mobile medial meniscus is classically injured with the ACL and tibial collateral ligament (\"unhappy triad\"). McMurray's test is used to detect tears.",
  },

  "articular-cartilage-of-knee": {
    summary:
      "Smooth hyaline cartilage covering the joint surfaces of the femoral condyles, tibial plateau and back of the patella. It lets the bones glide with very low friction and spreads load.",
    latin: "Cartilago articularis",
    functions: [
      "Provides a near-frictionless gliding surface",
      "Distributes load to the underlying bone",
    ],
    facts: [
      { label: "Tissue", value: "hyaline cartilage with no blood vessels or nerves; nourished by synovial fluid" },
      { label: "Thickness", value: "several millimetres; thickest on the back of the patella" },
    ],
    connections: [
      { concept: "femur", relation: "adjacent-to", note: "covers the condyles and patellar surface" },
      { concept: "tibia", relation: "adjacent-to", note: "covers the tibial plateau" },
      { concept: "patella", relation: "adjacent-to", note: "covers its posterior surface" },
      { concept: "menisci-of-knee", relation: "adjacent-to" },
    ],
    clinical:
      "Because it lacks a blood supply, damaged articular cartilage heals poorly; its progressive loss is the hallmark of knee osteoarthritis.",
  },

  // ───────────────────────────── Tarsal bones & foot ligaments ─────────────────────────────
  "talus": {
    summary:
      "The talus is the tarsal bone that sits between the leg bones and the calcaneus, forming the lower part of the ankle joint. It passes body weight from the tibia to the rest of the foot.",
    latin: "Talus",
    functions: [
      "Forms the ankle (talocrural) joint with the tibia and fibula",
      "Forms the subtalar and talonavicular joints for inversion and eversion",
      "Distributes body weight to the heel and forefoot",
    ],
    facts: [
      { label: "Size", value: "second-largest tarsal bone" },
      { label: "Surface", value: "about 60% covered by articular cartilage" },
      { label: "Muscles", value: "no muscles attach to it" },
    ],
    connections: [
      { concept: "tibia", relation: "articulates-with", note: "ankle joint (trochlea and medial malleolus)" },
      { concept: "fibula", relation: "articulates-with", note: "ankle joint (lateral malleolus)" },
      { concept: "calcaneus", relation: "articulates-with", note: "subtalar joint" },
      { concept: "navicular-bone", relation: "articulates-with", note: "talonavicular joint" },
      { concept: "flexor-hallucis-longus", relation: "adjacent-to", note: "tendon grooves its posterior process" },
      { concept: "posterior-tibial-artery", relation: "supplied-by", note: "artery of the tarsal canal" },
      { concept: "dorsalis-pedis-artery", relation: "supplied-by", note: "branches to the neck" },
    ],
    clinical:
      "Fractures of the talar neck (e.g. forced dorsiflexion in car crashes) can cut off blood flow to the body of the talus, causing avascular necrosis.",
  },

  "calcaneus": {
    summary:
      "The calcaneus (heel bone) is the largest tarsal bone. It forms the heel, takes the body's weight at heel strike and acts as a lever for the calf muscles via the calcaneal (Achilles) tendon.",
    latin: "Calcaneus",
    functions: [
      "Transmits body weight to the ground at the heel",
      "Lever arm for plantarflexion by the calf muscles",
      "Supports the talus (via the sustentaculum tali) and the arches of the foot",
    ],
    facts: [
      { label: "Size", value: "largest tarsal bone" },
      { label: "Key landmarks", value: "calcaneal tuberosity, sustentaculum tali, fibular trochlea" },
    ],
    connections: [
      { concept: "talus", relation: "articulates-with", note: "subtalar joint" },
      { concept: "cuboid-bone", relation: "articulates-with", note: "calcaneocuboid joint" },
      { concept: "calcaneal-tendon", relation: "attaches-to", note: "insertion of gastrocnemius and soleus (posterior tuberosity)" },
      { concept: "abductor-hallucis", relation: "attaches-to", note: "origin (medial process of tuberosity)" },
      { concept: "flexor-digitorum-brevis", relation: "attaches-to", note: "origin (medial process of tuberosity)" },
      { concept: "abductor-digiti-minimi-of-foot", relation: "attaches-to", note: "origin (tuberosity)" },
      { concept: "flexor-accessorius", relation: "attaches-to", note: "origin (plantar surface)" },
      { concept: "long-plantar-ligament", relation: "attaches-to", note: "plantar surface" },
      { concept: "flexor-hallucis-longus", relation: "adjacent-to", note: "tendon runs under the sustentaculum tali" },
    ],
    clinical:
      "Landing on the heels from a height can crush the calcaneus; these fractures are often bilateral and may accompany a lumbar vertebral compression fracture. Heel pain at the medial tubercle is typical of plantar fasciitis.",
  },

  "navicular-bone": {
    summary:
      "The navicular is a boat-shaped tarsal bone on the medial side of the foot, between the head of the talus and the three cuneiforms. It is the keystone of the medial longitudinal arch.",
    latin: "Os naviculare",
    functions: [
      "Links the talus to the cuneiforms in the medial arch",
      "Its tuberosity is the main insertion of tibialis posterior",
    ],
    facts: [
      { label: "Key landmark", value: "navicular tuberosity, palpable on the medial foot" },
    ],
    connections: [
      { concept: "talus", relation: "articulates-with", note: "talonavicular joint" },
      { concept: "medial-cuneiform-bone", relation: "articulates-with" },
      { concept: "intermediate-cuneiform-bone", relation: "articulates-with" },
      { concept: "lateral-cuneiform-bone", relation: "articulates-with" },
      { concept: "cuboid-bone", relation: "articulates-with", note: "small, inconstant facet" },
      { concept: "tibialis-posterior", relation: "attaches-to", note: "main insertion (tuberosity)" },
    ],
    clinical:
      "Navicular stress fractures occur in sprinters and jumpers. An accessory navicular near the tuberosity is a common variant that can be painful.",
  },

  "cuboid-bone": {
    summary:
      "The cuboid is the cube-shaped lateral tarsal bone in front of the calcaneus. A groove on its plantar surface carries the tendon of fibularis longus across the sole.",
    latin: "Os cuboideum",
    functions: [
      "Forms part of the lateral longitudinal arch",
      "Acts as a pulley for the fibularis longus tendon",
      "Supports the fourth and fifth metatarsals",
    ],
    facts: [
      { label: "Position", value: "only tarsal bone of the lateral column between calcaneus and metatarsals" },
    ],
    connections: [
      { concept: "calcaneus", relation: "articulates-with", note: "calcaneocuboid joint" },
      { concept: "fourth-metatarsal", relation: "articulates-with" },
      { concept: "fifth-metatarsal", relation: "articulates-with" },
      { concept: "lateral-cuneiform-bone", relation: "articulates-with" },
      { concept: "navicular-bone", relation: "articulates-with", note: "inconstant" },
      { concept: "long-plantar-ligament", relation: "attaches-to", note: "cuboid ridge; bridges the fibularis longus groove" },
      { concept: "fibularis-longus", relation: "adjacent-to", note: "tendon runs in the plantar groove" },
      { concept: "flexor-hallucis-brevis", relation: "attaches-to", note: "partial origin (plantar surface)" },
    ],
  },

  "medial-cuneiform-bone": {
    summary:
      "The medial cuneiform is the largest of the three wedge-shaped cuneiform bones. It supports the first metatarsal and receives the tendons that control the medial arch.",
    latin: "Os cuneiforme mediale",
    functions: [
      "Supports the first metatarsal (big toe ray)",
      "Receives insertions of tibialis anterior and fibularis longus",
      "Anchors the Lisfranc ligament to the base of the second metatarsal",
    ],
    facts: [
      { label: "Size", value: "largest cuneiform" },
    ],
    connections: [
      { concept: "navicular-bone", relation: "articulates-with" },
      { concept: "intermediate-cuneiform-bone", relation: "articulates-with" },
      { concept: "first-metatarsal", relation: "articulates-with" },
      { concept: "second-metatarsal", relation: "articulates-with", note: "and Lisfranc ligament" },
      { concept: "tibialis-anterior", relation: "attaches-to", note: "insertion (medial/plantar surface)" },
      { concept: "fibularis-longus", relation: "attaches-to", note: "insertion (lateral/plantar surface)" },
    ],
    clinical:
      "A Lisfranc injury disrupts the tarsometatarsal joints, often tearing the ligament between the medial cuneiform and second metatarsal base; it is easily missed on X-ray.",
  },

  "intermediate-cuneiform-bone": {
    summary:
      "The intermediate cuneiform is the smallest cuneiform. It sits recessed between the medial and lateral cuneiforms so that the base of the second metatarsal locks into a mortise.",
    latin: "Os cuneiforme intermedium",
    functions: [
      "Supports the second metatarsal",
      "Its recessed position locks the second metatarsal, stabilising the midfoot",
    ],
    facts: [
      { label: "Size", value: "smallest cuneiform" },
    ],
    connections: [
      { concept: "navicular-bone", relation: "articulates-with" },
      { concept: "medial-cuneiform-bone", relation: "articulates-with" },
      { concept: "lateral-cuneiform-bone", relation: "articulates-with" },
      { concept: "second-metatarsal", relation: "articulates-with" },
      { concept: "tibialis-posterior", relation: "attaches-to", note: "plantar slip" },
    ],
  },

  "lateral-cuneiform-bone": {
    summary:
      "The lateral cuneiform lies between the intermediate cuneiform and the cuboid. It mainly supports the third metatarsal and contributes to the transverse arch of the foot.",
    latin: "Os cuneiforme laterale",
    functions: [
      "Supports the third metatarsal",
      "Contributes to the transverse arch",
    ],
    facts: [
      { label: "Joints", value: "navicular, intermediate cuneiform, cuboid and metatarsals 2–4" },
    ],
    connections: [
      { concept: "navicular-bone", relation: "articulates-with" },
      { concept: "intermediate-cuneiform-bone", relation: "articulates-with" },
      { concept: "cuboid-bone", relation: "articulates-with" },
      { concept: "third-metatarsal", relation: "articulates-with", note: "main joint" },
      { concept: "second-metatarsal", relation: "articulates-with" },
      { concept: "fourth-metatarsal", relation: "articulates-with" },
      { concept: "flexor-hallucis-brevis", relation: "attaches-to", note: "partial origin" },
    ],
  },

  "long-plantar-ligament": {
    summary:
      "The long plantar ligament is the longest ligament of the sole. It runs from the plantar surface of the calcaneus to the cuboid, with superficial fibres continuing to the bases of the lateral metatarsals.",
    latin: "Ligamentum plantare longum",
    functions: [
      "Supports the lateral longitudinal arch",
      "Converts the cuboid groove into a tunnel for the fibularis longus tendon",
    ],
    facts: [
      { label: "Attachments", value: "calcaneus → cuboid ridge; superficial fibres to metatarsal bases 2–4" },
    ],
    connections: [
      { concept: "calcaneus", relation: "attaches-to", note: "plantar surface" },
      { concept: "cuboid-bone", relation: "attaches-to", note: "ridge behind the fibularis longus groove" },
      { concept: "third-metatarsal", relation: "attaches-to", note: "superficial fibres (base)" },
      { concept: "fourth-metatarsal", relation: "attaches-to", note: "superficial fibres (base)" },
      { concept: "fibularis-longus", relation: "adjacent-to", note: "tendon passes in the tunnel beneath it" },
      { concept: "flexor-accessorius", relation: "adjacent-to", note: "its lateral head arises partly from the ligament" },
    ],
  },

  "sesamoid-bones-of-foot": {
    summary:
      "Two small sesamoid bones lie under the head of the first metatarsal, embedded in the tendons of flexor hallucis brevis. They take weight during push-off and protect the flexor hallucis longus tendon that runs between them.",
    latin: "Ossa sesamoidea pedis",
    functions: [
      "Bear weight under the ball of the big toe",
      "Increase the leverage of flexor hallucis brevis",
      "Form a protective groove for the flexor hallucis longus tendon",
    ],
    facts: [
      { label: "Number", value: "two constant sesamoids (medial/tibial and lateral/fibular); others are variable" },
      { label: "Variant", value: "a bipartite sesamoid (usually the medial) can mimic a fracture" },
    ],
    connections: [
      { concept: "first-metatarsal", relation: "articulates-with", note: "plantar surface of the head" },
      { concept: "flexor-hallucis-brevis", relation: "attaches-to", note: "embedded in its two tendons" },
      { concept: "abductor-hallucis", relation: "attaches-to", note: "medial sesamoid" },
      { concept: "adductor-hallucis", relation: "attaches-to", note: "lateral sesamoid" },
      { concept: "flexor-hallucis-longus", relation: "adjacent-to", note: "tendon runs between them" },
      { concept: "phalanges-of-big-toe", relation: "adjacent-to", note: "linked to the proximal phalanx by the plantar plate" },
    ],
    clinical:
      "Repetitive loading (dancers, runners) can inflame or fracture the sesamoids (\"sesamoiditis\"), causing pain under the ball of the big toe.",
  },

  // ───────────────────────────── Metatarsals ─────────────────────────────
  "first-metatarsal": {
    summary:
      "The first metatarsal is the shortest and thickest metatarsal, supporting the big toe. Its head carries two sesamoid bones and bears a large share of body weight during push-off.",
    latin: "Os metatarsi I",
    functions: [
      "Main weight-bearing ray at push-off",
      "Forms the front pillar of the medial longitudinal arch",
      "Receives insertions of tibialis anterior and fibularis longus",
    ],
    facts: [
      { label: "Size", value: "shortest and thickest metatarsal" },
    ],
    connections: [
      { concept: "medial-cuneiform-bone", relation: "articulates-with", note: "tarsometatarsal joint" },
      { concept: "phalanges-of-big-toe", relation: "articulates-with", note: "first metatarsophalangeal joint" },
      { concept: "sesamoid-bones-of-foot", relation: "articulates-with", note: "plantar surface of the head" },
      { concept: "fibularis-longus", relation: "attaches-to", note: "insertion (plantar base)" },
      { concept: "tibialis-anterior", relation: "attaches-to", note: "insertion (medial base)" },
    ],
    clinical:
      "Hallux valgus (bunion) involves medial deviation of the first metatarsal with lateral deviation of the big toe. The first metatarsophalangeal joint is the classic site of gout.",
  },

  "second-metatarsal": {
    summary:
      "The second metatarsal is usually the longest metatarsal. Its base is locked into a mortise formed by the three cuneiforms, making it the most rigid ray of the foot.",
    latin: "Os metatarsi II",
    functions: [
      "Supports the second toe",
      "Forms a rigid central beam of the forefoot",
    ],
    facts: [
      { label: "Size", value: "usually the longest metatarsal" },
      { label: "Common injury", value: "most common site of stress (\"march\") fractures" },
    ],
    connections: [
      { concept: "intermediate-cuneiform-bone", relation: "articulates-with" },
      { concept: "medial-cuneiform-bone", relation: "articulates-with" },
      { concept: "lateral-cuneiform-bone", relation: "articulates-with" },
      { concept: "third-metatarsal", relation: "articulates-with" },
      { concept: "phalanges-of-second-toe", relation: "articulates-with", note: "metatarsophalangeal joint" },
      { concept: "intrinsic-muscles-of-foot", relation: "attaches-to", note: "origin of dorsal interossei" },
    ],
  },

  "third-metatarsal": {
    summary:
      "The third metatarsal supports the third toe and articulates mainly with the lateral cuneiform. Like the second, it is relatively rigid and prone to stress fractures.",
    latin: "Os metatarsi III",
    functions: [
      "Supports the third toe",
      "Contributes to the transverse arch of the forefoot",
    ],
    facts: [
      { label: "Common injury", value: "second most common site of metatarsal stress fracture" },
    ],
    connections: [
      { concept: "lateral-cuneiform-bone", relation: "articulates-with" },
      { concept: "second-metatarsal", relation: "articulates-with" },
      { concept: "fourth-metatarsal", relation: "articulates-with" },
      { concept: "phalanges-of-third-toe", relation: "articulates-with", note: "metatarsophalangeal joint" },
      { concept: "intrinsic-muscles-of-foot", relation: "attaches-to", note: "origin of interossei" },
    ],
  },

  "fourth-metatarsal": {
    summary:
      "The fourth metatarsal supports the fourth toe and articulates with the cuboid and lateral cuneiform. Its joint with the cuboid is more mobile than those of the medial rays.",
    latin: "Os metatarsi IV",
    functions: [
      "Supports the fourth toe",
      "Mobile base helps the lateral forefoot adapt to uneven ground",
    ],
    facts: [
      { label: "Joints", value: "cuboid, lateral cuneiform, 3rd and 5th metatarsals" },
    ],
    connections: [
      { concept: "cuboid-bone", relation: "articulates-with" },
      { concept: "lateral-cuneiform-bone", relation: "articulates-with" },
      { concept: "third-metatarsal", relation: "articulates-with" },
      { concept: "fifth-metatarsal", relation: "articulates-with" },
      { concept: "phalanges-of-fourth-toe", relation: "articulates-with", note: "metatarsophalangeal joint" },
    ],
  },

  "fifth-metatarsal": {
    summary:
      "The fifth metatarsal supports the little toe and has a prominent tuberosity at its base, easily felt on the lateral border of the foot. Fibularis brevis inserts into this tuberosity.",
    latin: "Os metatarsi V",
    functions: [
      "Supports the little toe and lateral border of the foot",
      "Its tuberosity anchors fibularis brevis",
    ],
    facts: [
      { label: "Key landmark", value: "tuberosity of the fifth metatarsal" },
    ],
    connections: [
      { concept: "cuboid-bone", relation: "articulates-with" },
      { concept: "fourth-metatarsal", relation: "articulates-with" },
      { concept: "phalanges-of-little-toe", relation: "articulates-with", note: "metatarsophalangeal joint" },
      { concept: "fibularis-brevis", relation: "attaches-to", note: "insertion (tuberosity)" },
      { concept: "fibularis-tertius", relation: "attaches-to", note: "insertion (dorsal base/shaft)" },
      { concept: "flexor-digiti-minimi-brevis-of-foot", relation: "attaches-to", note: "origin (base)" },
    ],
    clinical:
      "An inversion ankle injury can avulse the tuberosity via fibularis brevis. A Jones fracture, slightly further along at the metaphyseal–diaphyseal junction, heals poorly because of its limited blood supply.",
  },

  // ───────────────────────────── Phalanges of the foot ─────────────────────────────
  "phalanges-of-big-toe": {
    summary:
      "The big toe (hallux) has two phalanges, proximal and distal, which are much sturdier than those of the other toes. It is the final lever for push-off during walking.",
    latin: "Phalanges hallucis",
    functions: [
      "Provides the final push-off in gait",
      "Helps maintain balance when standing",
    ],
    facts: [
      { label: "Number", value: "2 phalanges; 14 phalanges in each foot overall" },
    ],
    connections: [
      { concept: "first-metatarsal", relation: "articulates-with", note: "first metatarsophalangeal joint" },
      { concept: "extensor-hallucis-longus", relation: "attaches-to", note: "insertion (base of distal phalanx)" },
      { concept: "flexor-hallucis-longus", relation: "attaches-to", note: "insertion (base of distal phalanx)" },
      { concept: "extensor-hallucis-brevis", relation: "attaches-to", note: "insertion (base of proximal phalanx)" },
      { concept: "flexor-hallucis-brevis", relation: "attaches-to", note: "insertion (base of proximal phalanx, via sesamoids)" },
      { concept: "abductor-hallucis", relation: "attaches-to", note: "insertion (medial base of proximal phalanx)" },
      { concept: "adductor-hallucis", relation: "attaches-to", note: "insertion (lateral base of proximal phalanx)" },
    ],
    clinical:
      "Forced hyperextension of the big toe on artificial surfaces sprains the first metatarsophalangeal joint (\"turf toe\").",
  },

  "phalanges-of-second-toe": {
    summary:
      "The second toe has three phalanges (proximal, middle and distal). The functional axis of the foot for toe abduction and adduction passes through it.",
    latin: "Phalanges digiti secundi pedis",
    functions: [
      "Helps distribute load across the forefoot",
      "Reference axis for toe abduction and adduction",
    ],
    facts: [
      { label: "Number", value: "3 phalanges" },
      { label: "Variant", value: "in some people it projects beyond the big toe (a normal variant)" },
    ],
    connections: [
      { concept: "second-metatarsal", relation: "articulates-with", note: "metatarsophalangeal joint" },
      { concept: "flexor-digitorum-longus", relation: "attaches-to", note: "insertion (distal phalanx)" },
      { concept: "flexor-digitorum-brevis", relation: "attaches-to", note: "insertion (middle phalanx)" },
      { concept: "extensor-digitorum-longus", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "intrinsic-muscles-of-foot", relation: "attaches-to", note: "1st and 2nd dorsal interossei" },
    ],
    clinical: "The second toe is the commonest site of hammer-toe deformity.",
  },

  "phalanges-of-third-toe": {
    summary:
      "The third toe has three phalanges that receive the long and short toe flexors and extensors.",
    latin: "Phalanges digiti tertii pedis",
    functions: [
      "Helps grip the ground and distribute forefoot load",
    ],
    facts: [
      { label: "Number", value: "3 phalanges" },
    ],
    connections: [
      { concept: "third-metatarsal", relation: "articulates-with", note: "metatarsophalangeal joint" },
      { concept: "flexor-digitorum-longus", relation: "attaches-to", note: "insertion (distal phalanx)" },
      { concept: "flexor-digitorum-brevis", relation: "attaches-to", note: "insertion (middle phalanx)" },
      { concept: "extensor-digitorum-longus", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "intrinsic-muscles-of-foot", relation: "attaches-to", note: "interossei and lumbrical" },
    ],
  },

  "phalanges-of-fourth-toe": {
    summary:
      "The fourth toe has three phalanges. Like the third toe, it receives tendons of the long and short flexors and extensors and of the interossei.",
    latin: "Phalanges digiti quarti pedis",
    functions: [
      "Helps grip the ground and distribute forefoot load",
    ],
    facts: [
      { label: "Number", value: "3 phalanges" },
    ],
    connections: [
      { concept: "fourth-metatarsal", relation: "articulates-with", note: "metatarsophalangeal joint" },
      { concept: "flexor-digitorum-longus", relation: "attaches-to", note: "insertion (distal phalanx)" },
      { concept: "flexor-digitorum-brevis", relation: "attaches-to", note: "insertion (middle phalanx)" },
      { concept: "extensor-digitorum-longus", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "intrinsic-muscles-of-foot", relation: "attaches-to", note: "interossei and lumbrical" },
    ],
  },

  "phalanges-of-little-toe": {
    summary:
      "The little toe normally has three small phalanges, but the middle and distal phalanges are commonly fused into one. It receives the small muscles of the lateral sole.",
    latin: "Phalanges digiti minimi pedis",
    functions: [
      "Stabilises the lateral border of the forefoot",
    ],
    facts: [
      { label: "Number", value: "3 phalanges, though the middle and distal are often fused" },
    ],
    connections: [
      { concept: "fifth-metatarsal", relation: "articulates-with", note: "metatarsophalangeal joint" },
      { concept: "flexor-digitorum-longus", relation: "attaches-to", note: "insertion (distal phalanx)" },
      { concept: "extensor-digitorum-longus", relation: "attaches-to", note: "insertion via extensor expansion" },
      { concept: "abductor-digiti-minimi-of-foot", relation: "attaches-to", note: "insertion (base of proximal phalanx)" },
      { concept: "flexor-digiti-minimi-brevis-of-foot", relation: "attaches-to", note: "insertion (base of proximal phalanx)" },
    ],
    clinical: "Often injured by stubbing; most little-toe fractures heal well with buddy taping.",
  },

  // ───────────────────────────── Cranium ─────────────────────────────
  "frontal-bone": {
    summary:
      "The frontal bone forms the forehead, the roofs of the orbits and most of the floor of the anterior cranial fossa. It contains the frontal sinuses above the orbits.",
    latin: "Os frontale",
    functions: [
      "Protects the frontal lobes of the brain",
      "Forms the forehead and upper margins and roofs of the orbits",
      "Houses the frontal paranasal sinuses",
    ],
    facts: [
      { label: "Bone type", value: "flat bone (intramembranous ossification)" },
      { label: "Sutures", value: "coronal suture with the parietal bones; the metopic suture between its two halves usually fuses in infancy (it persists in a small percentage of adults)" },
      { label: "Key landmarks", value: "glabella, supraorbital margins and notches, superciliary arches" },
    ],
    connections: [
      { concept: "parietal-bone", relation: "articulates-with", note: "coronal suture" },
      { concept: "sphenoid-bone", relation: "articulates-with" },
      { concept: "ethmoid-bone", relation: "articulates-with" },
      { concept: "nasal-bone", relation: "articulates-with" },
      { concept: "maxilla", relation: "articulates-with", note: "frontal process of maxilla" },
      { concept: "zygomatic-bone", relation: "articulates-with" },
      { concept: "lacrimal-bone", relation: "articulates-with" },
      { concept: "temporalis", relation: "attaches-to", note: "part of the temporal fossa origin" },
      { concept: "muscles-of-facial-expression", relation: "attaches-to", note: "e.g. corrugator supercilii origin" },
      { concept: "superior-frontal-gyrus", relation: "adjacent-to", note: "frontal lobe lies beneath" },
      { concept: "orbital-gyrus", relation: "adjacent-to", note: "rests on the orbital plates" },
    ],
    clinical:
      "Frontal sinusitis causes pain above the eyes. Depressed fractures of the frontal bone may involve the sinuses and the anterior cranial fossa.",
    sexDifferences:
      "Males typically have more prominent brow ridges and glabella with a more sloping forehead; females usually have a more vertical forehead and sharper upper orbital margins.",
  },

  "parietal-bone": {
    summary:
      "The paired parietal bones form most of the roof and upper sides of the skull. They meet each other at the sagittal suture and the frontal bone at the coronal suture.",
    latin: "Os parietale",
    functions: [
      "Protects the parietal lobes and upper brain",
      "Forms much of the cranial vault",
      "Gives origin to part of temporalis",
    ],
    facts: [
      { label: "Bone type", value: "flat bone (intramembranous ossification)" },
      { label: "Sutures", value: "sagittal (with its partner), coronal, lambdoid and squamous" },
      { label: "Fontanelles", value: "anterior fontanelle closes by about 18–24 months; posterior within the first few months" },
    ],
    connections: [
      { concept: "frontal-bone", relation: "articulates-with", note: "coronal suture" },
      { concept: "occipital-bone", relation: "articulates-with", note: "lambdoid suture" },
      { concept: "temporal-bone", relation: "articulates-with", note: "squamous suture" },
      { concept: "sphenoid-bone", relation: "articulates-with", note: "greater wing at the pterion" },
      { concept: "temporalis", relation: "attaches-to", note: "origin (below the temporal lines)" },
      { concept: "postcentral-gyrus", relation: "adjacent-to", note: "parietal lobe lies beneath" },
      { concept: "superior-parietal-lobule", relation: "adjacent-to" },
    ],
    clinical:
      "The pterion, where the parietal, frontal, sphenoid and temporal bones meet, is thin; a blow here can tear the middle meningeal artery and cause an extradural haematoma.",
  },

  "occipital-bone": {
    summary:
      "The occipital bone forms the back and base of the skull. It contains the foramen magnum, through which the brainstem becomes the spinal cord, and its condyles rest on the atlas.",
    latin: "Os occipitale",
    functions: [
      "Protects the occipital lobes, cerebellum and brainstem",
      "Forms the atlanto-occipital joints for nodding",
      "Anchors neck and back muscles along the nuchal lines",
    ],
    facts: [
      { label: "Key landmarks", value: "foramen magnum, occipital condyles, external occipital protuberance (inion), nuchal lines" },
      { label: "Contents of foramen magnum", value: "medulla/spinal cord junction, vertebral arteries, spinal roots of the accessory nerve" },
    ],
    connections: [
      { concept: "atlas-c1", relation: "articulates-with", note: "atlanto-occipital joints" },
      { concept: "parietal-bone", relation: "articulates-with", note: "lambdoid suture" },
      { concept: "temporal-bone", relation: "articulates-with" },
      { concept: "sphenoid-bone", relation: "articulates-with", note: "basilar part (spheno-occipital synchondrosis)" },
      { concept: "trapezius", relation: "attaches-to", note: "origin (superior nuchal line, external occipital protuberance)" },
      { concept: "semispinalis-capitis", relation: "attaches-to", note: "insertion (between nuchal lines)" },
      { concept: "rectus-capitis-posterior-minor", relation: "attaches-to", note: "insertion (inferior nuchal line)" },
      { concept: "longus-capitis", relation: "attaches-to", note: "insertion (basilar part)" },
      { concept: "tentorium-cerebelli", relation: "attaches-to", note: "along the grooves for the transverse sinuses" },
      { concept: "medulla-oblongata", relation: "adjacent-to", note: "passes through the foramen magnum" },
      { concept: "cerebellum", relation: "adjacent-to", note: "sits in the posterior cranial fossa" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "vertebral arteries enter via the foramen magnum" },
    ],
    clinical:
      "Raised intracranial pressure can force the cerebellar tonsils down through the foramen magnum (tonsillar herniation), compressing the medulla. The external occipital protuberance is a palpable landmark.",
    sexDifferences:
      "The external occipital protuberance and nuchal lines are usually more pronounced in males, reflecting larger neck muscles.",
  },

  "temporal-bone": {
    summary:
      "The paired temporal bones form the lower sides and part of the base of the skull. Each houses the middle and inner ear and forms the socket of the temporomandibular joint.",
    latin: "Os temporale",
    functions: [
      "Contains the organs of hearing and balance (petrous part)",
      "Forms the jaw joint (temporomandibular joint) with the mandible",
      "Transmits the facial nerve, internal carotid artery and internal jugular vein",
      "Anchors neck and jaw muscles (mastoid and styloid processes, zygomatic arch)",
    ],
    facts: [
      { label: "Parts", value: "squamous, petrous, tympanic and mastoid parts, plus the styloid process" },
      { label: "Density", value: "the petrous part is among the densest bone in the body" },
    ],
    connections: [
      { concept: "mandible", relation: "articulates-with", note: "temporomandibular joint" },
      { concept: "parietal-bone", relation: "articulates-with", note: "squamous suture" },
      { concept: "zygomatic-bone", relation: "articulates-with", note: "zygomatic arch" },
      { concept: "sphenoid-bone", relation: "articulates-with" },
      { concept: "occipital-bone", relation: "articulates-with" },
      { concept: "temporalis", relation: "attaches-to", note: "origin (temporal fossa)" },
      { concept: "masseter", relation: "attaches-to", note: "origin (zygomatic arch)" },
      { concept: "sternocleidomastoid", relation: "attaches-to", note: "insertion (mastoid process)" },
      { concept: "digastric", relation: "attaches-to", note: "origin of posterior belly (mastoid notch)" },
      { concept: "stylohyoid-ligament", relation: "attaches-to", note: "tip of the styloid process" },
      { concept: "facial-nerve-cn-vii", relation: "adjacent-to", note: "facial canal; exits via stylomastoid foramen" },
      { concept: "internal-carotid-artery", relation: "adjacent-to", note: "carotid canal" },
      { concept: "internal-jugular-vein", relation: "adjacent-to", note: "begins at the jugular foramen" },
    ],
    clinical:
      "The pterion overlies the middle meningeal artery. Fractures of the petrous temporal bone may cause bruising behind the ear (Battle sign), CSF leak from the ear, hearing loss or facial palsy.",
    sexDifferences: "The mastoid process is typically larger and more robust in males.",
  },

  "sphenoid-bone": {
    summary:
      "The sphenoid is a butterfly-shaped bone at the centre of the skull base, wedged between the frontal, temporal and occipital bones. Its body contains the sphenoid sinus and the sella turcica, which cradles the pituitary gland.",
    latin: "Os sphenoidale",
    functions: [
      "Links the cranial and facial skeleton",
      "Houses the pituitary gland in the sella turcica",
      "Transmits cranial nerves and vessels through its foramina and fissures",
      "Anchors eye muscles and chewing muscles",
    ],
    facts: [
      { label: "Parts", value: "body, greater and lesser wings, pterygoid processes" },
      { label: "Openings", value: "optic canal (CN II), superior orbital fissure (CN III, IV, V1, VI), foramina rotundum (V2), ovale (V3) and spinosum" },
    ],
    connections: [
      { concept: "frontal-bone", relation: "articulates-with" },
      { concept: "temporal-bone", relation: "articulates-with" },
      { concept: "occipital-bone", relation: "articulates-with", note: "spheno-occipital synchondrosis" },
      { concept: "ethmoid-bone", relation: "articulates-with" },
      { concept: "vomer", relation: "articulates-with" },
      { concept: "palatine-bone", relation: "articulates-with" },
      { concept: "pituitary-gland", relation: "adjacent-to", note: "sits in the sella turcica" },
      { concept: "optic-nerve", relation: "adjacent-to", note: "passes through the optic canal" },
      { concept: "internal-carotid-artery", relation: "adjacent-to", note: "runs alongside the body in the cavernous sinus" },
      { concept: "oculomotor-nerve-cn-iii", relation: "adjacent-to", note: "superior orbital fissure" },
      { concept: "temporalis", relation: "attaches-to", note: "origin (greater wing)" },
      { concept: "superior-rectus-eye", relation: "attaches-to", note: "origin from the common tendinous ring" },
      { concept: "levator-palpebrae-superioris", relation: "attaches-to", note: "origin (lesser wing)" },
    ],
    clinical:
      "Pituitary tumours are often removed through the sphenoid sinus (transsphenoidal surgery); an enlarging tumour can press on the optic chiasm above the sella, causing bitemporal hemianopia.",
  },

  "ethmoid-bone": {
    summary:
      "The ethmoid is a light, sponge-like bone between the orbits. It forms the roof and much of the lateral walls and septum of the nasal cavity, and part of the medial wall of each orbit.",
    latin: "Os ethmoidale",
    functions: [
      "Its cribriform plate transmits olfactory nerve fibres from the nose to the brain",
      "Forms the upper nasal septum (perpendicular plate) and the superior and middle nasal conchae",
      "Contains the ethmoidal air cells (sinuses)",
    ],
    facts: [
      { label: "Parts", value: "cribriform plate, crista galli, perpendicular plate, two labyrinths" },
      { label: "Orbital plate", value: "the lamina papyracea is paper-thin" },
    ],
    connections: [
      { concept: "frontal-bone", relation: "articulates-with" },
      { concept: "sphenoid-bone", relation: "articulates-with" },
      { concept: "vomer", relation: "articulates-with", note: "nasal septum" },
      { concept: "nasal-bone", relation: "articulates-with" },
      { concept: "maxilla", relation: "articulates-with" },
      { concept: "lacrimal-bone", relation: "articulates-with" },
      { concept: "palatine-bone", relation: "articulates-with" },
      { concept: "inferior-nasal-concha", relation: "articulates-with" },
      { concept: "nasal-cartilages", relation: "attaches-to", note: "septal cartilage joins the perpendicular plate" },
      { concept: "medial-rectus-eye", relation: "adjacent-to", note: "lies against the lamina papyracea" },
    ],
    clinical:
      "A fracture of the cribriform plate can cause loss of smell and CSF leakage from the nose (rhinorrhoea). Infection of the ethmoidal cells can spread through the thin orbital plate into the orbit.",
  },

  // ───────────────────────────── Facial skeleton, mandible & hyoid ─────────────────────────────
  "maxilla": {
    summary:
      "The two maxillae fuse in the midline to form the upper jaw. They hold the upper teeth and form most of the hard palate, the floor of each orbit and the lateral walls of the nasal cavity.",
    latin: "Maxilla",
    functions: [
      "Holds the upper teeth in its alveolar process",
      "Forms most of the hard palate, separating the mouth from the nose",
      "Contributes to the orbit, nasal cavity and cheek",
      "Contains the maxillary sinus",
    ],
    facts: [
      { label: "Sinus", value: "maxillary sinus is the largest paranasal sinus" },
      { label: "Joints", value: "articulates with most facial bones; linked to the mandible only via the teeth and muscles" },
    ],
    connections: [
      { concept: "frontal-bone", relation: "articulates-with" },
      { concept: "zygomatic-bone", relation: "articulates-with" },
      { concept: "nasal-bone", relation: "articulates-with" },
      { concept: "lacrimal-bone", relation: "articulates-with" },
      { concept: "ethmoid-bone", relation: "articulates-with" },
      { concept: "palatine-bone", relation: "articulates-with", note: "hard palate" },
      { concept: "vomer", relation: "articulates-with" },
      { concept: "inferior-nasal-concha", relation: "articulates-with" },
      { concept: "upper-teeth", relation: "contains", note: "alveolar sockets" },
      { concept: "masseter", relation: "attaches-to", note: "origin of superficial part (zygomatic process)" },
      { concept: "inferior-oblique-eye", relation: "attaches-to", note: "origin (orbital floor)" },
      { concept: "muscles-of-facial-expression", relation: "attaches-to", note: "e.g. levator labii superioris, buccinator" },
    ],
    clinical:
      "Midface fractures follow classic Le Fort patterns (I–III). Roots of the upper molars lie close to the maxillary sinus floor, so sinusitis can feel like toothache; failure of the palatine processes to fuse causes cleft palate.",
  },

  "zygomatic-bone": {
    summary:
      "The zygomatic bone (cheekbone) forms the prominence of the cheek and parts of the lateral wall and floor of the orbit. Its temporal process joins the temporal bone to form the zygomatic arch.",
    latin: "Os zygomaticum",
    functions: [
      "Forms the cheek prominence and lateral orbital rim",
      "Forms part of the zygomatic arch",
      "Gives origin to masseter and the zygomaticus muscles",
    ],
    facts: [
      { label: "Joints", value: "frontal, maxilla, temporal and sphenoid bones" },
    ],
    connections: [
      { concept: "frontal-bone", relation: "articulates-with" },
      { concept: "maxilla", relation: "articulates-with" },
      { concept: "temporal-bone", relation: "articulates-with", note: "zygomatic arch" },
      { concept: "sphenoid-bone", relation: "articulates-with", note: "greater wing (lateral orbital wall)" },
      { concept: "masseter", relation: "attaches-to", note: "origin" },
      { concept: "muscles-of-facial-expression", relation: "attaches-to", note: "zygomaticus major and minor" },
    ],
    clinical:
      "A blow to the cheek can cause a zygomaticomaxillary complex (\"tripod\") fracture, flattening the cheek and sometimes causing double vision or cheek numbness.",
  },

  "nasal-bone": {
    summary:
      "The two small nasal bones form the bony bridge of the nose. The nasal cartilages attach to their lower edges.",
    latin: "Os nasale",
    functions: [
      "Forms the bridge of the nose",
      "Supports the upper nasal cartilages",
    ],
    facts: [
      { label: "Fracture frequency", value: "most commonly fractured facial bone" },
    ],
    connections: [
      { concept: "frontal-bone", relation: "articulates-with" },
      { concept: "maxilla", relation: "articulates-with", note: "frontal process" },
      { concept: "ethmoid-bone", relation: "articulates-with", note: "perpendicular plate" },
      { concept: "nasal-cartilages", relation: "attaches-to", note: "lateral cartilages attach to the lower border" },
      { concept: "muscles-of-facial-expression", relation: "attaches-to", note: "procerus" },
    ],
  },

  "lacrimal-bone": {
    summary:
      "The lacrimal bone is a thin, fingernail-sized bone in the medial wall of the orbit. With the maxilla it forms the fossa that holds the lacrimal sac, part of the tear-drainage pathway.",
    latin: "Os lacrimale",
    functions: [
      "Forms part of the medial orbital wall",
      "Houses the lacrimal sac and the start of the nasolacrimal canal",
    ],
    facts: [
      { label: "Size", value: "smallest and most fragile facial bone" },
    ],
    connections: [
      { concept: "frontal-bone", relation: "articulates-with" },
      { concept: "maxilla", relation: "articulates-with" },
      { concept: "ethmoid-bone", relation: "articulates-with" },
      { concept: "inferior-nasal-concha", relation: "articulates-with" },
      { concept: "lacrimal-apparatus", relation: "adjacent-to", note: "lacrimal sac sits in the lacrimal fossa" },
      { concept: "muscles-of-facial-expression", relation: "attaches-to", note: "lacrimal part of orbicularis oculi" },
    ],
  },

  "palatine-bone": {
    summary:
      "The paired L-shaped palatine bones lie at the back of the nasal cavity. Their horizontal plates form the posterior part of the hard palate, and their perpendicular plates form part of the lateral nasal wall.",
    latin: "Os palatinum",
    functions: [
      "Forms the posterior hard palate",
      "Contributes to the nasal cavity wall and orbital floor",
      "Anchors the soft palate",
    ],
    facts: [
      { label: "Openings", value: "greater and lesser palatine foramina transmit palatine nerves and vessels" },
    ],
    connections: [
      { concept: "maxilla", relation: "articulates-with", note: "hard palate" },
      { concept: "sphenoid-bone", relation: "articulates-with" },
      { concept: "ethmoid-bone", relation: "articulates-with" },
      { concept: "vomer", relation: "articulates-with" },
      { concept: "inferior-nasal-concha", relation: "articulates-with" },
      { concept: "muscles-of-pharynx-soft-palate", relation: "attaches-to", note: "palatine aponeurosis at the posterior border" },
    ],
  },

  "inferior-nasal-concha": {
    summary:
      "The inferior nasal concha is a separate scroll-shaped bone projecting from the lateral wall of the nasal cavity. It is the largest concha; the superior and middle conchae are parts of the ethmoid bone.",
    latin: "Concha nasalis inferior",
    functions: [
      "Increases the mucosal surface area of the nasal cavity",
      "Warms, humidifies and filters inspired air",
    ],
    facts: [
      { label: "Inferior meatus", value: "the nasolacrimal duct opens beneath it" },
    ],
    connections: [
      { concept: "maxilla", relation: "articulates-with" },
      { concept: "lacrimal-bone", relation: "articulates-with" },
      { concept: "ethmoid-bone", relation: "articulates-with" },
      { concept: "palatine-bone", relation: "articulates-with" },
      { concept: "lacrimal-apparatus", relation: "adjacent-to", note: "nasolacrimal duct opens into the inferior meatus" },
    ],
  },

  "vomer": {
    summary:
      "The vomer is a thin, plough-shaped bone forming the lower and back part of the nasal septum. It is unpaired and sits in the midline.",
    latin: "Vomer",
    functions: [
      "Forms the posteroinferior bony nasal septum",
      "Divides the nasal cavity into left and right halves",
    ],
    facts: [
      { label: "Septum", value: "completed by the ethmoid's perpendicular plate above and septal cartilage in front" },
    ],
    connections: [
      { concept: "sphenoid-bone", relation: "articulates-with" },
      { concept: "ethmoid-bone", relation: "articulates-with", note: "perpendicular plate" },
      { concept: "maxilla", relation: "articulates-with" },
      { concept: "palatine-bone", relation: "articulates-with" },
      { concept: "nasal-cartilages", relation: "attaches-to", note: "septal cartilage" },
    ],
    clinical: "Deviation of the nasal septum (bone and cartilage) is common and can obstruct airflow on one side.",
  },

  "mandible": {
    summary:
      "The mandible (lower jaw) is the largest and strongest facial bone and the only skull bone that moves freely. It holds the lower teeth and forms the temporomandibular joints with the temporal bones.",
    latin: "Mandibula",
    functions: [
      "Holds the lower teeth",
      "Moves during chewing, speaking and swallowing",
      "Anchors the muscles of mastication, the floor of the mouth and the tongue",
    ],
    facts: [
      { label: "Parts", value: "body, two rami, angles, coronoid and condylar processes" },
      { label: "Development", value: "the two halves fuse at the midline symphysis during the first year" },
      { label: "Canal", value: "mandibular canal carries the inferior alveolar nerve and vessels" },
    ],
    connections: [
      { concept: "temporal-bone", relation: "articulates-with", note: "temporomandibular joints" },
      { concept: "lower-teeth", relation: "contains", note: "alveolar sockets" },
      { concept: "masseter", relation: "attaches-to", note: "insertion (lateral ramus and angle)" },
      { concept: "temporalis", relation: "attaches-to", note: "insertion (coronoid process)" },
      { concept: "digastric", relation: "attaches-to", note: "origin of anterior belly (digastric fossa)" },
      { concept: "mylohyoid", relation: "attaches-to", note: "origin (mylohyoid line)" },
      { concept: "geniohyoid", relation: "attaches-to", note: "origin (inferior mental spine)" },
      { concept: "extrinsic-tongue-muscles", relation: "attaches-to", note: "genioglossus (superior mental spine)" },
      { concept: "platysma", relation: "attaches-to", note: "insertion (lower border)" },
    ],
    clinical:
      "Because the mandible forms a ring with the skull, fractures are often bilateral (e.g. the angle on one side and the condylar neck on the other). The TMJ can dislocate anteriorly during wide yawning.",
    sexDifferences:
      "Male mandibles are typically larger and more robust, with a squarer chin and more everted angles; female mandibles are usually more gracile with a more pointed chin.",
  },

  "hyoid-bone": {
    summary:
      "The hyoid is a U-shaped bone in the front of the neck at about the level of C3. It is the only bone that does not articulate with any other bone; it is suspended by muscles and ligaments and anchors the tongue and larynx.",
    latin: "Os hyoideum",
    functions: [
      "Anchors the tongue",
      "Suspends the larynx and moves it during swallowing and speech",
      "Provides attachment for suprahyoid and infrahyoid muscles",
    ],
    facts: [
      { label: "Parts", value: "body, paired greater and lesser horns" },
      { label: "Level", value: "about C3" },
      { label: "Joints", value: "none with other bones" },
    ],
    connections: [
      { concept: "stylohyoid-ligament", relation: "attaches-to", note: "lesser horn" },
      { concept: "mylohyoid", relation: "attaches-to", note: "insertion (body)" },
      { concept: "geniohyoid", relation: "attaches-to", note: "insertion (body)" },
      { concept: "stylohyoid", relation: "attaches-to", note: "insertion (body/greater horn junction)" },
      { concept: "intermediate-tendon", relation: "attaches-to", note: "digastric tendon held by a fibrous sling" },
      { concept: "sternohyoid", relation: "attaches-to", note: "insertion (body)" },
      { concept: "omohyoid", relation: "attaches-to", note: "insertion (body)" },
      { concept: "thyrohyoid", relation: "attaches-to", note: "insertion (body and greater horn)" },
      { concept: "extrinsic-tongue-muscles", relation: "attaches-to", note: "hyoglossus origin" },
      { concept: "pharyngeal-constrictors", relation: "attaches-to", note: "middle constrictor origin (horns)" },
      { concept: "thyroid-cartilage", relation: "adjacent-to", note: "linked by the thyrohyoid membrane" },
    ],
    clinical:
      "A fractured hyoid (especially the greater horns) found at autopsy is suggestive of manual strangulation.",
  },

  "stylohyoid-ligament": {
    summary:
      "A fibrous cord running from the tip of the styloid process of the temporal bone to the lesser horn of the hyoid. It develops from the cartilage of the second pharyngeal arch.",
    latin: "Ligamentum stylohyoideum",
    functions: [
      "Suspends the hyoid bone from the skull base",
      "Provides partial origin for the middle pharyngeal constrictor",
    ],
    facts: [
      { label: "Origin", value: "second pharyngeal arch (Reichert's) cartilage" },
    ],
    connections: [
      { concept: "temporal-bone", relation: "attaches-to", note: "tip of the styloid process" },
      { concept: "hyoid-bone", relation: "attaches-to", note: "lesser horn" },
      { concept: "pharyngeal-constrictors", relation: "attaches-to", note: "partial origin of middle constrictor" },
      { concept: "stylohyoid", relation: "adjacent-to", note: "muscle runs alongside it" },
    ],
    clinical:
      "The ligament may calcify or the styloid process may be elongated (Eagle syndrome), causing throat pain or pain on swallowing and turning the head.",
  },

  "nasal-cartilages": {
    summary:
      "The flexible skeleton of the external nose is made of hyaline cartilages: the septal cartilage in the midline, the lateral cartilages and the U-shaped major alar cartilages around the nostrils, plus small minor alar cartilages.",
    latin: "Cartilagines nasi",
    functions: [
      "Shape the lower external nose and nostrils",
      "Keep the nostrils open while remaining flexible",
      "Form the front of the nasal septum",
    ],
    facts: [
      { label: "Tissue", value: "hyaline cartilage" },
      { label: "Main parts", value: "septal, lateral and major/minor alar cartilages" },
    ],
    connections: [
      { concept: "nasal-bone", relation: "attaches-to", note: "lateral cartilages" },
      { concept: "maxilla", relation: "attaches-to", note: "frontal process and nasal notch" },
      { concept: "ethmoid-bone", relation: "attaches-to", note: "septal cartilage to perpendicular plate" },
      { concept: "vomer", relation: "attaches-to", note: "septal cartilage" },
      { concept: "muscles-of-facial-expression", relation: "attaches-to", note: "nasalis" },
    ],
    clinical:
      "A septal haematoma after nasal trauma must be drained promptly; otherwise the cartilage can die, leading to a \"saddle-nose\" deformity.",
  },

  // ───────────────────────────── Sternum ─────────────────────────────
  "manubrium-of-sternum": {
    summary:
      "The manubrium is the broad upper part of the sternum. It joins the clavicles and first ribs and meets the body of the sternum at the sternal angle, a key surface landmark.",
    latin: "Manubrium sterni",
    functions: [
      "Anchors the clavicles and first costal cartilages",
      "Protects the great vessels behind it",
      "Gives origin to neck and chest muscles",
    ],
    facts: [
      { label: "Jugular notch", value: "upper border, at about the level of T2–T3" },
      { label: "Sternal angle", value: "manubriosternal joint at the level of the 2nd costal cartilages and the T4–T5 disc" },
    ],
    connections: [
      { concept: "clavicle", relation: "articulates-with", note: "sternoclavicular joints" },
      { concept: "first-costal-cartilage", relation: "articulates-with", note: "synchondrosis" },
      { concept: "second-costal-cartilage", relation: "articulates-with", note: "demifacet at the sternal angle" },
      { concept: "body-of-sternum", relation: "articulates-with", note: "manubriosternal joint (sternal angle)" },
      { concept: "sternocleidomastoid", relation: "attaches-to", note: "origin of sternal head" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin (sternal part)" },
      { concept: "sternohyoid", relation: "attaches-to", note: "origin (posterior surface)" },
      { concept: "sternothyroid", relation: "attaches-to", note: "origin (posterior surface)" },
      { concept: "arch-of-aorta", relation: "adjacent-to", note: "lies behind the manubrium" },
      { concept: "brachiocephalic-vein", relation: "adjacent-to", note: "left vein crosses behind it" },
      { concept: "internal-thoracic-artery", relation: "supplied-by" },
    ],
    clinical:
      "The sternal angle is used to count ribs (the 2nd costal cartilage joins here) and marks the plane of the tracheal bifurcation and the beginning and end of the aortic arch.",
  },

  "body-of-sternum": {
    summary:
      "The body is the long middle part of the sternum, formed by fusion of four segments (sternebrae). It receives the costal cartilages of ribs 2–7 and lies in front of the heart.",
    latin: "Corpus sterni",
    functions: [
      "Anchors costal cartilages 2–7 to complete the rib cage",
      "Protects the heart",
      "Gives origin to pectoralis major",
    ],
    facts: [
      { label: "Development", value: "four sternebrae fuse from puberty into early adulthood" },
      { label: "Joints", value: "manubriosternal (above), xiphisternal (below, about T9), costal notches for ribs 2–7" },
    ],
    connections: [
      { concept: "manubrium-of-sternum", relation: "articulates-with", note: "sternal angle" },
      { concept: "xiphoid-process", relation: "articulates-with", note: "xiphisternal joint" },
      { concept: "second-costal-cartilage", relation: "articulates-with", note: "lower demifacet" },
      { concept: "third-costal-cartilage", relation: "articulates-with" },
      { concept: "fourth-costal-cartilage", relation: "articulates-with" },
      { concept: "fifth-costal-cartilage", relation: "articulates-with" },
      { concept: "sixth-costal-cartilage", relation: "articulates-with" },
      { concept: "seventh-costal-cartilage", relation: "articulates-with" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin (anterior surface)" },
      { concept: "transversus-thoracis", relation: "attaches-to", note: "origin (posterior lower surface)" },
      { concept: "internal-thoracic-artery", relation: "adjacent-to", note: "runs about 1 cm lateral to the sternal border" },
      { concept: "ventricular-myocardium", relation: "adjacent-to", note: "heart (mainly right ventricle) lies behind" },
    ],
    clinical:
      "Chest compressions in CPR are delivered over the lower half of the sternum. Cardiac surgeons open the chest by splitting the sternum in the midline (median sternotomy).",
  },

  "xiphoid-process": {
    summary:
      "The xiphoid process is the small, pointed lower tip of the sternum. It is cartilaginous in young people and gradually ossifies in adulthood.",
    latin: "Processus xiphoideus",
    functions: [
      "Anchors part of the diaphragm and the rectus abdominis",
      "Attachment point for the linea alba",
    ],
    facts: [
      { label: "Level", value: "xiphisternal joint at about T9" },
      { label: "Ossification", value: "often not fully ossified until around 40 years; shape varies (may be bifid or perforated)" },
    ],
    connections: [
      { concept: "body-of-sternum", relation: "articulates-with", note: "xiphisternal joint" },
      { concept: "seventh-costal-cartilage", relation: "articulates-with", note: "partly" },
      { concept: "diaphragm", relation: "attaches-to", note: "origin of sternal part (posterior surface)" },
      { concept: "rectus-abdominis", relation: "attaches-to", note: "insertion" },
      { concept: "linea-alba", relation: "attaches-to", note: "upper end" },
      { concept: "transversus-thoracis", relation: "attaches-to", note: "origin" },
    ],
    clinical:
      "Poorly placed CPR compressions can fracture the xiphoid and injure the liver. It is the landmark for the subxiphoid approach to the pericardium.",
  },

  // ───────────────────────────── Costal cartilages ─────────────────────────────
  "first-costal-cartilage": {
    summary:
      "The first costal cartilage joins the first rib to the manubrium. Unlike the other sternocostal joints, this is a rigid cartilaginous joint (synchondrosis) that allows almost no movement.",
    latin: "Cartilago costalis I",
    functions: [
      "Fixes the first rib to the sternum",
      "Gives attachment to the sternoclavicular joint disc and subclavius",
    ],
    facts: [
      { label: "Joint type", value: "primary cartilaginous joint (synchondrosis)" },
      { label: "Ageing", value: "often ossifies in adults" },
    ],
    connections: [
      { concept: "first-rib", relation: "articulates-with", note: "costochondral joint" },
      { concept: "manubrium-of-sternum", relation: "articulates-with", note: "first sternocostal joint" },
      { concept: "clavicle", relation: "articulates-with", note: "via the sternoclavicular articular disc" },
      { concept: "subclavius", relation: "attaches-to", note: "origin (rib–cartilage junction)" },
      { concept: "sternothyroid", relation: "attaches-to", note: "partial origin" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin of sternocostal head" },
    ],
  },

  "second-costal-cartilage": {
    summary:
      "The second costal cartilage attaches the second rib to the sternum exactly at the sternal angle, making it the easiest cartilage to find when counting ribs.",
    latin: "Cartilago costalis II",
    functions: [
      "Links the second rib to both the manubrium and the body of the sternum",
      "Key landmark for counting ribs and intercostal spaces",
    ],
    facts: [
      { label: "Joint", value: "synovial sternocostal joint with demifacets on manubrium and body" },
    ],
    connections: [
      { concept: "second-rib", relation: "articulates-with", note: "costochondral joint" },
      { concept: "manubrium-of-sternum", relation: "articulates-with" },
      { concept: "body-of-sternum", relation: "articulates-with" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin of sternocostal head" },
      { concept: "transversus-thoracis", relation: "attaches-to", note: "insertion (internal surface)" },
      { concept: "internal-thoracic-artery", relation: "adjacent-to", note: "descends behind the cartilages" },
    ],
  },

  "third-costal-cartilage": {
    summary:
      "The third costal cartilage connects the third rib to the body of the sternum at a small synovial joint.",
    latin: "Cartilago costalis III",
    functions: [
      "Links the third rib to the sternum",
      "Adds flexibility to the rib cage for breathing",
    ],
    facts: [
      { label: "Rib type", value: "part of a true (vertebrosternal) rib" },
    ],
    connections: [
      { concept: "third-rib", relation: "articulates-with", note: "costochondral joint" },
      { concept: "body-of-sternum", relation: "articulates-with", note: "sternocostal joint" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin of sternocostal head" },
      { concept: "transversus-thoracis", relation: "attaches-to", note: "insertion (internal surface)" },
      { concept: "internal-thoracic-artery", relation: "adjacent-to" },
    ],
    clinical: "Costochondritis (painful inflammation of the costal cartilages) most often affects the upper cartilages, around ribs 2–5.",
  },

  "fourth-costal-cartilage": {
    summary:
      "The fourth costal cartilage connects the fourth rib to the body of the sternum. In many males the nipple lies over the fourth intercostal space just below it.",
    latin: "Cartilago costalis IV",
    functions: [
      "Links the fourth rib to the sternum",
      "Adds flexibility to the rib cage",
    ],
    facts: [
      { label: "Rib type", value: "part of a true (vertebrosternal) rib" },
    ],
    connections: [
      { concept: "fourth-rib", relation: "articulates-with", note: "costochondral joint" },
      { concept: "body-of-sternum", relation: "articulates-with", note: "sternocostal joint" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin of sternocostal head" },
      { concept: "transversus-thoracis", relation: "attaches-to", note: "insertion (internal surface)" },
      { concept: "internal-thoracic-artery", relation: "adjacent-to" },
    ],
  },

  "fifth-costal-cartilage": {
    summary:
      "The fifth costal cartilage connects the fifth rib to the body of the sternum and is the highest cartilage to receive the rectus abdominis.",
    latin: "Cartilago costalis V",
    functions: [
      "Links the fifth rib to the sternum",
      "Anchors the upper end of rectus abdominis",
    ],
    facts: [
      { label: "Rib type", value: "part of a true (vertebrosternal) rib" },
    ],
    connections: [
      { concept: "fifth-rib", relation: "articulates-with", note: "costochondral joint" },
      { concept: "body-of-sternum", relation: "articulates-with", note: "sternocostal joint" },
      { concept: "rectus-abdominis", relation: "attaches-to", note: "insertion" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin of sternocostal head" },
      { concept: "transversus-thoracis", relation: "attaches-to", note: "insertion (internal surface)" },
    ],
  },

  "sixth-costal-cartilage": {
    summary:
      "The sixth costal cartilage connects the sixth rib to the lower body of the sternum. It is longer and angled more upward than the cartilages above.",
    latin: "Cartilago costalis VI",
    functions: [
      "Links the sixth rib to the sternum",
      "Anchors rectus abdominis and pectoralis major",
    ],
    facts: [
      { label: "Rib type", value: "part of a true (vertebrosternal) rib" },
      { label: "Joints", value: "sternocostal joint and an interchondral joint with the 7th cartilage" },
    ],
    connections: [
      { concept: "sixth-rib", relation: "articulates-with", note: "costochondral joint" },
      { concept: "body-of-sternum", relation: "articulates-with", note: "sternocostal joint" },
      { concept: "seventh-costal-cartilage", relation: "articulates-with", note: "interchondral joint" },
      { concept: "rectus-abdominis", relation: "attaches-to", note: "insertion" },
      { concept: "pectoralis-major", relation: "attaches-to", note: "origin of sternocostal head" },
      { concept: "transversus-thoracis", relation: "attaches-to", note: "insertion (internal surface)" },
    ],
  },

  "seventh-costal-cartilage": {
    summary:
      "The seventh costal cartilage is the last to reach the sternum directly, joining it near the xiphisternal junction. The cartilage of the eighth rib joins its lower border, forming the start of the costal margin.",
    latin: "Cartilago costalis VII",
    functions: [
      "Links the seventh (last true) rib to the sternum",
      "Forms the upper part of the costal margin",
      "Anchors the diaphragm and anterior abdominal wall muscles",
    ],
    facts: [
      { label: "Rib type", value: "part of the last true (vertebrosternal) rib" },
      { label: "Costal margin", value: "cartilages 8–10 join the cartilage above, forming the costal margin" },
    ],
    connections: [
      { concept: "seventh-rib", relation: "articulates-with", note: "costochondral joint" },
      { concept: "body-of-sternum", relation: "articulates-with", note: "sternocostal joint" },
      { concept: "xiphoid-process", relation: "articulates-with", note: "partly" },
      { concept: "eighth-rib", relation: "articulates-with", note: "8th costal cartilage joins its lower border" },
      { concept: "rectus-abdominis", relation: "attaches-to", note: "insertion" },
      { concept: "diaphragm", relation: "attaches-to", note: "origin of costal part (internal surface)" },
      { concept: "transversus-abdominis", relation: "attaches-to", note: "origin (internal surface)" },
    ],
  },

  // ───────────────────────────── Ribs 1–6 ─────────────────────────────
  "first-rib": {
    summary:
      "The first rib is the shortest, broadest and most sharply curved rib, with flat upper and lower surfaces. It articulates only with T1 and carries grooves for the subclavian vessels, which cross it on their way to the arm.",
    latin: "Costa I",
    functions: [
      "Forms the rim of the superior thoracic aperture",
      "Supports the subclavian vessels and brachial plexus as they pass to the upper limb",
      "Anchors the anterior and middle scalene muscles",
    ],
    facts: [
      { label: "Rib type", value: "atypical true rib; single facet on the head (T1 only)" },
      { label: "Key landmarks", value: "scalene tubercle between grooves for the subclavian vein (in front) and artery (behind)" },
    ],
    connections: [
      { concept: "first-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "first-costal-cartilage", relation: "articulates-with", note: "costochondral joint" },
      { concept: "scalenus-anterior", relation: "attaches-to", note: "insertion (scalene tubercle)" },
      { concept: "scalenus-medius", relation: "attaches-to", note: "insertion (upper surface behind the arterial groove)" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "origin (first digitation)" },
      { concept: "subclavius", relation: "attaches-to", note: "origin (rib–cartilage junction)" },
      { concept: "subclavian-artery", relation: "adjacent-to", note: "groove behind the scalene tubercle" },
      { concept: "subclavian-vein", relation: "adjacent-to", note: "groove in front of the scalene tubercle" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "lower trunk crosses the rib" },
      { concept: "clavicle", relation: "adjacent-to", note: "costoclavicular ligament" },
      { concept: "superior-lobe-of-lung", relation: "adjacent-to", note: "lung apex rises above the rib" },
    ],
    clinical:
      "Narrowing of the space between the clavicle, first rib and scalenes (or an extra cervical rib) can compress the brachial plexus and subclavian vessels (thoracic outlet syndrome). A first-rib fracture implies high-energy trauma.",
  },

  "second-rib": {
    summary:
      "The second rib is thinner and less curved than the first and about twice as long. Its cartilage meets the sternum at the sternal angle, and a roughened tuberosity on its outer surface anchors serratus anterior.",
    latin: "Costa II",
    functions: [
      "Forms part of the upper thoracic wall",
      "Anchors serratus anterior and the posterior scalene",
    ],
    facts: [
      { label: "Rib type", value: "atypical true rib; head articulates with T1 and T2" },
      { label: "Key landmark", value: "tuberosity for serratus anterior" },
    ],
    connections: [
      { concept: "first-thoracic-vertebra", relation: "articulates-with", note: "head (upper demifacet)" },
      { concept: "second-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "intervertebral-disc-below-first-thoracic", relation: "attaches-to", note: "intra-articular ligament of the head" },
      { concept: "second-costal-cartilage", relation: "articulates-with", note: "costochondral joint" },
      { concept: "scalenus-posterior", relation: "attaches-to", note: "insertion" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "origin (tuberosity)" },
      { concept: "serratus-posterior-superior", relation: "attaches-to", note: "insertion" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "run in the costal groove" },
    ],
  },

  "third-rib": {
    summary:
      "The third rib is a typical rib: its head has two facets for the bodies of T2 and T3, its tubercle joins the transverse process of T3, and a costal groove on its lower inner border shelters the intercostal vessels and nerve.",
    latin: "Costa III",
    functions: [
      "Forms part of the thoracic wall and moves during breathing",
      "Anchors pectoralis minor and serratus anterior",
    ],
    facts: [
      { label: "Rib type", value: "typical true rib" },
      { label: "Costal groove", value: "holds the intercostal vein, artery and nerve (top to bottom: VAN)" },
    ],
    connections: [
      { concept: "second-thoracic-vertebra", relation: "articulates-with", note: "head (upper facet)" },
      { concept: "third-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "intervertebral-disc-below-second-thoracic", relation: "attaches-to", note: "intra-articular ligament of the head" },
      { concept: "third-costal-cartilage", relation: "articulates-with", note: "costochondral joint" },
      { concept: "pectoralis-minor", relation: "attaches-to", note: "origin" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "origin" },
      { concept: "serratus-posterior-superior", relation: "attaches-to", note: "insertion" },
      { concept: "iliocostalis-cervicis", relation: "attaches-to", note: "origin (angle)" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "internal-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
    ],
  },

  "fourth-rib": {
    summary:
      "The fourth rib is a typical rib articulating with T3 and T4. On the right, the horizontal fissure of the lung follows roughly the line of the fourth rib and cartilage.",
    latin: "Costa IV",
    functions: [
      "Forms part of the thoracic wall and moves during breathing",
      "Anchors pectoralis minor and serratus anterior",
    ],
    facts: [
      { label: "Rib type", value: "typical true rib" },
    ],
    connections: [
      { concept: "third-thoracic-vertebra", relation: "articulates-with", note: "head (upper facet)" },
      { concept: "fourth-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "intervertebral-disc-below-third-thoracic", relation: "attaches-to", note: "intra-articular ligament of the head" },
      { concept: "fourth-costal-cartilage", relation: "articulates-with", note: "costochondral joint" },
      { concept: "pectoralis-minor", relation: "attaches-to", note: "origin" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "origin" },
      { concept: "serratus-posterior-superior", relation: "attaches-to", note: "insertion" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "internal-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
      { concept: "middle-lobe-of-lung", relation: "adjacent-to", note: "horizontal fissure (right) follows the 4th rib" },
    ],
  },

  "fifth-rib": {
    summary:
      "The fifth rib is a typical rib articulating with T4 and T5. The apex of the heart usually lies just below it, in the left fifth intercostal space at the midclavicular line.",
    latin: "Costa V",
    functions: [
      "Forms part of the thoracic wall and moves during breathing",
      "Anchors pectoralis minor, serratus anterior and external oblique",
    ],
    facts: [
      { label: "Rib type", value: "typical true rib" },
    ],
    connections: [
      { concept: "fourth-thoracic-vertebra", relation: "articulates-with", note: "head (upper facet)" },
      { concept: "fifth-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "intervertebral-disc-below-fourth-thoracic", relation: "attaches-to", note: "intra-articular ligament of the head" },
      { concept: "fifth-costal-cartilage", relation: "articulates-with", note: "costochondral joint" },
      { concept: "pectoralis-minor", relation: "attaches-to", note: "origin" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "origin" },
      { concept: "external-oblique", relation: "attaches-to", note: "origin (highest digitation)" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "internal-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
      { concept: "ventricular-myocardium", relation: "adjacent-to", note: "cardiac apex lies in the 5th intercostal space" },
    ],
  },

  "sixth-rib": {
    summary:
      "The sixth rib is a typical rib articulating with T5 and T6. The lower border of the lung crosses it at the midclavicular line, and the oblique fissure ends anteriorly near its cartilage.",
    latin: "Costa VI",
    functions: [
      "Forms part of the thoracic wall and moves during breathing",
      "Anchors serratus anterior, external oblique and back muscles",
    ],
    facts: [
      { label: "Rib type", value: "typical true rib" },
    ],
    connections: [
      { concept: "fifth-thoracic-vertebra", relation: "articulates-with", note: "head (upper facet)" },
      { concept: "sixth-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "intervertebral-disc-below-fifth-thoracic", relation: "attaches-to", note: "intra-articular ligament of the head" },
      { concept: "sixth-costal-cartilage", relation: "articulates-with", note: "costochondral joint" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "origin" },
      { concept: "external-oblique", relation: "attaches-to", note: "origin" },
      { concept: "iliocostalis-thoracis", relation: "attaches-to", note: "insertion (angle)" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "internal-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
      { concept: "inferior-lobe-of-lung", relation: "adjacent-to", note: "lung's lower border crosses the 6th rib at the midclavicular line" },
    ],
  },

  // ───────────────────────────── Ribs 7–12 ─────────────────────────────
  "seventh-rib": {
    summary:
      "The seventh rib is the last true rib, attaching to the sternum through its own cartilage. Ribs lengthen from the first to about the seventh, so it is usually the longest.",
    latin: "Costa VII",
    functions: [
      "Forms the lower part of the true-rib cage",
      "Anchors the diaphragm, serratus anterior and external oblique",
    ],
    facts: [
      { label: "Rib type", value: "typical, last true (vertebrosternal) rib" },
      { label: "Length", value: "usually the longest rib" },
    ],
    connections: [
      { concept: "sixth-thoracic-vertebra", relation: "articulates-with", note: "head (upper facet)" },
      { concept: "seventh-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "intervertebral-disc-below-sixth-thoracic", relation: "attaches-to", note: "intra-articular ligament of the head" },
      { concept: "seventh-costal-cartilage", relation: "articulates-with", note: "costochondral joint" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "origin" },
      { concept: "external-oblique", relation: "attaches-to", note: "origin" },
      { concept: "diaphragm", relation: "attaches-to", note: "costal part (inner surface)" },
      { concept: "iliocostalis-thoracis", relation: "attaches-to", note: "origin (angle)" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "internal-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
    ],
  },

  "eighth-rib": {
    summary:
      "The eighth rib is the first false (vertebrochondral) rib: its costal cartilage joins the seventh costal cartilage instead of reaching the sternum, helping form the costal margin.",
    latin: "Costa VIII",
    functions: [
      "Forms part of the lower thoracic wall and costal margin",
      "Anchors the diaphragm and abdominal wall muscles",
    ],
    facts: [
      { label: "Rib type", value: "typical false rib (vertebrochondral)" },
      { label: "Lung border", value: "lower lung border lies at about the 8th rib in the midaxillary line" },
    ],
    connections: [
      { concept: "seventh-thoracic-vertebra", relation: "articulates-with", note: "head (upper facet)" },
      { concept: "eighth-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "intervertebral-disc-below-seventh-thoracic", relation: "attaches-to", note: "intra-articular ligament of the head" },
      { concept: "seventh-costal-cartilage", relation: "articulates-with", note: "its own cartilage joins the 7th" },
      { concept: "serratus-anterior", relation: "attaches-to", note: "origin (lowest digitations)" },
      { concept: "external-oblique", relation: "attaches-to", note: "origin" },
      { concept: "diaphragm", relation: "attaches-to", note: "costal part" },
      { concept: "iliocostalis-thoracis", relation: "attaches-to", note: "origin (angle)" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
      { concept: "inferior-lobe-of-lung", relation: "adjacent-to" },
    ],
  },

  "ninth-rib": {
    summary:
      "The ninth rib is a false rib whose cartilage joins the one above. On the left it overlies the upper part of the spleen, which lies deep to ribs 9–11.",
    latin: "Costa IX",
    functions: [
      "Forms part of the lower thoracic wall",
      "Protects upper abdominal organs such as the spleen and liver",
    ],
    facts: [
      { label: "Rib type", value: "typical false rib (vertebrochondral)" },
    ],
    connections: [
      { concept: "eighth-thoracic-vertebra", relation: "articulates-with", note: "head (upper facet)" },
      { concept: "ninth-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "intervertebral-disc-below-eighth-thoracic", relation: "attaches-to", note: "intra-articular ligament of the head" },
      { concept: "external-oblique", relation: "attaches-to", note: "origin" },
      { concept: "diaphragm", relation: "attaches-to", note: "costal part" },
      { concept: "serratus-posterior-inferior", relation: "attaches-to", note: "insertion" },
      { concept: "iliocostalis-thoracis", relation: "attaches-to", note: "origin (angle)" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
      { concept: "spleen", relation: "adjacent-to", note: "left side" },
    ],
  },

  "tenth-rib": {
    summary:
      "The tenth rib is the lowest false rib. It is atypical because its head usually has a single facet that articulates only with T10; its cartilage joins the ninth cartilage.",
    latin: "Costa X",
    functions: [
      "Forms the lowest part of the costal margin",
      "Protects the spleen (left) and liver (right)",
    ],
    facts: [
      { label: "Rib type", value: "atypical false rib; head usually articulates with T10 only" },
      { label: "Surface anatomy", value: "the lowest point of the costal margin (about L3 level) is on the 10th costal cartilage" },
    ],
    connections: [
      { concept: "tenth-thoracic-vertebra", relation: "articulates-with", note: "head and tubercle" },
      { concept: "external-oblique", relation: "attaches-to", note: "origin" },
      { concept: "internal-oblique", relation: "attaches-to", note: "insertion (inferior border)" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin (variable)" },
      { concept: "serratus-posterior-inferior", relation: "attaches-to", note: "insertion" },
      { concept: "diaphragm", relation: "attaches-to", note: "costal part" },
      { concept: "external-intercostal-muscles", relation: "attaches-to" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
      { concept: "spleen", relation: "adjacent-to", note: "long axis of the spleen lies along the left 10th rib" },
    ],
    clinical:
      "Fractures of the lower left ribs (9–11) can lacerate the spleen, causing serious internal bleeding.",
  },

  "eleventh-rib": {
    summary:
      "The eleventh rib is a floating rib: it has no anterior cartilage connection, and its short cartilaginous tip ends in the muscles of the abdominal wall. Its head articulates only with T11 and it has no tubercle.",
    latin: "Costa XI",
    functions: [
      "Protects the kidneys and spleen posteriorly",
      "Anchors abdominal wall and back muscles",
    ],
    facts: [
      { label: "Rib type", value: "atypical floating (vertebral) rib; single facet, no tubercle or costotransverse joint" },
    ],
    connections: [
      { concept: "eleventh-thoracic-vertebra", relation: "articulates-with", note: "head only" },
      { concept: "external-oblique", relation: "attaches-to", note: "origin" },
      { concept: "internal-oblique", relation: "attaches-to", note: "insertion" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin" },
      { concept: "serratus-posterior-inferior", relation: "attaches-to", note: "insertion" },
      { concept: "diaphragm", relation: "attaches-to", note: "costal part" },
      { concept: "intercostal-arteries", relation: "supplied-by" },
      { concept: "intercostal-nerves", relation: "adjacent-to" },
      { concept: "spleen", relation: "adjacent-to", note: "left side" },
      { concept: "kidney", relation: "adjacent-to", note: "upper pole of the left kidney" },
    ],
  },

  "twelfth-rib": {
    summary:
      "The twelfth rib is the shortest floating rib and may be very short. It articulates only with T12, has no tubercle, and lies behind the upper part of the kidneys.",
    latin: "Costa XII",
    functions: [
      "Protects the kidneys posteriorly",
      "Anchors the diaphragm, abdominal wall and back muscles",
    ],
    facts: [
      { label: "Rib type", value: "atypical floating rib; single facet on the head, no neck or tubercle" },
      { label: "Length", value: "highly variable; may be only a few centimetres" },
    ],
    connections: [
      { concept: "twelfth-thoracic-vertebra", relation: "articulates-with", note: "head only" },
      { concept: "diaphragm", relation: "attaches-to", note: "costal part and lateral arcuate ligament" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin" },
      { concept: "external-oblique", relation: "attaches-to", note: "origin" },
      { concept: "internal-oblique", relation: "attaches-to", note: "insertion" },
      { concept: "serratus-posterior-inferior", relation: "attaches-to", note: "insertion" },
      { concept: "iliocostalis-lumborum", relation: "attaches-to", note: "insertion" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "subcostal nerve (T12) runs below it" },
      { concept: "intercostal-arteries", relation: "supplied-by", note: "subcostal artery" },
      { concept: "kidney", relation: "adjacent-to", note: "crosses the posterior surface of both kidneys" },
    ],
    clinical:
      "The pleural cavity extends below the medial part of the 12th rib, so posterior approaches to the kidney risk entering the pleura (pneumothorax).",
  },

  // ───────────────────────────── Cervical vertebrae ─────────────────────────────
  "atlas-c1": {
    summary:
      "The atlas (C1) is a ring of bone that supports the skull. Unlike other vertebrae it has no body and no spinous process; instead it has anterior and posterior arches joined by two lateral masses.",
    latin: "Atlas",
    functions: [
      "Supports the skull at the atlanto-occipital joints (nodding, \"yes\" movement)",
      "Rotates around the dens of the axis (\"no\" movement)",
      "Protects the upper spinal cord",
    ],
    facts: [
      { label: "Unique features", value: "no body, no spinous process (only a posterior tubercle), large lateral masses" },
      { label: "Development", value: "its original body fuses to C2 as the dens" },
      { label: "Rotation", value: "atlanto-axial joints provide roughly half of the neck's rotation" },
    ],
    connections: [
      { concept: "occipital-bone", relation: "articulates-with", note: "atlanto-occipital joints (occipital condyles)" },
      { concept: "axis-c2", relation: "articulates-with", note: "atlanto-axial joints (including the dens)" },
      { concept: "rectus-capitis-posterior-minor", relation: "attaches-to", note: "origin (posterior tubercle)" },
      { concept: "obliquus-capitis-superior", relation: "attaches-to", note: "origin (transverse process)" },
      { concept: "obliquus-capitis-inferior", relation: "attaches-to", note: "insertion (transverse process)" },
      { concept: "rectus-capitis-anterior", relation: "attaches-to", note: "origin (lateral mass)" },
      { concept: "rectus-capitis-lateralis", relation: "attaches-to", note: "origin (transverse process)" },
      { concept: "levator-scapulae", relation: "attaches-to", note: "origin (transverse process)" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "vertebral artery grooves the posterior arch" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "passes through its large vertebral foramen" },
    ],
    clinical:
      "An axial load on the head (e.g. diving into shallow water) can burst the ring (Jefferson fracture). Laxity or rupture of the transverse ligament lets the dens compress the spinal cord.",
  },

  "axis-c2": {
    summary:
      "The axis (C2) is identified by its tooth-like dens (odontoid process), which projects up into the ring of the atlas and forms the pivot around which the head rotates.",
    latin: "Axis",
    functions: [
      "Provides the pivot (dens) for rotation of the atlas and head",
      "Transfers the weight of the head to the rest of the cervical spine",
      "Its large spinous process anchors suboccipital muscles",
    ],
    facts: [
      { label: "Unique features", value: "dens (odontoid process); large, bifid spinous process" },
      { label: "Discs", value: "first intervertebral disc lies below C2 (none between C0–C1 or C1–C2)" },
    ],
    connections: [
      { concept: "atlas-c1", relation: "articulates-with", note: "median and lateral atlanto-axial joints" },
      { concept: "third-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-axis", relation: "articulates-with", note: "C2–C3 disc" },
      { concept: "rectus-capitis-posterior-major", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "obliquus-capitis-inferior", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "semispinalis-cervicis", relation: "attaches-to", note: "insertion (mainly C2 spinous process)" },
      { concept: "levator-scapulae", relation: "attaches-to", note: "origin (transverse process)" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "vertebral artery in the transverse foramen" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
    clinical:
      "Dens fractures are common in older people after falls. Forced hyperextension can fracture both pedicles/pars of C2 (\"hangman's fracture\").",
  },

  "third-cervical-vertebra": {
    summary:
      "C3 is a typical cervical vertebra with a small body, uncinate processes, transverse foramina for the vertebral artery and a short bifid spinous process. It lies at about the level of the hyoid bone.",
    latin: "Vertebra cervicalis III",
    functions: [
      "Supports the head and allows neck flexion, extension and rotation",
      "Protects the spinal cord and vertebral arteries",
    ],
    facts: [
      { label: "Typical features", value: "transverse foramina, uncinate processes, bifid spinous process, large triangular vertebral foramen" },
      { label: "Level", value: "about the hyoid bone" },
    ],
    connections: [
      { concept: "axis-c2", relation: "articulates-with", note: "facet joints" },
      { concept: "fourth-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-axis", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-third-cervical", relation: "articulates-with" },
      { concept: "levator-scapulae", relation: "attaches-to", note: "origin (transverse process)" },
      { concept: "scalenus-anterior", relation: "attaches-to", note: "origin (anterior tubercle)" },
      { concept: "longus-capitis", relation: "attaches-to", note: "origin (anterior tubercle)" },
      { concept: "semispinalis-cervicis", relation: "attaches-to", note: "insertion (spinous process)" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "transverse foramen" },
      { concept: "spinal-cord", relation: "adjacent-to" },
      { concept: "hyoid-bone", relation: "adjacent-to", note: "same horizontal level" },
    ],
  },

  "fourth-cervical-vertebra": {
    summary:
      "C4 is a typical cervical vertebra. It lies at about the level of the upper border of the thyroid cartilage, where the common carotid artery usually divides.",
    latin: "Vertebra cervicalis IV",
    functions: [
      "Supports the head and allows neck movement",
      "Protects the spinal cord and vertebral arteries",
    ],
    facts: [
      { label: "Typical features", value: "transverse foramina, uncinate processes, bifid spinous process" },
      { label: "Level", value: "about the upper thyroid cartilage and carotid bifurcation (C3–C4)" },
    ],
    connections: [
      { concept: "third-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "fifth-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-third-cervical", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-fourth-cervical", relation: "articulates-with" },
      { concept: "levator-scapulae", relation: "attaches-to", note: "origin (transverse process)" },
      { concept: "scalenus-anterior", relation: "attaches-to", note: "origin (anterior tubercle)" },
      { concept: "scalenus-posterior", relation: "attaches-to", note: "origin (posterior tubercle)" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "transverse foramen" },
      { concept: "spinal-cord", relation: "adjacent-to" },
      { concept: "phrenic-nerve", relation: "adjacent-to", note: "C3–C5 roots form the phrenic nerve" },
      { concept: "common-carotid-artery", relation: "adjacent-to", note: "bifurcates at about this level" },
    ],
    clinical:
      "Spinal cord injury at about C3–C5 or higher can paralyse the diaphragm, because the phrenic nerve arises from C3–C5 (\"C3, 4, 5 keep the diaphragm alive\").",
  },

  "fifth-cervical-vertebra": {
    summary:
      "C5 is a typical cervical vertebra in the most mobile part of the neck. The C5 and C6 nerve roots near this level form the upper trunk of the brachial plexus.",
    latin: "Vertebra cervicalis V",
    functions: [
      "Supports the head and allows neck movement",
      "Protects the spinal cord and vertebral arteries",
    ],
    facts: [
      { label: "Typical features", value: "transverse foramina, uncinate processes, bifid spinous process" },
    ],
    connections: [
      { concept: "fourth-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "sixth-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-fourth-cervical", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-fifth-cervical", relation: "articulates-with" },
      { concept: "scalenus-anterior", relation: "attaches-to", note: "origin (anterior tubercle)" },
      { concept: "scalenus-medius", relation: "attaches-to", note: "origin (posterior tubercle)" },
      { concept: "iliocostalis-cervicis", relation: "attaches-to", note: "insertion (transverse process)" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "transverse foramen" },
      { concept: "spinal-cord", relation: "adjacent-to" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "C5 root contributes to the upper trunk" },
    ],
    clinical:
      "The C5–C6 segment is a common site of neck injury (e.g. diving) and of age-related degeneration (cervical spondylosis).",
  },

  "sixth-cervical-vertebra": {
    summary:
      "C6 is a key landmark vertebra: at its level the larynx becomes the trachea and the pharynx becomes the oesophagus. The prominent anterior tubercle of its transverse process is the carotid tubercle.",
    latin: "Vertebra cervicalis VI",
    functions: [
      "Supports the head and allows neck movement",
      "Protects the spinal cord; the vertebral artery usually enters the transverse foramina here",
    ],
    facts: [
      { label: "Key landmark", value: "carotid (Chassaignac) tubercle on the transverse process" },
      { label: "Level", value: "cricoid cartilage; start of trachea and oesophagus" },
    ],
    connections: [
      { concept: "fifth-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "seventh-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-fifth-cervical", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-sixth-cervical", relation: "articulates-with" },
      { concept: "scalenus-anterior", relation: "attaches-to", note: "origin (anterior tubercle)" },
      { concept: "longus-capitis", relation: "attaches-to", note: "origin (anterior tubercle)" },
      { concept: "scalenus-posterior", relation: "attaches-to", note: "origin (posterior tubercle)" },
      { concept: "common-carotid-artery", relation: "adjacent-to", note: "can be compressed against the carotid tubercle" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "vertebral artery usually enters the C6 foramen" },
      { concept: "cricoid-cartilage", relation: "adjacent-to", note: "same level" },
      { concept: "esophagus", relation: "adjacent-to", note: "begins at this level" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "seventh-cervical-vertebra": {
    summary:
      "C7, the vertebra prominens, has a long, non-bifid spinous process that is easily felt at the base of the neck. It is a transitional vertebra between the cervical and thoracic regions.",
    latin: "Vertebra prominens (C7)",
    functions: [
      "Provides a palpable landmark for counting vertebrae",
      "Anchors the ligamentum nuchae and upper back muscles",
    ],
    facts: [
      { label: "Unique features", value: "long, non-bifid spinous process; small transverse foramina (usually no vertebral artery)" },
      { label: "Variant", value: "may bear a cervical rib" },
    ],
    connections: [
      { concept: "sixth-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "first-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-sixth-cervical", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-seventh-cervical", relation: "articulates-with" },
      { concept: "trapezius", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "rhomboid-minor", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "serratus-posterior-superior", relation: "attaches-to", note: "origin" },
      { concept: "splenius-capitis", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "scalenus-medius", relation: "attaches-to", note: "origin (transverse process)" },
      { concept: "iliocostalis-thoracis", relation: "attaches-to", note: "insertion (transverse process)" },
      { concept: "spinal-cord", relation: "adjacent-to" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "C8 root exits between C7 and T1" },
    ],
    clinical:
      "An extra (cervical) rib arising from C7 occurs in a small percentage of people and can cause thoracic outlet syndrome.",
  },

  // ───────────────────────────── Thoracic vertebrae ─────────────────────────────
  "first-thoracic-vertebra": {
    summary:
      "T1 is a transitional thoracic vertebra. Its body has a complete facet for the head of the first rib and a small inferior demifacet for the second rib, and its long spinous process is almost as prominent as C7's.",
    latin: "Vertebra thoracica I",
    functions: [
      "Anchors the first pair of ribs",
      "Forms the back of the superior thoracic aperture",
    ],
    facts: [
      { label: "Costal facets", value: "full facet for rib 1, inferior demifacet for rib 2, transverse costal facet for rib 1" },
    ],
    connections: [
      { concept: "seventh-cervical-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "second-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-seventh-cervical", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-first-thoracic", relation: "articulates-with" },
      { concept: "first-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "second-rib", relation: "articulates-with", note: "head (inferior demifacet)" },
      { concept: "rhomboid-minor", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "trapezius", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "longus-colli", relation: "attaches-to", note: "vertebral body" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "T1 root joins C8 to form the lower trunk" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "second-thoracic-vertebra": {
    summary:
      "T2 is a typical thoracic vertebra with superior and inferior demifacets for the heads of ribs 2 and 3. The jugular notch of the sternum lies at about the T2–T3 level.",
    latin: "Vertebra thoracica II",
    functions: [
      "Anchors ribs 2 and 3",
      "Supports the upper thoracic spine and protects the spinal cord",
    ],
    facts: [
      { label: "Typical features", value: "heart-shaped body, costal demifacets, transverse costal facets, long downward-sloping spinous process" },
    ],
    connections: [
      { concept: "first-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "third-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-first-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-second-thoracic", relation: "articulates-with" },
      { concept: "second-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "third-rib", relation: "articulates-with", note: "head (inferior demifacet)" },
      { concept: "rhomboid-major", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "serratus-posterior-superior", relation: "attaches-to", note: "origin" },
      { concept: "manubrium-of-sternum", relation: "adjacent-to", note: "jugular notch at about T2–T3 level" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "third-thoracic-vertebra": {
    summary:
      "T3 is a typical thoracic vertebra articulating with ribs 3 and 4. The medial end of the scapular spine lies at about its level.",
    latin: "Vertebra thoracica III",
    functions: [
      "Anchors ribs 3 and 4",
      "Supports the upper thoracic spine and protects the spinal cord",
    ],
    facts: [
      { label: "Surface landmark", value: "root of the scapular spine at about T3" },
    ],
    connections: [
      { concept: "second-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "fourth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-second-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-third-thoracic", relation: "articulates-with" },
      { concept: "third-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "fourth-rib", relation: "articulates-with", note: "head (inferior demifacet)" },
      { concept: "rhomboid-major", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "splenius-cervicis", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "scapula", relation: "adjacent-to", note: "root of the spine at this level" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "fourth-thoracic-vertebra": {
    summary:
      "T4 is a typical thoracic vertebra articulating with ribs 4 and 5. The plane of the sternal angle passes through the T4–T5 disc, marking where the aortic arch begins and ends and the trachea divides.",
    latin: "Vertebra thoracica IV",
    functions: [
      "Anchors ribs 4 and 5",
      "Important level landmark for mediastinal structures",
    ],
    facts: [
      { label: "Level", value: "sternal angle plane (T4–T5): aortic arch, tracheal bifurcation, azygos arch" },
    ],
    connections: [
      { concept: "third-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "fifth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-third-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-fourth-thoracic", relation: "articulates-with" },
      { concept: "fourth-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "fifth-rib", relation: "articulates-with", note: "head (inferior demifacet)" },
      { concept: "rhomboid-major", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "arch-of-aorta", relation: "adjacent-to", note: "begins and ends at the T4–T5 level" },
      { concept: "trachea", relation: "adjacent-to", note: "bifurcates at about T4–T5" },
      { concept: "azygos-system", relation: "adjacent-to", note: "azygos vein arches forward at about T4" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "fifth-thoracic-vertebra": {
    summary:
      "T5 is a typical mid-thoracic vertebra articulating with ribs 5 and 6. The descending thoracic aorta lies against the left side of the mid-thoracic vertebral bodies, with the oesophagus in front.",
    latin: "Vertebra thoracica V",
    functions: [
      "Anchors ribs 5 and 6",
      "Supports the thoracic spine and protects the spinal cord",
    ],
    facts: [
      { label: "Typical features", value: "heart-shaped body, costal demifacets, long spinous process overlapping the vertebra below" },
    ],
    connections: [
      { concept: "fourth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "sixth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-fourth-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-fifth-thoracic", relation: "articulates-with" },
      { concept: "fifth-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "sixth-rib", relation: "articulates-with", note: "head (inferior demifacet)" },
      { concept: "rhomboid-major", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "splenius-cervicis", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left side of the body" },
      { concept: "esophagus", relation: "adjacent-to", note: "anterior" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "sixth-thoracic-vertebra": {
    summary:
      "T6 is a typical thoracic vertebra articulating with ribs 6 and 7. Its long spinous process slopes steeply downward, overlapping the vertebra below like a roof tile.",
    latin: "Vertebra thoracica VI",
    functions: [
      "Anchors ribs 6 and 7",
      "Supports the thoracic spine and protects the spinal cord",
    ],
    facts: [
      { label: "Spinous process", value: "mid-thoracic spines are the longest and most steeply sloped" },
    ],
    connections: [
      { concept: "fifth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "seventh-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-fifth-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-sixth-thoracic", relation: "articulates-with" },
      { concept: "sixth-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "seventh-rib", relation: "articulates-with", note: "head (inferior demifacet)" },
      { concept: "trapezius", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "semispinalis-thoracis", relation: "attaches-to", note: "origin (transverse process)" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left side of the body" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "seventh-thoracic-vertebra": {
    summary:
      "T7 is a typical thoracic vertebra articulating with ribs 7 and 8. The inferior angle of the scapula lies at about its level when the arms hang by the side.",
    latin: "Vertebra thoracica VII",
    functions: [
      "Anchors ribs 7 and 8",
      "Supports the thoracic spine and protects the spinal cord",
    ],
    facts: [
      { label: "Surface landmark", value: "inferior angle of the scapula at about T7" },
    ],
    connections: [
      { concept: "sixth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "eighth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-sixth-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-seventh-thoracic", relation: "articulates-with" },
      { concept: "seventh-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "eighth-rib", relation: "articulates-with", note: "head (inferior demifacet)" },
      { concept: "trapezius", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin (spinous process; T7–T12)" },
      { concept: "scapula", relation: "adjacent-to", note: "inferior angle at this level" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left side of the body" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
    clinical: "Osteoporotic wedge compression fractures commonly affect the mid-thoracic vertebrae and the thoracolumbar junction, increasing kyphosis.",
  },

  "eighth-thoracic-vertebra": {
    summary:
      "T8 is a typical thoracic vertebra articulating with ribs 8 and 9. The inferior vena cava passes through the diaphragm at about the T8 level.",
    latin: "Vertebra thoracica VIII",
    functions: [
      "Anchors ribs 8 and 9",
      "Supports the lower thoracic spine and protects the spinal cord",
    ],
    facts: [
      { label: "Level", value: "caval opening of the diaphragm (IVC) at about T8" },
    ],
    connections: [
      { concept: "seventh-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "ninth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-seventh-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-eighth-thoracic", relation: "articulates-with" },
      { concept: "eighth-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "ninth-rib", relation: "articulates-with", note: "head (inferior demifacet)" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "spinalis-thoracis", relation: "attaches-to", note: "insertion (spinous process)" },
      { concept: "inferior-vena-cava", relation: "adjacent-to", note: "caval opening at about T8" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left side of the body" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "ninth-thoracic-vertebra": {
    summary:
      "T9 is a thoracic vertebra articulating with ribs 9 and (variably) 10. The xiphisternal joint lies at about its level.",
    latin: "Vertebra thoracica IX",
    functions: [
      "Anchors rib 9 and sometimes rib 10",
      "Supports the lower thoracic spine and protects the spinal cord",
    ],
    facts: [
      { label: "Costal facets", value: "the inferior demifacet is often absent because rib 10 usually articulates only with T10" },
      { label: "Level", value: "xiphisternal joint at about T9" },
    ],
    connections: [
      { concept: "eighth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "tenth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-eighth-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-ninth-thoracic", relation: "articulates-with" },
      { concept: "ninth-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "trapezius", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "xiphoid-process", relation: "adjacent-to", note: "xiphisternal joint at this level" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left side of the body" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "tenth-thoracic-vertebra": {
    summary:
      "T10 usually has a single complete costal facet on its body for the tenth rib. The oesophagus and vagal trunks pass through the diaphragm at about this level.",
    latin: "Vertebra thoracica X",
    functions: [
      "Anchors the tenth ribs",
      "Supports the lower thoracic spine and protects the spinal cord",
    ],
    facts: [
      { label: "Costal facets", value: "usually one full facet on the body plus a transverse costal facet" },
      { label: "Level", value: "oesophageal hiatus of the diaphragm at about T10" },
    ],
    connections: [
      { concept: "ninth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "eleventh-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-ninth-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-tenth-thoracic", relation: "articulates-with" },
      { concept: "tenth-rib", relation: "articulates-with", note: "head and tubercle" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "trapezius", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "esophagus", relation: "adjacent-to", note: "passes through the diaphragm at about T10" },
      { concept: "vagus-nerve-cn-x", relation: "adjacent-to", note: "vagal trunks accompany the oesophagus" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "eleventh-thoracic-vertebra": {
    summary:
      "T11 has a single full costal facet on its body for the eleventh rib and no facets on its transverse processes, because the floating ribs lack tubercles.",
    latin: "Vertebra thoracica XI",
    functions: [
      "Anchors the eleventh (floating) ribs",
      "Begins the transition to the lumbar spine",
    ],
    facts: [
      { label: "Costal facets", value: "one full facet on the body; no transverse costal facets" },
    ],
    connections: [
      { concept: "tenth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "twelfth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-tenth-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-eleventh-thoracic", relation: "articulates-with" },
      { concept: "eleventh-rib", relation: "articulates-with", note: "head only" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "serratus-posterior-inferior", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "spinalis-thoracis", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
  },

  "twelfth-thoracic-vertebra": {
    summary:
      "T12 is the transitional vertebra between the thoracic and lumbar spine: its upper articular processes are thoracic in type and its lower ones lumbar. The aorta passes behind the diaphragm into the abdomen at this level.",
    latin: "Vertebra thoracica XII",
    functions: [
      "Anchors the twelfth ribs",
      "Transfers load from the rigid thoracic spine to the mobile lumbar spine",
    ],
    facts: [
      { label: "Costal facets", value: "one full facet on the body; no transverse costal facets" },
      { label: "Level", value: "aortic hiatus of the diaphragm and origin of the coeliac trunk at about T12" },
    ],
    connections: [
      { concept: "eleventh-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "first-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-eleventh-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-twelfth-thoracic", relation: "articulates-with", note: "T12–L1 disc" },
      { concept: "twelfth-rib", relation: "articulates-with", note: "head only" },
      { concept: "latissimus-dorsi", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "serratus-posterior-inferior", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin (side of body)" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "aorta enters the abdomen at about T12" },
      { concept: "celiac-trunk-branches", relation: "adjacent-to", note: "coeliac trunk arises at about T12" },
      { concept: "spinal-cord", relation: "adjacent-to" },
    ],
    clinical:
      "The thoracolumbar junction (T11–L2) is a common site of traumatic and osteoporotic fractures because it lies where the stiff thoracic spine meets the mobile lumbar spine.",
  },

  // ───────────────────────────── Lumbar vertebrae, sacrum & coccyx ─────────────────────────────
  "first-lumbar-vertebra": {
    summary:
      "L1 is the first lumbar vertebra, with a large kidney-shaped body and no rib facets. In most adults the spinal cord ends (as the conus medullaris) at about the L1–L2 level, with the cauda equina continuing below.",
    latin: "Vertebra lumbalis I",
    functions: [
      "Bears the weight of the upper body",
      "Allows flexion and extension of the lower back",
      "Anchors the diaphragm crura and psoas major",
    ],
    facts: [
      { label: "Typical lumbar features", value: "large body, no transverse foramina or costal facets, short thick spinous process, sagittally oriented facet joints" },
      { label: "Level", value: "transpyloric plane; origin of the superior mesenteric artery" },
    ],
    connections: [
      { concept: "twelfth-thoracic-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "second-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-twelfth-thoracic", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-first-lumbar", relation: "articulates-with" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin (body and transverse process)" },
      { concept: "diaphragm", relation: "attaches-to", note: "crura arise from the body" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "conus medullaris ends at about L1–L2" },
      { concept: "cauda-equina", relation: "adjacent-to" },
      { concept: "superior-mesenteric-artery", relation: "adjacent-to", note: "arises from the aorta at about L1" },
      { concept: "renal-artery", relation: "adjacent-to", note: "arise at about L1–L2" },
    ],
  },

  "second-lumbar-vertebra": {
    summary:
      "L2 is a typical lumbar vertebra. Below it the vertebral canal contains only the cauda equina (nerve roots), not the spinal cord itself.",
    latin: "Vertebra lumbalis II",
    functions: [
      "Bears upper-body weight",
      "Allows flexion, extension and side-bending of the lower back",
    ],
    facts: [
      { label: "Spinal cord", value: "usually ends above the L2–L3 level in adults" },
    ],
    connections: [
      { concept: "first-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "third-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-first-lumbar", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-second-lumbar", relation: "articulates-with" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin" },
      { concept: "diaphragm", relation: "attaches-to", note: "crura" },
      { concept: "serratus-posterior-inferior", relation: "attaches-to", note: "origin (spinous process)" },
      { concept: "cauda-equina", relation: "adjacent-to" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "anterior, slightly left" },
    ],
  },

  "third-lumbar-vertebra": {
    summary:
      "L3 is a typical lumbar vertebra lying near the middle of the lumbar curve (lordosis). Its transverse processes are often the longest of the lumbar series.",
    latin: "Vertebra lumbalis III",
    functions: [
      "Bears upper-body weight",
      "Forms the apex region of the lumbar lordosis",
    ],
    facts: [
      { label: "Level", value: "subcostal plane; origin of the inferior mesenteric artery" },
    ],
    connections: [
      { concept: "second-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "fourth-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-second-lumbar", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-third-lumbar", relation: "articulates-with" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin" },
      { concept: "diaphragm", relation: "attaches-to", note: "right crus" },
      { concept: "cauda-equina", relation: "adjacent-to" },
      { concept: "inferior-mesenteric-artery", relation: "adjacent-to", note: "arises at about L3" },
    ],
  },

  "fourth-lumbar-vertebra": {
    summary:
      "L4 is a large lumbar vertebra at about the level of the highest points of the iliac crests. The abdominal aorta divides into the common iliac arteries in front of it.",
    latin: "Vertebra lumbalis IV",
    functions: [
      "Bears upper-body weight",
      "Important landmark for lumbar puncture and epidural anaesthesia",
    ],
    facts: [
      { label: "Level", value: "supracristal plane (tops of the iliac crests); aortic bifurcation" },
    ],
    connections: [
      { concept: "third-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "fifth-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "intervertebral-disc-below-third-lumbar", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-fourth-lumbar", relation: "articulates-with" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "bifurcates at about L4" },
      { concept: "common-iliac-artery", relation: "adjacent-to" },
      { concept: "hip-bone", relation: "adjacent-to", note: "iliac crests at the same level" },
      { concept: "cauda-equina", relation: "adjacent-to" },
    ],
    clinical:
      "Lumbar puncture is performed at the L3–L4 or L4–L5 interspace, located using the line joining the iliac crests; at this level the needle passes among the cauda equina roots, below the end of the spinal cord.",
  },

  "fifth-lumbar-vertebra": {
    summary:
      "L5 is the lowest and largest lumbar vertebra. Its wedge-shaped body (taller in front) sits on the sacrum at the lumbosacral angle, and its thick transverse processes are tied to the pelvis by the iliolumbar ligaments.",
    latin: "Vertebra lumbalis V",
    functions: [
      "Transfers the weight of the upper body to the sacrum",
      "Forms the lumbosacral joint",
    ],
    facts: [
      { label: "Size", value: "largest vertebral body of the movable spine" },
      { label: "Level", value: "the common iliac veins unite to form the IVC at about L5" },
    ],
    connections: [
      { concept: "fourth-lumbar-vertebra", relation: "articulates-with", note: "facet joints" },
      { concept: "sacrum", relation: "articulates-with", note: "lumbosacral joint" },
      { concept: "intervertebral-disc-below-fourth-lumbar", relation: "articulates-with" },
      { concept: "intervertebral-disc-below-fifth-lumbar", relation: "articulates-with", note: "L5–S1 disc" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin" },
      { concept: "hip-bone", relation: "attaches-to", note: "iliolumbar ligament to the iliac crest" },
      { concept: "inferior-vena-cava", relation: "adjacent-to", note: "formed at about L5" },
      { concept: "common-iliac-vein", relation: "adjacent-to" },
      { concept: "cauda-equina", relation: "adjacent-to" },
    ],
    clinical:
      "A defect in the pars interarticularis (spondylolysis) is most common at L5 and can allow L5 to slip forward on the sacrum (spondylolisthesis). L5 may also be partly fused to the sacrum (sacralisation).",
  },

  "sacrum": {
    summary:
      "The sacrum is a large triangular bone formed by fusion of five sacral vertebrae. Wedged between the two hip bones, it transmits the weight of the body to the pelvis and forms the back wall of the pelvic cavity.",
    latin: "Os sacrum",
    functions: [
      "Transmits body weight to the hip bones via the sacroiliac joints",
      "Forms the posterior wall of the pelvis",
      "Protects the sacral nerve roots in the sacral canal",
      "Anchors gluteal, pelvic and back muscles",
    ],
    facts: [
      { label: "Composition", value: "5 fused vertebrae (S1–S5), fusing through adolescence into early adulthood" },
      { label: "Key landmarks", value: "sacral promontory, alae, 4 pairs of sacral foramina, auricular surfaces, sacral hiatus" },
      { label: "Dural sac", value: "ends at about S2" },
    ],
    connections: [
      { concept: "fifth-lumbar-vertebra", relation: "articulates-with", note: "lumbosacral joint" },
      { concept: "intervertebral-disc-below-fifth-lumbar", relation: "articulates-with", note: "L5–S1 disc" },
      { concept: "hip-bone", relation: "articulates-with", note: "sacroiliac joints" },
      { concept: "coccyx", relation: "articulates-with", note: "sacrococcygeal joint" },
      { concept: "gluteus-maximus", relation: "attaches-to", note: "origin (dorsal surface)" },
      { concept: "piriformis", relation: "attaches-to", note: "origin (anterior surface)" },
      { concept: "coccygeus", relation: "attaches-to", note: "insertion (lateral lower margin)" },
      { concept: "deep-back-muscles-transversospinales", relation: "attaches-to", note: "multifidus origin" },
      { concept: "sacral-plexus", relation: "adjacent-to", note: "formed on the anterior surface over piriformis" },
      { concept: "cauda-equina", relation: "adjacent-to", note: "sacral canal" },
      { concept: "rectum", relation: "adjacent-to", note: "follows the sacral curve" },
      { concept: "internal-iliac-artery", relation: "supplied-by", note: "lateral sacral branches" },
    ],
    clinical:
      "Anaesthetic injected through the sacral hiatus gives a caudal epidural block. The sacral promontory is an obstetric landmark for measuring the pelvic inlet.",
    sexDifferences:
      "The female sacrum is typically shorter, wider and less curved, with a less prominent promontory, widening the pelvic inlet and outlet; in males it is usually longer, narrower and more curved.",
  },

  "coccyx": {
    summary:
      "The coccyx (tailbone) is a small triangular bone made of usually four (three to five) fused rudimentary vertebrae at the bottom of the vertebral column. It is a remnant of the embryonic tail.",
    latin: "Os coccygis",
    functions: [
      "Anchors pelvic floor muscles, gluteus maximus and the anococcygeal body",
      "Shares weight-bearing when sitting and leaning back",
    ],
    facts: [
      { label: "Composition", value: "usually 4 fused coccygeal vertebrae (range 3–5)" },
    ],
    connections: [
      { concept: "sacrum", relation: "articulates-with", note: "sacrococcygeal joint" },
      { concept: "gluteus-maximus", relation: "attaches-to", note: "partial origin" },
      { concept: "coccygeus", relation: "attaches-to", note: "insertion" },
      { concept: "levator-ani", relation: "attaches-to", note: "via the anococcygeal body" },
      { concept: "external-anal-sphincter", relation: "attaches-to", note: "via the anococcygeal body" },
    ],
    clinical:
      "A fall onto the buttocks or a difficult childbirth can bruise, fracture or dislocate the coccyx, causing persistent pain on sitting (coccydynia).",
  },

  // ───────────────────────────── Intervertebral discs: cervical ─────────────────────────────
  "intervertebral-disc-below-axis": {
    summary:
      "The C2–C3 disc is the first intervertebral disc of the spine; there are no discs between the skull and atlas or between the atlas and axis. Like all discs it has a gel-like nucleus pulposus inside a tough ring of fibrocartilage, the annulus fibrosus.",
    latin: "Discus intervertebralis C2–C3",
    functions: [
      "Absorbs shock and spreads load between C2 and C3",
      "Allows small movements between the vertebrae",
    ],
    facts: [
      { label: "Structure", value: "nucleus pulposus (notochord-derived gel) surrounded by the annulus fibrosus" },
      { label: "Nerve root at risk", value: "C3 (herniation here is uncommon)" },
    ],
    connections: [
      { concept: "axis-c2", relation: "articulates-with", note: "upper surface" },
      { concept: "third-cervical-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "C3 nerve exits at this level" },
      { concept: "longus-colli", relation: "adjacent-to", note: "lies on the front of the column" },
    ],
  },

  "intervertebral-disc-below-third-cervical": {
    summary:
      "The C3–C4 disc joins the bodies of C3 and C4. In the neck the discs are thicker in front than behind, helping to create the cervical lordosis.",
    latin: "Discus intervertebralis C3–C4",
    functions: [
      "Absorbs shock and allows neck movement between C3 and C4",
    ],
    facts: [
      { label: "Nerve root at risk", value: "C4" },
    ],
    connections: [
      { concept: "third-cervical-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "fourth-cervical-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "C4 nerve exits at this level" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "vertebral arteries lie just lateral" },
    ],
  },

  "intervertebral-disc-below-fourth-cervical": {
    summary:
      "The C4–C5 disc joins C4 and C5. A posterolateral herniation here typically irritates the C5 nerve root.",
    latin: "Discus intervertebralis C4–C5",
    functions: [
      "Absorbs shock and allows neck movement between C4 and C5",
    ],
    facts: [
      { label: "Nerve root at risk", value: "C5 — shoulder pain, deltoid weakness" },
    ],
    connections: [
      { concept: "fourth-cervical-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "fifth-cervical-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "C5 nerve exits at this level" },
    ],
  },

  "intervertebral-disc-below-fifth-cervical": {
    summary:
      "The C5–C6 disc joins C5 and C6 at one of the most mobile segments of the neck. It is one of the two most common sites of cervical disc herniation and degeneration.",
    latin: "Discus intervertebralis C5–C6",
    functions: [
      "Absorbs shock and allows neck movement between C5 and C6",
    ],
    facts: [
      { label: "Nerve root at risk", value: "C6 — weak biceps/brachioradialis reflex, numb thumb and lateral forearm" },
    ],
    connections: [
      { concept: "fifth-cervical-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "sixth-cervical-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "C6 nerve exits at this level" },
    ],
    clinical: "C5–C6 and C6–C7 account for most cervical disc herniations.",
  },

  "intervertebral-disc-below-sixth-cervical": {
    summary:
      "The C6–C7 disc joins C6 and C7. It is the most common site of cervical disc herniation, which usually compresses the C7 nerve root.",
    latin: "Discus intervertebralis C6–C7",
    functions: [
      "Absorbs shock and allows neck movement between C6 and C7",
    ],
    facts: [
      { label: "Nerve root at risk", value: "C7 — weak triceps and triceps reflex, numb middle finger" },
    ],
    connections: [
      { concept: "sixth-cervical-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "seventh-cervical-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "C7 nerve exits at this level" },
      { concept: "esophagus", relation: "adjacent-to", note: "anterior (retracted in anterior cervical surgery)" },
    ],
  },

  "intervertebral-disc-below-seventh-cervical": {
    summary:
      "The C7–T1 disc lies at the cervicothoracic junction, where the mobile neck meets the rigid thorax. Herniation here affects the C8 nerve root, which exits between C7 and T1.",
    latin: "Discus intervertebralis C7–T1",
    functions: [
      "Absorbs shock at the cervicothoracic junction",
    ],
    facts: [
      { label: "Nerve root at risk", value: "C8 — weak hand grip and intrinsic muscles, numb little finger" },
    ],
    connections: [
      { concept: "seventh-cervical-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "first-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "C8 nerve exits at this level" },
    ],
  },

  // ───────────────────────────── Intervertebral discs: thoracic ─────────────────────────────
  "intervertebral-disc-below-first-thoracic": {
    summary:
      "The T1–T2 disc joins T1 and T2. The head of the second rib is tied to it by an intra-articular ligament. Thoracic discs are thin, and the rib cage limits movement here.",
    latin: "Discus intervertebralis T1–T2",
    functions: [
      "Cushions T1 against T2",
      "Anchors the head of the second rib",
    ],
    facts: [
      { label: "Thickness", value: "upper thoracic discs are the thinnest in the column" },
    ],
    connections: [
      { concept: "first-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "second-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "second-rib", relation: "attaches-to", note: "intra-articular ligament of the rib head" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "T1 nerve exits at this level" },
    ],
  },

  "intervertebral-disc-below-second-thoracic": {
    summary:
      "The T2–T3 disc joins T2 and T3 and receives the intra-articular ligament of the head of the third rib.",
    latin: "Discus intervertebralis T2–T3",
    functions: [
      "Cushions T2 against T3",
      "Anchors the head of the third rib",
    ],
    facts: [
      { label: "Herniation", value: "thoracic disc herniations are rare because the rib cage stabilises this region" },
    ],
    connections: [
      { concept: "second-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "third-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "third-rib", relation: "attaches-to", note: "intra-articular ligament of the rib head" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "T2 nerve exits at this level" },
    ],
  },

  "intervertebral-disc-below-third-thoracic": {
    summary:
      "The T3–T4 disc joins T3 and T4 and receives the intra-articular ligament of the head of the fourth rib.",
    latin: "Discus intervertebralis T3–T4",
    functions: [
      "Cushions T3 against T4",
      "Anchors the head of the fourth rib",
    ],
    facts: [
      { label: "Nerve", value: "T3 spinal nerve exits below T3" },
    ],
    connections: [
      { concept: "third-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "fourth-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "fourth-rib", relation: "attaches-to", note: "intra-articular ligament of the rib head" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "sympathetic-trunk", relation: "adjacent-to", note: "runs over the rib heads beside the discs" },
    ],
  },

  "intervertebral-disc-below-fourth-thoracic": {
    summary:
      "The T4–T5 disc lies in the transverse plane of the sternal angle, a key landmark: the aortic arch begins and ends and the trachea divides at about this level. The head of the fifth rib is tied to it.",
    latin: "Discus intervertebralis T4–T5",
    functions: [
      "Cushions T4 against T5",
      "Anchors the head of the fifth rib",
    ],
    facts: [
      { label: "Level", value: "sternal angle plane (angle of Louis)" },
    ],
    connections: [
      { concept: "fourth-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "fifth-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "fifth-rib", relation: "attaches-to", note: "intra-articular ligament of the rib head" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "arch-of-aorta", relation: "adjacent-to", note: "same horizontal plane" },
      { concept: "trachea", relation: "adjacent-to", note: "bifurcates at about this level" },
    ],
  },

  "intervertebral-disc-below-fifth-thoracic": {
    summary:
      "The T5–T6 disc joins T5 and T6 and receives the head of the sixth rib. The descending thoracic aorta lies to its left and the oesophagus in front.",
    latin: "Discus intervertebralis T5–T6",
    functions: [
      "Cushions T5 against T6",
      "Anchors the head of the sixth rib",
    ],
    facts: [
      { label: "Nerve", value: "T5 spinal nerve exits at this level" },
    ],
    connections: [
      { concept: "fifth-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "sixth-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "sixth-rib", relation: "attaches-to", note: "intra-articular ligament of the rib head" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left anterolateral" },
    ],
  },

  "intervertebral-disc-below-sixth-thoracic": {
    summary:
      "The T6–T7 disc joins T6 and T7 and receives the head of the seventh rib. It lies in the mid-thoracic region, where the column curves backward (kyphosis).",
    latin: "Discus intervertebralis T6–T7",
    functions: [
      "Cushions T6 against T7",
      "Anchors the head of the seventh rib",
    ],
    facts: [
      { label: "Curvature", value: "the thoracic kyphosis comes mainly from the vertebral bodies being taller behind; the cervical and lumbar curves come mainly from wedge-shaped discs" },
    ],
    connections: [
      { concept: "sixth-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "seventh-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "seventh-rib", relation: "attaches-to", note: "intra-articular ligament of the rib head" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "azygos-system", relation: "adjacent-to", note: "azygos vein ascends to the right" },
    ],
  },

  "intervertebral-disc-below-seventh-thoracic": {
    summary:
      "The T7–T8 disc joins T7 and T8 and receives the head of the eighth rib. The descending thoracic aorta and oesophagus lie in front of this part of the column.",
    latin: "Discus intervertebralis T7–T8",
    functions: [
      "Cushions T7 against T8",
      "Anchors the head of the eighth rib",
    ],
    facts: [
      { label: "Nerve", value: "T7 spinal nerve exits at this level" },
    ],
    connections: [
      { concept: "seventh-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "eighth-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "eighth-rib", relation: "attaches-to", note: "intra-articular ligament of the rib head" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left anterolateral" },
    ],
  },

  "intervertebral-disc-below-eighth-thoracic": {
    summary:
      "The T8–T9 disc joins T8 and T9 and receives the head of the ninth rib, the last rib whose head normally spans two vertebrae.",
    latin: "Discus intervertebralis T8–T9",
    functions: [
      "Cushions T8 against T9",
      "Anchors the head of the ninth rib",
    ],
    facts: [
      { label: "Nerve", value: "T8 spinal nerve exits at this level" },
    ],
    connections: [
      { concept: "eighth-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "ninth-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "ninth-rib", relation: "attaches-to", note: "intra-articular ligament of the rib head" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "azygos-system", relation: "adjacent-to", note: "azygos vein to the right" },
    ],
  },

  "intervertebral-disc-below-ninth-thoracic": {
    summary:
      "The T9–T10 disc joins T9 and T10. Because the tenth rib usually articulates with T10 alone, this disc typically has no rib-head attachment.",
    latin: "Discus intervertebralis T9–T10",
    functions: [
      "Cushions T9 against T10",
    ],
    facts: [
      { label: "Nerve", value: "T9 spinal nerve exits at this level" },
    ],
    connections: [
      { concept: "ninth-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "tenth-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to", note: "left anterolateral" },
    ],
  },

  "intervertebral-disc-below-tenth-thoracic": {
    summary:
      "The T10–T11 disc joins T10 and T11 in the lower thoracic spine, where the rib cage gives less support and mobility begins to increase.",
    latin: "Discus intervertebralis T10–T11",
    functions: [
      "Cushions T10 against T11",
    ],
    facts: [
      { label: "Nerve", value: "T10 spinal nerve (supplying the umbilical dermatome) exits at this level" },
    ],
    connections: [
      { concept: "tenth-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "eleventh-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "T10 nerve" },
    ],
  },

  "intervertebral-disc-below-eleventh-thoracic": {
    summary:
      "The T11–T12 disc joins T11 and T12 at the start of the thoracolumbar junction. Lower thoracic discs are more prone to degeneration than those higher in the thorax.",
    latin: "Discus intervertebralis T11–T12",
    functions: [
      "Cushions T11 against T12",
    ],
    facts: [
      { label: "Herniation", value: "most thoracic disc herniations occur below T8, especially T11–T12" },
    ],
    connections: [
      { concept: "eleventh-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "twelfth-thoracic-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "posterior" },
      { concept: "sympathetic-trunk", relation: "adjacent-to" },
    ],
  },

  "intervertebral-disc-below-twelfth-thoracic": {
    summary:
      "The T12–L1 disc lies at the thoracolumbar junction, where the stiff thoracic spine meets the mobile lumbar spine. The lower end of the spinal cord (conus medullaris) lies close behind it.",
    latin: "Discus intervertebralis T12–L1",
    functions: [
      "Cushions T12 against L1 at a high-stress transition zone",
    ],
    facts: [
      { label: "Clinical level", value: "thoracolumbar junction — a common site of spinal injury" },
    ],
    connections: [
      { concept: "twelfth-thoracic-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "first-lumbar-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "psoas-major", relation: "attaches-to", note: "highest origin (side of disc)" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "conus medullaris nearby" },
      { concept: "cauda-equina", relation: "adjacent-to" },
    ],
  },

  // ───────────────────────────── Intervertebral discs: lumbar ─────────────────────────────
  "intervertebral-disc-below-first-lumbar": {
    summary:
      "The L1–L2 disc joins L1 and L2. In most adults the spinal cord ends at about this level, so the canal below it contains the cauda equina.",
    latin: "Discus intervertebralis L1–L2",
    functions: [
      "Bears upper-body load and allows lumbar flexion and extension",
    ],
    facts: [
      { label: "Nerve root at risk", value: "L2 (herniation here is uncommon)" },
      { label: "Spinal cord", value: "conus medullaris usually ends at about L1–L2" },
    ],
    connections: [
      { concept: "first-lumbar-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "second-lumbar-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin (side of disc)" },
      { concept: "diaphragm", relation: "attaches-to", note: "crura" },
      { concept: "spinal-cord", relation: "adjacent-to", note: "conus medullaris" },
      { concept: "cauda-equina", relation: "adjacent-to" },
    ],
  },

  "intervertebral-disc-below-second-lumbar": {
    summary:
      "The L2–L3 disc joins L2 and L3. Lumbar discs are the thickest in the spine and, like cervical discs, are thicker in front, producing the lumbar lordosis.",
    latin: "Discus intervertebralis L2–L3",
    functions: [
      "Bears upper-body load and allows lumbar movement",
    ],
    facts: [
      { label: "Nerve root at risk", value: "L3 — anterior thigh pain, weak hip flexion/knee extension" },
    ],
    connections: [
      { concept: "second-lumbar-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "third-lumbar-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin (side of disc)" },
      { concept: "diaphragm", relation: "attaches-to", note: "right crus" },
      { concept: "cauda-equina", relation: "adjacent-to" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "anterior" },
    ],
  },

  "intervertebral-disc-below-third-lumbar": {
    summary:
      "The L3–L4 disc joins L3 and L4. The L3–L4 interspace is a common site for lumbar puncture, safely below the end of the spinal cord.",
    latin: "Discus intervertebralis L3–L4",
    functions: [
      "Bears upper-body load and allows lumbar movement",
    ],
    facts: [
      { label: "Nerve root at risk", value: "L4 — reduced knee-jerk reflex, weak quadriceps, numb medial leg" },
    ],
    connections: [
      { concept: "third-lumbar-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "fourth-lumbar-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "psoas-major", relation: "attaches-to", note: "origin (side of disc)" },
      { concept: "cauda-equina", relation: "adjacent-to" },
      { concept: "lumbar-plexus", relation: "adjacent-to", note: "forms within psoas beside the lumbar column" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "anterior, just above its bifurcation" },
    ],
  },

  "intervertebral-disc-below-fourth-lumbar": {
    summary:
      "The L4–L5 disc joins L4 and L5 and bears some of the highest loads in the spine. It is one of the two most common sites of disc herniation, which usually compresses the L5 nerve root.",
    latin: "Discus intervertebralis L4–L5",
    functions: [
      "Bears heavy upper-body load",
      "Allows flexion and extension of the lower back",
    ],
    facts: [
      { label: "Nerve root at risk", value: "L5 — weak big-toe extension and ankle dorsiflexion, numb dorsum of foot" },
    ],
    connections: [
      { concept: "fourth-lumbar-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "fifth-lumbar-vertebra", relation: "articulates-with", note: "lower surface" },
      { concept: "psoas-major", relation: "attaches-to", note: "lowest origin (side of disc)" },
      { concept: "cauda-equina", relation: "adjacent-to" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "L5 root" },
      { concept: "common-iliac-artery", relation: "adjacent-to", note: "anterior; at risk in disc surgery" },
    ],
    clinical:
      "L4–L5 and L5–S1 account for the great majority of lumbar disc herniations, usually posterolateral, where the posterior longitudinal ligament is weakest.",
  },

  "intervertebral-disc-below-fifth-lumbar": {
    summary:
      "The L5–S1 (lumbosacral) disc joins L5 to the sacrum. It is strongly wedge-shaped, creating the lumbosacral angle, and is one of the two most common sites of disc herniation.",
    latin: "Discus intervertebralis L5–S1",
    functions: [
      "Transfers the load of the upper body to the sacrum",
      "Forms the lumbosacral angle",
    ],
    facts: [
      { label: "Nerve root at risk", value: "S1 — reduced ankle-jerk reflex, weak plantarflexion, numb lateral foot" },
      { label: "Shape", value: "markedly thicker in front than behind" },
    ],
    connections: [
      { concept: "fifth-lumbar-vertebra", relation: "articulates-with", note: "upper surface" },
      { concept: "sacrum", relation: "articulates-with", note: "lower surface (S1)" },
      { concept: "cauda-equina", relation: "adjacent-to" },
      { concept: "spinal-nerves", relation: "adjacent-to", note: "S1 root" },
      { concept: "sacral-plexus", relation: "adjacent-to", note: "S1 contributes to the sciatic nerve" },
      { concept: "common-iliac-vein", relation: "adjacent-to", note: "anterior" },
    ],
    clinical:
      "Herniation at L5–S1 is a classic cause of sciatica. A large central herniation at any lumbar level can compress the cauda equina (cauda equina syndrome), a surgical emergency.",
  },
};
