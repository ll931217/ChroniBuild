export default {
  methods: {
    hoverSound() {
      const key = 'hover-sound';

      this.$refs[key].load();
      this.$refs[key].volume = 0.5;
      this.$refs[key].play();
    },
    selectSound() {
      const key = 'select-sound';

      this.$refs[key].load();
      this.$refs[key].volume = 0.2;
      this.$refs[key].play();
    },
  },
};
