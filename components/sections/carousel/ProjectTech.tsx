import Image from "next/image";
import svgStar from "@/public/svgs/white-star-fully-symmetrical.svg";

/**
 * "Built with" and the technologies, separated by the site's star, under a thin divider at the bottom of the
 * opened card's text. Plain text on purpose, so it doesn't look clickable next to the link buttons. Nothing is
 * shown when the project has no list
 */
export default function ProjectTech({ tech }: { tech?: string[] }) {
    if (!tech?.length) return null;

    return (
        <div className="max-w-prose flex flex-col gap-3 border-t border-white/30 pt-6">
            <p className="body-small opacity-70">Built with</p>
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 body">
                {tech.map((name, index) => (
                    <li key={name} className="flex items-center gap-3">
                        {index > 0 && (
                            <Image src={svgStar} alt="" width={10} height={10} aria-hidden="true" />
                        )}
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
