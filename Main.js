/* eslint-disable no-undef, no-unused-vars */

import { SceneManager } from "./modules/SceneManager.js";
import { Editor } from "./modules/Editor.js";
import { Test } from "./modules/Test.js";
import {Button} from "./modules/Gui/Button.js";

console.clear();

var global = {
Button: Button
};

var sceneManager = new SceneManager(global);

sceneManager.addScene(Editor);
sceneManager.addScene(Test);
sceneManager.showScene(Editor);
