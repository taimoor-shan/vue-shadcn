<script setup lang="ts">
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import format from 'date-fns/format';
import nextSaturday from 'date-fns/nextSaturday';
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from 'lucide-vue-next';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Mail } from '@/components/mail/mailData';
defineProps<{
  mail: Mail
}>()
const today = new Date()
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="flex items-center p-2">
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" :disabled="!mail">
              <Archive className="h-4 w-4" />
              <span className="sr-only">Archive</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Archive</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" :disabled="!mail">
              <ArchiveX className="h-4 w-4" />
              <span className="sr-only">Move to junk</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to junk</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" :disabled="!mail">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Move to trash</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Move to trash</TooltipContent>
        </Tooltip>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" :disabled="!mail">
                  <Clock className="h-4 w-4" />
                  <span className="sr-only">Snooze</span>
                </Button>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent className="flex w-[535px] p-0">
              <div className="flex flex-col gap-2 border-r px-2 py-4">
                <div className="px-4 text-sm font-medium">Snooze until</div>
                <div className="grid min-w-[250px] gap-1">
                  <Button variant="ghost" class="justify-start font-normal">
                    Later today
                    <span class="ml-auto text-muted-foreground">
                      {{ format(addHours(today, 4), 'E, h:m b') }}
                    </span>
                  </Button>

                  <Button variant="ghost" className="justify-start font-normal">
                    Tomorrow

                    <span class="ml-auto text-muted-foreground" v-text="format(addDays(today, 1), 'E, h:m b')"></span>

                  </Button>
                  <Button variant="ghost" className="justify-start font-normal">
                    This weekend
                    <span class="ml-auto text-muted-foreground" v-text="format(nextSaturday(today), 'E, h:m b')"></span>

                  </Button>
                  <Button variant="ghost" className="justify-start font-normal">
                    Next week

                    <span class="ml-auto text-muted-foreground" v-text="format(addDays(today, 7), 'E, h:m b')"></span>

                  </Button>
                </div>
              </div>
              <div className="p-2">
                <Calendar />
              </div>
            </PopoverContent>
          </Popover>
          <TooltipContent>Snooze</TooltipContent>
        </Tooltip>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" :disabled="!mail">
              <Reply className="h-4 w-4" />
              <span className="sr-only">Reply</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" :disabled="!mail">
              <ReplyAll className="h-4 w-4" />
              <span className="sr-only">Reply all</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reply all</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" :disabled="!mail">
              <Forward className="h-4 w-4" />
              <span className="sr-only">Forward</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Forward</TooltipContent>
        </Tooltip>
      </div>
      <Separator orientation="vertical" className="mx-2 h-6" />
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!mail}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
    <Separator />
    <!-- Displaying mail information if available, otherwise show a message -->
    <div v-if="mail" class="flex flex-1 flex-col">
      <div class="flex items-start p-4">
        <div class="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarImage/>
            <AvatarFallback>
              {{ mail.name
                .split(' ')
                .map(chunk => chunk[0])
                .join('') }}
            </AvatarFallback>
          </Avatar>
          <div class="grid gap-1">
            <div class="font-semibold">{{ mail.name }}</div>
            <div class="line-clamp-1 text-xs">{{ mail.subject }}</div>
            <div class="line-clamp-1 text-xs">
              <span class="font-medium">Reply-To:</span>
              {{ mail.email }}
            </div>
          </div>
        </div>
        <div v-if="mail.date" class="ml-auto text-xs text-muted-foreground">
          {{ format(new Date(mail.date), 'PPpp') }}
        </div>
      </div>
      <Separator />
      <!-- Displaying mail content -->
      <div class="flex-1 whitespace-pre-wrap p-4 text-sm">{{ mail.text }}</div>
      <Separator class="mt-auto" />
      <!-- Form for replying to mail -->
      <div class="p-4">
        <form>
          <div class="grid gap-4">
            <!-- Textarea for writing a reply -->
            <Textarea class="p-4" :placeholder="'Reply ' + mail.name + '...'" />
            <div class="flex items-center">
              <!-- Switch for muting the thread -->
              <Label for="mute" class="flex items-center gap-2 text-xs font-normal">
                <Switch id="mute" aria-label="Mute thread" />
                Mute this thread
              </Label>
              <!-- Button for sending the reply -->
              <Button @click.prevent size="sm" class="ml-auto">Send</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="p-8 text-center text-muted-foreground">No message selected</div>
  </div>
</template>


