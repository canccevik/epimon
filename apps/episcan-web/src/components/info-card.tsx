import { Card } from './ui/card'
import LoaderCard from './loader-card'

interface ComponentProps {
  icon: React.ReactNode
  title?: string
  description: string
  isLoading?: boolean
}

export default function InfoCard({ icon, title, description, isLoading = true }: ComponentProps) {
  return (
    <Card className="w-full md:w-3/12 p-14 bg-white dark:border-dark-gray flex justify-center items-center relative text-center rounded-lg border-gray-200 border">
      <div className="w-[80px] h-[80px] bg-white dark:bg-dark-gray dark:border-main-black rounded-full absolute text-center -top-10 grid place-items-center border-gray-200 border">
        <div className="text-main-blue">{icon}</div>
      </div>

      {isLoading ? (
        <LoaderCard className="border-none p-7" />
      ) : (
        <div className="lg:line-clamp-2">
          <h1 className="text-2xl lg:text-4xl font-semibold tracking-wider">{title ?? 0}</h1>
          <p className="mt-3 font-medium text-lg">{description}</p>
        </div>
      )}
    </Card>
  )
}
