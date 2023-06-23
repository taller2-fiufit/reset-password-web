<template>
    <v-row no-gutters align="center" style="height: 900px;">
        <v-col cols="8" offset="2" justify="center">
            <v-card elevation="4" class="rounded-sm">
                <v-toolbar dark color="#9ACD32">
                    <v-toolbar-title>Reset your password</v-toolbar-title>
                </v-toolbar>
                <v-row>
                    <v-col cols="4" justify="center">
                        <v-img
                            max-width="400"
                            :src="require('@/assets/login-logo.png')"
                            alt="kinetix logo"
                            class="my-16 mx-auto pointer"
                        ></v-img>
                    </v-col>
                    <v-divider class="mt-3" vertical thickness="1"></v-divider>
                    <v-col cols="6" offset="1" justify = "center" class="my-auto mr-14">
                        <SuccessAlert v-if="reset_done" message="The password reset was successful."/>
                        <v-form fast-fail @submit.prevent="handleReset" v-if="!reset_done">
                            <div>
                                <ErrorAlert v-if="error" :error="error"/>
                            </div>

                            <v-text-field
                                v-model="password"
                                label="New password"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="repeat_password"
                                label="Repeat new password"
                                required
                            ></v-text-field>
                            <br />

                            <v-btn type="submit" color="#9ACD32" block class="mt-2" :disabled="loading">
                                <span
                                    v-show="loading"
                                    class="spinner-border spinner-border-sm"
                                ></span>
                                <span>Change password</span>
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import SuccessAlert from '../components/SuccessAlert.vue';
import ErrorAlert from '../components/ErrorAlert.vue';
import useVuelidate from '@vuelidate/core';
import { required } from "@vuelidate/validators";
import PasswordResetService from '../services/password-reset.service';


export default {
    name: "ForgotPassword",
    components: {
        SuccessAlert,
        ErrorAlert
    },
    data() {
        return {
            v$: useVuelidate(),
            loading: false,
            password: '',
            repeat_password: '',
            error: '',
            reset_done: false,
        };
    },
    created() {
        console.log(this.$route.query.token)
    },
    methods: {
        async handleReset() {
            this.loading = true;
            this.v$.$validate()
            if (this.v$.$error) {
                this.error = 'The following fields are required:';
                if (this.password == "") {
                    this.error += "<br>- new password"
                }
                if (this.repeat_password == "") {
                    this.error += "<br>- repeat new password"
                }
            } else if (this.password != this.repeat_password){
                this.error = 'The passwords must match.';
            } else {
                PasswordResetService.resetPassword(this.$route.query.token, this.password).then(
                    (response) => {
                        console.log(response)
                        this.reset_done = true;
                    },
                    (error) => {
                        console.log(error)
                        this.error = "The token isn't valid or it expired."
                    },
                )
            }
            this.loading = false;
        },
    },
    validations() {
        return {
            password: { required },
            repeat_password: { required },
        }
    }
}
</script>

<style>
.rounded-sm {
    background: #f0f0f0 !important;
}
</style>