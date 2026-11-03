"use client";

import { useRef } from "react";
import { skillsData } from "./data";
import Image from "next/image";
import Divider from "./Divider";
import { useSkillsStack } from "@/hooks/ui/useSkillsStack";
import Eyebrow from "@/components/ui/eyebrow/Eyebrow";
import SimpleButton from "@/components/ui/buttons/simpleButton/SimpleButton";

export default function Skills() {
  const rootRef = useRef<HTMLDivElement>(null);

  useSkillsStack(rootRef);

  return (
    // flow-root keeps the track's negative bottom margin (skills-stack.css) inside this element. Otherwise it
    // leaks out, and the section measures as running on past the divider, so the blur and scroll sections
    // think Skills is still on screen there
    <div ref={rootRef} className="site-x-padding flow-root">
      <Eyebrow text="Skills" />
      <div data-skills-track>
        <div data-skills-stage className="sticky top-0">
          {skillsData.map((item, index) => (
            <section
              key={index}
              data-skills-card
              className="will-change-transform"
            >
              <div
                data-skills-mask
                className="overflow-clip will-change-transform"
              >
                <div
                  data-skills-inner
                  className="relative grid grid-cols-12 will-change-transform"
                  style={{ paddingBottom: "var(--skills-d, 0px)" }}
                >
                  <div
                    data-skills-divider={index === 0 ? "" : undefined}
                    className="col-span-12"
                  >
                    <Divider index={index} />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <Image
                      src={item.image}
                      alt=""
                      className="rounded-xl md:rounded-3xl"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6 text-white grid grid-cols-12 mt-12 md:mt-0 relative">
                    <div className="col-span-12 md:col-span-8 md:col-start-3 flex items-center">
                      <div className="flex flex-col gap-12">
                        <p className="heading-1">{item.title}</p>
                        <p className="body max-w-prose">{item.text}</p>
                      </div>
                      <div className="absolute bottom-0 right-0">
                        <SimpleButton />
                      </div>
                    </div>
                  </div>
                  {index + 1 === skillsData.length && (
                    <div className="absolute bottom-0 border-b border-line w-full"></div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
