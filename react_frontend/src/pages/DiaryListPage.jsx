import DiaryBookPage from "./DiaryBookPage";

export default function DiaryListPage({ authReady, initialPageIndex = 1 }) {
  return <DiaryBookPage authReady={authReady} initialPageIndex={initialPageIndex} />;
}
