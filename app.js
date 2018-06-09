var app = new Vue({
  el: '#app',
  data: {
    scanner: null,
    activeCameraIndex: null,
    cameras: []
  },
  mounted: function () {
    var self = this;
    self.scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      scanPeriod: 5,
      mirror: false
    });
    self.scanner.addListener('scan', function (content, image) {
      console.log(content);
    });
    Instascan.Camera.getCameras().then(function (cameras) {
      self.cameras = cameras;
      if (self.cameras.length > 0) {
        self.activeCameraIndex = self.cameras.length - 1;
        self.scanner.start(self.cameras[self.activeCameraIndex]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
  },
  methods: {
    changeCamera: function () {
      this.activeCameraIndex = this.activeCameraIndex + 1;
      if (this.activeCameraIndex === this.cameras.length) {
        this.activeCameraIndex = 0;
      }
      this.scanner.start(this.cameras[this.activeCameraIndex]);
    }
  }
});
