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

export function OtherLinks() {
  const OTHER_LINKS = [
    {name: "Công Đoàn Glodival", link: "https://www.facebook.com/congdoan.glodival/"},
  ];

  return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-full gap-1 px-2 md:px-4 outline-none border-none select-none" // Giảm padding mobile
            )}>
              <span className="font-medium text-xs md:text-sm">Other links</span>
              <ChevronDown className="h-3 w-3 md:h-4 md:w-4 opacity-50" />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Danh sách Link khác</TooltipContent>
        </Tooltip>

        {/* Sửa align="end" trên mobile để menu nở vào trong màn hình */}
        <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl z-[100]" // Giới hạn chiều rộng cố định để không bị dàn hàng ngang
            sideOffset={15} // Đẩy menu cách xa thanh navbar một chút cho dễ nhìn
        >
          {OTHER_LINKS.map((link, index) => (
              <DropdownMenuItem key={index} className="p-0"> {/* Bỏ padding mặc định của item */}
                <a
                    href={link.link}
                    target="_blank"
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent transition-colors"
                >
                  {link.name}
                </a>
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  )
}
