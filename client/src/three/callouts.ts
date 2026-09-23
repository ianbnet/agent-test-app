/**
 * Bridge between the 3D scene and the DOM callout layer. The scene publishes anchors
 * (world positions) and, every frame, their projected screen positions; the DOM layer lays
 * the labels out in atlas-style columns with leader lines, updating styles imperatively so
 * nothing re-renders per frame.
 */
import * as THREE from "three";

export interface Callout {
  key: string;
  id: string;
  label: string;
  sub?: string;
  color: string;
  primary?: boolean;
  world: THREE.Vector3;
}

export interface Projected {
  x: number;
  y: number;
  visible: boolean;
}

type Listener = () => void;

class CalloutBus {
  callouts: Callout[] = [];
  screen: Projected[] = [];
  /** Screen-space horizontal extent of the visible body, for placing label columns. */
  body = { left: 0, right: 0, top: 0, bottom: 0 };
  private setListeners = new Set<Listener>();
  private frameListeners = new Set<Listener>();

  set(list: Callout[]) {
    this.callouts = list;
    this.screen = list.map(() => ({ x: 0, y: 0, visible: false }));
    this.setListeners.forEach((l) => l());
  }
  frame() {
    this.frameListeners.forEach((l) => l());
  }
  onSet(l: Listener) {
    this.setListeners.add(l);
    return () => {
      this.setListeners.delete(l);
    };
  }
  onFrame(l: Listener) {
    this.frameListeners.add(l);
    return () => {
      this.frameListeners.delete(l);
    };
  }
}

export const calloutBus = new CalloutBus();
