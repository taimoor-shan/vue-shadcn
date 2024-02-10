<template>
  <TooltipProvider :delayDuration="0">

    <splitpanes class="default-theme h-full" horizontal style="height: 800px">

      <pane min-size="15" max-size="20">
        <div class="flex h-[52px] items-center justify-center">
          <AccountSwitcher  :accounts="accounts" />
        </div>
        <Separator />
        <Nav  :links="navLinks" />
      </pane>


      <pane min-size="30">
        <Tabs :defaultValue="'all'">
          <div class="flex items-center px-4 py-2">
            <h1 class="text-xl font-bold">Inbox</h1>
            <TabsList class="ml-auto">
              <TabsTrigger value="all" class="text-zinc-600 dark:text-zinc-200">All mail</TabsTrigger>
              <TabsTrigger value="unread" class="text-zinc-600 dark:text-zinc-200">Unread</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div class="relative">
                <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" class="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" class="m-0">
            <MailList :items="mails" />
          </TabsContent>
          <TabsContent value="unread" class="m-0">
            <MailList :items="unreadMails" />
          </TabsContent>
        </Tabs>
      </pane>
      <pane>

        <MailDisplay :mail="selectedMail" />
      </pane>
    </splitpanes>
  </TooltipProvider>
</template>
  
<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import {  computed } from 'vue'
import {
  Archive,
  ArchiveX,
  File,
  Inbox,
  Search,
  Send,
  Trash2,
} from 'lucide-vue-next'
import { routes } from '@/components/mail/routes'

import AccountSwitcher from '@/components/mail/AccountSwitcher.vue'
import MailDisplay from '@/components/mail/MailDisplay.vue'
import MailList from '@/components/mail/MailList.vue'
import Nav from '@/components/mail/Nav.vue'
import type { Mail as MailT } from '@/components/mail/mailData'
import { useMail } from '@/components/mail/useMail'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
// import { useMailLayoutState } from '@/components/mail/state'

interface Account {
  label: string
  email: string
  icon: any
}

const accounts: Account[] = [
  { label: 'Account 1', email: 'account1@example.com', icon: Inbox },
  { label: 'Account 2', email: 'account2@example.com', icon: Inbox },
  { label: 'Account 3', email: 'account3@example.com', icon: Inbox },
]

const mails: MailT[] = [
  { id: '1', name: 'John Doe', subject: 'Example Subject 1', text: 'Example Text 1', read: false, date: new Date() },
  { id: '2', name: 'Jane Smith', subject: 'Example Subject 2', text: 'Example Text 2', read: true, date: new Date() },
]

// const { isCollapsed } = useMailLayoutState()

const navLinks = [
  { title: 'Inbox', label: '128', icon: Inbox, href: routes.mail, variant: 'ghost' },
  { title: 'Drafts', label: '9', icon: File, href: `${routes.mail}/drafts`, variant: 'ghost' },
  { title: 'Sent', label: '', icon: Send, href: `${routes.mail}/sent`, variant: 'ghost' },
  { title: 'Junk', label: '23', icon: ArchiveX, href: `${routes.mail}/junk`, variant: 'ghost' },
  { title: 'Trash', label: '', icon: Trash2, href: `${routes.mail}/trash`, variant: 'ghost' },
  { title: 'Archive', label: '', icon: Archive, href: `${routes.mail}/archive`, variant: 'ghost' },
]

const [mail] = useMail()


const unreadMails = computed(() => {
  return mails.filter(item => !item.read)
})

const selectedMail = computed(() => {
  const selectedId = mail.selected;
  return selectedId ? mails.find(item => item.id === selectedId) : null;
});

</script>
  