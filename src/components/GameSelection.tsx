"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { ChevronDown, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function GameSelection() {
  const GAMES_LIST = [
    {name: "Werewolf Ultimate", link: "/werewolf-ultimate"},
    {name: "Werewolf One Night", link: "/werewolf-one-night"},
    {name: "Mascarade", link: "/mascarade"},
    {name: "Avalon", link: "/avalon"},
    {name: "Splendor", link: "/splendor"},
    {name: "Bang", link: "/bang"},
    {name: "Uno", link: "/uno"},
    {name: "Exploding Kittens", link: "/exploding-kittens"},
  ];

  return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-full gap-1 px-4 outline-none"
            )}>
              <span className="font-medium">Games</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Danh sách trò chơi</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="center" className="w-56 rounded-xl">
          {GAMES_LIST.map((game, index) => (
              <DropdownMenuItem key={index} className="cursor-pointer">
                <span className="mr-2 text-xs opacity-50">{index + 1}.</span>
                <a
                    href={game.link}
                    target="_blank"
                    className={cn(
                        buttonVariants({
                          variant: "ghost",
                          size: "icon",
                        }),
                        "rounded-full text-foreground transition-all group-hover:scale-110",
                    )}
                >
                  <h3 className="m-4">{game.name}</h3>
                </a>
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
