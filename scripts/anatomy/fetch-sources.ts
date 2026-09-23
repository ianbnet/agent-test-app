/**
 * Downloads the open anatomy datasets used by the model build into .cache/anatomy:
 *  - BodyParts3D 4.0 (DBCLS) — CC BY 4.0
 *  - Human Reference Atlas 3D reference organs (HuBMAP) — CC BY 4.0
 *
 *   npx tsx scripts/anatomy/fetch-sources.ts
 *
 * Uses curl (honours HTTPS_PROXY) and unzip, available on macOS, Linux and Windows 10+.
 */
import { execFileSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { CACHE_DIR, HRA_DIR } from "./sources";

const BP3D = "https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/isa_BP3D_4.0_obj_99.zip";
const HRA = "https://cdn.humanatlas.io/digital-objects/ref-organ";

/** [organ folder, version, file] of every reference organ the build reads. */
const HRA_FILES: [string, string, string][] = [
  ["skin-female", "v1.5", "3d-vh-f-skin.glb"],
  ["pelvis-female", "v1.3", "3d-vh-f-pelvis.glb"],
  ["knee-female-left", "v1.3", "3d-vh-f-knee-l.glb"],
  ["knee-female-right", "v1.3", "3d-vh-f-knee-r.glb"],
  ["sternum-female", "v1.0", "3d-vh-f-sternum.glb"],
  ["manubrium-female", "v1.0", "3d-vh-f-manubrium.glb"],
  ["intervertebral-disk-female", "v1.0", "3d-vh-f-intervertebral-disk.glb"],
  ["heart-female", "v1.3", "3d-vh-f-heart.glb"],
  ["lung-female", "v1.4", "3d-vh-f-lung.glb"],
  ["liver-female", "v1.2", "3d-vh-f-liver.glb"],
  ["kidney-female-left", "v1.3", "3d-vh-f-kidney-l.glb"],
  ["kidney-female-right", "v1.3", "3d-vh-f-kidney-r.glb"],
  ["urinary-bladder-female", "v1.2", "3d-vh-f-urinary-bladder.glb"],
  ["spleen-female", "v1.3", "3d-vh-f-spleen.glb"],
  ["trachea-female", "v1.1", "3d-vh-f-trachea.glb"],
  ["larynx-female", "v1.1", "3d-vh-f-larynx.glb"],
  ["eye-female-left", "v1.3", "3d-vh-f-eye-l.glb"],
  ["eye-female-right", "v1.3", "3d-vh-f-eye-r.glb"],
  ["uterus-female", "v1.2", "3d-vh-f-uterus.glb"],
  ["ovary-female-left", "v1.3", "3d-vh-f-ovary-l.glb"],
  ["ovary-female-right", "v1.3", "3d-vh-f-ovary-r.glb"],
  ["fallopian-tube-female-left", "v1.2", "3d-vh-f-fallopian-tube-l.glb"],
  ["fallopian-tube-female-right", "v1.2", "3d-vh-f-fallopian-tube-r.glb"],
  ["mammary-gland-female-left", "v1.1", "3d-vh-f-mammary-gland-l.glb"],
  ["mammary-gland-female-right", "v1.1", "3d-vh-f-mammary-gland-r.glb"],
  ["large-intestine-female", "v1.3", "3d-sbu-f-large-intestine.glb"],
];

function curl(url: string, out: string) {
  execFileSync("curl", ["-fsSL", "--retry", "4", "--retry-delay", "2", "-o", out, url], { stdio: "inherit" });
}

async function main() {
  mkdirSync(HRA_DIR, { recursive: true });
  const zip = path.join(CACHE_DIR, path.basename(BP3D));
  if (!existsSync(path.join(CACHE_DIR, "isa_BP3D_4.0_obj_99"))) {
    if (!existsSync(zip)) {
      console.log("Downloading BodyParts3D (~140 MB)…");
      curl(BP3D, zip);
    }
    execFileSync("unzip", ["-q", "-o", zip, "-d", CACHE_DIR], { stdio: "inherit" });
  }
  for (const [organ, version, file] of HRA_FILES) {
    const out = path.join(HRA_DIR, file);
    if (existsSync(out)) continue;
    console.log(`Downloading ${file}`);
    curl(`${HRA}/${organ}/${version}/assets/${file}`, out);
  }
  console.log(`Sources ready in ${CACHE_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
