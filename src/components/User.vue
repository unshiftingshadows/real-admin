<template>
  <q-item>
    <!-- TODO: Add later -->
    <!-- <q-item-tile avatar>
      <img src="statics/boy-avatar.png">
    </q-item-tile> -->
    <q-item-main>
      <q-item-tile label>{{ fullName() }}</q-item-tile>
      <q-item-tile sublabel>
        <q-chip color="primary" v-if="data.realUser">Admin</q-chip>
        <q-chip class="color-builder" v-if="data.realUser">Builder</q-chip>
        <q-chip class="color-message" v-if="data.app.message">Message</q-chip>
        <q-chip class="color-prayer" v-if="data.app.prayer">Prayer</q-chip>
        <q-chip class="color-database" v-if="data.app.database">Database</q-chip>
      </q-item-tile>
    </q-item-main>
    <q-item-side>
      <q-btn color="primary" icon="fas fa-ellipsis-v">
        <q-popover>
          <q-list link>
            <q-item v-close-overlay @click.native="editUser">Edit</q-item>
            <q-item v-close-overlay @click.native="removeUser">Remove</q-item>
            <q-item v-close-overlay @click.native="setReal">Set Real</q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    fullName () {
      return this.data.name.first + ' ' + this.data.name.last
    },
    editUser () {
      console.log('edit user', this.data.id)
    },
    removeUser () {
      console.log('remove user', this.data.id)
    },
    setReal () {
      this.$firebase.functions('user-addReal', { email: this.data.email }).then((res) => {
        console.log('done?', res)
      })
    }
  }
}
</script>

<style>
</style>
