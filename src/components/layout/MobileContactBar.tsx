import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CallButton } from "@/components/shared/CallButton";

export function MobileContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-dark/10 bg-offwhite/95 px-4 pt-3 pb-safe backdrop-blur-md md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <WhatsAppButton className="flex-1" />
      <CallButton variant="primary" className="flex-1" />
    </div>
  );
}
