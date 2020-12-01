new Vue({
    el: '#app',
    data: function () {
        return {
            bookmarkList: [],
            popWidth: 400
        }
    },
    created() {
        if (window.localStorage.bookmarkList != null)
        this.bookmarkList = JSON.parse(window.localStorage.bookmarkList);
    },
    methods: {
    }
})