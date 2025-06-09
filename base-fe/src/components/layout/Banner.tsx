import { SlideShow } from "../banner/SlideShow";

export default function Banner() {
    return (
        <div className="w-full">
            <main className="relative w-full h-[450px] max-sm:h-[200px] ">
                <SlideShow />
            </main>
        </div>
    );
}