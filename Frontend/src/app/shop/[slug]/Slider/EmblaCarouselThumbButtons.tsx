// EmblaCarouselThumbButtons.tsx
import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  src: string;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, src } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__button"
      >
        {/* Display image as the thumbnail */}
        <div className="w-full">
          <Image
            layout="responsive"
            width={300}
            height={300}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className="embla-thumbs__slide__image"
          />
        </div>
      </button>
    </div>
  );
};
