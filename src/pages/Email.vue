<template>
    <Mail :accounts="accounts" :mails="mails" />
</template>

<script setup lang="ts">
import Mail from '@/components/mail/Mail.vue';
import { accounts, mails } from '@/components/mail/mailData';
</script>
