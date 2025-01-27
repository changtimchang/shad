// app/components/DataDisplay.tsx
'use client'

import { useEffect, useState } from 'react'

interface bom {
  id: number
  unitBlock: string
  smallGroup: string
  member: string
  material: string
  weight: number
  thickness: number
  machining: string
  updatedAt: string
}

export default function BomUpdatedAt() {
  const [data, setData] = useState<bom | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getData')

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const json = await response.json()
        setData(json) // 데이터 상태 업데이트
      } catch (err) {
        setError('An error occurred while fetching data')
      } finally {
        setIsLoading(false) // 로딩 상태 종료
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!data) {
    return <p>No data available</p>
  }

  return (
    <div className='p-8 space-y-4'>
      <h1 className='text-2xl font-bold'></h1>
      <p className='text-gray-500'>
        Last Updated: {new Date(data.updatedAt).toLocaleString()}
      </p>
    </div>
  )
}
