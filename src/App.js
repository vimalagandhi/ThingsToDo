import React, { useState, useContext, useRef } from "react";
import classNames from "classnames";
import { AppMenu } from "./AppMenu";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { ScrollPanel } from "primereact/components/scrollpanel/ScrollPanel";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./layout/layout.css";
import "./App.css";

import { EnumContext } from "./context/EnumContext";

const App = () => {
  
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const layoutMenuScroller = useRef(null);
  const sidebar = useRef(null);
  const {
    appMenu
  } = useContext(EnumContext);

  const onSidebarClick = (event) => {
    event.menuClick = true;
    setTimeout(() => {
      layoutMenuScroller.current && layoutMenuScroller.current.moveBar();
    }, 500);
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  let menu;

  const basicmenu = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location = "#/";
      },
    }
  ];
  menu = [...basicmenu, ...appMenu];
  
  let wrapperClass = classNames("layout-wrapper", {
    "layout-overlay": layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive":
      staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active":
      overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
  });
  let sidebarClassName = classNames("layout-sidebar", {
    "layout-sidebar-dark": layoutColorMode === "dark",
  });

  return (
    <div className={wrapperClass} >
      <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
        <ScrollPanel ref={layoutMenuScroller} style={{ height: "100%" }}>
          <div className="layout-sidebar-scroll-content">
            <div className="layout-logo">
            </div>
            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
          </div>
        </ScrollPanel>
      </div>
      <div className="layout-main">
        <Switch>
          <Route path="/" exact component={Dashboard} />
        </Switch>
      </div>

      <div className="layout-mask" />
    </div>
  );
};

export default App;
