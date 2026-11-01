import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Briefcase,
  ExternalLink,
  FileText,
  HeartPulse,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  PencilLine,
  Search,
  Settings,
  ShieldAlert,
  Users,
  X,
} from 'lucide-react';
import logo from '../../assets/pjoa-logo-transparent.png';
import { useAuth } from '../lib/auth';
import { can, ROLE_LABELS } from '../lib/permissions';

const NAV = [
  { group: null, items: [{ to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true }] },
  {
    group: 'Website content',
    items: [
      { to: '/admin/pages', label: 'Pages', icon: FileText },
      { to: '/admin/editor', label: 'Content Editor', icon: PencilLine },
      { to: '/admin/services', label: 'Services', icon: Briefcase },
      { to: '/admin/articles', label: 'Blog / Articles', icon: Newspaper },
      { to: '/admin/media', label: 'Media Library', icon: Image },
    ],
  },
  {
    group: 'Business',
    items: [
      { to: '/admin/inquiries', label: 'Contact Submissions', icon: Inbox },
      { to: '/admin/analytics', label: 'Analytics', icon: BarChart3, capability: 'viewAnalytics' },
      { to: '/admin/seo', label: 'SEO Management', icon: Search, capability: 'editSeo' },
    ],
  },
  {
    group: 'Maintenance',
    items: [
      { to: '/admin/health', label: 'Website Health', icon: HeartPulse, capability: 'viewHealth' },
      { to: '/admin/errors', label: 'Error Monitoring', icon: ShieldAlert, capability: 'viewHealth' },
      { to: '/admin/users', label: 'Users & Permissions', icon: Users, capability: 'manageUsers' },
      { to: '/admin/activity', label: 'Activity History', icon: Activity, capability: 'viewActivity' },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

function NavItems({ role, onNavigate }) {
  return (
    <nav aria-label="Dashboard" className="space-y-6">
      {NAV.map((section) => {
        const items = section.items.filter((item) => !item.capability || can(role, item.capability));
        if (!items.length) return null;
        return (
          <div key={section.group ?? 'main'}>
            {section.group ? <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-white/50">{section.group}</p> : null}
            <ul className="space-y-0.5">
              {items.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
                        isActive ? 'bg-white text-[#1E3A5F] shadow-sm' : 'text-white/85 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <Icon size={18} aria-hidden="true" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

export default function AdminLayout() {
  const { profile, role, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col gap-6 bg-gradient-to-b from-[#1E3A5F] to-[#2A1F4E] px-4 py-5">
      <div className="flex items-center gap-3 px-2">
        <div className="rounded-lg bg-white p-1.5">
          <img src={logo} alt="" className="h-8 w-auto" />
        </div>
        <div className="min-w-0">
          <p className="admin-brand truncate text-base font-semibold text-white">Website Manager</p>
          <p className="truncate text-xs text-white/60">Phyllis J. Outlaw &amp; Associates</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <NavItems role={role} onNavigate={() => setMenuOpen(false)} />
      </div>
      <div className="space-y-3 border-t border-white/15 pt-4">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 text-sm font-medium text-white/80 hover:text-white">
          <ExternalLink size={16} aria-hidden="true" /> View live website
        </a>
        <div className="rounded-lg bg-white/10 px-3 py-2">
          <p className="truncate text-sm font-semibold text-white">{profile?.full_name || profile?.email}</p>
          <p className="text-xs text-[#E4C76C]">{ROLE_LABELS[role]}</p>
        </div>
        <button type="button" onClick={signOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
          <LogOut size={16} aria-hidden="true" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <a href="#admin-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <aside className="sticky top-0 hidden h-screen lg:block">{sidebar}</aside>

      <header className="sticky top-0 z-30 flex items-center justify-between bg-[#1E3A5F] px-4 py-3 lg:hidden">
        <p className="admin-brand font-semibold text-white">Website Manager</p>
        <button type="button" onClick={() => setMenuOpen(true)} className="rounded-lg p-2 text-white hover:bg-white/10" aria-label="Open menu">
          <Menu size={22} />
        </button>
      </header>
      {menuOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="absolute inset-0 bg-slate-900/50" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
          <div className="relative h-full w-72 max-w-[85%]">
            {sidebar}
            <button type="button" onClick={() => setMenuOpen(false)} className="absolute right-3 top-4 rounded-lg p-1 text-white hover:bg-white/10" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
        </div>
      ) : null}

      <div id="admin-content" className="min-w-0 px-4 py-6 sm:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

