<template>
  <q-layout view="hHr LpR lFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header reveal>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
          v-if="$q.platform.is.mobile"
        />
        <q-toolbar-title>
          <img src="https://real-45953.firebaseapp.com/logos/logo_church%402x.png" style="max-height: 40px" />
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <!-- (Optional) The Footer -->
    <!-- <q-layout-footer>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Footer
          <span slot="subtitle">Subtile</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-footer> -->

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer
      side="left"
      v-model="leftDrawer"
      content-class="sm-drawer"
      mini
    >
      <q-scroll-area class="fit q-pa-sm">
        <q-item to="/dashboard">
          <q-item-side icon="fas fa-home" />
          <q-item-main label="Dashboard" class="on-right" />
          <q-tooltip anchor="center left" self="center right" :disable="$q.platform.is.mobile">REAL Dashboard</q-tooltip>
        </q-item>
        <q-item-separator />
        <q-item to="/users">
          <q-item-side icon="fas fa-user" />
          <q-item-main label="Users" class="on-right" />
          <q-tooltip anchor="center left" self="center right" :disable="$q.platform.is.mobile">Users</q-tooltip>
        </q-item>
        <q-item-separator />
        <q-item to="/settings">
          <q-item-side icon="fas fa-cog" />
          <q-item-main label="Settings" class="on-right" />
          <q-tooltip anchor="center left" self="center right" :disable="$q.platform.is.mobile">Settings</q-tooltip>
        </q-item>
        <q-item link @click.native="logout">
          <q-item-side icon="fas fa-sign-out-alt fab" />
          <q-item-main label="Log Out" class="on-right" />
          <q-tooltip anchor="center left" self="center right" :disable="$q.platform.is.mobile">Log Out</q-tooltip>
        </q-item>
      </q-scroll-area>
    </q-layout-drawer>

    <!-- <q-layout-drawer
      side="right"
      v-model="rightDrawer"
      content-class="bg-grey-9 md-drawer"
      :breakpoint="1200"
    >
      <q-scroll-area class="fit q-pa-sm">
        <component v-bind:is="pageType + '-drawer'" class="drawer" v-if="rightDrawer" :key="pageType"></component>
      </q-scroll-area>
    </q-layout-drawer> -->

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'LayoutReal',
  data () {
    return {
      leftDrawer: !this.$q.platform.is.mobile,
      pageType: this.$route.name
    }
  },
  watch: {
    '$route.name': function (val) {
      console.log('page change')
      this.pageType = val
      this.leftDrawer = !this.$q.platform.is.mobile
    }
  },
  methods: {
    logout () {
      console.log('signing out')
      this.$firebase.auth.signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style lang="stylus">

@import "~variables"

.menu-item:hover, .router-link-active {
  background: inherit !important
}

.menu-item:hover > i, .router-link-active > i {
  color: $primary !important
}

.drawer {
  padding: 10px
}

</style>
