export function initUI(store) {
    const addSquareBtn = document.getElementById('addSquare');
    const addCircleBtn = document.getElementById('addCircle');
    const recolorSquaresBtn = document.getElementById('recolorSquares');
    const recolorCirclesBtn = document.getElementById('recolorCircles');
    const cntSquaresEl = document.getElementById('cntSquares');
    const cntCirclesEl = document.getElementById('cntCircles');
    const board = document.getElementById('board');

    function createShapeEl(shape) {
        const el = document.createElement('div');
        el.className = `shape ${shape.type}`;
        el.dataset.id = shape.id;
        el.style.backgroundColor = shape.color;
        el.setAttribute('role','button');
        el.setAttribute('aria-label', `${shape.type} ${shape.id}`);
        return el;
    }

    function renderInitial(state) {
        board.innerHTML = '';
        const fragment = document.createDocumentFragment();
        for (const s of state.shapes) fragment.appendChild(createShapeEl(s));
        board.appendChild(fragment);
        updateCounters();
        }

        function updateCounters() {
        const c = store.counts();
        cntSquaresEl.textContent = c.square || 0;
        cntCirclesEl.textContent = c.circle || 0;
        }

        addSquareBtn.addEventListener('click', () => store.addShape('square'));
        addCircleBtn.addEventListener('click', () => store.addShape('circle'));
        recolorSquaresBtn.addEventListener('click', () => store.recolor('square'));
        recolorCirclesBtn.addEventListener('click', () => store.recolor('circle'));

        board.addEventListener('click', (e) => {
            const el = e.target.closest('.shape');
            if (!el || !board.contains(el)) return;
            const id = el.dataset.id;
            if (id) store.removeShape(id);
            });


            store.subscribe((payload) => {
                if (payload.type === 'init') {
                renderInitial(payload.state);
                return;
                }


                if (payload.type === 'add') {
                const el = createShapeEl(payload.shape);
                board.appendChild(el);
                updateCounters();
                return;
                }



                if (payload.type === 'remove') {
                const el = board.querySelector(`[data-id='${payload.id}']`);
                if (el) el.remove();
                updateCounters();
                return;
                }


                if (payload.type === 'recolor') {
                for (const s of payload.shapes) {
                const el = board.querySelector(`[data-id='${s.id}']`);
                if (el) el.style.backgroundColor = s.color;
                }
                updateCounters();
                return;
                }
            });
        }