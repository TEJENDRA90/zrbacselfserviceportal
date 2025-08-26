sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast"
], function (Controller, History, Router, MessageToast) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.App", {

		onInit: function () {
			// Initialize navigation items
			this._initNavigationItems();
			
			// Set theme from localStorage or default to 'sap_horizon'
			this._initTheme();
		},

		_initNavigationItems: function () {
			var navItems = [
				{
					title: "Dashboard",
					icon: "sap-icon://home",
					route: "dashboard"
				},
				{
					title: "Role Management",
					icon: "sap-icon://role",
					route: "roles"
				},
				{
					title: "Default Assignments",
					icon: "sap-icon://rule",
					route: "assignments"
				},
				{
					title: "Exception Handling",
					icon: "sap-icon://alert",
					route: "exceptions"
				},
				{
					title: "Audit Report",
					icon: "sap-icon://document",
					route: "audit"
				}
			];

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({ navItems: navItems });
			this.getView().setModel(oModel);
		},

		_initTheme: function () {
			var storedTheme = localStorage.getItem("ui5-theme") || "sap_horizon";
			sap.ui.getCore().applyTheme(storedTheme);
		},

		onNavItemPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oContext = oItem.getBindingContext();
			var oData = oContext.getObject();
			
			// Navigate to the selected route
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo(oData.route);
		},

		onThemeToggle: function () {
			var currentTheme = sap.ui.getCore().getConfiguration().getTheme();
			var newTheme = currentTheme === "sap_horizon" ? "sap_horizon_dark" : "sap_horizon";
			
			sap.ui.getCore().applyTheme(newTheme);
			localStorage.setItem("ui5-theme", newTheme);
			
			var themeText = newTheme === "sap_horizon" ? "Light" : "Dark";
			MessageToast.show("Switched to " + themeText + " theme");
		},

		onExit: function () {
			// Cleanup if needed
		}
	});
});
