import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { LawFirmHomeScreen } from "./screens/LawFirmHomeScreen";
import { PracticeAreasScreen } from "./screens/PracticeAreasScreen";
import { CaseEvaluationScreen } from "./screens/CaseEvaluationScreen";
import { ConsultationFormScreen } from "./screens/ConsultationFormScreen";
import { ConsultationConfirmationScreen } from "./screens/ConsultationConfirmationScreen";
import { AttorneyDashboardScreen } from "./screens/AttorneyDashboardScreen";

type Screen = "home" | "practices" | "evaluation" | "form" | "confirmation" | "dashboard";

export const LawFirmDemo = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  const screens: Screen[] = ["home", "practices", "evaluation", "form", "confirmation", "dashboard"];
  const currentIndex = screens.indexOf(currentScreen);

  return (
    <div className="relative">
      <PhoneFrame>
        <AnimatePresence mode="wait">
          {currentScreen === "home" && (
            <LawFirmHomeScreen
              key="home"
              onViewPractices={() => setCurrentScreen("practices")}
              onRequestConsultation={() => setCurrentScreen("form")}
            />
          )}
          {currentScreen === "practices" && (
            <PracticeAreasScreen
              key="practices"
              onBack={() => setCurrentScreen("home")}
              onSelectArea={() => setCurrentScreen("evaluation")}
            />
          )}
          {currentScreen === "evaluation" && (
            <CaseEvaluationScreen
              key="evaluation"
              onBack={() => setCurrentScreen("practices")}
              onRequestConsultation={() => setCurrentScreen("form")}
            />
          )}
          {currentScreen === "form" && (
            <ConsultationFormScreen
              key="form"
              onSubmit={() => setCurrentScreen("confirmation")}
              onBack={() => setCurrentScreen("evaluation")}
            />
          )}
          {currentScreen === "confirmation" && (
            <ConsultationConfirmationScreen
              key="confirmation"
              onViewDashboard={() => setCurrentScreen("dashboard")}
            />
          )}
          {currentScreen === "dashboard" && (
            <AttorneyDashboardScreen
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
