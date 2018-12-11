"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_toastify_1 = require("react-toastify");
var react_1 = require("react");
var ViewErrorsComponent = /** @class */ (function (_super) {
    __extends(ViewErrorsComponent, _super);
    function ViewErrorsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.notify = function (errorMessage) { return react_toastify_1.toast.error(errorMessage, {
            type: react_toastify_1.toast.TYPE.ERROR,
            autoClose: 8000
        }); };
        _this.state = {
            error: props.error
        };
        return _this;
    }
    ViewErrorsComponent.prototype.render = function () {
        return (<react_1.default.Fragment>
                {this.notify(this.state.error.message)}
                <react_toastify_1.ToastContainer />
            </react_1.default.Fragment>);
    };
    return ViewErrorsComponent;
}(react_1.default.Component));
exports.default = ViewErrorsComponent;
