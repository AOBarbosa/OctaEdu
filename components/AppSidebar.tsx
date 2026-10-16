'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Chip,
  Drawer,
  AppBar,
  Toolbar
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HexagonIcon from '@mui/icons-material/Hexagon';
import ExtensionIcon from '@mui/icons-material/Extension';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 76;

interface AppSidebarProps {
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function AppSidebar({ onCollapseChange }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  // Restore collapsed state from local preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('octaedu_sidebar_collapsed');
      if (saved !== null) {
        const val = saved === 'true';
        setCollapsed(val);
        onCollapseChange?.(val);
      }
    } catch {
      // ignore
    }
  }, [onCollapseChange]);

  const toggleCollapse = () => {
    const nextVal = !collapsed;
    setCollapsed(nextVal);
    onCollapseChange?.(nextVal);
    try {
      localStorage.setItem('octaedu_sidebar_collapsed', String(nextVal));
    } catch {
      // ignore
    }
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileClose();
    logout();
    router.push('/login');
  };

  const menuItems = [
    { label: 'Início', href: '/', icon: <HomeIcon /> },
    { label: 'Octógono Octalysis', href: '/octogono', icon: <HexagonIcon /> },
    { label: 'Técnicas de Jogos', href: '/tecnicas', icon: <ExtensionIcon /> },
    { label: 'Aplicar Gamificação', href: '/planejamento/novo', icon: <AutoAwesomeIcon />, highlight: true },
    { label: 'Meus Planos', href: '/planos', icon: <AssignmentIcon /> },
    { label: 'Recursos & Uploads', href: '/recursos', icon: <CloudUploadIcon /> },
  ];

  const sidebarContent = (isMobile = false) => {
    const isSlim = !isMobile && collapsed;

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          bgcolor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          width: isMobile ? 280 : isSlim ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
          overflowX: 'hidden'
        }}
      >
        {/* Brand Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSlim ? 'center' : 'space-between',
            px: isSlim ? 1 : 2,
            minHeight: 64,
            borderBottom: '1px solid #f1f5f9'
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                bgcolor: '#2563eb',
                color: '#ffffff',
                width: 38,
                height: 38,
                minWidth: 38,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(37,99,235,0.3)'
              }}
            >
              <SchoolIcon fontSize="small" />
            </Box>

            {!isSlim && (
              <Box sx={{ whiteSpace: 'nowrap' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3a8a', lineHeight: 1.1, fontSize: '1.1rem' }}>
                  OctaEdu
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.68rem', display: 'block', fontWeight: 500 }}>
                  Gamificação com Octalysis
                </Typography>
              </Box>
            )}
          </Link>

          {!isMobile && (
            <Tooltip title={collapsed ? 'Expandir Menu' : 'Recolher Menu'} placement="right">
              <IconButton
                onClick={toggleCollapse}
                size="small"
                sx={{
                  color: '#64748b',
                  bgcolor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  '&:hover': { bgcolor: '#f1f5f9', color: '#1e3a8a' },
                  display: isSlim ? 'none' : 'flex'
                }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Retract expand pill button when collapsed */}
        {!isMobile && isSlim && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
            <Tooltip title="Expandir Barra Lateral" placement="right">
              <IconButton
                onClick={toggleCollapse}
                size="small"
                sx={{
                  color: '#2563eb',
                  bgcolor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  width: 32,
                  height: 32,
                  '&:hover': { bgcolor: '#dbeafe' }
                }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Navigation Items */}
        <List sx={{ px: 1, py: 1.5, flexGrow: 1 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            const button = (
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => {
                  if (isMobile) setMobileOpen(false);
                }}
                selected={isActive}
                sx={{
                  minHeight: 46,
                  borderRadius: 2,
                  mb: 0.6,
                  px: isSlim ? 1.5 : 2,
                  justifyContent: isSlim ? 'center' : 'flex-start',
                  bgcolor: item.highlight && !isActive ? '#eff6ff' : isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : item.highlight ? '#1d4ed8' : '#334155',
                  fontWeight: isActive ? 700 : 500,
                  '&:hover': {
                    bgcolor: isActive ? '#1d4ed8' : '#f8fafc',
                    color: isActive ? '#ffffff' : '#1e3a8a'
                  },
                  '&.Mui-selected': {
                    bgcolor: '#2563eb',
                    color: '#ffffff',
                    '&:hover': { bgcolor: '#1d4ed8' },
                    '& .MuiListItemIcon-root': { color: '#ffffff' }
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isSlim ? 0 : 38,
                    mr: isSlim ? 0 : 1,
                    justifyContent: 'center',
                    color: isActive ? '#ffffff' : item.highlight ? '#2563eb' : '#64748b'
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {!isSlim && (
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 500 }}>
                        {item.label}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
            );

            return (
              <ListItem key={item.href} disablePadding>
                {isSlim ? (
                  <Tooltip title={item.label} placement="right" arrow>
                    <Box sx={{ width: '100%' }}>{button}</Box>
                  </Tooltip>
                ) : (
                  button
                )}
              </ListItem>
            );
          })}
        </List>

        {/* FOOTER SECTION: Profile Icon MUST BE THE LAST ITEM */}
        <Box sx={{ mt: 'auto', p: 1.2, borderTop: '1px solid #f1f5f9' }}>
          {currentUser ? (
            <>
              {isSlim ? (
                <Tooltip title={`Perfil: ${currentUser.name} (Clique para opções)`} placement="right" arrow>
                  <IconButton
                    onClick={handleProfileClick}
                    sx={{
                      width: 48,
                      height: 48,
                      mx: 'auto',
                      display: 'flex',
                      borderRadius: 2,
                      border: '2px solid #2563eb',
                      p: 0.5,
                      '&:hover': { bgcolor: '#eff6ff' }
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: '#2563eb',
                        fontSize: '0.95rem',
                        fontWeight: 700
                      }}
                    >
                      {currentUser.name.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Box
                  onClick={handleProfileClick}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    border: '1px solid #e2e8f0',
                    bgcolor: '#f8fafc',
                    transition: 'all 0.2s',
                    '&:hover': { bgcolor: '#f1f5f9', borderColor: '#cbd5e1' }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      bgcolor: '#2563eb',
                      fontSize: '0.95rem',
                      fontWeight: 700
                    }}
                  >
                    {currentUser.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentUser.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {currentUser.subject || 'Professor(a)'}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Profile Context Dropdown Menu */}
              <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileClose}
                transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: isSlim ? 'right' : 'left', vertical: 'top' }}
                slotProps={{
                  paper: {
                    sx: {
                      mb: 1,
                      ml: isSlim ? 1 : 0,
                      minWidth: 230,
                      boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                      borderRadius: 2.5
                    }
                  }
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {currentUser.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b', wordBreak: 'break-all' }}>
                    {currentUser.email}
                  </Typography>
                  {currentUser.school && (
                    <Chip size="small" label={currentUser.school} sx={{ mt: 1, fontSize: '0.68rem', maxWidth: '100%' }} />
                  )}
                </Box>

                <Divider />

                <MenuItem
                  component={Link}
                  href="/planos"
                  onClick={() => {
                    handleProfileClose();
                    if (isMobile) setMobileOpen(false);
                  }}
                >
                  <ListItemIcon><AssignmentIcon fontSize="small" /></ListItemIcon>
                  Meus Planejamentos
                </MenuItem>

                <MenuItem
                  component={Link}
                  href="/recursos"
                  onClick={() => {
                    handleProfileClose();
                    if (isMobile) setMobileOpen(false);
                  }}
                >
                  <ListItemIcon><CloudUploadIcon fontSize="small" /></ListItemIcon>
                  Meus Materiais & Uploads
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout} sx={{ color: '#ef4444' }}>
                  <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} /></ListItemIcon>
                  Sair da Conta
                </MenuItem>
              </Menu>
            </>
          ) : (
            // If not logged in, profile icon at bottom provides login/register options
            <Box sx={{ display: 'flex', flexDirection: isSlim ? 'column' : 'row', gap: 1 }}>
              {isSlim ? (
                <Tooltip title="Fazer Login" placement="right" arrow>
                  <IconButton
                    component={Link}
                    href="/login"
                    sx={{ width: 44, height: 44, mx: 'auto', bgcolor: '#eff6ff', color: '#2563eb' }}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <ListItemButton
                    component={Link}
                    href="/login"
                    sx={{ borderRadius: 2, border: '1px solid #cbd5e1', textAlign: 'center', py: 0.8 }}
                  >
                    <ListItemText primary={<Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>Entrar</Typography>} />
                  </ListItemButton>
                  <ListItemButton
                    component={Link}
                    href="/cadastro"
                    sx={{ borderRadius: 2, bgcolor: '#2563eb', color: '#ffffff', textAlign: 'center', py: 0.8, '&:hover': { bgcolor: '#1d4ed8' } }}
                  >
                    <ListItemText primary={<Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>Cadastrar</Typography>} />
                  </ListItemButton>
                </>
              )}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <>
      {/* Mobile Top App Bar (visible only on mobile xs/sm) */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          display: { xs: 'flex', md: 'none' },
          bgcolor: '#ffffff',
          color: '#0f172a',
          borderBottom: '1px solid #e2e8f0',
          zIndex: 1100
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ color: '#334155' }}>
              <MenuIcon />
            </IconButton>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Box
                sx={{
                  bgcolor: '#2563eb',
                  color: '#ffffff',
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <SchoolIcon sx={{ fontSize: 18 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1.05rem' }}>
                OctaEdu
              </Typography>
            </Link>
          </Box>

          {/* Quick Profile Icon on Mobile Top Bar */}
          {currentUser ? (
            <IconButton onClick={handleProfileClick} size="small">
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#2563eb', fontSize: '0.85rem' }}>
                {currentUser.name.charAt(0)}
              </Avatar>
            </IconButton>
          ) : (
            <IconButton component={Link} href="/login" size="small" sx={{ color: '#2563eb' }}>
              <AccountCircleIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {sidebarContent(true)}
      </Drawer>

      {/* Desktop Persistent Retractable Sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 1000,
          flexShrink: 0
        }}
      >
        {sidebarContent(false)}
      </Box>
    </>
  );
}
