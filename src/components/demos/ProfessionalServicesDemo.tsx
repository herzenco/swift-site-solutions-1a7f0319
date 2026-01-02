import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { AdvisoryHomeScreen } from "./screens/AdvisoryHomeScreen";
import { AdvisoryServicesScreen } from "./screens/AdvisoryServicesScreen";
import { AdvisoryDetailScreen } from "./screens/AdvisoryDetailScreen";
import { ConsultationFormScreen } from "./screens/ConsultationFormScreen";
import { ConsultationConfirmationScreen } from "./screens/ConsultationConfirmationScreen";
import { AdvisorDashboardScreen } from "./screens/AdvisorDashboardScreen";

type Screen = "home" | "services" | "detail" | "booking" | "confirmation" | "dashboard";

export const ProfessionalServicesDemo = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  const screens: Screen[] = ["home", "services", "detail", "booking", "confirmation", "dashboard"];
  const currentIndex = screens.indexOf(currentScreen);

  return (
    <div className="relative">
      <PhoneFrame>
        <AnimatePresence mode="wait">
          {currentScreen === "home" && (
            <AdvisoryHomeScreen
              key="home"
              onViewServices={() => setCurrentScreen("services")}
              onBookConsultation={() => setCurrentScreen("booking")}
            />
          )}
          {currentScreen === "services" && (
            <AdvisoryServicesScreen
              key="services"
              onBack={() => setCurrentScreen("home")}
              onSelectService={() => setCurrentScreen("detail")}
            />
          )}
          {currentScreen === "detail" && (
            <AdvisoryDetailScreen
              key="detail"
              onBack={() => setCurrentScreen("services")}
              onBookNow={() => setCurrentScreen("booking")}
            />
          )}
          {currentScreen === "booking" && (
            <ConsultationFormScreen
              key="booking"
              onSubmit={() => setCurrentScreen("confirmation")}
              onBack={() => setCurrentScreen("detail")}
            />
          )}
          {currentScreen === "confirmation" && (
            <ConsultationConfirmationScreen
              key="confirmation"
              onViewDashboard={() => setCurrentScreen("dashboard")}
            />
          )}
          {currentScreen === "dashboard" && (
            <AdvisorDashboardScreen
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
