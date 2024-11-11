import React, { ReactNode } from 'react';
import Header from './@pages/header';
import Footer from './@pages/footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>  
      <Footer />
    </div>
  );
}

export default Layout;
