sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"

], function (jQuery, Fragment, Controller, History, JSONModel) {
	"use strict";

	var PageController = Controller.extend("MyCars.MyCars.controller.Event", {

		onInit: function (oEvent) {
			// Set the initial form to be the display one
			this._showFormFragment("EventDisplay");

			// to navigate to the page on phone and not show the split screen items
			var oSplitContainer = this.byId("FormSplitscreenEvent");
			oSplitContainer.toDetail(this.createId("pageEvent"));

			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

			this.oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			var that = this;
			that.defaultModel = new JSONModel();
			this.oModel.read("/zevenimentSet",
				null,
				null,
				false,
				function (oData, oResponse) {
					var form1 = that.getView().byId("masterEvent");
					var form2 = that.getView().byId("FormDisplayEvent");

					// create JSON model
					var oJSONModel = new sap.ui.model.json.JSONModel();
					oJSONModel.setProperty("/Events", oData.results);
					var oODataJSONModel1 = new sap.ui.model.json.JSONModel();

					form1.setModel(oJSONModel, "event");
					form2.setModel(oODataJSONModel1, "localModel");

					// set the odata JSON as data of JSON model
					oODataJSONModel1.setData(oData.results[0]);
					that.defaultModel.setData(oData.results[0]);

					console.log(form2.getModel("localModel"));
				}
			);
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		AddEvent: function (oEvent) {
			this.getRouter().navTo("addEvent");
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

			this.oModel.read("/zevenimentSet",
				null,
				null,
				false,
				function (oData, oResponse) {

					var form = that.getView().byId("FormDisplayEvent");

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

			var form = that.getView().byId("FormChangeEvent");

			// create JSON model
			// var oJModel1 = new sap.ui.model.json.JSONModel();
			form.setModel(that.defaultModel, "localModel1");
			// id = id - 1;
			// that.defaultModel.setData(oData.results);
			// }
			// );

		},
		handleDeletePress: function (oEvent) {
			// var oItem = oEvent.getSource();
			// var id = this.getView("IDDisplay").byId("numarT").getText();
			// var id = oEvent.getParameters().id;
			// var nr = id.slice(-1);

			var id = this.numb;
			if (isNaN(id)) {
				id = 1;
			} else {
				id = ++id;
			}

			var users = "I1234";
			var http = "http://";
			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";
			var oModelDelete = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

			oModelDelete.remove("/zevenimentSet(Id=" + id + ",Users='I1234')", {
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

		handleCancelPress: function () {

			// //Restore the data
			// var oModel = this.getView().getModel();
			// var oData = oModel.getData();

			// oData.SupplierCollection[0] = this._oSupplier;

			// oModel.setData(oData);

			this._toggleButtonsAndView(false);

		},
		handleSavePress: function () {},

		_formFragments: {},

		_toggleButtonsAndView: function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "EventChange" : "EventDisplay");
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
			var oPage = this.byId("pageEvent");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}

	});
	return PageController;

});
// 	return Controller.extend("MyCars.MyCars.controller.ID", {

// 		/* =========================================================== */
// 		/* lifecycle methods                                           */
// 		/* =========================================================== */

// 		/**
// 		 * Called when the add controller is instantiated.
// 		 * @public
// 		 */
// 		onInit: function () {
// 			var http = "http://";
// 			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

// 			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

// 			var that = this;

// 			oModel.read("/zbuletinSet",
// 				null,
// 				null,
// 				false,
// 				function (oData, oResponse) {
// 					var form1 = that.getView().byId("master2");
// 					var form2 = that.getView().byId("FormDisplayID");

// 					// create JSON model
// 					var oJSONModel = new sap.ui.model.json.JSONModel();
// 					oJSONModel.setProperty("/IDs", oData.results);
// 					var oODataJSONModel1 = new sap.ui.model.json.JSONModel();
// 					// this.getView().byId("master").setModel(oODataJSONModel);
// 					form1.setModel(oJSONModel, "buletin");
// 					form2.setModel(oODataJSONModel1, "ModelID");

// 					// set the odata JSON as data of JSON model
// 					oODataJSONModel1.setData(oData.results[0]);

// 					console.log(form2.getModel("ModelID"));
// 				}
// 			);

// 		},

// 		handleMasterList: function (oEvent) {
// 			var oItem = oEvent.getSource();
// 			var oCtx = oItem.getBindingContext();
// 			var id = oItem.getTitle();

// 			var http = "http://";
// 			var sServiceUrl = http + "aoh-hana2.c.eu-de-2.cloud.sap:8000/sap/opu/odata/SAP/ZREMAINDER1_SRV";

// 			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

// 			var that = this;

// 			oModel.read("/zbuletinSet",
// 				null,
// 				null,
// 				false,
// 				function (oData, oResponse) {

// 					var form = that.getView().byId("FormDisplayID");

// 					// create JSON model
// 					var oJModel = new sap.ui.model.json.JSONModel();
// 					form.setModel(oJModel, "ModelID");
// 					id = id - 1;
// 					oJModel.setData(oData.results[id]);
// 				}
// 			);

// 		},
// 		getRouter: function () {
// 			return sap.ui.core.UIComponent.getRouterFor(this);
// 		},
// 		AddID: function (oEvent) {
// 			this.getRouter().navTo("addID");
// 		},
// 		onNavBack: function () {
// 			var oHistory = History.getInstance();
// 			var sPreviousHash = oHistory.getPreviousHash();

// 			if (sPreviousHash !== undefined) {
// 				window.history.go(-1);
// 			} else {
// 				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
// 				oRouter.navTo("RouteMain", true);
// 			}

// 		}

// 	});

// });