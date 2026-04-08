import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import type { User } from '@/types';

interface AuthorCardProps {
  author: User & {
    caseCount?: number;
    downloadCount?: number;
  };
}

const roleColors: Record<string, string> = {
  student: 'bg-primary',
  tutor: 'bg-success',
  admin: 'bg-warning',
};

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link to={`/author/${author.user_id}`}>
      <Card hover className="p-5 text-center">
        <Avatar
          src={author.avatar_url}
          fallback={author.nickname?.[0] || 'U'}
          size="xl"
          className="mx-auto mb-3"
        />
        <h3 className="font-semibold text-gray-900 mb-1">
          {author.nickname}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {author.role === 'student' && '资深学员'}
          {author.role === 'tutor' && '优秀导师'}
          {author.role === 'admin' && '管理员'}
        </p>
        <div className="flex justify-center gap-4 text-xs text-gray-400">
          <span>{author.caseCount || 0} 个案例</span>
          <span>{formatCount(author.downloadCount || 0)} 下载</span>
        </div>
      </Card>
    </Link>
  );
}

function formatCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
}
