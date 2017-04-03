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
var shipment_1 = require("./shipment");
var edit_service_1 = require("./edit.service");
var EditComponent = (function () {
    function EditComponent(editService) {
        this.editService = editService;
        this.model = new shipment_1.Shipment('', '', 0);
        this.submitted = false;
        this.responseMessage = '';
    }
    EditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.editService.postShipment(this.model).subscribe(function (response) { _this.submitted = true; _this.responseMessage = 'Leveransen är nu bokförd!'; }, function (error) {
            _this.submitted = true;
            _this.responseMessage =
                'Det var något konstigt med den där leveransen, var god försök igen.';
        });
    };
    EditComponent.prototype.newShipment = function () {
        this.submitted = false;
        this.model = { vara: '', stad: '', antal: 0 };
    };
    return EditComponent;
}());
EditComponent = __decorate([
    core_1.Component({
        selector: 'edit-page',
        templateUrl: './edit.component.html',
        providers: [edit_service_1.EditService]
    }),
    __metadata("design:paramtypes", [edit_service_1.EditService])
], EditComponent);
exports.EditComponent = EditComponent;
//# sourceMappingURL=edit.component.js.map