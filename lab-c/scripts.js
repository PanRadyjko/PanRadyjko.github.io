document.addEventListener("DOMContentLoaded", () => {
  const map = L.map('map', { preferCanvas: true }).setView([51.505, -0.09], 13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap',
    crossOrigin: true
  }).addTo(map);

  if (Notification.permission !== "granted") Notification.requestPermission();

  document.getElementById('get-location').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 15);
      L.marker([latitude, longitude]).addTo(map).bindPopup("TWOJA POZYCJA").openPopup();
    }, null, { enableHighAccuracy: true });
  });

  document.getElementById('download-map').addEventListener('click', () => {
    leafletImage(map, function(err, canvas) {
      if (err) return;
      const offscreen = document.getElementById('offscreen-canvas');
      const ctx = offscreen.getContext('2d');
      const size = Math.min(canvas.width, canvas.height);
      const sx = (canvas.width - size) / 2;
      const sy = (canvas.height - size) / 2;

      offscreen.width = 400;
      offscreen.height = 400;
      ctx.clearRect(0, 0, 400, 400);
      ctx.drawImage(canvas, sx, sy, size, size, 0, 0, 400, 400);

      const previewContainer = document.getElementById('canvas-preview-container');
      previewContainer.innerHTML = '';
      const previewCanvas = document.createElement('canvas');
      previewCanvas.width = 400;
      previewCanvas.height = 400;
      previewCanvas.getContext('2d').drawImage(offscreen, 0, 0);
      previewContainer.appendChild(previewCanvas);
      document.getElementById('raster-section').style.display = 'block';

      createPuzzles(offscreen);
    });
  });

  function createPuzzles(sourceCanvas) {
    const piecesContainer = document.getElementById('puzzle-pieces');
    const board = document.getElementById('puzzle-board');
    piecesContainer.innerHTML = '';
    board.innerHTML = '';
    piecesContainer.addEventListener('dragover', e => e.preventDefault());
    piecesContainer.addEventListener('drop', handleDropToContainer);

    for (let i = 0; i < 16; i++) {
      const slot = document.createElement('div');
      slot.classList.add('puzzle-slot');
      slot.dataset.correctIndex = i;
      slot.addEventListener('dragover', e => e.preventDefault());
      slot.addEventListener('drop', handleDrop);
      board.appendChild(slot);

      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      canvas.classList.add('piece');
      canvas.draggable = true;
      canvas.dataset.index = i;
      const sx = (i % 4) * 100;
      const sy = Math.floor(i / 4) * 100;
      canvas.getContext('2d').drawImage(sourceCanvas, sx, sy, 100, 100, 0, 0, 100, 100);
      canvas.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', i));
      piecesContainer.appendChild(canvas);
    }
    const pieces = Array.from(piecesContainer.children);
    pieces.sort(() => Math.random() - 0.5).forEach(p => piecesContainer.appendChild(p));
  }

  function handleDrop(e) {
    e.preventDefault();
    const index = e.dataTransfer.getData('text/plain');
    const draggedPiece = document.querySelector(`.piece[data-index="${index}"]`);
    const sourceParent = draggedPiece.parentNode;

    if (this.childNodes.length === 0) {
      this.appendChild(draggedPiece);
    } else {
      const existingPiece = this.firstChild;
      sourceParent.appendChild(existingPiece);
      this.appendChild(draggedPiece);
      existingPiece.style.width = sourceParent.id === 'puzzle-pieces' ? "90px" : "100px";
      existingPiece.style.height = sourceParent.id === 'puzzle-pieces' ? "90px" : "100px";
    }
    draggedPiece.style.width = "100px";
    draggedPiece.style.height = "100px";
    setTimeout(checkWin, 100);
  }

  function handleDropToContainer(e) {
    e.preventDefault();
    const index = e.dataTransfer.getData('text/plain');
    const draggedPiece = document.querySelector(`.piece[data-index="${index}"]`);
    draggedPiece.style.width = "90px";
    draggedPiece.style.height = "90px";
    this.appendChild(draggedPiece);
  }

  function checkWin() {
    const slots = document.querySelectorAll('.puzzle-slot');
    const correct = Array.from(slots).every(slot => {
      const piece = slot.firstChild;
      return piece && piece.dataset.index == slot.dataset.correctIndex;
    });

    if (correct) {
      if (Notification.permission === "granted") {
        new Notification("MISJA WYKONANA", { body: "Mapa ułożona poprawnie!" });
      }
      alert("GRATULACJE! MAPA ZOSTAŁA ZWERYFIKOWANA.");
      document.getElementById('raster-section').style.display = 'none';
      document.getElementById('puzzle-board').innerHTML = '';
      document.getElementById('puzzle-pieces').innerHTML = '';
    }
  }
});
