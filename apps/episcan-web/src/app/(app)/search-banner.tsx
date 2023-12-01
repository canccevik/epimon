'use client'

import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { fetcher } from '@/lib/utils'
import { Payload, SearchResult } from '@epimon/common'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import useSWRMutation from 'swr/mutation'

export default function SearchBanner() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchValue, setSearchText] = useState('')

  const { trigger } = useSWRMutation<Payload<SearchResult>>(
    `/search?value=${searchValue.trim()}`,
    fetcher
  )

  async function search(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const { data } = await trigger()

      if (data?.isBlock) {
        router.push(`/blocks/${searchValue}`)
      } else if (data?.isTransaction) {
        router.push(`/transactions/${searchValue}`)
      } else if (data?.isAddress) {
        router.push(`/address/${searchValue}`)
      }
    } catch (error: any) {
      toast({ title: error.message, variant: 'destructive' })
    }
  }

  return (
    <div className="w-full p-8 bg-main-black text-white rounded-lg flex flex-col gap-y-5 bg-ima">
      <h1 className="text-4xl font-medium">EPM Chain Explorer</h1>

      <p className="w-6/12">
        A blockchain explorer and analytics platform for Epimon Chain. It enables users to explore
        blocks, transactions and addresses on EPM.
      </p>

      <form onSubmit={(e) => search(e)}>
        <Input
          className="w-5/12 p-7 rounded-3xl text-main-black"
          placeholder="Search Block / Tx / Address"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </div>
  )
}
