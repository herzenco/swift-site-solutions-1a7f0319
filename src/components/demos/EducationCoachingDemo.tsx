import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { CoachingHomeScreen } from "./screens/CoachingHomeScreen";
import { ProgramsListScreen } from "./screens/ProgramsListScreen";
import { ProgramDetailScreen } from "./screens/ProgramDetailScreen";
import { SessionBookingScreen } from "./screens/SessionBookingScreen";
import { SessionConfirmationScreen } from "./screens/SessionConfirmationScreen";
import { CoachDashboardScreen } from "./screens/CoachDashboardScreen";

type Screen = "home" | "programs" | "detail" | "booking" | "confirmation" | "dashboard";

export const EducationCoachingDemo = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  const screens: Screen[] = ["home", "programs", "detail", "booking", "confirmation", "dashboard"];
  const currentIndex = screens.indexOf(currentScreen);

  return (
    <div className="relative">
      <PhoneFrame>
        <AnimatePresence mode="wait">
          {currentScreen === "home" && (
            <CoachingHomeScreen
              key="home"
              onViewPrograms={() => setCurrentScreen("programs")}
              onBookSession={() => setCurrentScreen("booking")}
            />
          )}
          {currentScreen === "programs" && (
            <ProgramsListScreen
              key="programs"
              onBack={() => setCurrentScreen("home")}
              onSelectProgram={() => setCurrentScreen("detail")}
            />
          )}
          {currentScreen === "detail" && (
            <ProgramDetailScreen
              key="detail"
              onBack={() => setCurrentScreen("programs")}
              onEnroll={() => setCurrentScreen("booking")}
            />
          )}
          {currentScreen === "booking" && (
            <SessionBookingScreen
              key="booking"
              onSubmit={() => setCurrentScreen("confirmation")}
              onBack={() => setCurrentScreen("detail")}
            />
          )}
          {currentScreen === "confirmation" && (
            <SessionConfirmationScreen
              key="confirmation"
              onViewDashboard={() => setCurrentScreen("dashboard")}
            />
          )}
          {currentScreen === "dashboard" && (
            <CoachDashboardScreen
              key="dashboard"
              onReset={() => setCurrentScreen("home")}
            />
          )}
        </AnimatePresence>
      </PhoneFrame>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {screens.map((screen, index) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-6"
                : index < currentIndex
                ? "bg-primary/60"
                : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to ${screen} screen`}
          />
        ))}
      </div>
    </div>
  );
};
