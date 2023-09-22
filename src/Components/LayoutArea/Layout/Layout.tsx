import { useState } from 'react';
import Aside from '../Aside/Aside';
import Header from '../Header/Header';
import './Layout.css';
import Router from '../Router/Router';

function Layout(): JSX.Element {
  const [isOpenNav, setOpenNav] = useState<boolean>(false);

  return (
    <div className="Layout">
      <header>
        <Header setOpenNav={setOpenNav} />
      </header>
      <nav>
        <Aside isOpenNav={isOpenNav} onClose={() => setOpenNav(false)} />
      </nav>
      <main>
        <Router />
      </main>
    </div>
  );
}

export default Layout;
