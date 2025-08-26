sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast"
], function (Controller, Router, MessageToast) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.Dashboard", {

		onInit: function () {
			this._loadDashboardData();
			this._setInitialSelection();
		},

		_loadDashboardData: function () {
			// Mock data - in real application this would come from a service
			var dashboardData = {
				stats: {
					rolesCount: 6,
					defaultAssignmentsCount: 6,
					activeExceptionsCount: 2,
					totalUsersCount: 5
				},
				recentActivity: [
					{
						icon: "sap-icon://role",
						iconColor: "Good",
						description: "New role 'Exception Admin' created",
						timestamp: "2 hours ago"
					},
					{
						icon: "sap-icon://alert",
						iconColor: "Critical",
						description: "Exception role assigned to Lisa Schmidt",
						timestamp: "1 day ago"
					},
					{
						icon: "sap-icon://rule",
						iconColor: "Good",
						description: "Default assignment rule updated for Captains",
						timestamp: "2 days ago"
					},
					{
						icon: "sap-icon://document",
						iconColor: "Neutral",
						description: "Monthly audit report generated",
						timestamp: "1 week ago"
					}
				]
			};

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(dashboardData);
			this.getView().setModel(oModel);
		},

		_setInitialSelection: function () {
			// Set Dashboard as initially selected
			var oSideNavigation = this.getView().byId("sideNavigation");
			var oDashboardItem = this.getView().byId("dashboardItem");
			if (oSideNavigation && oDashboardItem) {
				oSideNavigation.setSelectedItem(oDashboardItem);
			}
		},

		// Navigation function for SAP Side Navigation
		onNavItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			var sKey = oItem.getKey();
			
			if (sKey) {
				// Navigate to the selected route
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo(sKey);
			}
		},

		// Theme toggle function
		onThemeToggle: function () {
			var currentTheme = sap.ui.getCore().getConfiguration().getTheme();
			var newTheme = currentTheme === "sap_horizon" ? "sap_horizon_dark" : "sap_horizon";
			
			sap.ui.getCore().applyTheme(newTheme);
			localStorage.setItem("ui5-theme", newTheme);
			
			var themeText = newTheme === "sap_horizon" ? "Light" : "Dark";
			MessageToast.show("Switched to " + themeText + " theme");
		},

		// Dashboard action functions
		onRolesPress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("roles");
		},

		onAssignmentsPress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("assignments");
		},

		onExceptionsPress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("exceptions");
		},

		onUsersPress: function () {
			MessageToast.show("User management feature coming soon!");
		},

		onCreateRolePress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("roleNew");
		},

		onAddAssignmentRulePress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("assignments");
		},

		onGenerateAuditReportPress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("audit");
		}
	});
});
