<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Button } from '../components/ui/button'

</script>
<template>
      <div className="p-4 prose prose-sm w-full mx-auto max-w-5xl">
      <h1 class="text-xl font-medium mb-2">Starer repo for advantch Vue Frontends</h1>
      <p>
        This is the starter repo for react frontend projects.
      </p>
      <div className="grid grid-cols-2 gap-4 lg:gap-6 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Dashboard Page example</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>
                <router-link to="/dashboard">
                    Go to dashboard
    </router-link>
 
         
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Mail</CardTitle>
            <CardDescription>Mail</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>
                <router-link to="/email">
                    Go to emails page
    </router-link>
             
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
</template>

<style lang="">
   
</style>