import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

export const ROLE_PERMISSIONS = {
  Worker: {
    canViewDashboard: false,
    canViewWorkerHUD: true,
    canViewSafetyHUD: false,
    canUploadIncident: true,
    canScanQr: true,
    canManageTickets: false,
    canExportReports: false,
  },
  'Safety Officer': {
    canViewDashboard: false,
    canViewWorkerHUD: false,
    canViewSafetyHUD: true,
    canUploadIncident: true,
    canScanQr: true,
    canManageTickets: true,
    canExportReports: true,
  },
  'Plant Manager': {
    canViewDashboard: true,
    canViewWorkerHUD: true,
    canViewSafetyHUD: true,
    canUploadIncident: true,
    canScanQr: true,
    canManageTickets: true,
    canExportReports: true,
  },
};

const RoleContext = createContext({
  activeRole: 'Plant Manager',
  permissions: ROLE_PERMISSIONS['Plant Manager'],
  hasPermission: () => true,
  switchRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const { user } = useAuth();

  const [activeRole, setActiveRole] = useState(user?.role || 'Plant Manager');

  const permissions = ROLE_PERMISSIONS[activeRole] || ROLE_PERMISSIONS['Plant Manager'];

  const hasPermission = (permissionKey) => {
    return !!permissions[permissionKey];
  };

  const switchRole = (newRole) => {
    if (ROLE_PERMISSIONS[newRole]) {
      setActiveRole(newRole);
    }
  };

  return (
    <RoleContext.Provider
      value={{
        activeRole,
        permissions,
        hasPermission,
        switchRole,
        availableRoles: Object.keys(ROLE_PERMISSIONS),
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
