"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var DisplayService = (function () {
    function DisplayService(http) {
        this.http = http;
    }
    DisplayService.prototype.getStock = function () {
        var stockUrl = 'http://127.0.0.1:5000/api/lagersaldon';
        return this.http.get(stockUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    DisplayService.prototype.extractData = function (res) {
        var body = res.json();
        return (body.objects || {});
    };
    DisplayService.prototype.handleError = function (error) {
        var errorMsg = "oooops";
        console.log(errorMsg);
        return Observable_1.Observable.throw(errorMsg);
    };
    return DisplayService;
}());
DisplayService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DisplayService);
exports.DisplayService = DisplayService;
//# sourceMappingURL=display.service.js.map