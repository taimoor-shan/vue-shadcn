<template>
  <div :data-collapsed="isCollapsed" class="group flex flex-col gap-4 py-2" :class="{ 'data-[collapsed=true]': isCollapsed }">
    <nav class="grid gap-1 gap-y-4 px-2" :class="{ 'group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2': isCollapsed }">
      <!-- Loop through each link -->
      <router-link v-for="(link, index) in links" :key="index" :to="link.href" class="nav-link">
        <!-- Display tooltip if collapsed -->
        <template v-if="isCollapsed">
          <Tooltip :delayDuration="0">
            <TooltipTrigger>
              <!-- Link content -->
              <div :class="getLinkClasses(link)">
                <link.icon class="h-4 w-4" />
                <span class="sr-only">{{ link.title }}</span>
              </div>
            </TooltipTrigger>
            <!-- Tooltip content -->
            <TooltipContent side="right" class="flex items-center gap-4">
              {{ link.title }}
              <span v-if="link.label" class="ml-auto text-muted-foreground">{{ link.label }}</span>
            </TooltipContent>
          </Tooltip>
        </template>
        <!-- Display regular link if not collapsed -->
        <template v-else>
          <div :class="getLinkClasses(link)">
            <link.icon class="h-4 w-4 mr-2" />
            {{ link.title }}
            <span v-if="link.label" class="ml-auto" :class="{ 'text-background dark:text-white': link.variant === 'default' }">{{ link.label }}</span>
          </div>
        </template>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
// import { Inbox, File, Send, ArchiveX, Trash2, Archive } from 'lucide-vue-next';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { buttonVariants } from '@/components/ui/button';

interface LucideIcon {
  name: string;
}

interface  NavLink {
  title: string;
  label?: string;
  icon: LucideIcon;
  href: string;
  variant: string;
  isExternal?: boolean;
}

defineProps<{
  isCollapsed: boolean;
  links: NavLink[];
}>()
// const links: NavLink[] = [
//     { title: 'Inbox', label: '128', icon: Inbox, href: '/', variant: 'default' },
//     { title: 'Drafts', label: '9', icon: File, href: '/drafts', variant: 'default' },
//     { title: 'Sent', label: '', icon: Send, href: '/sent', variant: 'default' },
//     { title: 'Junk', label: '23', icon: ArchiveX, href: '/junk', variant: 'default' },
//     { title: 'Trash', label: '', icon: Trash2, href: '/trash', variant: 'default' },
//     { title: 'Archive', label: '', icon: Archive, href: '/archive', variant: 'default' },
//   ]
const pathname = window.location.pathname;

const isActive = (href: string) => {
  if (href === '/') return pathname === href;
  return pathname.startsWith(href);
};

// Function to determine classes for link based on its properties
const getLinkClasses = (link: NavLink) => {
  return [
    buttonVariants({ variant: link.variant, size: 'icon' }),
    'h-9 w-9',
    link.variant === 'default' && 'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
    isActive(link.href) && 'bg-secondary !dark:bg-background',
    'dark:text-muted-foreground',
  ];
};
</script>
