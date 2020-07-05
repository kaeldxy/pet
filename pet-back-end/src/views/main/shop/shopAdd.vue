<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout">
      <span slot="label">
        name&nbsp;
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
    <a-form-item v-bind="formItemLayout" label="address">
      <a-cascader
        v-decorator="[
          'address',
          {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              { type: 'array', required: true, message: 'Please select your address!' },
            ],
          },
        ]"
        :options="address"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="telephone Number">
      <a-input
        v-decorator="[
          'telephone',
          {
            rules: [{ required: true, message: 'Please input your telephone number!' }],
          },
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '86' }]"
          style="width: 70px"
        >
          <a-select-option value="86">+86</a-select-option>
          <a-select-option value="87">+87</a-select-option>
        </a-select>
      </a-input>
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="desc">
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
</template>

<script>
const address = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("shop");
export default {
  data() {
    return {
      address,
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