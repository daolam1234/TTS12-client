import { CircularBackground } from "../banner/CircularBackground";
import { ProductHeading } from "../banner/ProductHeading";
import { SlideIndicators } from "../banner/SlideIndicators";

export default function Banner() {
    return (
        <div>
            <main className="overflow-hidden relative mx-auto w-full max-w-none h-[550px] sm:h-[650px] md:h-[750px] max-md:max-w-[991px] max-sm:max-w-screen-sm">
                <CircularBackground />
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/25f8addfc91e4cbbb1242155c9b60098c6e0e46e"
                    alt="Nike shoe"
                    className="absolute h-[318px] right-[-5px] rotate-[-14.58deg] top-[279px] w-[802px] max-md:h-[238px] max-md:right-[-150px] max-md:w-[600px] max-sm:h-[159px] max-sm:right-[-100px] max-sm:top-[200px] max-sm:w-[400px]"
                />
                {/* <ProductCircleLogo /> */}
                <ProductHeading />
                <SlideIndicators />
            </main>
        </div>
    )
}