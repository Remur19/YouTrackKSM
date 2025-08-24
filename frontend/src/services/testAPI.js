"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
// testApi.ts
var api_1 = require("./api");
function testApi() {
    return __awaiter(this, void 0, void 0, function () {
        var createdUser, user, category, categories, createdCategory, task, tasks, createdTask, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 13, , 14]);
                    console.log('📌 Starte API-Tests');
                    // --- USER ---
                    console.log('🧪 Erstelle Benutzer...');
                    return [4 /*yield*/, (0, api_1.createUser)({
                            name: 'Max Mustermann',
                            email: 'max@example.com',
                            password: 'testpw'
                        })];
                case 1:
                    createdUser = _a.sent();
                    console.log('✅ Benutzer erstellt mit ID:', createdUser.id);
                    console.log('📥 Lade Benutzer...');
                    return [4 /*yield*/, (0, api_1.getUser)(createdUser.id)];
                case 2:
                    user = _a.sent();
                    console.log('✅ Benutzer geladen:', user);
                    console.log('✏️ Aktualisiere Benutzer...');
                    return [4 /*yield*/, (0, api_1.updateUser)(__assign(__assign({}, user), { name: 'Max Geändert' }))];
                case 3:
                    _a.sent();
                    console.log('✅ Benutzer aktualisiert');
                    // --- CATEGORY ---
                    console.log('📁 Erstelle Kategorie...');
                    category = {
                        id: 0, // wird ignoriert oder vom Server ersetzt
                        user_id: createdUser.id,
                        name: 'Allgemein'
                    };
                    return [4 /*yield*/, (0, api_1.createCategory)(category)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, api_1.getAllCategories)(createdUser.id)];
                case 5:
                    categories = _a.sent();
                    createdCategory = categories[categories.length - 1];
                    console.log('✅ Kategorie erstellt mit ID:', createdCategory.id);
                    console.log('✏️ Aktualisiere Kategorie...');
                    return [4 /*yield*/, (0, api_1.editCategory)(__assign(__assign({}, createdCategory), { name: 'Geändert' }))];
                case 6:
                    _a.sent();
                    console.log('✅ Kategorie aktualisiert');
                    // --- TASK ---
                    console.log('📝 Erstelle Aufgabe...');
                    task = {
                        id: 0,
                        category_id: createdCategory.id,
                        title: 'Testaufgabe',
                        description: 'Beschreibung',
                        done: false
                    };
                    return [4 /*yield*/, (0, api_1.createTask)(task)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (0, api_1.getAllTasks)(createdUser.id)];
                case 8:
                    tasks = _a.sent();
                    createdTask = tasks[tasks.length - 1];
                    console.log('✅ Aufgabe erstellt mit ID:', createdTask.id);
                    console.log('✏️ Aktualisiere Aufgabe...');
                    return [4 /*yield*/, (0, api_1.editTask)(__assign(__assign({}, createdTask), { done: true }))];
                case 9:
                    _a.sent();
                    console.log('✅ Aufgabe aktualisiert');
                    // --- CLEANUP ---
                    console.log('🗑️ Lösche Aufgabe...');
                    return [4 /*yield*/, (0, api_1.deleteTask)(createdTask.id.toString())];
                case 10:
                    _a.sent();
                    console.log('✅ Aufgabe gelöscht');
                    console.log('🗑️ Lösche Kategorie...');
                    return [4 /*yield*/, (0, api_1.deleteCategory)(createdCategory.id.toString())];
                case 11:
                    _a.sent();
                    console.log('✅ Kategorie gelöscht');
                    console.log('🗑️ Lösche Benutzer...');
                    return [4 /*yield*/, (0, api_1.deleteUser)(createdUser.id)];
                case 12:
                    _a.sent();
                    console.log('✅ Benutzer gelöscht');
                    console.log('🎉 Alle Tests erfolgreich!');
                    return [3 /*break*/, 14];
                case 13:
                    error_1 = _a.sent();
                    console.error('❌ Fehler während Testdurchlauf:', error_1);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
testApi();
function testDeleteUser() {
    return __awaiter(this, void 0, void 0, function () {
        var createdUser, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(" Starte API-Tests");
                    // --- USER ---
                    console.log("Erstelle Benutzer....");
                    return [4 /*yield*/, (0, api_1.createUser)({
                            name: "Max Mustermann",
                            email: "man@example.com",
                            password: "123456789",
                        })];
                case 1:
                    createdUser = _a.sent();
                    console.log("Delete User....");
                    (0, api_1.deleteUser)(createdUser.id);
                    console.log("Lade Benutze...");
                    return [4 /*yield*/, (0, api_1.getUser)(createdUser.id)];
                case 2:
                    user = _a.sent();
                    if (user == null) {
                        console.log("Benutzer wurde gut entfernt");
                    }
                    else {
                        console.log("Benutzer wurde nicht entfernt");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Fehler während Testdurchlauf:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
testDeleteUser();
