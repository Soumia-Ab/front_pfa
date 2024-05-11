// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconTypography, IconUser, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = { IconDashboard ,IconTypography, IconUser, IconShadow, IconWindmill};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'util-typography',
      title: 'Annonces ',
      type: 'item',
      url: '/utils/util-typography',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Utilisateur',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Catégorie',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'icons',
      title: 'Sous categorie',
      type: 'item',
      icon: icons.IconWindmill,
    
    }
  
  ]
};

export default dashboard;
