import { Star } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className="w-full mt-10 p-10 flex justify-between bg-main-black dark:bg-dark-gray text-white rounded-lg">
      <span>&copy; {year} Epimon. All rights reserved.</span>
      <a
        href="https://github.com/canccevik/epimon"
        target="_blank"
        className="flex gap-x-2 hover:text-main-blue"
      >
        <Star />
        <span>Star this project on GitHub</span>
      </a>
    </div>
  )
}
