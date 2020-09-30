sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (Controller, History, MessageToast) {
	"use strict";

	return Controller.extend("MyCars.MyCars.controller.MyRCA", {

		onInit: function () {
			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

			var oModel1 = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var that = this;

			oModel1.read("/zmasinaSet",
				null,
				null,
				false,
				function (oData, oResponse) {
					var form1 = that.getView().byId("masterRCA");
					var form2 = that.getView().byId("FormDisplayRCA");

					// create JSON model
					var oJSONModel = new sap.ui.model.json.JSONModel();
					oJSONModel.setProperty("/cars", oData.results);
					var oODataJSONModel1 = new sap.ui.model.json.JSONModel();
					// this.getView().byId("master").setModel(oODataJSONModel);
					form1.setModel(oJSONModel, "garaj");
					form2.setModel(oODataJSONModel1, "localModel");

					// set the odata JSON as data of JSON model
					oODataJSONModel1.setData(oData.results[0]);
				}

			);
		},
		handleMasterCasco: function (oEvent) {

			var id = oEvent.getParameters().id;
			var nr = id.slice(-1);

			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

			var oModel1 = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var that = this;

			oModel1.read("/zmasinaSet",
				null,
				null,
				false,
				function (oData, oResponse) {

					var form = that.getView().byId("FormDisplayRCA");

					// create JSON model
					var oJModel = new sap.ui.model.json.JSONModel();
					form.setModel(oJModel, "localModel");

					oJModel.setData(oData.results[nr]);
				}
			);

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

		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handleCarPress: function (oEvent) {
			this.getRouter().navTo("rca");
		}

	});

});