<template>
  <q-modal v-model="open" ref="modal" content-classes="modal-add-user" v-on:hide="hide()">
    <div class="row gutter-sm" v-if="open">
      <div class="col-12">
        <q-btn
          color="primary"
          @click.native="hide()"
          icon="fas fa-times"
          class="float-right"
          size="sm"
        />
        <h4>Add New User</h4>
      </div>
      <div class="col-6">
        <q-input v-model="name.first" float-label="First" type="text" dark />
      </div>
      <div class="col-6">
        <q-input v-model="name.last" float-label="Last" type="text" />
      </div>
      <div class="col-12">
        <q-field
          :error="$v.email.$error"
          error-label="Please enter a valid email address"
        >
          <q-input
            float-label="Email"
            type="email"
            v-model="email"
            @blur="$v.email.$touch"
          />
        </q-field>
      </div>
      <div class="col-12">
        <!-- <q-select
          v-model="churchid"
          :options="churchOptions"
          float-label="Church"
        /> -->
        <q-search v-model="churchSearch" placeholder="Search..." color="dark" inverted icon="fas fa-search">
          <q-autocomplete
            @search="search"
            @selected="selected"
            ref="searchModal"
            :max-results="5"
            value-field="label"
          />
        </q-search>
      </div>
      <div class="col-12">
        <q-select
          v-model="apps"
          :options="appOptions"
          float-label="Apps"
          chips
          multiple
        />
      </div>
      <div class="col-12">
        <q-btn color="positive" @click.native="addUser()" :disable="loading">Add</q-btn>
      </div>
    </div>
    <q-inner-loading :visible="loading" dark>
      <q-spinner size="2rem" color="primary" />
    </q-inner-loading>
  </q-modal>
</template>

<script>
import { Notify } from 'quasar'
import { required, email } from 'vuelidate/lib/validators'
const Fuse = require('fuse.js')

const defaultUser = {
  name: {
    first: '',
    middle: '',
    last: ''
  },
  email: '',
  apps: [],
  churchid: ''
}

export default {
  name: 'AddUserModal',
  data () {
    return {
      open: false,
      ...defaultUser,
      appOptions: [
        {
          label: 'Message',
          value: 'message'
        },
        {
          label: 'Curriculum',
          value: 'curriculum'
        },
        {
          label: 'Database',
          value: 'database'
        },
        {
          label: 'REAL',
          value: 'real'
        }
      ],
      churchOptions: [],
      churchSearch: '',
      loading: false
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.churchOptions = (await this.$firebase.store('church')).map(e => {
        return {
          label: e.name,
          value: e.id
        }
      })
      if (this.churchOptions.length === 0) {
        Notify.create({
          type: 'negative',
          message: 'Churches were not pulled properly...',
          position: 'bottom-left'
        })
      }
    },
    show () {
      console.log('show', this)
      this.$refs.modal.show()
    },
    hide () {
      this.name = {
        first: '',
        middle: '',
        last: ''
      }
      this.email = ''
      this.apps = []
      this.churchid = ''
      this.$refs.modal.hide()
    },
    addUser () {
      this.loading = true
      this.$firebase.addUser({
        name: this.name,
        email: this.email,
        apps: this.apps,
        churchid: this.churchid
      }).then(() => {
        this.loading = false
        this.hide()
        Notify.create({
          type: 'positive',
          message: 'User added!',
          position: 'bottom-left'
        })
      })
    },
    search (terms, done) {
      console.log('searching...')
      const fuse = new Fuse(this.churchOptions, { keys: ['label'] })
      done(fuse.search(terms))
    },
    selected (item) {
      console.log('selected item', item)
      this.churchSearch = item.label
      this.churchid = item.value
    }
  }
}
</script>

<style>

.modal-add-user {
  padding: 30px;
  width: 100%;
}

@media screen and (min-width: 1200px) {
  .modal-add-user {
    width: 800px;
  }
}

</style>
