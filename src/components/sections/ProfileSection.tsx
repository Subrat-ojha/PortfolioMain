import Image from "next/image";
import React from "react";
import { VerifiedFilledIcon } from "../Icons";
import { FlipSentences } from "../ui/FlipSentences";

function ProfileSection() {
  const flipSentences = [
    "Passionate Java developer with expertise in backend systems",
    "Building robust microservices and enterprise applications",
    "Solving complex problems and sharing knowledge",
    "Full-stack developer with Spring Boot and React skills",
  ];

  return (
    <section className="relative flex full-line-bottom h-auto border-x  ">
      <div className="shrink-0 border-r ">
        <div className="p-1">
          <Image
            className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            alt={`Subrat Ojha avatar`}
            src="https://images.unsplash.com/photo-1578375245153-3ce4fd9a5b6f?w=512&h=512&fit=crop"
            width={512}
            height={512}
            quality={100}
            priority
            unoptimized
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between grow items-end pb-1 px-4 lining-tilt-background">
          <span className="line-clamp-1 font-mono text-xs text-zinc-300 select-none dark:text-zinc-800 tracking-wider">
            Last updated 1 days ago
          </span>
          
      
        </div>
        <div className=" border-t">
          <h1 className=" pl-4 py-0.5 font-semibold  select-none text-2xl flex items-center font-mono  ">
            Subrat Ojha&nbsp;
            <VerifiedFilledIcon />{" "}
          </h1>
        </div>
        <div className="h-9 border-t flex items-center justify-start  py-1 pl-4  md:h-auto">
          <FlipSentences sentences={flipSentences} />
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
