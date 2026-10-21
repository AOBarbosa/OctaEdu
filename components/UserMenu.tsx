'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Box, ButtonBase, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';

interface UserMenuProps {
  compact?: boolean;
}

export default function UserMenu({ compact = false }: Readonly<UserMenuProps>) {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!currentUser) return null;

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    router.push('/login');
  };

  return (
    <>
      <ButtonBase
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorEl)}
        aria-label={`Menu de ${currentUser.name}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: compact ? 0.5 : 1,
          width: compact ? 'auto' : '100%',
          justifyContent: compact ? 'center' : 'flex-start',
          borderRadius: compact ? '50%' : 2,
          textAlign: 'left',
          transition: 'background-color 0.2s',
          '&:hover': { bgcolor: '#f1f5f9' },
        }}
      >
        <Avatar sx={{ width: 40, height: 40, bgcolor: '#2563eb', fontWeight: 700 }}>
          {currentUser.name.charAt(0).toUpperCase()}
        </Avatar>
        {!compact && (
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {currentUser.name}
            </Typography>
            <Typography
              sx={{ color: '#64748b', fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {currentUser.email}
            </Typography>
          </Box>
        )}
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: compact ? 'right' : 'left', vertical: compact ? 'bottom' : 'top' }}
        transformOrigin={{ horizontal: compact ? 'right' : 'left', vertical: compact ? 'top' : 'bottom' }}
        slotProps={{ paper: { sx: { minWidth: 180, borderRadius: 2, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' } } }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{ color: '#dc2626', fontWeight: 600, '&:hover': { bgcolor: '#fef2f2' } }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: '#dc2626' }} />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
}
