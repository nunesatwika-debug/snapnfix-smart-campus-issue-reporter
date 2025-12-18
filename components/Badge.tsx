import React from 'react';
import { IssueStatus, UrgencyLevel } from '../types';

interface BadgeProps {
  type: 'status' | 'urgency' | 'category';
  value: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  let styles = '';

  if (type === 'status') {
    switch (value) {
      case IssueStatus.PENDING: styles = 'bg-yellow-100 text-yellow-800 border-yellow-200'; break;
      case IssueStatus.IN_PROGRESS: styles = 'bg-blue-100 text-blue-800 border-blue-200'; break;
      case IssueStatus.RESOLVED: styles = 'bg-green-100 text-green-800 border-green-200'; break;
      default: styles = 'bg-gray-100 text-gray-800';
    }
  } else if (type === 'urgency') {
    switch (value) {
      case UrgencyLevel.HIGH: styles = 'bg-red-100 text-red-800 border-red-200 animate-pulse'; break;
      case UrgencyLevel.LOW: styles = 'bg-emerald-100 text-emerald-800 border-emerald-200'; break;
      default: styles = 'bg-gray-100 text-gray-800';
    }
  } else if (type === 'category') {
    styles = 'bg-violet-100 text-violet-800 border-violet-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
      {value}
    </span>
  );
};