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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjcxMTE1ZDY1ZDNhNTc0NGJlNDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9BY3RpdmVRdWVyeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FjdGl2ZVJlY29yZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvQWN0aXZlUmVjb3JkUmVsYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBO0lBSUUsd0JBQVksSUFBSSxFQUFFLElBQXVCO1FBQXZCLHNDQUF1QjtRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLEtBQVk7UUFBakIsaUJBYUM7UUFaQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFB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QUFLLENBQUMsWUFBWSxDQUFDLE9BQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzt3Q0FDcEUsSUFBSSxDQUFDLE9BQUssV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7d0NBQ3hFLFFBQVEsR0FBRyxJQUFJLE9BQUssYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO3dDQUM1QyxxQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFOzt3Q0FBckIsU0FBcUIsQ0FBQzs7Ozs7Ozs4QkFkSyxFQUFaLDZCQUFZOzs7NkJBQVosMkJBQVk7d0JBQXRCLE1BQU07c0RBQU4sTUFBTTs7Ozs7d0JBQUksSUFBWTs7NEJBaUIvQixzQkFBTyxZQUFZLEVBQUM7OzthQUNyQjtJQUNILENBQUM7SUFDSCwyQkFBQztBQUFELENBQUM7QUF6T1ksb0RBQW9CIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjcxMTE1ZDY1ZDNhNTc0NGJlNDMiLCJleHBvcnQgY2xhc3MgTW9kZWxBdHRyaWJ1dGUge1xuICBuYW1lOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihuYW1lLCB0eXBlOiBzdHJpbmcgPSAnc3RyaW5nJykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGluaXQobW9kZWw6IE1vZGVsKSB7XG4gICAgaWYgKG1vZGVsLmNsYXNzTmFtZSA9PT0gJ0Zvb0NoaWxkJyAmJiB0aGlzLm5hbWUgPT09ICdmb28nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCd6JywgbW9kZWwuY2xhc3NOYW1lLCB0aGlzLm5hbWUsIG1vZGVsLmhhc093blByb3BlcnR5KHRoaXMubmFtZSksIG1vZGVsW3RoaXMubmFtZV0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhc2QnKTtcbiAgICB9XG4gICAgaWYgKCFtb2RlbC5oYXNPd25Qcm9wZXJ0eSh0aGlzLm5hbWUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWwsIHRoaXMubmFtZSwge1xuICAgICAgICBnZXQ6ICgpID0+IG1vZGVsLmdldEF0dHJpYnV0ZSh0aGlzLm5hbWUpLFxuICAgICAgICBzZXQ6ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgICAgICAgbW9kZWwuc2V0QXR0cmlidXRlKHRoaXMubmFtZSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb2RlbCB7XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBfYXR0cmlidXRlczogTW9kZWxBdHRyaWJ1dGVbXSA9IFtdO1xuICBwcm90ZWN0ZWQgX3ZhbHVlczogYW55ID0ge307XG5cbiAgcHJvdGVjdGVkIF9jbGFzczogYW55ID0gdGhpcy5jb25zdHJ1Y3RvcjsgLy9AdG9kbzogY2FuIGJlIHJlbW92ZWQgPyFcblxuICBjb25zdHJ1Y3Rvcih2YWx1ZXM/LCBhdHRyaWJ1dGVzOiBNb2RlbEF0dHJpYnV0ZVtdID0gW10pIHtcbiAgICB0aGlzLl9jbGFzcy5hZGRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpO1xuICAgIHRoaXMuX2luaXRBdHRyaWJ1dGVzKCk7XG4gICAgaWYgKHZhbHVlcykge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVzID0gdmFsdWVzO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYWRkQXR0cmlidXRlcyhhdHRyaWJ1dGVzOiBNb2RlbEF0dHJpYnV0ZVtdKSB7XG4gICAgYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyaWJ1dGU6IE1vZGVsQXR0cmlidXRlKSA9PiB7XG4gICAgICBsZXQgZm91bmQgPSBmYWxzZSxcbiAgICAgICAgaW5kZXggPSBudWxsO1xuICAgICAgdGhpcy5fYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyOiBNb2RlbEF0dHJpYnV0ZSwgaSkgPT4ge1xuICAgICAgICBpZiAoYXR0cmlidXRlLm5hbWUgPT09IGF0dHIubmFtZSkge1xuICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlc1tpbmRleF0gPSBhdHRyaWJ1dGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9hdHRyaWJ1dGVzLnB1c2goYXR0cmlidXRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaGFzQXR0cmlidXRlKGF0dHJpYnV0ZTogc3RyaW5nKSB7XG4gICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgdGhpcy5fYXR0cmlidXRlcy5mb3JFYWNoKChhdHRyOiBNb2RlbEF0dHJpYnV0ZSwgaSkgPT4ge1xuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gYXR0ci5uYW1lKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBwdWJsaWMgaGFzQXR0cmlidXRlKGF0dHJpYnV0ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYXNzLmhhc0F0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICB9XG5cbiAgZ2V0IGNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9jbGFzcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jbGFzcy5uYW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEF0dHJpYnV0ZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2xhc3MuX2F0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cmlidXRlOiBNb2RlbEF0dHJpYnV0ZSkgPT4gYXR0cmlidXRlLmluaXQodGhpcykpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBkZWZpbmVBdHRyaWJ1dGVzKGF0dHJpYnV0ZXM6IE1vZGVsQXR0cmlidXRlW10pIHtcbiAgICB0aGlzLl9hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0QXR0cmlidXRlRGVmaW5pdGlvbigpOiBNb2RlbEF0dHJpYnV0ZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlcztcbiAgfVxuXG4gIHB1YmxpYyBzZXRBdHRyaWJ1dGVzKHZhbHVlcyk6IHZvaWQge1xuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModmFsdWVzKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0aGlzLl92YWx1ZXNba2V5c1tpXV0gPSB2YWx1ZXNba2V5c1tpXV07XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldCBhdHRyaWJ1dGVzKHZhbHVlcykge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlcyh2YWx1ZXMpO1xuICB9XG5cbiAgcHVibGljIGdldCBhdHRyaWJ1dGVzKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlcztcbiAgfVxuXG4gIHB1YmxpYyBzZXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBzdHJpbmcsIHZhbHVlKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWVzW2F0dHJpYnV0ZV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZXNbYXR0cmlidXRlXTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL01vZGVsLnRzIiwiaW1wb3J0IHsgQWN0aXZlUmVjb3JkIH0gZnJvbSAnLi9BY3RpdmVSZWNvcmQnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWN0aXZlUXVlcnkge1xuXG4gIHByaXZhdGUgX2RiOiBhbnk7XG4gIHByaXZhdGUgX21vZGVsOiB0eXBlb2YgQWN0aXZlUmVjb3JkICYgYW55O1xuICBwcml2YXRlIF9wYXJhbXM6IHtcbiAgICBmaWVsZHM6IHN0cmluZ1tdLFxuICAgIGxpbWl0OiB7XG4gICAgICBzdGFydDogbnVtYmVyLFxuICAgICAgZW5kOiBudW1iZXJcbiAgICB9LFxuICAgIHNvcnQ6IHN0cmluZ1tdLFxuICAgIHdoZXJlOiBhbnksXG4gIH0gPSB7XG4gICAgICBmaWVsZHM6IFtdLFxuICAgICAgbGltaXQ6IHtcbiAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgIGVuZDogdW5kZWZpbmVkXG4gICAgICB9LFxuICAgICAgc29ydDogW10sXG4gICAgICB3aGVyZToge30sXG4gICAgfTtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbDogdHlwZW9mIEFjdGl2ZVJlY29yZCkge1xuICAgIG1vZGVsLmluaXQoKTtcbiAgICB0aGlzLl9kYiA9IG1vZGVsLmRiO1xuICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBhcmFtcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFyYW1zO1xuICB9XG5cbiAgcHVibGljIGdldCBkYigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1vZGVsKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbDtcbiAgfVxuXG4gIHB1YmxpYyBmaWVsZHMocGFyYW06IHN0cmluZ1tdKSB7XG4gICAgbGV0IGZpZWxkczogYW55ID0gcGFyYW07XG4gICAgaWYgKHBhcmFtLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmaWVsZHMgPSBbcGFyYW1dO1xuICAgIH1cbiAgICB0aGlzLl9wYXJhbXMuZmllbGRzID0gZmllbGRzO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIHNvcnQocGFyYW06IHN0cmluZ1tdKSB7XG4gICAgbGV0IHNvcnQ6IGFueSA9IHBhcmFtO1xuICAgIGlmIChwYXJhbS5jb25zdHJ1Y3Rvci5uYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgc29ydCA9IFtwYXJhbV07XG4gICAgfVxuICAgIHRoaXMuX3BhcmFtcy5zb3J0ID0gc29ydDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBsaW1pdChzdGFydCA9IDAsIGVuZCA9IG51bGwpIHtcbiAgICB0aGlzLl9wYXJhbXMubGltaXQuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLl9wYXJhbXMubGltaXQuZW5kID0gZW5kO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHVibGljIHdoZXJlKGNvbmRpdGlvbjogYW55ID0ge30pIHtcbiAgICB0aGlzLl9wYXJhbXMud2hlcmUgPSBjb25kaXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgb25lKG1hcD86IGJvb2xlYW4pOiBQcm9taXNlPGFueT47XG4gIHB1YmxpYyBhYnN0cmFjdCBhbGwobWFwPzogYm9vbGVhbik6IFByb21pc2U8YW55W10+O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FjdGl2ZVF1ZXJ5LnRzIiwiZXhwb3J0ICogZnJvbSAnLi9BY3RpdmVRdWVyeSc7XG5leHBvcnQgKiBmcm9tICcuL0FjdGl2ZVJlY29yZCc7XG5leHBvcnQgKiBmcm9tICcuL0FjdGl2ZVJlY29yZFJlbGF0aW9uJztcbmV4cG9ydCAqIGZyb20gJy4vTW9kZWwnO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiaW1wb3J0IHsgQWN0aXZlUXVlcnkgfSBmcm9tICcuL0FjdGl2ZVF1ZXJ5JztcbmltcG9ydCB7IE1vZGVsLCBNb2RlbEF0dHJpYnV0ZSB9IGZyb20gJy4vTW9kZWwnO1xuaW1wb3J0IHsgQWN0aXZlUmVjb3JkUmVsYXRpb24gfSBmcm9tICcuL0FjdGl2ZVJlY29yZFJlbGF0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBBY3RpdmVSZWNvcmRDb25maWcge1xuICBpZGVudGlmaWVyOiBzdHJpbmc7XG4gIHRhYmxlTmFtZTogc3RyaW5nO1xuICBxdWVyeUNsYXNzOiBhbnk7XG59O1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWN0aXZlUmVjb3JkIGV4dGVuZHMgTW9kZWwge1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgX3JlbGF0aW9uczogQWN0aXZlUmVjb3JkUmVsYXRpb25bXSA9IFtdO1xuXG4gIHByb3RlY3RlZCBzdGF0aWMgX2lkZW50aWZpZXI6IHN0cmluZztcbiAgcHJvdGVjdGVkIHN0YXRpYyBfdGFibGVOYW1lOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBzdGF0aWMgX3F1ZXJ5Q2xhc3M6IGFueTtcblxuICBwcml2YXRlIHN0YXRpYyBfZGVmYXVsdENvbmZpZzogQWN0aXZlUmVjb3JkQ29uZmlnID0ge1xuICAgIGlkZW50aWZpZXI6ICdpZCcsXG4gICAgdGFibGVOYW1lOiAnQWN0aXZlUmVjb3JkJyxcbiAgICBxdWVyeUNsYXNzOiBBY3RpdmVRdWVyeVxuICB9O1xuXG4gIHByaXZhdGUgc3RhdGljIF9jb25maWc6IHsgW21vZGVsOiBzdHJpbmddOiBBY3RpdmVSZWNvcmRDb25maWc7IH0gPSB7fTtcbiAgcHJvdGVjdGVkIHN0YXRpYyBfZGI6IHsgW21vZGVsOiBzdHJpbmddOiBhbnk7IH0gPSB7fTtcbiAgcHJpdmF0ZSBzdGF0aWMgX2luaXRpYWxpemVkOiB7IFttb2RlbDogc3RyaW5nXTogYm9vbGVhbjsgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlcz8pIHtcbiAgICBzdXBlcih2YWx1ZXMpO1xuICAgIHRoaXMuX2NsYXNzLmluaXQoKTtcbiAgICB0aGlzLl9pbml0UmVsYXRpb25zKCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGRiKCkge1xuICAgIHJldHVybiB0aGlzLl9kYlt0aGlzLmNvbmZpZy50YWJsZU5hbWVdO1xuICB9XG5cbiAgZ2V0IGRiKCkge1xuICAgIHJldHVybiB0aGlzLl9jbGFzcy5kYlt0aGlzLl9jbGFzcy5jb25maWcudGFibGVOYW1lXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdGF0aWMgX2RiSW5pdCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICB0aGlzLmluaXRpYWxpemVkKHRoaXMuY29uZmlnLnRhYmxlTmFtZSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5pdGlhbGl6ZWQobW9kZWw6IHN0cmluZykge1xuICAgIHRoaXMuX2luaXRpYWxpemVkW21vZGVsXSA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldCBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZ1t0aGlzLl90YWJsZU5hbWVdO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXQgY29uZmlnKGNvbmZpZykge1xuICAgIE9iamVjdC5rZXlzKGNvbmZpZykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICB0aGlzLl9jb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBpbml0KCkge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZFt0aGlzLl90YWJsZU5hbWVdKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZmlnW3RoaXMuX3RhYmxlTmFtZV0gPSB7XG4gICAgICBpZGVudGlmaWVyOiB0aGlzLl9pZGVudGlmaWVyIHx8IHRoaXMuX2RlZmF1bHRDb25maWcuaWRlbnRpZmllcixcbiAgICAgIHRhYmxlTmFtZTogdGhpcy5fdGFibGVOYW1lIHx8IHRoaXMuX2RlZmF1bHRDb25maWcudGFibGVOYW1lLFxuICAgICAgcXVlcnlDbGFzczogdGhpcy5fcXVlcnlDbGFzcyB8fCB0aGlzLl9kZWZhdWx0Q29uZmlnLnF1ZXJ5Q2xhc3NcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMuX2RiSW5pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFJlbGF0aW9ucygpIHtcbiAgICB0aGlzLl9jbGFzcy5fcmVsYXRpb25zLmZvckVhY2goKHJlbGF0aW9uKSA9PiByZWxhdGlvbi5pbml0KHRoaXMpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYWRkUmVsYXRpb24ocmVsYXRpb246IEFjdGl2ZVJlY29yZFJlbGF0aW9uKSB7XG4gICAgdGhpcy5fcmVsYXRpb25zLnB1c2gocmVsYXRpb24pO1xuICB9XG5cbiAgLyogRWFzeSBhY2Nlc3MgZ2V0dGVyICovXG5cbiAgZ2V0IGlkKCk6IHN0cmluZyB8IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKHRoaXMuX2NsYXNzLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgfVxuXG4gIHNldCBpZCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSh0aGlzLl9jbGFzcy5jb25maWcuaWRlbnRpZmllciwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBpc05ld1JlY29yZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaWQ7XG4gIH1cblxuICAvKiBRdWVyeWluZyBtZXRob2RzICovXG5cbiAgcHVibGljIHN0YXRpYyBmaW5kKCk6IEFjdGl2ZVF1ZXJ5ICYgYW55IHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uZmlnLnF1ZXJ5Q2xhc3ModGhpcyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbmRPbmUoY29uZGl0aW9uOiBhbnkgPSB7fSk6IFByb21pc2U8QWN0aXZlUmVjb3JkICYgYW55PiB7XG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICAvLyBjb25kaXRpb24gaXMgaWRcbiAgICBpZiAodHlwZW9mIGNvbmRpdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBpZENvbmRpdGlvbiA9IHt9O1xuICAgICAgaWRDb25kaXRpb25bdGhpcy5jb25maWcuaWRlbnRpZmllcl0gPSBjb25kaXRpb247XG4gICAgICByZXR1cm4gdGhpcy5maW5kKClcbiAgICAgICAgLndoZXJlKGlkQ29uZGl0aW9uKVxuICAgICAgICAub25lKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZmluZCgpXG4gICAgICAud2hlcmUoY29uZGl0aW9uKVxuICAgICAgLm9uZSgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmaW5kQWxsKGNvbmRpdGlvbiA9IHt9KTogUHJvbWlzZTxBY3RpdmVSZWNvcmRbXSAmIGFueVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZmluZCgpXG4gICAgICAud2hlcmUoY29uZGl0aW9uKVxuICAgICAgLmFsbCgpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IHNhdmUoKTogUHJvbWlzZTx0aGlzPjtcblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIHNhdmUob2JqZWN0cyk6IFByb21pc2U8YW55W10+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01vZGVsLnNhdmUoKSBuZWVkcyB0byBiZSBzZXQhJyk7XG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQWN0aXZlUmVjb3JkLnRzIiwiaW1wb3J0IHsgTW9kZWwsIE1vZGVsQXR0cmlidXRlIH0gZnJvbSAnLi9Nb2RlbCc7XG5pbXBvcnQgeyBBY3RpdmVSZWNvcmQgfSBmcm9tICcuL0FjdGl2ZVJlY29yZCc7XG5cbmNvbnN0IEFjdGl2ZVJlY29yZFJlbGF0aW9uVHlwZSA9IHtcbiAgSGFzT25lOiAxLFxuICBIYXNNYW55OiAyLFxuICBNYW55VG9NYW55OiAzXG59O1xuXG5pbnRlcmZhY2UgTGFiZWwge1xuICBvcmlnaW5hbDogc3RyaW5nO1xuICBzaW5ndWxhcjogc3RyaW5nO1xuICBwbHVyYWw6IHN0cmluZztcbiAgY2FwaXRhbGl6ZWRTaW5ndWxhcjogc3RyaW5nO1xuICBjYXBpdGFsaXplZFBsdXJhbDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQWN0aXZlUmVjb3JkUmVsYXRpb24ge1xuXG4gIHByaXZhdGUgX2NoaWxkOiB0eXBlb2YgQWN0aXZlUmVjb3JkICYgYW55O1xuICBwcml2YXRlIF9mb3JlaWduS2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgX2ludGVybWVkaWF0ZTogdHlwZW9mIEFjdGl2ZVJlY29yZCAmIGFueTtcbiAgcHJpdmF0ZSBfa2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgX2xhYmVsOiBMYWJlbDtcbiAgcHJpdmF0ZSBfcHJvcGVydHk6IHN0cmluZztcbiAgcHJpdmF0ZSBfdHlwZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHZhbHVlcz86IGFueSwgYXR0cmlidXRlcz86IE1vZGVsQXR0cmlidXRlW10pIHtcbiAgICB0aGlzLl9jaGlsZCA9IHZhbHVlcy5fY2hpbGQ7XG4gICAgdGhpcy5fZm9yZWlnbktleSA9IHZhbHVlcy5fZm9yZWlnbktleTtcbiAgICB0aGlzLl9pbnRlcm1lZGlhdGUgPSB2YWx1ZXMuX2ludGVybWVkaWF0ZTtcbiAgICB0aGlzLl9rZXkgPSB2YWx1ZXMuX2tleTtcbiAgICB0aGlzLl9sYWJlbCA9IHRoaXMuX2Zvcm1hdExhYmVsKHZhbHVlcy5fbGFiZWwpO1xuICAgIHRoaXMuX3Byb3BlcnR5ID0gdmFsdWVzLl9wcm9wZXJ0eTtcbiAgICB0aGlzLl90eXBlID0gdmFsdWVzLl90eXBlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybWF0TGFiZWwoc3RyaW5nOiBzdHJpbmcpOiBMYWJlbCB7XG4gICAgbGV0IHNpbmd1bGFyID0gc3RyaW5nW3N0cmluZy5sZW5ndGggLSAxXSA9PT0gJ3MnID8gc3RyaW5nLnN1YnN0cigwLCBzdHJpbmcubGVuZ3RoIC0gMSkgOiBzdHJpbmc7XG4gICAgbGV0IHBsdXJhbCA9IHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMV0gPT09ICdzJyA/IHN0cmluZyA6IHN0cmluZyArICdzJztcbiAgICByZXR1cm4ge1xuICAgICAgb3JpZ2luYWw6IHN0cmluZyxcbiAgICAgIHNpbmd1bGFyOiBzaW5ndWxhcixcbiAgICAgIHBsdXJhbDogcGx1cmFsLFxuICAgICAgY2FwaXRhbGl6ZWRTaW5ndWxhcjogc2luZ3VsYXJbMF0udG9VcHBlckNhc2UoKSArIHNpbmd1bGFyLnNsaWNlKDEpLFxuICAgICAgY2FwaXRhbGl6ZWRQbHVyYWw6IHBsdXJhbFswXS50b1VwcGVyQ2FzZSgpICsgcGx1cmFsLnNsaWNlKDEpXG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBoYXNPbmUobGFiZWw6IHN0cmluZywgY2hpbGQ6IHR5cGVvZiBBY3RpdmVSZWNvcmQsIHByb3BlcnR5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMoe1xuICAgICAgX2NoaWxkOiBjaGlsZCxcbiAgICAgIF9sYWJlbDogbGFiZWwsXG4gICAgICBfcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgX3R5cGU6IEFjdGl2ZVJlY29yZFJlbGF0aW9uVHlwZS5IYXNPbmVcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaGFzTWFueShsYWJlbDogc3RyaW5nLCBjaGlsZDogdHlwZW9mIEFjdGl2ZVJlY29yZCwgcHJvcGVydHk6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgdGhpcyh7XG4gICAgICBfY2hpbGQ6IGNoaWxkLFxuICAgICAgX2xhYmVsOiBsYWJlbCxcbiAgICAgIF9wcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICBfdHlwZTogQWN0aXZlUmVjb3JkUmVsYXRpb25UeXBlLkhhc01hbnlcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbWFueVRvTWFueShsYWJlbDogc3RyaW5nLCBjaGlsZDogdHlwZW9mIEFjdGl2ZVJlY29yZCwgaW50ZXJtZWRpYXRlOiB0eXBlb2YgQWN0aXZlUmVjb3JkLCBrZXk6IHN0cmluZywgZm9yZWlnbktleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKHtcbiAgICAgIF9jaGlsZDogY2hpbGQsXG4gICAgICBfZm9yZWlnbktleTogZm9yZWlnbktleSxcbiAgICAgIF9pbnRlcm1lZGlhdGU6IGludGVybWVkaWF0ZSxcbiAgICAgIF9rZXk6IGtleSxcbiAgICAgIF9sYWJlbDogbGFiZWwsXG4gICAgICBfdHlwZTogQWN0aXZlUmVjb3JkUmVsYXRpb25UeXBlLk1hbnlUb01hbnlcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0KG1vZGVsOiBBY3RpdmVSZWNvcmQpIHtcbiAgICBsZXQgY29uZGl0aW9uID0ge307XG4gICAgaWYgKHRoaXMuX3R5cGUgPT09IEFjdGl2ZVJlY29yZFJlbGF0aW9uVHlwZS5IYXNPbmUpIHtcbiAgICAgIHRoaXMuX2luaXRIYXNPbmUobW9kZWwsIGNvbmRpdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLl90eXBlID09PSBBY3RpdmVSZWNvcmRSZWxhdGlvblR5cGUuSGFzTWFueSkge1xuICAgICAgdGhpcy5faW5pdEhhc01hbnkobW9kZWwsIGNvbmRpdGlvbik7XG4gICAgfSBlbHNlIGlmICh0aGlzLl90eXBlID09PSBBY3RpdmVSZWNvcmRSZWxhdGlvblR5cGUuTWFueVRvTWFueSkge1xuICAgICAgdGhpcy5faW5pdE1hbnlUb01hbnkobW9kZWwsIGNvbmRpdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEhhc09uZShtb2RlbDogQWN0aXZlUmVjb3JkLCBjb25kaXRpb24pIHtcbiAgICAvLyBhZGQgcHJvcGVydHkgdG8gY2xhc3NcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBuZXcgTW9kZWxBdHRyaWJ1dGUodGhpcy5fcHJvcGVydHksICdzdHJpbmcnKTtcbiAgICBtb2RlbC5jbGFzcy5hZGRBdHRyaWJ1dGVzKFthdHRyaWJ1dGVdKTtcbiAgICBhdHRyaWJ1dGUuaW5pdChtb2RlbCk7XG4gICAgbW9kZWwuc2V0QXR0cmlidXRlKHRoaXMuX3Byb3BlcnR5LCBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fcHJvcGVydHkpIHx8IG51bGwpO1xuXG4gICAgaWYgKCFtb2RlbC5oYXNPd25Qcm9wZXJ0eSh0aGlzLl9sYWJlbC5vcmlnaW5hbCkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwgdGhpcy5fbGFiZWwub3JpZ2luYWwsIHtcbiAgICAgICAgZ2V0OiAoKSA9PiB0aGlzLl9jaGlsZC5maW5kT25lKG1vZGVsLmdldEF0dHJpYnV0ZSh0aGlzLl9wcm9wZXJ0eSkpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFtb2RlbC5oYXNPd25Qcm9wZXJ0eSh0aGlzLl9wcm9wZXJ0eSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwgdGhpcy5fcHJvcGVydHksIHtcbiAgICAgICAgZ2V0OiAoKSA9PiBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fcHJvcGVydHkpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIGBzZXRDaGlsZCgpYCBtZXRob2RcbiAgICBtb2RlbFsnc2V0JyArIHRoaXMuX2xhYmVsLmNhcGl0YWxpemVkU2luZ3VsYXJdID0gYXN5bmMgKG9iamVjdDogYW55KSA9PiB7XG4gICAgICBpZiAoIShvYmplY3QgaW5zdGFuY2VvZiB0aGlzLl9jaGlsZCkpIHtcbiAgICAgICAgb2JqZWN0ID0gbmV3IHRoaXMuX2NoaWxkKG9iamVjdCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBvYmplY3Quc2F2ZSgpO1xuICAgICAgbW9kZWwuc2V0QXR0cmlidXRlKHRoaXMuX3Byb3BlcnR5LCBvYmplY3QuZ2V0QXR0cmlidXRlKHRoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyKSk7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRIYXNNYW55KG1vZGVsOiBBY3RpdmVSZWNvcmQsIGNvbmRpdGlvbikge1xuICAgIC8vIGFkZCBmb3JlaWduIHByb3BlcnR5IHRvIGNoaWxkIGNsYXNzXG4gICAgY29uc3QgYXR0cmlidXRlID0gbmV3IE1vZGVsQXR0cmlidXRlKHRoaXMuX3Byb3BlcnR5LCAnZm9yZWlnbktleScpO1xuICAgIHRoaXMuX2NoaWxkLmFkZEF0dHJpYnV0ZXMoW2F0dHJpYnV0ZV0pO1xuICAgIGF0dHJpYnV0ZS5pbml0KG1vZGVsKTtcblxuICAgIC8vIHNldCBnZXR0ZXIgYGNoaWxkcmVuYCBwcm9wZXJ0eVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwgdGhpcy5fbGFiZWwucGx1cmFsLCB7XG4gICAgICBnZXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5fY2hpbGQuaW5pdCgpO1xuICAgICAgICBjb25kaXRpb25bdGhpcy5fcHJvcGVydHldID0gbW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBtb2RlbC5jbGFzcy5jb25maWcucXVlcnlDbGFzcyh0aGlzLl9jaGlsZCkud2hlcmUoY29uZGl0aW9uKS5hbGwoKTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBhZGQgYGdldENoaWxkKClgIG1ldGhvZFxuICAgIG1vZGVsWydnZXQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRQbHVyYWxdID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uZGl0aW9uW3RoaXMuX3Byb3BlcnR5XSA9IG1vZGVsLmdldEF0dHJpYnV0ZSh0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcik7XG4gICAgICByZXR1cm4gYXdhaXQgbmV3IG1vZGVsLmNsYXNzLmNvbmZpZy5xdWVyeUNsYXNzKHRoaXMuX2NoaWxkKS53aGVyZShjb25kaXRpb24pO1xuICAgIH07XG5cbiAgICAvLyBhZGQgYGFkZENoaWxkKClgIG1ldGhvZFxuICAgIG1vZGVsWydhZGQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRTaW5ndWxhcl0gPSBhc3luYyAob2JqZWN0OiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG1vZGVsWydhZGQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRQbHVyYWxdKFtvYmplY3RdKTtcbiAgICAgIHJldHVybiByZXNbMF07XG4gICAgfVxuXG4gICAgLy8gYWRkIGBhZGRDaGlsZHJlbigpYCBtZXRob2RcbiAgICBtb2RlbFsnYWRkJyArIHRoaXMuX2xhYmVsLmNhcGl0YWxpemVkUGx1cmFsXSA9IGFzeW5jIChvYmplY3RzOiBhbnlbXSkgPT4ge1xuICAgICAgaWYgKCFvYmplY3RzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBwYXJlbnQgbW9kZWwgaWQgaW4gY2hpbGRyZW4gbW9kZWxzXG4gICAgICBvYmplY3RzID0gb2JqZWN0cy5tYXAoKG9iamVjdCkgPT4ge1xuICAgICAgICBvYmplY3RbdGhpcy5fcHJvcGVydHldID0gbW9kZWwuZ2V0QXR0cmlidXRlKHRoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzYXZlIGFsbCBvYmplY3RzXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fY2hpbGQuc2F2ZShvYmplY3RzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0TWFueVRvTWFueShtb2RlbDogQWN0aXZlUmVjb3JkLCBjb25kaXRpb24pIHtcbiAgICAvLyBhZGQgZm9yZWlnbiBwcm9wZXJ0eSB0byBpbnRlcm1lZGlhdGUgY2xhc3NcbiAgICBjb25zdCBhdHRyaWJ1dGUgPSBuZXcgTW9kZWxBdHRyaWJ1dGUodGhpcy5fZm9yZWlnbktleSwgJ2ZvcmVpZ25LZXknKTtcbiAgICB0aGlzLl9pbnRlcm1lZGlhdGUuYWRkQXR0cmlidXRlcyhbYXR0cmlidXRlXSk7XG4gICAgYXR0cmlidXRlLmluaXQobW9kZWwpO1xuXG4gICAgLy8gc2V0IGdldHRlciBgY2hpbGRyZW5gIHByb3BlcnR5XG4gICAgaWYgKCFtb2RlbC5oYXNPd25Qcm9wZXJ0eSh0aGlzLl9sYWJlbC5wbHVyYWwpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWwsIHRoaXMuX2xhYmVsLnBsdXJhbCwge1xuICAgICAgICBnZXQ6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9jaGlsZC5pbml0KCk7XG4gICAgICAgICAgY29uZGl0aW9uW3RoaXMuX2tleV0gPSBtb2RlbC5nZXRBdHRyaWJ1dGUobW9kZWwuY2xhc3MuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IHRoaXMuX2ludGVybWVkaWF0ZS5maW5kKClcbiAgICAgICAgICAgIC53aGVyZShjb25kaXRpb24pXG4gICAgICAgICAgICAuZmllbGRzKFt0aGlzLl9mb3JlaWduS2V5XSlcbiAgICAgICAgICAgIC5hbGwoZmFsc2UpO1xuICAgICAgICAgIGlmICghcmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBpZHMgPSByZXMubWFwKChkb2MpID0+IGRvY1t0aGlzLl9mb3JlaWduS2V5XSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgIGxldCBxdWVyeUNvbmRpdGlvbiA9IHt9O1xuICAgICAgICAgIHF1ZXJ5Q29uZGl0aW9uW3RoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyXSA9IHsgJGluOiBpZHMgfTtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbmV3IG1vZGVsLmNsYXNzLmNvbmZpZy5xdWVyeUNsYXNzKHRoaXMuX2NoaWxkKVxuICAgICAgICAgICAgLndoZXJlKHF1ZXJ5Q29uZGl0aW9uKVxuICAgICAgICAgICAgLmFsbCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYGdldENoaWxkKClgIG1ldGhvZFxuICAgIG1vZGVsWydnZXQnICsgdGhpcy5fbGFiZWwuY2FwaXRhbGl6ZWRQbHVyYWxdID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uZGl0aW9uW3RoaXMuX2tleV0gPSBtb2RlbC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgdGhpcy5faW50ZXJtZWRpYXRlLmZpbmQoKVxuICAgICAgICAud2hlcmUoY29uZGl0aW9uKVxuICAgICAgICAuZmllbGRzKFt0aGlzLl9mb3JlaWduS2V5XSlcbiAgICAgICAgLmFsbChmYWxzZSk7XG4gICAgICBpZiAoIXJlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICBsZXQgaWRzID0gcmVzLm1hcCgoZG9jKSA9PiBkb2NbdGhpcy5fZm9yZWlnbktleV0pLmZpbHRlcihCb29sZWFuKTtcbiAgICAgIGxldCBxdWVyeUNvbmRpdGlvbiA9IHt9O1xuICAgICAgcXVlcnlDb25kaXRpb25bdGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXJdID0geyAkaW46IGlkcyB9O1xuICAgICAgcmV0dXJuIGF3YWl0IG5ldyBtb2RlbC5jbGFzcy5jb25maWcucXVlcnlDbGFzcyh0aGlzLl9jaGlsZClcbiAgICAgICAgLndoZXJlKHF1ZXJ5Q29uZGl0aW9uKTtcbiAgICB9O1xuXG4gICAgLy8gYWRkIGBhZGRDaGlsZCgpYCBtZXRob2RcbiAgICBtb2RlbFsnYWRkJyArIHRoaXMuX2xhYmVsLmNhcGl0YWxpemVkU2luZ3VsYXJdID0gYXN5bmMgKG9iamVjdDogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBtb2RlbFsnYWRkJyArIHRoaXMuX2xhYmVsLmNhcGl0YWxpemVkUGx1cmFsXShbb2JqZWN0XSk7XG4gICAgICByZXR1cm4gcmVzWzBdO1xuICAgIH1cblxuICAgIC8vIGFkZCBgYWRkQ2hpbGRyZW4oKWAgbWV0aG9kXG4gICAgbW9kZWxbJ2FkZCcgKyB0aGlzLl9sYWJlbC5jYXBpdGFsaXplZFBsdXJhbF0gPSBhc3luYyAob2JqZWN0czogYW55W10pID0+IHtcbiAgICAgIGlmICghb2JqZWN0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBzYXZlIGFsbCBvYmplY3RzXG4gICAgICBjb25zdCBzYXZlZE9iamVjdHMgPSBhd2FpdCB0aGlzLl9jaGlsZC5zYXZlKG9iamVjdHMpO1xuXG4gICAgICBsZXQgY29uZGl0aW9uID0ge307XG4gICAgICBjb25kaXRpb25bdGhpcy5fZm9yZWlnbktleV0gPSB7ICRpbjogc2F2ZWRPYmplY3RzLm1hcCgob2JqZWN0KSA9PiBvYmplY3QuZ2V0QXR0cmlidXRlKHRoaXMuX2NoaWxkLmNvbmZpZy5pZGVudGlmaWVyKSkgfTtcbiAgICAgIGNvbnN0IGV4aXN0aW5nUmVsYXRpb25zID0gYXdhaXQgdGhpcy5faW50ZXJtZWRpYXRlLmZpbmRBbGwoY29uZGl0aW9uKTtcblxuICAgICAgZm9yIChsZXQgb2JqZWN0IG9mIHNhdmVkT2JqZWN0cykge1xuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoZXhpc3RpbmdSZWxhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgZXhpc3RpbmdSZWxhdGlvbnMuZm9yRWFjaCgoZXhpc3RpbmcpID0+IHtcbiAgICAgICAgICAgIGZvdW5kID0gZm91bmQgfHwgb2JqZWN0LmdldEF0dHJpYnV0ZSh0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcikgPT09IGV4aXN0aW5nLmdldEF0dHJpYnV0ZSh0aGlzLl9mb3JlaWduS2V5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICAgIGRhdGFbdGhpcy5fa2V5XSA9IG1vZGVsLmdldEF0dHJpYnV0ZSh0aGlzLl9jaGlsZC5jb25maWcuaWRlbnRpZmllcik7XG4gICAgICAgICAgZGF0YVt0aGlzLl9mb3JlaWduS2V5XSA9IG9iamVjdC5nZXRBdHRyaWJ1dGUodGhpcy5fY2hpbGQuY29uZmlnLmlkZW50aWZpZXIpO1xuICAgICAgICAgIGxldCByZWxhdGlvbiA9IG5ldyB0aGlzLl9pbnRlcm1lZGlhdGUoZGF0YSk7XG4gICAgICAgICAgYXdhaXQgcmVsYXRpb24uc2F2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2F2ZWRPYmplY3RzO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FjdGl2ZVJlY29yZFJlbGF0aW9uLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==