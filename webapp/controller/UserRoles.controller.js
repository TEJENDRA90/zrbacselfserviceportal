sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, Router, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.UserRoles", {

		onInit: function () {
			this._loadUserData();
		},

		_loadUserData: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			var oRoute = oRouter.getRoute("userRoles");
			
			oRoute.attachPatternMatched(this._onPatternMatched, this);
		},

		_onPatternMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			var userId = oArgs.userId;
			
			this._loadUserById(userId);
		},

		_loadUserById: function (userId) {
			// Mock data - in real application this would come from a service
			var usersData = {
				"U001": {
					id: "U001",
					name: "Captain Müller",
					jobTitle: "Captain",
					department: "Nautical",
					roles: [
						{ 
							roleId: "role-1", 
							assignedOn: "2025-01-01", 
							assignedBy: "Auto",
							roleName: "Ship Captain",
							status: "Active"
						}
					]
				},
				"U002": {
					id: "U002",
					name: "Captain Dubois",
					jobTitle: "Captain",
					department: "Nautical",
					roles: [
						{ 
							roleId: "role-1", 
							assignedOn: "2025-01-02", 
							assignedBy: "Auto",
							roleName: "Ship Captain",
							status: "Active"
						}
					]
				},
				"U003": {
					id: "U003",
					name: "Lisa Schmidt",
					jobTitle: "Hotel Manager",
					department: "F&B",
					roles: [
						{ 
							roleId: "role-2", 
							assignedOn: "2023-03-01", 
							assignedBy: "Auto",
							roleName: "Ship Hotel Manager",
							status: "Active"
						},
						{ 
							roleId: "role-6",
							assignedOn: "2024-07-01",
							assignedBy: "Admin",
							reason: "Temporary project lead",
							startDate: "2024-07-01",
							endDate: "2024-12-31",
							roleName: "Exception Admin",
							status: "Active"
						},
						{
							roleId: "role-5",
							assignedOn: "2023-01-01",
							assignedBy: "Auto",
							removedOn: "2024-02-01",
							roleName: "Super Admin",
							status: "Removed"
						},
						{ 
							roleId: "role-3", 
							assignedOn: "2024-01-01", 
							assignedBy: "Admin", 
							reason: "Past project", 
							startDate: "2024-01-15", 
							endDate: "2024-03-15",
							roleName: "Corporate Captain",
							status: "Expired"
						}
					]
				},
				"U004": {
					id: "U004",
					name: "John Carter",
					jobTitle: "Corporate Captain",
					department: "Nautical",
					roles: [
						{ 
							roleId: "role-3", 
							assignedOn: "2025-03-01", 
							assignedBy: "Auto",
							roleName: "Corporate Captain",
							status: "Active"
						}
					]
				},
				"U005": {
					id: "U005",
					name: "Maria Rossi",
					jobTitle: "HR",
					department: "Corporate",
					roles: [
						{ 
							roleId: "role-4", 
							assignedOn: "2025-04-01", 
							assignedBy: "Auto",
							roleName: "HR Admin",
							status: "Active"
						}
					]
				}
			};

			var user = usersData[userId];
			if (user) {
				// Process roles to add status and role names
				user.roles.forEach(function(role) {
					role.status = this._getRoleStatus(role);
				}.bind(this));

				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({ user: user });
				this.getView().setModel(oModel);
			} else {
				MessageToast.show("User not found");
				this.onBackToListPress();
			}
		},

		_getRoleStatus: function (role) {
			if (role.removedOn) {
				return 'Removed';
			}
			if (role.endDate && new Date(role.endDate) < new Date()) {
				return 'Expired';
			}
			return 'Active';
		},

		onAddExceptionPress: function () {
			MessageToast.show("Add Exception functionality coming soon!");
		},

		onRemoveRolePress: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			var oRole = oContext.getObject();
			
			MessageBox.confirm(
				"Are you sure you want to remove the role '" + oRole.roleName + "' from this user? This action will be logged.",
				{
					title: "Confirm Remove Role",
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					emphasizedAction: MessageBox.Action.CANCEL,
					onClose: function (sAction) {
						if (sAction === MessageBox.Action.OK) {
							this._removeRole(oRole);
						}
					}.bind(this)
				}
			);
		},

		_removeRole: function (role) {
			var oModel = this.getView().getModel();
			var user = oModel.getProperty("/user");
			
			// Find and update the role
			var roleIndex = user.roles.findIndex(function(r) {
				return r.roleId === role.roleId && r.assignedOn === role.assignedOn;
			});
			
			if (roleIndex !== -1) {
				user.roles[roleIndex].removedOn = new Date().toISOString().split('T')[0];
				user.roles[roleIndex].status = 'Removed';
				
				oModel.refresh();
				MessageToast.show("Role removed successfully");
			}
		},

		onBackToListPress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("exceptions");
		}
	});
});
