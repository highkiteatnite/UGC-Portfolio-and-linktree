import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { Nav } from "./components/Nav";
import SunsetBackground from "./components/SunsetBackground";
import { LinksPage, LinkState } from "./pages/LinksPage";
import { PortfolioPage } from "./pages/PortfolioPage";

function MainApp() {
  const [activeTab, setActiveTab] = useState<"links" | "portfolio">("links");
  const [linkState, setLinkState] = useState<LinkState>("home");

  const handleLogoClick = () => {
    setActiveTab("links");
    setLinkState("home");
    window.scrollTo(0, 0);
  };

  const handleWorkWithMe = () => {
    setActiveTab("links");
    setLinkState("brand");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-[100dvh] w-full relative selection:bg-[#ffc228]/30">
      <SunsetBackground />
      
      <Nav 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo(0, 0);
        }}
        onLogoClick={handleLogoClick}
        onWorkWithMe={handleWorkWithMe}
      />

      <main className="relative z-10 w-full">
        {activeTab === "links" ? (
          <LinksPage linkState={linkState} setLinkState={setLinkState} />
        ) : (
          <PortfolioPage />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
      <Switch>
        <Route path="/" component={MainApp} />
        <Route>
          {/* Fallback to main app for any other routes since it's a single page */}
          <MainApp />
        </Route>
      </Switch>
    </WouterRouter>
  );
}
