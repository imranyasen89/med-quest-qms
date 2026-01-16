import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  stats?: { label: string; value: string | number }[];
  isoClause?: string;
  accentColor?: string;
}

export function ModuleCard({
  title,
  description,
  href,
  icon,
  stats,
  isoClause,
}: ModuleCardProps) {
  return (
    <Link to={href} className="group block">
      <div className="module-card h-full">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-foreground">{title}</h3>
              {isoClause && <span className="iso-clause">{isoClause}</span>}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {stats && stats.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Open Module
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
