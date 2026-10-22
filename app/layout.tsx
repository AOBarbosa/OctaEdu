import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import MuiProvider from '../components/MuiProvider';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import AppSidebar from '../components/AppSidebar';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OctaEdu - Gamificação Pedagógica com Octalysis',
  description: 'Apoio a professores na concepção e aplicação de gamificação educacional baseada no framework Octalysis de Yu-kai Chou.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-900 font-sans">
        <MuiProvider>
          <AuthProvider>
            <ToastProvider>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  minHeight: '100vh',
                  bgcolor: '#f8fafc'
                }}
              >
                <AppSidebar />
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    overflowX: 'hidden'
                  }}
                >
                  <Box component="main" sx={{ flex: 1 }}>
                    {children}
                  </Box>
                  <Footer />
                </Box>
              </Box>
            </ToastProvider>
          </AuthProvider>
        </MuiProvider>
      </body>
    </html>
  );
}
