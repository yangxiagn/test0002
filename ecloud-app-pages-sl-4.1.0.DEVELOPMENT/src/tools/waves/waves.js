import './waves.css'

export default {
    bind(el, binding) {

        el.addEventListener('click', e => {

            let customOpts = Object.assign({}, binding.value),
                opts = Object.assign({
                    // 波纹作用元素
                    ele: el,
                    // hit点击位置扩散center中心点扩展
                    type: 'hit',
                    // 波纹颜色
                    color: 'rgba(0, 0, 0, 0.15)'
                }, customOpts),
                target = opts.ele;

            if (!target) {
                return false;
            }

            target.style.position = 'relative';
            target.style.overflow = 'hidden';

            let rect = target.getBoundingClientRect(),
                ripple = target.querySelector('.waves-ripple');

            if (!ripple) {
                ripple = document.createElement('span');
                ripple.className = 'waves-ripple';
                ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                target.appendChild(ripple);
            } else {
                ripple.className = 'waves-ripple';
            }

            switch (opts.type) {
                case 'center':
                    ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px';
                    ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px';
                    break;
                default:
                    ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px';
                    ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px';
            }

            ripple.style.backgroundColor = opts.color;
            ripple.className = 'waves-ripple z-active';
            return false;

        }, false);

    }
}