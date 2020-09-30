sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (Controller, History, MessageToast) {
	"use strict";
	var i = 0;

	return Controller.extend("MyCars.MyCars.controller.Event", {

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		onInit: function () {

			// Register to the add route matched
			// this.getRouter().getRoute("add").attachPatternMatched(this._onRouteMatched, this);
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
		onSave: function () {
			i = ++i;
			var id = i.toString();
			var nume = this.getView("AddEvent").byId("nume")._lastValue,
				descriere = this.getView("AddEvent").byId("descriere")._lastValue,
				data = this.getView("AddEvent").byId("data")._lastValue,
				ora = this.getView("AddEvent").byId("ora")._lastValue;

			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var oEntry = {
				"Users": "I1234",
				"Nume": nume,
				"Descriere": descriere,
				"Data": data,
				"Ora": ora
			};
			oModel.create("/zevenimentSet", oEntry, {
				success: function (oData, oResponse) {
					// Success
					alert("Add in Table");
					location.reload(-1);

				},
				error: function (oError) {
					// Error
					sap.m.MessageToast.show(" Creation failed");
				}
			});
		}

	});

});