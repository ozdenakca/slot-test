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
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Events = void 0;\nvar Events;\n(function (Events) {\n    Events[\"RESIZE\"] = \"resize\";\n    Events[\"UPDATE\"] = \"update\";\n    Events[\"SPIN_COMPLETED\"] = \"spinCompleted\";\n    Events[\"POINTER_DOWN\"] = \"pointerdown\";\n    Events[\"FPS\"] = \"fps\";\n    Events[\"SPIN_STOPPING\"] = \"spinStopping\";\n    Events[\"VIEWPORT_RESIZE\"] = \"viewport_resize\";\n})(Events || (exports.Events = Events = {}));\n\n\n//# sourceURL=webpack://card-learning/./src/app/Events.ts?");

/***/ }),

/***/ "./src/app/Game.ts":
/*!*************************!*\
  !*** ./src/app/Game.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = exports.TYPES = void 0;\nconst DisplayManager_1 = __webpack_require__(/*! ./managers/DisplayManager */ \"./src/app/managers/DisplayManager.ts\");\nconst SceneManager_1 = __webpack_require__(/*! ./managers/SceneManager */ \"./src/app/managers/SceneManager.ts\");\nconst Loader_1 = __webpack_require__(/*! ./scenes/Loader */ \"./src/app/scenes/Loader.ts\");\nconst ResourceManager_1 = __webpack_require__(/*! ./managers/ResourceManager */ \"./src/app/managers/ResourceManager.ts\");\nconst SpinMediator_1 = __webpack_require__(/*! ./mediators/SpinMediator */ \"./src/app/mediators/SpinMediator.ts\");\nconst inject_1 = __webpack_require__(/*! ./utils/inject */ \"./src/app/utils/inject.ts\");\nexports.TYPES = {\n    Mediator: Symbol.for(\"Mediator\"),\n};\nclass Game {\n    constructor() {\n        Game._instance = this;\n        this.init();\n    }\n    init() {\n        inject_1.DependencyContainer.register(\"SpinMediator\", new SpinMediator_1.SpinMediator());\n        inject_1.DependencyContainer.initialize();\n        this._stage = new SceneManager_1.SceneManager(this);\n        this._display = new DisplayManager_1.DisplayManager(this._stage.main);\n        this._display.create();\n        this._resource = new ResourceManager_1.ResourceManager();\n        this._loader = new Loader_1.LoaderStage(this, \"LoaderScene\");\n        this._resource.loadAssets();\n        this._stage.createScene(\"LoaderStage\", this._loader);\n        this._stage.goToScene(\"LoaderStage\", true);\n    }\n    static get instance() {\n        return Game._instance;\n    }\n    get stage() {\n        return this._stage;\n    }\n    get display() {\n        return this._display;\n    }\n    get resource() {\n        return this._resource;\n    }\n    getDependency(type) {\n        return inject_1.DependencyContainer.resolve(type.name);\n    }\n}\nexports.Game = Game;\n\n\n//# sourceURL=webpack://card-learning/./src/app/Game.ts?");

/***/ }),

/***/ "./src/app/components/Machine.ts":
/*!***************************************!*\
  !*** ./src/app/components/Machine.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Machine = void 0;\nconst SpinMediator_1 = __webpack_require__(/*! ../mediators/SpinMediator */ \"./src/app/mediators/SpinMediator.ts\");\nconst Component_1 = __webpack_require__(/*! ../types/Component */ \"./src/app/types/Component.ts\");\nclass Machine extends Component_1.Component {\n    init() {\n        console.log(\"sşldfkşldskf\");\n        const spinMediator = this.game.getDependency(SpinMediator_1.SpinMediator);\n        this.game\n            .getDependency(SpinMediator_1.SpinMediator)\n            .updateIsSpinning(!spinMediator.isSpinning.value);\n    }\n    resize(viewport) { }\n}\nexports.Machine = Machine;\n\n\n//# sourceURL=webpack://card-learning/./src/app/components/Machine.ts?");

/***/ }),

/***/ "./src/app/managers/DisplayManager.ts":
/*!********************************************!*\
  !*** ./src/app/managers/DisplayManager.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DisplayManager = exports.DisplayOrientation = void 0;\nconst eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\nconst PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\"));\nconst Events_1 = __webpack_require__(/*! ../Events */ \"./src/app/Events.ts\");\nconst SIZE = [2000, 1500];\nconst RATIO = SIZE[0] / SIZE[1];\nvar DisplayOrientation;\n(function (DisplayOrientation) {\n    DisplayOrientation[DisplayOrientation[\"PORTRAIT\"] = 0] = \"PORTRAIT\";\n    DisplayOrientation[DisplayOrientation[\"LANDSCAPE\"] = 1] = \"LANDSCAPE\";\n})(DisplayOrientation || (exports.DisplayOrientation = DisplayOrientation = {}));\nclass DisplayManager extends eventemitter3_1.EventEmitter {\n    constructor(mainContainer) {\n        super();\n        this._resolution = 1;\n        this._resizableComponents = new Set();\n        this.DESIGN = { width: 2048, height: 1536 };\n        this._mainContainer = mainContainer;\n        this._viewport = this.createViewport();\n    }\n    create() {\n        this._app = new PIXI.Application({\n            width: this.DESIGN.width,\n            height: this.DESIGN.height,\n            backgroundColor: 0x000,\n            antialias: true,\n            resolution: window.devicePixelRatio || 1,\n            autoDensity: true,\n        });\n        globalThis.__PIXI_APP__ = this._app;\n        PIXI.Ticker.shared.maxFPS = 60;\n        PIXI.Ticker.shared.add((delta) => {\n            this.emit(Events_1.Events.UPDATE, delta);\n            this.emit(Events_1.Events.FPS, delta);\n        });\n        document.body.appendChild(this._app.view);\n        window.addEventListener(Events_1.Events.RESIZE, this.onResize.bind(this), false);\n        this.onResize();\n        this._mainContainer.name = \"MainContainer\";\n        this._app.stage.addChild(this._mainContainer);\n    }\n    createViewport() {\n        const windowWidth = window.innerWidth;\n        const windowHeight = window.innerHeight;\n        const scaleX = windowWidth / this.DESIGN.width;\n        const scaleY = windowHeight / this.DESIGN.height;\n        const scale = Math.min(scaleX, scaleY);\n        return {\n            width: windowWidth,\n            height: windowHeight,\n            top: -this.DESIGN.height / 2,\n            bottom: this.DESIGN.height / 2,\n            left: -this.DESIGN.width / 2,\n            right: this.DESIGN.width / 2,\n            scale: scale,\n            designWidth: this.DESIGN.width,\n            designHeight: this.DESIGN.height,\n        };\n    }\n    onResize() {\n        this._viewport = this.createViewport();\n        this._app.renderer.resize(this._viewport.width, this._viewport.height);\n        this._mainContainer.scale.set(this._viewport.scale / this._resolution);\n        this._mainContainer.position.set(this._viewport.width * 0.5, this._viewport.height * 0.5);\n        this._resizableComponents.forEach((component) => {\n            component.resize(this._viewport);\n        });\n        this.emit(Events_1.Events.VIEWPORT_RESIZE, this._viewport);\n    }\n    registerResizable(component) {\n        this._resizableComponents.add(component);\n        component.resize(this._viewport);\n    }\n    unregisterResizable(component) {\n        this._resizableComponents.delete(component);\n    }\n    getWorldPosition(x, y) {\n        const viewportX = (x - this._viewport.width / 2) / this._viewport.scale;\n        const viewportY = (y - this._viewport.height / 2) / this._viewport.scale;\n        return new PIXI.Point(viewportX, viewportY);\n    }\n    getScreenPosition(worldX, worldY) {\n        const screenX = worldX * this._viewport.scale + this._viewport.width / 2;\n        const screenY = worldY * this._viewport.scale + this._viewport.height / 2;\n        return new PIXI.Point(screenX, screenY);\n    }\n    get viewport() {\n        return this._viewport;\n    }\n    get app() {\n        return this._app;\n    }\n}\nexports.DisplayManager = DisplayManager;\n\n\n//# sourceURL=webpack://card-learning/./src/app/managers/DisplayManager.ts?");

/***/ }),

/***/ "./src/app/managers/ResourceManager.ts":
/*!*********************************************!*\
  !*** ./src/app/managers/ResourceManager.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ResourceManager = void 0;\nconst PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\"));\nconst eventemitter3_1 = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\nclass ResourceManager extends eventemitter3_1.EventEmitter {\n    constructor() {\n        super();\n        this.assets = [\n            { name: \"background\", url: \"assets/background.jpg\" },\n            { name: \"symbols\", url: \"assets/slotSymbols.json\" },\n            { name: \"coin\", url: \"assets/coin.png\" },\n        ];\n        this.loader = new PIXI.Loader();\n    }\n    loadAssets() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                this.assets.forEach((asset) => {\n                    console.log(`Adding asset: ${asset.name} - ${asset.url}`);\n                    this.loader.add(asset.name, asset.url);\n                });\n                this.loader.onProgress.add((loader) => {\n                    console.log(`Loading: ${loader.progress}%`);\n                });\n                yield new Promise((resolve, reject) => {\n                    this.loader.load((loader, resources) => {\n                        console.log(\"All assets loaded:\", resources);\n                        this.emit(\"loadComplete\");\n                        resolve();\n                    });\n                    this.loader.onError.add((error) => {\n                        console.error(\"Error loading assets:\", error);\n                        this.emit(\"loadError\", error);\n                        reject(error);\n                    });\n                });\n            }\n            catch (error) {\n                console.error(\"Error loading assets:\", error);\n                this.emit(\"loadError\", error);\n                throw error;\n            }\n        });\n    }\n    getTexture(name) {\n        const resource = this.loader.resources[name];\n        return resource ? resource.texture : undefined;\n    }\n    destroy() {\n        // Destroy loaded resources\n        this.assets.forEach((asset) => {\n            var _a;\n            const resource = this.loader.resources[asset.name];\n            if (resource) {\n                (_a = resource.texture) === null || _a === void 0 ? void 0 : _a.destroy(true);\n                delete this.loader.resources[asset.name];\n            }\n        });\n        this.loader.reset();\n        this.removeAllListeners();\n    }\n}\nexports.ResourceManager = ResourceManager;\n\n\n//# sourceURL=webpack://card-learning/./src/app/managers/ResourceManager.ts?");

/***/ }),

/***/ "./src/app/managers/SceneManager.ts":
/*!******************************************!*\
  !*** ./src/app/managers/SceneManager.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SceneManager = void 0;\nconst PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\"));\nclass SceneManager {\n    constructor(game) {\n        this._mainContainer = new PIXI.Container();\n        this._scenes = {};\n        this.game = game;\n        this._mainContainer = new PIXI.Container();\n        this._mainContainer.name = \"RootContainer\";\n    }\n    createScene(id, TScene) {\n        if (this._scenes[id])\n            return undefined;\n        var scene = TScene;\n        this._scenes[id] = scene;\n        this._mainContainer.addChild(this._scenes[id]);\n        return scene;\n    }\n    goToScene(id, reset) {\n        if (this._scenes[id]) {\n            if (this._currentStage) {\n                if (reset) {\n                    this._currentStage.removeChildren();\n                    this._mainContainer.removeChildren();\n                }\n                else {\n                    this._currentStage.visible = false;\n                    this._scenes[id].visible = true;\n                }\n                this._currentStage.destroy();\n            }\n            this._mainContainer.addChild(this._scenes[id]);\n            this._currentStage = this._scenes[id];\n            this._currentStage.init();\n            return true;\n        }\n        return false;\n    }\n    get scenes() {\n        return this._scenes;\n    }\n    get main() {\n        return this._mainContainer;\n    }\n}\nexports.SceneManager = SceneManager;\n\n\n//# sourceURL=webpack://card-learning/./src/app/managers/SceneManager.ts?");

/***/ }),

/***/ "./src/app/mediators/SpinMediator.ts":
/*!*******************************************!*\
  !*** ./src/app/mediators/SpinMediator.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SpinMediator = void 0;\nconst rxjs_1 = __webpack_require__(/*! rxjs */ \"./node_modules/rxjs/dist/cjs/index.js\");\nclass SpinMediator {\n    constructor() {\n        this.isSpinning = new rxjs_1.BehaviorSubject(false);\n        this.spinCount = new rxjs_1.BehaviorSubject(0);\n    }\n    updateIsSpinning(value) {\n        this.isSpinning.next(value);\n    }\n    updateSpinCount(value) {\n        this.spinCount.next(value);\n    }\n}\nexports.SpinMediator = SpinMediator;\n\n\n//# sourceURL=webpack://card-learning/./src/app/mediators/SpinMediator.ts?");

/***/ }),

/***/ "./src/app/scenes/Loader.ts":
/*!**********************************!*\
  !*** ./src/app/scenes/Loader.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.LoaderStage = void 0;\nconst Main_1 = __webpack_require__(/*! ../scenes/Main */ \"./src/app/scenes/Main.ts\");\nconst Scene_1 = __webpack_require__(/*! ../types/Scene */ \"./src/app/types/Scene.ts\");\nclass LoaderStage extends Scene_1.Scene {\n    init() {\n        this.game.resource.once(\"loadComplete\", this.onLoadComplete, this);\n    }\n    onLoadComplete() {\n        console.log(\"Creating Main scene...\");\n        this.game.stage.createScene(\"Main\", new Main_1.Main(this.game, \"MainGame\"));\n        console.log(\"Main scene created successfully\");\n        this.game.stage.goToScene(\"Main\", true);\n    }\n    resize(viewport) { }\n    dispose() {\n        this.game.resource.off(\"loadcomplete\");\n    }\n}\nexports.LoaderStage = LoaderStage;\n\n\n//# sourceURL=webpack://card-learning/./src/app/scenes/Loader.ts?");

/***/ }),

/***/ "./src/app/scenes/Main.ts":
/*!********************************!*\
  !*** ./src/app/scenes/Main.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Main = void 0;\n__webpack_require__(/*! pixi-spine */ \"./node_modules/pixi-spine/bin/pixi-spine.js\");\nconst Scene_1 = __webpack_require__(/*! ../types/Scene */ \"./src/app/types/Scene.ts\");\nconst PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\"));\nconst Machine_1 = __webpack_require__(/*! ../components/Machine */ \"./src/app/components/Machine.ts\");\nclass Main extends Scene_1.Scene {\n    init() {\n        const sprite = new PIXI.Sprite(PIXI.Texture.from(\"background\"));\n        this.addChild(sprite);\n        sprite.anchor.set(0.5);\n        const machine = new Machine_1.Machine(this.game, 0, 0);\n        this.addChild(machine);\n    }\n    resize(viewport) { }\n    dispose() { }\n}\nexports.Main = Main;\n\n\n//# sourceURL=webpack://card-learning/./src/app/scenes/Main.ts?");

/***/ }),

/***/ "./src/app/types/Component.ts":
/*!************************************!*\
  !*** ./src/app/types/Component.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Component = void 0;\nconst PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\"));\nclass Component extends PIXI.Container {\n    constructor(game, x, y) {\n        super();\n        this.game = game;\n        this.position.set(x, y);\n        this.game.display.registerResizable(this);\n        this.init();\n    }\n    destroy() {\n        this.game.display.unregisterResizable(this);\n        super.destroy();\n    }\n}\nexports.Component = Component;\n\n\n//# sourceURL=webpack://card-learning/./src/app/types/Component.ts?");

/***/ }),

/***/ "./src/app/types/Scene.ts":
/*!********************************!*\
  !*** ./src/app/types/Scene.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || (function () {\n    var ownKeys = function(o) {\n        ownKeys = Object.getOwnPropertyNames || function (o) {\n            var ar = [];\n            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;\n            return ar;\n        };\n        return ownKeys(o);\n    };\n    return function (mod) {\n        if (mod && mod.__esModule) return mod;\n        var result = {};\n        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== \"default\") __createBinding(result, mod, k[i]);\n        __setModuleDefault(result, mod);\n        return result;\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Scene = void 0;\nconst PIXI = __importStar(__webpack_require__(/*! pixi.js */ \"./node_modules/pixi.js/dist/cjs/pixi.js\"));\nclass Scene extends PIXI.Container {\n    constructor(game, name = \"Stage\") {\n        super();\n        this.game = game;\n        this.name = name;\n        this.game.display.registerResizable(this);\n    }\n    destroy() {\n        this.game.display.unregisterResizable(this);\n        super.destroy();\n    }\n}\nexports.Scene = Scene;\n\n\n//# sourceURL=webpack://card-learning/./src/app/types/Scene.ts?");

/***/ }),

/***/ "./src/app/utils/inject.ts":
/*!*********************************!*\
  !*** ./src/app/utils/inject.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DependencyContainer = void 0;\nclass DependencyContainer {\n    static register(key, instance) {\n        this.container.set(key, instance);\n    }\n    static resolve(key) {\n        if (!this.isInitialized) {\n            throw new Error(\"Trying to resolve dependency before initialization is complete\");\n        }\n        const instance = this.container.get(key);\n        if (!instance) {\n            throw new Error(`No registration found for key: ${key}`);\n        }\n        return instance;\n    }\n    static initialize() {\n        this.isInitialized = true;\n    }\n}\nexports.DependencyContainer = DependencyContainer;\nDependencyContainer.container = new Map();\nDependencyContainer.isInitialized = false;\n\n\n//# sourceURL=webpack://card-learning/./src/app/utils/inject.ts?");

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
/******/ __webpack_require__.O(0, ["vendors-node_modules_pixi-spine_all-3_8_lib_index_js-node_modules_pixi-spine_bin_pixi-spine_j-6f2bd0"], () => (__webpack_exec__("./src/index.ts")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);