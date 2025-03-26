import React from "react";

export default function MainHeadings({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) {
  return (
    <div className="text-center mb-10 font-light flex flex-col gap-5">
      <h1 className="lg:text-xl underline xl:text-2xl uppercase">{title}</h1>
      <p>{paragraph}</p>
    </div>
  );
}
