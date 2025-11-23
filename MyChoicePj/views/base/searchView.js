function searchView({ template, model, controller,page,pageSize, computed = {}, methods = {}, mounted = null }) {
  controller?.init?.(model);
  return {
    template,
    data() {
      return {
        model,
        controller,
    page,         // Trang hiện tại
    pageSize,      // Số bài hát mỗi trang
      };
    },
    computed: {
        ...computed
    },
    methods: {
        ...methods
    },
    mounted() {
      if (mounted) mounted.call(this);
    }
  };
}

export default searchView;