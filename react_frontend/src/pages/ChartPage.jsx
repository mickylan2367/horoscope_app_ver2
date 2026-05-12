import BookDesign from "../BookDesign";

export default function ChartPage({ user, onLogout }) {
  return <BookDesign user={user} onLogout={onLogout} />;
}
