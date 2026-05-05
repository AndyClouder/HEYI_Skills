import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Tag } from '@/components/ui/Tag';
import { Upload, Check, X } from 'lucide-react';
import { mockCategories } from '@/services/mockData';
import { useUIStore } from '@/stores/uiStore';

const tagOptions = [
  { value: 'writing', label: '写作助手' },
  { value: 'data', label: '数据分析' },
  { value: 'automation', label: '自动化' },
  { value: 'dev', label: '开发工具' },
  { value: 'productivity', label: '效率提升' },
  { value: 'research', label: '研究分析' },
  { value: 'design', label: '设计辅助' },
  { value: 'other', label: '其他' },
];

const formatOptions = [
  { value: 'ClaudeCode', label: 'Claude Code 格式' },
  { value: 'OpenClaw', label: 'OpenClaw 格式' },
];

export function UploadPage() {
  const addToast = useUIStore((state) => state.addToast);
  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    packageFormat: '',
    instructions: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleTagToggle = (value: string) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter((t) => t !== value));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, value]);
    } else {
      addToast('warning', '最多只能选择5个标签');
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.zip')) {
      setFile(droppedFile);
    } else {
      addToast('error', '请上传 ZIP 格式的文件');
    }
  };

  const handleSubmit = () => {
    addToast('success', '案例提交成功！等待审核');
    // Reset form
    setStep(1);
    setSelectedTags([]);
    setFormData({ title: '', description: '', packageFormat: '', instructions: '' });
    setFile(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">上传新案例</h1>
      <p className="text-gray-500 mb-8">
        分享你的优秀 Skills，帮助更多同学学习成长
      </p>

      {/* Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > s ? <Check size={18} /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-24 h-1 mx-2 ${
                  step > s ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <Input
            label="案例标题"
            placeholder="给你的案例起个好名字吧"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Textarea
            label="案例描述"
            placeholder="详细描述你的案例功能、使用场景、技术特点等..."
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              分类标签 <span className="text-danger">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleTagToggle(option.value)}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    selectedTags.includes(option.value)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              请选择1-5个标签，帮助用户快速发现你的案例
            </p>
          </div>

          <Select
            label="技能包格式"
            options={formatOptions}
            value={formData.packageFormat}
            onChange={(e) =>
              setFormData({ ...formData, packageFormat: e.target.value })
            }
            required
          />

          <div className="flex justify-end pt-4">
            <Button onClick={() => setStep(2)}>下一步</Button>
          </div>
        </div>
      )}

      {/* Step 2: Upload File */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上传技能包 <span className="text-danger">*</span>
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById('fileInput')?.click()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                id="fileInput"
                type="file"
                accept=".zip"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) setFile(selectedFile);
                }}
              />
              <Upload
                size={48}
                className="mx-auto mb-4 text-gray-400"
              />
              <p className="text-gray-600 mb-1">
                点击或拖拽文件到此处上传
              </p>
              <p className="text-sm text-gray-400">
                支持 ZIP 格式，最大 100MB
              </p>
            </div>

            {file && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-2 text-danger hover:bg-danger/10 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          <Textarea
            label="使用说明（可选）"
            placeholder="填写使用说明、注意事项、常见问题等..."
            rows={4}
            value={formData.instructions}
            onChange={(e) =>
              setFormData({ ...formData, instructions: e.target.value })
            }
          />

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={() => setStep(1)}>
              上一步
            </Button>
            <Button onClick={() => setStep(3)}>下一步</Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            确认案例信息
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">案例标题</span>
              <span className="font-medium text-gray-900">{formData.title}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">案例描述</span>
              <span className="font-medium text-gray-900 max-w-md text-right">
                {formData.description}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">分类标签</span>
              <div className="flex gap-1">
                {selectedTags.map((t) => (
                  <Tag key={t} size="sm">
                    {tagOptions.find((opt) => opt.value === t)?.label}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">技能包格式</span>
              <span className="font-medium text-gray-900">
                {formData.packageFormat}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">技能包文件</span>
              <span className="font-medium text-gray-900">
                {file?.name || '未选择'}
              </span>
            </div>
          </div>

          <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <input type="checkbox" className="mt-1" required />
            <span className="text-sm text-gray-600">
              我确认此案例内容为原创或已获得授权，不侵犯任何第三方权益。我了解上传的内容将经过审核，违规内容将被下架处理。
            </span>
          </label>

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={() => setStep(2)}>
              上一步
            </Button>
            <Button onClick={handleSubmit}>提交审核</Button>
          </div>
        </div>
      )}
    </div>
  );
}
