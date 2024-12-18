/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkcard_learning"] = self["webpackChunkcard_learning"] || []).push([["main"],{

/***/ "./src/app/Events.ts":
/*!***************************!*\
  !*** ./src/app/Events.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Events = void 0;\nvar Events;\n(function (Events) {\n    Events[\"RESIZE\"] = \"resize\";\n    Events[\"UPDATE\"] = \"update\";\n    Events[\"SPIN_COMPLETED\"] = \"spinCompleted\";\n    Events[\"POINTER_DOWN\"] = \"pointerdown\";\n    Events[\"FPS\"] = \"fps\";\n    Events[\"SPIN_STOPPING\"] = \"spinStopping\";\n})(Events || (exports.Events = Events = {}));\n\n\n//# sourceURL=webpack://card-learning/./src/app/Events.ts?");

/***/ }),

/***/ "./src/app/Game.ts":
/*!*************************!*\
  !*** ./src/app/Game.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = void 0;\nconst DisplayManager_1 = __webpack_require__(/*! ./managers/DisplayManager */ \"./src/app/managers/DisplayManager.ts\");\nconst SceneManager_1 = __webpack_require__(/*! ./managers/SceneManager */ \"./src/app/managers/SceneManager.ts\");\nconst Loader_1 = __webpack_require__(/*! ./scenes/Loader */ \"./src/app/scenes/Loader.ts\");\nconst ResourceLoader_1 = __webpack_require__(/*! ./managers/ResourceLoader */ \"./src/app/managers/ResourceLoader.ts\");\nclass Game {\n    constructor() {\n        Game._instance = this;\n        this.init();\n    }\n    init() {\n        this._stage = new SceneManager_1.SceneManager(this);\n        this._display = new DisplayManager_1.DisplayManager(this._stage.main);\n        this._display.create();\n        this._resource = new ResourceLoader_1.ResourceLoader();\n        this._loader = new Loader_1.LoaderStage(this, \"LoaderScene\");\n        this._resource.loadAssets();\n        this._stage.createScene(\"LoaderStage\", this._loader);\n        this._stage.goToScene(\"LoaderStage\", true);\n    }\n    static get instance() {\n        return Game._instance;\n    }\n    get stage() {\n        return this._stage;\n    }\n    get display() {\n        return this._display;\n    }\n    get resource() {\n        return this._resource;\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack://card-learning/./src/app/Game.ts?");

/***/ }),

/***/ "./src/app/managers/DisplayManager.ts":
/*!********************************************!*\
  !*** ./src/app/managers/DisplayManager.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DisplayManager = exports.DisplayOrientation = void 0;\nconst Events_1 = __webpack_require__(/*! ../Events */ \"./src/app/Events.ts\");\nconst eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nconst SIZE = [2000, 1500];\nconst RATIO = SIZE[0] / SIZE[1];\nvar DisplayOrientation;\n(function (DisplayOrientation) {\n    DisplayOrientation[DisplayOrientation[\"PORTRAIT\"] = 0] = \"PORTRAIT\";\n    DisplayOrientation[DisplayOrientation[\"LANDSCAPE\"] = 1] = \"LANDSCAPE\";\n})(DisplayOrientation || (exports.DisplayOrientation = DisplayOrientation = {}));\nclass DisplayManager extends eventemitter3_1.EventEmitter {\n    constructor(mainContainer) {\n        super();\n        this.resolution = 1;\n        this._mainContainer = mainContainer;\n    }\n    create() {\n        this._app = new pixi_js_1.Application({\n            width: 2048,\n            height: 1536,\n            backgroundColor: 0x333f48,\n            antialias: true,\n            resolution: window.devicePixelRatio || 1,\n            autoDensity: true,\n        });\n        globalThis.__PIXI_APP__ = this._app;\n        pixi_js_1.Ticker.shared.maxFPS = 60;\n        pixi_js_1.Ticker.shared.add((delta) => {\n            this.emit(Events_1.Events.UPDATE, delta);\n            this.emit(Events_1.Events.FPS, delta);\n        });\n        document.body.appendChild(this._app.view);\n        window.addEventListener(Events_1.Events.RESIZE, this.onResize.bind(this), false);\n        this.onResize();\n        this._mainContainer.name = \"MainContainer\";\n        this._app.stage.addChild(this._mainContainer);\n    }\n    onResize() {\n        const design = { width: 2048, height: 1536 };\n        const scaleXa = window.innerWidth / design.width;\n        const scaleYa = window.innerHeight / design.height;\n        const scale = Math.min(scaleXa, scaleYa);\n        this._app.renderer.resize(window.innerWidth, window.innerHeight);\n        const posX = window.innerWidth;\n        const posY = window.innerHeight;\n        this._mainContainer.scale.set(scale / this.resolution);\n        this._mainContainer.position.set(posX * 0.5, posY * 0.5);\n    }\n    get app() {\n        return this._app;\n    }\n}\nexports.DisplayManager = DisplayManager;\n\n\n//# sourceURL=webpack://card-learning/./src/app/managers/DisplayManager.ts?");

/***/ }),

/***/ "./src/app/managers/ResourceLoader.ts":
/*!********************************************!*\
  !*** ./src/app/managers/ResourceLoader.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ResourceLoader = void 0;\nconst PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\"));\nconst eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\nclass ResourceLoader extends eventemitter3_1.EventEmitter {\n    constructor() {\n        super();\n        this.assets = [\n            { name: \"background\", url: \"assets/background.jpg\" },\n            { name: \"symbols\", url: \"assets/slotSymbols.json\" },\n            { name: \"coin\", url: \"assets/coin.png\" },\n        ];\n        this.loader = new PIXI.Loader();\n    }\n    loadAssets() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                // Add assets to the loader\n                this.assets.forEach((asset) => this.loader.add(asset.name, asset.url));\n                // Load the assets\n                yield new Promise((resolve, reject) => {\n                    this.loader.load(() => {\n                        this.emit(\"loadComplete\");\n                        resolve();\n                    });\n                    this.loader.onError.add((error) => {\n                        console.error(\"Error loading assets:\", error);\n                        this.emit(\"loadError\", error);\n                        reject(error);\n                    });\n                });\n            }\n            catch (error) {\n                console.error(\"Error loading assets:\", error);\n                this.emit(\"loadError\", error);\n                throw error;\n            }\n        });\n    }\n    getTexture(name) {\n        const resource = this.loader.resources[name];\n        return resource ? resource.texture : undefined;\n    }\n    destroy() {\n        // Destroy loaded resources\n        this.assets.forEach((asset) => {\n            var _a;\n            const resource = this.loader.resources[asset.name];\n            if (resource) {\n                (_a = resource.texture) === null || _a === void 0 ? void 0 : _a.destroy(true);\n                delete this.loader.resources[asset.name];\n            }\n        });\n        this.loader.reset();\n        this.removeAllListeners();\n    }\n}\nexports.ResourceLoader = ResourceLoader;\n\n\n//# sourceURL=webpack://card-learning/./src/app/managers/ResourceLoader.ts?");

/***/ }),

/***/ "./src/app/managers/SceneManager.ts":
/*!******************************************!*\
  !*** ./src/app/managers/SceneManager.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SceneManager = void 0;\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nclass SceneManager {\n    constructor(game) {\n        this._mainContainer = new pixi_js_1.Container();\n        this._scenes = {};\n        this.game = game;\n        this._mainContainer = new pixi_js_1.Container();\n        this._mainContainer.name = \"RootContainer\";\n    }\n    createScene(id, TScene) {\n        if (this._scenes[id])\n            return undefined;\n        var scene = TScene;\n        this._scenes[id] = scene;\n        this._mainContainer.addChild(this._scenes[id]);\n        return scene;\n    }\n    goToScene(id, reset) {\n        if (this._scenes[id]) {\n            if (this._currentStage) {\n                if (reset) {\n                    this._currentStage.removeChildren();\n                    this._mainContainer.removeChildren();\n                }\n                else {\n                    this._currentStage.visible = false;\n                    this._scenes[id].visible = true;\n                }\n                this._currentStage.dispose();\n            }\n            this._mainContainer.addChild(this._scenes[id]);\n            this._currentStage = this._scenes[id];\n            this._currentStage.init();\n            return true;\n        }\n        return false;\n    }\n    get scenes() {\n        return this._scenes;\n    }\n    get main() {\n        return this._mainContainer;\n    }\n}\nexports.SceneManager = SceneManager;\n\n\n//# sourceURL=webpack://card-learning/./src/app/managers/SceneManager.ts?");

/***/ }),

/***/ "./src/app/scenes/Loader.ts":
/*!**********************************!*\
  !*** ./src/app/scenes/Loader.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.LoaderStage = void 0;\nconst Main_1 = __webpack_require__(/*! ../scenes/Main */ \"./src/app/scenes/Main.ts\");\nconst Scene_1 = __webpack_require__(/*! ../types/Scene */ \"./src/app/types/Scene.ts\");\nclass LoaderStage extends Scene_1.Scene {\n    init() {\n        this.game.resource.once(\"loadcomplete\", this.onLoadComplete, this);\n    }\n    onLoadComplete() {\n        this.game.stage.createScene(\"Main\", new Main_1.Main(this.game, \"MainGame\"));\n        this.game.stage.goToScene(\"Main\", true);\n    }\n    dispose() {\n        this.game.resource.off(\"loadcomplete\");\n    }\n}\nexports.LoaderStage = LoaderStage;\n\n\n//# sourceURL=webpack://card-learning/./src/app/scenes/Loader.ts?");

/***/ }),

/***/ "./src/app/scenes/Main.ts":
/*!********************************!*\
  !*** ./src/app/scenes/Main.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Main = void 0;\n__webpack_require__(/*! pixi-spine */ \"./node_modules/pixi-spine/bin/pixi-spine.js\");\nconst Scene_1 = __webpack_require__(/*! ../types/Scene */ \"./src/app/types/Scene.ts\");\n//our main scene\nclass Main extends Scene_1.Scene {\n    init() { }\n    relayout(orientation) { }\n    dispose() { }\n}\nexports.Main = Main;\n\n\n//# sourceURL=webpack://card-learning/./src/app/scenes/Main.ts?");

/***/ }),

/***/ "./src/app/types/Scene.ts":
/*!********************************!*\
  !*** ./src/app/types/Scene.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Scene = void 0;\nconst pixi_js_1 = __webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\");\nclass Scene extends pixi_js_1.Container {\n    constructor(game, name = \"Stage\") {\n        super();\n        this.game = game;\n    }\n}\nexports.Scene = Scene;\n\n\n//# sourceURL=webpack://card-learning/./src/app/types/Scene.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\"));\n__webpack_require__(/*! @pixi-spine/all-3.8 */ \"./node_modules/@pixi-spine/all-3.8/lib/index.js\"); // Import Spine plugin\n// Assign PIXI to window\nwindow.PIXI = PIXI;\n// Import and initialize game\nconst Game_1 = __webpack_require__(/*! ./app/Game */ \"./src/app/Game.ts\");\nconst game = new Game_1.Game();\n// Make game globally accessible\nwindow.Game = game;\n\n\n//# sourceURL=webpack://card-learning/./src/index.ts?");

/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

eval("/* (ignored) */\n\n//# sourceURL=webpack://card-learning/./util.inspect_(ignored)?");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_pixi-spine_all-3_8_lib_index_js-node_modules_pixi-spine_bin_pixi-spine_j-8f50c8"], () => (__webpack_exec__("./src/index.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);