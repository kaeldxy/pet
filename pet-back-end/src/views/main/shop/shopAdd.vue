<template>
  <div style="margin:0,auto;width:500px">
    <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        门店名称&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="[
          'name',
          {
            rules: [{ required: true, message: 'Please input your shopName!', whitespace: true }],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="门店地址">
      <a-input
        v-decorator="[
          'address',
          {
            rules: [{ required: true, message: 'Please input your address!' }],
          },
        ]"
        style="width: 100%"
      >
      </a-input>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="联系电话">
      <a-input
        v-decorator="[
          'telephone',
          {
            rules: [{ required: true, message: 'Please input your telephone!' }],
          },
        ]"
        style="width: 100%"
      >
      </a-input>
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="门店简介">
      <a-textarea
        v-decorator="[
          'desc',
          {
            rules: [{ required: true, message: 'Please input your desc!' }],
          },
        ]"
        placeholder="Controlled autosize"
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </a-form-item>

    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">申请</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("shop");
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    ...mapActions(['addShop']),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const adminId = this.$store.state.currentAdmin.account;
          Object.assign(values,{adminId})
          this.addShop(values)
          console.log("Received values of form: ", values);
        }
      });
    },

  }
};
</script>

<style>
</style>