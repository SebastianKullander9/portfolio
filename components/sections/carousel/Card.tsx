import Tag from "./Tag";

interface CardProps {
    id: string,
    title: string,
    text: string,
    tags: string[],
    githubUrl: string;
}

export default function Card({ id, title, text, tags, githubUrl }: CardProps ) {
    return (
        <div className="w-61 h-90 sm:w-82 sm:h-120 lg:w-96 lg:h-140 xl:w-110 xl:h-160 bg-[var(--color-offwhite)]/25 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between mt-5">
            <div className="flex flex-col gap gap-8">
                <div className="flex flex-row justify-between text-white">
                    <h1 className="heading-5">{title}</h1>
                    <h1 className="heading-5">{id}</h1>
                </div>
                <div className="body text-white">
                    <p>{text}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 body text-white">
                <div className="flex flex-row gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16.11,16.11,0,0,0-16,7.86h-8.72l-3.8-7.86a15.91,15.91,0,0,0-11-8.67l-8-1.73L96.14,104h16.71a16.06,16.06,0,0,0,7.73-2l12.25-6.76a16.62,16.62,0,0,0,3-2.14l26.91-24.34A15.93,15.93,0,0,0,166,49.1l-.36-.65A88.11,88.11,0,0,1,216,128ZM40,128a87.53,87.53,0,0,1,8.54-37.8l11.34,30.27a16,16,0,0,0,11.62,10l21.43,4.61L96.74,143a16.09,16.09,0,0,0,14.4,9h1.48l-7.23,16.23a16,16,0,0,0,2.86,17.37l.14.14L128,205.94l-1.94,10A88.11,88.11,0,0,1,40,128Z"></path>
                    </svg>
                    <p>View Live</p>
                </div>
                <div className="flex flex-row gap-2 items-center cursor-pointer group">
                    <svg className="group-hover:scale-115 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
                        <path d="M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z"></path>
                    </svg>
                    <div>
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                            View on Github
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-[10px] sm:text-sm flex flex-wrap gap-2 text-white">
                {tags.map((tagText, index) => (
                    <Tag key={index} text={tagText} />
                ))}
            </div>
        </div>
    )
}