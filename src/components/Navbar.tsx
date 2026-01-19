import { ModeToggle } from "@/components/ModeToggle";
import { ThemeToggleDirect } from "@/components/ThemeToggleDirect";
import { GameSelection } from "@/components/GameSelection";
import { OtherLinks } from "@/components/OtherLinks";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CirclePlus, Home } from "lucide-react";
import ModalSubmitNew from "./ModalSubmitNew";

function NavIcon({
  icon,
  text,
  tooltip,
  href,
  target,
  onClick,
}: {
  icon?: React.ReactNode;
  text: string;
  tooltip: string;
  href?: string;
  target?: string;
  onClick?: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target={target}
          onClick={onClick}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "rounded-full text-foreground transition-all group-hover:scale-110",
          )}
        >
          <h3 className="m-4 px-2">{text}</h3>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Navbar() {
  return (
      <TooltipProvider>
        <div
            className={cn(
                "group pointer-events-none mb-4 flex h-full max-h-14",
                "fixed inset-x-0 bottom-4 z-20 mx-auto md:top-4",
                "w-[95%] md:w-max" // Thêm giới hạn chiều rộng trên mobile
            )}
        >
          <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background md:top-0 md:[-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
          <div
              className={cn(
                  // Giảm gap-8 xuống gap-2, px-8 xuống px-4 trên mobile
                  "relative mx-auto flex h-full min-h-full justify-center items-center gap-2 md:gap-8 rounded-full px-4 md:px-8",
                  "pointer-events-auto transition-all w-full md:w-auto", // Thêm w-full để co giãn
                  "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
              )}
          >
            {/* Các NavIcon bên trong */}
            <NavIcon text="Evisa" tooltip="Evisa" href="/" />
            <Separator orientation="vertical" className="h-2/3 my-auto" />
            <NavIcon text="Tour" tooltip="Tour" href="/tour" />
            <Separator orientation="vertical" className="h-2/3 my-auto" />
            <NavIcon text="Service" tooltip="Service" href="/service" />
            <Separator orientation="vertical" className="h-2/3 my-auto" />

            <OtherLinks />

            <Separator orientation="vertical" className="h-2/3 my-auto" />
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent><p>Theme</p></TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
  );
}
