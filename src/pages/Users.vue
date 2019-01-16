<template>
  <q-page padding>
    <div class="row">
      <div class="col-12" style="margin-bottom: 20px;">
        <q-btn class="float-right" color="primary" label="Add User" @click="showAddUser()" />
      </div>
      <div class="col-12">
        <q-list separator>
          <user v-for="user in users" :key="user.id" :data="user" />
        </q-list>
      </div>
    </div>
    <add-user ref="addUserModal" />
  </q-page>
</template>

<script>
import AddUser from 'components/AddUser.vue'
import User from 'components/User.vue'

export default {
  components: {
    AddUser,
    User
  },
  name: 'Users',
  fiery: true,
  mounted () {
    console.log(this.$refs.addUserModal)
    this.$firebase.auth.currentUser.getIdTokenResult(true)
      .then((result) => {
        console.log('token result', result)
        this.real = result.claims.realAdmin
      })
      .catch((err) => {
        console.error('token result error', err)
      })
  },
  data () {
    return {
      real: false,
      users: this.$fiery(this.$firebase.userData(), {
        map: true,
        key: 'id',
        exclude: ['id']
      })
    }
  },
  methods: {
    showAddUser () {
      console.log(this.$refs.addUserModal)
      this.$refs.addUserModal.show()
    }
  }
}
</script>

<style>
</style>
