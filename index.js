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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzdmNGYxMDM5ZmE0NTM0NWI4ZTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9BY3RpdmVRdWVyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FjdGl2ZVJlY29yZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQWN0aXZlUmVjb3JkUmVsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBO0lBSUUsd0JBQVksSUFBSSxFQUFFLElBQXVCO1FBQXZCLHNDQUF1QjtRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLEtBQVk7UUFBakIsaUJBYUM7UUFaQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFB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QUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dDQUNwRSxJQUFJLENBQUMsT0FBSyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3Q0FDeEUsUUFBUSxHQUFHLElBQUksT0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7d0NBQzVDLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUU7O3dDQUFyQixTQUFxQixDQUFDOzs7Ozs7OzhCQWRLLEVBQVosNkJBQVk7Ozs2QkFBWiwyQkFBWTt3QkFBdEIsTUFBTTtzREFBTixNQUFNOzs7Ozt3QkFBSSxJQUFZOzs0QkFpQi9CLHNCQUFPLFlBQVksRUFBQzs7O2FBQ3JCO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQztBQXpPWSxvREFBb0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3N2Y0ZjEwMzlmYTQ1MzQ1YjhlNCIsImV4cG9ydCBjbGFzcyBNb2RlbEF0dHJpYnV0ZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGU6IHN0cmluZyA9ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgaW5pdChtb2RlbDogTW9kZWwpIHtcbiAgICBpZiAobW9kZWwuY2xhc3NOYW1lID09PSAnRm9vQ2hpbGQnICYmIHRoaXMubmFtZSA9PT0gJ2ZvbycpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3onLCBtb2RlbC5jbGFzc05hbWUsIHRoaXMubmFtZSwgbW9kZWwuaGFzT3duUHJvcGVydHkodGhpcy5uYW1lKSwgbW9kZWxbdGhpcy5uYW1lXSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FzZCcpO1xuICAgIH1cbiAgICBpZiAoIW1vZGVsLmhhc093blByb3BlcnR5KHRoaXMubmFtZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwgdGhpcy5uYW1lLCB7XG4gICAgICAgIGdldDogKCkgPT4gbW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMubmFtZSksXG4gICAgICAgIHNldDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICBtb2RlbC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcblxuICBwcm90ZWN0ZWQgc3RhdGljIF9hdHRyaWJ1dGVzOiBNb2RlbEF0dHJpYnV0ZVtdID0gW107XG4gIHByb3RlY3RlZCBfdmFsdWVzOiBhbnkgPSB7fTtcblxuICBwcm90ZWN0ZWQgX2NsYXNzOiBhbnkgPSB0aGlzLmNvbnN0cnVjdG9yOyAvL0B0b2RvOiBjYW4gYmUgcmVtb3ZlZCA/IVxuXG4gIGNvbnN0cnVjdG9yKHZhbHVlcz8sIGF0dHJpYnV0ZXM6IE1vZGVsQXR0cmlidXRlW10gPSBbXSkge1xuICAgIHRoaXMuX2NsYXNzLmFkZEF0dHJpYnV0ZXMoYXR0cmlidXRlcyk7XG4gICAgdGhpcy5faW5pdEF0dHJpYnV0ZXMoKTtcbiAgICBpZiAodmFsdWVzKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXMgPSB2YWx1ZXM7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhZGRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE1vZGVsQXR0cmlidXRlW10pIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2goKGF0dHJpYnV0ZTogTW9kZWxBdHRyaWJ1dGUpID0+IHtcbiAgICAgIGxldCBmb3VuZCA9IGZhbHNlLFxuICAgICAgICBpbmRleCA9IG51bGw7XG4gICAgICB0aGlzLl9hdHRyaWJ1dGVzLmZvckVhY2goKGF0dHI6IE1vZGVsQXR0cmlidXRlLCBpKSA9PiB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGUubmFtZSA9PT0gYXR0ci5uYW1lKSB7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVzW2luZGV4XSA9IGF0dHJpYnV0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMucHVzaChhdHRyaWJ1dGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBoYXNBdHRyaWJ1dGUoYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLl9hdHRyaWJ1dGVzLmZvckVhY2goKGF0dHI6IE1vZGVsQXR0cmlidXRlLCBpKSA9PiB7XG4gICAgICBpZiAoYXR0cmlidXRlID09PSBhdHRyLm5hbWUpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIHB1YmxpYyBoYXNBdHRyaWJ1dGUoYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xhc3MuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gIH1cblxuICBnZXQgY2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgY2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzLm5hbWU7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXR0cmlidXRlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jbGFzcy5fYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGU6IE1vZGVsQXR0cmlidXRlKSA9PiBhdHRyaWJ1dGUuaW5pdCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGRlZmluZUF0dHJpYnV0ZXMoYXR0cmlidXRlczogTW9kZWxBdHRyaWJ1dGVbXSkge1xuICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRBdHRyaWJ1dGVEZWZpbml0aW9uKCk6IE1vZGVsQXR0cmlidXRlW10ge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVzO1xuICB9XG5cbiAgcHVibGljIHNldEF0dHJpYnV0ZXModmFsdWVzKTogdm9pZCB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZXMpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMuX3ZhbHVlc1trZXlzW2ldXSA9IHZhbHVlc1trZXlzW2ldXTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGF0dHJpYnV0ZXModmFsdWVzKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVzKHZhbHVlcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGF0dHJpYnV0ZXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzO1xuICB9XG5cbiAgcHVibGljIHNldEF0dHJpYnV0ZShhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldEF0dHJpYnV0ZShhdHRyaWJ1dGU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlc1thdHRyaWJ1dGVdO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvTW9kZWwudHMiLCJpbXBvcnQgeyBBY3RpdmVSZWNvcmQgfSBmcm9tICcuL0FjdGl2ZVJlY29yZCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY3RpdmVRdWVyeSB7XG5cbiAgcHJpdmF0ZSBfZGI6IGFueTtcbiAgcHJpdmF0ZSBfbW9kZWw6IHR5cGVvZiBBY3RpdmVSZWNvcmQgJiBhbnk7XG4gIHByaXZhdGUgX3BhcmFtczoge1xuICAgIGZpZWxkczogc3RyaW5nW10sXG4gICAgbGltaXQ6IHtcbiAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICBlbmQ6IG51bWJlclxuICAgIH0sXG4gICAgc29ydDogc3RyaW5nW10sXG4gICAgd2hlcmU6IGFueSxcbiAgfSA9IHtcbiAgICAgIGZpZWxkczogW10sXG4gICAgICBsaW1pdDoge1xuICAgICAgICBzdGFydDogMCxcbiAgICAgICAgZW5kOiB1bmRlZmluZWRcbiAgICAgIH0sXG4gICAgICBzb3J0OiBbXSxcbiAgICAgIHdoZXJlOiB7fSxcbiAgICB9O1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsOiB0eXBlb2YgQWN0aXZlUmVjb3JkKSB7XG4gICAgbW9kZWwuaW5pdCgpO1xuICAgIHRoaXMuX2RiID0gbW9kZWwuZGI7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRiKCkge1xuICAgIHJldHVybiB0aGlzLl9kYjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgcHVibGljIGZpZWxkcyhwYXJhbTogc3RyaW5nW10pIHtcbiAgICBsZXQgZmllbGRzOiBhbnkgPSBwYXJhbTtcbiAgICBpZiAocGFyYW0uY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpZWxkcyA9IFtwYXJhbV07XG4gICAgfVxuICAgIHRoaXMuX3BhcmFtcy5maWVsZHMgPSBmaWVsZHM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgc29ydChwYXJhbTogc3RyaW5nW10pIHtcbiAgICBsZXQgc29ydDogYW55ID0gcGFyYW07XG4gICAgaWYgKHBhcmFtLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzb3J0ID0gW3BhcmFtXTtcbiAgICB9XG4gICAgdGhpcy5fcGFyYW1zLnNvcnQgPSBzb3J0O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGxpbWl0KHN0YXJ0ID0gMCwgZW5kID0gbnVsbCkge1xuICAgIHRoaXMuX3BhcmFtcy5saW1pdC5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuX3BhcmFtcy5saW1pdC5lbmQgPSBlbmQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2hlcmUoY29uZGl0aW9uOiBhbnkgPSB7fSkge1xuICAgIHRoaXMuX3BhcmFtcy53aGVyZSA9IGNvbmRpdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBvbmUobWFwPzogYm9vbGVhbik6IFByb21pc2U8YW55PjtcbiAgcHVibGljIGFic3RyYWN0IGFsbChtYXA/OiBib29sZWFuKTogUHJvbWlzZTxhbnlbXT47XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQWN0aXZlUXVlcnkudHMiLCJleHBvcnQgKiBmcm9tICcuL0FjdGl2ZVF1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vQWN0aXZlUmVjb3JkJztcbmV4cG9ydCAqIGZyb20gJy4vQWN0aXZlUmVjb3JkUmVsYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9Nb2RlbCc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiLCJpbXBvcnQgeyBBY3RpdmVRdWVyeSB9IGZyb20gJy4vQWN0aXZlUXVlcnknO1xuaW1wb3J0IHsgTW9kZWwsIE1vZGVsQXR0cmlidXRlIH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQgeyBBY3RpdmVSZWNvcmRSZWxhdGlvbiB9IGZyb20gJy4vQWN0aXZlUmVjb3JkUmVsYXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGl2ZVJlY29yZENvbmZpZyB7XG4gIGlkZW50aWZpZXI6IHN0cmluZztcbiAgdGFibGVOYW1lOiBzdHJpbmc7XG4gIHF1ZXJ5Q2xhc3M6IGFueTtcbn07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY3RpdmVSZWNvcmQgZXh0ZW5kcyBNb2RlbCB7XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBfcmVsYXRpb25zOiBBY3RpdmVSZWNvcmRSZWxhdGlvbltdID0gW107XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBfaWRlbnRpZmllcjogc3RyaW5nO1xuICBwcm90ZWN0ZWQgc3RhdGljIF90YWJsZU5hbWU6IHN0cmluZztcbiAgcHJvdGVjdGVkIHN0YXRpYyBfcXVlcnlDbGFzczogYW55O1xuXG4gIHByaXZhdGUgc3RhdGljIF9kZWZhdWx0Q29uZmlnOiBBY3RpdmVSZWNvcmRDb25maWcgPSB7XG4gICAgaWRlbnRpZmllcjogJ2lkJyxcbiAgICB0YWJsZU5hbWU6ICdBY3RpdmVSZWNvcmQnLFxuICAgIHF1ZXJ5Q2xhc3M6IEFjdGl2ZVF1ZXJ5XG4gIH07XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2NvbmZpZzogeyBbbW9kZWw6IHN0cmluZ106IEFjdGl2ZVJlY29yZENvbmZpZzsgfSA9IHt9O1xuICBwcm90ZWN0ZWQgc3RhdGljIF9kYjogeyBbbW9kZWw6IHN0cmluZ106IGFueTsgfSA9IHt9O1xuICBwcml2YXRlIHN0YXRpYyBfaW5pdGlhbGl6ZWQ6IHsgW21vZGVsOiBzdHJpbmddOiBib29sZWFuOyB9ID0ge307XG5cbiAgY29uc3RydWN0b3IodmFsdWVzPykge1xuICAgIHN1cGVyKHZhbHVlcyk7XG4gICAgdGhpcy5fY2xhc3MuaW5pdCgpO1xuICAgIHRoaXMuX2luaXRSZWxhdGlvbnMoKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RiW3RoaXMuY29uZmlnLnRhYmxlTmFtZV07XG4gIH1cblxuICBnZXQgZGIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzLmRiW3RoaXMuX2NsYXNzLmNvbmZpZy50YWJsZU5hbWVdO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBfZGJJbml0KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQodGhpcy5jb25maWcudGFibGVOYW1lKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplZChtb2RlbDogc3RyaW5nKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZWRbbW9kZWxdID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnW3RoaXMuX3RhYmxlTmFtZV07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldCBjb25maWcoY29uZmlnKSB7XG4gICAgT2JqZWN0LmtleXMoY29uZmlnKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHRoaXMuX2NvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGluaXQoKSB7XG4gICAgaWYgKHRoaXMuX2luaXRpYWxpemVkW3RoaXMuX3RhYmxlTmFtZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25maWdbdGhpcy5fdGFibGVOYW1lXSA9IHtcbiAgICAgIGlkZW50aWZpZXI6IHRoaXMuX2lkZW50aWZpZXIgfHwgdGhpcy5fZGVmYXVsdENvbmZpZy5pZGVudGlmaWVyLFxuICAgICAgdGFibGVOYW1lOiB0aGlzLl90YWJsZU5hbWUgfHwgdGhpcy5fZGVmYXVsdENvbmZpZy50YWJsZU5hbWUsXG4gICAgICBxdWVyeUNsYXNzOiB0aGlzLl9xdWVyeUNsYXNzIHx8IHRoaXMuX2RlZmF1bHRDb25maWcucXVlcnlDbGFzc1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5fZGJJbml0KCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0UmVsYXRpb25zKCkge1xuICAgIHRoaXMuX2NsYXNzLl9yZWxhdGlvbnMuZm9yRWFjaCgocmVsYXRpb24pID0+IHJlbGF0aW9uLmluaXQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhZGRSZWxhdGlvbihyZWxhdGlvbjogQWN0aXZlUmVjb3JkUmVsYXRpb24pIHtcbiAgICB0aGlzLl9yZWxhdGlvbnMucHVzaChyZWxhdGlvbik7XG4gIH1cblxuICAvKiBFYXN5IGFjY2VzcyBnZXR0ZXIgKi9cblxuICBnZXQgaWQoKTogc3RyaW5nIHwgbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUodGhpcy5fY2xhc3MuY29uZmlnLmlkZW50aWZpZXIpO1xuICB9XG5cbiAgc2V0IGlkKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuaWQpIHtcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKHRoaXMuX2NsYXNzLmNvbmZpZy5pZGVudGlmaWVyLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGlzTmV3UmVjb3JkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5pZDtcbiAgfVxuXG4gIC8qIFF1ZXJ5aW5nIG1ldGhvZHMgKi9cblxuICBwdWJsaWMgc3RhdGljIGZpbmQoKTogQWN0aXZlUXVlcnkgJiBhbnkge1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25maWcucXVlcnlDbGFzcyh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmluZE9uZShjb25kaXRpb246IGFueSA9IHt9KTogUHJvbWlzZTxBY3RpdmVSZWNvcmQgJiBhbnk+IHtcbiAgICB0aGlzLmluaXQoKTtcblxuICAgIC8vIGNvbmRpdGlvbiBpcyBpZFxuICAgIGlmICh0eXBlb2YgY29uZGl0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IGlkQ29uZGl0aW9uID0ge307XG4gICAgICBpZENvbmRpdGlvblt0aGlzLmNvbmZpZy5pZGVudGlmaWVyXSA9IGNvbmRpdGlvbjtcbiAgICAgIHJldHVybiB0aGlzLmZpbmQoKVxuICAgICAgICAud2hlcmUoaWRDb25kaXRpb24pXG4gICAgICAgIC5vbmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5maW5kKClcbiAgICAgIC53aGVyZShjb25kaXRpb24pXG4gICAgICAub25lKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbmRBbGwoY29uZGl0aW9uID0ge30pOiBQcm9taXNlPEFjdGl2ZVJlY29yZFtdICYgYW55W10+IHtcbiAgICByZXR1cm4gdGhpcy5maW5kKClcbiAgICAgIC53aGVyZShjb25kaXRpb24pXG4gICAgICAuYWxsKCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgc2F2ZSgpOiBQcm9taXNlPHRoaXM+O1xuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgc2F2ZShvYmplY3RzKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignTW9kZWwuc2F2ZSgpIG5lZWRzIHRvIGJlIHNldCEnKTtcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BY3RpdmVSZWNvcmQudHMiLCJpbXBvcnQgeyBNb2RlbCwgTW9kZWxBdHRyaWJ1dGUgfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7IEFjdGl2ZVJlY29yZCB9IGZyb20gJy4vQWN0aXZlUmVjb3JkJztcblxuY29uc3QgQWN0aXZlUmVjb3JkUmVsYXRpb25UeXBlID0ge1xuICBIYXNPbmU6IDEsXG4gIEhhc01hbnk6IDIsXG4gIE1hbnlUb01hbnk6IDNcbn07XG5cbmludGVyZmFjZSBMYWJlbCB7XG4gIG9yaWdpbmFsOiBzdHJpbmc7XG4gIHNpbmd1bGFyOiBzdHJpbmc7XG4gIHBsdXJhbDogc3RyaW5nO1xuICBjYXBpdGFsaXplZFNpbmd1bGFyOiBzdHJpbmc7XG4gIGNhcGl0YWxpemVkUGx1cmFsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBBY3RpdmVSZWNvcmRSZWxhdGlvbiB7XG5cbiAgcHJpdmF0ZSBfY2hpbGQ6IHR5cGVvZiBBY3RpdmVSZWNvcmQgJiBhbnk7XG4gIHByaXZhdGUgX2ZvcmVpZ25LZXk6IHN0cmluZztcbiAgcHJpdmF0ZSBfaW50ZXJtZWRpYXRlOiB0eXBlb2YgQWN0aXZlUmVjb3JkICYgYW55O1xuICBwcml2YXRlIF9rZXk6IHN0cmluZztcbiAgcHJpdmF0ZSBfbGFiZWw6IExhYmVsO1xuICBwcml2YXRlIF9wcm9wZXJ0eTogc3RyaW5nO1xuICBwcml2YXRlIF90eXBlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IodmFsdWVzPzogYW55LCBhdHRyaWJ1dGVzPzogTW9kZWxBdHRyaWJ1dGVbXSkge1xuICAgIHRoaXMuX2NoaWxkID0gdmFsdWVzLl9jaGlsZDtcbiAgICB0aGlzLl9mb3JlaWduS2V5ID0gdmFsdWVzLl9mb3JlaWduS2V5O1xuICAgIHRoaXMuX2ludGVybWVkaWF0ZSA9IHZhbHVlcy5faW50ZXJtZWRpYXRlO1xuICAgIHRoaXMuX2tleSA9IHZhbHVlcy5fa2V5O1xuICAgIHRoaXMuX2xhYmVsID0gdGhpcy5fZm9ybWF0TGFiZWwodmFsdWVzLl9sYWJlbCk7XG4gICAgdGhpcy5fcHJvcGVydHkgPSB2YWx1ZXMuX3Byb3BlcnR5O1xuICAgIHRoaXMuX3R5cGUgPSB2YWx1ZXMuX3R5cGU7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtYXRMYWJlbChzdHJpbmc6IHN0cmluZyk6IExhYmVsIHtcbiAgICBsZXQgc2luZ3VsYXIgPSBzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDFdID09PSAncycgPyBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5sZW5ndGggLSAxKSA6IHN0cmluZztcbiAgICBsZXQgcGx1cmFsID0gc3RyaW5nW3N0cmluZy5sZW5ndGggLSAxXSA9PT0gJ3MnID8gc3RyaW5nIDogc3RyaW5nICsgJ3MnO1xuICAgIHJldHVybiB7XG4gICAgICBvcmlnaW5hbDogc3RyaW5nLFxuICAgICAgc2luZ3VsYXI6IHNpbmd1bGFyLFxuICAgICAgcGx1cmFsOiBwbHVyYWwsXG4gICAgICBjYXBpdGFsaXplZFNpbmd1bGFyOiBzaW5ndWxhclswXS50b1VwcGVyQ2FzZSgpICsgc2luZ3VsYXIuc2xpY2UoMSksXG4gICAgICBjYXBpdGFsaXplZFBsdXJhbDogcGx1cmFsWzBdLnRvVXBwZXJDYXNlKCkgKyBwbHVyYWwuc2xpY2UoMSlcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGhhc09uZShsYWJlbDogc3RyaW5nLCBjaGlsZDogdHlwZW9mIEFjdGl2ZVJlY29yZCwgcHJvcGVydHk6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgdGhpcyh7XG4gICAgICBfY2hpbGQ6IGNoaWxkLFxuICAgICAgX2xhYmVsOiBsYWJlbCxcbiAgICAgIF9wcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICBfdHlwZTogQWN0aXZlUmVjb3JkUmVsYXRpb25UeXBlLkhhc09uZVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBoYXNNYW55KGxhYmVsOiBzdHJpbmcsIGNoaWxkOiB0eXBlb2YgQWN0aXZlUmVjb3JkLCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKHtcbiAgICAgIF9jaGlsZDogY2hpbGQsXG4gICAgICBfbGFiZWw6IGxhYmVsLFxuICAgICAgX3Byb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgIF90eXBlOiBBY3RpdmVSZWNvcmRSZWxhdGlvblR5cGUuSGFzTWFueVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBtYW55VG9NYW55KGxhYmVsOiBzdHJpbmcsIGNoaWxkOiB0eXBlb2YgQWN0aXZlUmVjb3JkLCBpbnRlcm1lZGlhdGU6IHR5cGVvZiBBY3RpdmVSZWNvcmQsIGtleTogc3RyaW5nLCBmb3JlaWduS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMoe1xuICAgICAgX2NoaWxkOiBjaGlsZCxcbiAgICAgIF9mb3JlaWduS2V5OiBmb3JlaWduS2V5LFxuICAgICAgX2ludGVybWVkaWF0ZTogaW50ZXJtZWRpYXRlLFxuICAgICAgX2tleToga2V5LFxuICAgICAgX2xhYmVsOiBsYWJlbCxcbiAgICAgIF90eXBlOiBBY3RpdmVSZWNvcmRSZWxhdGlvblR5cGUuTWFueVRvTWFueVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGluaXQobW9kZWw6IEFjdGl2ZVJlY29yZCkge1xuICAgIGxldCBjb25kaXRpb24gPSB7fTtcbiAgICBpZiAodGhpcy5fdHlwZSA9PT0gQWN0aXZlUmVjb3JkUmVsYXRpb25UeXBlLkhhc09uZSkge1xuICAgICAgdGhpcy5faW5pdEhhc09uZShtb2RlbCwgY29uZGl0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3R5cGUgPT09IEFjdGl2ZVJlY29yZFJlbGF0aW9uVHlwZS5IYXNNYW55KSB7XG4gICAgICB0aGlzLl9pbml0SGFzTWFueShtb2RlbCwgY29uZGl0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3R5cGUgPT09IEFjdGl2ZVJlY29yZFJlbGF0aW9uVHlwZS5NYW55VG9NYW55KSB7XG4gICAgICB0aGlzLl9pbml0TWFueVRvTWFueShtb2RlbCwgY29uZGl0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0SGFzT25lKG1vZGVsOiBBY3RpdmVSZWNvcmQsIGNvbmRpdGlvbikge1xuICAgIC8vIGFkZCBwcm9wZXJ0eSB0byBjbGFzc1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5ldyBNb2RlbEF0dHJpYnV0ZSh0aGlzLl9wcm9wZXJ0eSwgJ3N0cmluZycpO1xuICAgIG1vZGVsLmNsYXNzLmFkZEF0dHJpYnV0ZXMoW2F0dHJpYnV0ZV0pO1xuICAgIGF0dHJpYnV0ZS5pbml0KG1vZGVsKTtcbiAgICBtb2RlbC5zZXRBdHRyaWJ1dGUodGhpcy5fcHJvcGVydHksIG1vZGVsLmdldEF0dHJpYnV0ZSh0aGlzLl9wcm9wZXJ0eSkgfHwgbnVsbCk7XG5cbiAgICBpZiAoIW1vZGVsLmhhc093blByb3BlcnR5KHRoaXMuX2xhYmVsLm9yaWdpbmFsKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZGVsLCB0aGlzLl9sYWJlbC5vcmlnaW5hbCwge1xuICAgICAgICBnZXQ6ICgpID0+IHRoaXMuX2NoaWxkLmZpbmRPbmUobW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMuX3Byb3BlcnR5KSksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIW1vZGVsLmhhc093blByb3BlcnR5KHRoaXMuX3Byb3BlcnR5KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZGVsLCB0aGlzLl9wcm9wZXJ0eSwge1xuICAgICAgICBnZXQ6ICgpID0+IG1vZGVsLmdldEF0dHJpYnV0ZSh0aGlzLl9wcm9wZXJ0eSksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYHNldENoaWxkKClgIG1ldGhvZFxuICAgIG1vZGVsWydzZXQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRTaW5ndWxhcl0gPSBhc3luYyAob2JqZWN0OiBhbnkpID0+IHtcbiAgICAgIGlmICghKG9iamVjdCBpbnN0YW5jZW9mIHRoaXMuX2NoaWxkKSkge1xuICAgICAgICBvYmplY3QgPSBuZXcgdGhpcy5fY2hpbGQob2JqZWN0KTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IG9iamVjdC5zYXZlKCk7XG4gICAgICBtb2RlbC5zZXRBdHRyaWJ1dGUodGhpcy5fcHJvcGVydHksIG9iamVjdC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpKTtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEhhc01hbnkobW9kZWw6IEFjdGl2ZVJlY29yZCwgY29uZGl0aW9uKSB7XG4gICAgLy8gYWRkIGZvcmVpZ24gcHJvcGVydHkgdG8gY2hpbGQgY2xhc3NcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBuZXcgTW9kZWxBdHRyaWJ1dGUodGhpcy5fcHJvcGVydHksICdmb3JlaWduS2V5Jyk7XG4gICAgdGhpcy5fY2hpbGQuYWRkQXR0cmlidXRlcyhbYXR0cmlidXRlXSk7XG4gICAgYXR0cmlidXRlLmluaXQobW9kZWwpO1xuXG4gICAgLy8gc2V0IGdldHRlciBgY2hpbGRyZW5gIHByb3BlcnR5XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZGVsLCB0aGlzLl9sYWJlbC5wbHVyYWwsIHtcbiAgICAgIGdldDogYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLl9jaGlsZC5pbml0KCk7XG4gICAgICAgIGNvbmRpdGlvblt0aGlzLl9wcm9wZXJ0eV0gPSBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IG1vZGVsLmNsYXNzLmNvbmZpZy5xdWVyeUNsYXNzKHRoaXMuX2NoaWxkKS53aGVyZShjb25kaXRpb24pLmFsbCgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8vIGFkZCBgZ2V0Q2hpbGQoKWAgbWV0aG9kXG4gICAgbW9kZWxbJ2dldCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFBsdXJhbF0gPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25kaXRpb25bdGhpcy5fcHJvcGVydHldID0gbW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgICAgIHJldHVybiBhd2FpdCBuZXcgbW9kZWwuY2xhc3MuY29uZmlnLnF1ZXJ5Q2xhc3ModGhpcy5fY2hpbGQpLndoZXJlKGNvbmRpdGlvbik7XG4gICAgfTtcblxuICAgIC8vIGFkZCBgYWRkQ2hpbGQoKWAgbWV0aG9kXG4gICAgbW9kZWxbJ2FkZCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFNpbmd1bGFyXSA9IGFzeW5jIChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgbW9kZWxbJ2FkZCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFBsdXJhbF0oW29iamVjdF0pO1xuICAgICAgcmV0dXJuIHJlc1swXTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYGFkZENoaWxkcmVuKClgIG1ldGhvZFxuICAgIG1vZGVsWydhZGQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRQbHVyYWxdID0gYXN5bmMgKG9iamVjdHM6IGFueVtdKSA9PiB7XG4gICAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHBhcmVudCBtb2RlbCBpZCBpbiBjaGlsZHJlbiBtb2RlbHNcbiAgICAgIG9iamVjdHMgPSBvYmplY3RzLm1hcCgob2JqZWN0KSA9PiB7XG4gICAgICAgIG9iamVjdFt0aGlzLl9wcm9wZXJ0eV0gPSBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHNhdmUgYWxsIG9iamVjdHNcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9jaGlsZC5zYXZlKG9iamVjdHMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRNYW55VG9NYW55KG1vZGVsOiBBY3RpdmVSZWNvcmQsIGNvbmRpdGlvbikge1xuICAgIC8vIGFkZCBmb3JlaWduIHByb3BlcnR5IHRvIGludGVybWVkaWF0ZSBjbGFzc1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5ldyBNb2RlbEF0dHJpYnV0ZSh0aGlzLl9mb3JlaWduS2V5LCAnZm9yZWlnbktleScpO1xuICAgIHRoaXMuX2ludGVybWVkaWF0ZS5hZGRBdHRyaWJ1dGVzKFthdHRyaWJ1dGVdKTtcbiAgICBhdHRyaWJ1dGUuaW5pdChtb2RlbCk7XG5cbiAgICAvLyBzZXQgZ2V0dGVyIGBjaGlsZHJlbmAgcHJvcGVydHlcbiAgICBpZiAoIW1vZGVsLmhhc093blByb3BlcnR5KHRoaXMuX2xhYmVsLnBsdXJhbCkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwgdGhpcy5fbGFiZWwucGx1cmFsLCB7XG4gICAgICAgIGdldDogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHRoaXMuX2NoaWxkLmluaXQoKTtcbiAgICAgICAgICBjb25kaXRpb25bdGhpcy5fa2V5XSA9IG1vZGVsLmdldEF0dHJpYnV0ZShtb2RlbC5jbGFzcy5jb25maWcuaWRlbnRpZmllcik7XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5faW50ZXJtZWRpYXRlLmZpbmQoKVxuICAgICAgICAgICAgLndoZXJlKGNvbmRpdGlvbilcbiAgICAgICAgICAgIC5maWVsZHMoW3RoaXMuX2ZvcmVpZ25LZXldKVxuICAgICAgICAgICAgLmFsbChmYWxzZSk7XG4gICAgICAgICAgaWYgKCFyZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGlkcyA9IHJlcy5tYXAoKGRvYykgPT4gZG9jLmdldEF0dHJpYnV0ZSh0aGlzLl9mb3JlaWduS2V5KSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgIGxldCBxdWVyeUNvbmRpdGlvbiA9IHt9O1xuICAgICAgICAgIHF1ZXJ5Q29uZGl0aW9uW3RoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyXSA9IHsgJGluOiBpZHMgfTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbmV3IG1vZGVsLmNsYXNzLmNvbmZpZy5xdWVyeUNsYXNzKHRoaXMuX2NoaWxkKVxuICAgICAgICAgICAgLndoZXJlKHF1ZXJ5Q29uZGl0aW9uKVxuICAgICAgICAgICAgLmFsbCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYGdldENoaWxkKClgIG1ldGhvZFxuICAgIG1vZGVsWydnZXQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRQbHVyYWxdID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uZGl0aW9uW3RoaXMuX2tleV0gPSBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5faW50ZXJtZWRpYXRlLmZpbmQoKVxuICAgICAgICAud2hlcmUoY29uZGl0aW9uKVxuICAgICAgICAuZmllbGRzKFt0aGlzLl9mb3JlaWduS2V5XSlcbiAgICAgICAgLmFsbChmYWxzZSk7XG4gICAgICBpZiAoIXJlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBsZXQgaWRzID0gcmVzLm1hcCgoZG9jKSA9PiBkb2MuZ2V0QXR0cmlidXRlKHRoaXMuX2ZvcmVpZ25LZXkpKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICBsZXQgcXVlcnlDb25kaXRpb24gPSB7fTtcbiAgICAgIHF1ZXJ5Q29uZGl0aW9uW3RoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyXSA9IHsgJGluOiBpZHMgfTtcbiAgICAgIHJldHVybiBhd2FpdCBuZXcgbW9kZWwuY2xhc3MuY29uZmlnLnF1ZXJ5Q2xhc3ModGhpcy5fY2hpbGQpXG4gICAgICAgIC53aGVyZShxdWVyeUNvbmRpdGlvbik7XG4gICAgfTtcblxuICAgIC8vIGFkZCBgYWRkQ2hpbGQoKWAgbWV0aG9kXG4gICAgbW9kZWxbJ2FkZCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFNpbmd1bGFyXSA9IGFzeW5jIChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgbW9kZWxbJ2FkZCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFBsdXJhbF0oW29iamVjdF0pO1xuICAgICAgcmV0dXJuIHJlc1swXTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYGFkZENoaWxkcmVuKClgIG1ldGhvZFxuICAgIG1vZGVsWydhZGQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRQbHVyYWxdID0gYXN5bmMgKG9iamVjdHM6IGFueVtdKSA9PiB7XG4gICAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gc2F2ZSBhbGwgb2JqZWN0c1xuICAgICAgY29uc3Qgc2F2ZWRPYmplY3RzID0gYXdhaXQgdGhpcy5fY2hpbGQuc2F2ZShvYmplY3RzKTtcblxuICAgICAgbGV0IGNvbmRpdGlvbiA9IHt9O1xuICAgICAgY29uZGl0aW9uW3RoaXMuX2ZvcmVpZ25LZXldID0geyAkaW46IHNhdmVkT2JqZWN0cy5tYXAoKG9iamVjdCkgPT4gb2JqZWN0LmdldEF0dHJpYnV0ZSh0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcikpIH07XG4gICAgICBjb25zdCBleGlzdGluZ1JlbGF0aW9ucyA9IGF3YWl0IHRoaXMuX2ludGVybWVkaWF0ZS5maW5kQWxsKGNvbmRpdGlvbik7XG5cbiAgICAgIGZvciAobGV0IG9iamVjdCBvZiBzYXZlZE9iamVjdHMpIHtcbiAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nUmVsYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIGV4aXN0aW5nUmVsYXRpb25zLmZvckVhY2goKGV4aXN0aW5nKSA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IGZvdW5kIHx8IG9iamVjdC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpID09PSBleGlzdGluZy5nZXRBdHRyaWJ1dGUodGhpcy5fZm9yZWlnbktleSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgICBkYXRhW3RoaXMuX2tleV0gPSBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgICAgIGRhdGFbdGhpcy5fZm9yZWlnbktleV0gPSBvYmplY3QuZ2V0QXR0cmlidXRlKHRoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgICAgICAgICBsZXQgcmVsYXRpb24gPSBuZXcgdGhpcy5faW50ZXJtZWRpYXRlKGRhdGEpO1xuICAgICAgICAgIGF3YWl0IHJlbGF0aW9uLnNhdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNhdmVkT2JqZWN0cztcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BY3RpdmVSZWNvcmRSZWxhdGlvbi50cyJdLCJzb3VyY2VSb290IjoiIn0=