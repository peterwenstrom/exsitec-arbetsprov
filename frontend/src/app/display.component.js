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
var display_service_1 = require("./display.service");
var DisplayComponent = (function () {
    function DisplayComponent(displayService) {
        this.displayService = displayService;
    }
    DisplayComponent.prototype.getStock = function () {
        var _this = this;
        this.displayService.getStock().subscribe(function (stocks) { return _this.stocks = stocks; }, function (error) { return _this.errorMsg = error; });
    };
    DisplayComponent.prototype.ngOnInit = function () {
        this.getStock();
    };
    return DisplayComponent;
}());
DisplayComponent = __decorate([
    core_1.Component({
        selector: 'display-page',
        templateUrl: './display.component.html',
        providers: [display_service_1.DisplayService]
    }),
    __metadata("design:paramtypes", [display_service_1.DisplayService])
], DisplayComponent);
exports.DisplayComponent = DisplayComponent;
//# sourceMappingURL=display.component.js.map