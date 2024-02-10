<template>
    <ScrollArea class="h-screen">
      <div class="flex flex-col gap-2 p-4 pt-0">
        <button
          v-for="item in items"
          :key="item.id"
          :class="[
            'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
            { 'bg-muted': mail.selected === item.id }
          ]"
          @click="handleItemClick(item.id)"
        >
          <div class="flex w-full flex-col gap-1">
            <div class="flex items-center">
              <div class="flex items-center gap-2">
                <div class="font-semibold">{{ item.name }}</div>
                <span v-if="!item.read" class="flex h-2 w-2 rounded-full bg-blue-600"></span>
              </div>
              <div :class="[
                'ml-auto text-xs',
                mail.selected === item.id ? 'text-foreground' : 'text-muted-foreground'
              ]">
                {{ formatDistanceToNow(new Date(item.date), { addSuffix: true }) }}
              </div>
            </div>
            <div class="text-xs font-medium">{{ item.subject }}</div>
          </div>
          <div class="line-clamp-2 text-xs text-muted-foreground">
            {{ item.text.substring(0, 300) }}
          </div>
          <div class="flex items-center gap-2" v-if="item.labels.length">
            <Badge
              v-for="label in item.labels"
              :key="label"
              :variant="getBadgeVariantFromLabel(label)"
            >
              {{ label }}
            </Badge>
          </div>
        </button>
      </div>
    </ScrollArea>
  </template>
  
  <script setup lang="ts">
  import { formatDistanceToNow } from 'date-fns'
  import { ScrollArea } from '@/components/ui/scroll-area'
  import { Badge } from '@/components/ui/badge'
  import { useMail } from '@/components/mail/useMail'
  import type { Mail } from '@/components/mail/mailData'
  defineProps<{
    items: Mail[]
}>()
  
  const [ mail,setMail ] = useMail()
  
  function handleItemClick(itemId: string) {
    setMail((prevMail:typeof mail) => ({
      ...prevMail,
      selected: itemId
    }))
  }
  
  function getBadgeVariantFromLabel(label: string): string {
    if (['work'].includes(label.toLowerCase()))
      return 'default'
  
    if (['personal'].includes(label.toLowerCase()))
      return 'outline'
  
    return 'secondary'
  }
  </script>
  