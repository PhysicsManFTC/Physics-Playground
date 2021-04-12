export class SceneManager {
  constructor(global) {
    this.scenes = {};
    this.currentScene = {};
    this.global = global;
    this.Animation = {
      request:
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame,
      cancel: window.cancelAnimationFrame || window.mozCancelAnimationFrame,
      id: null
    };
  }
  addScene(SceneClass) {
    var SceneInst = new SceneClass(this.global);

    SceneInst.sceneCheck = SceneClass.name;

    var scene = {
      SceneClass: SceneClass,
      SceneInst: SceneInst,
      SceneName: SceneClass.name,
      hasPreload: "preload" in SceneInst,
      hasStart: "start" in SceneInst,
      hasloop: "loop" in SceneInst,
      hasStop: "stop" in SceneInst,
      startExecuted: false
    };

    this.scenes[SceneClass.name] = scene;
    return scene;
  }

  // Returns true if the current displayed scene is fnScene
  isCurrent(SceneName) {
    if (this.currentScene == null) return false;

    return this.currentScene === SceneName;
  }

  // Show a scene based on the function name
  // Optionally you can send arguments to the scene
  // Arguments will be retrieved in the scene via .sceneArgs property
  showScene(nScene) {
    var scene = this.scenes[nScene];

    if (scene == null) {
      console.debug(`Scene ${nScene} was not found`);
      return;
    }

    // Re-arm the enter function at each show of the scene
    scene.startExecuted = false;

    this.currentScene = scene;

    this.preload(scene.preload(), () => {
      this.Animation.id = Animation.request(this.loop);
    });
  }

  preload(paths, callback) {
    var cache = {},
      progress = 0;
    for (var i = 0; i < paths.length; i++) {
      let img = new Image();
      img.onload = function () {
        var name = img.src.replace(/^.*[/]/, "");
        cache[name] = img;
        progress++;
        if (progress === paths.length) callback(cache);
      };
      img.src = `assets/${paths[i].src}`;
    }
  }

  loop(timestamp) {
    var DeltaTime = timestamp - this.lastRender;

    var currScene = this.currentScene;
    var SceneInst = currScene.SceneInst;

    if (currScene == null) return;

    if (currScene.hasStart && !currScene.startExecuted) {
      SceneInst.start();
      currScene.startExecuted = true;
    }

    if (currScene.hasLoop) {
      SceneInst.loop(DeltaTime);
    }

    var sceneCheck = SceneInst.sceneCheck;

    if (currScene.SceneName !== sceneCheck) {
      if (currScene.hasStop) SceneInst.stop();
      this.showScene(sceneCheck);
    } else this.currentScene = this.scenes[sceneCheck];
    this.Animation.id = this.Animation.request(this.loop);
  }
}
