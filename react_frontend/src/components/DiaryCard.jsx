import { FileText } from "lucide-react";
import { useState } from "react";

export default function DiaryCard({ diary, isActive = false, cardRef, onOpenEdit }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const visibleImages = diary.images?.slice(0, 3) ?? [];
  const hiddenCount = Math.max((diary.images?.length ?? 0) - visibleImages.length, 0);

  return (
    <article
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onOpenEdit?.(diary.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenEdit?.(diary.id);
        }
      }}
      className={`scroll-mt-6 rounded-2xl bg-white p-6 text-inherit shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c2c2] ${
          isActive ? "ring-2 ring-[#f4c2c2] ring-offset-4 ring-offset-[#fffafc]" : ""
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#f8e1e7] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#5c3a3a] uppercase">
              <FileText className="h-3.5 w-3.5" />
              <span>Diary</span>
            </div>
            <h3 className="text-2xl font-bold text-[#5c3a3a]">{diary.date}</h3>
            {diary.title && diary.title !== diary.date ? (
              <p className="mt-2 text-sm text-[#8b6870]">{diary.title}</p>
            ) : null}
          </div>
        </div>

        <div
          className="diary-snippet max-w-none text-sm leading-7 text-[#5c3a3a]"
          dangerouslySetInnerHTML={{ __html: diary.renderedContent ?? diary.rendered_content ?? "" }}
        />

        {visibleImages.length ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {visibleImages.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedImage(image);
                }}
                className="relative overflow-hidden rounded-2xl text-left"
              >
                <img
                  src={image.url}
                  alt={image.caption || "Diary"}
                  className="h-36 w-full object-cover transition hover:scale-[1.02]"
                />
                {hiddenCount > 0 && index === visibleImages.length - 1 ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-lg font-semibold text-white">
                    +{hiddenCount}
                  </span>
                ) : null}
                {image.caption ? (
                  <span className="absolute inset-x-0 bottom-0 bg-black/45 px-3 py-2 text-xs text-white">
                    {image.caption}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}

      {selectedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedImage(null);
          }}
          role="presentation"
        >
          <div className="max-w-3xl rounded-2xl bg-white p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt={selectedImage.caption || "Diary"}
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />
            {selectedImage.caption ? (
              <p className="mt-3 text-sm text-[#5c3a3a]">{selectedImage.caption}</p>
            ) : null}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="mt-4 rounded-full bg-[#f4c2c2] px-5 py-2 text-sm font-semibold text-[#5c3a3a]"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}
