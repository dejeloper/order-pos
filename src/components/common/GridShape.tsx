import Image from "next/image";
import React from "react";

export default function GridShape() {
  return (
    <>
      <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px] aspect-[540/254]">
        <div className="relative w-full h-full">
          <Image
            priority
            src="/images/shape/grid-01.svg"
            alt="grid"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px] aspect-[540/254]">
        <div className="relative w-full h-full">
          <Image
            src="/images/shape/grid-01.svg"
            alt="grid"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
}
