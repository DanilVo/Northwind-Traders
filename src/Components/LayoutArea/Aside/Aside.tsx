import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
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
      <List sx={{ width: "200px" }}>
        <Typography variant="h4" paddingLeft={4}>
          Menu
        </Typography>
        <Divider />
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
        <Divider />
      </List>
    </Drawer>
  );
}

export default Aside;
