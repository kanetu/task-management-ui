import { USER_PERMISSIONS } from 'src/app/constants/user-permissions';

export const hasPermission = (permission: string) => {
  const permissions = JSON.parse(
    localStorage.getItem(USER_PERMISSIONS) || '[]',
  );
  return permissions.includes(permission);
};
