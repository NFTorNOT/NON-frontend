import React, { useContext, useState } from "react";

export const OnboardingContext = React.createContext({
  isOnboarding: true,
  setIsOnboarding: () => {},
});

export function useOnboardingContext() {
  const { isOnboarding, setIsOnboarding } = useContext(OnboardingContext);

  return {
    isOnboarding,
    setIsOnboarding,
  };
}

export const OnboardingProvider = ({ children }) => {
  // React.useEffect(() => {
  //   setIsOnboarding(localStorage.getItem("onBoardingKey"));
  // }, []);
  const [isOnboarding, setIsOnboarding] = useState(
    localStorage.getItem("onBoardingKey")
  );
  return (
    <OnboardingContext.Provider value={{ isOnboarding, setIsOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};
