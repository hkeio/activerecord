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
        var _this = this;
        if (condition === void 0) { condition = {}; }
        Object.keys(condition).forEach(function (key) {
            _this._params.where[key] = condition[key];
        });
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
                                ids = res.map(function (doc) { return doc[_this._foreignKey]; }).filter(Boolean);
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
                        ids = res.map(function (doc) { return doc[_this._foreignKey]; }).filter(Boolean);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDUyNDUxNTJjOTkzNGIzNWRhYTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9BY3RpdmVRdWVyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FjdGl2ZVJlY29yZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQWN0aXZlUmVjb3JkUmVsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBO0lBSUUsd0JBQVksSUFBSSxFQUFFLElBQXVCO1FBQXZCLHNDQUF1QjtRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLEtBQVk7UUFBakIsaUJBYUM7UUFaQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFB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Q0FDbEgsQ0FBQyxDQUFDLENBQUM7d0NBQ0wsQ0FBQzs2Q0FFRyxDQUFDLEtBQUssRUFBTix3QkFBTTt3Q0FDSixJQUFJLEdBQUcsRUFBRSxDQUFDO3dDQUNkLElBQUksQ0FBQyxPQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBSyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dDQUNwRSxJQUFJLENBQUMsT0FBSyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3Q0FDeEUsUUFBUSxHQUFHLElBQUksT0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7d0NBQzVDLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUU7O3dDQUFyQixTQUFxQixDQUFDOzs7Ozs7OzhCQWRLLEVBQVosNkJBQVk7Ozs2QkFBWiwyQkFBWTt3QkFBdEIsTUFBTTtzREFBTixNQUFNOzs7Ozt3QkFBSSxJQUFZOzs0QkFpQi9CLHNCQUFPLFlBQVksRUFBQzs7O2FBQ3JCO0lBQ0gsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQztBQXpPWSxvREFBb0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNTI0NTE1MmM5OTM0YjM1ZGFhNSIsImV4cG9ydCBjbGFzcyBNb2RlbEF0dHJpYnV0ZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHR5cGU6IHN0cmluZyA9ICdzdHJpbmcnKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgaW5pdChtb2RlbDogTW9kZWwpIHtcbiAgICBpZiAobW9kZWwuY2xhc3NOYW1lID09PSAnRm9vQ2hpbGQnICYmIHRoaXMubmFtZSA9PT0gJ2ZvbycpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3onLCBtb2RlbC5jbGFzc05hbWUsIHRoaXMubmFtZSwgbW9kZWwuaGFzT3duUHJvcGVydHkodGhpcy5uYW1lKSwgbW9kZWxbdGhpcy5uYW1lXSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FzZCcpO1xuICAgIH1cbiAgICBpZiAoIW1vZGVsLmhhc093blByb3BlcnR5KHRoaXMubmFtZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwgdGhpcy5uYW1lLCB7XG4gICAgICAgIGdldDogKCkgPT4gbW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMubmFtZSksXG4gICAgICAgIHNldDogKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICBtb2RlbC5zZXRBdHRyaWJ1dGUodGhpcy5uYW1lLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcblxuICBwcm90ZWN0ZWQgc3RhdGljIF9hdHRyaWJ1dGVzOiBNb2RlbEF0dHJpYnV0ZVtdID0gW107XG4gIHByb3RlY3RlZCBfdmFsdWVzOiBhbnkgPSB7fTtcblxuICBwcm90ZWN0ZWQgX2NsYXNzOiBhbnkgPSB0aGlzLmNvbnN0cnVjdG9yOyAvL0B0b2RvOiBjYW4gYmUgcmVtb3ZlZCA/IVxuXG4gIGNvbnN0cnVjdG9yKHZhbHVlcz8sIGF0dHJpYnV0ZXM6IE1vZGVsQXR0cmlidXRlW10gPSBbXSkge1xuICAgIHRoaXMuX2NsYXNzLmFkZEF0dHJpYnV0ZXMoYXR0cmlidXRlcyk7XG4gICAgdGhpcy5faW5pdEF0dHJpYnV0ZXMoKTtcbiAgICBpZiAodmFsdWVzKSB7XG4gICAgICB0aGlzLmF0dHJpYnV0ZXMgPSB2YWx1ZXM7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhZGRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE1vZGVsQXR0cmlidXRlW10pIHtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2goKGF0dHJpYnV0ZTogTW9kZWxBdHRyaWJ1dGUpID0+IHtcbiAgICAgIGxldCBmb3VuZCA9IGZhbHNlLFxuICAgICAgICBpbmRleCA9IG51bGw7XG4gICAgICB0aGlzLl9hdHRyaWJ1dGVzLmZvckVhY2goKGF0dHI6IE1vZGVsQXR0cmlidXRlLCBpKSA9PiB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGUubmFtZSA9PT0gYXR0ci5uYW1lKSB7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVzW2luZGV4XSA9IGF0dHJpYnV0ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2F0dHJpYnV0ZXMucHVzaChhdHRyaWJ1dGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBoYXNBdHRyaWJ1dGUoYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLl9hdHRyaWJ1dGVzLmZvckVhY2goKGF0dHI6IE1vZGVsQXR0cmlidXRlLCBpKSA9PiB7XG4gICAgICBpZiAoYXR0cmlidXRlID09PSBhdHRyLm5hbWUpIHtcbiAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfVxuXG4gIHB1YmxpYyBoYXNBdHRyaWJ1dGUoYXR0cmlidXRlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xhc3MuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gIH1cblxuICBnZXQgY2xhc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgY2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzLm5hbWU7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXR0cmlidXRlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jbGFzcy5fYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGU6IE1vZGVsQXR0cmlidXRlKSA9PiBhdHRyaWJ1dGUuaW5pdCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGRlZmluZUF0dHJpYnV0ZXMoYXR0cmlidXRlczogTW9kZWxBdHRyaWJ1dGVbXSkge1xuICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRBdHRyaWJ1dGVEZWZpbml0aW9uKCk6IE1vZGVsQXR0cmlidXRlW10ge1xuICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVzO1xuICB9XG5cbiAgcHVibGljIHNldEF0dHJpYnV0ZXModmFsdWVzKTogdm9pZCB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZXMpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMuX3ZhbHVlc1trZXlzW2ldXSA9IHZhbHVlc1trZXlzW2ldXTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGF0dHJpYnV0ZXModmFsdWVzKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVzKHZhbHVlcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGF0dHJpYnV0ZXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWVzO1xuICB9XG5cbiAgcHVibGljIHNldEF0dHJpYnV0ZShhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWUpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZXNbYXR0cmlidXRlXSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldEF0dHJpYnV0ZShhdHRyaWJ1dGU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlc1thdHRyaWJ1dGVdO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvTW9kZWwudHMiLCJpbXBvcnQgeyBBY3RpdmVSZWNvcmQgfSBmcm9tICcuL0FjdGl2ZVJlY29yZCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY3RpdmVRdWVyeSB7XG5cbiAgcHJpdmF0ZSBfZGI6IGFueTtcbiAgcHJpdmF0ZSBfbW9kZWw6IHR5cGVvZiBBY3RpdmVSZWNvcmQgJiBhbnk7XG4gIHByaXZhdGUgX3BhcmFtczoge1xuICAgIGZpZWxkczogc3RyaW5nW10sXG4gICAgbGltaXQ6IHtcbiAgICAgIHN0YXJ0OiBudW1iZXIsXG4gICAgICBlbmQ6IG51bWJlclxuICAgIH0sXG4gICAgc29ydDogc3RyaW5nW10sXG4gICAgd2hlcmU6IGFueSxcbiAgfSA9IHtcbiAgICAgIGZpZWxkczogW10sXG4gICAgICBsaW1pdDoge1xuICAgICAgICBzdGFydDogMCxcbiAgICAgICAgZW5kOiB1bmRlZmluZWRcbiAgICAgIH0sXG4gICAgICBzb3J0OiBbXSxcbiAgICAgIHdoZXJlOiB7fSxcbiAgICB9O1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsOiB0eXBlb2YgQWN0aXZlUmVjb3JkKSB7XG4gICAgbW9kZWwuaW5pdCgpO1xuICAgIHRoaXMuX2RiID0gbW9kZWwuZGI7XG4gICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGFyYW1zKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJhbXM7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRiKCkge1xuICAgIHJldHVybiB0aGlzLl9kYjtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICB9XG5cbiAgcHVibGljIGZpZWxkcyhwYXJhbTogc3RyaW5nW10pIHtcbiAgICBsZXQgZmllbGRzOiBhbnkgPSBwYXJhbTtcbiAgICBpZiAocGFyYW0uY29uc3RydWN0b3IubmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZpZWxkcyA9IFtwYXJhbV07XG4gICAgfVxuICAgIHRoaXMuX3BhcmFtcy5maWVsZHMgPSBmaWVsZHM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgc29ydChwYXJhbTogc3RyaW5nW10pIHtcbiAgICBsZXQgc29ydDogYW55ID0gcGFyYW07XG4gICAgaWYgKHBhcmFtLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBzb3J0ID0gW3BhcmFtXTtcbiAgICB9XG4gICAgdGhpcy5fcGFyYW1zLnNvcnQgPSBzb3J0O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGxpbWl0KHN0YXJ0ID0gMCwgZW5kID0gbnVsbCkge1xuICAgIHRoaXMuX3BhcmFtcy5saW1pdC5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuX3BhcmFtcy5saW1pdC5lbmQgPSBlbmQ7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgd2hlcmUoY29uZGl0aW9uOiBhbnkgPSB7fSkge1xuICAgIE9iamVjdC5rZXlzKGNvbmRpdGlvbikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzLl9wYXJhbXMud2hlcmVba2V5XSA9IGNvbmRpdGlvbltrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IG9uZShtYXA/OiBib29sZWFuKTogUHJvbWlzZTxhbnk+O1xuICBwdWJsaWMgYWJzdHJhY3QgYWxsKG1hcD86IGJvb2xlYW4pOiBQcm9taXNlPGFueVtdPjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BY3RpdmVRdWVyeS50cyIsImV4cG9ydCAqIGZyb20gJy4vQWN0aXZlUXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9BY3RpdmVSZWNvcmQnO1xuZXhwb3J0ICogZnJvbSAnLi9BY3RpdmVSZWNvcmRSZWxhdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL01vZGVsJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsImltcG9ydCB7IEFjdGl2ZVF1ZXJ5IH0gZnJvbSAnLi9BY3RpdmVRdWVyeSc7XG5pbXBvcnQgeyBNb2RlbCwgTW9kZWxBdHRyaWJ1dGUgfSBmcm9tICcuL01vZGVsJztcbmltcG9ydCB7IEFjdGl2ZVJlY29yZFJlbGF0aW9uIH0gZnJvbSAnLi9BY3RpdmVSZWNvcmRSZWxhdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aXZlUmVjb3JkQ29uZmlnIHtcbiAgaWRlbnRpZmllcjogc3RyaW5nO1xuICB0YWJsZU5hbWU6IHN0cmluZztcbiAgcXVlcnlDbGFzczogYW55O1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFjdGl2ZVJlY29yZCBleHRlbmRzIE1vZGVsIHtcblxuICBwcm90ZWN0ZWQgc3RhdGljIF9yZWxhdGlvbnM6IEFjdGl2ZVJlY29yZFJlbGF0aW9uW10gPSBbXTtcblxuICBwcm90ZWN0ZWQgc3RhdGljIF9pZGVudGlmaWVyOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBzdGF0aWMgX3RhYmxlTmFtZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgc3RhdGljIF9xdWVyeUNsYXNzOiBhbnk7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2RlZmF1bHRDb25maWc6IEFjdGl2ZVJlY29yZENvbmZpZyA9IHtcbiAgICBpZGVudGlmaWVyOiAnaWQnLFxuICAgIHRhYmxlTmFtZTogJ0FjdGl2ZVJlY29yZCcsXG4gICAgcXVlcnlDbGFzczogQWN0aXZlUXVlcnlcbiAgfTtcblxuICBwcml2YXRlIHN0YXRpYyBfY29uZmlnOiB7IFttb2RlbDogc3RyaW5nXTogQWN0aXZlUmVjb3JkQ29uZmlnOyB9ID0ge307XG4gIHByb3RlY3RlZCBzdGF0aWMgX2RiOiB7IFttb2RlbDogc3RyaW5nXTogYW55OyB9ID0ge307XG4gIHByaXZhdGUgc3RhdGljIF9pbml0aWFsaXplZDogeyBbbW9kZWw6IHN0cmluZ106IGJvb2xlYW47IH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZXM/KSB7XG4gICAgc3VwZXIodmFsdWVzKTtcbiAgICB0aGlzLl9jbGFzcy5pbml0KCk7XG4gICAgdGhpcy5faW5pdFJlbGF0aW9ucygpO1xuICB9XG5cbiAgc3RhdGljIGdldCBkYigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGJbdGhpcy5jb25maWcudGFibGVOYW1lXTtcbiAgfVxuXG4gIGdldCBkYigpIHtcbiAgICByZXR1cm4gdGhpcy5fY2xhc3MuZGJbdGhpcy5fY2xhc3MuY29uZmlnLnRhYmxlTmFtZV07XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RhdGljIF9kYkluaXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdGhpcy5pbml0aWFsaXplZCh0aGlzLmNvbmZpZy50YWJsZU5hbWUpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemVkKG1vZGVsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbml0aWFsaXplZFttb2RlbF0gPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgY29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWdbdGhpcy5fdGFibGVOYW1lXTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0IGNvbmZpZyhjb25maWcpIHtcbiAgICBPYmplY3Qua2V5cyhjb25maWcpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgdGhpcy5fY29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgaW5pdCgpIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWRbdGhpcy5fdGFibGVOYW1lXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbmZpZ1t0aGlzLl90YWJsZU5hbWVdID0ge1xuICAgICAgaWRlbnRpZmllcjogdGhpcy5faWRlbnRpZmllciB8fCB0aGlzLl9kZWZhdWx0Q29uZmlnLmlkZW50aWZpZXIsXG4gICAgICB0YWJsZU5hbWU6IHRoaXMuX3RhYmxlTmFtZSB8fCB0aGlzLl9kZWZhdWx0Q29uZmlnLnRhYmxlTmFtZSxcbiAgICAgIHF1ZXJ5Q2xhc3M6IHRoaXMuX3F1ZXJ5Q2xhc3MgfHwgdGhpcy5fZGVmYXVsdENvbmZpZy5xdWVyeUNsYXNzXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLl9kYkluaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRSZWxhdGlvbnMoKSB7XG4gICAgdGhpcy5fY2xhc3MuX3JlbGF0aW9ucy5mb3JFYWNoKChyZWxhdGlvbikgPT4gcmVsYXRpb24uaW5pdCh0aGlzKSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFkZFJlbGF0aW9uKHJlbGF0aW9uOiBBY3RpdmVSZWNvcmRSZWxhdGlvbikge1xuICAgIHRoaXMuX3JlbGF0aW9ucy5wdXNoKHJlbGF0aW9uKTtcbiAgfVxuXG4gIC8qIEVhc3kgYWNjZXNzIGdldHRlciAqL1xuXG4gIGdldCBpZCgpOiBzdHJpbmcgfCBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSh0aGlzLl9jbGFzcy5jb25maWcuaWRlbnRpZmllcik7XG4gIH1cblxuICBzZXQgaWQodmFsdWU6IHN0cmluZyB8IG51bWJlcikge1xuICAgIGlmICghdGhpcy5pZCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUodGhpcy5fY2xhc3MuY29uZmlnLmlkZW50aWZpZXIsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNOZXdSZWNvcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlkO1xuICB9XG5cbiAgLyogUXVlcnlpbmcgbWV0aG9kcyAqL1xuXG4gIHB1YmxpYyBzdGF0aWMgZmluZCgpOiBBY3RpdmVRdWVyeSAmIGFueSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbmZpZy5xdWVyeUNsYXNzKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaW5kT25lKGNvbmRpdGlvbjogYW55ID0ge30pOiBQcm9taXNlPEFjdGl2ZVJlY29yZCAmIGFueT4ge1xuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgLy8gY29uZGl0aW9uIGlzIGlkXG4gICAgaWYgKHR5cGVvZiBjb25kaXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgaWRDb25kaXRpb24gPSB7fTtcbiAgICAgIGlkQ29uZGl0aW9uW3RoaXMuY29uZmlnLmlkZW50aWZpZXJdID0gY29uZGl0aW9uO1xuICAgICAgcmV0dXJuIHRoaXMuZmluZCgpXG4gICAgICAgIC53aGVyZShpZENvbmRpdGlvbilcbiAgICAgICAgLm9uZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmZpbmQoKVxuICAgICAgLndoZXJlKGNvbmRpdGlvbilcbiAgICAgIC5vbmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZmluZEFsbChjb25kaXRpb24gPSB7fSk6IFByb21pc2U8QWN0aXZlUmVjb3JkW10gJiBhbnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmZpbmQoKVxuICAgICAgLndoZXJlKGNvbmRpdGlvbilcbiAgICAgIC5hbGwoKTtcbiAgfVxuXG4gIHB1YmxpYyBhYnN0cmFjdCBzYXZlKCk6IFByb21pc2U8dGhpcz47XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBzYXZlKG9iamVjdHMpOiBQcm9taXNlPGFueVtdPiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNb2RlbC5zYXZlKCkgbmVlZHMgdG8gYmUgc2V0IScpO1xuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FjdGl2ZVJlY29yZC50cyIsImltcG9ydCB7IE1vZGVsLCBNb2RlbEF0dHJpYnV0ZSB9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHsgQWN0aXZlUmVjb3JkIH0gZnJvbSAnLi9BY3RpdmVSZWNvcmQnO1xuXG5jb25zdCBBY3RpdmVSZWNvcmRSZWxhdGlvblR5cGUgPSB7XG4gIEhhc09uZTogMSxcbiAgSGFzTWFueTogMixcbiAgTWFueVRvTWFueTogM1xufTtcblxuaW50ZXJmYWNlIExhYmVsIHtcbiAgb3JpZ2luYWw6IHN0cmluZztcbiAgc2luZ3VsYXI6IHN0cmluZztcbiAgcGx1cmFsOiBzdHJpbmc7XG4gIGNhcGl0YWxpemVkU2luZ3VsYXI6IHN0cmluZztcbiAgY2FwaXRhbGl6ZWRQbHVyYWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFjdGl2ZVJlY29yZFJlbGF0aW9uIHtcblxuICBwcml2YXRlIF9jaGlsZDogdHlwZW9mIEFjdGl2ZVJlY29yZCAmIGFueTtcbiAgcHJpdmF0ZSBfZm9yZWlnbktleTogc3RyaW5nO1xuICBwcml2YXRlIF9pbnRlcm1lZGlhdGU6IHR5cGVvZiBBY3RpdmVSZWNvcmQgJiBhbnk7XG4gIHByaXZhdGUgX2tleTogc3RyaW5nO1xuICBwcml2YXRlIF9sYWJlbDogTGFiZWw7XG4gIHByaXZhdGUgX3Byb3BlcnR5OiBzdHJpbmc7XG4gIHByaXZhdGUgX3R5cGU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZXM/OiBhbnksIGF0dHJpYnV0ZXM/OiBNb2RlbEF0dHJpYnV0ZVtdKSB7XG4gICAgdGhpcy5fY2hpbGQgPSB2YWx1ZXMuX2NoaWxkO1xuICAgIHRoaXMuX2ZvcmVpZ25LZXkgPSB2YWx1ZXMuX2ZvcmVpZ25LZXk7XG4gICAgdGhpcy5faW50ZXJtZWRpYXRlID0gdmFsdWVzLl9pbnRlcm1lZGlhdGU7XG4gICAgdGhpcy5fa2V5ID0gdmFsdWVzLl9rZXk7XG4gICAgdGhpcy5fbGFiZWwgPSB0aGlzLl9mb3JtYXRMYWJlbCh2YWx1ZXMuX2xhYmVsKTtcbiAgICB0aGlzLl9wcm9wZXJ0eSA9IHZhbHVlcy5fcHJvcGVydHk7XG4gICAgdGhpcy5fdHlwZSA9IHZhbHVlcy5fdHlwZTtcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1hdExhYmVsKHN0cmluZzogc3RyaW5nKTogTGFiZWwge1xuICAgIGxldCBzaW5ndWxhciA9IHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMV0gPT09ICdzJyA/IHN0cmluZy5zdWJzdHIoMCwgc3RyaW5nLmxlbmd0aCAtIDEpIDogc3RyaW5nO1xuICAgIGxldCBwbHVyYWwgPSBzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDFdID09PSAncycgPyBzdHJpbmcgOiBzdHJpbmcgKyAncyc7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9yaWdpbmFsOiBzdHJpbmcsXG4gICAgICBzaW5ndWxhcjogc2luZ3VsYXIsXG4gICAgICBwbHVyYWw6IHBsdXJhbCxcbiAgICAgIGNhcGl0YWxpemVkU2luZ3VsYXI6IHNpbmd1bGFyWzBdLnRvVXBwZXJDYXNlKCkgKyBzaW5ndWxhci5zbGljZSgxKSxcbiAgICAgIGNhcGl0YWxpemVkUGx1cmFsOiBwbHVyYWxbMF0udG9VcHBlckNhc2UoKSArIHBsdXJhbC5zbGljZSgxKVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaGFzT25lKGxhYmVsOiBzdHJpbmcsIGNoaWxkOiB0eXBlb2YgQWN0aXZlUmVjb3JkLCBwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKHtcbiAgICAgIF9jaGlsZDogY2hpbGQsXG4gICAgICBfbGFiZWw6IGxhYmVsLFxuICAgICAgX3Byb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgIF90eXBlOiBBY3RpdmVSZWNvcmRSZWxhdGlvblR5cGUuSGFzT25lXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGhhc01hbnkobGFiZWw6IHN0cmluZywgY2hpbGQ6IHR5cGVvZiBBY3RpdmVSZWNvcmQsIHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMoe1xuICAgICAgX2NoaWxkOiBjaGlsZCxcbiAgICAgIF9sYWJlbDogbGFiZWwsXG4gICAgICBfcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgX3R5cGU6IEFjdGl2ZVJlY29yZFJlbGF0aW9uVHlwZS5IYXNNYW55XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG1hbnlUb01hbnkobGFiZWw6IHN0cmluZywgY2hpbGQ6IHR5cGVvZiBBY3RpdmVSZWNvcmQsIGludGVybWVkaWF0ZTogdHlwZW9mIEFjdGl2ZVJlY29yZCwga2V5OiBzdHJpbmcsIGZvcmVpZ25LZXk6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgdGhpcyh7XG4gICAgICBfY2hpbGQ6IGNoaWxkLFxuICAgICAgX2ZvcmVpZ25LZXk6IGZvcmVpZ25LZXksXG4gICAgICBfaW50ZXJtZWRpYXRlOiBpbnRlcm1lZGlhdGUsXG4gICAgICBfa2V5OiBrZXksXG4gICAgICBfbGFiZWw6IGxhYmVsLFxuICAgICAgX3R5cGU6IEFjdGl2ZVJlY29yZFJlbGF0aW9uVHlwZS5NYW55VG9NYW55XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaW5pdChtb2RlbDogQWN0aXZlUmVjb3JkKSB7XG4gICAgbGV0IGNvbmRpdGlvbiA9IHt9O1xuICAgIGlmICh0aGlzLl90eXBlID09PSBBY3RpdmVSZWNvcmRSZWxhdGlvblR5cGUuSGFzT25lKSB7XG4gICAgICB0aGlzLl9pbml0SGFzT25lKG1vZGVsLCBjb25kaXRpb24pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdHlwZSA9PT0gQWN0aXZlUmVjb3JkUmVsYXRpb25UeXBlLkhhc01hbnkpIHtcbiAgICAgIHRoaXMuX2luaXRIYXNNYW55KG1vZGVsLCBjb25kaXRpb24pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdHlwZSA9PT0gQWN0aXZlUmVjb3JkUmVsYXRpb25UeXBlLk1hbnlUb01hbnkpIHtcbiAgICAgIHRoaXMuX2luaXRNYW55VG9NYW55KG1vZGVsLCBjb25kaXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRIYXNPbmUobW9kZWw6IEFjdGl2ZVJlY29yZCwgY29uZGl0aW9uKSB7XG4gICAgLy8gYWRkIHByb3BlcnR5IHRvIGNsYXNzXG4gICAgY29uc3QgYXR0cmlidXRlID0gbmV3IE1vZGVsQXR0cmlidXRlKHRoaXMuX3Byb3BlcnR5LCAnc3RyaW5nJyk7XG4gICAgbW9kZWwuY2xhc3MuYWRkQXR0cmlidXRlcyhbYXR0cmlidXRlXSk7XG4gICAgYXR0cmlidXRlLmluaXQobW9kZWwpO1xuICAgIG1vZGVsLnNldEF0dHJpYnV0ZSh0aGlzLl9wcm9wZXJ0eSwgbW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMuX3Byb3BlcnR5KSB8fCBudWxsKTtcblxuICAgIGlmICghbW9kZWwuaGFzT3duUHJvcGVydHkodGhpcy5fbGFiZWwub3JpZ2luYWwpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWwsIHRoaXMuX2xhYmVsLm9yaWdpbmFsLCB7XG4gICAgICAgIGdldDogKCkgPT4gdGhpcy5fY2hpbGQuZmluZE9uZShtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fcHJvcGVydHkpKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghbW9kZWwuaGFzT3duUHJvcGVydHkodGhpcy5fcHJvcGVydHkpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWwsIHRoaXMuX3Byb3BlcnR5LCB7XG4gICAgICAgIGdldDogKCkgPT4gbW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMuX3Byb3BlcnR5KSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFkZCBgc2V0Q2hpbGQoKWAgbWV0aG9kXG4gICAgbW9kZWxbJ3NldCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFNpbmd1bGFyXSA9IGFzeW5jIChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgaWYgKCEob2JqZWN0IGluc3RhbmNlb2YgdGhpcy5fY2hpbGQpKSB7XG4gICAgICAgIG9iamVjdCA9IG5ldyB0aGlzLl9jaGlsZChvYmplY3QpO1xuICAgICAgfVxuICAgICAgYXdhaXQgb2JqZWN0LnNhdmUoKTtcbiAgICAgIG1vZGVsLnNldEF0dHJpYnV0ZSh0aGlzLl9wcm9wZXJ0eSwgb2JqZWN0LmdldEF0dHJpYnV0ZSh0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcikpO1xuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0SGFzTWFueShtb2RlbDogQWN0aXZlUmVjb3JkLCBjb25kaXRpb24pIHtcbiAgICAvLyBhZGQgZm9yZWlnbiBwcm9wZXJ0eSB0byBjaGlsZCBjbGFzc1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG5ldyBNb2RlbEF0dHJpYnV0ZSh0aGlzLl9wcm9wZXJ0eSwgJ2ZvcmVpZ25LZXknKTtcbiAgICB0aGlzLl9jaGlsZC5hZGRBdHRyaWJ1dGVzKFthdHRyaWJ1dGVdKTtcbiAgICBhdHRyaWJ1dGUuaW5pdChtb2RlbCk7XG5cbiAgICAvLyBzZXQgZ2V0dGVyIGBjaGlsZHJlbmAgcHJvcGVydHlcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWwsIHRoaXMuX2xhYmVsLnBsdXJhbCwge1xuICAgICAgZ2V0OiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2NoaWxkLmluaXQoKTtcbiAgICAgICAgY29uZGl0aW9uW3RoaXMuX3Byb3BlcnR5XSA9IG1vZGVsLmdldEF0dHJpYnV0ZSh0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgbW9kZWwuY2xhc3MuY29uZmlnLnF1ZXJ5Q2xhc3ModGhpcy5fY2hpbGQpLndoZXJlKGNvbmRpdGlvbikuYWxsKCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gYWRkIGBnZXRDaGlsZCgpYCBtZXRob2RcbiAgICBtb2RlbFsnZ2V0JyArIHRoaXMuX2xhYmVsLmNhcGl0YWxpemVkUGx1cmFsXSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbmRpdGlvblt0aGlzLl9wcm9wZXJ0eV0gPSBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgcmV0dXJuIGF3YWl0IG5ldyBtb2RlbC5jbGFzcy5jb25maWcucXVlcnlDbGFzcyh0aGlzLl9jaGlsZCkud2hlcmUoY29uZGl0aW9uKTtcbiAgICB9O1xuXG4gICAgLy8gYWRkIGBhZGRDaGlsZCgpYCBtZXRob2RcbiAgICBtb2RlbFsnYWRkJyArIHRoaXMuX2xhYmVsLmNhcGl0YWxpemVkU2luZ3VsYXJdID0gYXN5bmMgKG9iamVjdDogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBtb2RlbFsnYWRkJyArIHRoaXMuX2xhYmVsLmNhcGl0YWxpemVkUGx1cmFsXShbb2JqZWN0XSk7XG4gICAgICByZXR1cm4gcmVzWzBdO1xuICAgIH1cblxuICAgIC8vIGFkZCBgYWRkQ2hpbGRyZW4oKWAgbWV0aG9kXG4gICAgbW9kZWxbJ2FkZCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFBsdXJhbF0gPSBhc3luYyAob2JqZWN0czogYW55W10pID0+IHtcbiAgICAgIGlmICghb2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgcGFyZW50IG1vZGVsIGlkIGluIGNoaWxkcmVuIG1vZGVsc1xuICAgICAgb2JqZWN0cyA9IG9iamVjdHMubWFwKChvYmplY3QpID0+IHtcbiAgICAgICAgb2JqZWN0W3RoaXMuX3Byb3BlcnR5XSA9IG1vZGVsLmdldEF0dHJpYnV0ZSh0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcik7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICB9KTtcblxuICAgICAgLy8gc2F2ZSBhbGwgb2JqZWN0c1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX2NoaWxkLnNhdmUob2JqZWN0cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE1hbnlUb01hbnkobW9kZWw6IEFjdGl2ZVJlY29yZCwgY29uZGl0aW9uKSB7XG4gICAgLy8gYWRkIGZvcmVpZ24gcHJvcGVydHkgdG8gaW50ZXJtZWRpYXRlIGNsYXNzXG4gICAgY29uc3QgYXR0cmlidXRlID0gbmV3IE1vZGVsQXR0cmlidXRlKHRoaXMuX2ZvcmVpZ25LZXksICdmb3JlaWduS2V5Jyk7XG4gICAgdGhpcy5faW50ZXJtZWRpYXRlLmFkZEF0dHJpYnV0ZXMoW2F0dHJpYnV0ZV0pO1xuICAgIGF0dHJpYnV0ZS5pbml0KG1vZGVsKTtcblxuICAgIC8vIHNldCBnZXR0ZXIgYGNoaWxkcmVuYCBwcm9wZXJ0eVxuICAgIGlmICghbW9kZWwuaGFzT3duUHJvcGVydHkodGhpcy5fbGFiZWwucGx1cmFsKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZGVsLCB0aGlzLl9sYWJlbC5wbHVyYWwsIHtcbiAgICAgICAgZ2V0OiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fY2hpbGQuaW5pdCgpO1xuICAgICAgICAgIGNvbmRpdGlvblt0aGlzLl9rZXldID0gbW9kZWwuZ2V0QXR0cmlidXRlKG1vZGVsLmNsYXNzLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCB0aGlzLl9pbnRlcm1lZGlhdGUuZmluZCgpXG4gICAgICAgICAgICAud2hlcmUoY29uZGl0aW9uKVxuICAgICAgICAgICAgLmZpZWxkcyhbdGhpcy5fZm9yZWlnbktleV0pXG4gICAgICAgICAgICAuYWxsKGZhbHNlKTtcbiAgICAgICAgICBpZiAoIXJlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgaWRzID0gcmVzLm1hcCgoZG9jKSA9PiBkb2NbdGhpcy5fZm9yZWlnbktleV0pLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICBsZXQgcXVlcnlDb25kaXRpb24gPSB7fTtcbiAgICAgICAgICBxdWVyeUNvbmRpdGlvblt0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcl0gPSB7ICRpbjogaWRzIH07XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBtb2RlbC5jbGFzcy5jb25maWcucXVlcnlDbGFzcyh0aGlzLl9jaGlsZClcbiAgICAgICAgICAgIC53aGVyZShxdWVyeUNvbmRpdGlvbilcbiAgICAgICAgICAgIC5hbGwoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGBnZXRDaGlsZCgpYCBtZXRob2RcbiAgICBtb2RlbFsnZ2V0JyArIHRoaXMuX2xhYmVsLmNhcGl0YWxpemVkUGx1cmFsXSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbmRpdGlvblt0aGlzLl9rZXldID0gbW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2ludGVybWVkaWF0ZS5maW5kKClcbiAgICAgICAgLndoZXJlKGNvbmRpdGlvbilcbiAgICAgICAgLmZpZWxkcyhbdGhpcy5fZm9yZWlnbktleV0pXG4gICAgICAgIC5hbGwoZmFsc2UpO1xuICAgICAgaWYgKCFyZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgbGV0IGlkcyA9IHJlcy5tYXAoKGRvYykgPT4gZG9jW3RoaXMuX2ZvcmVpZ25LZXldKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICBsZXQgcXVlcnlDb25kaXRpb24gPSB7fTtcbiAgICAgIHF1ZXJ5Q29uZGl0aW9uW3RoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyXSA9IHsgJGluOiBpZHMgfTtcbiAgICAgIHJldHVybiBhd2FpdCBuZXcgbW9kZWwuY2xhc3MuY29uZmlnLnF1ZXJ5Q2xhc3ModGhpcy5fY2hpbGQpXG4gICAgICAgIC53aGVyZShxdWVyeUNvbmRpdGlvbik7XG4gICAgfTtcblxuICAgIC8vIGFkZCBgYWRkQ2hpbGQoKWAgbWV0aG9kXG4gICAgbW9kZWxbJ2FkZCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFNpbmd1bGFyXSA9IGFzeW5jIChvYmplY3Q6IGFueSkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgbW9kZWxbJ2FkZCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFBsdXJhbF0oW29iamVjdF0pO1xuICAgICAgcmV0dXJuIHJlc1swXTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYGFkZENoaWxkcmVuKClgIG1ldGhvZFxuICAgIG1vZGVsWydhZGQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRQbHVyYWxdID0gYXN5bmMgKG9iamVjdHM6IGFueVtdKSA9PiB7XG4gICAgICBpZiAoIW9iamVjdHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gc2F2ZSBhbGwgb2JqZWN0c1xuICAgICAgY29uc3Qgc2F2ZWRPYmplY3RzID0gYXdhaXQgdGhpcy5fY2hpbGQuc2F2ZShvYmplY3RzKTtcblxuICAgICAgbGV0IGNvbmRpdGlvbiA9IHt9O1xuICAgICAgY29uZGl0aW9uW3RoaXMuX2ZvcmVpZ25LZXldID0geyAkaW46IHNhdmVkT2JqZWN0cy5tYXAoKG9iamVjdCkgPT4gb2JqZWN0LmdldEF0dHJpYnV0ZSh0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcikpIH07XG4gICAgICBjb25zdCBleGlzdGluZ1JlbGF0aW9ucyA9IGF3YWl0IHRoaXMuX2ludGVybWVkaWF0ZS5maW5kQWxsKGNvbmRpdGlvbik7XG5cbiAgICAgIGZvciAobGV0IG9iamVjdCBvZiBzYXZlZE9iamVjdHMpIHtcbiAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nUmVsYXRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIGV4aXN0aW5nUmVsYXRpb25zLmZvckVhY2goKGV4aXN0aW5nKSA9PiB7XG4gICAgICAgICAgICBmb3VuZCA9IGZvdW5kIHx8IG9iamVjdC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpID09PSBleGlzdGluZy5nZXRBdHRyaWJ1dGUodGhpcy5fZm9yZWlnbktleSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgICBkYXRhW3RoaXMuX2tleV0gPSBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgICAgIGRhdGFbdGhpcy5fZm9yZWlnbktleV0gPSBvYmplY3QuZ2V0QXR0cmlidXRlKHRoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgICAgICAgICBsZXQgcmVsYXRpb24gPSBuZXcgdGhpcy5faW50ZXJtZWRpYXRlKGRhdGEpO1xuICAgICAgICAgIGF3YWl0IHJlbGF0aW9uLnNhdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNhdmVkT2JqZWN0cztcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BY3RpdmVSZWNvcmRSZWxhdGlvbi50cyJdLCJzb3VyY2VSb290IjoiIn0=