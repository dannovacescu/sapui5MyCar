sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"

], function (jQuery, Fragment, Controller, History, JSONModel) {
	"use strict";

	var PageController = Controller.extend("MyCars.MyCars.controller.List", {

		onInit: function (oEvent) {

			// Set the initial form to be the display one
			this._showFormFragment("Display");

			// to navigate to the page on phone and not show the split screen items
			var oSplitContainer = this.byId("FormSplitscreenList");
			oSplitContainer.toDetail(this.createId("pageList"));

			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

			this.oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var that = this;
			that.defaultModel = new JSONModel();
			this.oModel.read("/zmasinaSet",
				null,
				null,
				false,
				function (oData, oResponse) {
					var form1 = that.getView().byId("masterList");
					var form2 = that.getView().byId("FormDisplay471");

					// create JSON model
					var oJSONModel = new sap.ui.model.json.JSONModel();
					oJSONModel.setProperty("/cars", oData.results);
					var oODataJSONModel1 = new sap.ui.model.json.JSONModel();
					// this.getView().byId("master").setModel(oODataJSONModel);
					form1.setModel(oJSONModel, "garaj");
					form2.setModel(oODataJSONModel1, "localModel");

					// set the odata JSON as data of JSON model
					oODataJSONModel1.setData(oData.results[0]);
					that.defaultModel.setData(oData.results[0]);

					// oJSONModel.setData(oData);
					// form1.setModel(oJSONModel.results);

					// store the model
					// form2.setModel(oODataJSONModel, "localModel");

					console.log(form2.getModel("localModel"));
				}
			);

			// // set explored app's demo model on this sample
			// var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock") + "/supplier.json");
			// this.getView().bindElement("/SupplierCollection/0");

		},
		handleMasterList: function (oEvent) {
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext();
			var id = oEvent.getParameters().id;
			var nr = id.slice(-1);

			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

			// var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var that = this;

			this.oModel.read("/zmasinaSet",
				null,
				null,
				false,
				function (oData, oResponse) {

					var form = that.getView().byId("FormDisplay471");

					// create JSON model
					var oJModel = new sap.ui.model.json.JSONModel();
					form.setModel(oJModel, "localModel");
					// id = id - 1;
					oJModel.setData(oData.results[nr]);
					that.defaultModel.setData(oData.results[nr]);
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

		// onExit: function () {
		// 	for (var sPropertyName in this._formFragments) {
		// 		if (!this._formFragments.hasOwnProperty(sPropertyName) || this._formFragments[sPropertyName] == null) {
		// 			return;
		// 		}

		// 		this._formFragments[sPropertyName].destroy();
		// 		this._formFragments[sPropertyName] = null;
		// 	}
		// },

		handleEditPress: function (oEvent) {

			//Clone the data

			this._oSupplier = jQuery.extend({}, this.getView());
			this._toggleButtonsAndView(true);
			var oItem = oEvent.getSource();
			// var oCtx = oItem.getBindingContext();
			// var id = oItem.getTitle();

			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

			// var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var that = this;

			// oModel.read("/zmasinaSet",
			// 	null,
			// 	null,
			// 	false,
			// 	function (oData, oResponse) {

			var form = that.getView().byId("FormChange471");

			// create JSON model
			// var oJModel1 = new sap.ui.model.json.JSONModel();
			form.setModel(that.defaultModel, "localModel1");
			// id = id - 1;
			// that.defaultModel.setData(oData.results);
			// }
			// );

		},

		handleCancelPress: function () {

			// //Restore the data
			// var oModel = this.getView().getModel();
			// var oData = oModel.getData();

			// oData.SupplierCollection[0] = this._oSupplier;

			// oModel.setData(oData);

			this._toggleButtonsAndView(false);

		},

		handleSavePress: function () {

			this._toggleButtonsAndView(false);
			var nume = this.getView("FormChange471").byId("Nume")._lastValue,
				prenume = this.getView("FormChange471").byId("Prenume")._lastValue,
				marca = this.getView("FormChange471").byId("marca")._lastValue,
				numar = this.getView("FormChange471").byId("numar")._lastValue,
				serie = this.getView("FormChange471").byId("serie")._lastValue,
				rca = this.getView("FormChange471").byId("rca")._lastValue,
				vrca = this.getView("FormChange471").byId("dRca")._lastValue,
				prca = this.getView("FormChange471").byId("pRca")._lastValue,
				casco = this.getView("FormChange471").byId("casco")._lastValue,
				vcasco = this.getView("FormChange471").byId("dCasco")._lastValue,
				pcasco = this.getView("FormChange471").byId("pCasco")._lastValue,
				rovinieta = this.getView("FormChange471").byId("dRovinieta")._lastValue,
				provinieta = this.getView("FormChange471").byId("pRovinieta")._lastValue;
			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";
			var oModelSave = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

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
				"PretRovinieta": provinieta
			};
			oModelSave.update("/zmasinaSet(Id='" + numar + "',Users='I1234')", oEntry, {
				success: function (oData, oResponse) {
					// Success
					alert("Update in Table");

				},
				error: function (oError) {
					// Error
					sap.m.MessageToast.show(" Creation failed");
				}
			});
			this.oModel.refresh();

		},

		handleDeletePress: function () {
			var id = this.getView("FormDisplay471").byId("numarT").getText();
			var users = "I1234";
			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";
			var oModelDelete = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			oModelDelete.remove("/zmasinaSet(Id='" + id + "',Users='I1234')", {
				success: function (oData, oResponse) {
					// Success
					alert("Delete in Table");

				},
				error: function (oError) {
					// Error
					sap.m.MessageToast.show(" Delete failed");
				}
			});
		},

		_formFragments: {},

		_toggleButtonsAndView: function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
		},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "MyCars.MyCars.view." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},

		_showFormFragment: function (sFragmentName) {
			var oPage = this.byId("pageList");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}

	});
	return PageController;

});