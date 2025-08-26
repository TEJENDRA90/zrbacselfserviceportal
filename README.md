# RBAC Self-Service Portal - UI5 Version

This is a UI5-based Role-Based Access Control (RBAC) Self-Service Portal converted from the original React application.

## Overview

The RBAC Self-Service Portal provides comprehensive management tools for user access controls, including:

- **Dashboard**: Overview with statistics and quick actions
- **Role Management**: Create, edit, and manage roles with detailed permissions
- **Default Assignments**: Configure automated role assignment rules
- **Exception Handling**: Manage manual role assignments and exceptions
- **Audit Reports**: Generate comprehensive audit trails with filtering

## Features

### 🎯 Core Functionality
- **Role Definition**: Create roles with granular permissions
- **Application Access Control**: Manage Read/Write access to different applications
- **Attribute-Based Permissions**: Configure permissions based on company, function, operation, ship, department, and job title
- **Write Restrictions**: Set time-based write restrictions for data integrity
- **Day Type Access**: Control access based on specific day types (W, W1, V, etc.)

### 🔐 Security Features
- **Default Assignment Rules**: Automated role assignment based on job titles and attributes
- **Exception Management**: Manual role assignments with audit trails
- **Status Tracking**: Monitor Active, Expired, and Removed role assignments
- **Audit Logging**: Complete history of all role assignments and changes

### 📊 Reporting & Analytics
- **Real-time Statistics**: Dashboard with key metrics
- **Filterable Audit Reports**: Search and filter audit data by various criteria
- **Export Capabilities**: Export data in multiple formats (planned)
- **User Activity Tracking**: Monitor user role assignments and changes

## Architecture

### Frontend Structure
```
webapp/
├── view/                    # UI5 Views
│   ├── App.view.xml        # Main application shell
│   ├── Dashboard.view.xml  # Dashboard overview
│   ├── Roles.view.xml      # Role management
│   ├── RoleEdit.view.xml   # Role creation/editing
│   ├── Assignments.view.xml # Default assignments
│   ├── Exceptions.view.xml # Exception handling
│   ├── UserRoles.view.xml  # Individual user management
│   └── Audit.view.xml      # Audit reports
├── controller/              # UI5 Controllers
│   ├── App.controller.js   # Main app controller
│   ├── Dashboard.controller.js
│   ├── Roles.controller.js
│   ├── RoleEdit.controller.js
│   ├── Assignments.controller.js
│   ├── Exceptions.controller.js
│   ├── UserRoles.controller.js
│   └── Audit.controller.js
├── manifest.json           # Application configuration
└── Component.js            # Main component
```

### Data Models
- **JSON Models**: Local data management for demonstration
- **Mock Data**: Sample data for testing and development
- **Service Integration Ready**: Prepared for backend service integration

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- UI5 CLI tools

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
1. Start the development server:
   ```bash
   npm run build
   ```

2. Open the application in your browser

### Building for Production
```bash
npm run build
```

## Usage

### Navigation
The application uses a sidebar navigation with the following sections:

1. **Dashboard**: Overview and quick actions
2. **Role Management**: Manage system roles
3. **Default Assignments**: Configure automated rules
4. **Exception Handling**: Manage manual assignments
5. **Audit Report**: Generate audit trails

### Creating Roles
1. Navigate to Role Management
2. Click "Create Role"
3. Fill in basic information
4. Configure application access
5. Set permissions and restrictions
6. Save the role

### Managing Exceptions
1. Go to Exception Handling
2. Search for users
3. Click "Manage Roles" for a specific user
4. Add or remove role assignments
5. Set validity periods and reasons

### Generating Audit Reports
1. Navigate to Audit Report
2. Apply filters as needed
3. View filtered results
4. Export data (planned feature)

## Configuration

### UI5 Libraries
The application uses the following UI5 libraries:
- `sap.m`: Standard UI controls
- `sap.ui.layout`: Layout controls
- `sap.ui.table`: Data tables
- `sap.ui.unified`: Advanced controls
- `sap.f`: Flexible layout controls

### Routing
The application implements client-side routing with the following routes:
- `/` - Dashboard
- `/roles` - Role Management
- `/roles/new` - Create New Role
- `/roles/:id` - Edit Role
- `/assignments` - Default Assignments
- `/exceptions` - Exception Handling
- `/exceptions/:userId` - User Role Management
- `/audit` - Audit Reports

## Data Structure

### Role Model
```javascript
{
  id: string,
  name: string,
  description: string,
  permissions: Permission[],
  writeRestrictionDays: number | null,
  functionalityAccess: "Planning View" | "Scheduling View" | "Both",
  dayTypeAccess: string[],
  appAccess: AppAccess[]
}
```

### User Model
```javascript
{
  id: string,
  name: string,
  jobTitle: string,
  department: string,
  roles: UserRole[]
}
```

### Assignment Rule Model
```javascript
{
  id: string,
  jobTitle: string,
  roleIds: string[],
  company?: string,
  function?: string,
  operation?: string,
  ship?: string,
  department?: string
}
```

## Future Enhancements

### Planned Features
- [ ] Excel/CSV export functionality
- [ ] PDF report generation
- [ ] Advanced filtering and search
- [ ] Bulk operations
- [ ] Email notifications
- [ ] Workflow approvals
- [ ] Integration with external systems

### Backend Integration
- [ ] REST API integration
- [ ] Database connectivity
- [ ] Authentication and authorization
- [ ] Real-time data synchronization
- [ ] Performance optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary and confidential.

## Support

For support and questions, please contact the development team.

---

**Note**: This is a converted application from React to UI5. Some features may be in development or demonstration mode. The application is designed to be easily extensible and integratable with backend services.
