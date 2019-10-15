(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-games-games-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/games/games.page.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/games/games.page.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"topMenu\"></div>\r\n<ion-content>\r\n\t<ion-item>\r\n\t\t<ion-label>\r\n\t\t\t<ion-icon class=\"icon\" name=\"book\"></ion-icon> Lese\r\n\t\t</ion-label>\r\n\t</ion-item>\r\n\r\n\t<div class=\"gameCards\" *ngFor=\"let item of games.lese\">\r\n\t\t<app-game-card [item] = \"item\"></app-game-card>\r\n\t</div>\r\n\t\r\n\t<ion-item>\r\n\t\t<ion-label>\r\n\t\t\t<ion-icon class=\"icon\" slot=\"end\" name=\"create\"></ion-icon> Skrive\r\n\t\t</ion-label>\r\n\t</ion-item>\r\n\r\n\t<div class=\"gameCards\" *ngFor=\"let item of games.skrive\">\r\n\t\t<app-game-card [item] = \"item\"></app-game-card>\r\n\t</div>\r\n\r\n\t<ion-item>\r\n\t\t<ion-label>\r\n\t\t\t<ion-icon class=\"icon\" slot=\"end\" name=\"volume-high\"></ion-icon> Lytte\r\n\t\t</ion-label>\r\n\t</ion-item>\r\n\r\n\t<div class=\"gameCards\" *ngFor=\"let item of games.lytte\">\r\n\t\t<app-game-card [item] = \"item\"></app-game-card>\r\n\t</div>\r\n\r\n\t<ion-item>\r\n\t\t<ion-label>\r\n\t\t\t<ion-icon class=\"icon\" slot=\"end\" name=\"pulse\"></ion-icon> Hjernetrim\r\n\t\t</ion-label>\r\n\t</ion-item>\r\n\r\n\t<div class=\"gameCards\" *ngFor=\"let item of games.hjernetrim\">\r\n\t\t<app-game-card [item] = \"item\"></app-game-card>\r\n\t</div>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/games/games.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/games/games.module.ts ***!
  \*********************************************/
/*! exports provided: GamesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamesPageModule", function() { return GamesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _games_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./games.page */ "./src/app/pages/games/games.page.ts");
/* harmony import */ var _components_game_card_game_card_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/game-card/game-card.module */ "./src/app/components/game-card/game-card.module.ts");








var GamesPageModule = /** @class */ (function () {
    function GamesPageModule() {
    }
    GamesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _components_game_card_game_card_module__WEBPACK_IMPORTED_MODULE_7__["GameCardModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _games_page__WEBPACK_IMPORTED_MODULE_6__["GamesPage"] }])
            ],
            declarations: [_games_page__WEBPACK_IMPORTED_MODULE_6__["GamesPage"]]
        })
    ], GamesPageModule);
    return GamesPageModule;
}());



/***/ }),

/***/ "./src/app/pages/games/games.page.scss":
/*!*********************************************!*\
  !*** ./src/app/pages/games/games.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-item {\n  margin-bottom: 15px;\n  font-size: 22px;\n}\n\n.icon {\n  margin-bottom: -3px;\n}\n\n.gameCards {\n  display: inline-block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZ2FtZXMvQzpcXFNrb2xlXFxtbTUwM1xccmVwZXJpb1xccmVwZXJpby9zcmNcXGFwcFxccGFnZXNcXGdhbWVzXFxnYW1lcy5wYWdlLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL2dhbWVzL2dhbWVzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNDLG1CQUFBO0VBQ0EsZUFBQTtBQ0NEOztBREVBO0VBQ0MsbUJBQUE7QUNDRDs7QURFQTtFQUNDLHFCQUFBO0FDQ0QiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9nYW1lcy9nYW1lcy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taXRlbSB7XHJcblx0bWFyZ2luLWJvdHRvbTogMTVweDtcclxuXHRmb250LXNpemU6IDIycHg7XHJcbn1cclxuXHJcbi5pY29uIHtcclxuXHRtYXJnaW4tYm90dG9tOiAtM3B4O1xyXG59XHJcblxyXG4uZ2FtZUNhcmRzIHtcclxuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn0iLCJpb24taXRlbSB7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gIGZvbnQtc2l6ZTogMjJweDtcbn1cblxuLmljb24ge1xuICBtYXJnaW4tYm90dG9tOiAtM3B4O1xufVxuXG4uZ2FtZUNhcmRzIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/games/games.page.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/games/games.page.ts ***!
  \*******************************************/
/*! exports provided: GamesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GamesPage", function() { return GamesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/globals */ "./src/app/services/globals.ts");



var GamesPage = /** @class */ (function () {
    function GamesPage() {
        this.games = {
            lese: _services_globals__WEBPACK_IMPORTED_MODULE_2__["GAMES_LIST"].filter(function (e) { return e.category == 1; }),
            skrive: _services_globals__WEBPACK_IMPORTED_MODULE_2__["GAMES_LIST"].filter(function (e) { return e.category == 2; }),
            lytte: _services_globals__WEBPACK_IMPORTED_MODULE_2__["GAMES_LIST"].filter(function (e) { return e.category == 3; }),
            hjernetrim: _services_globals__WEBPACK_IMPORTED_MODULE_2__["GAMES_LIST"].filter(function (e) { return e.category == 4; })
        };
    }
    GamesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-games',
            template: __webpack_require__(/*! raw-loader!./games.page.html */ "./node_modules/raw-loader/index.js!./src/app/pages/games/games.page.html"),
            styles: [__webpack_require__(/*! ./games.page.scss */ "./src/app/pages/games/games.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], GamesPage);
    return GamesPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-games-games-module-es5.js.map