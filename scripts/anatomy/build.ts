/**
 * Anatomy model build entry point.
 *   npx tsx scripts/anatomy/build.ts [male|female|all] [--no-ao]
 * Requires source data fetched by scripts/anatomy/fetch-sources.ts.
 */
import path from "path";
import { buildMaleStructures } from "./assemble";
import { exportModel } from "./export";
import { buildFemale } from "./female";

const OUT_DIR = path.resolve("client/public/models");

async function main() {
  const which = process.argv[2] ?? "all";
  const skipAo = process.argv.includes("--no-ao");
  const male = await buildMaleStructures();
  if (which === "male" || which === "all") {
    await exportModel(male, { sex: "male", outDir: OUT_DIR, skipAo });
  }
  if (which === "female" || which === "all") {
    const female = await buildFemale(male);
    await exportModel(female, { sex: "female", outDir: OUT_DIR, skipAo });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
