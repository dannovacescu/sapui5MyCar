sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("MyCars.MyCars.controller.Main", {
		onInit: function () {

		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onAdd: function (oEvent) {
			this.getRouter().navTo("add");
		},
		onAddID: function (oEvent) {
			this.getRouter().navTo("addID");
		},
		onAddCard: function (oEvent) {
			this.getRouter().navTo("addCard");
		},
		onAddPass: function (oEvent) {
			this.getRouter().navTo("addPass");
		},
		onAddEvent: function (oEvent) {
			this.getRouter().navTo("addEvent");
		},
		onList: function (oEvent) {
			this.getRouter().navTo("list");
		},
		onRCA: function (oEvent) {
			this.getRouter().navTo("myrca");
		},
		onCASCO: function (oEvent) {
			this.getRouter().navTo("casco");
		},
		onRovinieta: function (oEvent) {
			this.getRouter().navTo("myrovinieta");
		},
		onRaport: function (oEvent) {
			this.getRouter().navTo("rapoarte");
		},
		onID: function (oEvent) {
			this.getRouter().navTo("ID");
		},
		onPass: function (oEvent) {
			this.getRouter().navTo("pass");
		},
		onCard: function (oEvent) {
			this.getRouter().navTo("card");
		},
		onEvent: function (oEvent) {
			this.getRouter().navTo("event");
		},
		onTest: function (oEvent) {
			this.getRouter().navTo("test");
		}

	});
});