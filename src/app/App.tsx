import React, { useState } from 'react';
import { ScreenType, TabType } from './types';

// Layout
import { BottomNav } from './components/layout/BottomNav';

// Screens: Explore
import { GymsTab } from './components/screens/explore/GymsTab';
import { GymDetailScreen } from './components/screens/explore/GymDetailScreen';
import { GettingStartedScreen } from './components/screens/explore/GettingStartedScreen';

// Screens: Social
import { PartnersTab } from './components/screens/social/PartnersTab';
import { ChatScreen } from './components/screens/social/ChatScreen';
import { AddPartnerScreen } from './components/screens/social/AddPartnerScreen';
import { PartnerProfileScreen } from './components/screens/social/PartnerProfileScreen';

// Screens: Journey
import { ProgressTab } from './components/screens/journey/ProgressTab';
import { BoostTab } from './components/screens/boost/BoostTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('gyms');
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [screenData, setScreenData] = useState<any>(null);

  const navigate = (screen: string, data?: any) => {
    setScreenData(data ?? null);
    setActiveScreen(screen as ScreenType);
  };

  const switchTab = (tab: TabType) => setActiveTab(tab);

  const goHome = () => {
    setActiveScreen('home');
    setScreenData(null);
  };

  return (
    <div className="min-h-screen bg-[#E2E8F0] flex flex-col items-center justify-center p-4 font-sans selection:bg-teal-200">

      {/* App Title */}
      <div className="mb-5 text-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Climbuddy</h1>
        <span className="text-slate-600 font-bold text-xs bg-white border-2 border-slate-900 inline-block px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          Emma's Journey Prototype
        </span>
      </div>

      {/* Phone Frame */}
      <div className="w-[390px] h-[844px] bg-white border-[6px] border-slate-900 rounded-[3.5rem] shadow-[16px_16px_0px_0px_rgba(15,23,42,0.12)] relative overflow-hidden flex flex-col ring-8 ring-slate-300/40">

        {/* Notch */}
        <div className="absolute top-0 inset-x-0 h-7 bg-white z-50 flex justify-center items-end pb-1.5">
          <div className="w-20 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Screen */}
        <div className="flex-1 w-full bg-[#F8FAFC] relative overflow-hidden flex flex-col pt-7">
          <div className="flex-1 overflow-hidden relative">

            {/* Home tabs */}
            {activeScreen === 'home' && (
              <div className="h-full overflow-y-auto custom-scrollbar">
                {activeTab === 'gyms'     && <GymsTab onNavigate={navigate} switchTab={switchTab} />}
                {activeTab === 'partners' && <PartnersTab onNavigate={navigate} switchTab={switchTab} />}
                {activeTab === 'progress' && <ProgressTab onNavigate={navigate} switchTab={switchTab} />}
                {activeTab === 'boost'     && <BoostTab onNavigate={navigate} switchTab={switchTab} />}
              </div>
            )}

            {/* Detail screens */}
            {activeScreen === 'gymDetail'      && <GymDetailScreen gym={screenData} onBack={goHome} onNavigate={navigate} />}
            {activeScreen === 'gettingStarted' && <GettingStartedScreen onBack={goHome} />}
            {activeScreen === 'chat'           && <ChatScreen partner={screenData} onBack={goHome} />}
            {activeScreen === 'addPartner'     && <AddPartnerScreen onBack={goHome} />}
            {activeScreen === 'partnerProfile' && (
              <PartnerProfileScreen
                partner={screenData}
                onBack={goHome}
                onChat={() => navigate('chat', screenData)}
                onMatch={() => navigate('chat', screenData)}
              />
            )}
          </div>

          {/* Bottom Nav — only on home */}
          {activeScreen === 'home' && (
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900 rounded-full opacity-15 z-50 pointer-events-none" />
      </div>
    </div>
  );
}
