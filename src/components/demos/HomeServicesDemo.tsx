import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { HomeServicesHomeScreen } from "./screens/HomeServicesHomeScreen";
import { ServicesListScreen } from "./screens/ServicesListScreen";
import { ServiceDetailScreen } from "./screens/ServiceDetailScreen";
import { BookingFormScreen } from "./screens/BookingFormScreen";
import { BookingConfirmationScreen } from "./screens/BookingConfirmationScreen";
import { OwnerDashboardScreen } from "./screens/OwnerDashboardScreen";

type Screen = "home" | "services" | "detail" | "booking" | "confirmation" | "dashboard";

export const HomeServicesDemo = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  const screens: Screen[] = ["home", "services", "detail", "booking", "confirmation", "dashboard"];
  const currentIndex = screens.indexOf(currentScreen);

  return (
    <div className="relative">
      <PhoneFrame>
        <AnimatePresence mode="wait">
          {currentScreen === "home" && (
            <HomeServicesHomeScreen
              key="home"
              onViewServices={() => setCurrentScreen("services")}
              onBookService={() => setCurrentScreen("booking")}
            />
          )}
          {currentScreen === "services" && (
            <ServicesListScreen
              key="services"
              onBack={() => setCurrentScreen("home")}
              onSelectService={() => setCurrentScreen("detail")}
            />
          )}
          {currentScreen === "detail" && (
            <ServiceDetailScreen
              key="detail"
              onBack={() => setCurrentScreen("services")}
              onBookNow={() => setCurrentScreen("booking")}
            />
          )}
          {currentScreen === "booking" && (
            <BookingFormScreen
              key="booking"
              onSubmit={() => setCurrentScreen("confirmation")}
              onBack={() => setCurrentScreen("detail")}
            />
          )}
          {currentScreen === "confirmation" && (
            <BookingConfirmationScreen
              key="confirmation"
              onViewDashboard={() => setCurrentScreen("dashboard")}
            />
          )}
          {currentScreen === "dashboard" && (
            <OwnerDashboardScreen
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
