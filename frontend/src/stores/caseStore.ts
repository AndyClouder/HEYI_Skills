import { create } from 'zustand';
import type { SkillCase, CategoryTag, PaginatedResponse } from '@/types';

interface CaseState {
  // 案例列表
  cases: SkillCase[];
  featuredCases: SkillCase[];
  currentCase: SkillCase | null;
  total: number;
  page: number;
  pageSize: number;

  // 分类标签
  categories: CategoryTag[];
  selectedCategory: string | null;

  // 筛选条件
  searchQuery: string;
  sortBy: 'latest' | 'popular' | 'most_downloaded';

  // 加载状态
  isLoading: boolean;
  isLoadingMore: boolean;

  // Actions
  setCases: (cases: SkillCase[], total: number) => void;
  appendCases: (cases: SkillCase[]) => void;
  setFeaturedCases: (cases: SkillCase[]) => void;
  setCurrentCase: (case_: SkillCase | null) => void;
  setCategories: (categories: CategoryTag[]) => void;
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'latest' | 'popular' | 'most_downloaded') => void;
  setPage: (page: number) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMore: (loading: boolean) => void;
  resetFilters: () => void;
}

export const useCaseStore = create<CaseState>((set) => ({
  cases: [],
  featuredCases: [],
  currentCase: null,
  total: 0,
  page: 1,
  pageSize: 12,
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  sortBy: 'latest',
  isLoading: false,
  isLoadingMore: false,

  setCases: (cases, total) => set({ cases, total, page: 1 }),
  appendCases: (cases) =>
    set((state) => ({ cases: [...state.cases, ...cases] })),
  setFeaturedCases: (featuredCases) => set({ featuredCases }),
  setCurrentCase: (currentCase) => set({ currentCase }),
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setPage: (page) => set({ page }),
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingMore: (isLoadingMore) => set({ isLoadingMore }),
  resetFilters: () =>
    set({
      selectedCategory: null,
      searchQuery: '',
      sortBy: 'latest',
      page: 1,
    }),
}));
