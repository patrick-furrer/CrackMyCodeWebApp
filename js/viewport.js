window.viewportHelpers = {
    init: function () {
        const setVh = () => {
            const vhSource = (window.visualViewport && window.visualViewport.height) ? window.visualViewport.height : window.innerHeight;
            document.documentElement.style.setProperty('--vh', (vhSource * 0.01) + 'px');
        };

        // initial set
        setVh();

        // keep a reference so we can remove listeners if needed
        this._setVh = setVh;
        window.addEventListener('resize', setVh);
        window.addEventListener('orientationchange', setVh);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', setVh);
            window.visualViewport.addEventListener('scroll', setVh);
        }
    },

    dispose: function () {
        if (!this._setVh) return;
        window.removeEventListener('resize', this._setVh);
        window.removeEventListener('orientationchange', this._setVh);
        if (window.visualViewport) {
            window.visualViewport.removeEventListener('resize', this._setVh);
            window.visualViewport.removeEventListener('scroll', this._setVh);
        }
        this._setVh = null;
    }
};
