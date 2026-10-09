import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../../../utils/sampleData';

export function QuestionFormModal({ isOpen, onClose, onSubmitQuestion, initialData = null }) {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      category: 'DSA',
      difficulty: 'Medium',
      status: 'Pending',
      link: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        category: initialData.category || 'DSA',
        difficulty: initialData.difficulty || 'Medium',
        status: initialData.status || 'Pending',
        link: initialData.link || '',
        notes: initialData.notes || '',
      });
    } else {
      reset({
        title: '',
        category: 'DSA',
        difficulty: 'Medium',
        status: 'Pending',
        link: '',
        notes: '',
      });
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = (data) => {
    onSubmitQuestion(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Interview Question' : 'Add New Question'}
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <Input
            label="Question / Topic Title"
            placeholder="e.g. Invert a Binary Tree or Git Interactive Rebase"
            required
            error={errors.title?.message}
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters',
              },
            })}
          />
        </div>

        {/* Category & Difficulty Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            required
            error={errors.category?.message}
            options={CATEGORIES}
            {...register('category', { required: 'Please select a category' })}
          />

          <Select
            label="Difficulty"
            required
            error={errors.difficulty?.message}
            options={DIFFICULTIES}
            {...register('difficulty', { required: 'Please select difficulty' })}
          />
        </div>

        {/* Status */}
        <div>
          <Select
            label="Status"
            required
            error={errors.status?.message}
            options={STATUSES}
            {...register('status', { required: 'Please select status' })}
          />
        </div>

        {/* Optional Problem Link */}
        <div>
          <Input
            label="Reference / Problem URL (Optional)"
            placeholder="https://leetcode.com/... or docs link"
            error={errors.link?.message}
            {...register('link', {
              pattern: {
                value: /^(https?:\/\/)?([\w.-]+)+([/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/,
                message: 'Please enter a valid URL',
              },
            })}
          />
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#141414] tracking-tight">
            Key Learnings / Notes (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Key edge cases, time/space complexity, trade-offs, or command flags..."
            className="w-full rounded-2xl bg-[#f0f0f0] border-2 border-transparent px-4 py-2.5 text-sm font-medium text-[#141414] placeholder-[#adadad] focus:bg-white focus:border-[#141414] focus:outline-none transition-all"
            {...register('notes')}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f0f0f0]">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Add Question'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
