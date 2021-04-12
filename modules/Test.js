/* eslint-disable no-undef, no-unused-vars */

import Matter, { Engine, Render } from "matter-js";

export function Test(p) {
  this.global = p.global
  this.setup = function () {
    p.noCanvas();
  };

  this.Buttons.create("Editor", 10, 10, 100, 100, this.sceneCheck = "Editor");

  this.draw = function () {
    try {
      Engine.update(this.global.engine, p.deltaTime);
      Render.world(this.global.render);
    } catch (error) {
      p.noLoop();
      throw Error(`Loop ${error}`);
    }
  };
}
