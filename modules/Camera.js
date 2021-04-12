/* eslint-disable no-undef, no-unused-vars */

import Matter, { Composite } from "matter-js";

export class Camera {
  constructor(p, world) {
    this.p = p;
    this.world = world;
    this.width = p.width;
    this.height = p.width;
    this.background = "#14151f";
    this.enabled = true;
    this.cg = p.createGraphics(p.width, p.height);
  }
  render() {}
}
