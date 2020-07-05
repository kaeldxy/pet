<template>
<div>
  <a-form-model :form="form" @submit="handleSubmit">
    <a-form-model-item v-bind="formItemLayout">
      <span slot="label">
        name&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
      v-model="data.name"
        v-decorator="[
          'name',
          {
            rules: [{ required: true, message: 'Please input your shopName!', whitespace: true }],
          },
        ]"
      />
    </a-form-model-item>
    <a-form-model-item v-bind="formItemLayout" label="address">
      <a-cascader
      v-model="data.address"
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
    </a-form-model-item>
    <a-form-model-item v-bind="formItemLayout" label="telephone Number">
      <a-input
      v-model="data.telephone"
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
    </a-form-model-item>

    <a-form-model-item v-bind="formItemLayout" label="desc">
      <a-textarea
      v-model="data.desc"
        v-decorator="[
          'desc',
          {
            rules: [{ required: true, message: 'Please input your desc!' }],
          },
        ]"
        placeholder="Controlled autosize"
        :auto-size="{ minRows: 3, maxRows: 5 }"
      />
    </a-form-model-item>

    <a-form-model-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit">更新</a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
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
  mounted() {
    this.data = this.$router.currentRoute.params;
    this.data.address=this.data.address.split(" ");
  },
  data() {
    return {
      data: {},
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
    ...mapActions(["updataShop"]),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {          
          const {adminId,_id }= this.$router.currentRoute.params;
          Object.assign(values, { adminId,_id,...this.data });
          this.updataShop(values);
          this.$message.info('更新成功！');
          this.$router.replace({name: 'ShopList'})
        }
      });
    }
  }
};
</script>

<style>
</style>