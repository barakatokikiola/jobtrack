import { LogoMark } from "@/features/landing-page/components/icons";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SideBar(){

    return(
        <div className="flex flex-col py-8 sm:min-h-screen pt-4 sm:pt-12 px-6 sm:px-12 gap-8 bg-navy text-white">
           <Link href="/" className="flex items-center font-bold gap-2">
             <LogoMark/> JobTrack
           </Link>
            <div className="flex flex-col gap-8 h-full my-auto justify-center">
                <h2 className="text-3xl sm:text-6xl font-black leading-tight tracking-[0.0015rem]">Track every step of your job search</h2>

                <p className="text-gray-400 max-w-3xs sm:max-w-md text-xs sm:text-lg leading-relaxed text-justify">
                  Stay organized and never miss a follow-up, and know exactly where you stand with every application.
                </p>

                  <div className="flex flex-col gap-3 sm:pt-20 text-gray-400 max-w-3xs sm:max-w-md text-xs sm:text-lg ">
                <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand sm:w-5 w-4 sm:h-5 h-4"/>
                    <p>Log applications in seconds</p>
                </div>

                 <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand sm:w-5 w-4 sm:h-5 h-4"/>
                    <p>Track interview stages and offers</p>
                </div>

                 <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand sm:w-5 w-4 sm:h-5 h-4"/>
                    <p>Get a clear view of your progress</p>
                </div>
            </div>
            </div>

          
        </div>
    )
}