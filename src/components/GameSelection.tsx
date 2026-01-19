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
    {name: "Werewolf Ultimate", link: "/game/werewolf-ultimate"},
    {name: "Werewolf One Night", link: "/game/werewolf-one-night"},
    {name: "Mascarade", link: "/game/mascarade"},
    {name: "Avalon", link: "/game/avalon"},
    {name: "Splendor", link: "/game/splendor"},
    {name: "Bang", link: "/game/bang"},
    {name: "Uno", link: "/game/uno"},
    {name: "Exploding Kittens", link: "/game/exploding-kittens"},
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
        <DropdownMenuContent align="center" className="w-full rounded-xl">
          {GAMES_LIST.map((game, index) => (
              <DropdownMenuItem key={index} className="cursor-pointer pl-4">
                <a
                    href={game.link}
                    target="_blank"
                    className={cn(
                        buttonVariants({
                          variant: "ghost",
                          size: "icon",
                        }),
                    )}
                >
                  <h3 className="text-left m-4">{game.name}</h3>
                </a>
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
