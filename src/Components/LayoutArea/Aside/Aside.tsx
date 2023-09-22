import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import './Aside.css';

interface NavMenuItems {
  name: string;
  navLink: string;
  icon: React.ReactElement;
}

function Aside({
  isOpenNav,
  onClose,
}: {
  isOpenNav: boolean;
  onClose: () => void;
}): JSX.Element {
  const navMenuItems: NavMenuItems[] = [
    { name: 'Home', navLink: '/home', icon: <HomeIcon /> },
    { name: 'Products', navLink: '/products', icon: <InventoryIcon /> },
    { name: 'Employees', navLink: '/employees', icon: <GroupIcon /> },
  ];

  return (
    <Drawer anchor="left" open={isOpenNav} onClose={onClose}>
      <List sx={{ width: '200px' }}>
        {navMenuItems.map((item) => (
          <ListItem key={item.name}>
            <NavLink to={item.navLink}>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                  <ListItemText
                    primary={item.name}
                    sx={{ ml: 3 }}
                  ></ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Aside;
