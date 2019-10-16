(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-game-info-game-info-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/game-info/game-info.page.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/game-info/game-info.page.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"topMenu\"></div>\r\n<ion-header>\r\n  <ion-toolbar>\r\n    <ion-buttons slot=\"start\">\r\n      <ion-back-button [text]=\"'Tilbake'\"></ion-back-button>\r\n    </ion-buttons>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content fullscreen>\r\n\t<div class=\"screenWidth\">\r\n\t\t<img class=\"titleImg\" [src]=\"item.thumbnail\"/>\r\n\r\n        <ion-item color=\"dark\" style=\"margin-top: -5px;\">\r\n\t\t\t<ion-icon color=\"medium\" slot=\"end\" [name]=\"item.icon\"></ion-icon>\r\n\t\t\t<ion-label color=\"primary\">{{ item.title }}</ion-label>\r\n        </ion-item>\r\n\r\n\t\t<ion-text>\r\n\t\t\t<p>{{ item.description }}</p>\r\n\t\t</ion-text>\r\n\t</div>\r\n\r\n\t<div class=\"footer\">\r\n\t\t<ion-toolbar (click)=\"go()\" routerDirection=\"forward\" color=\"primary\" position=\"bottom\">\r\n\t\t\t<ion-button size=\"large\" expand=\"full\"><ion-text color=\"light\">Spill</ion-text></ion-button>\r\n\t\t</ion-toolbar>\r\n\t</div>\r\n</ion-content>\r\n"

/***/ }),

/***/ "./src/app/pages/game-info/game-info.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/game-info/game-info.module.ts ***!
  \*****************************************************/
/*! exports provided: GameInfoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameInfoPageModule", function() { return GameInfoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _game_info_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./game-info.page */ "./src/app/pages/game-info/game-info.page.ts");







const routes = [
    {
        path: '',
        component: _game_info_page__WEBPACK_IMPORTED_MODULE_6__["GameInfoPage"]
    }
];
let GameInfoPageModule = class GameInfoPageModule {
};
GameInfoPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
        ],
        declarations: [_game_info_page__WEBPACK_IMPORTED_MODULE_6__["GameInfoPage"]]
    })
], GameInfoPageModule);



/***/ }),

/***/ "./src/app/pages/game-info/game-info.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/pages/game-info/game-info.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".screenWidth {\n  width: 100%;\n  max-width: 600px;\n  margin: auto;\n  display: block;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.titleImg {\n  width: 100%;\n  margin: 0px;\n}\n\n.footer {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  text-align: center;\n}\n\nion-item {\n  font-size: 25px;\n}\n\nion-toolbar > .button {\n  font-size: 35px;\n  height: 50px;\n}\n\nion-text > p {\n  margin: 10px;\n  font-size: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZ2FtZS1pbmZvL0M6XFxTa29sZVxcbW01MDNcXHJlcGVyaW9cXHJlcGVyaW8vc3JjXFxhcHBcXHBhZ2VzXFxnYW1lLWluZm9cXGdhbWUtaW5mby5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2dhbWUtaW5mby9nYW1lLWluZm8ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0MsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FDQ0Q7O0FERUE7RUFDQyxXQUFBO0VBQ0EsV0FBQTtBQ0NEOztBREVBO0VBQ0UsZUFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDQyxlQUFBO0FDQ0Q7O0FERUE7RUFDQyxlQUFBO0VBQ0EsWUFBQTtBQ0NEOztBREVBO0VBQ0MsWUFBQTtFQUNBLGVBQUE7QUNDRCIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2dhbWUtaW5mby9nYW1lLWluZm8ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNjcmVlbldpZHRoIHtcclxuXHR3aWR0aDogMTAwJTtcclxuXHRtYXgtd2lkdGg6IDYwMHB4O1xyXG5cdG1hcmdpbjogYXV0bztcclxuXHRkaXNwbGF5OiBibG9jaztcclxuXHRhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4udGl0bGVJbWcge1xyXG5cdHdpZHRoOiAxMDAlO1xyXG5cdG1hcmdpbjogMHB4O1xyXG59XHJcblxyXG4uZm9vdGVyIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgbGVmdDogMDtcclxuICBib3R0b206IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcblx0Zm9udC1zaXplOiAyNXB4O1xyXG59XHJcblxyXG5pb24tdG9vbGJhciA+IC5idXR0b24ge1xyXG5cdGZvbnQtc2l6ZTogMzVweDtcclxuXHRoZWlnaHQ6IDUwcHg7XHJcbn1cclxuXHJcbmlvbi10ZXh0ID4gcCB7XHJcblx0bWFyZ2luOiAxMHB4O1xyXG5cdGZvbnQtc2l6ZTogMjBweDtcclxufSIsIi5zY3JlZW5XaWR0aCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDYwMHB4O1xuICBtYXJnaW46IGF1dG87XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4udGl0bGVJbWcge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwcHg7XG59XG5cbi5mb290ZXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuaW9uLWl0ZW0ge1xuICBmb250LXNpemU6IDI1cHg7XG59XG5cbmlvbi10b29sYmFyID4gLmJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogMzVweDtcbiAgaGVpZ2h0OiA1MHB4O1xufVxuXG5pb24tdGV4dCA+IHAge1xuICBtYXJnaW46IDEwcHg7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/game-info/game-info.page.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/game-info/game-info.page.ts ***!
  \***************************************************/
/*! exports provided: GameInfoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameInfoPage", function() { return GameInfoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/globals */ "./src/app/services/globals.ts");




let GameInfoPage = class GameInfoPage {
    constructor(route, router) {
        this.route = route;
        this.router = router;
        this.route.params.subscribe(params => {
            let game = Object(_services_globals__WEBPACK_IMPORTED_MODULE_3__["getGame"])(parseInt(params['id']));
            if (!game.length) {
                this.router.navigate(['/']);
                throw new Error('Game not found');
            }
            else {
                this.item = game[0];
            }
        });
    }
    ngOnInit() {
        console.log(this.item);
    }
    go() {
        this.router.navigate(['match']);
    }
};
GameInfoPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
GameInfoPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-game-info',
        template: __webpack_require__(/*! raw-loader!./game-info.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/game-info/game-info.page.html"),
        styles: [__webpack_require__(/*! ./game-info.page.scss */ "./src/app/pages/game-info/game-info.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
], GameInfoPage);



/***/ })

}]);
//# sourceMappingURL=pages-game-info-game-info-module-es2015.js.map