import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';
import type { CategoryTag } from '@/types';

interface CategoryCardProps {
  category: CategoryTag;
}

const categoryIcons: Record<string, string> = {
  writing: '✍️',
  data: '📊',
  automation: '⚙️',
  dev: '👨‍💻',
  productivity: '⚡',
  research: '🔬',
  design: '🎨',
  other: '📦',
};

const categoryColors: Record<string, string> = {
  writing: 'hover:border-blue-500 hover:bg-blue-50',
  data: 'hover:border-green-500 hover:bg-green-50',
  automation: 'hover:border-orange-500 hover:bg-orange-50',
  dev: 'hover:border-purple-500 hover:bg-purple-50',
  productivity: 'hover:border-yellow-500 hover:bg-yellow-50',
  research: 'hover:border-cyan-500 hover:bg-cyan-50',
  design: 'hover:border-pink-500 hover:bg-pink-50',
  other: 'hover:border-gray-500 hover:bg-gray-50',
};

export function CategoryCard({ category }: CategoryCardProps) {
  const icon = categoryIcons[category.tag_code] || categoryIcons.other;
  const colorClass = categoryColors[category.tag_code] || categoryColors.other;

  return (
    <Link to={`/explore?category=${category.tag_id}`}>
      <Card
        variant="default"
        className={cn(
          'p-4 text-center transition-all duration-200 border-2 border-transparent',
          colorClass
        )}
      >
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-sm font-medium text-gray-900">
          {category.tag_name}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {category.case_count} 个案例
        </div>
      </Card>
    </Link>
  );
}
