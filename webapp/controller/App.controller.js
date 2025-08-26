sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast"
], function (Controller, History, Router, MessageToast) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.App", {

		onInit: function () {
			// Set theme from localStorage or default to 'sap_horizon'
			this._initTheme();
			
			// Set initial selection to dashboard
			this._setInitialSelection();
		},

		_setInitialSelection: function () {
			// Get the current route and set the appropriate navigation item as selected
			var oRouter = this.getOwnerComponent().getRouter();
			var sCurrentRoute = oRouter.getHashChanger().getHash();
			
			if (!sCurrentRoute || sCurrentRoute === "") {
				// Default to dashboard
				this._selectNavigationItem("dashboard");
			} else {
				// Extract route name from hash
				var sRoute = sCurrentRoute.replace("#/", "");
				this._selectNavigationItem(sRoute);
			}
		},

		_selectNavigationItem: function (sKey) {
			var oSideNavigation = this.getView().byId("sideNavigation");
			var oItem = this.getView().byId(sKey + "Item");
			
			if (oItem) {
				oSideNavigation.setSelectedItem(oItem);
			}
		},

		_initTheme: function () {
			var storedTheme = localStorage.getItem("ui5-theme") || "sap_horizon";
			sap.ui.getCore().applyTheme(storedTheme);
		},

		onNavItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			var sKey = oItem.getKey();
			
			if (sKey) {
				// Navigate to the selected route
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo(sKey);
			}
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
