import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { useRouter } from 'next/router';

const BottomBar = () => {
  const router = useRouter();
  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation showLabels>
        <BottomNavigationAction icon={<HomeIcon color='primary' />} label='Hjem' onClick={() => router.push('/')} sx={{ color: 'primary.main' }} />
        <BottomNavigationAction
          icon={<AddTaskIcon color='primary' />}
          label='Prosessmal'
          onClick={() => router.push('/prosessmal')}
          sx={{ color: 'primary.main' }}
        />
        <BottomNavigationAction icon={<SettingsIcon color='primary' />} label='Innstillinger' sx={{ color: 'primary.main' }} />
      </BottomNavigation>
    </Box>
  );
};

export default BottomBar;
