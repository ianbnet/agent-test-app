import type { ConceptInfo } from "./types";

/**
 * Knowledge base: cardiovascular system (heart, great vessels, arteries and veins) plus the
 * lymphatic organs spleen and thymus. Typical adult values; ranges are hedged where they vary.
 *
 * App colour convention: pulmonary arteries are drawn blue (they carry deoxygenated blood) and
 * pulmonary veins red (they carry oxygenated blood).
 */
export const cardiovascular: Record<string, ConceptInfo> = {
  // ─────────────────────────────── Heart ───────────────────────────────
  "atrium": {
    summary:
      "The atria are the two thin-walled upper chambers of the heart. The right atrium receives deoxygenated blood from the body and the heart wall, and the left atrium receives oxygenated blood from the lungs; each passes its blood through an atrioventricular valve into the ventricle below.",
    latin: "Atrium dextrum et atrium sinistrum",
    functions: [
      "Act as low-pressure reservoirs that collect venous return while the ventricles are contracting",
      "Contract at the end of ventricular filling (the 'atrial kick') to top up ventricular volume",
      "The right atrial wall contains the sinoatrial (SA) node, the heart's pacemaker; the atrioventricular (AV) node lies in the interatrial septum",
      "Release atrial natriuretic peptide (ANP) when stretched, promoting sodium and water excretion by the kidneys",
    ],
    facts: [
      { label: "Wall thickness", value: "Thin, only about 2–3 mm" },
      { label: "Atrial share of ventricular filling", value: "Roughly 20% at rest; most filling is passive" },
      { label: "Interatrial septum", value: "The fossa ovalis marks the closed fetal foramen ovale, which stays probe-patent in about 25% of adults" },
      { label: "Auricles", value: "Ear-like pouches of each atrium; pectinate muscles line the right atrium's anterior wall and both auricles" },
    ],
    connections: [
      { concept: "atrium-blood-pool", relation: "contains", note: "the atrial cavities" },
      { concept: "superior-vena-cava", relation: "receives-from", note: "opens into the right atrium" },
      { concept: "inferior-vena-cava", relation: "receives-from", note: "opens into the right atrium" },
      { concept: "pulmonary-veins", relation: "receives-from", note: "four veins open into the left atrium" },
      { concept: "tricuspid-valve", relation: "adjacent-to", note: "right atrioventricular orifice" },
      { concept: "mitral-valve", relation: "adjacent-to", note: "left atrioventricular orifice" },
      { concept: "ventricular-myocardium", relation: "adjacent-to", note: "separated by the atrioventricular groove and fibrous skeleton" },
      { concept: "coronary-artery-trunks", relation: "supplied-by", note: "right coronary artery; gives the SA nodal artery in about 60% of people" },
      { concept: "circumflex-artery", relation: "supplied-by", note: "left atrium; gives the SA nodal artery in about 40%" },
      { concept: "cardiac-veins", relation: "drained-by" },
      { concept: "esophagus", relation: "adjacent-to", note: "the left atrium lies directly in front of the esophagus" },
    ],
    clinical:
      "Atrial fibrillation, the commonest sustained arrhythmia, abolishes the atrial kick and lets clots form in the left atrial appendage, a major source of embolic stroke. An atrial septal defect or patent foramen ovale allows blood (or emboli) to cross between the atria.",
  },

  "atrium-blood-pool": {
    summary:
      "The blood-filled cavities of the right and left atria. The right atrium holds deoxygenated blood returning from the body, while the left atrium holds oxygenated blood returning from the lungs; both empty into the ventricles during diastole.",
    functions: [
      "Right atrium: collects deoxygenated systemic venous blood from the superior and inferior venae cavae and the coronary sinus",
      "Left atrium: collects oxygenated blood from the four pulmonary veins",
      "Deliver blood through the tricuspid (right) and mitral (left) valves into the ventricles",
      "Before birth, the foramen ovale lets most oxygen-rich placental blood pass from the right to the left atrium, bypassing the lungs",
    ],
    facts: [
      { label: "Oxygen saturation", value: "Right atrium about 70–75% (deoxygenated, mixed venous); left atrium about 97–98% (oxygenated)" },
      { label: "Right atrial (central venous) pressure", value: "Low, mean about 0–5 mmHg" },
      { label: "Left atrial pressure", value: "A few mmHg higher than the right; mean normally below about 12 mmHg" },
    ],
    connections: [
      { concept: "atrium", relation: "part-of", note: "cavities enclosed by the atrial walls" },
      { concept: "superior-vena-cava", relation: "receives-from", note: "into the right atrium" },
      { concept: "inferior-vena-cava", relation: "receives-from", note: "into the right atrium" },
      { concept: "cardiac-veins", relation: "receives-from", note: "coronary sinus, into the right atrium" },
      { concept: "pulmonary-veins", relation: "receives-from", note: "oxygenated blood into the left atrium" },
      { concept: "tricuspid-valve", relation: "flows-to", note: "right atrium to right ventricle" },
      { concept: "mitral-valve", relation: "flows-to", note: "left atrium to left ventricle" },
      { concept: "ventricle-blood-pool", relation: "flows-to", note: "through the atrioventricular valves" },
    ],
    clinical:
      "Raised left atrial pressure (for example from mitral stenosis or left heart failure) backs up into the pulmonary veins and causes pulmonary congestion and edema; raised right atrial pressure shows as distended neck veins (an elevated jugular venous pressure).",
  },

  "ventricle-blood-pool": {
    summary:
      "The blood-filled cavities of the right and left ventricles, the heart's main pumping chambers. The right ventricle pumps deoxygenated blood to the lungs at low pressure, while the left ventricle pumps oxygenated blood into the aorta at systemic pressure.",
    functions: [
      "Right ventricle: ejects deoxygenated blood through the pulmonary valve into the pulmonary trunk",
      "Left ventricle: ejects oxygenated blood through the aortic valve into the aorta",
      "Both eject about the same stroke volume with each beat, keeping pulmonary and systemic flows matched",
    ],
    facts: [
      { label: "Systolic pressure", value: "Left ventricle about 120 mmHg; right ventricle about 25 mmHg" },
      { label: "Diastolic pressure", value: "Low in both, roughly 0–12 mmHg at end-diastole" },
      { label: "Volumes at rest (each ventricle)", value: "End-diastolic about 120 mL, stroke volume about 70 mL, end-systolic about 50 mL" },
      { label: "Ejection fraction", value: "Normally about 55–70%" },
    ],
    connections: [
      { concept: "atrium-blood-pool", relation: "receives-from" },
      { concept: "tricuspid-valve", relation: "receives-from", note: "into the right ventricle" },
      { concept: "mitral-valve", relation: "receives-from", note: "into the left ventricle" },
      { concept: "pulmonary-valve", relation: "flows-to", note: "right ventricle to pulmonary trunk (deoxygenated)" },
      { concept: "aortic-valve", relation: "flows-to", note: "left ventricle to aorta (oxygenated)" },
      { concept: "ventricular-myocardium", relation: "adjacent-to", note: "cavities enclosed by the ventricular walls" },
      { concept: "papillary-muscles", relation: "adjacent-to", note: "project into the ventricular cavities" },
    ],
    clinical:
      "An ejection fraction below about 40% defines heart failure with reduced ejection fraction. A ventricular septal defect lets blood shunt from the high-pressure left ventricle into the right ventricle.",
  },

  "ventricular-myocardium": {
    summary:
      "The thick muscular walls of the right and left ventricles and the interventricular septum between them. Their coordinated contraction generates the pressure that drives blood through the pulmonary and systemic circulations.",
    functions: [
      "Contracts in systole to eject blood into the pulmonary trunk and aorta",
      "The left ventricular wall is thickest because it must generate systemic pressure",
      "The septum carries the right and left bundle branches, which spread the impulse through Purkinje fibers to all ventricular muscle",
      "Relaxes in diastole, when most coronary blood flow to the left ventricle occurs",
    ],
    facts: [
      { label: "Wall thickness", value: "Left ventricle about 1 cm, roughly 2–3 times the right ventricle's 3–5 mm" },
      { label: "Resting cardiac output", value: "About 5 L/min (heart rate ~70/min × stroke volume ~70 mL)" },
      { label: "Coronary blood flow", value: "About 225–250 mL/min at rest, 4–5% of cardiac output" },
      { label: "Oxygen extraction", value: "About 70% of delivered O2 even at rest, so extra demand must be met by increasing flow" },
    ],
    connections: [
      { concept: "ventricle-blood-pool", relation: "contains" },
      { concept: "papillary-muscles", relation: "contains" },
      { concept: "left-anterior-descending-artery", relation: "supplied-by", note: "anterior wall, apex and anterior two-thirds of the septum" },
      { concept: "circumflex-artery", relation: "supplied-by", note: "lateral and posterior left ventricular wall" },
      { concept: "coronary-artery-trunks", relation: "supplied-by", note: "right coronary artery: right ventricle, inferior wall and posterior third of the septum (right-dominant hearts)" },
      { concept: "cardiac-veins", relation: "drained-by" },
      { concept: "atrium", relation: "adjacent-to" },
    ],
    clinical:
      "Blockage of a coronary artery causes a myocardial infarction in the territory it supplies. Chronic pressure overload (hypertension, aortic stenosis) thickens the left ventricular wall, known as left ventricular hypertrophy.",
  },

  "papillary-muscles": {
    summary:
      "Cone-shaped projections of ventricular muscle whose tips anchor the chordae tendineae of the tricuspid and mitral valve cusps. They contract with the ventricles to hold the cusps in place so the valves do not prolapse into the atria.",
    latin: "Musculi papillares",
    functions: [
      "Tension the chordae tendineae during ventricular systole",
      "Prevent eversion (prolapse) of the atrioventricular valve cusps and regurgitation of blood into the atria",
      "They do not open the valves; the valves open and close passively with pressure changes",
    ],
    facts: [
      { label: "Left ventricle", value: "Two large muscles: anterolateral and posteromedial" },
      { label: "Right ventricle", value: "Usually three: anterior (largest), posterior and a small septal group" },
      { label: "Moderator band", value: "The septomarginal trabecula carries part of the right bundle branch to the anterior papillary muscle" },
    ],
    connections: [
      { concept: "ventricular-myocardium", relation: "part-of" },
      { concept: "mitral-valve", relation: "attaches-to", note: "via chordae tendineae (left ventricle)" },
      { concept: "tricuspid-valve", relation: "attaches-to", note: "via chordae tendineae (right ventricle)" },
      { concept: "left-anterior-descending-artery", relation: "supplied-by", note: "anterolateral muscle, together with the circumflex" },
      { concept: "circumflex-artery", relation: "supplied-by", note: "anterolateral muscle" },
      { concept: "coronary-artery-trunks", relation: "supplied-by", note: "posteromedial muscle, often only via the posterior interventricular artery" },
      { concept: "ventricle-blood-pool", relation: "adjacent-to" },
    ],
    clinical:
      "The posteromedial papillary muscle usually depends on a single artery, so it is the one most likely to rupture after a myocardial infarction, causing sudden severe mitral regurgitation and pulmonary edema.",
  },

  "tricuspid-valve": {
    summary:
      "The right atrioventricular valve, with three cusps (anterior, posterior and septal), between the right atrium and right ventricle. It lets deoxygenated blood fill the right ventricle and closes during systole to prevent backflow.",
    latin: "Valva atrioventricularis dextra (valva tricuspidalis)",
    functions: [
      "Opens in diastole when right atrial pressure exceeds right ventricular pressure",
      "Closes at the start of systole, contributing to the first heart sound (S1)",
      "Its cusps are restrained by chordae tendineae attached to the papillary muscles",
    ],
    facts: [
      { label: "Cusps", value: "Three: anterior, posterior and septal" },
      { label: "Auscultation", value: "Lower left sternal border (about the 4th–5th intercostal space)" },
    ],
    connections: [
      { concept: "atrium-blood-pool", relation: "receives-from", note: "right atrium" },
      { concept: "ventricle-blood-pool", relation: "flows-to", note: "right ventricle" },
      { concept: "papillary-muscles", relation: "attaches-to", note: "via chordae tendineae" },
      { concept: "atrium", relation: "adjacent-to" },
      { concept: "coronary-artery-trunks", relation: "adjacent-to", note: "the right coronary artery runs in the atrioventricular groove around its annulus" },
    ],
    clinical:
      "Tricuspid regurgitation most often results from right ventricular dilation, for example with pulmonary hypertension. Infective endocarditis in people who inject drugs characteristically affects the tricuspid valve.",
  },

  "mitral-valve": {
    summary:
      "The left atrioventricular (bicuspid) valve, with anterior and posterior cusps, between the left atrium and left ventricle. It admits oxygenated blood into the left ventricle and must withstand full systolic pressure when closed.",
    latin: "Valva atrioventricularis sinistra (valva mitralis)",
    functions: [
      "Opens in diastole so oxygenated blood flows from the left atrium into the left ventricle",
      "Closes in systole (together with the tricuspid valve, producing S1) to prevent regurgitation into the left atrium and lungs",
      "Its anterior cusp is in fibrous continuity with the aortic valve",
    ],
    facts: [
      { label: "Cusps", value: "Two: anterior (aortic) and posterior" },
      { label: "Normal orifice area", value: "About 4–6 cm²" },
      { label: "Auscultation", value: "Cardiac apex (left 5th intercostal space, midclavicular line)" },
    ],
    connections: [
      { concept: "atrium-blood-pool", relation: "receives-from", note: "left atrium" },
      { concept: "ventricle-blood-pool", relation: "flows-to", note: "left ventricle" },
      { concept: "papillary-muscles", relation: "attaches-to", note: "via chordae tendineae" },
      { concept: "aortic-valve", relation: "adjacent-to", note: "aortic–mitral fibrous continuity" },
      { concept: "circumflex-artery", relation: "adjacent-to", note: "runs in the left atrioventricular groove near the annulus" },
      { concept: "atrium", relation: "adjacent-to" },
    ],
    clinical:
      "Mitral stenosis (usually rheumatic) enlarges the left atrium and predisposes to atrial fibrillation. Mitral regurgitation and mitral valve prolapse are among the most common valve disorders.",
  },

  "aortic-valve": {
    summary:
      "The semilunar valve between the left ventricle and the ascending aorta, with three cusps. It opens when the left ventricle ejects and snaps shut at the end of systole to prevent backflow into the ventricle.",
    latin: "Valva aortae",
    functions: [
      "Opens in systole once left ventricular pressure exceeds aortic pressure (about 80 mmHg)",
      "Closes at the start of diastole, producing the aortic component of the second heart sound (S2)",
      "The aortic sinuses behind its cusps give rise to the right and left coronary arteries",
    ],
    facts: [
      { label: "Cusps", value: "Three: right (coronary), left (coronary) and posterior (non-coronary)" },
      { label: "Normal orifice area", value: "About 3–4 cm²" },
      { label: "Auscultation", value: "Right 2nd intercostal space at the sternal border" },
    ],
    connections: [
      { concept: "ventricle-blood-pool", relation: "receives-from", note: "left ventricle" },
      { concept: "ascending-aorta", relation: "flows-to" },
      { concept: "coronary-artery-trunks", relation: "adjacent-to", note: "coronary openings lie in the right and left aortic sinuses" },
      { concept: "mitral-valve", relation: "adjacent-to" },
      { concept: "pulmonary-valve", relation: "adjacent-to" },
    ],
    clinical:
      "Calcific aortic stenosis is the valve disease that most often needs intervention in older adults (surgical or transcatheter valve replacement). A congenitally bicuspid aortic valve, present in about 1–2% of people, tends to become stenotic earlier.",
  },

  "pulmonary-valve": {
    summary:
      "The semilunar valve at the top of the right ventricular outflow tract (infundibulum), guarding the entrance to the pulmonary trunk. Its three cusps open as the right ventricle ejects deoxygenated blood toward the lungs and close to prevent backflow.",
    latin: "Valva trunci pulmonalis",
    functions: [
      "Opens in systole to let the right ventricle eject into the pulmonary trunk",
      "Closes at the start of diastole, producing the pulmonary component (P2) of the second heart sound",
      "Inspiration delays its closure slightly, causing normal (physiological) splitting of S2",
    ],
    facts: [
      { label: "Cusps", value: "Three: anterior, right and left" },
      { label: "Auscultation", value: "Left 2nd intercostal space at the sternal border" },
      { label: "Downstream pressure", value: "Pulmonary artery about 25/8 mmHg" },
    ],
    connections: [
      { concept: "ventricle-blood-pool", relation: "receives-from", note: "right ventricle" },
      { concept: "pulmonary-trunk", relation: "flows-to" },
      { concept: "aortic-valve", relation: "adjacent-to", note: "lies anterior and slightly to the left of it" },
    ],
    clinical: "Pulmonary valve stenosis is usually congenital and is one component of tetralogy of Fallot.",
  },

  // ─────────────────────────── Coronary circulation ───────────────────────────
  "coronary-artery-trunks": {
    summary:
      "The main stems of the two coronary arteries, which arise from the aortic sinuses just above the aortic valve, together with the right coronary artery's branches. The short left main coronary artery soon divides into the anterior descending and circumflex arteries, while the right coronary artery runs in the right atrioventricular groove to the back of the heart.",
    latin: "Arteria coronaria dextra et arteria coronaria sinistra",
    functions: [
      "Deliver oxygenated blood from the aorta to the heart muscle itself",
      "The right coronary artery supplies the right atrium, most of the right ventricle, part of the inferior left ventricle and the posterior septum",
      "The right coronary artery usually supplies the SA node (about 60% of people) and the AV node (about 80%)",
      "In most people the right coronary gives the posterior interventricular (posterior descending) artery, termed right dominance",
    ],
    facts: [
      { label: "Origin", value: "Right and left aortic sinuses (of Valsalva), just above the aortic valve cusps" },
      { label: "Left main coronary artery", value: "Short, typically only about 1–2 cm before dividing" },
      { label: "Total coronary flow", value: "About 225–250 mL/min at rest, mostly during diastole" },
    ],
    connections: [
      { concept: "ascending-aorta", relation: "branch-of", note: "from the aortic sinuses" },
      { concept: "left-anterior-descending-artery", relation: "gives-rise-to", note: "from the left main coronary artery" },
      { concept: "circumflex-artery", relation: "gives-rise-to", note: "from the left main coronary artery" },
      { concept: "ventricular-myocardium", relation: "flows-to", note: "right ventricle, inferior left ventricle and posterior septum" },
      { concept: "atrium", relation: "flows-to", note: "right atrium and, usually, the SA node" },
      { concept: "papillary-muscles", relation: "flows-to", note: "posteromedial muscle via the posterior interventricular artery" },
      { concept: "aortic-valve", relation: "adjacent-to" },
      { concept: "pulmonary-trunk", relation: "adjacent-to", note: "the left main coronary passes behind it" },
      { concept: "cardiac-veins", relation: "adjacent-to", note: "middle and small cardiac veins accompany right coronary branches" },
    ],
    clinical:
      "Occlusion of the right coronary artery typically causes an inferior myocardial infarction, often with bradycardia or heart block because it supplies the AV node. Significant left main disease threatens a large area of the left ventricle and usually requires revascularization.",
  },

  "left-anterior-descending-artery": {
    summary:
      "The anterior interventricular branch of the left coronary artery, running down the anterior interventricular groove toward the apex, together with its diagonal and septal branches. It supplies a larger area of left ventricular muscle than any other coronary branch.",
    latin: "Ramus interventricularis anterior arteriae coronariae sinistrae",
    functions: [
      "Supplies the anterior left ventricular wall and apex (diagonal branches)",
      "Supplies the anterior two-thirds of the interventricular septum, including much of the bundle branches (septal perforators)",
      "Supplies a strip of the anterior right ventricle next to the groove",
    ],
    facts: [
      { label: "Course", value: "Anterior interventricular groove, often wrapping around the apex" },
      { label: "Main branches", value: "Diagonal branches (anterolateral wall) and septal perforating branches" },
      { label: "Companion vein", value: "Anterior interventricular vein, the start of the great cardiac vein" },
    ],
    connections: [
      { concept: "coronary-artery-trunks", relation: "branch-of", note: "from the left main coronary artery" },
      { concept: "ventricular-myocardium", relation: "flows-to", note: "anterior wall, apex and anterior two-thirds of the septum" },
      { concept: "papillary-muscles", relation: "flows-to", note: "anterolateral muscle, shared with the circumflex" },
      { concept: "cardiac-veins", relation: "adjacent-to", note: "anterior interventricular vein runs alongside" },
    ],
    clinical:
      "Proximal LAD occlusion causes a large anterior myocardial infarction (nicknamed the 'widow-maker'). In bypass surgery the left internal thoracic (mammary) artery is classically grafted onto the LAD.",
  },

  "circumflex-artery": {
    summary:
      "The circumflex branch of the left coronary artery, which curves to the left in the atrioventricular groove around the left border of the heart, together with its obtuse marginal branches. It supplies the left atrium and the lateral and posterior walls of the left ventricle.",
    latin: "Ramus circumflexus arteriae coronariae sinistrae",
    functions: [
      "Supplies the lateral and posterior left ventricular wall through the obtuse (left) marginal branches",
      "Supplies the left atrium and gives the SA nodal artery in about 40% of people",
      "In left-dominant hearts (roughly 10%) it also gives the posterior interventricular artery",
    ],
    facts: [
      { label: "Course", value: "Left atrioventricular (coronary) groove, alongside the great cardiac vein and coronary sinus" },
      { label: "Main branches", value: "Obtuse (left) marginal arteries" },
    ],
    connections: [
      { concept: "coronary-artery-trunks", relation: "branch-of", note: "from the left main coronary artery" },
      { concept: "ventricular-myocardium", relation: "flows-to", note: "lateral and posterior left ventricle" },
      { concept: "atrium", relation: "flows-to", note: "left atrium" },
      { concept: "papillary-muscles", relation: "flows-to", note: "anterolateral muscle, shared with the LAD" },
      { concept: "cardiac-veins", relation: "adjacent-to", note: "great cardiac vein and coronary sinus in the same groove" },
      { concept: "mitral-valve", relation: "adjacent-to", note: "runs close to the mitral annulus" },
    ],
    clinical:
      "Circumflex occlusion causes a lateral or posterior infarction that can be easy to miss on a standard 12-lead ECG because few leads face that region.",
  },

  "cardiac-veins": {
    summary:
      "The veins of the heart wall (great, middle and small cardiac veins, posterior vein of the left ventricle, marginal and anterior cardiac veins) and the coronary sinus into which most of them drain. The coronary sinus lies in the posterior atrioventricular groove and empties into the right atrium.",
    latin: "Venae cordis et sinus coronarius",
    functions: [
      "Return deoxygenated blood from the myocardium to the right atrium",
      "The coronary sinus collects most cardiac venous blood; anterior cardiac veins drain much of the right ventricle directly into the right atrium",
      "Tiny smallest cardiac (Thebesian) veins open directly into the heart chambers",
    ],
    facts: [
      { label: "Coronary sinus opening", value: "Right atrium, between the IVC opening and the tricuspid orifice" },
      { label: "Companion arteries", value: "Great cardiac vein with the LAD and circumflex; middle cardiac vein with the posterior interventricular artery; small cardiac vein with the right marginal artery" },
      { label: "Oxygen saturation", value: "Very low, about 30%, because the heart extracts ~70% of delivered oxygen" },
    ],
    connections: [
      { concept: "ventricular-myocardium", relation: "receives-from" },
      { concept: "atrium", relation: "receives-from", note: "atrial walls" },
      { concept: "atrium-blood-pool", relation: "flows-to", note: "right atrium, mainly via the coronary sinus" },
      { concept: "left-anterior-descending-artery", relation: "adjacent-to", note: "anterior interventricular vein" },
      { concept: "circumflex-artery", relation: "adjacent-to", note: "great cardiac vein and coronary sinus in the atrioventricular groove" },
      { concept: "coronary-artery-trunks", relation: "adjacent-to", note: "middle and small cardiac veins" },
    ],
    clinical:
      "The coronary sinus is used to place a left ventricular pacing lead into a lateral cardiac vein for cardiac resynchronization therapy, and to deliver retrograde cardioplegia during heart surgery.",
  },

  // ─────────────────────────── Great vessels ───────────────────────────
  "ascending-aorta": {
    summary:
      "The first part of the aorta, about 5 cm long, rising from the aortic valve inside the pericardium to the level of the sternal angle, where it becomes the arch. Its only branches are the right and left coronary arteries.",
    latin: "Aorta ascendens (pars ascendens aortae)",
    functions: [
      "Receives the entire left ventricular output of oxygenated blood",
      "Its elastic wall stretches in systole and recoils in diastole, smoothing flow and maintaining diastolic pressure (Windkessel effect)",
      "Gives rise to the coronary arteries from the aortic sinuses",
    ],
    facts: [
      { label: "Length", value: "About 5 cm" },
      { label: "Diameter", value: "About 2.5–3.5 cm, widest at the aortic root" },
      { label: "Pressure", value: "About 120/80 mmHg at rest" },
      { label: "Flow and oxygenation", value: "About 5 L/min at rest; O2 saturation about 97–98%" },
    ],
    connections: [
      { concept: "aortic-valve", relation: "receives-from" },
      { concept: "arch-of-aorta", relation: "flows-to" },
      { concept: "coronary-artery-trunks", relation: "gives-rise-to", note: "from the aortic sinuses" },
      { concept: "pulmonary-trunk", relation: "adjacent-to", note: "the two vessels spiral around each other" },
      { concept: "superior-vena-cava", relation: "adjacent-to", note: "lies to its right" },
      { concept: "pulmonary-artery", relation: "adjacent-to", note: "right pulmonary artery passes behind it" },
      { concept: "atrium", relation: "adjacent-to", note: "right auricle overlaps its root" },
    ],
    clinical:
      "Dilation of the ascending aorta (e.g., in Marfan syndrome or with a bicuspid aortic valve) predisposes to dissection; a Stanford type A dissection involves the ascending aorta and is a surgical emergency.",
  },

  "arch-of-aorta": {
    summary:
      "The curved segment of the aorta that continues from the ascending aorta at the level of the sternal angle, arches backward and to the left over the root of the left lung, and becomes the descending thoracic aorta at about T4. It gives off the three great arteries that supply the head, neck and upper limbs.",
    latin: "Arcus aortae",
    functions: [
      "Distributes oxygenated blood to the head, neck and upper limbs through its three branches",
      "Baroreceptors in its wall signal blood pressure to the brainstem via the vagus nerve",
      "Is connected to the left pulmonary artery by the ligamentum arteriosum, the remnant of the fetal ductus arteriosus",
    ],
    facts: [
      { label: "Usual branches (right to left)", value: "Brachiocephalic trunk, left common carotid artery, left subclavian artery" },
      { label: "Level", value: "Begins and ends at the sternal angle (T4/T5); its summit lies behind the middle of the manubrium" },
      { label: "Common variant", value: "Brachiocephalic trunk and left common carotid sharing one origin (so-called bovine arch)" },
    ],
    connections: [
      { concept: "ascending-aorta", relation: "receives-from" },
      { concept: "descending-thoracic-aorta", relation: "flows-to" },
      { concept: "brachiocephalic-trunk", relation: "gives-rise-to" },
      { concept: "common-carotid-artery", relation: "gives-rise-to", note: "left common carotid" },
      { concept: "subclavian-artery", relation: "gives-rise-to", note: "left subclavian" },
      { concept: "pulmonary-artery", relation: "adjacent-to", note: "ligamentum arteriosum to the left pulmonary artery; right pulmonary artery passes beneath" },
      { concept: "trachea", relation: "adjacent-to", note: "passes in front of and then to the left of the trachea" },
      { concept: "esophagus", relation: "adjacent-to" },
      { concept: "main-bronchus", relation: "adjacent-to", note: "arches over the left main bronchus" },
      { concept: "vagus-nerve-cn-x", relation: "adjacent-to", note: "left recurrent laryngeal nerve hooks beneath the arch" },
      { concept: "brachiocephalic-vein", relation: "adjacent-to", note: "left brachiocephalic vein crosses above and in front" },
    ],
    clinical:
      "Coarctation of the aorta, a congenital narrowing near the ligamentum arteriosum, causes upper-limb hypertension with weak, delayed femoral pulses. An aneurysm of the arch can stretch the left recurrent laryngeal nerve, causing hoarseness.",
  },

  "brachiocephalic-trunk": {
    summary:
      "The first and largest branch of the aortic arch. It arises behind the manubrium, ascends to the right and divides behind the right sternoclavicular joint into the right subclavian and right common carotid arteries; there is no left-sided equivalent.",
    latin: "Truncus brachiocephalicus",
    functions: [
      "Carries oxygenated blood to the right side of the head and neck",
      "Supplies the right upper limb via the right subclavian artery",
      "Contributes to brain blood flow via the right common carotid and right vertebral arteries",
    ],
    facts: [
      { label: "Length", value: "About 4–5 cm" },
      { label: "Termination", value: "Behind the right sternoclavicular joint" },
      { label: "Branches", value: "Usually none before it divides (a small thyroid ima artery occasionally arises from it)" },
    ],
    connections: [
      { concept: "arch-of-aorta", relation: "branch-of" },
      { concept: "subclavian-artery", relation: "gives-rise-to", note: "right subclavian" },
      { concept: "common-carotid-artery", relation: "gives-rise-to", note: "right common carotid" },
      { concept: "trachea", relation: "adjacent-to", note: "in front of, then to the right of, the trachea" },
      { concept: "brachiocephalic-vein", relation: "adjacent-to", note: "the left brachiocephalic vein crosses in front of it" },
      { concept: "manubrium-of-sternum", relation: "adjacent-to" },
    ],
    clinical:
      "Because it crosses in front of the lower trachea, it can be eroded by a low-lying tracheostomy tube, causing a rare but often fatal tracheo-innominate artery fistula.",
  },

  "superior-vena-cava": {
    summary:
      "The large valveless vein that returns deoxygenated blood from the head, neck, upper limbs and thoracic wall to the right atrium. It forms behind the right first costal cartilage from the two brachiocephalic veins and descends about 7 cm to the heart.",
    latin: "Vena cava superior",
    functions: [
      "Returns venous blood from structures above the diaphragm (except the lungs and heart) to the right atrium",
      "Receives the azygos vein, which drains the posterior thoracic wall",
      "Its lower part is the usual target position for the tips of central venous catheters",
    ],
    facts: [
      { label: "Length", value: "About 7 cm" },
      { label: "Diameter", value: "About 2 cm" },
      { label: "Formation", value: "Union of the right and left brachiocephalic veins at the lower border of the right 1st costal cartilage" },
      { label: "Oxygen saturation", value: "About 70–75% (deoxygenated)" },
    ],
    connections: [
      { concept: "brachiocephalic-vein", relation: "receives-from" },
      { concept: "azygos-system", relation: "receives-from", note: "azygos vein arches over the right lung root to join it" },
      { concept: "atrium-blood-pool", relation: "flows-to", note: "right atrium" },
      { concept: "ascending-aorta", relation: "adjacent-to", note: "lies to its left" },
      { concept: "pulmonary-artery", relation: "adjacent-to", note: "right pulmonary artery passes behind it" },
      { concept: "phrenic-nerve", relation: "adjacent-to", note: "right phrenic nerve descends on its surface" },
      { concept: "superior-lobe-of-lung", relation: "adjacent-to", note: "right lung, medial surface" },
    ],
    clinical:
      "Superior vena cava syndrome, obstruction usually by lung cancer or lymphoma, causes swelling and venous distension of the face, neck and arms; collateral veins such as the azygos system enlarge to bypass the block.",
  },

  "inferior-vena-cava": {
    summary:
      "The largest vein in the body, returning deoxygenated blood from everything below the diaphragm to the right atrium. It forms at about L5 from the two common iliac veins, ascends to the right of the aorta, grooves the back of the liver and passes through the diaphragm at T8.",
    latin: "Vena cava inferior",
    functions: [
      "Returns venous blood from the lower limbs, pelvis, abdominal wall and abdominal organs to the right atrium",
      "Receives blood from the digestive tract indirectly, after it has passed through the liver via the portal system and hepatic veins",
      "Its valveless course relies on the thoracoabdominal pressure changes of breathing and the leg muscle pumps to keep blood moving",
    ],
    facts: [
      { label: "Formation", value: "Union of the common iliac veins at about L5, right of midline" },
      { label: "Diaphragm passage", value: "Caval opening in the central tendon at T8" },
      { label: "Diameter", value: "Roughly 1.5–2.5 cm; varies with breathing and blood volume" },
    ],
    connections: [
      { concept: "common-iliac-vein", relation: "receives-from" },
      { concept: "lumbar-sacral-veins", relation: "receives-from", note: "lumbar veins" },
      { concept: "renal-vein", relation: "receives-from" },
      { concept: "testicular-vein", relation: "receives-from", note: "right testicular vein" },
      { concept: "suprarenal-vein", relation: "receives-from", note: "right suprarenal vein" },
      { concept: "phrenic-veins", relation: "receives-from", note: "inferior phrenic veins" },
      { concept: "hepatic-veins", relation: "receives-from", note: "just below the diaphragm" },
      { concept: "liver-segment-i-caudate-lobe", relation: "receives-from", note: "small caudate veins open directly into it" },
      { concept: "atrium-blood-pool", relation: "flows-to", note: "right atrium" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "the aorta lies to its left" },
      { concept: "diaphragm", relation: "adjacent-to", note: "caval opening at T8" },
    ],
    clinical:
      "In late pregnancy the uterus can compress the IVC when the mother lies supine, reducing venous return and causing hypotension, hence the left-lateral position. IVC filters can be placed below the renal veins to trap emboli from leg deep vein thrombosis.",
  },

  // ─────────────────────────── Pulmonary circulation ───────────────────────────
  "pulmonary-trunk": {
    summary:
      "The short, wide artery that leaves the right ventricle through the pulmonary valve and carries deoxygenated blood toward the lungs. It divides beneath the aortic arch, at about the level of the sternal angle, into the right and left pulmonary arteries. In this app it is colored blue because it carries deoxygenated blood, even though it is an artery.",
    latin: "Truncus pulmonalis",
    functions: [
      "Carries the entire right ventricular output (the same ~5 L/min as the left side) toward the lungs",
      "Divides into the right and left pulmonary arteries",
      "Before birth, most of its blood bypasses the lungs through the ductus arteriosus into the aorta",
    ],
    facts: [
      { label: "Size", value: "About 5 cm long and 3 cm wide" },
      { label: "Pressure", value: "About 25/8 mmHg (mean ~15 mmHg), far lower than systemic pressure" },
      { label: "O2 saturation", value: "About 70–75% (mixed venous blood)" },
      { label: "Bifurcation", value: "About T4/T5, in the concavity of the aortic arch" },
    ],
    connections: [
      { concept: "pulmonary-valve", relation: "receives-from", note: "from the right ventricle" },
      { concept: "pulmonary-artery", relation: "gives-rise-to", note: "right and left pulmonary arteries" },
      { concept: "ascending-aorta", relation: "adjacent-to" },
      { concept: "arch-of-aorta", relation: "adjacent-to", note: "linked by the ligamentum arteriosum" },
      { concept: "coronary-artery-trunks", relation: "adjacent-to", note: "the left main coronary artery passes behind it" },
      { concept: "atrium", relation: "adjacent-to", note: "left auricle lies beside it" },
    ],
    clinical:
      "A large pulmonary embolus can lodge astride the bifurcation (saddle embolus), acutely overloading the right ventricle. Pulmonary hypertension raises pressure here and can eventually cause right ventricular failure (cor pulmonale).",
  },

  "pulmonary-artery": {
    summary:
      "The right and left pulmonary arteries, which branch from the pulmonary trunk and carry deoxygenated blood to each lung, dividing at the hilum into lobar arteries. They are the only arteries after birth that carry deoxygenated blood, which is why this app colors them blue.",
    latin: "Arteria pulmonalis dextra et arteria pulmonalis sinistra",
    functions: [
      "Deliver deoxygenated blood to the lungs for gas exchange",
      "Divide into lobar arteries: three on the right (upper, middle, lower lobes), two on the left",
      "Act as low-pressure, highly compliant vessels able to accept the whole cardiac output",
    ],
    facts: [
      { label: "Pressure", value: "About 25/8 mmHg (mean ~15 mmHg)" },
      { label: "Right vs left", value: "The right is longer, passing under the arch behind the ascending aorta and SVC; the left is shorter and tethered to the arch by the ligamentum arteriosum" },
      { label: "At the hilum", value: "The left pulmonary artery is the highest structure in the left hilum; on the right the upper-lobe bronchus lies above the artery" },
    ],
    connections: [
      { concept: "pulmonary-trunk", relation: "branch-of" },
      { concept: "pulmonary-artery-branches", relation: "gives-rise-to", note: "lobar and segmental arteries" },
      { concept: "superior-lobe-of-lung", relation: "flows-to" },
      { concept: "middle-lobe-of-lung", relation: "flows-to", note: "right lung only" },
      { concept: "inferior-lobe-of-lung", relation: "flows-to" },
      { concept: "main-bronchus", relation: "adjacent-to", note: "at the lung hilum" },
      { concept: "pulmonary-veins", relation: "adjacent-to", note: "at the lung hilum" },
      { concept: "arch-of-aorta", relation: "adjacent-to" },
      { concept: "superior-vena-cava", relation: "adjacent-to", note: "right pulmonary artery passes behind it" },
    ],
    clinical:
      "Pulmonary embolism, usually a clot from a deep leg vein, obstructs these arteries, causing breathlessness, chest pain and, if large, right heart failure; CT pulmonary angiography is the standard imaging test.",
  },

  "pulmonary-artery-branches": {
    summary:
      "The segmental branches of the pulmonary arteries, one for each bronchopulmonary segment, running alongside the corresponding segmental bronchus. They divide down to the capillary networks around the alveoli, where the deoxygenated blood they carry (shown blue in this app) picks up oxygen.",
    functions: [
      "Distribute deoxygenated blood to each bronchopulmonary segment",
      "Feed the alveolar capillary beds where O2 is loaded and CO2 unloaded",
      "Constrict in poorly ventilated regions (hypoxic pulmonary vasoconstriction), matching blood flow to ventilation",
    ],
    facts: [
      { label: "Segments", value: "Typically 10 in the right lung and 8–10 in the left" },
      { label: "Arrangement", value: "Arteries travel centrally with the bronchi; pulmonary veins run between segments" },
      { label: "Capillary transit time", value: "A red cell spends about 0.75 s in the alveolar capillaries at rest" },
    ],
    connections: [
      { concept: "pulmonary-artery", relation: "branch-of" },
      { concept: "superior-lobe-of-lung", relation: "flows-to" },
      { concept: "middle-lobe-of-lung", relation: "flows-to" },
      { concept: "inferior-lobe-of-lung", relation: "flows-to" },
      { concept: "pulmonary-vein-tributaries", relation: "flows-to", note: "via the alveolar capillaries, where the blood becomes oxygenated" },
      { concept: "bronchial-tree", relation: "adjacent-to", note: "run with the segmental bronchi" },
    ],
    clinical:
      "Small emboli lodge in segmental and subsegmental branches; because the bronchial arteries provide a second blood supply, only a minority cause a wedge-shaped pulmonary infarct.",
  },

  "pulmonary-vein-tributaries": {
    summary:
      "The segmental and lobar veins inside the lungs that collect freshly oxygenated blood from the alveolar capillaries and converge on the main pulmonary veins. Unlike the arteries, they run mainly in the connective tissue between bronchopulmonary segments. In this app they are colored red because they carry oxygenated blood.",
    functions: [
      "Collect oxygenated blood from the alveolar capillaries",
      "Drain adjacent bronchopulmonary segments (intersegmental veins)",
      "Also receive some deoxygenated blood from the bronchial circulation, a small physiological shunt",
    ],
    facts: [
      { label: "O2 saturation", value: "About 97–98%" },
      { label: "Position", value: "Intersegmental: they mark the planes between segments" },
    ],
    connections: [
      { concept: "pulmonary-artery-branches", relation: "receives-from", note: "via the alveolar capillaries" },
      { concept: "superior-lobe-of-lung", relation: "receives-from" },
      { concept: "middle-lobe-of-lung", relation: "receives-from" },
      { concept: "inferior-lobe-of-lung", relation: "receives-from" },
      { concept: "bronchial-arteries", relation: "receives-from", note: "part of the bronchial blood drains into pulmonary veins" },
      { concept: "pulmonary-veins", relation: "flows-to" },
    ],
    clinical:
      "Surgeons use the intersegmental veins as landmarks for the planes between segments when removing a single bronchopulmonary segment (segmentectomy).",
  },

  "pulmonary-veins": {
    summary:
      "Usually four veins, a superior and an inferior from each lung, that carry oxygenated blood from the lungs to the left atrium. They are the only veins after birth that carry oxygenated blood, which is why this app colors them red.",
    latin: "Venae pulmonales",
    functions: [
      "Return oxygenated blood from the lungs to the left atrium",
      "The right superior pulmonary vein also drains the middle lobe",
      "Muscular sleeves around their atrial ends can generate ectopic electrical activity",
    ],
    facts: [
      { label: "Number", value: "Usually 4 (2 per lung); variations such as a common trunk are frequent" },
      { label: "O2 saturation", value: "About 97–98%" },
      { label: "Pressure", value: "Low, close to left atrial pressure (normally under about 12 mmHg)" },
    ],
    connections: [
      { concept: "pulmonary-vein-tributaries", relation: "receives-from" },
      { concept: "superior-lobe-of-lung", relation: "receives-from" },
      { concept: "middle-lobe-of-lung", relation: "receives-from", note: "via the right superior pulmonary vein" },
      { concept: "inferior-lobe-of-lung", relation: "receives-from" },
      { concept: "atrium-blood-pool", relation: "flows-to", note: "left atrium" },
      { concept: "atrium", relation: "adjacent-to", note: "enter the posterior wall of the left atrium" },
      { concept: "pulmonary-artery", relation: "adjacent-to", note: "at the lung hilum" },
      { concept: "main-bronchus", relation: "adjacent-to", note: "at the lung hilum" },
    ],
    clinical:
      "Atrial fibrillation is often triggered by ectopic beats arising in the pulmonary vein sleeves, which is why catheter ablation aims to electrically isolate the pulmonary veins.",
  },

  // ─────────────────────────── Lymphatic organs ───────────────────────────
  "spleen": {
    summary:
      "The largest lymphoid organ, lying in the left upper quadrant under the 9th–11th ribs, behind the stomach. It filters the blood, removing old or damaged red cells and blood-borne microbes, and mounts immune responses to antigens in the blood.",
    latin: "Splen (lien)",
    functions: [
      "Red pulp: macrophages remove aged, damaged or abnormal red cells and recycle their iron",
      "White pulp: lymphocytes mount immune (especially antibody) responses to blood-borne antigens, including encapsulated bacteria",
      "Stores a reserve of platelets (about a third of the body's total) and monocytes",
      "Makes blood cells in the fetus and can resume this in some adult diseases",
    ],
    facts: [
      { label: "Size", value: "About 12 cm long, 7 cm wide and 3–4 cm thick" },
      { label: "Weight", value: "About 150 g (varies widely)" },
      { label: "Position", value: "Long axis runs along the left 10th rib; normally not palpable" },
      { label: "Red cell lifespan", value: "About 120 days before removal, largely in the spleen" },
    ],
    connections: [
      { concept: "celiac-trunk-branches", relation: "supplied-by", note: "splenic artery" },
      { concept: "hepatic-portal-system", relation: "drained-by", note: "splenic vein" },
      { concept: "stomach", relation: "adjacent-to" },
      { concept: "kidney", relation: "adjacent-to", note: "left kidney" },
      { concept: "pancreas", relation: "adjacent-to", note: "the tail reaches the splenic hilum" },
      { concept: "diaphragm", relation: "adjacent-to" },
      { concept: "descending-colon", relation: "adjacent-to", note: "left colic (splenic) flexure" },
      { concept: "tenth-rib", relation: "adjacent-to" },
    ],
    clinical:
      "The spleen is the abdominal organ most often injured in blunt trauma, especially with left lower rib fractures, and can bleed massively. After splenectomy there is a lifelong risk of overwhelming infection by encapsulated bacteria (pneumococcus, meningococcus, Haemophilus), so vaccination is essential.",
  },

  "thymus": {
    summary:
      "A bilobed primary lymphoid organ in the anterior part of the superior mediastinum, behind the manubrium. It is where T lymphocytes mature and learn to tolerate self; it is large in childhood and gradually replaced by fat after puberty.",
    functions: [
      "Site of T-cell maturation from bone-marrow-derived precursors",
      "Positive selection in the cortex (MHC restriction) and negative selection in the medulla (removal of self-reactive T cells)",
      "Produces thymic hormones (e.g., thymosin, thymulin) that support T-cell development",
    ],
    facts: [
      { label: "Peak size", value: "Roughly 30–40 g around puberty, then gradually involutes" },
      { label: "Histology", value: "Outer cortex packed with developing T cells; inner medulla containing Hassall's corpuscles" },
      { label: "Barrier", value: "A blood–thymus barrier in the cortex shields developing T cells from circulating antigens" },
    ],
    connections: [
      { concept: "internal-thoracic-artery", relation: "supplied-by" },
      { concept: "inferior-thyroid-artery", relation: "supplied-by" },
      { concept: "brachiocephalic-vein", relation: "drained-by", note: "mainly the left brachiocephalic vein" },
      { concept: "internal-thoracic-vein", relation: "drained-by" },
      { concept: "manubrium-of-sternum", relation: "adjacent-to" },
      { concept: "arch-of-aorta", relation: "adjacent-to" },
      { concept: "trachea", relation: "adjacent-to", note: "upper poles extend toward the neck in front of the trachea" },
    ],
    clinical:
      "Thymic tumors (thymomas) are associated with myasthenia gravis, and removing the thymus can improve the disease. In DiGeorge (22q11.2 deletion) syndrome the thymus fails to develop properly, causing T-cell immunodeficiency.",
  },

  // ─────────────────────────── Neck and brain arteries ───────────────────────────
  "common-carotid-artery": {
    summary:
      "The main artery on each side of the neck. The right arises from the brachiocephalic trunk and the left directly from the aortic arch; each ascends in the carotid sheath without branching and divides at about the upper border of the thyroid cartilage (C4) into the internal and external carotid arteries.",
    latin: "Arteria carotis communis",
    functions: [
      "Carries oxygenated blood to the head and neck",
      "Divides into the internal carotid (brain and eye) and external carotid (face, scalp, neck) arteries",
      "The carotid sinus at the bifurcation senses blood pressure; the carotid body senses blood O2, CO2 and pH",
    ],
    facts: [
      { label: "Bifurcation", value: "Upper border of the thyroid cartilage, about C4" },
      { label: "Diameter", value: "Roughly 6–8 mm" },
      { label: "Carotid pulse", value: "Felt at the anterior border of sternocleidomastoid, level with the thyroid cartilage" },
    ],
    connections: [
      { concept: "brachiocephalic-trunk", relation: "branch-of", note: "right common carotid" },
      { concept: "arch-of-aorta", relation: "branch-of", note: "left common carotid" },
      { concept: "internal-carotid-artery", relation: "gives-rise-to" },
      { concept: "internal-jugular-vein", relation: "adjacent-to", note: "lateral to the artery in the carotid sheath" },
      { concept: "vagus-nerve-cn-x", relation: "adjacent-to", note: "posterior, between artery and vein in the carotid sheath" },
      { concept: "sternocleidomastoid", relation: "adjacent-to", note: "overlaps the carotid sheath" },
      { concept: "thyroid-gland", relation: "adjacent-to" },
      { concept: "thyroid-cartilage", relation: "adjacent-to", note: "bifurcation at its upper border" },
      { concept: "sympathetic-trunk", relation: "adjacent-to", note: "behind the carotid sheath" },
    ],
    clinical:
      "Atherosclerotic plaque at the carotid bifurcation is a major cause of stroke and transient ischemic attack, treated in selected patients by endarterectomy or stenting. Pressure on the carotid sinus (carotid sinus massage) can slow the heart rate.",
  },

  "internal-carotid-artery": {
    summary:
      "The branch of the common carotid artery that supplies most of the cerebral hemisphere and the eye. It has no branches in the neck, enters the skull through the carotid canal, passes through the cavernous sinus and ends beside the optic chiasm by dividing into the anterior and middle cerebral arteries.",
    latin: "Arteria carotis interna",
    functions: [
      "Main supply of the anterior circulation of the brain (frontal, parietal and much of the temporal lobes)",
      "Supplies the eye and orbit through the ophthalmic artery",
      "Forms part of the circle of Willis via the posterior communicating artery",
      "Its anterior choroidal branch supplies the choroid plexus of the lateral ventricle, optic tract and part of the internal capsule",
    ],
    facts: [
      { label: "Branches in the neck", value: "None, a key difference from the external carotid" },
      { label: "Route into the skull", value: "Carotid canal of the temporal bone, then through the cavernous sinus" },
      { label: "Terminal branches", value: "Anterior and middle cerebral arteries" },
      { label: "Brain blood flow", value: "The whole brain receives about 750 mL/min (~15% of resting cardiac output), most of it via the two internal carotids" },
    ],
    connections: [
      { concept: "common-carotid-artery", relation: "branch-of" },
      { concept: "ophthalmic-artery", relation: "gives-rise-to" },
      { concept: "anterior-cerebral-artery", relation: "gives-rise-to" },
      { concept: "middle-cerebral-artery", relation: "gives-rise-to", note: "its direct continuation" },
      { concept: "posterior-cerebral-artery", relation: "gives-rise-to", note: "posterior communicating artery (included in that group) joins the posterior cerebral artery" },
      { concept: "choroid-plexus", relation: "flows-to", note: "anterior choroidal artery" },
      { concept: "optic-tract", relation: "flows-to", note: "anterior choroidal artery" },
      { concept: "internal-jugular-vein", relation: "adjacent-to", note: "lateral to it in the carotid sheath" },
      { concept: "temporal-bone", relation: "adjacent-to", note: "carotid canal" },
      { concept: "optic-chiasm", relation: "adjacent-to", note: "terminates lateral to the chiasm" },
      { concept: "pituitary-gland", relation: "adjacent-to", note: "runs through the cavernous sinus beside the pituitary" },
    ],
    clinical:
      "Emboli from carotid plaque can cause a stroke in the middle cerebral territory or transient loss of vision in one eye (amaurosis fugax) via the ophthalmic artery. An aneurysm where the posterior communicating artery arises can compress the oculomotor nerve.",
  },

  "ophthalmic-artery": {
    summary:
      "The first major intracranial branch of the internal carotid artery. It enters the orbit through the optic canal with the optic nerve and supplies the eyeball, retina, extraocular muscles, lacrimal gland and parts of the forehead and nose.",
    latin: "Arteria ophthalmica",
    functions: [
      "Supplies the inner retina through the central retinal artery",
      "Supplies the choroid, ciliary body and iris through the ciliary arteries",
      "Supplies the extraocular muscles, lacrimal gland, eyelids, forehead and part of the nasal cavity",
    ],
    facts: [
      { label: "Route", value: "Optic canal, inferolateral to the optic nerve" },
      { label: "Key branch", value: "Central retinal artery, an end artery supplying the inner retina" },
      { label: "Other branches", value: "Ciliary, lacrimal, muscular, supraorbital, supratrochlear and ethmoidal arteries" },
    ],
    connections: [
      { concept: "internal-carotid-artery", relation: "branch-of" },
      { concept: "retina", relation: "flows-to", note: "central retinal artery" },
      { concept: "choroid", relation: "flows-to", note: "short posterior ciliary arteries" },
      { concept: "ciliary-body", relation: "flows-to", note: "long posterior and anterior ciliary arteries" },
      { concept: "iris", relation: "flows-to" },
      { concept: "lacrimal-apparatus", relation: "flows-to", note: "lacrimal artery" },
      { concept: "superior-rectus-eye", relation: "flows-to", note: "muscular branches" },
      { concept: "levator-palpebrae-superioris", relation: "flows-to", note: "muscular branches" },
      { concept: "optic-nerve", relation: "adjacent-to", note: "travels with it through the optic canal" },
      { concept: "sphenoid-bone", relation: "adjacent-to", note: "optic canal" },
    ],
    clinical:
      "Occlusion of the central retinal artery causes sudden painless loss of vision in one eye, with a pale retina and a 'cherry-red spot' at the macula.",
  },

  "anterior-cerebral-artery": {
    summary:
      "The smaller terminal branch of the internal carotid artery. It runs forward and medially above the optic nerve, is joined to its partner by the anterior communicating artery, then arches back over the corpus callosum in the longitudinal fissure to supply the medial surface of the frontal and parietal lobes.",
    latin: "Arteria cerebri anterior",
    functions: [
      "Supplies the medial frontal and parietal cortex as far back as the parieto-occipital sulcus",
      "Supplies the leg and foot areas of the motor and sensory cortex (paracentral lobule)",
      "Supplies most of the corpus callosum; its recurrent branch (artery of Heubner) supplies part of the caudate nucleus and internal capsule",
      "The anterior communicating artery completes the circle of Willis in front",
    ],
    facts: [
      { label: "Main branches", value: "Pericallosal and callosomarginal arteries, plus orbitofrontal (frontobasal) branches" },
      { label: "Circle of Willis", value: "Joined across the midline by the anterior communicating artery" },
    ],
    connections: [
      { concept: "internal-carotid-artery", relation: "branch-of" },
      { concept: "superior-frontal-gyrus", relation: "flows-to", note: "medial surface" },
      { concept: "cingulate-gyrus", relation: "flows-to" },
      { concept: "corpus-callosum", relation: "flows-to" },
      { concept: "precentral-gyrus", relation: "flows-to", note: "medial part: leg motor area" },
      { concept: "postcentral-gyrus", relation: "flows-to", note: "medial part: leg sensory area" },
      { concept: "orbital-gyrus", relation: "flows-to", note: "medial orbital surface" },
      { concept: "caudate-nucleus", relation: "flows-to", note: "head, via the recurrent artery of Heubner" },
      { concept: "optic-chiasm", relation: "adjacent-to", note: "passes above the optic nerve and chiasm" },
    ],
    clinical:
      "An ACA stroke causes weakness and sensory loss mainly in the opposite leg and foot, sometimes with behavioral change. The anterior communicating artery is one of the commonest sites of berry (saccular) aneurysms, whose rupture causes subarachnoid hemorrhage.",
  },

  "middle-cerebral-artery": {
    summary:
      "The largest terminal branch and direct continuation of the internal carotid artery. It runs laterally in the lateral (Sylvian) sulcus over the insula and fans out across most of the lateral surface of the cerebral hemisphere.",
    latin: "Arteria cerebri media",
    functions: [
      "Supplies most of the lateral hemisphere, including the motor and sensory cortex for the face and upper limb",
      "Supplies the language areas (Broca's and Wernicke's, usually in the left hemisphere) and the auditory cortex",
      "Its lenticulostriate branches supply the basal ganglia (putamen, parts of the caudate and globus pallidus) and internal capsule",
    ],
    facts: [
      { label: "Course", value: "Through the lateral sulcus, over the insula" },
      { label: "Deep branches", value: "Lenticulostriate (lateral striate) arteries, small end arteries" },
      { label: "Stroke frequency", value: "The artery most often involved in ischemic stroke" },
    ],
    connections: [
      { concept: "internal-carotid-artery", relation: "branch-of" },
      { concept: "insula", relation: "flows-to" },
      { concept: "precentral-gyrus", relation: "flows-to", note: "lateral part: face and arm motor areas" },
      { concept: "postcentral-gyrus", relation: "flows-to", note: "lateral part: face and arm sensory areas" },
      { concept: "inferior-frontal-gyrus", relation: "flows-to", note: "Broca's area" },
      { concept: "superior-temporal-gyrus", relation: "flows-to", note: "auditory cortex and Wernicke's area" },
      { concept: "supramarginal-gyrus", relation: "flows-to" },
      { concept: "putamen", relation: "flows-to", note: "lenticulostriate arteries" },
      { concept: "internal-capsule", relation: "flows-to", note: "lenticulostriate arteries" },
    ],
    clinical:
      "MCA occlusion causes contralateral weakness and sensory loss affecting the face and arm more than the leg, often with aphasia (dominant hemisphere) or neglect (non-dominant hemisphere). Rupture of hypertension-damaged lenticulostriate arteries is a classic cause of intracerebral hemorrhage.",
  },

  "posterior-cerebral-artery": {
    summary:
      "The paired terminal branches of the basilar artery, which curve around the midbrain to supply the occipital lobe, the inferior and medial temporal lobe, the thalamus and the midbrain. The posterior communicating artery (included in this group) links each one to the internal carotid artery, completing the circle of Willis.",
    latin: "Arteria cerebri posterior",
    functions: [
      "Supplies the occipital lobe, including the primary visual cortex around the calcarine sulcus",
      "Supplies the inferomedial temporal lobe (including the hippocampal region) and the splenium of the corpus callosum",
      "Its perforating branches (thalamoperforating, thalamogeniculate) supply the thalamus and midbrain",
      "The posterior communicating artery connects the carotid and vertebrobasilar circulations",
    ],
    facts: [
      { label: "Origin", value: "Bifurcation of the basilar artery at the upper border of the pons" },
      { label: "Circle of Willis", value: "Linked to the internal carotid by the posterior communicating artery" },
    ],
    connections: [
      { concept: "vertebrobasilar-arteries", relation: "branch-of", note: "terminal branches of the basilar artery" },
      { concept: "internal-carotid-artery", relation: "receives-from", note: "via the posterior communicating artery (circle of Willis)" },
      { concept: "occipital-lobe", relation: "flows-to", note: "including the primary visual cortex" },
      { concept: "thalamus", relation: "flows-to" },
      { concept: "midbrain", relation: "flows-to" },
      { concept: "hippocampus", relation: "flows-to" },
      { concept: "parahippocampal-gyrus", relation: "flows-to" },
      { concept: "corpus-callosum", relation: "flows-to", note: "splenium" },
      { concept: "lateral-geniculate-body", relation: "flows-to" },
      { concept: "oculomotor-nerve-cn-iii", relation: "adjacent-to", note: "the nerve passes between this artery and the superior cerebellar artery" },
      { concept: "cerebral-peduncle", relation: "adjacent-to", note: "winds around it" },
    ],
    clinical:
      "PCA occlusion causes a contralateral homonymous hemianopia, often with sparing of central (macular) vision because the occipital pole may also receive MCA blood. Aneurysms near the posterior communicating artery can compress the oculomotor nerve.",
  },

  "vertebrobasilar-arteries": {
    summary:
      "The posterior circulation of the brain: the two vertebral arteries, which rise through the transverse foramina of the cervical vertebrae and enter the skull through the foramen magnum, and the basilar artery they form on the front of the brainstem, together with their cerebellar, pontine and spinal branches.",
    latin: "Arteriae vertebrales et arteria basilaris",
    functions: [
      "Supply the brainstem (medulla, pons, midbrain) and cerebellum",
      "Give the anterior spinal artery to the front of the spinal cord",
      "Supply the inner ear (labyrinthine artery)",
      "The basilar artery ends as the two posterior cerebral arteries, which supply the occipital lobes",
    ],
    facts: [
      { label: "Vertebral artery course", value: "Transverse foramina of C6 to C1, over the arch of the atlas, then through the foramen magnum" },
      { label: "Basilar artery", value: "Formed at the pontomedullary junction; divides at the upper pons into the posterior cerebral arteries" },
      { label: "Cerebellar arteries", value: "Posterior inferior (from the vertebral), anterior inferior and superior (from the basilar)" },
    ],
    connections: [
      { concept: "subclavian-artery", relation: "branch-of", note: "vertebral arteries arise from its first part" },
      { concept: "posterior-cerebral-artery", relation: "gives-rise-to" },
      { concept: "medulla-oblongata", relation: "flows-to" },
      { concept: "pons", relation: "flows-to", note: "pontine branches" },
      { concept: "midbrain", relation: "flows-to" },
      { concept: "cerebellum", relation: "flows-to", note: "three pairs of cerebellar arteries" },
      { concept: "spinal-cord", relation: "flows-to", note: "anterior spinal artery" },
      { concept: "sixth-cervical-vertebra", relation: "adjacent-to", note: "usually enter the transverse foramina at C6" },
      { concept: "atlas-c1", relation: "adjacent-to", note: "groove on the posterior arch" },
      { concept: "occipital-bone", relation: "adjacent-to", note: "foramen magnum" },
    ],
    clinical:
      "Occlusion of the posterior inferior cerebellar artery or vertebral artery causes lateral medullary (Wallenberg) syndrome, and basilar artery occlusion can cause 'locked-in' syndrome or coma. Vertebral artery dissection is an important cause of stroke in young adults.",
  },

  // ─────────────────── Subclavian artery and its neck branches ───────────────────
  "subclavian-artery": {
    summary:
      "The main artery of the upper limb, which also supplies part of the brain, neck and thoracic wall. The right arises from the brachiocephalic trunk and the left from the aortic arch; each arches over the apex of the lung and the first rib, passing behind scalenus anterior, and becomes the axillary artery at the outer border of the first rib.",
    latin: "Arteria subclavia",
    functions: [
      "Supplies the upper limb (continuing as the axillary artery)",
      "Supplies the brain via the vertebral artery",
      "Supplies the thoracic wall and breast via the internal thoracic artery, and the neck and shoulder via the thyrocervical and costocervical trunks",
    ],
    facts: [
      { label: "Three parts", value: "Defined by scalenus anterior: medial to, behind and lateral to the muscle" },
      { label: "Branches", value: "Vertebral, internal thoracic, thyrocervical trunk, costocervical trunk, and often the dorsal scapular artery" },
      { label: "Ends", value: "Outer border of the first rib, becoming the axillary artery" },
    ],
    connections: [
      { concept: "brachiocephalic-trunk", relation: "branch-of", note: "right subclavian" },
      { concept: "arch-of-aorta", relation: "branch-of", note: "left subclavian" },
      { concept: "vertebrobasilar-arteries", relation: "gives-rise-to", note: "vertebral artery" },
      { concept: "internal-thoracic-artery", relation: "gives-rise-to" },
      { concept: "thyrocervical-trunk", relation: "gives-rise-to" },
      { concept: "costocervical-trunk", relation: "gives-rise-to" },
      { concept: "dorsal-scapular-artery", relation: "gives-rise-to", note: "in most people" },
      { concept: "axillary-artery", relation: "flows-to", note: "continues beyond the first rib" },
      { concept: "scalenus-anterior", relation: "adjacent-to", note: "passes behind the muscle" },
      { concept: "first-rib", relation: "adjacent-to", note: "grooves its upper surface" },
      { concept: "brachial-plexus", relation: "adjacent-to" },
      { concept: "subclavian-vein", relation: "adjacent-to", note: "vein lies in front of scalenus anterior" },
    ],
    clinical:
      "In subclavian steal syndrome, narrowing proximal to the vertebral artery makes arm exercise draw blood backward down the vertebral artery, causing dizziness. The artery can be compressed with the brachial plexus between the scalenes and first rib (thoracic outlet syndrome), for example by a cervical rib.",
  },

  "thyrocervical-trunk": {
    summary:
      "A short arterial trunk arising from the first part of the subclavian artery, near the medial border of scalenus anterior. It quickly divides into branches that supply the thyroid, larynx, neck muscles and the scapular region.",
    latin: "Truncus thyrocervicalis",
    functions: [
      "Supplies the thyroid and parathyroid glands, larynx, trachea and esophagus (inferior thyroid artery)",
      "Supplies neck and shoulder muscles (transverse cervical and suprascapular arteries)",
      "Its branches join the scapular anastomosis, an important collateral route around the shoulder",
    ],
    facts: [
      { label: "Usual branches", value: "Inferior thyroid, suprascapular and transverse cervical arteries" },
    ],
    connections: [
      { concept: "subclavian-artery", relation: "branch-of", note: "first part" },
      { concept: "inferior-thyroid-artery", relation: "gives-rise-to" },
      { concept: "suprascapular-artery", relation: "gives-rise-to" },
      { concept: "transverse-cervical-artery", relation: "gives-rise-to" },
      { concept: "superficial-cervical-artery", relation: "gives-rise-to", note: "directly, in some people" },
      { concept: "scalenus-anterior", relation: "adjacent-to", note: "arises at its medial border" },
      { concept: "phrenic-nerve", relation: "adjacent-to", note: "the nerve lies on scalenus anterior nearby" },
    ],
  },

  "inferior-thyroid-artery": {
    summary:
      "A branch of the thyrocervical trunk that ascends in the neck, then loops medially behind the carotid sheath to reach the back of the thyroid gland's lower pole. It is the main supply of the parathyroid glands.",
    latin: "Arteria thyroidea inferior",
    functions: [
      "Supplies the lower thyroid gland and usually both pairs of parathyroid glands",
      "Supplies the lower larynx (inferior laryngeal artery), trachea and cervical esophagus",
      "Gives the ascending cervical artery to the prevertebral muscles",
    ],
    facts: [
      { label: "Key relation", value: "Closely related to the recurrent laryngeal nerve near the lower pole of the thyroid" },
    ],
    connections: [
      { concept: "thyrocervical-trunk", relation: "branch-of" },
      { concept: "thyroid-gland", relation: "flows-to" },
      { concept: "trachea", relation: "flows-to" },
      { concept: "esophagus", relation: "flows-to", note: "cervical part" },
      { concept: "intrinsic-laryngeal-muscles", relation: "flows-to", note: "inferior laryngeal artery" },
      { concept: "common-carotid-artery", relation: "adjacent-to", note: "passes behind the carotid sheath" },
      { concept: "vagus-nerve-cn-x", relation: "adjacent-to", note: "its recurrent laryngeal branch crosses the artery" },
      { concept: "longus-colli", relation: "adjacent-to" },
    ],
    clinical:
      "During thyroidectomy the recurrent laryngeal nerve must be identified where it crosses this artery; injury causes hoarseness. Care is also needed to preserve the parathyroid blood supply to avoid postoperative hypocalcemia.",
  },

  "transverse-cervical-artery": {
    summary:
      "A branch of the thyrocervical trunk that runs laterally across the root of the neck, in front of scalenus anterior and the brachial plexus, toward the trapezius. In some people it divides into a superficial branch (superficial cervical artery) and a deep branch (dorsal scapular artery).",
    latin: "Arteria transversa cervicis (colli)",
    functions: [
      "Supplies trapezius and levator scapulae",
      "Can provide the dorsal scapular artery to the rhomboids and levator scapulae",
      "Takes part in the scapular anastomosis",
    ],
    connections: [
      { concept: "thyrocervical-trunk", relation: "branch-of" },
      { concept: "superficial-cervical-artery", relation: "gives-rise-to", note: "superficial branch" },
      { concept: "dorsal-scapular-artery", relation: "gives-rise-to", note: "deep branch, in some people" },
      { concept: "trapezius", relation: "flows-to" },
      { concept: "levator-scapulae", relation: "flows-to" },
      { concept: "scalenus-anterior", relation: "adjacent-to", note: "crosses in front of it" },
      { concept: "phrenic-nerve", relation: "adjacent-to" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "crosses in front of the trunks" },
    ],
  },

  "superficial-cervical-artery": {
    summary:
      "The superficial branch of the transverse cervical artery (sometimes arising directly from the thyrocervical trunk). It crosses the posterior triangle of the neck to run beneath the trapezius.",
    latin: "Arteria cervicalis superficialis",
    functions: [
      "Supplies the trapezius and levator scapulae",
      "Supplies nearby posterior neck muscles, skin and lymph nodes of the posterior triangle",
    ],
    connections: [
      { concept: "transverse-cervical-artery", relation: "branch-of", note: "superficial branch" },
      { concept: "thyrocervical-trunk", relation: "branch-of", note: "directly, in some people" },
      { concept: "trapezius", relation: "flows-to" },
      { concept: "levator-scapulae", relation: "flows-to" },
      { concept: "splenius-capitis", relation: "flows-to" },
    ],
  },

  "dorsal-scapular-artery": {
    summary:
      "An artery that usually arises from the subclavian artery (or as the deep branch of the transverse cervical artery), passes between the trunks of the brachial plexus and runs down the medial border of the scapula deep to the rhomboids with the dorsal scapular nerve.",
    latin: "Arteria dorsalis scapulae",
    functions: [
      "Supplies the rhomboids and levator scapulae",
      "Forms part of the scapular anastomosis around the scapula",
    ],
    connections: [
      { concept: "subclavian-artery", relation: "branch-of", note: "usually its second or third part" },
      { concept: "transverse-cervical-artery", relation: "branch-of", note: "as its deep branch in some people" },
      { concept: "rhomboid-major", relation: "flows-to" },
      { concept: "rhomboid-minor", relation: "flows-to" },
      { concept: "levator-scapulae", relation: "flows-to" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "passes between its trunks" },
      { concept: "scapula", relation: "adjacent-to", note: "runs along the medial border" },
      { concept: "circumflex-scapular-artery", relation: "adjacent-to", note: "anastomoses with it (scapular anastomosis)" },
    ],
  },

  "costocervical-trunk": {
    summary:
      "A short branch from the back of the subclavian artery (second part on the right, usually first part on the left) that arches backward over the apex of the lung to the neck of the first rib, where it divides into the deep cervical and superior intercostal arteries.",
    latin: "Truncus costocervicalis",
    functions: [
      "Supplies the deep muscles of the back of the neck (deep cervical artery)",
      "Supplies the first two intercostal spaces (superior intercostal artery)",
    ],
    connections: [
      { concept: "subclavian-artery", relation: "branch-of" },
      { concept: "deep-cervical-artery", relation: "gives-rise-to" },
      { concept: "intercostal-arteries", relation: "gives-rise-to", note: "superior intercostal artery: 1st and 2nd posterior intercostal arteries" },
      { concept: "first-rib", relation: "adjacent-to", note: "divides at the neck of the first rib" },
      { concept: "superior-lobe-of-lung", relation: "adjacent-to", note: "arches over the lung apex (cervical pleura)" },
    ],
  },

  "deep-cervical-artery": {
    summary:
      "A branch of the costocervical trunk that passes backward between the transverse process of C7 and the neck of the first rib, then ascends between semispinalis capitis and semispinalis cervicis to supply the deep posterior neck muscles.",
    latin: "Arteria cervicalis profunda",
    functions: [
      "Supplies the deep muscles of the back of the neck",
      "Anastomoses with branches of the occipital and vertebral arteries, providing collateral flow",
    ],
    connections: [
      { concept: "costocervical-trunk", relation: "branch-of" },
      { concept: "semispinalis-capitis", relation: "flows-to" },
      { concept: "semispinalis-cervicis", relation: "flows-to" },
      { concept: "deep-back-muscles-transversospinales", relation: "flows-to", note: "cervical part" },
      { concept: "seventh-cervical-vertebra", relation: "adjacent-to", note: "passes behind its transverse process" },
      { concept: "first-rib", relation: "adjacent-to" },
      { concept: "vertebrobasilar-arteries", relation: "adjacent-to", note: "anastomoses with vertebral artery branches" },
    ],
  },

  "suprascapular-artery": {
    summary:
      "A branch of the thyrocervical trunk that runs laterally behind the clavicle to the upper border of the scapula, passes over the superior transverse scapular ligament (the suprascapular nerve passes under it) and supplies the muscles on the back of the scapula.",
    latin: "Arteria suprascapularis",
    functions: [
      "Supplies supraspinatus and infraspinatus",
      "Supplies the clavicle, scapula and the acromioclavicular and shoulder joints",
      "Key member of the scapular anastomosis linking subclavian and axillary arteries",
    ],
    facts: [
      { label: "Memory aid", value: "The artery goes over the ligament and the nerve goes under ('the army goes over the bridge, the navy under')" },
    ],
    connections: [
      { concept: "thyrocervical-trunk", relation: "branch-of" },
      { concept: "supraspinatus", relation: "flows-to" },
      { concept: "infraspinatus", relation: "flows-to" },
      { concept: "scapula", relation: "flows-to" },
      { concept: "suprascapular-vein", relation: "adjacent-to" },
      { concept: "clavicle", relation: "adjacent-to", note: "runs behind it" },
      { concept: "brachial-plexus", relation: "adjacent-to" },
      { concept: "circumflex-scapular-artery", relation: "adjacent-to", note: "anastomoses with it (scapular anastomosis)" },
    ],
    clinical:
      "Through the scapular anastomosis, the suprascapular and dorsal scapular arteries can keep the arm supplied if the axillary artery is slowly blocked or ligated between the thyrocervical trunk and the subscapular artery.",
  },

  // ─────────────────────────── Upper limb arteries ───────────────────────────
  "axillary-artery": {
    summary:
      "The continuation of the subclavian artery through the armpit, from the outer border of the first rib to the lower border of teres major, where it becomes the brachial artery. Pectoralis minor crosses it, dividing it into three parts with one, two and three branches respectively.",
    latin: "Arteria axillaris",
    functions: [
      "Carries oxygenated blood to the upper limb",
      "Supplies the shoulder, pectoral region, lateral thoracic wall and scapular muscles through its six branches",
    ],
    facts: [
      { label: "Part 1 (medial to pectoralis minor)", value: "Superior thoracic artery" },
      { label: "Part 2 (behind pectoralis minor)", value: "Thoraco-acromial and lateral thoracic arteries" },
      { label: "Part 3 (lateral to pectoralis minor)", value: "Subscapular, anterior and posterior circumflex humeral arteries" },
    ],
    connections: [
      { concept: "subclavian-artery", relation: "receives-from", note: "continuation at the first rib" },
      { concept: "brachial-artery", relation: "flows-to", note: "continues beyond teres major" },
      { concept: "thoraco-acromial-artery", relation: "gives-rise-to" },
      { concept: "lateral-thoracic-artery", relation: "gives-rise-to" },
      { concept: "subscapular-artery", relation: "gives-rise-to" },
      { concept: "anterior-circumflex-humeral-artery", relation: "gives-rise-to" },
      { concept: "posterior-circumflex-humeral-artery", relation: "gives-rise-to" },
      { concept: "axillary-vein", relation: "adjacent-to", note: "vein lies medial to the artery" },
      { concept: "brachial-plexus", relation: "adjacent-to", note: "cords are named by their relation to the artery's second part" },
      { concept: "pectoralis-minor", relation: "adjacent-to", note: "crosses in front of it" },
      { concept: "teres-major", relation: "adjacent-to", note: "lower border marks its end" },
    ],
    clinical:
      "Because of the scapular anastomosis, the axillary artery can be ligated between the thyrocervical trunk and the subscapular artery without losing the limb. It can be injured in shoulder dislocation or fractures of the humeral neck.",
  },

  "thoraco-acromial-artery": {
    summary:
      "A short, wide trunk from the second part of the axillary artery that pierces the clavipectoral fascia above pectoralis minor and splits into pectoral, deltoid, acromial and clavicular branches.",
    latin: "Arteria thoracoacromialis",
    functions: [
      "Supplies pectoralis major and minor (pectoral branches)",
      "Supplies the deltoid and acromial region (deltoid and acromial branches)",
      "Supplies subclavius and the sternoclavicular joint (clavicular branch)",
    ],
    connections: [
      { concept: "axillary-artery", relation: "branch-of", note: "second part" },
      { concept: "pectoralis-major", relation: "flows-to" },
      { concept: "pectoralis-minor", relation: "flows-to" },
      { concept: "deltoid", relation: "flows-to" },
      { concept: "subclavius", relation: "flows-to" },
      { concept: "cephalic-vein", relation: "adjacent-to", note: "also pierces the clavipectoral fascia" },
    ],
    clinical:
      "Its pectoral branch is the vascular pedicle of the pectoralis major flap, used in head and neck reconstruction.",
  },

  "lateral-thoracic-artery": {
    summary:
      "A branch of the second part of the axillary artery that descends along the lower border of pectoralis minor onto the lateral chest wall.",
    latin: "Arteria thoracica lateralis",
    functions: [
      "Supplies serratus anterior and the pectoral muscles",
      "Supplies the lateral part of the breast (lateral mammary branches)",
      "Supplies axillary lymph nodes and the lateral thoracic wall",
    ],
    connections: [
      { concept: "axillary-artery", relation: "branch-of", note: "second part" },
      { concept: "serratus-anterior", relation: "flows-to" },
      { concept: "pectoralis-major", relation: "flows-to" },
      { concept: "pectoralis-minor", relation: "flows-to" },
      { concept: "mammary-gland", relation: "flows-to", note: "lateral part of the breast" },
      { concept: "lateral-thoracic-vein", relation: "adjacent-to" },
    ],
    sexDifferences: "Its lateral mammary branches are larger in females, where they are an important supply to the lateral breast.",
  },

  "subscapular-artery": {
    summary:
      "The largest branch of the axillary artery, arising from its third part and running down the lateral border of subscapularis. It soon divides into the circumflex scapular and thoracodorsal arteries.",
    latin: "Arteria subscapularis",
    functions: [
      "Supplies subscapularis",
      "Supplies the back of the scapula (circumflex scapular) and latissimus dorsi (thoracodorsal)",
      "Links into the scapular anastomosis",
    ],
    connections: [
      { concept: "axillary-artery", relation: "branch-of", note: "third part" },
      { concept: "circumflex-scapular-artery", relation: "gives-rise-to" },
      { concept: "thoracodorsal-artery", relation: "gives-rise-to" },
      { concept: "subscapularis", relation: "flows-to" },
      { concept: "subscapular-vein", relation: "adjacent-to" },
      { concept: "teres-major", relation: "adjacent-to" },
    ],
    clinical:
      "Collateral flow from the scapular anastomosis enters the axillary artery through this branch when the proximal axillary or subclavian artery is blocked.",
  },

  "circumflex-scapular-artery": {
    summary:
      "A branch of the subscapular artery that passes backward through the triangular space (between teres minor, teres major and the long head of triceps) to the dorsal surface of the scapula.",
    latin: "Arteria circumflexa scapulae",
    functions: [
      "Supplies infraspinatus, teres major and teres minor",
      "Anastomoses with the suprascapular and dorsal scapular arteries (scapular anastomosis)",
    ],
    connections: [
      { concept: "subscapular-artery", relation: "branch-of" },
      { concept: "infraspinatus", relation: "flows-to" },
      { concept: "teres-minor", relation: "flows-to" },
      { concept: "teres-major", relation: "flows-to" },
      { concept: "circumflex-scapular-vein", relation: "adjacent-to" },
      { concept: "triceps-brachii", relation: "adjacent-to", note: "long head borders the triangular space" },
      { concept: "scapula", relation: "adjacent-to" },
      { concept: "suprascapular-artery", relation: "adjacent-to", note: "anastomoses with it" },
    ],
    clinical: "It is the vascular pedicle of the scapular and parascapular free flaps used in reconstructive surgery.",
  },

  "thoracodorsal-artery": {
    summary:
      "The continuation of the subscapular artery, running down the posterior axillary wall with the thoracodorsal nerve to enter the deep surface of latissimus dorsi.",
    latin: "Arteria thoracodorsalis",
    functions: [
      "Main blood supply of latissimus dorsi",
      "Gives branches to serratus anterior and the lateral chest wall",
    ],
    connections: [
      { concept: "subscapular-artery", relation: "branch-of" },
      { concept: "latissimus-dorsi", relation: "flows-to" },
      { concept: "serratus-anterior", relation: "flows-to" },
      { concept: "thoracodorsal-vein", relation: "adjacent-to" },
    ],
    clinical: "It is the pedicle of the latissimus dorsi flap, widely used in breast reconstruction.",
  },

  "anterior-circumflex-humeral-artery": {
    summary:
      "A small branch of the third part of the axillary artery that passes laterally in front of the surgical neck of the humerus, deep to coracobrachialis and biceps, and anastomoses with the posterior circumflex humeral artery.",
    latin: "Arteria circumflexa humeri anterior",
    functions: [
      "Its ascending branch runs up the intertubercular groove to supply the humeral head and shoulder joint",
      "Supplies nearby muscles (biceps, coracobrachialis, deltoid)",
    ],
    connections: [
      { concept: "axillary-artery", relation: "branch-of", note: "third part" },
      { concept: "humerus", relation: "flows-to", note: "head, via the ascending branch" },
      { concept: "biceps-brachii", relation: "flows-to" },
      { concept: "coracobrachialis", relation: "flows-to" },
      { concept: "anterior-circumflex-humeral-vein", relation: "adjacent-to" },
      { concept: "posterior-circumflex-humeral-artery", relation: "adjacent-to", note: "anastomoses around the surgical neck" },
    ],
    clinical:
      "Damage in proximal humerus fractures can contribute to avascular necrosis of the humeral head, although the posterior circumflex humeral artery is now thought to provide most of the head's blood supply.",
  },

  "posterior-circumflex-humeral-artery": {
    summary:
      "A larger branch of the third part of the axillary artery that passes backward with the axillary nerve through the quadrangular space and winds around the surgical neck of the humerus.",
    latin: "Arteria circumflexa humeri posterior",
    functions: [
      "Supplies the deltoid, teres minor and triceps",
      "Supplies the shoulder joint and much of the humeral head",
      "Anastomoses with the anterior circumflex humeral and deep brachial arteries",
    ],
    connections: [
      { concept: "axillary-artery", relation: "branch-of", note: "third part" },
      { concept: "deltoid", relation: "flows-to" },
      { concept: "teres-minor", relation: "flows-to" },
      { concept: "triceps-brachii", relation: "flows-to" },
      { concept: "humerus", relation: "flows-to", note: "head and surgical neck" },
      { concept: "axillary-nerve", relation: "adjacent-to", note: "travel together through the quadrangular space" },
      { concept: "teres-major", relation: "adjacent-to", note: "lower border of the quadrangular space" },
      { concept: "anterior-circumflex-humeral-artery", relation: "adjacent-to", note: "anastomoses with it" },
    ],
    clinical:
      "It is at risk, together with the axillary nerve, in fractures of the surgical neck of the humerus and in shoulder dislocation.",
  },

  "brachial-artery": {
    summary:
      "The main artery of the arm, continuing from the axillary artery at the lower border of teres major. It runs down the medial side of the arm with the median nerve and ends in the cubital fossa, opposite the neck of the radius, by dividing into the radial and ulnar arteries.",
    latin: "Arteria brachialis",
    functions: [
      "Supplies the anterior arm muscles and, via the deep brachial artery, the triceps",
      "Gives the ulnar collateral arteries to the anastomosis around the elbow",
      "Divides into the radial and ulnar arteries for the forearm and hand",
    ],
    facts: [
      { label: "Brachial pulse", value: "Medial to the biceps tendon in the cubital fossa; used when measuring blood pressure" },
      { label: "Termination", value: "Cubital fossa, level with the neck of the radius" },
      { label: "Relation to median nerve", value: "The nerve crosses from lateral to medial in front of the artery in mid-arm" },
    ],
    connections: [
      { concept: "axillary-artery", relation: "receives-from", note: "continuation at teres major" },
      { concept: "deep-brachial-artery", relation: "gives-rise-to" },
      { concept: "superior-ulnar-collateral-artery", relation: "gives-rise-to" },
      { concept: "inferior-ulnar-collateral-artery", relation: "gives-rise-to" },
      { concept: "radial-artery", relation: "gives-rise-to", note: "terminal branch" },
      { concept: "ulnar-artery", relation: "gives-rise-to", note: "terminal branch" },
      { concept: "biceps-brachii", relation: "flows-to" },
      { concept: "brachialis", relation: "flows-to" },
      { concept: "median-nerve", relation: "adjacent-to" },
      { concept: "medial-brachial-vein", relation: "adjacent-to", note: "paired brachial veins accompany it" },
      { concept: "humerus", relation: "adjacent-to" },
    ],
    clinical:
      "Blood pressure is routinely measured over this artery with a cuff and stethoscope. A displaced supracondylar fracture of the humerus in a child can injure it, risking forearm muscle ischemia (Volkmann ischemic contracture).",
  },

  "deep-brachial-artery": {
    summary:
      "The largest branch of the brachial artery (profunda brachii), which accompanies the radial nerve in the radial groove on the back of the humerus and ends in collateral branches that join the anastomosis around the elbow.",
    latin: "Arteria profunda brachii",
    functions: [
      "Main supply of the triceps brachii",
      "Its radial and middle collateral branches join the elbow anastomosis",
      "A deltoid branch anastomoses with the posterior circumflex humeral artery",
    ],
    connections: [
      { concept: "brachial-artery", relation: "branch-of" },
      { concept: "triceps-brachii", relation: "flows-to" },
      { concept: "radial-nerve", relation: "adjacent-to", note: "run together in the radial groove" },
      { concept: "humerus", relation: "adjacent-to", note: "radial (spiral) groove" },
      { concept: "radial-recurrent-artery", relation: "adjacent-to", note: "radial collateral branch anastomoses with it" },
      { concept: "recurrent-interosseous-artery", relation: "adjacent-to", note: "middle collateral branch anastomoses with it" },
    ],
    clinical:
      "A fracture of the shaft of the humerus can injure this artery and the radial nerve where they lie in the radial groove.",
  },

  "superior-ulnar-collateral-artery": {
    summary:
      "A branch of the brachial artery near the middle of the arm that accompanies the ulnar nerve down behind the medial epicondyle.",
    latin: "Arteria collateralis ulnaris superior",
    functions: [
      "Supplies the medial head of triceps and the ulnar nerve",
      "Joins the elbow anastomosis with the posterior ulnar recurrent artery",
    ],
    connections: [
      { concept: "brachial-artery", relation: "branch-of" },
      { concept: "triceps-brachii", relation: "flows-to", note: "medial head" },
      { concept: "ulnar-nerve", relation: "adjacent-to", note: "runs with it behind the medial epicondyle" },
      { concept: "humerus", relation: "adjacent-to", note: "medial epicondyle" },
      { concept: "posterior-ulnar-recurrent-artery", relation: "adjacent-to", note: "anastomoses with it" },
    ],
  },

  "inferior-ulnar-collateral-artery": {
    summary:
      "A branch of the brachial artery that arises a few centimetres above the elbow and passes in front of the medial epicondyle to join the anastomosis around the elbow.",
    latin: "Arteria collateralis ulnaris inferior",
    functions: [
      "Supplies the lower brachialis and nearby structures",
      "Joins the elbow anastomosis, mainly with the anterior ulnar recurrent artery",
    ],
    connections: [
      { concept: "brachial-artery", relation: "branch-of" },
      { concept: "brachialis", relation: "flows-to" },
      { concept: "humerus", relation: "adjacent-to", note: "passes in front of the medial epicondyle" },
      { concept: "anterior-ulnar-recurrent-artery", relation: "adjacent-to", note: "anastomoses with it" },
    ],
  },

  "radial-artery": {
    summary:
      "The smaller terminal branch of the brachial artery, running down the lateral forearm under brachioradialis. At the wrist it lies just lateral to the flexor carpi radialis tendon, then crosses the anatomical snuffbox to the back of the hand and enters the palm to form the deep palmar arch.",
    latin: "Arteria radialis",
    functions: [
      "Supplies the lateral forearm muscles",
      "Forms most of the deep palmar arch and supplies the thumb and index finger",
      "Its radial recurrent branch joins the elbow anastomosis",
    ],
    facts: [
      { label: "Radial pulse", value: "Anterior wrist, lateral to the flexor carpi radialis tendon, against the distal radius" },
      { label: "Snuffbox", value: "Crosses the floor of the anatomical snuffbox over the scaphoid and trapezium" },
    ],
    connections: [
      { concept: "brachial-artery", relation: "branch-of" },
      { concept: "radial-recurrent-artery", relation: "gives-rise-to" },
      { concept: "arteries-of-the-hand", relation: "gives-rise-to", note: "deep palmar arch, princeps pollicis, radialis indicis, superficial palmar branch" },
      { concept: "brachioradialis", relation: "adjacent-to", note: "covers it in the forearm" },
      { concept: "flexor-carpi-radialis", relation: "adjacent-to", note: "tendon lies medial to the pulse" },
      { concept: "radius", relation: "adjacent-to" },
      { concept: "radial-nerve", relation: "adjacent-to", note: "superficial branch lies lateral to it in the forearm" },
      { concept: "radial-vein", relation: "adjacent-to" },
      { concept: "scaphoid-bone", relation: "adjacent-to", note: "floor of the snuffbox" },
    ],
    clinical:
      "The radial artery is the usual site for taking the pulse, arterial blood gas sampling and arterial lines, and a common access route for coronary angiography; the Allen test checks that the ulnar artery can supply the hand first. It is also used as a coronary bypass graft.",
  },

  "radial-recurrent-artery": {
    summary:
      "A branch of the radial artery just below the elbow that ascends in front of the lateral epicondyle, between brachioradialis and brachialis, with the radial nerve.",
    latin: "Arteria recurrens radialis",
    functions: [
      "Supplies brachioradialis, brachialis and supinator",
      "Anastomoses with the radial collateral branch of the deep brachial artery (elbow anastomosis)",
    ],
    connections: [
      { concept: "radial-artery", relation: "branch-of" },
      { concept: "brachioradialis", relation: "flows-to" },
      { concept: "brachialis", relation: "flows-to" },
      { concept: "supinator", relation: "flows-to" },
      { concept: "radial-nerve", relation: "adjacent-to" },
      { concept: "deep-brachial-artery", relation: "adjacent-to", note: "anastomoses with its radial collateral branch" },
    ],
  },

  "ulnar-artery": {
    summary:
      "The larger terminal branch of the brachial artery. It passes deep to pronator teres, descends on the medial forearm under flexor carpi ulnaris with the ulnar nerve, and crosses the wrist superficial to the flexor retinaculum, beside the pisiform, to form most of the superficial palmar arch.",
    latin: "Arteria ulnaris",
    functions: [
      "Supplies the medial and deep forearm muscles",
      "Gives the common interosseous artery, which supplies the deep forearm and both forearm bones",
      "Forms most of the superficial palmar arch supplying the fingers",
      "Its recurrent branches join the elbow anastomosis",
    ],
    facts: [
      { label: "Ulnar pulse", value: "Anterior wrist, lateral to the flexor carpi ulnaris tendon, near the pisiform" },
      { label: "At the wrist", value: "Passes through the ulnar (Guyon) canal with the ulnar nerve" },
    ],
    connections: [
      { concept: "brachial-artery", relation: "branch-of" },
      { concept: "anterior-ulnar-recurrent-artery", relation: "gives-rise-to" },
      { concept: "posterior-ulnar-recurrent-artery", relation: "gives-rise-to" },
      { concept: "common-interosseous-artery", relation: "gives-rise-to" },
      { concept: "arteries-of-the-hand", relation: "gives-rise-to", note: "superficial palmar arch and deep palmar branch" },
      { concept: "flexor-carpi-ulnaris", relation: "flows-to" },
      { concept: "flexor-digitorum-superficialis", relation: "flows-to" },
      { concept: "ulnar-nerve", relation: "adjacent-to", note: "nerve lies on its medial side" },
      { concept: "ulnar-vein", relation: "adjacent-to" },
      { concept: "pronator-teres", relation: "adjacent-to", note: "passes deep to it" },
      { concept: "pisiform-bone", relation: "adjacent-to" },
      { concept: "flexor-retinaculum-of-wrist", relation: "adjacent-to", note: "crosses superficial to it" },
    ],
    clinical:
      "Repeated use of the palm as a hammer can damage the artery over the hook of the hamate, causing thrombosis and finger ischemia (hypothenar hammer syndrome).",
  },

  "anterior-ulnar-recurrent-artery": {
    summary:
      "A small branch of the ulnar artery just below the elbow that ascends between brachialis and pronator teres in front of the medial epicondyle.",
    latin: "Arteria recurrens ulnaris, ramus anterior",
    functions: [
      "Supplies brachialis and pronator teres",
      "Anastomoses with the inferior ulnar collateral artery (elbow anastomosis)",
    ],
    connections: [
      { concept: "ulnar-artery", relation: "branch-of" },
      { concept: "brachialis", relation: "flows-to" },
      { concept: "pronator-teres", relation: "flows-to" },
      { concept: "humerus", relation: "adjacent-to", note: "in front of the medial epicondyle" },
      { concept: "inferior-ulnar-collateral-artery", relation: "adjacent-to", note: "anastomoses with it" },
    ],
  },

  "posterior-ulnar-recurrent-artery": {
    summary:
      "A branch of the ulnar artery just below the elbow that ascends behind the medial epicondyle, between the heads of flexor carpi ulnaris, alongside the ulnar nerve.",
    latin: "Arteria recurrens ulnaris, ramus posterior",
    functions: [
      "Supplies flexor carpi ulnaris, the ulnar nerve and the elbow joint",
      "Anastomoses with the superior ulnar collateral artery (elbow anastomosis)",
    ],
    connections: [
      { concept: "ulnar-artery", relation: "branch-of" },
      { concept: "flexor-carpi-ulnaris", relation: "flows-to" },
      { concept: "ulnar-nerve", relation: "adjacent-to" },
      { concept: "humerus", relation: "adjacent-to", note: "behind the medial epicondyle" },
      { concept: "superior-ulnar-collateral-artery", relation: "adjacent-to", note: "anastomoses with it" },
    ],
  },

  "common-interosseous-artery": {
    summary:
      "A short trunk (about 1 cm) from the ulnar artery in the lower cubital fossa that divides at the upper border of the interosseous membrane into the anterior and posterior interosseous arteries.",
    latin: "Arteria interossea communis",
    functions: [
      "Distributes blood to the deep flexor and extensor compartments of the forearm",
      "Its branches supply the radius and ulna (nutrient arteries)",
    ],
    connections: [
      { concept: "ulnar-artery", relation: "branch-of" },
      { concept: "anterior-interosseous-artery", relation: "gives-rise-to" },
      { concept: "recurrent-interosseous-artery", relation: "gives-rise-to", note: "via the posterior interosseous artery" },
      { concept: "interosseous-membrane-of-forearm", relation: "adjacent-to", note: "divides at its upper border" },
    ],
  },

  "anterior-interosseous-artery": {
    summary:
      "A branch of the common interosseous artery that descends on the front of the interosseous membrane with the anterior interosseous nerve, between flexor digitorum profundus and flexor pollicis longus, then pierces the membrane above pronator quadratus.",
    latin: "Arteria interossea anterior",
    functions: [
      "Supplies the deep forearm flexors",
      "Gives nutrient arteries to the radius and ulna",
      "Reaches the back of the wrist to join the dorsal carpal network",
    ],
    connections: [
      { concept: "common-interosseous-artery", relation: "branch-of" },
      { concept: "flexor-digitorum-profundus", relation: "flows-to" },
      { concept: "flexor-pollicis-longus", relation: "flows-to" },
      { concept: "pronator-quadratus", relation: "flows-to" },
      { concept: "radius", relation: "flows-to", note: "nutrient artery" },
      { concept: "ulna", relation: "flows-to", note: "nutrient artery" },
      { concept: "interosseous-membrane-of-forearm", relation: "adjacent-to" },
      { concept: "median-nerve", relation: "adjacent-to", note: "accompanied by its anterior interosseous branch" },
    ],
  },

  "recurrent-interosseous-artery": {
    summary:
      "A small branch, usually of the posterior interosseous artery, that ascends behind the lateral epicondyle between supinator and anconeus.",
    latin: "Arteria interossea recurrens",
    functions: [
      "Supplies supinator, anconeus and the back of the elbow",
      "Anastomoses with the middle collateral branch of the deep brachial artery (elbow anastomosis)",
    ],
    connections: [
      { concept: "common-interosseous-artery", relation: "branch-of", note: "usually via the posterior interosseous artery" },
      { concept: "supinator", relation: "flows-to" },
      { concept: "anconeus", relation: "flows-to" },
      { concept: "humerus", relation: "adjacent-to", note: "behind the lateral epicondyle" },
      { concept: "deep-brachial-artery", relation: "adjacent-to", note: "anastomoses with its middle collateral branch" },
    ],
  },

  "arteries-of-the-hand": {
    summary:
      "The arterial network of the hand: the superficial palmar arch (mainly from the ulnar artery), the deep palmar arch (mainly from the radial artery) and their common and proper palmar digital, palmar and dorsal metacarpal, princeps pollicis and radialis indicis branches, plus the dorsal carpal network.",
    latin: "Arcus palmaris superficialis et profundus",
    functions: [
      "Supply the fingers through palmar digital arteries",
      "Supply the intrinsic hand muscles",
      "The two arches interconnect, so the hand usually survives loss of either the radial or the ulnar artery",
    ],
    facts: [
      { label: "Superficial palmar arch", value: "Mainly ulnar artery, completed by the superficial palmar branch of the radial; lies more distal" },
      { label: "Deep palmar arch", value: "Mainly radial artery, completed by the deep branch of the ulnar; lies across the metacarpal bases" },
    ],
    connections: [
      { concept: "radial-artery", relation: "branch-of", note: "deep palmar arch, princeps pollicis, radialis indicis" },
      { concept: "ulnar-artery", relation: "branch-of", note: "superficial palmar arch" },
      { concept: "intrinsic-muscles-of-hand", relation: "flows-to" },
      { concept: "adductor-pollicis", relation: "flows-to" },
      { concept: "phalanges-of-thumb", relation: "flows-to", note: "princeps pollicis artery" },
      { concept: "phalanges-of-index-finger", relation: "flows-to", note: "radialis indicis and digital arteries" },
      { concept: "deep-veins-of-the-hand", relation: "adjacent-to", note: "venae comitantes" },
      { concept: "median-nerve", relation: "adjacent-to", note: "superficial arch lies over its digital branches" },
      { concept: "flexor-retinaculum-of-wrist", relation: "adjacent-to" },
    ],
    clinical:
      "The Allen test checks that both arches are connected before the radial artery is cannulated or harvested. Digital arteries spasm excessively in Raynaud phenomenon, turning the fingers white then blue in the cold.",
  },

  // ─────────────────────── Neck, upper limb and thoracic outlet veins ───────────────────────
  "internal-jugular-vein": {
    summary:
      "The main vein draining the brain, face and neck. It begins at the jugular foramen as the continuation of the sigmoid dural sinus, descends in the carotid sheath lateral to the carotid arteries, and joins the subclavian vein behind the sternal end of the clavicle to form the brachiocephalic vein.",
    latin: "Vena jugularis interna",
    functions: [
      "Drains the brain via the dural venous sinuses",
      "Drains the face, tongue, pharynx and thyroid through the facial, lingual, pharyngeal and thyroid veins",
      "Its pulsations in the neck (the jugular venous pulse) reflect right atrial pressure",
    ],
    facts: [
      { label: "Beginning", value: "Jugular foramen, as the continuation of the sigmoid sinus" },
      { label: "End", value: "Joins the subclavian vein behind the sternoclavicular joint (venous angle)" },
    ],
    connections: [
      { concept: "brachiocephalic-vein", relation: "flows-to" },
      { concept: "thyroid-gland", relation: "receives-from", note: "superior and middle thyroid veins" },
      { concept: "tongue", relation: "receives-from", note: "lingual veins" },
      { concept: "muscles-of-facial-expression", relation: "receives-from", note: "via the facial vein" },
      { concept: "common-carotid-artery", relation: "adjacent-to", note: "in the carotid sheath" },
      { concept: "internal-carotid-artery", relation: "adjacent-to", note: "in the carotid sheath" },
      { concept: "vagus-nerve-cn-x", relation: "adjacent-to", note: "in the carotid sheath" },
      { concept: "sternocleidomastoid", relation: "adjacent-to", note: "covered by it" },
      { concept: "subclavian-vein", relation: "adjacent-to", note: "joins it at the venous angle" },
    ],
    clinical:
      "The right internal jugular vein is a preferred site for ultrasound-guided central venous catheters, and its visible pulsation (JVP) is used to estimate right atrial pressure at the bedside.",
  },

  "subclavian-vein": {
    summary:
      "The continuation of the axillary vein from the outer border of the first rib. It passes in front of scalenus anterior (separated from the subclavian artery by the muscle) and joins the internal jugular vein behind the medial end of the clavicle to form the brachiocephalic vein.",
    latin: "Vena subclavia",
    functions: [
      "Returns blood from the upper limb toward the heart",
      "Usually receives the external jugular vein",
      "At its junction with the internal jugular (venous angle) it receives lymph from the thoracic duct (left) or right lymphatic duct (right)",
    ],
    connections: [
      { concept: "axillary-vein", relation: "receives-from", note: "continuation at the first rib" },
      { concept: "suprascapular-vein", relation: "receives-from", note: "often via the external jugular vein" },
      { concept: "brachiocephalic-vein", relation: "flows-to" },
      { concept: "internal-jugular-vein", relation: "adjacent-to", note: "joins it at the venous angle" },
      { concept: "scalenus-anterior", relation: "adjacent-to", note: "passes in front of it" },
      { concept: "subclavian-artery", relation: "adjacent-to", note: "behind the vein, across scalenus anterior" },
      { concept: "first-rib", relation: "adjacent-to" },
      { concept: "clavicle", relation: "adjacent-to" },
    ],
    clinical:
      "Subclavian central venous catheterization carries a risk of pneumothorax because the cervical pleura lies just below the vein. Compression at the thoracic outlet can cause effort thrombosis of the axillary–subclavian vein.",
  },

  "brachiocephalic-vein": {
    summary:
      "Paired veins formed behind each sternoclavicular joint by the union of the internal jugular and subclavian veins. The short right vein descends almost vertically, while the longer left vein crosses behind the manubrium, in front of the arch branches, to join the right and form the superior vena cava.",
    latin: "Vena brachiocephalica",
    functions: [
      "Collect venous blood from the head, neck and upper limbs",
      "Receive the vertebral, internal thoracic and inferior thyroid veins, and (left) the left superior intercostal and thymic veins",
      "Receive lymph from the thoracic and right lymphatic ducts at the venous angles",
    ],
    facts: [
      { label: "Length", value: "Right about 2.5 cm; left about 6 cm (more than twice as long)" },
      { label: "Union", value: "Form the SVC behind the lower border of the right 1st costal cartilage" },
    ],
    connections: [
      { concept: "internal-jugular-vein", relation: "receives-from" },
      { concept: "subclavian-vein", relation: "receives-from" },
      { concept: "internal-thoracic-vein", relation: "receives-from" },
      { concept: "intercostal-veins", relation: "receives-from", note: "first posterior intercostal and left superior intercostal veins" },
      { concept: "thymus", relation: "receives-from", note: "thymic veins, mainly into the left vein" },
      { concept: "thyroid-gland", relation: "receives-from", note: "inferior thyroid veins" },
      { concept: "superior-vena-cava", relation: "flows-to" },
      { concept: "brachiocephalic-trunk", relation: "adjacent-to", note: "left vein crosses in front of the arch branches" },
      { concept: "manubrium-of-sternum", relation: "adjacent-to" },
    ],
    clinical:
      "In infants and young children the left brachiocephalic vein can rise above the jugular notch, where it is at risk during tracheostomy. Central lines and pacemaker leads usually pass through these veins.",
  },

  "axillary-vein": {
    summary:
      "The large vein of the armpit, formed at the lower border of teres major by the union of the basilic vein and the brachial veins. It ascends medial to the axillary artery, receives the cephalic vein, and becomes the subclavian vein at the outer border of the first rib.",
    latin: "Vena axillaris",
    functions: [
      "Drains the whole upper limb, including both superficial and deep veins",
      "Receives tributaries corresponding to the axillary artery's branches from the shoulder and chest wall",
    ],
    connections: [
      { concept: "basilic-vein", relation: "receives-from" },
      { concept: "medial-brachial-vein", relation: "receives-from", note: "brachial veins" },
      { concept: "cephalic-vein", relation: "receives-from", note: "through the clavipectoral fascia" },
      { concept: "subscapular-vein", relation: "receives-from" },
      { concept: "lateral-thoracic-vein", relation: "receives-from" },
      { concept: "anterior-circumflex-humeral-vein", relation: "receives-from" },
      { concept: "subclavian-vein", relation: "flows-to" },
      { concept: "axillary-artery", relation: "adjacent-to", note: "lies medial to it" },
      { concept: "brachial-plexus", relation: "adjacent-to" },
    ],
    clinical:
      "Axillary–subclavian vein thrombosis (Paget–Schroetter syndrome, or effort thrombosis) can follow repetitive overhead arm activity, causing a swollen, bluish arm.",
  },

  "cephalic-vein": {
    summary:
      "A superficial vein arising from the lateral (thumb) side of the dorsal venous network of the hand. It ascends along the lateral forearm and arm, runs in the deltopectoral groove, and pierces the clavipectoral fascia to end in the axillary vein.",
    latin: "Vena cephalica",
    functions: [
      "Drains superficial tissues of the lateral hand, forearm and arm",
      "Communicates with the basilic vein through the median cubital vein at the elbow",
    ],
    connections: [
      { concept: "dorsal-venous-network-of-hand", relation: "receives-from", note: "lateral side" },
      { concept: "median-cubital-vein", relation: "flows-to", note: "partly diverted to the basilic vein at the elbow" },
      { concept: "axillary-vein", relation: "flows-to" },
      { concept: "deltoid", relation: "adjacent-to", note: "deltopectoral groove" },
      { concept: "pectoralis-major", relation: "adjacent-to", note: "deltopectoral groove" },
      { concept: "biceps-brachii", relation: "adjacent-to", note: "runs lateral to it" },
    ],
    clinical:
      "The cephalic vein is used for intravenous cannulation and, in the deltopectoral groove, as an access route for pacemaker leads.",
  },

  "basilic-vein": {
    summary:
      "A superficial vein arising from the medial (little finger) side of the dorsal venous network of the hand. It ascends along the medial forearm, receives the median cubital vein, pierces the deep fascia in mid-arm and joins the brachial veins to form the axillary vein.",
    latin: "Vena basilica",
    functions: [
      "Drains superficial tissues of the medial hand, forearm and arm",
      "Provides a large, relatively straight route into the deep veins of the arm",
    ],
    connections: [
      { concept: "dorsal-venous-network-of-hand", relation: "receives-from", note: "medial side" },
      { concept: "median-cubital-vein", relation: "receives-from" },
      { concept: "median-antebrachial-vein", relation: "receives-from", note: "variable" },
      { concept: "axillary-vein", relation: "flows-to", note: "joins the brachial veins at teres major" },
      { concept: "medial-brachial-vein", relation: "adjacent-to", note: "unite to form the axillary vein" },
      { concept: "biceps-brachii", relation: "adjacent-to", note: "runs medial to it" },
    ],
    clinical:
      "The basilic vein is commonly used for peripherally inserted central catheters (PICC lines) and for creating arteriovenous fistulas for hemodialysis.",
  },

  "median-cubital-vein": {
    summary:
      "A superficial vein crossing the front of the elbow (cubital fossa) obliquely from the cephalic vein to the basilic vein. The bicipital aponeurosis separates it from the brachial artery and median nerve beneath.",
    latin: "Vena mediana cubiti",
    functions: [
      "Links the cephalic and basilic veins at the elbow",
      "Often receives the median antebrachial vein",
    ],
    connections: [
      { concept: "cephalic-vein", relation: "receives-from" },
      { concept: "median-antebrachial-vein", relation: "receives-from", note: "variable" },
      { concept: "basilic-vein", relation: "flows-to" },
      { concept: "biceps-brachii", relation: "adjacent-to", note: "bicipital aponeurosis lies beneath it" },
      { concept: "brachial-artery", relation: "adjacent-to", note: "deep to the aponeurosis" },
      { concept: "median-nerve", relation: "adjacent-to", note: "deep to the aponeurosis" },
    ],
    clinical:
      "The median cubital vein is the most common site for venipuncture (blood draws); the aponeurosis offers some protection to the artery and nerve beneath it.",
  },

  "median-antebrachial-vein": {
    summary:
      "A variable superficial vein that drains the palm and front of the forearm, ascending in the middle of the anterior forearm to end in the basilic or median cubital vein.",
    latin: "Vena mediana antebrachii",
    functions: [
      "Drains the superficial palmar venous network and anterior forearm",
    ],
    connections: [
      { concept: "basilic-vein", relation: "flows-to" },
      { concept: "median-cubital-vein", relation: "flows-to", note: "variable" },
      { concept: "skin", relation: "receives-from", note: "palm and anterior forearm" },
    ],
  },

  "dorsal-venous-network-of-hand": {
    summary:
      "A superficial network of veins on the back of the hand formed by the dorsal digital and dorsal metacarpal veins. Its lateral end drains into the cephalic vein and its medial end into the basilic vein.",
    latin: "Rete venosum dorsale manus",
    functions: [
      "Collects superficial venous blood from the fingers and hand, much of which drains dorsally",
      "Gives origin to the cephalic and basilic veins",
    ],
    connections: [
      { concept: "cephalic-vein", relation: "flows-to", note: "lateral (thumb) side" },
      { concept: "basilic-vein", relation: "flows-to", note: "medial (little finger) side" },
      { concept: "skin", relation: "receives-from", note: "back of the hand and fingers" },
    ],
    clinical: "The dorsal hand veins are a common and convenient site for intravenous cannulation.",
  },

  "deep-veins-of-the-hand": {
    summary:
      "The paired veins accompanying the palmar arterial arches and their digital and metacarpal branches (the superficial and deep palmar venous arches). They drain into the radial and ulnar veins.",
    latin: "Arcus venosus palmaris superficialis et profundus",
    functions: [
      "Drain the intrinsic hand muscles and deep palmar tissues",
      "Channel blood into the deep veins of the forearm",
    ],
    connections: [
      { concept: "radial-vein", relation: "flows-to" },
      { concept: "ulnar-vein", relation: "flows-to" },
      { concept: "intrinsic-muscles-of-hand", relation: "receives-from" },
      { concept: "arteries-of-the-hand", relation: "adjacent-to", note: "accompany the palmar arches" },
    ],
  },

  "radial-vein": {
    summary:
      "Paired deep veins (venae comitantes) that accompany the radial artery, arising from the deep palmar venous arch and joining the ulnar veins at the elbow to form the brachial veins.",
    latin: "Venae radiales",
    functions: [
      "Drain the deep lateral forearm and part of the hand",
    ],
    connections: [
      { concept: "deep-veins-of-the-hand", relation: "receives-from" },
      { concept: "brachioradialis", relation: "receives-from" },
      { concept: "medial-brachial-vein", relation: "flows-to", note: "brachial veins" },
      { concept: "radial-artery", relation: "adjacent-to" },
    ],
  },

  "ulnar-vein": {
    summary:
      "Paired deep veins (venae comitantes) that accompany the ulnar artery, arising from the palmar venous arches, receiving the interosseous veins and joining the radial veins in the cubital fossa to form the brachial veins.",
    latin: "Venae ulnares",
    functions: [
      "Drain the medial and deep forearm and part of the hand",
    ],
    connections: [
      { concept: "deep-veins-of-the-hand", relation: "receives-from" },
      { concept: "flexor-carpi-ulnaris", relation: "receives-from" },
      { concept: "medial-brachial-vein", relation: "flows-to", note: "brachial veins" },
      { concept: "ulnar-artery", relation: "adjacent-to" },
    ],
  },

  "medial-brachial-vein": {
    summary:
      "One of the paired brachial veins that accompany the brachial artery. Formed at the elbow from the radial and ulnar veins, the brachial veins ascend the arm and join the basilic vein at the lower border of teres major to form the axillary vein.",
    latin: "Venae brachiales",
    functions: [
      "Drain the deep tissues of the forearm and arm",
      "Help form the axillary vein",
    ],
    connections: [
      { concept: "radial-vein", relation: "receives-from" },
      { concept: "ulnar-vein", relation: "receives-from" },
      { concept: "axillary-vein", relation: "flows-to" },
      { concept: "basilic-vein", relation: "adjacent-to", note: "unite to form the axillary vein" },
      { concept: "brachial-artery", relation: "adjacent-to" },
      { concept: "median-nerve", relation: "adjacent-to" },
    ],
  },

  "anterior-circumflex-humeral-vein": {
    summary:
      "The companion vein of the anterior circumflex humeral artery, draining the front of the shoulder and surgical neck of the humerus into the axillary vein.",
    latin: "Vena circumflexa humeri anterior",
    functions: ["Drains the anterior shoulder region and upper humerus"],
    connections: [
      { concept: "axillary-vein", relation: "flows-to" },
      { concept: "humerus", relation: "receives-from" },
      { concept: "anterior-circumflex-humeral-artery", relation: "adjacent-to" },
    ],
  },

  "subscapular-vein": {
    summary:
      "The companion vein of the subscapular artery, formed from the circumflex scapular and thoracodorsal veins and draining into the axillary vein.",
    latin: "Vena subscapularis",
    functions: ["Drains subscapularis, the back of the scapula and latissimus dorsi"],
    connections: [
      { concept: "circumflex-scapular-vein", relation: "receives-from" },
      { concept: "thoracodorsal-vein", relation: "receives-from" },
      { concept: "subscapularis", relation: "receives-from" },
      { concept: "axillary-vein", relation: "flows-to" },
      { concept: "subscapular-artery", relation: "adjacent-to" },
    ],
  },

  "circumflex-scapular-vein": {
    summary:
      "The companion vein of the circumflex scapular artery, draining the muscles on the back of the scapula through the triangular space into the subscapular vein.",
    latin: "Vena circumflexa scapulae",
    functions: ["Drains infraspinatus, teres major and teres minor"],
    connections: [
      { concept: "infraspinatus", relation: "receives-from" },
      { concept: "teres-minor", relation: "receives-from" },
      { concept: "subscapular-vein", relation: "flows-to" },
      { concept: "circumflex-scapular-artery", relation: "adjacent-to" },
    ],
  },

  "thoracodorsal-vein": {
    summary:
      "The companion vein of the thoracodorsal artery, draining latissimus dorsi into the subscapular vein.",
    latin: "Vena thoracodorsalis",
    functions: ["Drains latissimus dorsi and part of serratus anterior"],
    connections: [
      { concept: "latissimus-dorsi", relation: "receives-from" },
      { concept: "subscapular-vein", relation: "flows-to" },
      { concept: "thoracodorsal-artery", relation: "adjacent-to" },
    ],
  },

  "suprascapular-vein": {
    summary:
      "The companion vein of the suprascapular artery, draining the supraspinous and infraspinous regions. It usually ends in the external jugular vein, which in turn drains into the subclavian vein.",
    latin: "Vena suprascapularis",
    functions: ["Drains supraspinatus, infraspinatus and the back of the scapula"],
    connections: [
      { concept: "supraspinatus", relation: "receives-from" },
      { concept: "infraspinatus", relation: "receives-from" },
      { concept: "subclavian-vein", relation: "flows-to", note: "usually via the external jugular vein" },
      { concept: "suprascapular-artery", relation: "adjacent-to" },
    ],
  },

  "lateral-thoracic-vein": {
    summary:
      "A vein running on the lateral chest wall alongside the lateral thoracic artery and draining into the axillary vein. Through the thoracoepigastric vein it connects with the superficial epigastric vein of the abdomen.",
    latin: "Vena thoracica lateralis",
    functions: [
      "Drains serratus anterior, the lateral chest wall and the lateral breast",
      "Links the axillary (superior caval) and femoral (inferior caval) venous territories through superficial veins",
    ],
    connections: [
      { concept: "serratus-anterior", relation: "receives-from" },
      { concept: "mammary-gland", relation: "receives-from", note: "lateral breast" },
      { concept: "axillary-vein", relation: "flows-to" },
      { concept: "lateral-thoracic-artery", relation: "adjacent-to" },
    ],
    clinical:
      "When the inferior (or superior) vena cava is obstructed, the thoracoepigastric connection enlarges into a visible collateral vein on the side of the trunk.",
  },

  // ─────────────────────────── Thoracic aorta and thoracic wall ───────────────────────────
  "descending-thoracic-aorta": {
    summary:
      "The part of the aorta in the posterior mediastinum. It continues from the arch at about T4/T5, descends along the left side of the vertebral bodies and passes through the aortic hiatus of the diaphragm at T12 to become the abdominal aorta.",
    latin: "Pars thoracica aortae (aorta thoracica)",
    functions: [
      "Conducts oxygenated blood from the arch to the abdomen and lower body",
      "Supplies the thoracic wall through the posterior intercostal and subcostal arteries",
      "Gives visceral branches to the bronchi, esophagus, pericardium and posterior diaphragm",
    ],
    facts: [
      { label: "Extent", value: "T4/T5 intervertebral disc to T12 (aortic hiatus)" },
      { label: "Diameter", value: "Roughly 2–2.5 cm, tapering slightly as it descends" },
      { label: "Branches", value: "Posterior intercostals (3rd–11th), subcostal, bronchial, esophageal, pericardial, mediastinal and superior phrenic arteries" },
    ],
    connections: [
      { concept: "arch-of-aorta", relation: "receives-from" },
      { concept: "abdominal-aorta", relation: "flows-to", note: "through the aortic hiatus at T12" },
      { concept: "intercostal-arteries", relation: "gives-rise-to", note: "3rd–11th posterior intercostal and subcostal arteries" },
      { concept: "bronchial-arteries", relation: "gives-rise-to" },
      { concept: "esophageal-arteries", relation: "gives-rise-to" },
      { concept: "phrenic-arteries", relation: "gives-rise-to", note: "superior phrenic arteries" },
      { concept: "esophagus", relation: "adjacent-to", note: "esophagus lies to its right, then crosses in front" },
      { concept: "azygos-system", relation: "adjacent-to" },
      { concept: "diaphragm", relation: "adjacent-to", note: "aortic hiatus" },
    ],
    clinical:
      "A Stanford type B aortic dissection involves only the descending aorta. In high-speed deceleration injuries the aorta typically tears at the isthmus, just beyond the left subclavian artery where it is tethered by the ligamentum arteriosum.",
  },

  "bronchial-arteries": {
    summary:
      "Small systemic arteries that nourish the lung's own tissue: the bronchi, supporting connective tissue and visceral pleura. Usually two left bronchial arteries arise from the thoracic aorta, while the single right one arises from a right posterior intercostal artery or the aorta.",
    latin: "Rami bronchiales",
    functions: [
      "Deliver oxygenated systemic blood to the bronchial walls and lung supporting tissue (the pulmonary arteries carry deoxygenated blood for gas exchange)",
      "Supply the walls of the large pulmonary vessels and the hilar lymph nodes",
      "Provide a second supply that protects lung tissue when a pulmonary artery branch is blocked",
    ],
    facts: [
      { label: "Blood flow", value: "Only about 1–2% of cardiac output" },
      { label: "Venous return", value: "Partly to the azygos system; much drains into the pulmonary veins (a small physiological shunt)" },
    ],
    connections: [
      { concept: "descending-thoracic-aorta", relation: "branch-of", note: "left bronchial arteries" },
      { concept: "intercostal-arteries", relation: "branch-of", note: "right bronchial artery, often from the 3rd right posterior intercostal" },
      { concept: "bronchial-tree", relation: "flows-to" },
      { concept: "main-bronchus", relation: "flows-to" },
      { concept: "superior-lobe-of-lung", relation: "flows-to", note: "supporting tissue" },
      { concept: "middle-lobe-of-lung", relation: "flows-to", note: "supporting tissue" },
      { concept: "inferior-lobe-of-lung", relation: "flows-to", note: "supporting tissue" },
      { concept: "pulmonary-vein-tributaries", relation: "flows-to", note: "part of the bronchial venous blood returns this way" },
    ],
    clinical:
      "Most episodes of massive hemoptysis (coughing blood), for example in bronchiectasis or tuberculosis, come from enlarged bronchial arteries and are treated by bronchial artery embolization.",
  },

  "esophageal-arteries": {
    summary:
      "Several small unpaired branches from the front of the descending thoracic aorta that supply the thoracic esophagus. The esophagus also receives blood from the inferior thyroid arteries above and the left gastric and inferior phrenic arteries below.",
    latin: "Rami oesophageales aortae thoracicae",
    functions: [
      "Supply the middle (thoracic) part of the esophagus",
      "Anastomose with esophageal branches of the inferior thyroid and left gastric arteries along the esophagus",
    ],
    connections: [
      { concept: "descending-thoracic-aorta", relation: "branch-of" },
      { concept: "esophagus", relation: "flows-to", note: "thoracic part" },
      { concept: "inferior-thyroid-artery", relation: "adjacent-to", note: "anastomose with its esophageal branches above" },
      { concept: "celiac-trunk-branches", relation: "adjacent-to", note: "anastomose with left gastric esophageal branches below" },
    ],
  },

  "intercostal-arteries": {
    summary:
      "The posterior intercostal arteries (with the superior intercostal and subcostal arteries), one running in each intercostal space in the costal groove below the rib. The upper two come from the costocervical trunk and the rest from the thoracic aorta; they anastomose in front with the anterior intercostal branches of the internal thoracic artery.",
    latin: "Arteriae intercostales posteriores",
    functions: [
      "Supply the intercostal muscles, overlying skin and parietal pleura",
      "Dorsal branches supply the deep back muscles and vertebrae",
      "Spinal branches help supply the spinal cord; one lower branch often gives the great radicular artery (of Adamkiewicz)",
    ],
    facts: [
      { label: "Sources", value: "1st–2nd from the superior intercostal artery (costocervical trunk); 3rd–11th and the subcostal from the thoracic aorta" },
      { label: "Order in the costal groove", value: "Vein, artery, nerve from above down (VAN)" },
    ],
    connections: [
      { concept: "descending-thoracic-aorta", relation: "branch-of", note: "3rd–11th and subcostal arteries" },
      { concept: "costocervical-trunk", relation: "branch-of", note: "1st–2nd via the superior intercostal artery" },
      { concept: "bronchial-arteries", relation: "gives-rise-to", note: "right bronchial artery, often" },
      { concept: "external-intercostal-muscles", relation: "flows-to" },
      { concept: "internal-intercostal-muscles", relation: "flows-to" },
      { concept: "innermost-intercostal-muscles", relation: "flows-to" },
      { concept: "deep-back-muscles-transversospinales", relation: "flows-to", note: "dorsal branches" },
      { concept: "spinal-cord", relation: "flows-to", note: "spinal branches" },
      { concept: "intercostal-veins", relation: "adjacent-to", note: "costal groove" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
      { concept: "internal-thoracic-artery", relation: "adjacent-to", note: "anastomose with its anterior intercostal branches" },
    ],
    clinical:
      "Needles and chest drains are passed just above the upper border of a rib to avoid the neurovascular bundle in the costal groove. In coarctation of the aorta, enlarged intercostal collaterals erode the lower rib borders, producing rib notching on X-ray.",
  },

  "internal-thoracic-artery": {
    summary:
      "A branch of the first part of the subclavian artery that descends behind the costal cartilages about 1–2 cm from the edge of the sternum. It ends in the 6th intercostal space by dividing into the superior epigastric and musculophrenic arteries.",
    latin: "Arteria thoracica interna",
    functions: [
      "Gives anterior intercostal arteries to the upper six intercostal spaces",
      "Perforating branches supply the medial breast and anterior chest skin",
      "Pericardiacophrenic branch accompanies the phrenic nerve to the pericardium and diaphragm",
      "Continues as the superior epigastric artery into rectus abdominis",
    ],
    facts: [
      { label: "Course", value: "Behind the upper six costal cartilages, in front of transversus thoracis" },
      { label: "Terminal branches", value: "Superior epigastric and musculophrenic arteries, in the 6th intercostal space" },
    ],
    connections: [
      { concept: "subclavian-artery", relation: "branch-of", note: "first part" },
      { concept: "internal-intercostal-muscles", relation: "flows-to", note: "anterior intercostal branches" },
      { concept: "mammary-gland", relation: "flows-to", note: "perforating branches to the medial breast" },
      { concept: "diaphragm", relation: "flows-to", note: "pericardiacophrenic and musculophrenic branches" },
      { concept: "rectus-abdominis", relation: "flows-to", note: "superior epigastric artery" },
      { concept: "thymus", relation: "flows-to" },
      { concept: "internal-thoracic-vein", relation: "adjacent-to" },
      { concept: "transversus-thoracis", relation: "adjacent-to", note: "lies in front of it" },
      { concept: "phrenic-nerve", relation: "adjacent-to", note: "accompanied by the pericardiacophrenic branch" },
      { concept: "intercostal-arteries", relation: "adjacent-to", note: "anastomoses with the posterior intercostals" },
    ],
    clinical:
      "The left internal thoracic (mammary) artery is the preferred conduit for coronary bypass grafting, especially to the LAD, because of its excellent long-term patency. It also carries collateral flow around a coarctation of the aorta.",
    sexDifferences: "Its perforating branches to the breast (medial mammary branches) are enlarged in females, especially during lactation.",
  },

  "internal-thoracic-vein": {
    summary:
      "The companion vein(s) of the internal thoracic artery, running behind the costal cartilages beside the sternum and ending in the brachiocephalic vein.",
    latin: "Vena thoracica interna",
    functions: [
      "Drains the anterior chest wall, including the anterior intercostal spaces and medial breast",
      "Receives the superior epigastric and musculophrenic veins from the upper abdominal wall and diaphragm",
    ],
    connections: [
      { concept: "intercostal-veins", relation: "receives-from", note: "anterior intercostal veins" },
      { concept: "mammary-gland", relation: "receives-from", note: "perforating veins" },
      { concept: "rectus-abdominis", relation: "receives-from", note: "superior epigastric veins" },
      { concept: "diaphragm", relation: "receives-from", note: "musculophrenic vein" },
      { concept: "brachiocephalic-vein", relation: "flows-to" },
      { concept: "internal-thoracic-artery", relation: "adjacent-to" },
    ],
  },

  "intercostal-veins": {
    summary:
      "The veins of the intercostal spaces, running with the intercostal arteries and nerves in the costal groove (vein uppermost). Posterior intercostal veins drain into the azygos system or brachiocephalic veins; anterior intercostal veins drain into the internal thoracic veins.",
    latin: "Venae intercostales",
    functions: [
      "Drain the intercostal muscles, chest wall skin and parietal pleura",
      "Posterior veins also drain the back muscles and vertebral venous plexuses",
    ],
    facts: [
      { label: "Drainage", value: "Right side to the azygos vein; left side to the hemiazygos and accessory hemiazygos veins; upper spaces partly to the brachiocephalic veins via the superior intercostal veins" },
    ],
    connections: [
      { concept: "azygos-system", relation: "flows-to" },
      { concept: "brachiocephalic-vein", relation: "flows-to", note: "first space and the left superior intercostal vein" },
      { concept: "internal-thoracic-vein", relation: "flows-to", note: "anterior intercostal veins" },
      { concept: "internal-intercostal-muscles", relation: "receives-from" },
      { concept: "external-intercostal-muscles", relation: "receives-from" },
      { concept: "deep-back-muscles-transversospinales", relation: "receives-from", note: "dorsal tributaries" },
      { concept: "intercostal-arteries", relation: "adjacent-to", note: "costal groove" },
      { concept: "intercostal-nerves", relation: "adjacent-to", note: "costal groove" },
    ],
  },

  "azygos-system": {
    summary:
      "A set of veins on the posterior thoracic wall beside the vertebral column: the azygos vein on the right and the hemiazygos and accessory hemiazygos veins on the left. They drain the back of the chest and abdominal walls, and the azygos arches over the root of the right lung at about T4 to enter the superior vena cava.",
    latin: "Vena azygos, vena hemiazygos et vena hemiazygos accessoria",
    functions: [
      "Drain the posterior intercostal, subcostal and upper lumbar regions",
      "Receive bronchial, esophageal and mediastinal veins",
      "Link the inferior and superior venae cavae, forming an important collateral route if either is blocked",
    ],
    facts: [
      { label: "Termination", value: "Azygos vein arches over the right main bronchus/lung root to join the SVC at about T4" },
      { label: "Crossings", value: "Hemiazygos and accessory hemiazygos cross the midline behind the aorta (around T7–T9) to join the azygos" },
    ],
    connections: [
      { concept: "superior-vena-cava", relation: "flows-to" },
      { concept: "intercostal-veins", relation: "receives-from", note: "posterior intercostal veins" },
      { concept: "lumbar-sacral-veins", relation: "receives-from", note: "ascending lumbar veins" },
      { concept: "phrenic-veins", relation: "receives-from", note: "superior phrenic veins" },
      { concept: "esophagus", relation: "receives-from", note: "esophageal veins" },
      { concept: "bronchial-tree", relation: "receives-from", note: "bronchial veins" },
      { concept: "descending-thoracic-aorta", relation: "adjacent-to" },
      { concept: "main-bronchus", relation: "adjacent-to", note: "azygos arches over the right main bronchus" },
    ],
    clinical:
      "Esophageal tributaries of the azygos system anastomose with the left gastric (portal) vein, so portal hypertension can produce dangerous esophageal varices. With IVC obstruction the azygos system enlarges to carry lower-body blood to the SVC.",
  },

  "phrenic-arteries": {
    summary:
      "The arteries named for the diaphragm: paired inferior phrenic arteries from the abdominal aorta (or celiac trunk) just below the aortic hiatus, and small superior phrenic arteries from the lower thoracic aorta.",
    latin: "Arteriae phrenicae inferiores et superiores",
    functions: [
      "Inferior phrenic arteries supply the abdominal surface of the diaphragm",
      "Inferior phrenic arteries give the superior suprarenal arteries to the adrenal glands",
      "Superior phrenic arteries supply the posterior upper surface of the diaphragm",
    ],
    connections: [
      { concept: "abdominal-aorta", relation: "branch-of", note: "inferior phrenic arteries" },
      { concept: "descending-thoracic-aorta", relation: "branch-of", note: "superior phrenic arteries" },
      { concept: "diaphragm", relation: "flows-to" },
      { concept: "adrenal-gland", relation: "flows-to", note: "superior suprarenal arteries" },
      { concept: "phrenic-veins", relation: "adjacent-to" },
    ],
  },

  "phrenic-veins": {
    summary:
      "Veins draining the diaphragm. The inferior phrenic veins follow the inferior phrenic arteries: the right ends in the inferior vena cava, while the left often ends partly in the left renal or suprarenal vein and partly in the IVC. Small superior phrenic veins drain into the azygos system.",
    latin: "Venae phrenicae",
    functions: ["Drain the diaphragm"],
    connections: [
      { concept: "diaphragm", relation: "receives-from" },
      { concept: "inferior-vena-cava", relation: "flows-to", note: "inferior phrenic veins" },
      { concept: "renal-vein", relation: "flows-to", note: "left inferior phrenic, often" },
      { concept: "suprarenal-vein", relation: "flows-to", note: "left inferior phrenic, sometimes" },
      { concept: "azygos-system", relation: "flows-to", note: "superior phrenic veins" },
      { concept: "phrenic-arteries", relation: "adjacent-to" },
    ],
  },

  // ─────────────────────────── Abdominal aorta and gut vessels ───────────────────────────
  "abdominal-aorta": {
    summary:
      "The final part of the aorta, running from the aortic hiatus of the diaphragm at T12 down the front of the lumbar vertebrae, slightly left of the midline, to its bifurcation into the common iliac arteries at about L4. It supplies the abdominal organs, posterior abdominal wall, pelvis and lower limbs.",
    latin: "Pars abdominalis aortae (aorta abdominalis)",
    functions: [
      "Supplies the gut through three unpaired branches: the celiac trunk and the superior and inferior mesenteric arteries",
      "Supplies paired organs through the renal, suprarenal and gonadal arteries",
      "Supplies the diaphragm and posterior abdominal wall (inferior phrenic and lumbar arteries)",
      "Ends by dividing into the common iliac arteries for the pelvis and lower limbs",
    ],
    facts: [
      { label: "Extent", value: "T12 (aortic hiatus) to the L4 bifurcation, near the level of the umbilicus" },
      { label: "Diameter", value: "About 2 cm in adults; 3 cm or more is aneurysmal" },
      { label: "Unpaired branch levels", value: "Celiac trunk T12, superior mesenteric L1, inferior mesenteric L3" },
    ],
    connections: [
      { concept: "descending-thoracic-aorta", relation: "receives-from", note: "continuation through the aortic hiatus" },
      { concept: "celiac-trunk-branches", relation: "gives-rise-to" },
      { concept: "superior-mesenteric-artery", relation: "gives-rise-to" },
      { concept: "inferior-mesenteric-artery", relation: "gives-rise-to" },
      { concept: "renal-artery", relation: "gives-rise-to" },
      { concept: "testicular-artery", relation: "gives-rise-to" },
      { concept: "phrenic-arteries", relation: "gives-rise-to", note: "inferior phrenic arteries" },
      { concept: "lumbar-arteries", relation: "gives-rise-to" },
      { concept: "common-iliac-artery", relation: "gives-rise-to", note: "terminal bifurcation at L4" },
      { concept: "inferior-vena-cava", relation: "adjacent-to", note: "IVC lies to its right" },
      { concept: "renal-vein", relation: "adjacent-to", note: "left renal vein crosses in front, just below the SMA" },
    ],
    clinical:
      "An abdominal aortic aneurysm, usually below the renal arteries, is often silent until it ruptures; rupture risk rises steeply with diameter, and elective repair is generally considered at about 5.5 cm.",
  },

  "celiac-trunk-branches": {
    summary:
      "The celiac trunk, the first unpaired branch of the abdominal aorta (at T12), and its branches: the left gastric, splenic and common hepatic arteries and their gastric, gastro-omental, gastroduodenal and pancreatic offshoots. Together they supply the foregut organs and the spleen.",
    latin: "Truncus coeliacus",
    functions: [
      "Supplies the abdominal esophagus and stomach (left and right gastric, gastro-omental and short gastric arteries)",
      "Supplies the spleen and much of the pancreas (splenic artery and its pancreatic branches)",
      "Supplies the liver and gallbladder via the common hepatic artery",
      "Supplies the upper duodenum and pancreatic head (gastroduodenal and superior pancreaticoduodenal arteries)",
    ],
    facts: [
      { label: "Origin", value: "Front of the abdominal aorta at T12, just below the aortic hiatus" },
      { label: "Length", value: "Short, only about 1–2 cm" },
      { label: "Three branches", value: "Left gastric, splenic and common hepatic arteries" },
    ],
    connections: [
      { concept: "abdominal-aorta", relation: "branch-of" },
      { concept: "hepatic-arteries", relation: "gives-rise-to", note: "common hepatic artery" },
      { concept: "stomach", relation: "flows-to", note: "gastric and gastro-omental arteries" },
      { concept: "esophagus", relation: "flows-to", note: "abdominal part, via the left gastric artery" },
      { concept: "spleen", relation: "flows-to", note: "splenic artery" },
      { concept: "pancreas", relation: "flows-to", note: "splenic and pancreaticoduodenal branches" },
      { concept: "duodenum", relation: "flows-to", note: "gastroduodenal and superior pancreaticoduodenal arteries" },
      { concept: "superior-mesenteric-artery", relation: "adjacent-to", note: "anastomose through the pancreaticoduodenal arcades" },
      { concept: "hepatic-portal-system", relation: "adjacent-to", note: "splenic vein runs with the splenic artery" },
      { concept: "diaphragm", relation: "adjacent-to", note: "arises just below the aortic hiatus" },
    ],
    clinical:
      "The tortuous splenic artery is the commonest site of visceral artery aneurysm. A posterior duodenal ulcer can erode the gastroduodenal artery and cause severe bleeding.",
  },

  "hepatic-arteries": {
    summary:
      "The common hepatic artery (from the celiac trunk), the proper hepatic artery that continues in the free edge of the lesser omentum, and its right, left and segmental branches within the liver. They carry oxygenated arterial blood to the liver and gallbladder.",
    latin: "Arteria hepatica communis et propria",
    functions: [
      "Deliver about 25% of the liver's blood flow but roughly half of its oxygen",
      "The right hepatic artery usually gives the cystic artery to the gallbladder",
      "Supply the bile ducts, which depend heavily on this arterial blood",
    ],
    facts: [
      { label: "Course", value: "Proper hepatic artery runs in the hepatoduodenal ligament with the portal vein (behind) and bile duct (in front and to the right): the portal triad" },
      { label: "Total liver blood flow", value: "About 1.35 L/min (roughly 25% of cardiac output)" },
    ],
    connections: [
      { concept: "celiac-trunk-branches", relation: "branch-of", note: "common hepatic artery" },
      { concept: "liver-segment-i-caudate-lobe", relation: "flows-to", note: "branches from both sides" },
      { concept: "liver-segment-ii", relation: "flows-to", note: "left hepatic artery" },
      { concept: "liver-segment-iii", relation: "flows-to", note: "left hepatic artery" },
      { concept: "liver-segment-iv", relation: "flows-to", note: "left hepatic artery" },
      { concept: "liver-segment-v", relation: "flows-to", note: "right hepatic artery" },
      { concept: "liver-segment-vi", relation: "flows-to", note: "right hepatic artery" },
      { concept: "liver-segment-vii", relation: "flows-to", note: "right hepatic artery" },
      { concept: "liver-segment-viii", relation: "flows-to", note: "right hepatic artery" },
      { concept: "gallbladder", relation: "flows-to", note: "cystic artery" },
      { concept: "hepatic-portal-system", relation: "adjacent-to", note: "portal triad" },
      { concept: "biliary-tree", relation: "adjacent-to", note: "portal triad" },
    ],
    clinical:
      "Variant hepatic arteries are common (for example a right hepatic artery arising from the superior mesenteric artery), which matters in liver surgery and transplantation. During cholecystectomy the cystic artery must be identified and ligated within the hepatocystic (Calot) triangle.",
  },

  "hepatic-portal-system": {
    summary:
      "The hepatic portal vein and its tributaries (superior and inferior mesenteric, splenic, gastric, pancreaticoduodenal and colic veins). It carries nutrient-rich venous blood from the gut, spleen and pancreas to the liver, which processes it before it reaches the general circulation.",
    latin: "Vena portae hepatis",
    functions: [
      "Delivers absorbed nutrients, drugs and toxins from the gut to the liver for processing (first-pass metabolism)",
      "Supplies about 75% of the liver's blood flow",
      "Carries pancreatic hormones (insulin, glucagon) and products of red cell breakdown from the spleen to the liver",
    ],
    facts: [
      { label: "Formation", value: "Superior mesenteric vein + splenic vein, behind the neck of the pancreas" },
      { label: "Length", value: "Portal vein about 7–8 cm" },
      { label: "Pressure", value: "Normally about 5–10 mmHg" },
      { label: "Share of liver blood flow", value: "About 75% (hepatic artery ~25%)" },
    ],
    connections: [
      { concept: "spleen", relation: "receives-from", note: "splenic vein" },
      { concept: "stomach", relation: "receives-from", note: "gastric and gastro-omental veins" },
      { concept: "pancreas", relation: "receives-from" },
      { concept: "jejunum", relation: "receives-from", note: "superior mesenteric vein" },
      { concept: "ileum", relation: "receives-from", note: "superior mesenteric vein" },
      { concept: "ascending-colon", relation: "receives-from", note: "superior mesenteric vein" },
      { concept: "descending-colon", relation: "receives-from", note: "inferior mesenteric vein" },
      { concept: "rectum", relation: "receives-from", note: "superior rectal vein (upper rectum)" },
      { concept: "liver-segment-i-caudate-lobe", relation: "flows-to", note: "both portal branches" },
      { concept: "liver-segment-ii", relation: "flows-to", note: "left portal branch" },
      { concept: "liver-segment-iii", relation: "flows-to", note: "left portal branch" },
      { concept: "liver-segment-iv", relation: "flows-to", note: "left portal branch" },
      { concept: "liver-segment-v", relation: "flows-to", note: "right portal branch" },
      { concept: "liver-segment-vi", relation: "flows-to", note: "right portal branch" },
      { concept: "liver-segment-vii", relation: "flows-to", note: "right portal branch" },
      { concept: "liver-segment-viii", relation: "flows-to", note: "right portal branch" },
      { concept: "hepatic-arteries", relation: "adjacent-to", note: "portal triad" },
      { concept: "biliary-tree", relation: "adjacent-to", note: "portal triad" },
    ],
    clinical:
      "In portal hypertension (most often from cirrhosis) blood is forced through portosystemic anastomoses, producing esophageal varices, rectal varices and dilated periumbilical veins (caput medusae), along with splenomegaly and ascites.",
  },

  "hepatic-veins": {
    summary:
      "The right, middle and left hepatic veins and their tributaries, which drain blood from the liver (after it has passed through the sinusoids) into the inferior vena cava just below the diaphragm. They run between, not within, the liver segments and mark the planes that separate them.",
    latin: "Venae hepaticae",
    functions: [
      "Return all blood that entered the liver through both the hepatic artery and the portal vein",
      "Define the boundaries of the liver's functional (Couinaud) segments",
    ],
    facts: [
      { label: "Main veins", value: "Right, middle and left; the middle and left often join before entering the IVC" },
      { label: "Caudate lobe", value: "Drains separately by small veins directly into the IVC" },
      { label: "Pressure", value: "Close to IVC pressure and lower than portal venous pressure; this gradient drives blood through the liver" },
    ],
    connections: [
      { concept: "inferior-vena-cava", relation: "flows-to" },
      { concept: "liver-segment-ii", relation: "receives-from", note: "left hepatic vein" },
      { concept: "liver-segment-iii", relation: "receives-from", note: "left hepatic vein" },
      { concept: "liver-segment-iv", relation: "receives-from", note: "middle (and left) hepatic veins" },
      { concept: "liver-segment-v", relation: "receives-from", note: "middle and right hepatic veins" },
      { concept: "liver-segment-vi", relation: "receives-from", note: "right hepatic vein" },
      { concept: "liver-segment-vii", relation: "receives-from", note: "right hepatic vein" },
      { concept: "liver-segment-viii", relation: "receives-from", note: "right and middle hepatic veins" },
    ],
    clinical:
      "Hepatic vein thrombosis (Budd–Chiari syndrome) causes an enlarged, painful liver and ascites; the caudate lobe often enlarges because its separate drainage into the IVC is spared.",
  },

  "superior-mesenteric-artery": {
    summary:
      "The second unpaired branch of the abdominal aorta, arising at L1 about 1 cm below the celiac trunk. It passes behind the neck of the pancreas and in front of the left renal vein and third part of the duodenum into the root of the mesentery, supplying the midgut.",
    latin: "Arteria mesenterica superior",
    functions: [
      "Supplies the lower duodenum and pancreatic head (inferior pancreaticoduodenal artery)",
      "Supplies the jejunum and ileum through arcades and straight arteries (vasa recta)",
      "Supplies the cecum, appendix, ascending colon and proximal two-thirds of the transverse colon (ileocolic, right colic and middle colic arteries)",
    ],
    facts: [
      { label: "Origin", value: "Front of the aorta at L1, about 1 cm below the celiac trunk" },
      { label: "Territory", value: "Midgut: from the major duodenal papilla to about two-thirds along the transverse colon" },
    ],
    connections: [
      { concept: "abdominal-aorta", relation: "branch-of" },
      { concept: "duodenum", relation: "flows-to", note: "inferior pancreaticoduodenal artery" },
      { concept: "pancreas", relation: "flows-to", note: "head" },
      { concept: "jejunum", relation: "flows-to" },
      { concept: "ileum", relation: "flows-to" },
      { concept: "appendix", relation: "flows-to", note: "appendicular artery" },
      { concept: "ascending-colon", relation: "flows-to" },
      { concept: "transverse-colon", relation: "flows-to", note: "proximal two-thirds, via the middle colic artery" },
      { concept: "renal-vein", relation: "adjacent-to", note: "left renal vein passes between the SMA and aorta" },
      { concept: "mesentery-of-small-intestine", relation: "adjacent-to", note: "runs in its root" },
      { concept: "inferior-mesenteric-artery", relation: "adjacent-to", note: "anastomose via the marginal artery of the colon" },
    ],
    clinical:
      "Acute mesenteric ischemia, often from an embolus lodging in the SMA, causes severe abdominal pain out of proportion to the examination findings. The narrow angle between the SMA and aorta can compress the left renal vein (nutcracker syndrome) or the third part of the duodenum (SMA syndrome).",
  },

  "inferior-mesenteric-artery": {
    summary:
      "The third unpaired branch of the abdominal aorta, arising at L3 behind the third part of the duodenum. It supplies the hindgut through its left colic, sigmoid and superior rectal branches.",
    latin: "Arteria mesenterica inferior",
    functions: [
      "Supplies the distal third of the transverse colon and the descending colon (left colic artery)",
      "Supplies the sigmoid colon (sigmoid arteries)",
      "Supplies the upper rectum (superior rectal artery)",
    ],
    facts: [
      { label: "Origin", value: "Front of the aorta at about L3, a few centimetres above the bifurcation" },
      { label: "Territory", value: "Hindgut: distal transverse colon to upper rectum" },
    ],
    connections: [
      { concept: "abdominal-aorta", relation: "branch-of" },
      { concept: "transverse-colon", relation: "flows-to", note: "distal third" },
      { concept: "descending-colon", relation: "flows-to", note: "left colic artery" },
      { concept: "rectum", relation: "flows-to", note: "superior rectal artery" },
      { concept: "superior-mesenteric-artery", relation: "adjacent-to", note: "anastomose via the marginal artery of the colon" },
      { concept: "duodenum", relation: "adjacent-to", note: "arises behind the third part" },
    ],
    clinical:
      "The splenic flexure lies at the watershed between SMA and IMA territories and is especially vulnerable to ischemic colitis. The IMA is often covered or sacrificed during aortic aneurysm repair, with the colon relying on collateral flow.",
  },

  // ─────────────────────────── Kidneys, adrenals, gonads ───────────────────────────
  "renal-artery": {
    summary:
      "Paired lateral branches of the abdominal aorta at about L1–L2, just below the superior mesenteric artery, that carry a large share of the cardiac output to the kidneys. The right is longer and passes behind the inferior vena cava; near the hilum each divides into segmental arteries.",
    latin: "Arteria renalis",
    functions: [
      "Supplies the kidneys for filtration of blood and formation of urine",
      "Gives inferior suprarenal arteries to the adrenal glands and branches to the upper ureter",
      "Its segmental branches are end arteries, each supplying a separate renal segment",
    ],
    facts: [
      { label: "Renal blood flow", value: "About 1.1 L/min, roughly 20–25% of resting cardiac output" },
      { label: "Origin", value: "About L1–L2, just below the superior mesenteric artery" },
      { label: "Segmental arteries", value: "Usually five, which are end arteries" },
      { label: "Accessory renal arteries", value: "Present in roughly a quarter of people" },
    ],
    connections: [
      { concept: "abdominal-aorta", relation: "branch-of" },
      { concept: "kidney", relation: "flows-to" },
      { concept: "adrenal-gland", relation: "flows-to", note: "inferior suprarenal artery" },
      { concept: "ureter", relation: "flows-to", note: "upper ureter" },
      { concept: "renal-vein", relation: "adjacent-to", note: "vein lies in front of the artery at the hilum" },
      { concept: "inferior-vena-cava", relation: "adjacent-to", note: "right renal artery passes behind it" },
    ],
    clinical:
      "Renal artery stenosis (atherosclerosis in older adults, fibromuscular dysplasia in younger women) reduces kidney perfusion, activating the renin–angiotensin system and causing renovascular hypertension.",
  },

  "renal-vein": {
    summary:
      "Paired veins that drain the kidneys into the inferior vena cava, lying in front of the renal arteries at the hilum. The left renal vein is much longer, crossing in front of the aorta just below the superior mesenteric artery, and receives the left gonadal and suprarenal veins.",
    latin: "Vena renalis",
    functions: [
      "Return filtered blood from the kidneys to the IVC",
      "The left renal vein also collects the left testicular (or ovarian), left suprarenal and often left inferior phrenic veins",
    ],
    facts: [
      { label: "Length", value: "Left roughly three times as long as the right (about 7.5 cm vs 2.5 cm)" },
    ],
    connections: [
      { concept: "kidney", relation: "receives-from" },
      { concept: "testicular-vein", relation: "receives-from", note: "left testicular vein" },
      { concept: "suprarenal-vein", relation: "receives-from", note: "left suprarenal vein" },
      { concept: "phrenic-veins", relation: "receives-from", note: "left inferior phrenic, often" },
      { concept: "inferior-vena-cava", relation: "flows-to" },
      { concept: "renal-artery", relation: "adjacent-to" },
      { concept: "abdominal-aorta", relation: "adjacent-to", note: "left vein crosses in front of it" },
      { concept: "superior-mesenteric-artery", relation: "adjacent-to", note: "left vein passes beneath it" },
    ],
    clinical:
      "Compression of the left renal vein between the SMA and aorta (nutcracker syndrome) can cause blood in the urine and a left varicocele. Kidney cancers can grow along the renal vein into the IVC.",
  },

  "suprarenal-vein": {
    summary:
      "A single vein leaving the hilum of each adrenal gland. The short right suprarenal vein drains directly into the inferior vena cava, while the left drains into the left renal vein.",
    latin: "Vena suprarenalis",
    functions: [
      "Carries adrenal hormones (cortisol, aldosterone, adrenaline and noradrenaline) into the circulation",
    ],
    connections: [
      { concept: "adrenal-gland", relation: "receives-from" },
      { concept: "phrenic-veins", relation: "receives-from", note: "left inferior phrenic vein, sometimes" },
      { concept: "inferior-vena-cava", relation: "flows-to", note: "right suprarenal vein" },
      { concept: "renal-vein", relation: "flows-to", note: "left suprarenal vein" },
    ],
    clinical:
      "Adrenal venous sampling, used to locate aldosterone-secreting tumours, is technically harder on the right because the short vein enters the IVC directly.",
  },

  "testicular-artery": {
    summary:
      "Long, slender paired arteries arising from the front of the abdominal aorta at about L2, just below the renal arteries. They descend on psoas major, cross in front of the ureter and pass through the inguinal canal in the spermatic cord to the testis, reflecting the testis's embryological descent from the posterior abdominal wall.",
    latin: "Arteria testicularis",
    functions: [
      "Supply the testis and epididymis",
      "Give small branches to the ureter",
      "In the spermatic cord, heat exchange with the surrounding pampiniform venous plexus cools the arterial blood",
    ],
    facts: [
      { label: "Origin", value: "Abdominal aorta at about L2" },
    ],
    connections: [
      { concept: "abdominal-aorta", relation: "branch-of" },
      { concept: "testis", relation: "flows-to" },
      { concept: "epididymis", relation: "flows-to" },
      { concept: "ureter", relation: "flows-to", note: "small branches; the artery also crosses in front of the ureter" },
      { concept: "testicular-vein", relation: "adjacent-to", note: "surrounded by the pampiniform plexus" },
      { concept: "ductus-deferens", relation: "adjacent-to", note: "together in the spermatic cord" },
      { concept: "psoas-major", relation: "adjacent-to" },
    ],
    clinical:
      "Testicular torsion twists the spermatic cord and cuts off this artery; it is a surgical emergency, as the testis may be lost within hours.",
    sexDifferences:
      "In females the equivalent ovarian arteries arise at the same level but stay in the pelvis, reaching the ovaries through the suspensory ligament of the ovary.",
  },

  "testicular-vein": {
    summary:
      "The veins draining the testis. They begin as the pampiniform plexus in the spermatic cord, which condenses into a single vein in the abdomen; the right testicular vein enters the inferior vena cava, while the left enters the left renal vein at a right angle.",
    latin: "Vena testicularis",
    functions: [
      "Drain the testis and epididymis",
      "The pampiniform plexus cools incoming arterial blood by countercurrent heat exchange, keeping the testis a few degrees below core temperature",
    ],
    connections: [
      { concept: "testis", relation: "receives-from" },
      { concept: "epididymis", relation: "receives-from" },
      { concept: "inferior-vena-cava", relation: "flows-to", note: "right testicular vein" },
      { concept: "renal-vein", relation: "flows-to", note: "left testicular vein" },
      { concept: "testicular-artery", relation: "adjacent-to" },
      { concept: "ductus-deferens", relation: "adjacent-to", note: "spermatic cord" },
      { concept: "ureter", relation: "adjacent-to", note: "crosses in front of it" },
    ],
    clinical:
      "A varicocele (dilated pampiniform plexus) occurs on the left in the large majority of cases, partly because the left vein drains at a right angle into the higher-pressure left renal vein; a new right-sided varicocele should prompt a search for an abdominal mass.",
    sexDifferences:
      "In females the ovarian veins drain the ovaries by the same pattern: the right into the IVC and the left into the left renal vein.",
  },

  // ─────────────────────────── Posterior abdominal wall ───────────────────────────
  "lumbar-arteries": {
    summary:
      "Usually four pairs of segmental arteries from the back of the abdominal aorta (L1–L4) that run laterally around the vertebral bodies, behind psoas major, to supply the posterior abdominal wall and back.",
    latin: "Arteriae lumbales",
    functions: [
      "Supply the posterior and lateral abdominal wall muscles",
      "Supply the lumbar vertebrae and deep back muscles (dorsal branches)",
      "Spinal branches supply the lower spinal cord and cauda equina",
    ],
    connections: [
      { concept: "abdominal-aorta", relation: "branch-of" },
      { concept: "psoas-major", relation: "flows-to" },
      { concept: "transversus-abdominis", relation: "flows-to" },
      { concept: "internal-oblique", relation: "flows-to" },
      { concept: "deep-back-muscles-transversospinales", relation: "flows-to", note: "dorsal branches" },
      { concept: "spinal-cord", relation: "flows-to", note: "spinal branches" },
      { concept: "cauda-equina", relation: "flows-to", note: "spinal branches" },
      { concept: "lumbar-sacral-veins", relation: "adjacent-to" },
    ],
    clinical:
      "The great radicular artery (of Adamkiewicz), a key supply of the lower spinal cord, usually arises from a lower posterior intercostal or upper lumbar artery (roughly T9–L2, more often on the left); its loss during aortic surgery can cause paraplegia.",
  },

  "lumbar-sacral-veins": {
    summary:
      "Veins of the posterior abdominal wall and sacrum: the lumbar veins, the ascending lumbar veins that link them vertically, the iliolumbar veins, and the median and lateral sacral veins. They connect with the vertebral venous plexuses.",
    latin: "Venae lumbales et venae sacrales",
    functions: [
      "Drain the posterior abdominal wall, lumbar vertebrae, back muscles and sacrum",
      "Ascending lumbar veins connect the common iliac veins with the azygos and hemiazygos veins",
      "Form collateral pathways between the IVC and SVC territories",
    ],
    facts: [
      { label: "Drainage", value: "Lumbar veins to the IVC and ascending lumbar veins; median sacral to the left common iliac vein; lateral sacral to the internal iliac veins" },
    ],
    connections: [
      { concept: "inferior-vena-cava", relation: "flows-to", note: "lumbar veins" },
      { concept: "azygos-system", relation: "flows-to", note: "via the ascending lumbar veins" },
      { concept: "common-iliac-vein", relation: "flows-to", note: "iliolumbar and median sacral veins" },
      { concept: "internal-iliac-vein", relation: "flows-to", note: "lateral sacral veins" },
      { concept: "psoas-major", relation: "receives-from" },
      { concept: "deep-back-muscles-transversospinales", relation: "receives-from" },
      { concept: "sacrum", relation: "receives-from" },
      { concept: "lumbar-arteries", relation: "adjacent-to" },
    ],
    clinical:
      "Their links with the valveless vertebral venous plexus provide a route by which pelvic and abdominal cancers (for example prostate cancer) can spread to the vertebrae; they also enlarge as collaterals when the IVC is blocked.",
  },

  // ─────────────────────────── Pelvic vessels ───────────────────────────
  "common-iliac-artery": {
    summary:
      "The two terminal branches of the abdominal aorta, formed at its bifurcation at about L4. Each runs downward and laterally for about 4–5 cm and divides in front of the sacroiliac joint, at the pelvic brim, into the external and internal iliac arteries.",
    latin: "Arteria iliaca communis",
    functions: [
      "Carry oxygenated blood to the pelvis and lower limbs",
      "Divide into the external iliac (lower limb) and internal iliac (pelvis, perineum, buttock) arteries",
    ],
    facts: [
      { label: "Origin", value: "Aortic bifurcation at about L4" },
      { label: "Length", value: "About 4–5 cm" },
      { label: "Division", value: "Pelvic brim, in front of the sacroiliac joint (about L5/S1)" },
    ],
    connections: [
      { concept: "abdominal-aorta", relation: "branch-of" },
      { concept: "external-iliac-artery", relation: "gives-rise-to" },
      { concept: "internal-iliac-artery", relation: "gives-rise-to" },
      { concept: "common-iliac-vein", relation: "adjacent-to" },
      { concept: "ureter", relation: "adjacent-to", note: "crosses in front of the bifurcation" },
      { concept: "psoas-major", relation: "adjacent-to" },
      { concept: "fourth-lumbar-vertebra", relation: "adjacent-to", note: "aortic bifurcation level" },
    ],
    clinical:
      "Atherosclerotic narrowing of the aortoiliac segment causes buttock and thigh claudication with reduced femoral pulses (and erectile dysfunction in men: Leriche syndrome). Abdominal aortic aneurysms often extend into the common iliac arteries.",
  },

  "common-iliac-vein": {
    summary:
      "Paired veins formed at the pelvic brim, in front of the sacroiliac joint, by the union of the external and internal iliac veins. They ascend and join at about L5, to the right of the midline, to form the inferior vena cava.",
    latin: "Vena iliaca communis",
    functions: [
      "Drain the lower limbs, pelvis and perineum",
      "The left common iliac vein also receives the median sacral vein",
    ],
    connections: [
      { concept: "external-iliac-vein", relation: "receives-from" },
      { concept: "internal-iliac-vein", relation: "receives-from" },
      { concept: "lumbar-sacral-veins", relation: "receives-from", note: "iliolumbar and median sacral veins" },
      { concept: "inferior-vena-cava", relation: "flows-to" },
      { concept: "common-iliac-artery", relation: "adjacent-to", note: "right common iliac artery crosses in front of the left vein" },
      { concept: "fifth-lumbar-vertebra", relation: "adjacent-to" },
    ],
    clinical:
      "In May–Thurner syndrome the left common iliac vein is compressed between the right common iliac artery and the lumbar spine, predisposing to left-sided deep vein thrombosis.",
  },

  "external-iliac-artery": {
    summary:
      "The larger branch of the common iliac artery, running along the medial border of psoas major at the pelvic brim to pass under the inguinal ligament at the mid-inguinal point, where it becomes the femoral artery.",
    latin: "Arteria iliaca externa",
    functions: [
      "Main supply route to the lower limb",
      "Gives the inferior epigastric artery to the anterior abdominal wall (rectus abdominis)",
      "Gives the deep circumflex iliac artery to the iliac fossa and lateral abdominal wall",
    ],
    connections: [
      { concept: "common-iliac-artery", relation: "branch-of" },
      { concept: "femoral-artery", relation: "flows-to", note: "continues beneath the inguinal ligament" },
      { concept: "rectus-abdominis", relation: "flows-to", note: "inferior epigastric artery" },
      { concept: "iliacus", relation: "flows-to", note: "deep circumflex iliac artery" },
      { concept: "external-iliac-vein", relation: "adjacent-to" },
      { concept: "psoas-major", relation: "adjacent-to", note: "runs along its medial border" },
      { concept: "ductus-deferens", relation: "adjacent-to", note: "hooks around the inferior epigastric artery at the deep ring" },
      { concept: "hip-bone", relation: "adjacent-to", note: "pelvic brim" },
    ],
    clinical:
      "Its inferior epigastric branch is the landmark separating indirect (lateral) from direct (medial) inguinal hernias. The external iliac vessels are the usual attachment site for a transplanted kidney.",
  },

  "external-iliac-vein": {
    summary:
      "The continuation of the femoral vein above the inguinal ligament. It runs along the pelvic brim beside the external iliac artery and joins the internal iliac vein in front of the sacroiliac joint to form the common iliac vein.",
    latin: "Vena iliaca externa",
    functions: [
      "Drains the entire lower limb",
      "Receives the inferior epigastric and deep circumflex iliac veins from the abdominal wall",
    ],
    connections: [
      { concept: "femoral-vein", relation: "receives-from", note: "continuation at the inguinal ligament" },
      { concept: "common-iliac-vein", relation: "flows-to" },
      { concept: "external-iliac-artery", relation: "adjacent-to" },
      { concept: "psoas-major", relation: "adjacent-to" },
      { concept: "hip-bone", relation: "adjacent-to", note: "pelvic brim" },
    ],
    clinical: "Deep vein thrombosis extending into the iliac veins (iliofemoral DVT) causes marked swelling of the whole leg.",
  },

  "internal-iliac-artery": {
    summary:
      "The branch of the common iliac artery that descends into the pelvis from the pelvic brim. It divides into an anterior division, mainly supplying the pelvic organs, perineum and medial thigh, and a posterior division supplying the pelvic wall and buttock.",
    latin: "Arteria iliaca interna",
    functions: [
      "Supplies the bladder, rectum and internal genital organs (vesical, middle rectal, and in females uterine and vaginal arteries)",
      "Supplies the perineum and external genitalia through the internal pudendal artery",
      "Supplies the gluteal muscles (superior and inferior gluteal arteries) and medial thigh (obturator artery)",
    ],
    facts: [
      { label: "Divisions", value: "Anterior (mostly visceral) and posterior (parietal: iliolumbar, lateral sacral, superior gluteal)" },
    ],
    connections: [
      { concept: "common-iliac-artery", relation: "branch-of" },
      { concept: "dorsal-artery-of-penis", relation: "gives-rise-to", note: "via the internal pudendal artery" },
      { concept: "urinary-bladder", relation: "flows-to", note: "vesical arteries" },
      { concept: "rectum", relation: "flows-to", note: "middle rectal artery" },
      { concept: "prostate", relation: "flows-to" },
      { concept: "uterus", relation: "flows-to", note: "uterine artery (female)" },
      { concept: "penis", relation: "flows-to", note: "internal pudendal artery" },
      { concept: "gluteus-maximus", relation: "flows-to", note: "gluteal arteries" },
      { concept: "gluteus-medius", relation: "flows-to", note: "superior gluteal artery" },
      { concept: "internal-iliac-vein", relation: "adjacent-to" },
      { concept: "ureter", relation: "adjacent-to", note: "the ureter descends in front of it" },
    ],
    clinical:
      "Embolization or ligation of the internal iliac arteries is used to control life-threatening pelvic bleeding (for example after pelvic fractures or postpartum hemorrhage); collateral vessels keep the pelvic organs alive.",
    sexDifferences:
      "In females the anterior division gives the uterine artery, which crosses above the ureter near the cervix ('water under the bridge'), and vaginal arteries in place of the male inferior vesical/prostatic supply.",
  },

  "internal-iliac-vein": {
    summary:
      "The vein draining the pelvis, formed near the greater sciatic notch and ascending behind the internal iliac artery to join the external iliac vein and form the common iliac vein. Its tributaries include the gluteal, internal pudendal, obturator and sacral veins and the pelvic venous plexuses.",
    latin: "Vena iliaca interna",
    functions: [
      "Drains the pelvic organs through the rectal, vesical, prostatic (or uterine and vaginal) venous plexuses",
      "Drains the buttock, perineum and medial thigh",
    ],
    connections: [
      { concept: "superior-gluteal-vein", relation: "receives-from" },
      { concept: "inferior-gluteal-vein", relation: "receives-from" },
      { concept: "internal-pudendal-vein", relation: "receives-from" },
      { concept: "obturator-vein", relation: "receives-from" },
      { concept: "lumbar-sacral-veins", relation: "receives-from", note: "lateral sacral veins" },
      { concept: "dorsal-veins-of-penis", relation: "receives-from", note: "deep dorsal vein via the prostatic plexus" },
      { concept: "urinary-bladder", relation: "receives-from", note: "vesical venous plexus" },
      { concept: "prostate", relation: "receives-from", note: "prostatic venous plexus" },
      { concept: "rectum", relation: "receives-from", note: "middle rectal veins" },
      { concept: "common-iliac-vein", relation: "flows-to" },
      { concept: "internal-iliac-artery", relation: "adjacent-to" },
    ],
    clinical:
      "The pelvic venous plexuses communicate with the valveless vertebral venous plexus, a route by which prostate cancer can metastasize to the lumbar vertebrae.",
  },

  "superior-gluteal-vein": {
    summary:
      "Paired companion veins of the superior gluteal artery that leave the buttock through the greater sciatic foramen above piriformis and drain into the internal iliac vein.",
    latin: "Venae gluteae superiores",
    functions: ["Drain gluteus medius, gluteus minimus, the upper gluteus maximus and tensor fasciae latae"],
    connections: [
      { concept: "gluteus-medius", relation: "receives-from" },
      { concept: "gluteus-minimus", relation: "receives-from" },
      { concept: "gluteus-maximus", relation: "receives-from" },
      { concept: "tensor-fasciae-latae", relation: "receives-from" },
      { concept: "internal-iliac-vein", relation: "flows-to" },
      { concept: "piriformis", relation: "adjacent-to", note: "pass above it through the greater sciatic foramen" },
    ],
  },

  "inferior-gluteal-vein": {
    summary:
      "Paired companion veins of the inferior gluteal artery that drain the lower buttock and upper back of the thigh, entering the pelvis below piriformis to join the internal iliac vein.",
    latin: "Venae gluteae inferiores",
    functions: ["Drain gluteus maximus and the upper posterior thigh"],
    connections: [
      { concept: "gluteus-maximus", relation: "receives-from" },
      { concept: "internal-iliac-vein", relation: "flows-to" },
      { concept: "piriformis", relation: "adjacent-to", note: "pass below it through the greater sciatic foramen" },
      { concept: "sciatic-nerve", relation: "adjacent-to", note: "also leaves the pelvis below piriformis" },
    ],
  },

  "internal-pudendal-vein": {
    summary:
      "Companion veins of the internal pudendal artery that drain the perineum. They run in the pudendal canal on the side wall of the ischioanal fossa, pass around the ischial spine and enter the pelvis to join the internal iliac vein.",
    latin: "Venae pudendae internae",
    functions: [
      "Drain the perineum, including the anal canal (inferior rectal veins) and parts of the external genitalia",
    ],
    connections: [
      { concept: "penis", relation: "receives-from", note: "veins of the bulb and deep veins" },
      { concept: "external-anal-sphincter", relation: "receives-from", note: "inferior rectal veins" },
      { concept: "internal-iliac-vein", relation: "flows-to" },
      { concept: "obturator-internus", relation: "adjacent-to", note: "pudendal canal lies in its fascia" },
    ],
  },

  "obturator-vein": {
    summary:
      "The companion vein of the obturator artery, draining the medial (adductor) compartment of the thigh and passing through the obturator canal into the pelvis to join the internal iliac vein.",
    latin: "Venae obturatoriae",
    functions: ["Drains the adductor muscles, obturator externus and hip joint region"],
    connections: [
      { concept: "adductor-longus", relation: "receives-from" },
      { concept: "adductor-brevis", relation: "receives-from" },
      { concept: "obturator-externus", relation: "receives-from" },
      { concept: "internal-iliac-vein", relation: "flows-to" },
      { concept: "obturator-nerve", relation: "adjacent-to", note: "travel together through the obturator canal" },
      { concept: "hip-bone", relation: "adjacent-to", note: "obturator canal" },
    ],
  },

  "dorsal-artery-of-penis": {
    summary:
      "A terminal branch of the internal pudendal artery that runs along the dorsum of the penis, deep to the deep fascia, between the midline deep dorsal vein and the laterally placed dorsal nerve.",
    latin: "Arteria dorsalis penis",
    functions: [
      "Supplies the fibrous tissue around the corpora cavernosa, the corpus spongiosum, penile skin and glans",
      "The erectile tissue itself is supplied mainly by the deep arteries of the penis (also from the internal pudendal artery)",
    ],
    connections: [
      { concept: "internal-iliac-artery", relation: "branch-of", note: "via the internal pudendal artery" },
      { concept: "penis", relation: "flows-to" },
      { concept: "dorsal-veins-of-penis", relation: "adjacent-to", note: "lies either side of the deep dorsal vein" },
    ],
    clinical: "Arterial insufficiency in the internal pudendal territory is an important cause of erectile dysfunction.",
    sexDifferences: "The female homologue is the dorsal artery of the clitoris.",
  },

  "dorsal-veins-of-penis": {
    summary:
      "The superficial and deep dorsal veins of the penis. The superficial vein drains the skin into the external pudendal veins, while the midline deep dorsal vein drains the erectile tissue and glans, passing beneath the pubic symphysis into the prostatic venous plexus.",
    latin: "Venae dorsales superficiales penis et vena dorsalis profunda penis",
    functions: [
      "Deep dorsal vein drains the corpora and glans into the prostatic venous plexus",
      "Superficial dorsal vein drains the penile skin and prepuce toward the great saphenous vein",
      "Restriction of venous outflow helps maintain erection",
    ],
    connections: [
      { concept: "penis", relation: "receives-from" },
      { concept: "internal-iliac-vein", relation: "flows-to", note: "deep dorsal vein, via the prostatic venous plexus" },
      { concept: "great-saphenous-vein", relation: "flows-to", note: "superficial dorsal vein, via the external pudendal veins" },
      { concept: "dorsal-artery-of-penis", relation: "adjacent-to" },
      { concept: "prostate", relation: "adjacent-to", note: "prostatic venous plexus" },
    ],
    sexDifferences: "In females the dorsal veins of the clitoris follow a similar pattern, draining to the vesical venous plexus.",
  },

  // ─────────────────────────── Lower limb arteries ───────────────────────────
  "femoral-artery": {
    summary:
      "The main artery of the thigh, continuing from the external iliac artery beneath the inguinal ligament at the mid-inguinal point. It descends through the femoral triangle and the adductor (subsartorial) canal and becomes the popliteal artery at the adductor hiatus.",
    latin: "Arteria femoralis",
    functions: [
      "Main arterial supply of the lower limb",
      "Gives the deep femoral artery (profunda femoris), which supplies most of the thigh via the circumflex femoral and perforating arteries",
      "Gives superficial branches to the lower abdominal wall and external genitalia, and the descending genicular artery to the knee",
    ],
    facts: [
      { label: "Femoral pulse", value: "At the mid-inguinal point, midway between the anterior superior iliac spine and the pubic symphysis" },
      { label: "Femoral triangle (lateral to medial)", value: "Nerve, Artery, Vein, then lymphatics (NAVeL)" },
      { label: "Ends", value: "Adductor hiatus in adductor magnus, becoming the popliteal artery" },
    ],
    connections: [
      { concept: "external-iliac-artery", relation: "receives-from", note: "continuation beneath the inguinal ligament" },
      { concept: "popliteal-artery", relation: "flows-to", note: "through the adductor hiatus" },
      { concept: "lateral-circumflex-femoral-artery", relation: "gives-rise-to", note: "usually via the deep femoral artery" },
      { concept: "perforating-arteries", relation: "gives-rise-to", note: "via the deep femoral artery" },
      { concept: "genicular-arteries", relation: "gives-rise-to", note: "descending genicular artery" },
      { concept: "femoral-vein", relation: "adjacent-to", note: "vein lies medial to the artery in the femoral triangle" },
      { concept: "femoral-nerve", relation: "adjacent-to", note: "nerve lies lateral to the artery" },
      { concept: "saphenous-nerve", relation: "adjacent-to", note: "accompanies it in the adductor canal" },
      { concept: "sartorius", relation: "adjacent-to", note: "covers it in the adductor canal" },
      { concept: "adductor-longus", relation: "adjacent-to", note: "part of the floor of the femoral triangle" },
      { concept: "adductor-magnus", relation: "adjacent-to", note: "adductor hiatus" },
    ],
    clinical:
      "The femoral artery is a common access site for angiography and catheter procedures. Atherosclerosis often narrows the superficial femoral artery in the adductor canal, causing calf claudication.",
  },

  "lateral-circumflex-femoral-artery": {
    summary:
      "A branch of the deep femoral artery (occasionally of the femoral artery itself) that passes laterally deep to sartorius and rectus femoris and divides into ascending, transverse and descending branches.",
    latin: "Arteria circumflexa femoris lateralis",
    functions: [
      "Supplies the quadriceps (especially vastus lateralis and rectus femoris) and tensor fasciae latae",
      "Ascending branch supplies the greater trochanter region and joins the anastomosis around the hip",
      "Descending branch runs down to the knee to join the genicular anastomosis",
    ],
    connections: [
      { concept: "femoral-artery", relation: "branch-of", note: "usually via the deep femoral artery" },
      { concept: "vastus-lateralis", relation: "flows-to" },
      { concept: "rectus-femoris", relation: "flows-to" },
      { concept: "vastus-intermedius", relation: "flows-to" },
      { concept: "tensor-fasciae-latae", relation: "flows-to" },
      { concept: "femur", relation: "flows-to", note: "greater trochanter and neck region" },
      { concept: "genicular-arteries", relation: "adjacent-to", note: "descending branch anastomoses with them" },
      { concept: "lateral-circumflex-femoral-vein", relation: "adjacent-to" },
      { concept: "sartorius", relation: "adjacent-to", note: "passes deep to it" },
      { concept: "femoral-nerve", relation: "adjacent-to", note: "passes among its branches" },
    ],
    clinical:
      "Its descending branch is the vascular pedicle of the anterolateral thigh (ALT) flap, one of the most widely used free flaps in reconstructive surgery. The femoral head relies more on the medial circumflex femoral artery.",
  },

  "perforating-arteries": {
    summary:
      "Usually three or four branches of the deep femoral artery that perforate the adductor magnus close to the femur to reach the back of the thigh, where they supply the hamstrings and anastomose with each other.",
    latin: "Arteriae perforantes",
    functions: [
      "Supply the adductor magnus and the hamstrings",
      "Supply vastus lateralis and the back of the thigh",
      "Usually give the nutrient artery of the femur",
      "Form a longitudinal chain of anastomoses linking the gluteal and popliteal regions",
    ],
    connections: [
      { concept: "femoral-artery", relation: "branch-of", note: "via the deep femoral artery" },
      { concept: "adductor-magnus", relation: "flows-to", note: "pierce the muscle near the femur" },
      { concept: "biceps-femoris", relation: "flows-to" },
      { concept: "semimembranosus", relation: "flows-to" },
      { concept: "semitendinosus", relation: "flows-to" },
      { concept: "vastus-lateralis", relation: "flows-to" },
      { concept: "femur", relation: "flows-to", note: "nutrient artery" },
      { concept: "deep-femoral-vein", relation: "adjacent-to", note: "companion veins drain into it" },
    ],
  },

  "genicular-arteries": {
    summary:
      "The arteries around the knee: five genicular branches of the popliteal artery (superior medial and lateral, middle, inferior medial and lateral) together with the descending genicular artery from the femoral artery. With recurrent branches from below, they form the genicular anastomosis.",
    latin: "Arteriae genus",
    functions: [
      "Supply the knee joint capsule, synovium and the ends of the femur and tibia",
      "The middle genicular artery supplies the cruciate ligaments",
      "Supply the vascular outer rim of the menisci and the patella",
      "Provide collateral circulation around the knee",
    ],
    connections: [
      { concept: "popliteal-artery", relation: "branch-of", note: "five genicular arteries" },
      { concept: "femoral-artery", relation: "branch-of", note: "descending genicular artery" },
      { concept: "menisci-of-knee", relation: "flows-to", note: "outer vascular rim" },
      { concept: "patella", relation: "flows-to" },
      { concept: "femur", relation: "flows-to", note: "condyles" },
      { concept: "tibia", relation: "flows-to", note: "condyles" },
      { concept: "lateral-circumflex-femoral-artery", relation: "adjacent-to", note: "its descending branch joins the anastomosis" },
      { concept: "anterior-tibial-recurrent-artery", relation: "adjacent-to", note: "joins the anastomosis from below" },
      { concept: "genicular-veins", relation: "adjacent-to" },
    ],
    clinical:
      "The genicular anastomosis can maintain some flow if the popliteal artery narrows slowly, but it is usually inadequate after sudden popliteal injury (e.g., knee dislocation), which threatens the leg. Only the outer vascular rim of a torn meniscus heals well.",
  },

  "popliteal-artery": {
    summary:
      "The continuation of the femoral artery through the popliteal fossa behind the knee, from the adductor hiatus to the lower border of popliteus, where it divides into the anterior and posterior tibial arteries. It is the deepest structure in the fossa, lying against the femur and knee joint capsule.",
    latin: "Arteria poplitea",
    functions: [
      "Carries blood across the knee to the leg and foot",
      "Supplies the knee joint through the genicular arteries",
      "Supplies the gastrocnemius and soleus through sural branches",
    ],
    facts: [
      { label: "Relations in the fossa (deep to superficial)", value: "Artery, then popliteal vein, then tibial nerve" },
      { label: "Popliteal pulse", value: "Deep and hard to feel; best felt with the knee partly flexed" },
    ],
    connections: [
      { concept: "femoral-artery", relation: "receives-from", note: "continuation at the adductor hiatus" },
      { concept: "anterior-tibial-artery", relation: "gives-rise-to", note: "terminal branch" },
      { concept: "posterior-tibial-artery", relation: "gives-rise-to", note: "terminal branch" },
      { concept: "genicular-arteries", relation: "gives-rise-to" },
      { concept: "gastrocnemius", relation: "flows-to", note: "sural arteries" },
      { concept: "popliteal-vein", relation: "adjacent-to", note: "superficial to the artery" },
      { concept: "tibial-nerve", relation: "adjacent-to", note: "most superficial" },
      { concept: "femur", relation: "adjacent-to", note: "popliteal surface" },
      { concept: "popliteus", relation: "adjacent-to", note: "divides at its lower border" },
    ],
    clinical:
      "The popliteal artery is the commonest site of peripheral (non-aortic) aneurysms. Its tethered position makes it vulnerable in knee dislocation, so distal pulses must always be checked after such injuries.",
  },

  "anterior-tibial-artery": {
    summary:
      "The smaller terminal branch of the popliteal artery. It passes forward above the interosseous membrane into the anterior compartment of the leg, descends on the membrane with the deep fibular nerve and becomes the dorsalis pedis artery in front of the ankle.",
    latin: "Arteria tibialis anterior",
    functions: [
      "Supplies the anterior (extensor) compartment muscles of the leg",
      "Gives the anterior tibial recurrent artery to the knee anastomosis and malleolar branches to the ankle",
      "Continues as the dorsalis pedis artery to the dorsum of the foot",
    ],
    connections: [
      { concept: "popliteal-artery", relation: "branch-of" },
      { concept: "anterior-tibial-recurrent-artery", relation: "gives-rise-to" },
      { concept: "dorsalis-pedis-artery", relation: "flows-to", note: "continuation at the ankle" },
      { concept: "tibialis-anterior", relation: "flows-to" },
      { concept: "extensor-digitorum-longus", relation: "flows-to" },
      { concept: "extensor-hallucis-longus", relation: "flows-to" },
      { concept: "anterior-tibial-vein", relation: "adjacent-to" },
      { concept: "interosseous-membrane-of-leg", relation: "adjacent-to", note: "lies on its front" },
      { concept: "common-fibular-nerve", relation: "adjacent-to", note: "accompanied by its deep fibular branch" },
    ],
    clinical:
      "In anterior compartment syndrome, swelling inside the tight fascial compartment compresses these vessels and the deep fibular nerve, requiring urgent fasciotomy.",
  },

  "anterior-tibial-recurrent-artery": {
    summary:
      "A small branch of the anterior tibial artery that arises just after it enters the anterior compartment and runs upward through tibialis anterior to the front of the knee.",
    latin: "Arteria recurrens tibialis anterior",
    functions: [
      "Supplies the upper tibialis anterior and the front of the knee joint",
      "Joins the genicular anastomosis around the knee",
    ],
    connections: [
      { concept: "anterior-tibial-artery", relation: "branch-of" },
      { concept: "tibialis-anterior", relation: "flows-to" },
      { concept: "genicular-arteries", relation: "adjacent-to", note: "anastomoses with them" },
      { concept: "tibia", relation: "adjacent-to", note: "lateral condyle region" },
    ],
  },

  "posterior-tibial-artery": {
    summary:
      "The larger terminal branch of the popliteal artery, running down the deep posterior compartment of the leg with the tibial nerve. It passes behind the medial malleolus and divides under the flexor retinaculum into the medial and lateral plantar arteries of the sole.",
    latin: "Arteria tibialis posterior",
    functions: [
      "Supplies the posterior (flexor) compartment muscles of the leg",
      "Gives the fibular (peroneal) artery to the lateral and posterior leg",
      "Gives the nutrient artery of the tibia",
      "Supplies the sole of the foot via the plantar arteries",
    ],
    facts: [
      { label: "Pulse", value: "Behind the medial malleolus, midway between it and the calcaneal tendon" },
      { label: "Behind the medial malleolus (front to back)", value: "Tibialis posterior, flexor digitorum longus, artery and veins, tibial nerve, flexor hallucis longus" },
    ],
    connections: [
      { concept: "popliteal-artery", relation: "branch-of" },
      { concept: "arteries-of-the-foot", relation: "gives-rise-to", note: "medial and lateral plantar arteries" },
      { concept: "soleus", relation: "flows-to" },
      { concept: "tibialis-posterior", relation: "flows-to" },
      { concept: "flexor-digitorum-longus", relation: "flows-to" },
      { concept: "flexor-hallucis-longus", relation: "flows-to" },
      { concept: "tibia", relation: "flows-to", note: "nutrient artery" },
      { concept: "posterior-tibial-vein", relation: "adjacent-to" },
      { concept: "tibial-nerve", relation: "adjacent-to" },
      { concept: "calcaneal-tendon", relation: "adjacent-to", note: "pulse felt between the tendon and medial malleolus" },
    ],
    clinical:
      "The posterior tibial pulse is routinely checked, with the dorsalis pedis pulse, when assessing peripheral arterial disease and the diabetic foot.",
  },

  "dorsalis-pedis-artery": {
    summary:
      "The continuation of the anterior tibial artery onto the dorsum of the foot, beginning midway between the malleoli. It runs toward the first intermetatarsal space, lateral to the extensor hallucis longus tendon, where it dives into the sole to complete the plantar arch.",
    latin: "Arteria dorsalis pedis",
    functions: [
      "Supplies the dorsum of the foot and toes (arcuate, lateral tarsal and dorsal metatarsal arteries)",
      "Its deep plantar branch joins the lateral plantar artery to complete the deep plantar arch",
    ],
    facts: [
      { label: "Pulse", value: "On the dorsum of the foot, just lateral to the extensor hallucis longus tendon" },
    ],
    connections: [
      { concept: "anterior-tibial-artery", relation: "receives-from", note: "continuation at the ankle" },
      { concept: "arteries-of-the-foot", relation: "gives-rise-to", note: "arcuate, lateral tarsal, dorsal metatarsal and deep plantar arteries" },
      { concept: "extensor-hallucis-brevis", relation: "flows-to" },
      { concept: "extensor-hallucis-longus", relation: "adjacent-to", note: "tendon lies medial to the pulse" },
      { concept: "intermediate-cuneiform-bone", relation: "adjacent-to" },
      { concept: "first-metatarsal", relation: "adjacent-to", note: "passes between the 1st and 2nd metatarsals" },
      { concept: "second-metatarsal", relation: "adjacent-to" },
    ],
    clinical:
      "The dorsalis pedis pulse is a key check for peripheral arterial disease, although it is difficult to feel or absent in a small proportion of healthy people.",
  },

  "arteries-of-the-foot": {
    summary:
      "The arteries of the sole and dorsum of the foot: the medial and lateral plantar arteries (from the posterior tibial artery), the deep plantar arch and its plantar metatarsal and digital branches, and the arcuate, lateral tarsal, dorsal metatarsal and deep plantar branches of the dorsalis pedis artery, plus calcaneal branches to the heel.",
    functions: [
      "Supply the intrinsic muscles, skin and bones of the foot and toes",
      "The deep plantar arch joins the posterior tibial and dorsalis pedis territories, providing collateral flow",
      "Calcaneal branches supply the heel pad and calcaneus",
    ],
    facts: [
      { label: "Deep plantar arch", value: "Formed mainly by the lateral plantar artery, completed by the deep plantar branch of the dorsalis pedis" },
    ],
    connections: [
      { concept: "posterior-tibial-artery", relation: "branch-of", note: "medial and lateral plantar arteries" },
      { concept: "dorsalis-pedis-artery", relation: "branch-of", note: "arcuate, dorsal metatarsal and deep plantar arteries" },
      { concept: "intrinsic-muscles-of-foot", relation: "flows-to" },
      { concept: "abductor-hallucis", relation: "flows-to" },
      { concept: "flexor-digitorum-brevis", relation: "flows-to" },
      { concept: "calcaneus", relation: "flows-to", note: "calcaneal branches" },
      { concept: "phalanges-of-big-toe", relation: "flows-to", note: "digital arteries" },
      { concept: "plantar-veins-of-foot", relation: "adjacent-to", note: "companion veins" },
      { concept: "tibial-nerve", relation: "adjacent-to", note: "plantar nerves accompany the plantar arteries" },
    ],
    clinical:
      "Disease of these small distal arteries, common in diabetes, contributes to poor healing of foot ulcers and to gangrene of the toes.",
  },

  // ─────────────────────────── Lower limb veins ───────────────────────────
  "dorsal-venous-arch-of-foot": {
    summary:
      "A superficial venous arch on the dorsum of the foot, over the metatarsals, formed by the dorsal digital and metatarsal veins. Its medial end continues as the great saphenous vein and its lateral end as the small saphenous vein.",
    latin: "Arcus venosus dorsalis pedis",
    functions: [
      "Collects superficial venous blood from the toes and dorsum of the foot",
      "Gives origin to both saphenous veins",
    ],
    connections: [
      { concept: "great-saphenous-vein", relation: "flows-to", note: "medial end" },
      { concept: "small-saphenous-vein", relation: "flows-to", note: "lateral end" },
      { concept: "skin", relation: "receives-from", note: "toes and dorsum of the foot" },
    ],
  },

  "plantar-veins-of-foot": {
    summary:
      "The deep veins of the sole: the deep plantar venous arch and its plantar metatarsal and digital tributaries, accompanying the plantar arteries. They drain through the medial and lateral plantar veins into the posterior tibial veins behind the medial malleolus.",
    latin: "Arcus venosus plantaris",
    functions: [
      "Drain the deep tissues and intrinsic muscles of the sole",
      "Compression of the plantar veins during weight-bearing (the foot pump) helps push blood up into the leg veins",
    ],
    connections: [
      { concept: "intrinsic-muscles-of-foot", relation: "receives-from" },
      { concept: "posterior-tibial-vein", relation: "flows-to", note: "via the medial and lateral plantar veins" },
      { concept: "arteries-of-the-foot", relation: "adjacent-to", note: "accompany the plantar arteries" },
    ],
  },

  "great-saphenous-vein": {
    summary:
      "The longest vein in the body, a superficial vein that begins at the medial end of the dorsal venous arch of the foot, passes in front of the medial malleolus, ascends the medial leg and thigh, and drains into the femoral vein through the saphenous opening just below the groin.",
    latin: "Vena saphena magna",
    functions: [
      "Drains the superficial tissues of the medial foot, leg and thigh",
      "Sends blood into the deep veins through perforating veins along its course",
      "Its valves prevent backflow toward the foot",
    ],
    facts: [
      { label: "Saphenofemoral junction", value: "About 3–4 cm below and lateral to the pubic tubercle" },
      { label: "At the ankle", value: "Reliably found just in front of the medial malleolus" },
      { label: "Valves", value: "Roughly a dozen, more numerous in the leg than the thigh" },
    ],
    connections: [
      { concept: "dorsal-venous-arch-of-foot", relation: "receives-from", note: "medial end" },
      { concept: "femoral-vein", relation: "flows-to", note: "saphenofemoral junction" },
      { concept: "perforating-veins", relation: "flows-to", note: "perforators carry blood from superficial to deep veins" },
      { concept: "saphenous-nerve", relation: "adjacent-to", note: "accompanies it in the leg" },
      { concept: "tibia", relation: "adjacent-to", note: "in front of the medial malleolus" },
      { concept: "femur", relation: "adjacent-to", note: "passes behind the medial condyle" },
    ],
    clinical:
      "Incompetent valves, especially at the saphenofemoral junction, cause varicose veins. The great saphenous vein is widely harvested as a graft for coronary bypass surgery.",
  },

  "small-saphenous-vein": {
    summary:
      "A superficial vein that begins at the lateral end of the dorsal venous arch, passes behind the lateral malleolus, ascends the back of the calf beside the calcaneal tendon and between the heads of gastrocnemius, and usually ends in the popliteal vein.",
    latin: "Vena saphena parva",
    functions: [
      "Drains the superficial tissues of the lateral foot and back of the calf",
      "Communicates with the deep veins and the great saphenous vein",
    ],
    connections: [
      { concept: "dorsal-venous-arch-of-foot", relation: "receives-from", note: "lateral end" },
      { concept: "popliteal-vein", relation: "flows-to", note: "saphenopopliteal junction (level varies)" },
      { concept: "perforating-veins", relation: "flows-to" },
      { concept: "gastrocnemius", relation: "adjacent-to", note: "runs between its two heads" },
      { concept: "calcaneal-tendon", relation: "adjacent-to", note: "runs along its lateral border" },
      { concept: "fibula", relation: "adjacent-to", note: "passes behind the lateral malleolus" },
    ],
    clinical: "Reflux at the saphenopopliteal junction is a common cause of varicose veins on the back of the calf.",
  },

  "perforating-veins": {
    summary:
      "Short veins that pierce the deep fascia to connect the superficial veins (great and small saphenous systems) with the deep veins of the leg and thigh. Their valves normally allow blood to flow only from superficial to deep, where the calf muscle pump drives it toward the heart.",
    latin: "Venae perforantes",
    functions: [
      "Carry blood from the superficial to the deep venous system",
      "Their valves protect the superficial veins from the high pressures generated in the deep veins during calf muscle contraction",
    ],
    facts: [
      { label: "Main groups", value: "Thigh, knee, medial calf and ankle perforators (older eponyms: Dodd, Boyd, Cockett)" },
    ],
    connections: [
      { concept: "great-saphenous-vein", relation: "receives-from" },
      { concept: "small-saphenous-vein", relation: "receives-from" },
      { concept: "posterior-tibial-vein", relation: "flows-to", note: "medial calf perforators" },
      { concept: "femoral-vein", relation: "flows-to", note: "thigh perforators" },
    ],
    clinical:
      "When perforator valves fail, high deep-vein pressure is transmitted to the skin veins, contributing to varicose veins, skin changes and venous ulcers, typically just above the medial malleolus.",
  },

  "anterior-tibial-vein": {
    summary:
      "Paired deep veins (venae comitantes) accompanying the anterior tibial artery in the anterior compartment of the leg. They pass back above the interosseous membrane to join the posterior tibial veins and form the popliteal vein.",
    latin: "Venae tibiales anteriores",
    functions: ["Drain the anterior compartment of the leg and the dorsum of the foot"],
    connections: [
      { concept: "tibialis-anterior", relation: "receives-from" },
      { concept: "extensor-digitorum-longus", relation: "receives-from" },
      { concept: "extensor-hallucis-longus", relation: "receives-from" },
      { concept: "popliteal-vein", relation: "flows-to" },
      { concept: "anterior-tibial-artery", relation: "adjacent-to" },
      { concept: "interosseous-membrane-of-leg", relation: "adjacent-to" },
    ],
  },

  "posterior-tibial-vein": {
    summary:
      "Paired deep veins accompanying the posterior tibial artery. They are formed behind the medial malleolus by the plantar veins, receive the fibular veins and the venous sinuses of soleus, and unite with the anterior tibial veins to form the popliteal vein.",
    latin: "Venae tibiales posteriores",
    functions: [
      "Drain the sole and the posterior compartment of the leg",
      "Receive blood squeezed out of the soleal venous sinuses by the calf muscle pump",
      "Receive blood from superficial veins via the medial calf perforators",
    ],
    connections: [
      { concept: "plantar-veins-of-foot", relation: "receives-from" },
      { concept: "fibular-vein", relation: "receives-from" },
      { concept: "soleus", relation: "receives-from", note: "soleal venous sinuses" },
      { concept: "perforating-veins", relation: "receives-from", note: "medial calf perforators" },
      { concept: "popliteal-vein", relation: "flows-to" },
      { concept: "posterior-tibial-artery", relation: "adjacent-to" },
      { concept: "tibial-nerve", relation: "adjacent-to" },
    ],
    clinical:
      "Calf deep vein thrombosis often begins in the soleal sinuses and the posterior tibial and fibular veins, especially during immobility; it can extend upward and embolize to the lungs.",
  },

  "fibular-vein": {
    summary:
      "Paired deep veins (venae comitantes) accompanying the fibular (peroneal) artery close to the fibula in the deep posterior compartment. They drain the lateral and posterior leg and join the posterior tibial veins.",
    latin: "Venae fibulares (peroneae)",
    functions: ["Drain the lateral (fibular) compartment and deep posterior compartment muscles"],
    connections: [
      { concept: "fibularis-longus", relation: "receives-from" },
      { concept: "fibularis-brevis", relation: "receives-from" },
      { concept: "flexor-hallucis-longus", relation: "receives-from" },
      { concept: "soleus", relation: "receives-from" },
      { concept: "posterior-tibial-vein", relation: "flows-to" },
      { concept: "fibula", relation: "adjacent-to" },
    ],
    clinical: "The fibular veins are, with the posterior tibial and soleal veins, a common site of isolated calf DVT.",
  },

  "popliteal-vein": {
    summary:
      "The deep vein behind the knee, formed at the lower border of popliteus by the union of the anterior and posterior tibial veins. It ascends through the popliteal fossa between the popliteal artery and the tibial nerve, receives the small saphenous vein and becomes the femoral vein at the adductor hiatus.",
    latin: "Vena poplitea",
    functions: [
      "Drains the whole leg below the knee, both deep and (via the small saphenous vein) superficial",
      "Receives the genicular and sural (gastrocnemius) veins",
    ],
    connections: [
      { concept: "anterior-tibial-vein", relation: "receives-from" },
      { concept: "posterior-tibial-vein", relation: "receives-from" },
      { concept: "small-saphenous-vein", relation: "receives-from" },
      { concept: "genicular-veins", relation: "receives-from" },
      { concept: "gastrocnemius", relation: "receives-from", note: "sural veins" },
      { concept: "femoral-vein", relation: "flows-to", note: "continuation at the adductor hiatus" },
      { concept: "popliteal-artery", relation: "adjacent-to", note: "deep to the vein" },
      { concept: "tibial-nerve", relation: "adjacent-to", note: "superficial to the vein" },
    ],
    clinical:
      "Deep vein thrombosis at or above the popliteal vein (proximal DVT) carries a substantial risk of pulmonary embolism and is treated with anticoagulation.",
  },

  "genicular-veins": {
    summary:
      "Companion veins of the genicular arteries that drain the knee joint and surrounding tissues into the popliteal vein.",
    latin: "Venae genus",
    functions: ["Drain the knee joint capsule, menisci rim, patellar region and ends of the femur and tibia"],
    connections: [
      { concept: "popliteal-vein", relation: "flows-to" },
      { concept: "menisci-of-knee", relation: "receives-from", note: "outer vascular rim" },
      { concept: "patella", relation: "receives-from" },
      { concept: "genicular-arteries", relation: "adjacent-to" },
    ],
  },

  "femoral-vein": {
    summary:
      "The main deep vein of the thigh, continuing from the popliteal vein at the adductor hiatus. It ascends through the adductor canal and the femoral triangle, where it lies medial to the femoral artery, receives the deep femoral and great saphenous veins, and becomes the external iliac vein behind the inguinal ligament.",
    latin: "Vena femoralis",
    functions: [
      "Returns blood from nearly the whole lower limb",
      "Receives the superficial system at the saphenofemoral junction",
    ],
    facts: [
      { label: "Position in femoral triangle", value: "Medial to the femoral artery, within the femoral sheath" },
      { label: "Terminology", value: "The segment clinicians once called the 'superficial femoral vein' is a deep vein" },
    ],
    connections: [
      { concept: "popliteal-vein", relation: "receives-from", note: "continuation at the adductor hiatus" },
      { concept: "deep-femoral-vein", relation: "receives-from" },
      { concept: "great-saphenous-vein", relation: "receives-from", note: "saphenofemoral junction" },
      { concept: "lateral-circumflex-femoral-vein", relation: "receives-from", note: "often" },
      { concept: "medial-circumflex-femoral-vein", relation: "receives-from", note: "often" },
      { concept: "perforating-veins", relation: "receives-from", note: "thigh perforators" },
      { concept: "external-iliac-vein", relation: "flows-to", note: "continues behind the inguinal ligament" },
      { concept: "femoral-artery", relation: "adjacent-to", note: "vein lies medial to the artery" },
      { concept: "sartorius", relation: "adjacent-to", note: "covers it in the adductor canal" },
      { concept: "adductor-longus", relation: "adjacent-to" },
    ],
    clinical:
      "Femoral vein DVT is proximal DVT, with a high risk of pulmonary embolism. The vein can be cannulated just medial to the femoral pulse for emergency central venous access.",
  },

  "deep-femoral-vein": {
    summary:
      "The companion vein of the deep femoral (profunda femoris) artery, lying in front of it behind adductor longus. It collects blood from the thigh muscles through veins accompanying the perforating arteries and ends in the femoral vein a few centimetres below the inguinal ligament.",
    latin: "Vena profunda femoris",
    functions: [
      "Drains the adductor, hamstring and much of the quadriceps musculature",
      "Provides a collateral channel between the popliteal and femoral veins if the femoral vein is blocked",
    ],
    connections: [
      { concept: "femoral-vein", relation: "flows-to" },
      { concept: "adductor-magnus", relation: "receives-from" },
      { concept: "biceps-femoris", relation: "receives-from" },
      { concept: "vastus-lateralis", relation: "receives-from" },
      { concept: "lateral-circumflex-femoral-vein", relation: "receives-from", note: "sometimes" },
      { concept: "medial-circumflex-femoral-vein", relation: "receives-from", note: "sometimes" },
      { concept: "perforating-arteries", relation: "adjacent-to", note: "its tributaries accompany them" },
      { concept: "adductor-longus", relation: "adjacent-to", note: "runs behind it" },
    ],
  },

  "lateral-circumflex-femoral-vein": {
    summary:
      "The companion vein(s) of the lateral circumflex femoral artery, draining the lateral thigh muscles and hip region into the femoral vein or the deep femoral vein (the pattern varies).",
    latin: "Venae circumflexae femoris laterales",
    functions: ["Drain vastus lateralis, rectus femoris, tensor fasciae latae and the greater trochanter region"],
    connections: [
      { concept: "vastus-lateralis", relation: "receives-from" },
      { concept: "rectus-femoris", relation: "receives-from" },
      { concept: "tensor-fasciae-latae", relation: "receives-from" },
      { concept: "femoral-vein", relation: "flows-to", note: "often" },
      { concept: "deep-femoral-vein", relation: "flows-to", note: "sometimes" },
      { concept: "lateral-circumflex-femoral-artery", relation: "adjacent-to" },
    ],
  },

  "medial-circumflex-femoral-vein": {
    summary:
      "The companion vein(s) of the medial circumflex femoral artery, draining the medial thigh muscles and the region of the hip joint and femoral neck into the femoral vein or the deep femoral vein.",
    latin: "Venae circumflexae femoris mediales",
    functions: ["Drain the adductor muscles, pectineus, obturator externus and the hip joint region"],
    connections: [
      { concept: "adductor-brevis", relation: "receives-from" },
      { concept: "pectineus", relation: "receives-from" },
      { concept: "obturator-externus", relation: "receives-from" },
      { concept: "femoral-vein", relation: "flows-to", note: "often" },
      { concept: "deep-femoral-vein", relation: "flows-to", note: "sometimes" },
      { concept: "femur", relation: "adjacent-to", note: "winds around the femoral neck region" },
    ],
  },
};
