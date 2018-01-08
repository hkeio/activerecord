(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModelAttribute = /** @class */ (function () {
    function ModelAttribute(name, type) {
        if (type === void 0) { type = 'string'; }
        this.name = name;
        this.type = type;
    }
    ModelAttribute.prototype.init = function (model) {
        var _this = this;
        if (model.className === 'FooChild' && this.name === 'foo') {
            console.error('z', model.className, this.name, model.hasOwnProperty(this.name), model[this.name]);
            throw new Error('asd');
        }
        if (!model.hasOwnProperty(this.name)) {
            Object.defineProperty(model, this.name, {
                get: function () { return model.getAttribute(_this.name); },
                set: function (value) {
                    model.setAttribute(_this.name, value);
                },
            });
        }
    };
    return ModelAttribute;
}());
exports.ModelAttribute = ModelAttribute;
var Model = /** @class */ (function () {
    function Model(values, attributes) {
        if (attributes === void 0) { attributes = []; }
        this._values = {};
        this._class = this.constructor; //@todo: can be removed ?!
        this._class.addAttributes(attributes);
        this._initAttributes();
        if (values) {
            this.attributes = values;
        }
    }
    Model.addAttributes = function (attributes) {
        var _this = this;
        attributes.forEach(function (attribute) {
            var found = false, index = null;
            _this._attributes.forEach(function (attr, i) {
                if (attribute.name === attr.name) {
                    index = i;
                    found = true;
                }
            });
            if (found) {
                _this._attributes[index] = attribute;
            }
            else {
                _this._attributes.push(attribute);
            }
        });
    };
    Model.hasAttribute = function (attribute) {
        var found = false;
        this._attributes.forEach(function (attr, i) {
            if (attribute === attr.name) {
                found = true;
            }
        });
        return found;
    };
    Model.prototype.hasAttribute = function (attribute) {
        return this._class.hasAttribute(attribute);
    };
    Object.defineProperty(Model.prototype, "class", {
        get: function () {
            return this._class;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model, "className", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "className", {
        get: function () {
            return this._class.name;
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype._initAttributes = function () {
        var _this = this;
        this._class._attributes.forEach(function (attribute) { return attribute.init(_this); });
    };
    Model.defineAttributes = function (attributes) {
        this._attributes = attributes;
    };
    Model.getAttributeDefinition = function () {
        return this._attributes;
    };
    Model.prototype.setAttributes = function (values) {
        var keys = Object.keys(values);
        for (var i = 0, l = keys.length; i < l; i++) {
            this._values[keys[i]] = values[keys[i]];
        }
    };
    Object.defineProperty(Model.prototype, "attributes", {
        get: function () {
            return this._values;
        },
        set: function (values) {
            this.setAttributes(values);
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.setAttribute = function (attribute, value) {
        this._values[attribute] = value;
    };
    Model.prototype.getAttribute = function (attribute) {
        return this._values[attribute];
    };
    Model._attributes = [];
    return Model;
}());
exports.Model = Model;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ActiveQuery = /** @class */ (function () {
    function ActiveQuery(model) {
        this._params = {
            fields: [],
            limit: {
                start: 0,
                end: undefined
            },
            sort: [],
            where: {},
        };
        model.init();
        this._db = model.db;
        this._model = model;
    }
    Object.defineProperty(ActiveQuery.prototype, "params", {
        get: function () {
            return this._params;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveQuery.prototype, "db", {
        get: function () {
            return this._db;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveQuery.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    ActiveQuery.prototype.fields = function (param) {
        var fields = param;
        if (param.constructor.name === 'string') {
            fields = [param];
        }
        this._params.fields = fields;
        return this;
    };
    ActiveQuery.prototype.sort = function (param) {
        var sort = param;
        if (param.constructor.name === 'string') {
            sort = [param];
        }
        this._params.sort = sort;
        return this;
    };
    ActiveQuery.prototype.limit = function (start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
        this._params.limit.start = start;
        this._params.limit.end = end;
        return this;
    };
    ActiveQuery.prototype.where = function (condition) {
        if (condition === void 0) { condition = {}; }
        this._params.where = condition;
        return this;
    };
    return ActiveQuery;
}());
exports.ActiveQuery = ActiveQuery;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(3));
__export(__webpack_require__(4));
__export(__webpack_require__(0));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ActiveQuery_1 = __webpack_require__(1);
var Model_1 = __webpack_require__(0);
;
var ActiveRecord = /** @class */ (function (_super) {
    __extends(ActiveRecord, _super);
    function ActiveRecord(values) {
        var _this = _super.call(this, values) || this;
        _this._class.init();
        _this._initRelations();
        return _this;
    }
    Object.defineProperty(ActiveRecord, "db", {
        get: function () {
            return this._db[this.config.tableName];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveRecord.prototype, "db", {
        get: function () {
            return this._class.db[this._class.config.tableName];
        },
        enumerable: true,
        configurable: true
    });
    ActiveRecord._dbInit = function () {
        this.initialized(this.config.tableName);
        return Promise.resolve(true);
    };
    ActiveRecord.initialized = function (model) {
        this._initialized[model] = true;
    };
    Object.defineProperty(ActiveRecord, "config", {
        get: function () {
            return this._config[this._tableName];
        },
        set: function (config) {
            var _this = this;
            Object.keys(config).forEach(function (key) {
                _this._config[key] = config[key];
            });
        },
        enumerable: true,
        configurable: true
    });
    ActiveRecord.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._initialized[this._tableName]) {
                    return [2 /*return*/];
                }
                this._config[this._tableName] = {
                    identifier: this._identifier || this._defaultConfig.identifier,
                    tableName: this._tableName || this._defaultConfig.tableName,
                    queryClass: this._queryClass || this._defaultConfig.queryClass
                };
                return [2 /*return*/, this._dbInit()];
            });
        });
    };
    ActiveRecord.prototype._initRelations = function () {
        var _this = this;
        this._class._relations.forEach(function (relation) { return relation.init(_this); });
    };
    ActiveRecord.addRelation = function (relation) {
        this._relations.push(relation);
    };
    Object.defineProperty(ActiveRecord.prototype, "id", {
        /* Easy access getter */
        get: function () {
            return this.getAttribute(this._class.config.identifier);
        },
        set: function (value) {
            if (!this.id) {
                this.setAttribute(this._class.config.identifier, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActiveRecord.prototype, "isNewRecord", {
        get: function () {
            return !this.id;
        },
        enumerable: true,
        configurable: true
    });
    /* Querying methods */
    ActiveRecord.find = function () {
        this.init();
        return new this.config.queryClass(this);
    };
    ActiveRecord.findOne = function (condition) {
        if (condition === void 0) { condition = {}; }
        this.init();
        // condition is id
        if (typeof condition === 'string') {
            var idCondition = {};
            idCondition[this.config.identifier] = condition;
            return this.find()
                .where(idCondition)
                .one();
        }
        return this.find()
            .where(condition)
            .one();
    };
    ActiveRecord.findAll = function (condition) {
        if (condition === void 0) { condition = {}; }
        return this.find()
            .where(condition)
            .all();
    };
    ActiveRecord.save = function (objects) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Model.save() needs to be set!');
            });
        });
    };
    ;
    ActiveRecord._relations = [];
    ActiveRecord._defaultConfig = {
        identifier: 'id',
        tableName: 'ActiveRecord',
        queryClass: ActiveQuery_1.ActiveQuery
    };
    ActiveRecord._config = {};
    ActiveRecord._db = {};
    ActiveRecord._initialized = {};
    return ActiveRecord;
}(Model_1.Model));
exports.ActiveRecord = ActiveRecord;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __webpack_require__(0);
var ActiveRecordRelationType = {
    HasOne: 1,
    HasMany: 2,
    ManyToMany: 3
};
var ActiveRecordRelation = /** @class */ (function () {
    function ActiveRecordRelation(values, attributes) {
        this._child = values._child;
        this._foreignKey = values._foreignKey;
        this._intermediate = values._intermediate;
        this._key = values._key;
        this._label = this._formatLabel(values._label);
        this._property = values._property;
        this._type = values._type;
    }
    ActiveRecordRelation.prototype._formatLabel = function (string) {
        var singular = string[string.length - 1] === 's' ? string.substr(0, string.length - 1) : string;
        var plural = string[string.length - 1] === 's' ? string : string + 's';
        return {
            original: string,
            singular: singular,
            plural: plural,
            capitalizedSingular: singular[0].toUpperCase() + singular.slice(1),
            capitalizedPlural: plural[0].toUpperCase() + plural.slice(1)
        };
    };
    ActiveRecordRelation.hasOne = function (label, child, property) {
        return new this({
            _child: child,
            _label: label,
            _property: property,
            _type: ActiveRecordRelationType.HasOne
        });
    };
    ActiveRecordRelation.hasMany = function (label, child, property) {
        return new this({
            _child: child,
            _label: label,
            _property: property,
            _type: ActiveRecordRelationType.HasMany
        });
    };
    ActiveRecordRelation.manyToMany = function (label, child, intermediate, key, foreignKey) {
        return new this({
            _child: child,
            _foreignKey: foreignKey,
            _intermediate: intermediate,
            _key: key,
            _label: label,
            _type: ActiveRecordRelationType.ManyToMany
        });
    };
    ActiveRecordRelation.prototype.init = function (model) {
        var condition = {};
        if (this._type === ActiveRecordRelationType.HasOne) {
            this._initHasOne(model, condition);
        }
        else if (this._type === ActiveRecordRelationType.HasMany) {
            this._initHasMany(model, condition);
        }
        else if (this._type === ActiveRecordRelationType.ManyToMany) {
            this._initManyToMany(model, condition);
        }
    };
    ActiveRecordRelation.prototype._initHasOne = function (model, condition) {
        var _this = this;
        // add property to class
        var attribute = new Model_1.ModelAttribute(this._property, 'string');
        model.class.addAttributes([attribute]);
        attribute.init(model);
        model.setAttribute(this._property, model.getAttribute(this._property) || null);
        if (!model.hasOwnProperty(this._label.original)) {
            Object.defineProperty(model, this._label.original, {
                get: function () { return _this._child.findOne(model.getAttribute(_this._property)); },
            });
        }
        if (!model.hasOwnProperty(this._property)) {
            Object.defineProperty(model, this._property, {
                get: function () { return model.getAttribute(_this._property); },
            });
        }
        // add `setChild()` method
        model['set' + this._label.capitalizedSingular] = function (object) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(object instanceof this._child)) {
                            object = new this._child(object);
                        }
                        return [4 /*yield*/, object.save()];
                    case 1:
                        _a.sent();
                        model.setAttribute(this._property, object.getAttribute(this._child.config.identifier));
                        return [2 /*return*/, object];
                }
            });
        }); };
    };
    ActiveRecordRelation.prototype._initHasMany = function (model, condition) {
        var _this = this;
        // add foreign property to child class
        var attribute = new Model_1.ModelAttribute(this._property, 'foreignKey');
        this._child.addAttributes([attribute]);
        attribute.init(model);
        // set getter `children` property
        Object.defineProperty(model, this._label.plural, {
            get: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._child.init()];
                        case 1:
                            _a.sent();
                            condition[this._property] = model.getAttribute(this._child.config.identifier);
                            return [4 /*yield*/, new model.class.config.queryClass(this._child).where(condition).all()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            }); },
        });
        // add `getChild()` method
        model['get' + this._label.capitalizedPlural] = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condition[this._property] = model.getAttribute(this._child.config.identifier);
                        return [4 /*yield*/, new model.class.config.queryClass(this._child).where(condition)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        // add `addChild()` method
        model['add' + this._label.capitalizedSingular] = function (object) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model['add' + this._label.capitalizedPlural]([object])];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res[0]];
                }
            });
        }); };
        // add `addChildren()` method
        model['add' + this._label.capitalizedPlural] = function (objects) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!objects.length) {
                            return [2 /*return*/];
                        }
                        // set parent model id in children models
                        objects = objects.map(function (object) {
                            object[_this._property] = model.getAttribute(_this._child.config.identifier);
                            return object;
                        });
                        return [4 /*yield*/, this._child.save(objects)];
                    case 1: 
                    // save all objects
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    };
    ActiveRecordRelation.prototype._initManyToMany = function (model, condition) {
        var _this = this;
        // add foreign property to intermediate class
        var attribute = new Model_1.ModelAttribute(this._foreignKey, 'foreignKey');
        this._intermediate.addAttributes([attribute]);
        attribute.init(model);
        // set getter `children` property
        if (!model.hasOwnProperty(this._label.plural)) {
            Object.defineProperty(model, this._label.plural, {
                get: function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var res, ids, queryCondition;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this._child.init()];
                            case 1:
                                _a.sent();
                                condition[this._key] = model.getAttribute(model.class.config.identifier);
                                return [4 /*yield*/, this._intermediate.find()
                                        .where(condition)
                                        .fields([this._foreignKey])
                                        .all(false)];
                            case 2:
                                res = _a.sent();
                                if (!res.length) {
                                    return [2 /*return*/, []];
                                }
                                ids = res.map(function (doc) { return doc.getAttribute(_this._foreignKey); }).filter(Boolean);
                                queryCondition = {};
                                queryCondition[this._child.config.identifier] = { $in: ids };
                                return [4 /*yield*/, new model.class.config.queryClass(this._child)
                                        .where(queryCondition)
                                        .all()];
                            case 3: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); }
            });
        }
        // add `getChild()` method
        model['get' + this._label.capitalizedPlural] = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var res, ids, queryCondition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        condition[this._key] = model.getAttribute(this._child.config.identifier);
                        return [4 /*yield*/, this._intermediate.find()
                                .where(condition)
                                .fields([this._foreignKey])
                                .all(false)];
                    case 1:
                        res = _a.sent();
                        if (!res.length) {
                            return [2 /*return*/, []];
                        }
                        ids = res.map(function (doc) { return doc.getAttribute(_this._foreignKey); }).filter(Boolean);
                        queryCondition = {};
                        queryCondition[this._child.config.identifier] = { $in: ids };
                        return [4 /*yield*/, new model.class.config.queryClass(this._child)
                                .where(queryCondition)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        // add `addChild()` method
        model['add' + this._label.capitalizedSingular] = function (object) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model['add' + this._label.capitalizedPlural]([object])];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res[0]];
                }
            });
        }); };
        // add `addChildren()` method
        model['add' + this._label.capitalizedPlural] = function (objects) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var savedObjects, condition, existingRelations, _loop_1, this_1, found, _i, savedObjects_1, object;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!objects.length) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this._child.save(objects)];
                    case 1:
                        savedObjects = _a.sent();
                        condition = {};
                        condition[this._foreignKey] = { $in: savedObjects.map(function (object) { return object.getAttribute(_this._child.config.identifier); }) };
                        return [4 /*yield*/, this._intermediate.findAll(condition)];
                    case 2:
                        existingRelations = _a.sent();
                        _loop_1 = function (object) {
                            var data, relation;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        found = false;
                                        if (existingRelations.length) {
                                            existingRelations.forEach(function (existing) {
                                                found = found || object.getAttribute(_this._child.config.identifier) === existing.getAttribute(_this._foreignKey);
                                            });
                                        }
                                        if (!!found) return [3 /*break*/, 2];
                                        data = {};
                                        data[this_1._key] = model.getAttribute(this_1._child.config.identifier);
                                        data[this_1._foreignKey] = object.getAttribute(this_1._child.config.identifier);
                                        relation = new this_1._intermediate(data);
                                        return [4 /*yield*/, relation.save()];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, savedObjects_1 = savedObjects;
                        _a.label = 3;
                    case 3:
                        if (!(_i < savedObjects_1.length)) return [3 /*break*/, 6];
                        object = savedObjects_1[_i];
                        return [5 /*yield**/, _loop_1(object)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [2 /*return*/, savedObjects];
                }
            });
        }); };
    };
    return ActiveRecordRelation;
}());
exports.ActiveRecordRelation = ActiveRecordRelation;


/***/ })
/******/ ])));