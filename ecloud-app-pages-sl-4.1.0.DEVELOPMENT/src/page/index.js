export default {
    directives: {
        toggle(el, binding) {
            el.addEventListener('click', (event) => {
                let height = el.parentNode.offsetHeight;
                let scorllHeight = el.parentNode.scrollHeight;
                let num = height;
                let doms = el.parentNode.childNodes;
                let div = document.createElement('div');
                div.setAttribute("id", "menu-model");
                div.style.position = 'fixed';
                div.style.width = '100%';
                div.style.height = '100%';
                div.style.zIndex = '998';
                let openTimer, closeTimer;
                //  div.style.background = 'rgba(155,155,155,.4)';
                if (height <= 60) {
                    el.innerHTML = '<i class="el-icon-arrow-up"></i>';
                    // doms[2].style.background = 'rgba(155,155,155,.4)';
                    doms[2].setAttribute("class", "sy-desktop-slide-open");
                    doms[2].setAttribute("class", "sy-theme-background");
                    document.getElementById('sy-desktop_model').appendChild(div);
                    // document.body.appendChild(div);
                    clearInterval(closeTimer);
                    openTimer = setInterval(() => {
                        num += 3;
                        el.parentNode.style.height = num + 'px';
                        if (num >= scorllHeight) {
                            clearInterval(openTimer);
                        }
                    }, 3)
                    div.addEventListener('click', (event) => {
                        event.stopPropagation();
                        clearInterval(openTimer);
                        let timer2 = setInterval(() => {
                            num -= 3;
                            el.parentNode.style.height = num + 'px';
                            if (num <= 60) {
                                el.innerHTML = '<i class="el-icon-arrow-down"></i>';
                                // doms[2].style.background = 'transparent';
                                doms[2].setAttribute("class", "sy-desktop-slide-close");
                                clearInterval(timer2);
                                let menuModel = document.getElementById('menu-model');
                                menuModel.parentNode.removeChild(menuModel);
                            }
                        }, 3)
                    });
                } else {
                    clearInterval(openTimer);
                    closeTimer = setInterval(() => {
                        num -= 3;
                        el.parentNode.style.height = num + 'px';
                        if (num <= 60) {
                            el.innerHTML = '<i class="el-icon-arrow-down"></i>';
                            // doms[2].style.background = 'transparent';
                            doms[2].setAttribute("class", "sy-desktop-slide-close");
                            clearInterval(closeTimer);
                            let menuModel = document.getElementById('menu-model');
                            menuModel.parentNode.removeChild(menuModel);
                        }
                    }, 3)
                }
            })
        },
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
                drag.init()
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
                drag.init()
            },
            update(el, binding, vnode){
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
                drag.init()
            }
        }
    }
}