"use client";

import { useRef } from "react";
import { worksData } from "./data";
import Image from "next/image";
import Divider from "./Divider";
import { useWorksStack } from "@/hooks/ui/useWorksStack";
import Eyebrow from "@/components/ui/eyebrow/Eyebrow";
import SimpleButton from "@/components/ui/buttons/simpleButton/SimpleButton";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton/PrimaryButton";

export default function Works() {
  const rootRef = useRef<HTMLDivElement>(null);

  useWorksStack(rootRef);

  return (
    <div ref={rootRef} className="site-x-padding">
      <Eyebrow text="Works" />
      <div data-works-track>
        <div data-works-stage className="sticky top-0">
          {worksData.map((item, index) => (
            <section
              key={index}
              data-works-card
              className="will-change-transform"
            >
              <div
                data-works-mask
                className="overflow-clip will-change-transform"
              >
                <div
                  data-works-inner
                  className="relative grid grid-cols-12 will-change-transform"
                  style={{ paddingBottom: "var(--works-d, 0px)" }}
                >
                  <div
                    data-works-divider={index === 0 ? "" : undefined}
                    className="col-span-12"
                  >
                    <Divider index={index} year={item.eyebrow} />
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
                        <div className="flex flex-col gap-4 max-w-prose">
                          <p className="body-large">{item.tags}</p>
                          <p className="body">{item.text}</p>
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0">
                        <SimpleButton />
                      </div>
                    </div>
                  </div>
                  {index + 1 === worksData.length && (
                    <div className="absolute bottom-0 border-b border-white w-full"></div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-end text-white">
        <PrimaryButton text="View Works" linkTo="" />
      </div>
    </div>
  );
}
