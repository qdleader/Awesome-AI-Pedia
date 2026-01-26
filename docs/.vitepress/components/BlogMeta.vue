<template>
  <div class="blog-meta">
    <div v-if="frontmatter.date || frontmatter.author || frontmatter.readingTime" class="meta-info">
      <span v-if="frontmatter.date" class="meta-item">
        <svg class="icon" viewBox="0 0 1024 1024" width="14" height="14">
          <path d="M512 64l320 320v512H192V384l320-320z m-64 141.333V128l-256 256v512h512V384L448 205.333z"/>
        </svg>
        {{ formatDate(frontmatter.date) }}
      </span>
      <span v-if="frontmatter.author" class="meta-item">
        <svg class="icon" viewBox="0 0 1024 1024" width="14" height="14">
          <path d="M512 128q69 0 128 27t96 70q42 43 64 101t22 126q0 69-27 128t-70 96q-43 42-101 64t-126 22q-69 0-128-27t-96-70q-42-43-64-101t-22-126q0-69 27-128t70-96q43-42 101-64t126-22z"/>
        </svg>
        {{ frontmatter.author }}
      </span>
      <span v-if="frontmatter.readingTime" class="meta-item">
        <svg class="icon" viewBox="0 0 1024 1024" width="14" height="14">
          <path d="M512 928q124 0 211-87t87-211q0-124-87-211t-211-87q-124 0-211 87t-87 211q0 124 87 211t211 87z"/>
        </svg>
        {{ frontmatter.readingTime }}
      </span>
      <span v-if="frontmatter.tags" class="meta-tags">
        <span v-for="tag in frontmatter.tags" :key="tag" class="tag">{{ tag }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const frontmatter = computed(() => route.data.frontmatter || {})

function formatDate(date: string) {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.blog-meta {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.meta-item .icon {
  fill: var(--vp-c-text-2);
}

.meta-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.2rem 0.6rem;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 12px;
}
</style>
