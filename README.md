# Anatomica — 3D Human Anatomy Explorer

An interactive atlas of an archetypal **adult female and male** human body for university
biology and anatomy classes. Students dissect the body layer by layer from skin to skeleton,
slice it with section planes, tap any of ~1,000 structures to learn what it does, and follow
how it is supplied, drained, innervated and attached. Data overlays recolour the whole
body by physiology. The same code runs in the browser and as native **iOS** and **Android**
apps through Capacitor, fully offline.

## Features

- **Two complete archetypes**: ♀ female and ♂ male, each with about 995 named structures and
  830k triangles. Both include bones, muscles, tendons, arteries, veins, nerves, brain,
  eyes, organs, glands and the lungs split into lobes.
- **Dissection depth**: drag from *Skin → Superficial muscles → Deep muscles → Organs, vessels &
  nerves → Skeleton*. Layers fade continuously, and an optional translucent body outline
  keeps you oriented.
- **Body systems**: 11 systems you can toggle or solo (integumentary, muscular, skeletal,
  nervous, cardiovascular, respiratory, digestive, urinary, reproductive, endocrine,
  lymphatic).
- **Tap to inspect**: every structure opens its summary, Latin name, functions and key facts.
  Muscles also show origin, insertion, action, innervation and blood supply. Clinical notes
  and sex differences are included.
- **Connections**: animated arcs and atlas-style callouts link the selection to its blood
  supply, venous drainage, nerves, attachments and articulations, with 1,000 to 1,500 links
  per system. Tap a callout to jump to that structure.
- **Section planes**: sagittal, coronal and transverse cuts with shaded cut faces, like an
  MRI or CT plane.
- **Exploded view**, **isolate** (one structure, or both left and right), **hide** and
  **focus**.
- **Data layers**:
  - Blood oxygen saturation, with pulses travelling out along arteries and back along veins
  - Share of cardiac output
  - Perfusion per 100 g of tissue
  - Organ metabolic rate
  - Arterial territories
  - Nerve supply (plexus colouring, with impulses moving out from the spinal cord)
  - Embryonic germ layers
  - Systems
  - Tissue types
- **Search** (⌘K / Ctrl-K): finds structures by English or Latin name, then reveals and
  frames the result.
- **Quiz**: *Find it* (tap the named structure) and *Name it* (identify the highlighted one).
  Questions come only from structures visible on screen. Scores and best streak are kept on
  the device.
- **Touch-first layout** on phones and portrait tablets: a bottom sheet, a thumb-reachable
  depth rail and haptic feedback in the native apps. Desktop gets side panels, hover
  tooltips and keyboard shortcuts.

| Gesture / key | Action |
| --- | --- |
| drag · left mouse | rotate |
| pinch · scroll | zoom (toward the cursor) |
| two-finger drag · right mouse | pan |
| tap / click | select |
| double-tap | fly to the structure |
| `1`–`5` | jump to a dissection layer |
| `F` / `H` / `I` | focus / hide / isolate the selection |
| `/`, ⌘K | search |
| `Esc` | deselect / end quiz |

## Running it

```bash
npm install
npm run dev          # http://localhost:5000 (Express + Vite dev server)
npm run check        # type-check the app
```

A production web build is created with `npm run build` and started with `npm start`. The client is
completely static (`dist/public`), so it can also be hosted on any static file host.

### iOS and Android

The native projects live in `ios/` and `android/` (Capacitor 8).

```bash
npm run cap:ios       # builds the web app, syncs it into ios/, opens Xcode
npm run cap:android   # builds the web app, syncs it into android/, opens Android Studio
```

You need Xcode 16+ on macOS for iOS and Android Studio (SDK 35+) for Android. The models,
fonts and knowledge base ship inside the app bundle, so no network is needed at runtime. App
icons and splash screens are generated from `assets/` with `npx @capacitor/assets generate`.

## How it works

### Rendering (`client/src/three`)

Each render group (bone, muscle, artery, …) is one merged mesh. Every vertex carries a
`_sid` attribute holding its structure index. Small float textures hold per-structure
state: opacity, highlight, ghosting, animation channel, colour and centre. The patched
`MeshPhysicalMaterial` shaders (`anatomyMaterial.ts`) read them with `texelFetch`, so
peeling, isolating, recolouring and exploding any of ~1,000 structures only means updating a
texture. Hidden structures are collapsed in the vertex shader and cost no fragment work.

Other rendering details:

- Opaque and translucent passes are separate. Removed layers can render as a fresnel
  "ghost".
- Cut faces are shaded from back faces.
- Wrap lighting fakes subsurface scattering.
- Ambient occlusion is baked per dissection layer.
- Picking renders structure IDs on the GPU. The same pass samples which structures are
  visible for the quiz.

### Knowledge base (`client/src/data/knowledge`)

About 590 concept entries (left and right twins share one) written for first-year university
level. They are typed by `types.ts` and link to each other through 15 relation types
(`supplied-by`, `innervated-by`, `attaches-to`, `flows-to`, …). The base loads lazily after
the model.

### Model pipeline (`scripts/anatomy`)

```bash
npm run anatomy:fetch   # downloads BodyParts3D 4.0 and HRA reference organs into .cache/anatomy
npm run anatomy:build   # writes client/public/models/{male,female}.{glb,json}
npm run check:anatomy   # type-check the pipeline
```

1. **Catalogue**: about 2,200 BodyParts3D parts are mapped by rule (`catalog.ts`) to named
   structures with system, render group, dissection layer, side and colour.
2. **Gap filling**: structures missing from BodyParts3D are generated from the surrounding
   anatomy (`generators/`):
   - lungs, carved from the thoracic cavity and split into lobes
   - spinal cord and cauda equina, following the vertebral canal
   - spinal nerves, brachial, lumbar and sacral plexuses and their major limb nerves
   - sympathetic trunk, and the vagus, phrenic and intercostal nerves
   - thyroid gland, latissimus dorsi, temporalis and masseter
3. **Female archetype** (`female.ts`):
   - The male model's arms are re-posed.
   - The model is warped into the Visible Human Female body with a thin-plate spline fitted
     to discs, bones, organs and the skin surface. Inconsistent correspondences are
     filtered out so the warp cannot fold.
   - Female skin, pelvis, lower-limb bones, knee cartilages, sternum, discs and
     reproductive organs are taken directly from the Human Reference Atlas.
4. **Export** (`export.ts`):
   - Meshes are smoothed and simplified per tissue type.
   - Ambient occlusion is baked.
   - Output is one quantised, meshopt-compressed GLB (≈5 MB) plus a JSON manifest per sex.

## Data sources and licences

- **BodyParts3D**, © The Database Center for Life Science (DBCLS), licensed under
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). It is the source of most bones,
  muscles, vessels, nerves and organs. The geometry was simplified, merged, re-posed and
  warped for this app.
- **Human Reference Atlas, 3D reference organs**, from the NIH Human BioMolecular Atlas Program
  (HuBMAP), [humanatlas.io](https://humanatlas.io), licensed under CC BY 4.0. It provides the
  female body surface, pelvis, knees, sternum, intervertebral discs, uterus, uterine tubes,
  ovaries and mammary glands (Visible Human Female).
- The descriptions and physiological figures were written for this app from standard
  references: Gray's Anatomy, Moore's Clinically Oriented Anatomy, Netter, Guyton & Hall,
  Langman's Medical Embryology and Elia (1992). They are typical adult values.

## Limitations

- These are *archetypes*, not scans of one individual. The female body is produced by
  non-rigid registration, so small structures near the hips and groin can sit a few
  millimetres off.
- Generated structures (lungs, spinal cord, peripheral nerves, thyroid and a few muscles)
  are anatomically placed approximations.
- Physiological overlays show organ-level textbook values. They are not simulations.
- The app is for education only and is not a clinical or diagnostic tool.
