import { ModeToggle } from "@/components/ModeToggle";
import { ThemeToggleDirect } from "@/components/ThemeToggleDirect";
import { GameSelection } from "@/components/GameSelection";
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
          <h3 className="m-4">{text}</h3>
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
        )}
      >
        <div className="fixed inset-x-0 bottom-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background md:top-0 md:[-webkit-mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div
          className={cn(
            "relative mx-auto flex h-full min-h-full justify-center items-center gap-8 rounded-full px-8",
            "pointer-events-auto transition-all",
            "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
          )}
        >
          <NavIcon
            text="Evisa"
            tooltip="Evisa"
            href="/"
          />
          <Separator orientation="vertical" className="h-full my-2" />
          <NavIcon
            text="Tours"
            tooltip="Tours"
            href="/tours"
          />
          <Separator orientation="vertical" className="h-full my-2" />
          <NavIcon
            text="Services"
            tooltip="Services"
            href="/services"
          />
          {/*
          <Separator orientation="vertical" className="my-2 py-2 h-full" />
          <ModalSubmitNew>
            <NavIcon icon={<CirclePlus />} tooltip="Submit a new website" />
          </ModalSubmitNew>*/}
          <Separator orientation="vertical" className="h-full my-2" />
          <GameSelection />
          <Separator orientation="vertical" className="h-full my-2" />
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
              {/*<ThemeToggleDirect />*/}
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
