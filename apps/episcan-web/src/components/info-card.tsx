interface ComponentProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function InfoCard({ icon, title, description }: ComponentProps) {
  return (
    <div className="w-3/12 p-14 bg-white flex justify-center relative text-center rounded-lg border-gray-200 border">
      <div className="w-[80px] h-[80px] bg-white rounded-full absolute text-center -top-10 grid place-items-center border-gray-200 border">
        <div className="text-main-blue">{icon}</div>
      </div>

      <div>
        <h1 className="text-4xl font-semibold tracking-wider">{title}</h1>
        <p className="mt-3 font-medium text-lg">{description}</p>
      </div>
    </div>
  )
}
