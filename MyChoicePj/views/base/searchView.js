/**
 * Tạo component Vue cho màn hình tìm kiếm.
 */
function searchView({ template,components,data, computed = {}, methods = {}, mounted = null }) {
  
  return {
    // Template
    template,
    components,
 // data hoàn toàn do hàm con cung cấp
    data: data || (() => ({})),

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

export default searchView;