import { readFileSync } from "fs";

export interface RawMesh {
  positions: Float32Array; // meters, app frame (x = left, y = up, z = anterior)
  indices: Uint32Array;
}

/**
 * Parse a BodyParts3D OBJ file. BP3D uses millimeters with X = left, Y = posterior, Z = up;
 * we convert to meters with Y up and Z anterior (the glTF / Human Reference Atlas frame).
 */
export function readBp3dObj(path: string): RawMesh {
  const text = readFileSync(path, "utf8");
  const pos: number[] = [];
  const idx: number[] = [];
  let start = 0;
  while (start < text.length) {
    let end = text.indexOf("\n", start);
    if (end === -1) end = text.length;
    const c0 = text.charCodeAt(start);
    const c1 = text.charCodeAt(start + 1);
    if (c0 === 118 /* v */ && c1 === 32) {
      const parts = text.slice(start + 2, end).trim().split(/\s+/);
      const x = parseFloat(parts[0]);
      const y = parseFloat(parts[1]);
      const z = parseFloat(parts[2]);
      pos.push(x / 1000, z / 1000, -y / 1000);
    } else if (c0 === 102 /* f */ && c1 === 32) {
      const parts = text.slice(start + 2, end).trim().split(/\s+/);
      const v = parts.map((p) => parseInt(p.split("/")[0], 10) - 1);
      for (let i = 1; i + 1 < v.length; i++) idx.push(v[0], v[i], v[i + 1]);
    }
    start = end + 1;
  }
  return { positions: new Float32Array(pos), indices: new Uint32Array(idx) };
}

export interface Bp3dHeader {
  fj: string;
  name: string;
  concept: string;
}

export function readBp3dHeader(path: string): Bp3dHeader {
  const text = readFileSync(path, "utf8").slice(0, 2000);
  const get = (key: string) => {
    const m = text.match(new RegExp(`# ${key} : (.*)`));
    return m ? m[1].trim() : "";
  };
  return { fj: get("File ID"), name: get("English name"), concept: get("Concept ID") };
}
