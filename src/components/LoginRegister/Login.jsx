import { useBreakpointValue } from "@chakra-ui/react";
import MobileDrawer from "./MobileDrawer";
import DesktopLogin from "./DesktopLogin";

export default function Login({ isOpen, onClose, defaultTab }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <MobileDrawer isOpen={isOpen} onClose={onClose} currentView="login" />
  ) : (
    <DesktopLogin isOpen={isOpen} onClose={onClose} defaultTab={defaultTab} />
  );
}
