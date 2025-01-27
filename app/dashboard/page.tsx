'use client'

import { AppSidebar } from '@/components/app-sidebar'
import HomePage from '@/components/LatestData'
import BomUpdatedAt from '@/components/bom-updataedat'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useEffect, useState } from 'react'
import LatestDataComponent from '@/components/LatestData'



export default function Page() {
  const [postCount, setPostCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchPostCount = async () => {
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPostCount(data.count)
    }

    fetchPostCount()
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0 font-[pretendard]'>
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <div className='aspect-video rounded-xl bg-muted/50'>
              <Card className='aspect-video flex flex-col items-center justify-between'>
                <CardHeader className='text-2xl'>
                  <CardTitle>BOM DATA</CardTitle>
                  {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent className='text-overflow'>
                  {postCount !== null ? (
                    <p>There are <span className='text-2xl text-red-500'> {postCount} </span> datum in the database</p>
                  ) : (
                    <p>Loading...</p>
                  )}
                </CardContent>
                <CardFooter className='text-sm text-overflow'>
                 <BomUpdatedAt />
                </CardFooter>
              </Card>
            </div>
            <div className='aspect-video rounded-xl bg-muted/50'>2</div>
            <div className='aspect-video rounded-xl bg-muted/50'>3</div>
          </div>
          <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
            <LatestDataComponent />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
