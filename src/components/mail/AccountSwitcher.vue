<template>
    <Select :modelValue="selectedAccount" @update:modelValue="selectedAccount = $event">
      <SelectTrigger :class="getTriggerClasses" aria-label="Select account">
        <SelectValue :placeholder="'Select an account'">
          <template v-if="!isCollapsed">
            <span>{{ selectedAccountLabel }}</span>
          </template>
          <template v-else>
            <span v-if="selectedAccountIcon">{{ selectedAccountIcon }}</span>
          </template>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="account in accounts" :key="account.email" :value="account.email">
          <div class="flex items-center gap-3">
            <span v-if="account.icon">{{ account.icon }}</span>
            <span>{{ account.email }}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref, computed } from 'vue';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
  import { cn } from '@/lib/utils';
  
  interface Account {
    label: string;
    email: string;
    icon?: JSX.Element; // Assuming JSX.Element type for icons
  }
  
  defineProps<{
    isCollapsed: boolean;
    accounts: Account[];
  }>()
  const selectedAccount = ref<string>(accounts[0].email);
  
  // Computed property to get the selected account's label
  const selectedAccountLabel = computed(() => {
    const selected = accounts.find((account: { email: string; }) => account.email === selectedAccount.value);
    return selected ? selected.label : '';
  });
  
  // Computed property to get the selected account's icon
  const selectedAccountIcon = computed(() => {
    const selected = accounts.find((account: { email: string; }) => account.email === selectedAccount.value);
    return selected ? selected.icon : null;
  });
  
  // Function to determine trigger classes based on collapse state
  const getTriggerClasses = computed(() => {
    return cn(
      'flex items-center gap-2',
      '[&>span]:line-clamp-1',
      '[&>span]:flex',
      '[&>span]:w-full',
      '[&>span]:items-center',
      '[&>span]:gap-1',
      '[&>span]:truncate',
      '[&_svg]:h-4',
      '[&_svg]:w-4',
      '[&_svg]:shrink-0',
      isCollapsed && 'flex h-9 w-9 shrink-0 items-center justify-center p-0',
      isCollapsed && '[&>span]:w-auto',
      isCollapsed && '[&>svg]:hidden'
    );
  });
  </script>
  