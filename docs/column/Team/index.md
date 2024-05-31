---
layout: page

---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
} from 'vitepress/theme'


const members = [
  {
    avatar: 'https://s21.ax1x.com/2024/05/31/pk8svjS.png',
    name: 'Louaq',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/Louaq' },
    ],
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>

    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of VitePress is guided by an international
      team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="members" />
</VPTeamPage>