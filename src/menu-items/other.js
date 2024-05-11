// assets
import { IconSettings } from '@tabler/icons-react';

// constant
const icons = { IconSettings };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
  
    {
      id: 'documentation',
      title: 'Profil',
      type: 'item',
      url: 'https://codedthemes.gitbook.io/berry/',
      icon: icons.IconSettings,
      external: true,
      target: true
    }
  ]
};

export default other;
