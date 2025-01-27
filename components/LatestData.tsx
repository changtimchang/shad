'use client';

import { LatestData } from '@/types';
import { useEffect, useState } from 'react';

export default function LatestDataComponent() {
  const [state, setState] = useState<{
    data: LatestData | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await fetch('/api/latest');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || '데이터를 가져오는데 실패했습니다.');
        }

        setState({
          data: result.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.',
          loading: false,
        }));
      }
    };

    fetchLatestData();
  }, []);

  if (state.loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{state.error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      {state.data && (
        <>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {state.data.name}
            </h2>
            <p className="mt-2 text-gray-600">{state.data.email}</p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            {/* <p className="text-sm text-gray-500">
              작성일: {new Date(state.data.updatedAt).toLocaleString('ko-KR')}
            </p> */}
            <p className="text-sm text-gray-500">
              수정일: {new Date(state.data.updatedAt).toLocaleString('ko-KR')}
            </p>
          </div>
        </>
      )}
    </div>
  );
}