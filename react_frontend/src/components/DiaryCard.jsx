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
      className={`mb-6 scroll-mt-6 rounded-2xl border border-white/8 bg-[#31385d]/92 p-6 text-inherit shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-[#383f66]/95 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c2c2] ${
        isActive ? "ring-2 ring-[#f4c2c2] ring-offset-4 ring-offset-[#070b17]/40" : ""
      }`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
          <h3 className="text-2xl font-bold text-[#fbfcff]">{diary.date}</h3>
          {diary.title && diary.title !== diary.date ? (
              <p className="mt-2 text-sm text-slate-200">{diary.title}</p>
            ) : null}
          </div>
        </div>

        <div
          className="diary-snippet max-w-none text-sm leading-7 text-[#eef1ff]"
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
              <p className="mt-3 text-sm text-[#2a2f4d]">{selectedImage.caption}</p>
            ) : null}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="mt-4 rounded-full bg-[#f4c2c2] px-5 py-2 text-sm font-semibold text-[#2a2f4d]"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}
