import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Pagination } from '@epimon/common'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  meta: Pagination
  page: number
  setPage: Function
  buttonCount?: number
}

export default function PaginationSection({ meta, page, setPage, buttonCount = 4 }: Props) {
  return (
    <div className="flex justify-between px-5">
      <div className="flex gap-x-2">
        {Array.from(
          { length: meta.lastPage > buttonCount ? buttonCount : meta.lastPage },
          (_, i) => i++
        ).map((i) => {
          const targetPage =
            meta.lastPage - page >= buttonCount ? page + i : meta.lastPage - buttonCount + 1 + i * 1

          return (
            <div key={i}>
              <Button
                className={cn(
                  page === targetPage ? 'bg-gray-400' : 'bg-main-black dark:bg-white',
                  'font-semibold'
                )}
                size={'sm'}
                onClick={() => setPage(targetPage)}
              >
                {targetPage}
              </Button>
            </div>
          )
        })}

        {meta.lastPage - buttonCount > page && (
          <>
            <span className="text-2xl font-medium">...</span>

            <Button
              className="bg-main-black dark:bg-white font-semibold"
              size={'sm'}
              onClick={() => setPage(meta.lastPage)}
            >
              {meta.lastPage}
            </Button>
          </>
        )}
      </div>

      <div className="flex gap-x-2">
        <Button
          size={'sm'}
          className={cn(
            page > 1 ? 'bg-main-black dark:bg-white' : 'bg-gray-400 hover:bg-gray-400',
            'flex font-medium'
          )}
          onClick={() => page > 1 && setPage(page - 1)}
        >
          <ArrowLeft size={16} />
          <span className="mt-1 pl-1">Previous</span>
        </Button>

        <Button
          size={'sm'}
          className={cn(
            page < meta.lastPage ? 'bg-main-black dark:bg-white' : 'bg-gray-400 hover:bg-gray-400',
            'font-medium'
          )}
          onClick={() => page < meta.lastPage && setPage(page + 1)}
        >
          <span className="mt-1 pr-1">Next</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}
