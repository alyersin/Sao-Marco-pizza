import { useBreakpointValue } from "@chakra-ui/react";
import MobileRegister from "./MobileRegister";
import DesktopRegister from "./DesktopRegister";

export default function Register({ isOpen, onClose }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <MobileRegister isOpen={isOpen} onClose={onClose} />
  ) : (
    <DesktopRegister isOpen={isOpen} onClose={onClose} />
  );
}
