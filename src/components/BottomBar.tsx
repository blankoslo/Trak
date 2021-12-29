import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';

const BottomBar = () => {
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction icon={<GroupIcon color='primary' />} label='Ansatte' sx={{ color: 'primary.main' }} />
        <BottomNavigationAction icon={<TaskAltIcon color='primary' />} label='Oppgaver' sx={{ color: 'primary.main' }} />
        <BottomNavigationAction icon={<SettingsIcon color='primary' />} label='Innstillinger' sx={{ color: 'primary.main' }} />
      </BottomNavigation>
    </Box>
  );
};

export default BottomBar;