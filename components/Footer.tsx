import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-4">
          © {new Date().getFullYear()} {profile.name} · {profile.title} · {profile.location}
        </p>
        <div className="flex items-center gap-6 text-sm">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-text-3 hover:text-accent transition-colors">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="text-text-3 hover:text-accent transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
