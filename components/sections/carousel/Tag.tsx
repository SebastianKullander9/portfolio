export default function Tag({ text }: { text: string } ) {
    return (
        <div className="py-1 px-2 md:py-2 md:px-3 inline-block bg-[var(--color-purple)] rounded-full">
            <p>{text}</p>
        </div>
    );
}