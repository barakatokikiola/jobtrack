import Link from "next/link";
import { LogoMark } from "@/features/landing-page/components/icons";
import { BellIcon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";


export default function MobileHeader(){

    return(
        <header className="flex w-full justify-between h-14 items-center border-b bg-white px-4 sm:hidden">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="text-[15px] font-bold text-navy">JobTrack</span>
          </Link>
         <div className="flex gap-2">
          
           <div className="cursor-pointer rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors hover:border">
        <BellIcon className="h-4 w-4" />
      </div>
      <SidebarTrigger/>
         </div>
        </header>
    )
}