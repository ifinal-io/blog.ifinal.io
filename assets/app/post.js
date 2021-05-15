Vue.createApp({
  data() {
    return {
      hash: {},
      post: {},
      reload: true
    }
  },
  mounted() {
    let $this = this;

    window.onhashchange = $this.onhashchange;

    $this.parseHash();

    let raw = $this.getFileRaw();

    $this.loadRaw(raw, function (ymal, content) {
      $this.processYmal(ymal);
      $this.processContent(content);
      $this.highlight();
      $this.toc();
      $this.typed($this.post.typed);
    });

  },
  methods: {

    onhashchange() {

      let hash = location.hash;

      if (hash && hash.startsWith("#/")) {
        if (this.reload) {
          this.reload = true;
          location.reload();
        }
      } else {
        location.hash = this.hash.raw;
        this.reload = false;
      }

    },
    getFileRaw() {
      let raw = `https://raw.githubusercontent.com/${this.hash.user}/Blog/main${this.hash.path}`;
      if (!raw.endsWith(".md")) {
        raw = raw + '.md';
      }
      return raw;
    },
    parseHash() {

      let $this = this;

      let hash = location.hash;
      console.log(hash);
      if (!hash || !hash.substring(1).startsWith('/')) {
        alert("未找到")
        return false;
      }

      let queryIndex = hash.indexOf('?');

      if (queryIndex > 0) {
        hash = hash.substring(0, queryIndex);
      }

      console.log(hash);

      let hashs = hash.substring(2).split('/');

      let index = hash.indexOf('/', 2);
      let path = hash.substring(index);

      $this.hash = {
        raw: location.hash,
        user: hashs[0],
        collection: hashs[1],
        path: path
      };

      console.log($this.hash);

    },
    getQueryString(name, search) {
      search = search || window.location.search.substr(1)
          || window.location.hash.split("?")[1];
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let r = search.match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    loadRaw(raw, listener) {
      $.ajax({
        url: raw,
        type: 'GET',
        success: function (data) {

          let ymalStart = data.indexOf("---");
          let ymalEnd = data.indexOf("---", ymalStart + 3);
          let index = data.indexOf('#')
          console.log(`start=${ymalStart},end=${ymalEnd},index=${index}`);

          let ymal = data.substring(ymalStart + 3, ymalEnd);
          let content = data.substring(ymalEnd + 3);

          listener(ymal, content);

        }

      });
    },
    processYmal(ymal) {

      let $this = this;

      var SexyYamlType = new jsYaml.Type('!sexy', {
        kind: 'sequence', // See node kinds in YAML spec: http://www.yaml.org/spec/1.2/spec.html#kind//
        construct: function (data) {
          return data.map(function (string) {
            return 'sexy ' + string;
          });
        }
      });

      var SEXY_SCHEMA = jsYaml.DEFAULT_SCHEMA.extend([SexyYamlType]);

      try {
        let post = jsYaml.load(ymal, {schema: SEXY_SCHEMA});

        if (post.title) {
          $this.post = post;
          // 设置标题
          document.title = post.title;

          if (post.banner) {
            // 设置 Banner
            console.log(`banner=${post.banner}`)
            document.getElementById(
                'bgHolder').style.backgroundImage = `url('${post.banner}')`;
          }
        }

        console.log(post);
      } catch (e) {
        console.log(e);
      }
    },
    processContent(content) {

      var converter = new showdown.Converter();
      converter.setFlavor('github');

      let html = converter.makeHtml(content);

      document.getElementById('write').innerHTML = html;

      anchors.add();
    },
    toc() {
      $('#toc').toc({
        headers: 'article h2,article h3, article h4, article h5, article h6',
        classes: {}
      });
    },
    highlight() {
      hljs.highlightAll();
    },
    typed(strings) {

      let typed = document.getElementById('typed');
      if (typed) {
        new window.Typed(typed, {
          strings: strings,
          typeSpeed: 30,
          loop: true,
          backDelay: 1500
        })
      }
    },
  }
})
.mount('#app')