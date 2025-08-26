sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast"
], function (Controller, Router, MessageToast) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.Exceptions", {

		onInit: function () {
			this._loadUsersData();
		},

		_loadUsersData: function () {
			// Mock data - in real application this would come from a service
			var usersData = [
				{
					id: "U001",
					name: "Captain Müller",
					jobTitle: "Captain",
					department: "Nautical",
					roles: [
						{ roleId: "role-1", assignedOn: "2025-01-01", assignedBy: "Auto" }
					],
					activeExceptionsCount: 0
				},
				{
					id: "U002",
					name: "Captain Dubois",
					jobTitle: "Captain",
					department: "Nautical",
					roles: [
						{ roleId: "role-1", assignedOn: "2025-01-02", assignedBy: "Auto" }
					],
					activeExceptionsCount: 0
				},
				{
					id: "U003",
					name: "Lisa Schmidt",
					jobTitle: "Hotel Manager",
					department: "F&B",
					roles: [
						{ roleId: "role-2", assignedOn: "2023-03-01", assignedBy: "Auto" },
						{ 
							roleId: "role-6",
							assignedOn: "2024-07-01",
							assignedBy: "Admin",
							reason: "Temporary project lead",
							startDate: "2024-07-01",
							endDate: "2024-12-31",
						},
						{
							roleId: "role-5",
							assignedOn: "2023-01-01",
							assignedBy: "Auto",
							removedOn: "2024-02-01"
						},
						{ 
							roleId: "role-3", 
							assignedOn: "2024-01-01", 
							assignedBy: "Admin", 
							reason: "Past project", 
							startDate: "2024-01-15", 
							endDate: "2024-03-15"
						}
					],
					activeExceptionsCount: 2
				},
				{
					id: "U004",
					name: "John Carter",
					jobTitle: "Corporate Captain",
					department: "Nautical",
					roles: [
						{ roleId: "role-3", assignedOn: "2025-03-01", assignedBy: "Auto" }
					],
					activeExceptionsCount: 0
				},
				{
					id: "U005",
					name: "Maria Rossi",
					jobTitle: "HR",
					department: "Corporate",
					roles: [
						{ roleId: "role-4", assignedOn: "2025-04-01", assignedBy: "Auto" }
					],
					activeExceptionsCount: 0
				}
			];

			// Calculate active exceptions count
			usersData.forEach(function(user) {
				user.activeExceptionsCount = user.roles.filter(function(role) {
					return role.assignedBy !== 'Auto' && this._isRoleActive(role);
				}.bind(this)).length;
			}.bind(this));

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({ 
				users: usersData,
				filteredUsers: usersData,
				searchTerm: ""
			});
			this.getView().setModel(oModel);
		},

		_isRoleActive: function(role) {
			if (role.removedOn) {
				return false;
			}
			if (role.endDate && new Date(role.endDate) < new Date()) {
				return false;
			}
			return true;
		},

		onSearchPress: function () {
			var oModel = this.getView().getModel();
			var searchTerm = oModel.getProperty("/searchTerm");
			var allUsers = oModel.getProperty("/users");
			
			if (!searchTerm || searchTerm.trim() === "") {
				oModel.setProperty("/filteredUsers", allUsers);
				return;
			}
			
			var filteredUsers = allUsers.filter(function(user) {
				return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					   user.id.toLowerCase().includes(searchTerm.toLowerCase());
			});
			
			oModel.setProperty("/filteredUsers", filteredUsers);
		},

		onManageRolesPress: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			var oUser = oContext.getObject();
			
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("userRoles", { userId: oUser.id });
		}
	});
});
