sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, Router, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.Roles", {

		onInit: function () {
			this._loadRolesData();
		},

		_loadRolesData: function () {
			// Mock data - in real application this would come from a service
			var rolesData = [
				{
					id: "role-1",
					name: "Ship Captain",
					description: "Read/Write access to own ship's data only for NAU",
					permissions: [
						{ attribute: "Company", values: ["All"] },
						{ attribute: "Function", values: ["Nautical"] },
						{ attribute: "Operation", values: ["All"] },
						{ attribute: "Ship", values: ["Dynamic"] },
						{ attribute: "Department", values: ["All"] },
						{ attribute: "Job Title", values: ["All"] }
					],
					writeRestrictionDays: 30,
					functionalityAccess: "Both",
					dayTypeAccess: ["All"],
					appAccess: [
						{ appName: "VPP", actions: ["Read", "Write"] },
						{ appName: "Crew Schedule", actions: ["Read", "Write"] },
						{ appName: "License View", actions: ["Read", "Write"] }
					]
				},
				{
					id: "role-2",
					name: "Ship Hotel Manager",
					description: "Full Read/Write for a specific Ship for Catering",
					permissions: [
						{ attribute: "Company", values: ["All"] },
						{ attribute: "Function", values: ["Catering"] },
						{ attribute: "Operation", values: ["All"] },
						{ attribute: "Ship", values: ["All"] },
						{ attribute: "Department", values: ["Dynamic"] },
						{ attribute: "Job Title", values: ["All"] }
					],
					writeRestrictionDays: null,
					functionalityAccess: "Planning View",
					dayTypeAccess: ["W", "W1", "V"],
					appAccess: [
						{ appName: "VPP", actions: ["Read", "Write"] },
						{ appName: "Work Order", actions: ["Read", "Write"] },
						{ appName: "Roster Assignment", actions: ["Read", "Write"] }
					]
				},
				{
					id: "role-3",
					name: "Corporate Captain",
					description: "Read-only access to specific operations",
					permissions: [
						{ attribute: "Company", values: ["All"] },
						{ attribute: "Function", values: ["Nautical"] },
						{ attribute: "Operation", values: ["Dynamic"] },
						{ attribute: "Ship", values: ["Dynamic"] },
						{ attribute: "Department", values: ["All"] },
						{ attribute: "Job Title", values: ["All"] }
					],
					functionalityAccess: "Scheduling View",
					dayTypeAccess: ["All"],
					appAccess: [
						{ appName: "Authority Report", actions: ["Read"] },
						{ appName: "FR Authority Report", actions: ["Read"] },
						{ appName: "License View", actions: ["Read"] }
					]
				},
				{
					id: "role-4",
					name: "HR Admin",
					description: "Read/Write data across company",
					permissions: [
						{ attribute: "Company", values: ["All"] },
						{ attribute: "Function", values: ["Catering", "Nautical"] },
						{ attribute: "Operation", values: ["All"] },
						{ attribute: "Ship", values: ["All"] },
						{ attribute: "Department", values: ["All"] },
						{ attribute: "Job Title", values: ["All"] }
					],
					writeRestrictionDays: 10,
					functionalityAccess: "Both",
					dayTypeAccess: ["All"],
					appAccess: [
						{ appName: "Crew Schedule", actions: ["Read", "Write"] },
						{ appName: "Import Manager", actions: ["Read", "Write"] },
						{ appName: "VPP Payroll Download", actions: ["Read", "Write"] },
						{ appName: "Roster Create", actions: ["Read", "Write"] }
					]
				},
				{
					id: "role-5",
					name: "Super Admin",
					description: "Read/Write data across company",
					permissions: [
						{ attribute: "Company", values: ["All"] },
						{ attribute: "Function", values: ["All"] },
						{ attribute: "Operation", values: ["All"] },
						{ attribute: "Ship", values: ["All"] },
						{ attribute: "Department", values: ["All"] },
						{ attribute: "Job Title", values: ["All"] }
					],
					writeRestrictionDays: null,
					functionalityAccess: "Both",
					dayTypeAccess: ["All"],
					appAccess: [
						{ appName: "VPP", actions: ["Read", "Write"] },
						{ appName: "Crew Schedule", actions: ["Read", "Write"] },
						{ appName: "Import Manager", actions: ["Read", "Write"] },
						{ appName: "Work Order", actions: ["Read", "Write"] },
						{ appName: "Authority Report", actions: ["Read", "Write"] },
						{ appName: "FR Authority Report", actions: ["Read", "Write"] },
						{ appName: "License View", actions: ["Read", "Write"] },
						{ appName: "VPP Plan Download", actions: ["Read", "Write"] },
						{ appName: "VPP Payroll Download", actions: ["Read", "Write"] },
						{ appName: "Roster Create", actions: ["Read", "Write"] },
						{ appName: "Roster Assignment", actions: ["Read", "Write"] }
					]
				},
				{
					id: "role-6",
					name: "Exception Admin",
					description: "Specific exception role for a project.",
					permissions: [
						{ attribute: "Company", values: ["FR01"] },
						{ attribute: "Function", values: ["Catering"] },
						{ attribute: "Operation", values: ["FR01"] },
						{ attribute: "Ship", values: ["BLD"] },
						{ attribute: "Department", values: ["All"] },
						{ attribute: "Job Title", values: ["All"] }
					],
					functionalityAccess: "Planning View",
					dayTypeAccess: ["T", "TH"],
					appAccess: [{ appName: "VPP Plan Download", actions: ["Read"] }]
				}
			];

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({ 
				roles: rolesData,
				selectedRole: null
			});
			this.getView().setModel(oModel);
		},

		onExportExcelPress: function () {
			MessageToast.show("Export to Excel functionality coming soon!");
		},

		onCreateRolePress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("roleNew");
		},

		onEditRolePress: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			var oRole = oContext.getObject();
			
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("roleEdit", { roleId: oRole.id });
		},

		onDeleteRolePress: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			var oRole = oContext.getObject();
			
			MessageBox.confirm(
				"Are you sure you want to delete the role '" + oRole.name + "'? This might affect default assignments and users with this role.",
				{
					title: "Confirm Delete",
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					emphasizedAction: MessageBox.Action.CANCEL,
					onClose: function (sAction) {
						if (sAction === MessageBox.Action.OK) {
							this._deleteRole(oRole.id);
						}
					}.bind(this)
				}
			);
		},

		_deleteRole: function (roleId) {
			var oModel = this.getView().getModel();
			var aRoles = oModel.getProperty("/roles");
			var aFilteredRoles = aRoles.filter(function (role) {
				return role.id !== roleId;
			});
			
			oModel.setProperty("/roles", aFilteredRoles);
			MessageToast.show("Role deleted successfully");
		}
	});
});
