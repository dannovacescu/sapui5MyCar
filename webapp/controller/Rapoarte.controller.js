sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, History, MessageToast, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("MyCars.MyCars.controller.Rapoarte", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		_mFilters: {
			rca: [new sap.ui.model.Filter("DataRca", "LT", 100)],
			casco: [new sap.ui.model.Filter("DataCasco", "BT", 100, 1000)],
			rovinieta: [new sap.ui.model.Filter("DataRovinieta", "GT", 1000)]
		},

		onInit: function () {
			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

			var oModel2 = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var that = this;

			oModel2.read("/zmasinaSet",
				null,
				null,
				false,
				function (oData, oResponse) {
					var form1 = that.getView().byId("table");
					var oJSONModel = new sap.ui.model.json.JSONModel();
					oJSONModel.setProperty("/cars", oData.results);
					oJSONModel.setProperty("/count", oData.results.length);
					form1.setModel(oJSONModel, "masini");

				}

			);
			// Register to the add route matched
			// this.getRouter().getRoute("add").attachPatternMatched(this._onRouteMatched, this);
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onPress: function (oEvent) {
			this.getRouter().navTo("detalii");
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
		onSearch: function (oEvent) {
			// build filter array
			var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				// retrieve list control
				oList = this.getView().byId("table"),
				// get binding for aggregation 'items'
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("Numar", FilterOperator.Contains, sQuery));
			}
			// apply filter. an empty filter array simply removes the filter
			// which will make all entries visible again
			oBinding.filter(aFilter);
		},
		onQuickFilter: function (oEvent) {

		}

	});

});