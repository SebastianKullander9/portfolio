import type { ProjectLinks as Links } from "./cardData";
import SimpleButton from "@/components/ui/buttons/simpleButton/SimpleButton";

function GitHubMark() {
    return (
        <svg width={18} height={18} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
    );
}

function ArrowOut() {
    return (
        <svg
            width={18}
            height={18}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
        >
            <path d="M4.5 11.5l7-7M6 4.5h5.5V10" />
        </svg>
    );
}

/**
 * The GitHub and live links right after the opened card's title, behind a thin divider: small circle buttons whose
 * icon swaps to the star on hover. Either link can be left out of the data, and with neither nothing (not even
 * the divider) is shown. Both open in a new tab
 */
export default function ProjectLinks({ links, title }: { links?: Links; title: string }) {
    if (!links?.github && !links?.live) return null;

    return (
        <div className="flex shrink-0 items-center gap-2 border-l border-white/30 pl-4">
            {links.github && (
                <SimpleButton
                    size="sm"
                    href={links.github}
                    label={`${title} on GitHub`}
                    icon={<GitHubMark />}
                />
            )}
            {links.live && (
                <SimpleButton
                    size="sm"
                    href={links.live}
                    label={`Open ${title} live`}
                    icon={<ArrowOut />}
                />
            )}
        </div>
    );
}
