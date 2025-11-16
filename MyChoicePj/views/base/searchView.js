function searchView({ template, model, controller, computed = {}, methods = {}, mounted = null }) {
  controller?.init?.(model);
  return {
    template,
    data() {
      return {
        model,
        controller
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