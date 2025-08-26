sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/Router",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, Router, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.RoleEdit", {

		onInit: function () {
			this._initData();
			this._loadRoleData();
		},

		_initData: function () {
			// Initialize app list and attribute values
			var appList = [
				"VPP", "Crew Schedule", "Import Manager", "Work Order", 
				"Authority Report", "FR Authority Report", "License View", 
				"VPP Plan Download", "VPP Payroll Download", "Roster Create", 
				"Roster Assignment"
			];

			var attributes = ["Company", "Function", "Operation", "Ship", "Department", "Job Title"];
			var attributeValues = {
				"Company": ["CH01", "CH02", "DE01", "FR01"],
				"Function": ["Catering", "Nautical"],
				"Operation": ["CHO", "FRR", "RHELMO"],
				"Ship": ["ALR", "ATL", "BLD", "BEY"],
				"Department": ["Front Office", "F&B", "Deck", "Engine"],
				"Job Title": ["Captain", "Supervisor", "Corporate Captain", "HR", "Hotel Manager", "Maitre D", "Nautic Scheduler"]
			};

			// Create app list with checkboxes
			var appListWithAccess = appList.map(function(app) {
				return {
					appName: app,
					readAccess: false,
					writeAccess: false
				};
			});

			// Create permissions structure
			var permissions = attributes.map(function(attr) {
				return {
					attribute: attr,
					values: []
				};
			});

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				appList: appListWithAccess,
				attributes: attributes,
				attributeValues: attributeValues,
				permissions: permissions,
				role: {},
				isNewRole: true,
				hasWriteAccess: false,
				noWriteRestriction: false
			});
			this.getView().setModel(oModel);
		},

		_loadRoleData: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			var oRoute = oRouter.getRoute("roleEdit");
			
			oRoute.attachPatternMatched(this._onPatternMatched, this);
		},

		_onPatternMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			var roleId = oArgs.roleId;
			
			if (roleId && roleId !== "new") {
				this._loadExistingRole(roleId);
			} else {
				this._createNewRole();
			}
		},

		_loadExistingRole: function (roleId) {
			// Mock data - in real application this would come from a service
			var existingRole = {
				id: roleId,
				name: "Sample Role",
				description: "This is a sample role for editing",
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
					{ appName: "Crew Schedule", actions: ["Read", "Write"] }
				]
			};

			this._updateModelWithRole(existingRole, false);
		},

		_createNewRole: function () {
			var newRole = {
				id: "",
				name: "",
				description: "",
				permissions: [
					{ attribute: "Company", values: [] },
					{ attribute: "Function", values: [] },
					{ attribute: "Operation", values: [] },
					{ attribute: "Ship", values: [] },
					{ attribute: "Department", values: [] },
					{ attribute: "Job Title", values: [] }
				],
				writeRestrictionDays: null,
				functionalityAccess: "Both",
				dayTypeAccess: ["All"],
				appAccess: []
			};

			this._updateModelWithRole(newRole, true);
		},

		_updateModelWithRole: function (role, isNew) {
			var oModel = this.getView().getModel();
			
			// Update app access checkboxes
			var appList = oModel.getProperty("/appList");
			appList.forEach(function(app) {
				var appAccess = role.appAccess.find(function(acc) {
					return acc.appName === app.appName;
				});
				app.readAccess = appAccess && appAccess.actions.includes("Read");
				app.writeAccess = appAccess && appAccess.actions.includes("Write");
			});

			// Update permissions
			var permissions = oModel.getProperty("/permissions");
			permissions.forEach(function(perm) {
				var rolePerm = role.permissions.find(function(p) {
					return p.attribute === perm.attribute;
				});
				perm.values = rolePerm ? rolePerm.values : [];
			});

			oModel.setProperty("/role", role);
			oModel.setProperty("/isNewRole", isNew);
			oModel.setProperty("/hasWriteAccess", role.appAccess.some(function(app) {
				return app.actions.includes("Write");
			}));
			oModel.setProperty("/noWriteRestriction", role.writeRestrictionDays === null);
		},

		onCancelPress: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("roles");
		},

		onSavePress: function () {
			if (this._validateForm()) {
				this._saveRole();
			}
		},

		_validateForm: function () {
			var oModel = this.getView().getModel();
			var role = oModel.getProperty("/role");
			
			if (!role.name || role.name.trim() === "") {
				MessageBox.error("Please enter a role name");
				return false;
			}
			
			if (!role.description || role.description.trim() === "") {
				MessageBox.error("Please enter a role description");
				return false;
			}

			// Check if at least one app has access
			var appList = oModel.getProperty("/appList");
			var hasAppAccess = appList.some(function(app) {
				return app.readAccess || app.writeAccess;
			});

			if (!hasAppAccess) {
				MessageBox.error("Please select at least one application with access");
				return false;
			}

			return true;
		},

		_saveRole: function () {
			var oModel = this.getView().getModel();
			var role = oModel.getProperty("/role");
			var appList = oModel.getProperty("/appList");
			var permissions = oModel.getProperty("/permissions");

			// Build app access from checkboxes
			var appAccess = [];
			appList.forEach(function(app) {
				var actions = [];
				if (app.readAccess) actions.push("Read");
				if (app.writeAccess) actions.push("Write");
				
				if (actions.length > 0) {
					appAccess.push({
						appName: app.appName,
						actions: actions
					});
				}
			});

			// Update role with form data
			role.appAccess = appAccess;
			role.permissions = permissions;

			// Handle write restriction
			if (oModel.getProperty("/noWriteRestriction")) {
				role.writeRestrictionDays = null;
			}

			// Generate ID for new roles
			if (oModel.getProperty("/isNewRole")) {
				role.id = "role-" + Date.now();
			}

			// Save role (in real app, this would call a service)
			MessageToast.show("Role saved successfully!");
			
			// Navigate back to roles list
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("roles");
		}
	});
});
