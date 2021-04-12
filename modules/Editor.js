/* eslint-disable no-undef, no-unused-vars */

import Matter, { Engine, MouseConstraint, Render } from "matter-js";

export class Editor {
  constructor(global) {
    this.global = global;
    this.global.gui = [];
  }
  setup() {
    if (!global.gameSetup) {
      // create an engine
      var engine = (global.engine = Engine.create());

      var world = (global.world = engine.world);

      // create a renderer
      var render = (global.render = E({
        engine: global.engine,
        element: document.getElementById("GameDiv"),
        options: {
          wireframes: false
        }
      }));

      // add mouse control
      var mouse = (global.mouse = Mouse.create(render.canvas)),
        mouseConstraint = (global.mouseConstraint = mouseConstraint = MouseConstraint.create(
          engine,
          {
            mouse: mouse,
            constraint: {
              stiffness: 0.2,
              render: {
                visible: false
              }
            }
          }
        ));

      World.add(world, mouseConstraint);

      render.mouse = mouse;

      // keep the mouse in sync with rendering
      var boxA = Bodies.rectangle(400, 200, 80, 80);
      var boxB = Bodies.rectangle(450, 50, 80, 80);
      var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

      World.add(world, [boxA, boxB, ground]);
      global.gameSetup = true;
    }

    

    this.Buttons.create(
      "Test",
      10,
      10,
      100,
      100,
      this.sceneCheck = "Test"
    );
  }
  loop() {
    try {
    Render.world(this.render);
    } catch (error) {
    p.noLoop();
    throw Error(`Loop ${error}`);
    }
  }
}
