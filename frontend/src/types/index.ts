// 用户相关类型
export type UserRole = 'student' | 'tutor' | 'admin';
export type UserStatus = 'active' | 'disabled' | 'unverified';

export interface User {
  user_id: string;
  mobile?: string;
  email: string;
  nickname: string;
  avatar_url?: string;
  role: UserRole;
  status: UserStatus;
  last_login_time?: string;
  create_time: string;
  update_time: string;
}

// 案例相关类型
export type CaseStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'security_checking'
  | 'security_failed'
  | 'published'
  | 'removed';
export type PackageFormat = 'OpenClaw' | 'ClaudeCode';

export interface SkillCase {
  case_id: string;
  case_hash: string;
  title: string;
  description: string;
  cover_image?: string;
  package_file: string;
  package_format: PackageFormat;
  status: CaseStatus;
  author_id: string;
  author?: User;
  reviewer_id?: string;
  reviewer?: User;
  review_time?: string;
  review_comment?: string;
  publish_time?: string;
  remove_time?: string;
  remove_reason?: string;
  view_count: number;
  download_count: number;
  favorite_count: number;
  like_count: number;
  comment_count: number;
  report_count: number;
  is_featured: boolean;
  sort_weight: number;
  create_time: string;
  update_time: string;
  remark?: string;
  copyright_notice: string;
  version: string;
  tags?: CategoryTag[];
}

// 分类标签类型
export interface CategoryTag {
  tag_id: string;
  tag_name: string;
  tag_code: string;
  description?: string;
  icon?: string;
  sort_order: number;
  is_enabled: boolean;
  case_count: number;
  create_time: string;
}

// 案例标签关联
export interface CaseTagRelation {
  relation_id: string;
  case_id: string;
  tag_id: string;
  create_time: string;
}

// 收藏类型
export interface UserFavorite {
  favorite_id: string;
  user_id: string;
  case_id: string;
  create_time: string;
}

// 点赞类型
export interface UserLike {
  like_id: string;
  user_id: string;
  case_id: string;
  create_time: string;
}

// 评论相关类型
export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface CaseComment {
  comment_id: string;
  case_id: string;
  user_id: string;
  user?: User;
  parent_id?: string;
  content: string;
  like_count: number;
  review_status: ReviewStatus;
  create_time: string;
  children?: CaseComment[];
}

// 举报类型
export type ReportType = 'infringement' | 'violation' | 'malware' | 'other';
export type ReportStatus = 'pending' | 'processing' | 'ignored' | 'removed';

export interface CaseReport {
  report_id: string;
  case_id: string;
  reporter_id: string;
  reporter?: User;
  report_type: ReportType;
  report_reason: string;
  status: ReportStatus;
  handler_id?: string;
  handler?: User;
  handle_result?: string;
  handle_time?: string;
  create_time: string;
}

// 通知类型
export type NotificationType =
  | 'approval_success'
  | 'approval_rejected'
  | 'case_removed'
  | 'new_case_recommend'
  | 'system_announcement';

export interface SystemNotification {
  notification_id: string;
  receiver_id: string;
  type: NotificationType;
  title: string;
  content: string;
  related_case_id?: string;
  jump_url?: string;
  is_read: boolean;
  create_time: string;
}

// 审核历史
export type ActionType = 'first_review' | 're_review' | 'force_remove';

export interface ReviewHistory {
  history_id: string;
  case_id: string;
  reviewer_id: string;
  reviewer?: User;
  action_type: ActionType;
  result: 'approved' | 'rejected' | 'removed';
  comment?: string;
  create_time: string;
}

// API 响应类型
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T = unknown> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 表单类型
export interface UploadCaseFormData {
  title: string;
  description: string;
  tags: string[];
  cover_image?: File;
  package_format: PackageFormat;
  package_file: File;
  instructions?: string;
}

// 统计数据类型
export interface DashboardStats {
  total_cases: number;
  total_users: number;
  total_downloads: number;
  pending_review: number;
  today_upload: number;
  today_download: number;
}

// 分类统计数据
export interface CategoryStats {
  category: string;
  count: number;
  percentage: number;
}
