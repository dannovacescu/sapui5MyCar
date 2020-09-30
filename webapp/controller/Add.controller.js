sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
], function (Controller, History, MessageToast) {
	"use strict";
	var i = 0;

	return Controller.extend("MyCars.MyCars.controller.Add", {

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

		/**
		 * Event handler for the cancel action
		 * @public
		 */
		onCancel: function () {
			this.onNavBack();
		},

		/**
		 * Event handler for the save action
		 * @public
		 */
		onSave: function () {
			i = ++i;
			var id = this.getView("Add").byId("numar")._lastValue,
				nume = this.getView("Add").byId("nume")._lastValue,
				prenume = this.getView("Add").byId("prenume")._lastValue,
				marca = this.getView("Add").byId("marca")._lastValue,
				numar = this.getView("Add").byId("numar")._lastValue,
				serie = this.getView("Add").byId("serie")._lastValue,
				rca = this.getView("Add").byId("rca")._lastValue,
				vrca = this.getView("Add").byId("vrca")._lastValue,
				prca = this.getView("Add").byId("prca")._lastValue,
				casco = this.getView("Add").byId("casco")._lastValue,
				vcasco = this.getView("Add").byId("vcasco")._lastValue,
				pcasco = this.getView("Add").byId("pcasco")._lastValue,
				rovinieta = this.getView("Add").byId("rovinieta")._lastValue,
				provinieta = this.getView("Add").byId("provinieta")._lastValue,
				itp = this.getView("Add").byId("itp")._lastValue,
				pitp = this.getView("Add").byId("pitp")._lastValue;

			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			var oModelPret = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var oEntry = {
				"Id": numar,
				"Users": "I1234",
				"Nume": nume,
				"Prenume": prenume,
				"Marca": marca,
				"Numar": numar,
				"Serie": serie,
				"Rca": rca,
				"DataRca": vrca,
				"PretRca": prca,
				"Casco": casco,
				"DataCasco": vcasco,
				"PretCasco": pcasco,
				"DataRovinieta": rovinieta,
				"PretRovinieta": provinieta,
				"DataItp": itp,
				"PretItp": pitp
			};
			var an = vrca.substring(vrca.length - 2, vrca.length);
			var anul = 20 + an;
			var oEntryPret = {

				// "Id": numar,
				"Users": "I1234",
				"Numar": numar,
				"Anul": anul,
				"PretRca": prca,
				"PretCasco": pcasco,
				"PretRovinieta": provinieta
			};

			oModel.create("/zmasinaSet", oEntry, {
				success: function (oData, oResponse) {
					// Success
					alert("Add in Table");

				},
				error: function (oError) {
					// Error
					sap.m.MessageToast.show(" Creation failed");
				}
			});
			oModelPret.create("/zpretSet", oEntryPret, {
				success: function (oData, oResponse) {
					// Success
					alert("Add in Table  Pret");
					location.reload(-1);

				},
				error: function (oError) {
					// Error
					sap.m.MessageToast.show(" Creation failed");
					location.reload(-1);
				}
			});
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