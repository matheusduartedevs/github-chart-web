<script setup lang="ts">
import type { GitHubUser } from '../types/github'

defineProps<{
  user: GitHubUser
}>()

function formatNumber(value: number): string {
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  }
  return String(value)
}
</script>

<template>
  <div class="profile-card">
    <div class="avatar-wrapper">
      <img :src="user.avatar" :alt="user.username" class="avatar" />
    </div>
    <div class="profile-info">
      <div class="name-row">
        <h2 class="name">{{ user.name }}</h2>
        <a :href="user.htmlUrl" target="_blank" rel="noopener noreferrer" class="login">
          @{{ user.username }}
        </a>
      </div>
      <p v-if="user.bio" class="bio">{{ user.bio }}</p>
      <div class="meta-row">
        <span v-if="user.company" class="meta-item">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path
              d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25v12.5ZM1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.75.75 0 0 1-.75-.75v-2.5a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25v2.5a.75.75 0 0 1-.75.75H1.75Z"
            />
          </svg>
          {{ user.company }}
        </span>
        <span v-if="user.location" class="meta-item">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path
              d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"
            />
          </svg>
          {{ user.location }}
        </span>
      </div>
      <div class="stats-row">
        <a :href="`${user.htmlUrl}?tab=followers`" target="_blank" class="stat-link">
          <strong>{{ formatNumber(user.stats.followers) }}</strong>
          <span>seguidores</span>
        </a>
        <span class="separator">·</span>
        <a :href="`${user.htmlUrl}?tab=following`" target="_blank" class="stat-link">
          <strong>{{ formatNumber(user.stats.following) }}</strong>
          <span>seguindo</span>
        </a>
        <span class="separator">·</span>
        <a :href="`${user.htmlUrl}?tab=repositories`" target="_blank" class="stat-link">
          <strong>{{ user.stats.repositories }}</strong>
          <span>repositórios</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background-color: var(--color-canvas-subtle);
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
}

.avatar-wrapper {
  flex-shrink: 0;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid var(--color-border-default);
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.name {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-fg-default);
}

.login {
  font-size: 14px;
  color: var(--color-fg-muted);
}

.login:hover {
  color: var(--color-accent-fg);
}

.bio {
  font-size: 14px;
  color: var(--color-fg-muted);
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--color-fg-muted);
}

.meta-item svg {
  color: var(--color-fg-subtle);
}

.stats-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 2px;
}

.stat-link {
  display: flex;
  gap: 4px;
  font-size: 13px;
  color: var(--color-fg-muted);
  text-decoration: none;
}

.stat-link strong {
  color: var(--color-fg-default);
  font-weight: 600;
}

.stat-link:hover strong,
.stat-link:hover span {
  color: var(--color-accent-fg);
}

.separator {
  color: var(--color-fg-subtle);
  font-size: 13px;
}
</style>
