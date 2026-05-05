import { Link } from 'react-router-dom';
import { Download, ThumbsUp, Eye } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/utils/cn';
import type { SkillCase } from '@/types';

interface CaseCardProps {
  case_: SkillCase;
  featured?: boolean;
}

const coverGradients = [
  'from-primary to-secondary',
  'from-success to-emerald-600',
  'from-warning to-amber-600',
  'from-secondary to-purple-700',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-blue-600',
];

export function CaseCard({ case_: caseItem, featured = false }: CaseCardProps) {
  const gradientIndex = caseItem.case_id.length % coverGradients.length;
  const gradient = coverGradients[gradientIndex];

  return (
    <Card hover>
      <Link to={`/case/${caseItem.case_id}`} className="block">
        {/* Cover */}
        <div
          className={cn(
            'h-40 bg-gradient-to-br flex items-center justify-center text-5xl',
            gradient
          )}
        >
          {caseItem.cover_image ? (
            <img
              src={caseItem.cover_image}
              alt={caseItem.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>📦</span>
          )}
          {featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
              ⭐ 精选
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
            {caseItem.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {caseItem.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {caseItem.tags?.slice(0, 3).map((tag) => (
              <Tag key={tag.tag_id} size="sm" variant="default">
                {tag.tag_name}
              </Tag>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Avatar
                src={caseItem.author?.avatar_url}
                fallback={caseItem.author?.nickname?.[0] || 'U'}
                size="sm"
              />
              <span className="text-sm text-gray-600">
                {caseItem.author?.nickname || '匿名'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Download size={12} />
                {formatCount(caseItem.download_count)}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp size={12} />
                {formatCount(caseItem.like_count)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

function formatCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
}
