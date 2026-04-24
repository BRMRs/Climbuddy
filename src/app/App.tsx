import React, { useEffect, useRef, useState } from 'react';
import {
  SESSIONS,
  CALENDAR_EVENTS,
  VENUE_REVIEWS,
  COACH_REVIEWS,
  PARTNER_REVIEWS,
  CHAT_HISTORY,
  MY_PREFERENCES,
  DAILY_PLAN,
  PAST_PARTNERS_MESSAGES,
} from './data/mockData';
import {
  SessionLog,
  CalendarEvent,
  VenueReview,
  CoachReview,
  PartnerReview,
  ChatHistoryItem,
  MyPreferences,
  Message,
  MeetingProposal,
  DailyTask,
  Partner,
} from './types';
import { ScreenType, TabType } from './types';
import { useOnboarding } from './hooks/useOnboarding';
import { WelcomeCards } from './components/onboarding/WelcomeCards';
import { SpotlightTour } from './components/onboarding/SpotlightTour';

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
import { CourseDetailScreen } from './components/screens/boost/CourseDetailScreen';
import { AICoachChatScreen } from './components/screens/boost/AICoachChatScreen';
import { CoachDetailScreen } from './components/coach/CoachDetailScreen';
import { Course, Coach } from './types';

type ChatMessagesByThread = Record<string, Message[]>;

interface DomainState {
  sessions: SessionLog[];
  calendarEvents: CalendarEvent[];
  venueReviews: VenueReview[];
  coachReviews: CoachReview[];
  partnerReviews: PartnerReview[];
  purchasedCourseIds: string[];
  chatHistory: ChatHistoryItem[];
  myPreferences: MyPreferences;
  chatMessagesByThread: ChatMessagesByThread;
  dailyTasks: DailyTask[];
  userName: string;
  userPortrait: string;
}

const DOMAIN_STORAGE_KEY = 'climbuddy_domain_state_v6';

const DEFAULT_DOMAIN_STATE: DomainState = {
  sessions: SESSIONS,
  calendarEvents: CALENDAR_EVENTS,
  venueReviews: VENUE_REVIEWS,
  coachReviews: COACH_REVIEWS,
  partnerReviews: PARTNER_REVIEWS,
  purchasedCourseIds: ['crs-warmup', 'crs-stretch', 'crs-recovery', 'crs-plateau'],
  chatHistory: CHAT_HISTORY,
  myPreferences: MY_PREFERENCES,
  chatMessagesByThread: PAST_PARTNERS_MESSAGES,
  dailyTasks: DAILY_PLAN,
  userName: 'Emma',
  userPortrait: '',
};

function loadDomainState(): DomainState {
  try {
    const raw = localStorage.getItem(DOMAIN_STORAGE_KEY);
    if (!raw) return DEFAULT_DOMAIN_STATE;
    const parsed = JSON.parse(raw) as Partial<DomainState>;
    return {
      ...DEFAULT_DOMAIN_STATE,
      ...parsed,
      sessions: parsed.sessions ?? DEFAULT_DOMAIN_STATE.sessions,
      calendarEvents: parsed.calendarEvents ?? DEFAULT_DOMAIN_STATE.calendarEvents,
      venueReviews: parsed.venueReviews ?? DEFAULT_DOMAIN_STATE.venueReviews,
      coachReviews: parsed.coachReviews ?? DEFAULT_DOMAIN_STATE.coachReviews,
      partnerReviews: parsed.partnerReviews ?? DEFAULT_DOMAIN_STATE.partnerReviews,
      purchasedCourseIds: parsed.purchasedCourseIds ?? DEFAULT_DOMAIN_STATE.purchasedCourseIds,
      chatHistory: parsed.chatHistory ?? DEFAULT_DOMAIN_STATE.chatHistory,
      myPreferences: parsed.myPreferences ?? DEFAULT_DOMAIN_STATE.myPreferences,
      chatMessagesByThread: parsed.chatMessagesByThread ?? DEFAULT_DOMAIN_STATE.chatMessagesByThread,
      dailyTasks: parsed.dailyTasks ?? DEFAULT_DOMAIN_STATE.dailyTasks,
      userName: parsed.userName ?? DEFAULT_DOMAIN_STATE.userName,
      userPortrait: parsed.userPortrait ?? DEFAULT_DOMAIN_STATE.userPortrait,
    };
  } catch {
    return DEFAULT_DOMAIN_STATE;
  }
}

function toUniqueHistory(history: ChatHistoryItem[]): ChatHistoryItem[] {
  const map = new Map<string, ChatHistoryItem>();
  history.forEach(item => {
    map.set(item.partnerId, item);
  });
  return Array.from(map.values());
}

function getThreadId(data: unknown, isCoach = false): string {
  const entity = data as { id?: string; name?: string } | null;
  const base = entity?.id ?? entity?.name ?? 'unknown';
  return isCoach ? `coach:${base}` : `partner:${base}`;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('gyms');
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [screenData, setScreenData] = useState<any>(null);
  const [domainState, setDomainState] = useState<DomainState>(loadDomainState);

  const { showWelcome, showTour, completeWelcome, skipWelcome, completeTour, skipTour, resetOnboarding } = useOnboarding();
  const [tourReady, setTourReady] = useState(false);

  React.useEffect(() => {
    if (!showWelcome && showTour) {
      const t = setTimeout(() => setTourReady(true), 300);
      return () => clearTimeout(t);
    } else {
      setTourReady(false);
    }
  }, [showWelcome, showTour]);

  useEffect(() => {
    try {
      localStorage.setItem(DOMAIN_STORAGE_KEY, JSON.stringify(domainState));
    } catch {
    }
  }, [domainState]);

  const addSession = (session: SessionLog) => {
    setDomainState(prev => ({ ...prev, sessions: [session, ...prev.sessions] }));
  };

  const addReview = (review: VenueReview) => {
    setDomainState(prev => ({ ...prev, venueReviews: [...prev.venueReviews, review] }));
  };

  const addCoachReview = (review: CoachReview) => {
    setDomainState(prev => ({ ...prev, coachReviews: [...prev.coachReviews, review] }));
  };

  const addPartnerReview = (review: PartnerReview) => {
    setDomainState(prev => ({ ...prev, partnerReviews: [...prev.partnerReviews, review] }));
  };

  const markEventReviewed = (eventId: string) => {
    setDomainState(prev => ({
      ...prev,
      calendarEvents: prev.calendarEvents.map(e => (e.id === eventId ? { ...e, isReviewed: true } : e)),
    }));
  };

  const onPurchase = (courseId: string) => {
    setDomainState(prev => {
      if (prev.purchasedCourseIds.includes(courseId)) return prev;
      return { ...prev, purchasedCourseIds: [...prev.purchasedCourseIds, courseId] };
    });
  };

  const toggleDailyTask = (taskId: string) => {
    setDomainState(prev => ({
      ...prev,
      dailyTasks: prev.dailyTasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    }));
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id' | 'isExpired' | 'isReviewed'>) => {
    setDomainState(prev => ({
      ...prev,
      calendarEvents: [
        {
          id: `ev-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
          isExpired: false,
          isReviewed: false,
          ...event,
        },
        ...prev.calendarEvents,
      ],
    }));
  };

  const updateChatHistory = (updater: (current: ChatHistoryItem[]) => ChatHistoryItem[]) => {
    setDomainState(prev => ({ ...prev, chatHistory: toUniqueHistory(updater(prev.chatHistory)) }));
  };

  const upsertChatHistory = (partnerId: string, patch: Partial<ChatHistoryItem>) => {
    updateChatHistory(current => {
      const existing = current.find(item => item.partnerId === partnerId);
      if (existing) {
        return current.map(item => (item.partnerId === partnerId ? { ...item, ...patch, partnerId } : item));
      }
      return [
        {
          partnerId,
          lastMessage: patch.lastMessage ?? '',
          time: patch.time ?? 'Now',
          unread: patch.unread ?? 0,
          sessionStatus: patch.sessionStatus,
          sessionDate: patch.sessionDate,
          sessionGym: patch.sessionGym,
          sessionSlot: patch.sessionSlot,
        },
        ...current,
      ];
    });
  };

  const setPreferences = (preferences: MyPreferences) => {
    setDomainState(prev => ({ ...prev, myPreferences: preferences }));
  };

  const setThreadMessages = (threadId: string, messages: Message[]) => {
    setDomainState(prev => ({
      ...prev,
      chatMessagesByThread: {
        ...prev.chatMessagesByThread,
        [threadId]: messages,
      },
    }));
  };

  const handlePartnerMessageUpdate = (partner: Partner, lastMessage: string, time: string) => {
    upsertChatHistory(partner.id, { lastMessage, time, unread: 0 });
  };

  const handleProposalAccepted = (partner: Partner, proposal: MeetingProposal) => {
    addCalendarEvent({
      date: proposal.date,
      type: 'social',
      gymId: proposal.gymId,
      gymName: proposal.gym,
      partnerName: partner.name,
      slot: proposal.slot,
    });
    upsertChatHistory(partner.id, {
      sessionStatus: 'upcoming',
      sessionDate: proposal.date,
      sessionGym: proposal.gym,
      sessionSlot: proposal.slot,
      unread: 0,
      lastMessage: `Confirmed: ${proposal.gym} · ${proposal.date} · ${proposal.slot}`,
      time: 'Now',
    });
  };

  const navigate = (screen: string, data?: any) => {
    setScreenData(data ?? null);
    setActiveScreen(screen as ScreenType);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goHome = () => {
    setActiveScreen('home');
    setScreenData(null);
  };

  return (
    <div className="min-h-screen bg-[#E2E8F0] md:flex md:flex-col md:items-center md:justify-center md:p-4 font-sans selection:bg-teal-200">

      {/* App Title */}
      <div className="hidden md:block mb-5 text-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Climbuddy</h1>
        <span className="text-slate-600 font-bold text-xs bg-white border-2 border-slate-900 inline-block px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
          {domainState.userName}'s Journey Prototype
        </span>
      </div>

      {/* Phone Frame */}
      <div className="w-full h-screen md:w-[390px] md:h-[844px] bg-white md:border-[6px] md:border-slate-900 md:rounded-[3.5rem] md:shadow-[16px_16px_0px_0px_rgba(15,23,42,0.12)] relative overflow-hidden flex flex-col md:ring-8 md:ring-slate-300/40">

        {/* Notch */}
        <div className="hidden md:flex absolute top-0 inset-x-0 h-7 bg-white z-50 justify-center items-end pb-1.5">
          <div className="w-20 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Screen */}
        <div className="flex-1 w-full bg-[#F8FAFC] relative overflow-hidden flex flex-col md:pt-7">
          <div className="flex-1 overflow-hidden relative">

            {/* Home tabs */}
            {activeScreen === 'home' && (
              <div ref={scrollContainerRef} className="h-full overflow-y-auto custom-scrollbar">
                {activeTab === 'gyms'     && <GymsTab onNavigate={navigate} switchTab={switchTab} />}
                {activeTab === 'partners' && (
                  <PartnersTab
                    onNavigate={navigate}
                    switchTab={switchTab}
                    chatHistory={domainState.chatHistory}
                    onChatHistoryChange={(next) => setDomainState(prev => ({ ...prev, chatHistory: toUniqueHistory(next) }))}
                    preferences={domainState.myPreferences}
                    onPreferencesChange={setPreferences}
                    userPortrait={domainState.userPortrait || undefined}
                  />
                )}
                {activeTab === 'progress' && (
                  <ProgressTab
                    onNavigate={navigate}
                    switchTab={switchTab}
                    sessions={domainState.sessions}
                    calendarEvents={domainState.calendarEvents}
                    addSession={addSession}
                    addReview={addReview}
                    addCoachReview={addCoachReview}
                    addPartnerReview={addPartnerReview}
                    markEventReviewed={markEventReviewed}
                    onResetOnboarding={resetOnboarding}
                    userName={domainState.userName}
                    onUserNameChange={(name) => setDomainState(prev => ({ ...prev, userName: name }))}
                    userPortrait={domainState.userPortrait || undefined}
                    onPortraitChange={(url) => setDomainState(prev => ({ ...prev, userPortrait: url }))}
                  />
                )}
                {activeTab === 'boost'     && (
                  <BoostTab
                    onNavigate={navigate}
                    switchTab={switchTab}
                    purchasedCourseIds={domainState.purchasedCourseIds}
                    onPurchase={onPurchase}
                    tasks={domainState.dailyTasks}
                    onToggleTask={toggleDailyTask}
                  />
                )}
              </div>
            )}

            {/* Detail screens */}
            {activeScreen === 'gymDetail'      && (
              <GymDetailScreen
                gym={screenData}
                onBack={goHome}
                onNavigate={navigate}
                venueReviews={domainState.venueReviews}
                onCreateCalendarEvent={(event) => addCalendarEvent(event)}
                userName={domainState.userName}
              />
            )}
            {activeScreen === 'gettingStarted' && <GettingStartedScreen onBack={goHome} switchTab={switchTab} onNavigateToBoost={() => { switchTab('boost'); goHome(); }} userName={domainState.userName} />}
            {activeScreen === 'chat'           && (
              <ChatScreen
                partner={screenData}
                onBack={goHome}
                initialMessages={domainState.chatMessagesByThread[getThreadId(screenData)]}
                onMessagesChange={(messages) => setThreadMessages(getThreadId(screenData), messages)}
                onLastMessage={(lastMessage, time) => handlePartnerMessageUpdate(screenData as Partner, lastMessage, time)}
                onMeetingAccepted={(proposal) => handleProposalAccepted(screenData as Partner, proposal)}
                userName={domainState.userName}
              />
            )}
            {activeScreen === 'coachChat'     && (
              <ChatScreen
                partner={screenData}
                onBack={() => navigate('coachDetail', screenData)}
                initialMessages={domainState.chatMessagesByThread[getThreadId(screenData, true)]}
                onMessagesChange={(messages) => setThreadMessages(getThreadId(screenData, true), messages)}
              />
            )}
            {activeScreen === 'addPartner'     && <AddPartnerScreen onBack={goHome} />}
            {activeScreen === 'partnerProfile' && (
              <PartnerProfileScreen
                partner={screenData}
                onBack={goHome}
                onChat={() => navigate('chat', screenData)}
                onMatch={() => navigate('chat', screenData)}
              />
            )}
            {activeScreen === 'courseDetail' && screenData && (
              <CourseDetailScreen
                course={screenData as Course}
                onBack={goHome}
                isPurchased={domainState.purchasedCourseIds.includes((screenData as Course).id)}
                onPurchase={onPurchase}
              />
            )}
            {activeScreen === 'aiCoachChat' && <AICoachChatScreen onBack={goHome} />}
            {activeScreen === 'coachDetail' && (
              <CoachDetailScreen
                coach={screenData}
                onBack={goHome}
                onChat={() => navigate('coachChat', screenData)}
                onBook={(coach: Coach) => navigate('bookCoach', coach)}
                onNavigate={navigate}
                coachReviews={domainState.coachReviews}
                onCreateCalendarEvent={(event) => addCalendarEvent(event)}
                userName={domainState.userName}
              />
            )}
          </div>

          {/* Onboarding overlays inside phone frame */}
          {showWelcome && (
            <WelcomeCards
              onComplete={() => completeWelcome()}
              onGettingStarted={() => {
                completeWelcome();
                completeTour();
                navigate('gettingStarted');
              }}
            />
          )}
          {!showWelcome && showTour && tourReady && (
            <SpotlightTour onComplete={completeTour} switchTab={(tab: string) => switchTab(tab as TabType)} />
          )}

          {/* Bottom Nav — only on home */}
          {activeScreen === 'home' && (
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>

        {/* Home indicator */}
        <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900 rounded-full opacity-15 z-50 pointer-events-none" />
      </div>
    </div>
  );
}
