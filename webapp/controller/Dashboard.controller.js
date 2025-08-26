sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast"
], function (Controller, Router, MessageToast) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.Dashboard", {

		onInit: function () {
			this._loadDashboardData();
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
