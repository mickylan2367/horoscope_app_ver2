export default function Navbar({ user }) {
  return (
    <nav className="mb-6 border-b border-white/10 bg-white/5 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-xl font-semibold text-white">Daily Witchcrafts</div>

        {user ? (
          <div className="flex items-center gap-4">
            <img
              src={user.iconUrl}
              alt="icon"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="flex gap-4 text-sm text-slate-200">
            <a href="/login">LOGIN</a>
            <a href="/register">NEW</a>
          </div>
        )}
      </div>
    </nav>
  );
}
