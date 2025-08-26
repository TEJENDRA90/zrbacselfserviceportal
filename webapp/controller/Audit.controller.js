sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
	"use strict";

	return Controller.extend("rbacselfserviceportal.zrbacselfserviceportal.controller.Audit", {

		onInit: function () {
			this._initFilters();
			this._loadAuditData();
		},

		_initFilters: function () {
			var filters = {
				userSearch: "",
				startDate: null,
				endDate: null,
				assignmentType: "All",
				roleId: "All"
			};

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({ 
				filters: filters,
				auditRecords: []
			});
			this.getView().setModel(oModel);
		},

		_loadAuditData: function () {
			// Mock data - in real application this would come from a service
			var auditData = [
				{
					userId: "U001",
					userName: "Captain Müller",
					roleId: "role-1",
					roleName: "Ship Captain",
					assignmentType: "Default",
					assignedBy: "Auto",
					assignedOn: "2025-01-01",
					startDate: null,
					endDate: null,
					reason: null,
					status: "Active"
				},
				{
					userId: "U002",
					userName: "Captain Dubois",
					roleId: "role-1",
					roleName: "Ship Captain",
					assignmentType: "Default",
					assignedBy: "Auto",
					assignedOn: "2025-01-02",
					startDate: null,
					endDate: null,
					reason: null,
					status: "Active"
				},
				{
					userId: "U003",
					userName: "Lisa Schmidt",
					roleId: "role-2",
					roleName: "Ship Hotel Manager",
					assignmentType: "Default",
					assignedBy: "Auto",
					assignedOn: "2023-03-01",
					startDate: null,
					endDate: null,
					reason: null,
					status: "Active"
				},
				{
					userId: "U003",
					userName: "Lisa Schmidt",
					roleId: "role-6",
					roleName: "Exception Admin",
					assignmentType: "Exception",
					assignedBy: "Admin",
					assignedOn: "2024-07-01",
					startDate: "2024-07-01",
					endDate: "2024-12-31",
					reason: "Temporary project lead",
					status: "Active"
				},
				{
					userId: "U003",
					userName: "Lisa Schmidt",
					roleId: "role-5",
					roleName: "Super Admin",
					assignmentType: "Default",
					assignedBy: "Auto",
					assignedOn: "2023-01-01",
					startDate: null,
					endDate: null,
					reason: null,
					status: "Removed",
					removedOn: "2024-02-01"
				},
				{
					userId: "U003",
					userName: "Lisa Schmidt",
					roleId: "role-3",
					roleName: "Corporate Captain",
					assignmentType: "Exception",
					assignedBy: "Admin",
					assignedOn: "2024-01-01",
					startDate: "2024-01-15",
					endDate: "2024-03-15",
					reason: "Past project",
					status: "Expired"
				},
				{
					userId: "U004",
					userName: "John Carter",
					roleId: "role-3",
					roleName: "Corporate Captain",
					assignmentType: "Default",
					assignedBy: "Auto",
					assignedOn: "2025-03-01",
					startDate: null,
					endDate: null,
					reason: null,
					status: "Active"
				},
				{
					userId: "U005",
					userName: "Maria Rossi",
					roleId: "role-4",
					roleName: "HR Admin",
					assignmentType: "Default",
					assignedBy: "Auto",
					assignedOn: "2025-04-01",
					startDate: null,
					endDate: null,
					reason: null,
					status: "Active"
				}
			];

			var oModel = this.getView().getModel();
			oModel.setProperty("/auditRecords", auditData);
		},

		onResetFiltersPress: function () {
			var oModel = this.getView().getModel();
			var filters = {
				userSearch: "",
				startDate: null,
				endDate: null,
				assignmentType: "All",
				roleId: "All"
			};
			
			oModel.setProperty("/filters", filters);
			this._applyFilters();
		},

		onExportPress: function () {
			var oModel = this.getView().getModel();
			var auditRecords = oModel.getProperty("/auditRecords");
			
			if (auditRecords.length === 0) {
				MessageToast.show("No data to export");
				return;
			}
			
			MessageToast.show("Export functionality coming soon!");
		},

		_applyFilters: function () {
			var oModel = this.getView().getModel();
			var filters = oModel.getProperty("/filters");
			var allRecords = oModel.getProperty("/auditRecords");
			
			var filteredRecords = allRecords.filter(function(record) {
				// User search filter
				if (filters.userSearch && filters.userSearch.trim() !== "") {
					var searchTerm = filters.userSearch.toLowerCase();
					if (!record.userName.toLowerCase().includes(searchTerm) && 
						!record.userId.toLowerCase().includes(searchTerm)) {
						return false;
					}
				}
				
				// Assignment type filter
				if (filters.assignmentType !== "All" && record.assignmentType !== filters.assignmentType) {
					return false;
				}
				
				// Role filter
				if (filters.roleId !== "All" && record.roleId !== filters.roleId) {
					return false;
				}
				
				// Date filters
				if (filters.startDate) {
					var assignedDate = new Date(record.assignedOn);
					var startDate = new Date(filters.startDate);
					if (assignedDate < startDate) {
						return false;
					}
				}
				
				if (filters.endDate) {
					var assignedDate = new Date(record.assignedOn);
					var endDate = new Date(filters.endDate);
					if (assignedDate > endDate) {
						return false;
					}
				}
				
				return true;
			});
			
			oModel.setProperty("/auditRecords", filteredRecords);
		}
	});
});
