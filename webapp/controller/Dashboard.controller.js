sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast"
], function (Controller, Router, MessageToast) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.Dashboard", {

		onInit: function () {
			console.log("Dashboard controller initialized");
			this._loadDashboardData();
			this._setInitialSelection();
		},

		_loadDashboardData: function () {
			console.log("Loading dashboard data");
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
			console.log("Dashboard data loaded:", dashboardData);
		},

		_setInitialSelection: function () {
			console.log("Setting initial selection");
			// Dashboard is already selected by default in the view
			console.log("Dashboard item selected by default");
		},

		// Navigation function for button-based navigation
		onNavItemPress: function (oEvent) {
			console.log("Navigation button pressed:", oEvent);
			var oButton = oEvent.getSource();
			var sRoute = oButton.data("route");
			
			console.log("Selected route:", sRoute);
			
			if (sRoute) {
				// Update navigation selection
				this._selectNavigationItem(sRoute);
				
				// Navigate to the selected route
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo(sRoute);
			}
		},

		_selectNavigationItem: function (sKey) {
			console.log("Selecting navigation item:", sKey);
			// Remove selection from all navigation items
			this._clearNavigationSelection();
			
			// Select the current item
			var oItem = this.getView().byId(sKey + "Item");
			if (oItem) {
				oItem.addStyleClass("nav-button-selected");
				console.log("Navigation item selected:", sKey);
			}
		},

		_clearNavigationSelection: function () {
			var aNavItems = ["dashboard", "roles", "assignments", "exceptions", "audit"];
			aNavItems.forEach(function(sKey) {
				var oItem = this.getView().byId(sKey + "Item");
				if (oItem) {
					oItem.removeStyleClass("nav-button-selected");
				}
			}.bind(this));
		},

		// Theme toggle function
		onThemeToggle: function () {
			console.log("Theme toggle pressed");
			var currentTheme = sap.ui.getCore().getConfiguration().getTheme();
			var newTheme = currentTheme === "sap_horizon" ? "sap_horizon_dark" : "sap_horizon";
			
			sap.ui.getCore().applyTheme(newTheme);
			localStorage.setItem("ui5-theme", newTheme);
			
			var themeText = newTheme === "sap_horizon" ? "Light" : "Dark";
			MessageToast.show("Switched to " + themeText + " theme");
		},

		// Dashboard action functions
		onRolesPress: function () {
			console.log("Roles pressed");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("roles");
		},

		onAssignmentsPress: function () {
			console.log("Assignments pressed");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("assignments");
		},

		onExceptionsPress: function () {
			console.log("Exceptions pressed");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("exceptions");
		},

		onUsersPress: function () {
			console.log("Users pressed");
			MessageToast.show("User management feature coming soon!");
		},

		onCreateRolePress: function () {
			console.log("Create role pressed");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("roleNew");
		},

		onAddAssignmentRulePress: function () {
			console.log("Add assignment rule pressed");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("assignments");
		},

		onGenerateAuditReportPress: function () {
			console.log("Generate audit report pressed");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("audit");
		}
	});
});
