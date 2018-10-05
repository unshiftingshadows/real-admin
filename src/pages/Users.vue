<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <p v-if="real">You are a REAL Admin</p>
      </div>
      <div class="col-12">
        <q-list separator>
          <user v-for="user in users" :key="user.id" :data="user" />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import User from 'components/User.vue'

export default {
  components: {
    User
  },
  name: 'Users',
  fiery: true,
  mounted () {
    this.$firebase.auth.currentUser.getIdTokenResult(true)
      .then((result) => {
        console.log('token result', result)
        this.real = result.claims.real
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
  }
}
</script>

<style>
</style>
