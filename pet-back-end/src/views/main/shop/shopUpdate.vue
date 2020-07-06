<template>
  <div style="margin:0,auto;width:500px">
  <a-form-model :form="form" @submit="handleSubmit">
    <a-form-model-item v-bind="formItemLayout">
      <span slot="label">
        门店名称&nbsp;
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
    <a-form-model-item v-bind="formItemLayout" label="门店地址">
     <a-input
      v-model="data.address"
        v-decorator="[
          'address',
          {
            rules: [{ required: true, message: 'Please input your address!' }],
          },
        ]"
        style="width: 100%"
      >
      </a-input>
    </a-form-model-item>
    <a-form-model-item v-bind="formItemLayout" label="联系电话">
      <a-input
      v-model="data.telephone"
        v-decorator="[
          'telephone',
          {
            rules: [{ required: true, message: 'Please input your telephone!' }],
          },
        ]"
        style="width: 100%"
      >
      </a-input>
    </a-form-model-item>

    <a-form-model-item v-bind="formItemLayout" label="门店简介">
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
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("shop");
export default {
  mounted() {
    this.data = this.$router.currentRoute.params;
  },
  data() {
    return {
      data: {},
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