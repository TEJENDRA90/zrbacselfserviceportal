sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.Assignments", {

		onInit: function () {
			this._loadAssignmentsData();
		},

		_loadAssignmentsData: function () {
			// Mock data - in real application this would come from a service
			var assignmentsData = [
				{ 
					id: "rule-1", 
					jobTitle: "Captain", 
					roleIds: ["role-1"], 
					ship: "ATL",
					assignedRoles: [{ name: "Ship Captain" }]
				},
				{ 
					id: "rule-2", 
					jobTitle: "Master Captain", 
					roleIds: ["role-1"],
					assignedRoles: [{ name: "Ship Captain" }]
				},
				{ 
					id: "rule-3", 
					jobTitle: "Maitre D", 
					roleIds: ["role-2"], 
					function: "Catering",
					assignedRoles: [{ name: "Ship Hotel Manager" }]
				},
				{ 
					id: "rule-4", 
					jobTitle: "Hotel Manager", 
					roleIds: ["role-2", "role-6"],
					assignedRoles: [{ name: "Ship Hotel Manager" }, { name: "Exception Admin" }]
				},
				{ 
					id: "rule-5", 
					jobTitle: "Nautic Scheduler", 
					roleIds: ["role-3"], 
					company: "CH01", 
					operation: "CHO",
					assignedRoles: [{ name: "Corporate Captain" }]
				},
				{ 
					id: "rule-6", 
					jobTitle: "HR", 
					roleIds: ["role-4"],
					assignedRoles: [{ name: "HR Admin" }]
				}
			];

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({ assignments: assignmentsData });
			this.getView().setModel(oModel);
		},

		onAddRulePress: function () {
			MessageToast.show("Add Rule functionality coming soon!");
		},

		onEditRulePress: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			var oRule = oContext.getObject();
			
			MessageToast.show("Edit Rule functionality coming soon!");
		},

		onDeleteRulePress: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext();
			var oRule = oContext.getObject();
			
			MessageBox.confirm(
				"Are you sure you want to delete this assignment rule?",
				{
					title: "Confirm Delete",
					actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
					emphasizedAction: MessageBox.Action.CANCEL,
					onClose: function (sAction) {
						if (sAction === MessageBox.Action.OK) {
							this._deleteRule(oRule.id);
						}
					}.bind(this)
				}
			);
		},

		_deleteRule: function (ruleId) {
			var oModel = this.getView().getModel();
			var aAssignments = oModel.getProperty("/assignments");
			var aFilteredAssignments = aAssignments.filter(function (rule) {
				return rule.id !== ruleId;
			});
			
			oModel.setProperty("/assignments", aFilteredAssignments);
			MessageToast.show("Assignment rule deleted successfully");
		}
	});
});
