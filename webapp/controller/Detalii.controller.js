sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
	"use strict";

	return Controller.extend("MyCars.MyCars.controller.Detalii", {
		onInit: function () {
			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

			var oModel2 = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var that = this;

			oModel2.read("/zpretSet",
				null,
				null,
				false,
				function (oData, oResponse) {
					var oJSONModel = new sap.ui.model.json.JSONModel();
					oJSONModel.setProperty("/Preturi", oData.results);
					that.getView().setModel(oJSONModel, "Masina");
				}

			);
		},

		formatter: function (value) {
			return parseFloat(value);
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteMain", true);
			}

		}

	});
});