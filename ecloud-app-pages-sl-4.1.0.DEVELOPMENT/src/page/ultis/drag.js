export default {
    directives: {
        // 放置容器指令
        drop: {
            bind(el, binding, vnode) {
                let drag = {
                    // 初始化
                    init: function () {
                        let me = this;
                        el.addEventListener('dragenter', me.onDragEnter, false);
                        el.addEventListener('dragover', me.onDragOver, false);
                        el.addEventListener('dragleave', me.onDragLeave, false);
                        el.addEventListener('drop', me.onDrop, false);
                    },
                    onDragEnter: function (e) {
                        let me = this;
                        let target = e.target;
                        target.classList.add('over')
                    },
                    onDragLeave: function (e) {
                        let target = e.target;
                        target.classList.remove('over')
                    },
                    onDragOver: function (e) {
                        e.preventDefault();
                    },
                    onDrop: function (e) {
                        e.stopPropagation();
                        let data = JSON.parse(e.dataTransfer.getData('data'));
                        let target = e.target;
                        target.classList.remove('over')
                        let tData = binding.value.row;
                        let argus = {
                            old: data,
                            target: tData
                        };
                        binding.value.set(argus);
                    }
                };
                if (binding.value.row.isDraged) {
                    drag.init()
                }
            }
        },
        move: {
            bind(el, binding, vnode) {
                let drag = {
                    // 初始化
                    init: function () {
                        let me = this;
                        el.addEventListener('dragstart', me.onDragStart, false);
                        el.addEventListener('dragend', me.onDragEend, false);
                    },
                    onDragStart: function (e) {
                        el.classList.add('move')
                        e.dataTransfer.setData('data', JSON.stringify(binding.value.row));
                    },
                    onDragEend: function (e) {
                        el.classList.remove('move')
                    },
                };
                if(binding.value.row.isDraged){
                    drag.init()
                }
            }
        }
    }
}