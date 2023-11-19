import { Input } from '@/components/ui/input'

export default function SearchBanner() {
  return (
    <div className="w-full p-8 bg-[#182122] text-white rounded-lg flex flex-col gap-y-5 bg-ima">
      <h1 className="text-4xl font-medium">EPM Chain Explorer</h1>

      <p className="w-6/12">
        A blockchain explorer and analytics platform for Epimon Chain. It enables users to explore
        blocks, transactions and addresses on EPM.
      </p>

      <Input
        className="w-5/12 p-7 rounded-3xl text-black"
        placeholder="Search Block / Tx / Address"
      />
    </div>
  )
}
