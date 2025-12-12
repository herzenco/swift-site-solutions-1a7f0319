import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PhoneFrame } from "./PhoneFrame";
import { ListingScreen } from "./screens/ListingScreen";
import { ListingsScreen } from "./screens/ListingsScreen";
import { RequestFormScreen } from "./screens/RequestFormScreen";
import { ConfirmationScreen } from "./screens/ConfirmationScreen";
import { AgentDashboardScreen } from "./screens/AgentDashboardScreen";

type Screen = "listing" | "listings" | "request" | "confirmation" | "dashboard";

export const RealEstateDemo = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("listing");

  const screens: Screen[] = ["listing", "listings", "request", "confirmation", "dashboard"];
  const currentIndex = screens.indexOf(currentScreen);

  return (
    <div className="relative">
      <PhoneFrame>
        <AnimatePresence mode="wait">
          {currentScreen === "listing" && (
            <ListingScreen
              key="listing"
              onRequestShowing={() => setCurrentScreen("request")}
              onViewListings={() => setCurrentScreen("listings")}
            />
          )}
          {currentScreen === "listings" && (
            <ListingsScreen
              key="listings"
              onBack={() => setCurrentScreen("listing")}
              onRequestShowing={() => setCurrentScreen("request")}
            />
          )}
          {currentScreen === "request" && (
            <RequestFormScreen
              key="request"
              onSubmit={() => setCurrentScreen("confirmation")}
              onBack={() => setCurrentScreen("listing")}
            />
          )}
          {currentScreen === "confirmation" && (
            <ConfirmationScreen
              key="confirmation"
              onViewAgentDashboard={() => setCurrentScreen("dashboard")}
            />
          )}
          {currentScreen === "dashboard" && (
            <AgentDashboardScreen
              key="dashboard"
              onReset={() => setCurrentScreen("listing")}
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
