import { atom, useAtom } from 'jotai'

import type { Mail } from '@/components/mail/mailData'
import { mails } from '@/components/mail/mailData'

interface Config {
  selected: Mail['id'] | null
}

const configAtom = atom<Config>({
  selected: mails[0].id,
})

export function useMail() {
  return useAtom(configAtom)
}