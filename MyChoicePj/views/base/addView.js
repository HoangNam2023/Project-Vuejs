/**
 * Tạo component Vue cho màn hình thêm mới.
 */
function addView({ template, model, isSuccess = false, formAdd = {}, computed = {}, methods = {}, mounted = null }) {
  return {
    // Template
    template,

    // Dữ liệu khởi tạo khi component được tạo
    data() {
      return {
        model,
        formAdd,
        isSuccess
      };
    },

    // Gắn thêm computed property tùy chỉnh
    computed: {
        ...computed
    },

    // Gắn thêm method tùy chỉnh
    methods: {
        ...methods
    },

    // Hook mounted của Vue — nếu truyền vào thì kích hoạt khi component mount
    mounted() {
      if (mounted) mounted.call(this);
    }
  };
}

export default addView;